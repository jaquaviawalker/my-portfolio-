-- Drop tables if they exist (for clean setup)
DROP TABLE IF EXISTS contact_me CASCADE;
DROP TABLE IF EXISTS posts CASCADE;

-- Create posts table
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    img_path TEXT 
);

-- Create contact_me table
CREATE TABLE contact_me (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Verify the setup
SELECT 'Database schema created successfully!' AS status;