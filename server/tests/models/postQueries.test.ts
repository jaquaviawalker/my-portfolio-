import { PostModel } from '../../src/models/Post';
import { Post, CreatePostDTO, UpdatePostDTO } from '../../src/types';
import pool from '../../src/models/db';

jest.mock('../../src/models/db', () => ({
  query: jest.fn(),
}));

const mockedQuery = pool.query as jest.Mock;

const mockPosts = [
  {
    id: 1,
    title: 'First Post',
    content: 'First post content',
    img_path: '/images/first.jpg',
  },
  {
    id: 2,
    title: 'Second Post',
    content: 'Second post content',
    img_path: '/images/second.jpg',
  },
];

describe('PostModel', () => {
  beforeEach(() => mockedQuery.mockReset());

  it('should return all posts', async () => {
    mockedQuery.mockResolvedValue({ rows: mockPosts });
    const result = await PostModel.getAll();
    expect(result).toEqual(mockPosts);
    expect(result).toHaveLength(2);
  });
  it('should return post by selected id', async () => {
    mockedQuery.mockResolvedValue({ rows: mockPosts });
    const result = await PostModel.getById(1);
    expect(result).toEqual(mockPosts[0]);
  });
  it('should add new post to database', async () => {
    const createdPost = {
      id: 3,
      title: 'my new post',
      content: 'this is my new post',
      img_path: 'img/newpost',
    };
    mockedQuery.mockResolvedValue({ rows: [createdPost] });
    const result = await PostModel.create({
      title: createdPost.title,
      content: createdPost.content,
      img_path: createdPost.img_path,
    });
    expect(result).toEqual(createdPost);
  });
});
