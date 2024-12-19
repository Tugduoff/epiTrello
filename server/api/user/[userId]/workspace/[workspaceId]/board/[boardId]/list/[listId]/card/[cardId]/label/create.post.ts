import { getDatabase } from '~/server/middleware/db';
import { H3Event, readBody } from 'h3';

interface CreateRequest {
  label_id: number;
}

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody<CreateRequest>(event);
  const { label_id } = body;

  const card_id = getRouterParam(event, 'cardId');
  const board_id = getRouterParam(event, 'boardId');

  const db = await getDatabase();

  // Check if the label exists for the specified board
  const label = await db.get('SELECT * FROM labels WHERE id = ? AND board_id = ?', [label_id, board_id]);
  if (!label) {
    return { status: 404, error: 'Label not found for the specified board' };
  }

  // Check if the association already exists
  const existingAssociation = await db.get('SELECT * FROM card_labels WHERE card_id = ? AND label_id = ?', [card_id, label_id]);
  if (existingAssociation) {
    return { status: 400, error: 'This label is already associated with the card' };
  }

  // Insert the new label association
  await db.run('INSERT INTO card_labels (card_id, label_id) VALUES (?, ?)', [card_id, label_id]);

  // Retrieve the newly created association
  const newLabelAssociation = await db.get('SELECT * FROM card_labels WHERE card_id = ? AND label_id = ?', [card_id, label_id]);

  return { status: 201, label: newLabelAssociation };
});
