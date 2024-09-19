CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE workspaces (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  owner_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_workspace_name_owner UNIQUE (name, owner_id)
);

CREATE TABLE boards (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  workspace_id BIGINT REFERENCES workspaces(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_board_name_workspace UNIQUE (name, workspace_id)
);

CREATE TABLE lists (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  board_id BIGINT REFERENCES boards(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_list_name_board UNIQUE (name, board_id)
);

CREATE TABLE cards (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  list_id BIGINT REFERENCES lists(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_workspaces_owner ON workspaces(owner_id);
CREATE INDEX idx_boards_workspace ON boards(workspace_id);
CREATE INDEX idx_lists_board ON lists(board_id);
CREATE INDEX idx_cards_list ON cards(list_id);
