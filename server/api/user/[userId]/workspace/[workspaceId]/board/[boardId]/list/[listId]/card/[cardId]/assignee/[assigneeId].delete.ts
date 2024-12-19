import { getDatabase } from '~/server/middleware/db';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const db = await getDatabase();
  const assigneeId = getRouterParam(event, 'assigneeId');
  const boardId = getRouterParam(event, 'boardId');
  const cardId = getRouterParam(event, 'cardId');
  const userId = getRouterParam(event, 'userId');

  const board_member = await db.get('SELECT * FROM board_members WHERE board_id = ? AND user_id = ?', [boardId, assigneeId]);
  if (!board_member) {
    // Is owner of the workspace
    if (userId !== assigneeId) {
      return { status: 404, error: 'Member not found for the specified board' };
    }
  }

  const isAssigned = await db.get('SELECT * FROM card_assignees WHERE assignee_id = ? AND card_id = ?', [assigneeId, cardId]);
  if (!isAssigned) {
    return { status: 404, error: `Member not assigned to card: ${cardId}` };
  }

  const result = await db.run('DELETE FROM card_assignees WHERE assignee_id = ? AND card_id = ?', [assigneeId, cardId]);
  if (result.changes === 0) {
    return { status: 400, error: 'Could not delete the association' };
  }

  return { status: 204 };
});
