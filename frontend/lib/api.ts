export interface Person {
  id: number;
  name: string;
  email: string;
  birthDate: string;
}

export type PersonInput = Omit<Person, 'id'>;

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function handleApiError(res: Response): Promise<never> {
  let message = `Unexpected error (${res.status})`;

  try {
    const body = await res.json();
    if (body.message) {
      message = body.message;
    }
  } catch {
    // Response body is not JSON, keep the fallback message
  }

  throw new ApiError(message, res.status);
}

export const api = {
  async getPersons(): Promise<Person[]> {
    const res = await fetch(`${API_URL}/pessoas`);
    if (!res.ok) await handleApiError(res);
    return res.json();
  },

  async getPerson(id: number): Promise<Person> {
    const res = await fetch(`${API_URL}/pessoa/${id}`);
    if (!res.ok) await handleApiError(res);
    return res.json();
  },

  async createPerson(data: PersonInput): Promise<Person> {
    const res = await fetch(`${API_URL}/pessoa`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) await handleApiError(res);
    return res.json();
  },

  async updatePerson(id: number, data: PersonInput): Promise<Person> {
    const res = await fetch(`${API_URL}/pessoa/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) await handleApiError(res);
    return res.json();
  },

  async deletePerson(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/pessoa/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) await handleApiError(res);
  },
};
