-- Create Database
CREATE DATABASE IF NOT EXISTS technical_test_app CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE technical_test_app;

-- Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    display_name VARCHAR(100),
    bio TEXT,
    avatar_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE murmurs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    like_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Follows Table (User relationships)
CREATE TABLE follows (
    follower_id INT NOT NULL,
    following_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (follower_id, following_id),
    FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (following_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_follower (follower_id),
    INDEX idx_following (following_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Likes Table
CREATE TABLE likes (
    user_id INT NOT NULL,
    murmur_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, murmur_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (murmur_id) REFERENCES murmurs(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_murmur_id (murmur_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Insert Sample Data
-- Sample Users
INSERT INTO users (username, email, password_hash, display_name, bio) VALUES
('john_doe', 'john@example.com', '$2b$10$dummyhash1', 'John Doe', 'Software developer'),
('jane_smith', 'jane@example.com', '$2b$10$dummyhash2', 'Jane Smith', 'Designer & Photographer'),
('bob_wilson', 'bob@example.com', '$2b$10$dummyhash3', 'Bob Wilson', 'Tech enthusiast');

-- Sample Murmurs
INSERT INTO murmurs (user_id, content, like_count) VALUES
(1, 'Hello World! This is my first murmur.', 5),
(1, 'Learning NestJS is amazing!', 3),
(2, 'Just finished a great design project!', 8),
(2, 'React hooks make development so much easier.', 12),
(3, 'Anyone else excited about new tech trends?', 6),
(1, 'Building a Twitter clone for practice.', 15);

-- Sample Follows
INSERT INTO follows (follower_id, following_id) VALUES
(1, 2),
(1, 3),
(2, 1),
(3, 1),
(3, 2);

-- Sample Likes
INSERT INTO likes (user_id, murmur_id) VALUES
(2, 1),
(3, 1),
(1, 3),
(3, 4),
(2, 5);