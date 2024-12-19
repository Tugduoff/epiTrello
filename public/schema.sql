CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE workspaces (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_workspace_name_owner UNIQUE (name, owner_id)
);

CREATE TABLE workspace_members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  workspace_id INTEGER REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(50) DEFAULT 'Member',
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_workspace_user UNIQUE (workspace_id, user_id)
);

CREATE TABLE board_members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  board_id INTEGER REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT unique_board_user UNIQUE (board_id, user_id)
);

CREATE TABLE boards (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  color VARCHAR(7) DEFAULT '#FFFFFF',
  workspace_id INTEGER REFERENCES workspaces(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_board_name_workspace UNIQUE (name, workspace_id)
);

CREATE TABLE lists (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(100) NOT NULL,
  board_id INTEGER REFERENCES boards(id) ON DELETE CASCADE,
  column INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cards (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  priority INTEGER DEFAULT 0,
  start_date TIMESTAMP,
  due_date TIMESTAMP,
  list_id INTEGER REFERENCES lists(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  color VARCHAR(7) DEFAULT '#FFFFFF'
);

CREATE TABLE labels (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(50) NOT NULL,
  color VARCHAR(7) DEFAULT '#FFFFFF',
  board_id INTEGER REFERENCES boards(id) ON DELETE CASCADE,
  CONSTRAINT unique_label_name_board UNIQUE (name, board_id)
);

CREATE TABLE card_labels (
  card_id INTEGER REFERENCES cards(id) ON DELETE CASCADE,
  label_id INTEGER REFERENCES labels(id) ON DELETE CASCADE,
  PRIMARY KEY (card_id, label_id)
);

CREATE TABLE card_assignees (
  card_id INTEGER REFERENCES cards(id) ON DELETE CASCADE,
  assignee_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  PRIMARY KEY (card_id, assignee_id)
);

CREATE INDEX idx_workspaces_owner ON workspaces(owner_id);
CREATE INDEX idx_boards_workspace ON boards(workspace_id);
CREATE INDEX idx_lists_board ON lists(board_id);
CREATE INDEX idx_cards_list ON cards(list_id);
