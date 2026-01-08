import { PostModel } from '../models/Post';
import { Request, Response } from 'express';

export class PostController {
  static async create(req: Request, res: Response) {
    const { title, content, img_path } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Missing fields' });
    }
    try {
      const createdPost = await PostModel.create({ title, content, img_path });
      return res.status(201).json(createdPost);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create post' });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const posts = await PostModel.getAll();
      return res.status(200).json(posts);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to get posts' });
    }
  }
  static async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: 'Invalid id' });
    }
    try {
      const post = await PostModel.getById(id);
      if (!post) return res.status(404).json({ error: 'Post not found' });
      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch post' });
    }
  }
  static async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: 'Invalid id' });
    }
    const { title, content, img_path } = req.body;
    if (!title && !content && !img_path) {
      return res.status(400).json({ error: 'At least one field is required' });
    }
    try {
      const updatedPost = await PostModel.update(id, {
        title,
        content,
        img_path,
      });
      if (!updatedPost) {
        return res.status(404).json({ error: 'Post not found' });
      }
      return res.status(200).json(updatedPost);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update post' });
    }
  }
  static async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: 'Invalid id' });
    }
    try {
      const deletedPost = await PostModel.delete(id);
      if (!deletedPost) {
        return res.status(404).json({ error: 'Post not found' });
      }
      return res.status(200).json({ deleted: true });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete post' });
    }
  }
}
