import { getDatabase } from '~/server/middleware/db';
import { H3Event, readBody } from 'h3';

interface CreateRequest {
  owner_id: string;
  name: string;
  description: string;
}

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody<CreateRequest>(event);
  const { owner_id, name, description } = body;

  const db = await getDatabase();

  // Check if the workspace already exists
  const existingWorkspace = await db.get('SELECT * FROM workspaces WHERE owner_id = ? AND name = ?', [owner_id, name]);
  if (existingWorkspace) {
    return { status: 400, body: { error: 'Workspace already exists' } };
  }

  // Insert the new workspace into the database
  await db.run('INSERT INTO workspaces (owner_id, name, description) VALUES (?, ?, ?)', [owner_id, name, description]);

  const newWorkspace = await db.get('SELECT * FROM workspaces WHERE owner_id = ? AND name = ?', [owner_id, name]);

  return { status: 201, workspace: newWorkspace };
});
