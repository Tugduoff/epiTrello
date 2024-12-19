import { getDatabase } from '~/server/middleware/db';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const db = await getDatabase();
  const labelId = getRouterParam(event, 'labelId');

  console.info('Getting label with name:', labelId);

  // Check if the label already exists
  const existingLabel = await db.get('SELECT * FROM labels WHERE id = ?', [labelId]);
  if (!existingLabel) {
    return { status: 400, error: 'Label doesn\'t exists' };
  }

  try {
    await db.run('DELETE FROM labels WHERE id = ?', labelId);
    console.info('Label deleted with id:', labelId);
    return { status: 204 };
  } catch (error) {
    console.error('Failed to delete label:', error);
    return { status: 500, error: 'Error deleting label' };
  }
});
