import { ContactModel } from '../../src/models/Contact';
import pool from '../../src/models/db';

jest.mock('../../src/models/db', () => ({
  query: jest.fn(),
}));

const mockedQuery = pool.query as jest.Mock;

const mockContacts = [
  {
    id: 1,
    name: 'Jaquavia',
    email: 'jaquavia@email.com',
    message: 'This is my contact info',
  },
  {
    id: 2,
    name: 'Demone',
    email: 'demone@email.com',
    message: 'This is also my contact info',
  },
];

describe('Contact Model', () => {
  const mockedLogger = jest.spyOn(console, 'log').mockImplementation(() => {});

  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    mockedLogger.mockRestore();
  });

  it('should return if email address is not valid', async () => {
    const dto = {
      name: 'Jaquavia',
      email: 'invalid-email',
      message: 'Hello!',
    };

    const result = await ContactModel.create(dto as any);

    expect(result).toBeUndefined();
    expect(mockedQuery).not.toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(
      'Please input a valid email address'
    );
  });

  it('should create a new contact when email is valid', async () => {
    const dto = {
      name: 'Jaquavia',
      email: 'valid@email.com',
      message: 'Hello!',
    };

    const createdContact = { id: 1, ...dto, email: 'valid@email.com' };

    mockedQuery.mockResolvedValue({ rows: [createdContact] });

    const result = await ContactModel.create(dto as any);

    expect(mockedQuery).toHaveBeenCalledWith(
      'INSERT INTO contact_me (name, email, message) VALUES ($1, $2, $3) RETURNING *',
      [dto.name, dto.email, dto.message]
    );
    expect(result).toEqual(createdContact);
  });

  it('should return if no id for contact exists', async () => {
    mockedQuery.mockResolvedValue(undefined);
    const result = await ContactModel.getById(0);

    expect(result).toBeUndefined();
    expect(mockedQuery).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith('No contact found for select id');
  });

  it('should return contact for selected id', async () => {
    mockedQuery.mockResolvedValue({ rows: [mockContacts[0]] });

    const result = await ContactModel.getById(mockContacts[0].id);

    expect(mockedQuery).toHaveBeenCalledWith(
      'SELECT * FROM contact_me WHERE id = $1',
      [mockContacts[0].id]
    );
    expect(result).toEqual(mockContacts[0]);
  });

  it('should return all contacts', async () => {
    mockedQuery.mockResolvedValue({ rows: mockContacts });

    const result = await ContactModel.getAll();

    expect(mockedQuery).toHaveBeenCalledWith(
      'SELECT * FROM contact_me ORDER BY created_at'
    );
    expect(result).toEqual(mockContacts);
  });
});
