import { getDatabase } from '~/server/middleware/db';
import { H3Event, readBody } from 'h3';

interface CreateRequest {
  assignee_id: number;
}

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody<CreateRequest>(event);
  const { assignee_id } = body;

  const card_id = getRouterParam(event, 'cardId');
  const board_id = getRouterParam(event, 'boardId');
  const workspace_id = getRouterParam(event, 'workspaceId');
  const user_id = getRouterParam(event, 'userId');

  if (!user_id) {
    return { status: 400, error: 'User ID is required' };
  }
  const userNumber = parseInt(user_id);

  const db = await getDatabase();

  // Check if the member exists for the specified board
  const member = await db.get('SELECT * FROM board_members WHERE board_id = ? AND user_id = ?', [board_id, assignee_id]);
  if (!member) {
    // Is owner of the workspace
    if (userNumber !== assignee_id) {
      return { status: 404, error: 'Member not found for the specified board' };
    }
  }

  // Check if the association already exists
  const existingAssociation = await db.get('SELECT * FROM card_assignees WHERE card_id = ? AND assignee_id = ?', [card_id, assignee_id]);
  if (existingAssociation) {
    return { status: 400, error: 'This member is already assigned to the card' };
  }

  // Insert the new member association
  await db.run('INSERT INTO card_assignees (card_id, assignee_id) VALUES (?, ?)', [card_id, assignee_id]);

  // Retrieve the newly created association
  const newMemberToCardAssignment = await db.get('SELECT * FROM card_assignees WHERE card_id = ? AND assignee_id = ?', [card_id, assignee_id]);

  return { status: 201, member: newMemberToCardAssignment };
});
