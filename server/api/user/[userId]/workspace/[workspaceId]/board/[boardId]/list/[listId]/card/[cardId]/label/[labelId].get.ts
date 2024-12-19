import { getDatabase } from '~/server/middleware/db';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const db = await getDatabase();
  const labelId = getRouterParam(event, 'labelId');

  const label = await db.get('SELECT * FROM labels WHERE id = ?', labelId);
  if (!label) {
    return { status: 404, error: `Label not found: ${labelId}` };
  }

  return { status: 200, label };
});
