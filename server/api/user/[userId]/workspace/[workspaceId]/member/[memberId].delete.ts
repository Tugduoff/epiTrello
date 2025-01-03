import { getDatabase } from '~/server/middleware/db';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const db = await getDatabase();
  const userId = getRouterParam(event, 'memberId');
  const workspaceId = getRouterParam(event, 'workspaceId');

  console.info('Removing member with id:', userId, 'from workspace with id:', workspaceId);

  // Query to check if the user is a member of the workspace
  const member = await db.get(
    'SELECT * FROM workspace_members WHERE workspace_id = ? AND user_id = ?',
    [workspaceId, userId]
  );

  if (!member) {
    console.error('Member not found in workspace');
    return { status: 404, body: { error: 'Member not found in workspace' } };
  }

  // Need to remove every connection the user has with the boards of the workspace.
  // This includes removing the user from the board_members table

  const boards = await db.all(
    'SELECT id FROM boards WHERE workspace_id = ?',
    [workspaceId]
  );
  
  for (const board of boards) {
    await db.run(
      'DELETE FROM board_members WHERE board_id = ? AND user_id = ?',
      [board.id, userId]
    );

    // Also remove the user from the card assignees table for every card in the workspace
    const lists = await db.all(
      'SELECT id FROM lists WHERE board_id = ?',
      [board.id]
    );

    for (const list of lists) {
      const cards = await db.all(
        'SELECT id FROM cards WHERE list_id = ?',
        [list.id]
      );

      for (const card of cards) {
        await db.run(
          'DELETE FROM card_assignees WHERE card_id = ? AND assignee_id = ?',
          [card.id, userId]
        );
      }
    }
  }

  // Then remove the user from the workspace_members table

  const result = await db.run(
    'DELETE FROM workspace_members WHERE workspace_id = ? AND user_id = ?',
    [workspaceId, userId]
  );

  if (result.changes === 0) {
    return { status: 404, body: { error: 'Error happened on member id: ' + userId + ' removal on workspace id: ' + workspaceId } };
  }

  return { status: 204 };
});
