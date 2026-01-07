import { Contact, CreteContactMeDTO } from '../types';
import pool from './db';

export const emailRegex =
  /^(?!.*\.\.)[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

export class ContactModel {
  public static isValidEmail(email: string): boolean {
    return emailRegex.test(email);
  }

  public static async create(
    data: CreteContactMeDTO
  ): Promise<Contact | undefined> {
    const { name, email, message } = data;
    if (!this.isValidEmail(email)) {
      console.log('Please input a valid email address');
      return;
    }
    const result = await pool.query(
      'INSERT INTO contact_me (name, email, message) VALUES ($1, $2, $3) RETURNING *',
      [name, email, message]
    );
    return result.rows[0];
  }

  public static async getById(id: number): Promise<Contact | undefined> {
    const result = await pool.query('SELECT * FROM contact_me WHERE id = $1', [
      id,
    ]);
    if (!result) {
      console.log('No contact found for select id');
      return;
    }
    return result.rows[0];
  }

  public static async getAll(): Promise<Contact[] | undefined> {
    const result = await pool.query(
      'SELECT * FROM contact_me ORDER BY created_at'
    );
    return result.rows;
  }
}
