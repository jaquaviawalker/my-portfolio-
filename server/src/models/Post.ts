import { Post, CreatePostDTO, UpdatePostDTO } from '../types';
import pool from './db';

export class PostModel {
  static async getAll(): Promise<Post[]> {
    const result = await pool.query('SELECT * FROM posts');
    return result.rows;
  }
  static async getById(id: number): Promise<Post | undefined> {
    const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
    return result.rows[0];
  }
  static async create(data: CreatePostDTO): Promise<Post> {
    const { title, content, img_path } = data;
    const result = await pool.query(
      'INSERT INTO posts (title, content, img_path) VALUES ($1, $2, $3) RETURNING *',
      [title, content, img_path]
    );
    return result.rows[0];
  }
  static async update(
    id: number,
    updates: UpdatePostDTO
  ): Promise<Post | undefined> {
    const fields = [];
    const values = [];
    let paramCount = 1;

    // Build SET clause dynamically
    if (updates.title !== undefined) {
      fields.push(`title = $${paramCount++}`);
      values.push(updates.title);
    }

    if (updates.content !== undefined) {
      fields.push(`content = $${paramCount++}`);
      values.push(updates.content);
    }

    if (updates.img_path !== undefined) {
      fields.push(`img_path = $${paramCount++}`);
      values.push(updates.img_path);
    }

    // If no fields to update, return early
    if (fields.length === 0) {
      throw new Error('No fields to update');
    }

    // Add id as the last parameter
    values.push(id);

    const query = `
    UPDATE posts 
    SET ${fields.join(', ')} 
    WHERE id = $${paramCount} 
    RETURNING *
  `;

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM posts WHERE id = $1', [id]);
    const rowCount = result.rowCount ?? 0;
    return rowCount > 0;
  }
}
