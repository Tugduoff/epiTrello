import { getDatabase } from '~/server/middleware/db';
import { H3Event, readBody, getRouterParam } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const db = await getDatabase();
  const boardId = getRouterParam(event, 'boardId');

  console.log('Updating board with id:', boardId);

  // Read the body of the request to get updated board data
  const body = await readBody<{
    name: string,
    description?: string,
    color?: string
  }>(event);
  const { name, description, color } = body;

  // Validate that name is provided and not empty
  if (!name) {
    return { status: 400, message: 'Name can\'t be empty' };
  }

  console.log('Updating board with new color:', color);
  // Query to update the board
  const result = await db.run(
    `
    UPDATE boards
    SET name = ?, description = ?, color = ?
    WHERE id = ?
    `,
    [name, description, color || '#ffffff', boardId]
  )

  // Check if the update was successful
  if (result.changes === 0) {
    console.error('No board found or no changes made for id:', boardId);
    return { status: 404, message: 'No board found with id: ' + boardId };
  }

  // Fetch the updated board to return
  const updatedBoard = await db.get('SELECT * FROM boards WHERE id = ?', boardId);

  console.log('Board updated:', updatedBoard);

  // Return the updated board
  return { status: 200, board: updatedBoard };
});
