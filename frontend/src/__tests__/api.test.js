import { describe, it, expect } from 'vitest';
import api from '../services/api';

describe('API Service', () => {
  it('deve criar instancia axios com baseURL correto', () => {
    expect(api.defaults.baseURL).toBe('http://localhost:8000/api');
  });

  it('deve ter método post', () => {
    expect(typeof api.post).toBe('function');
  });

  it('deve ter método get', () => {
    expect(typeof api.get).toBe('function');
  });
});
