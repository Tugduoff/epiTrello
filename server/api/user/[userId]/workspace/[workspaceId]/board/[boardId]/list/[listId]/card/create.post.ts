import { getDatabase } from '~/server/middleware/db';
import { H3Event, readBody, getRouterParam } from 'h3';

interface CreateRequest {
  title: string;
  description: string;
  priority?: number;
  due_date?: string;
  start_date?: string;
  color?: string;
}

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody<CreateRequest>(event);
  const { title, description, priority, due_date, start_date, color } = body;
  const listId = getRouterParam(event, 'listId');

  const db = await getDatabase();

  // Insert the new card into the database
  const result = await db.run(
    `
    INSERT INTO cards (list_id, title, description, priority, due_date, start_date, color)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [listId, title, description, priority || 0, due_date || null, start_date || null, color || '#3b82f6']
  );

  // Retrieve the last inserted row ID
  const newCardId = result.lastID;

  // Fetch the newly inserted card using its ID
  const newCard = await db.get('SELECT * FROM cards WHERE id = ?', [newCardId]);

  console.log('New card:', newCard);
  return { status: 201, card: newCard };
});
