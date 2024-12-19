import { getDatabase } from '~/server/middleware/db';
import { H3Event, readBody, getRouterParam } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const db = await getDatabase();
  const listId = getRouterParam(event, 'listId');

  console.log('Updating list with id:', listId);

  // Read the body of the request to get updated list data
  const body = await readBody(event);
  const { name, col } = body;

  // Validate that name is provided and not empty
  if (!name) {
    return { status: 400, message: 'Name can\'t be empty' };
  }

  // Query to update the list
  const result = await db.run('UPDATE lists SET name = ?, column = ? WHERE id = ?', [name, col, listId]);

  // Check if the update was successful
  if (result.changes === 0) {
    console.error('No list found or no changes made for id:', listId);
    return { status: 404, message: 'No list found with id: ' + listId };
  }

  // Fetch the updated list to return
  const updatedList = await db.get('SELECT * FROM lists WHERE id = ?', listId);

  console.log('List updated:', updatedList);

  // Return the updated list
  return { status: 200, list: updatedList };
});
