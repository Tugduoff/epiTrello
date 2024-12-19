import { getDatabase } from '~/server/middleware/db';
import { H3Event, readBody, getRouterParam } from 'h3';

interface UpdateRequest {
  title: string;
  description: string;
  priority?: number;
  due_date?: string;
  list_id?: number;
  start_date?: string;
  color?: string;
}

export default defineEventHandler(async (event: H3Event) => {
  const db = await getDatabase();
  const cardId = getRouterParam(event, 'cardId');

  console.log('Updating card with id:', cardId);

  // Read the body of the request to get updated card data
  const body = await readBody<UpdateRequest>(event);
  const { title, description, priority, due_date, list_id, start_date, color } = body;

  // Validate that title is provided and not empty
  if (!title) {
    return { status: 400, message: "Title can't be empty" };
  }

  // Query to update the card
  const result = await db.run(
    `
    UPDATE cards 
    SET title = ?, description = ?, priority = ?, due_date = ?, list_id = ?, start_date = ?, color = ?
    WHERE id = ?
    `,
    [title, description, priority || 0, due_date || null, list_id, start_date || null, color || '#3b82f6', cardId]
  );

  // Check if the update was successful
  if (result.changes === 0) {
    console.error('No card found or no changes made for id:', cardId);
    return { status: 404, message: 'No card found with id: ' + cardId };
  }

  // Fetch the updated card to return
  const updatedCard = await db.get('SELECT * FROM cards WHERE id = ?', cardId);

  console.log('Card updated:', updatedCard);

  // Return the updated card
  return { status: 200, card: updatedCard };
});
