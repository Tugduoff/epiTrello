import { getDatabase } from '~/server/middleware/db';
import { H3Event, readBody } from 'h3';

interface CreateRequest {
  title: string;
  description: string;
}

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody<CreateRequest>(event);
  const { title, description } = body;
  const listId = getRouterParam(event, 'listId');

  const db = await getDatabase();

  // Check if the card already exists
  const existingCard = await db.get('SELECT * FROM cards WHERE list_id = ? AND title = ?', [listId, title]);
  if (existingCard) {
    return { status: 400, body: { error: 'Card already exists' } };
  }

  // Insert the new card into the database
  await db.run('INSERT INTO cards (list_id, title, description) VALUES (?, ?, ?)', [listId, title, description]);

  const newCard = await db.get('SELECT * FROM cards WHERE list_id = ? AND title = ?', [listId, title]);
  return { status: 201, card: newCard };
});
