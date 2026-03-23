export interface Pessoa {
  id: number;
  name: string;
  email: string;
  birthDate: string; // ISO string format YYYY-MM-DD
}

export type PessoaInput = Omit<Pessoa, 'id'>;

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export const api = {
  async getPessoas(): Promise<Pessoa[]> {
    const res = await fetch(`${API_URL}/pessoas`);
    if (!res.ok) throw new Error('Failed to fetch pessoas');
    return res.json();
  },

  async getPessoa(id: number): Promise<Pessoa> {
    const res = await fetch(`${API_URL}/pessoa/${id}`);
    if (!res.ok) throw new Error('Failed to fetch pessoa');
    return res.json();
  },

  async createPessoa(data: PessoaInput): Promise<Pessoa> {
    const res = await fetch(`${API_URL}/pessoa`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create pessoa');
    return res.json();
  },

  async updatePessoa(id: number, data: PessoaInput): Promise<Pessoa> {
    const res = await fetch(`${API_URL}/pessoa/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update pessoa');
    return res.json();
  },

  async deletePessoa(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/pessoa/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete pessoa');
  },
};
