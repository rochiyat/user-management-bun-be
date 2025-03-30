import { describe, expect, it, beforeAll } from 'bun:test';
import request from 'supertest';
import app from '../index';

describe('GET /api/users', () => {
  let response: request.Response;

  beforeAll(async () => {
    response = await request(app).get('/api/users');
  });

  it('should return 200 status code', () => {
    expect(response.status).toBe(200);
  });

  it('should return an array of users', () => {
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should return users with the correct properties', () => {
    if (response.body.length > 0) {
      const user = response.body[0];

      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('password');
      expect(user).toHaveProperty('createdAt');
      expect(user).toHaveProperty('updatedAt');

      expect(typeof user.id).toBe('string');
      expect(typeof user.name).toBe('string');
      expect(typeof user.email).toBe('string');
      expect(typeof user.password).toBe('string');
      expect(new Date(user.createdAt).toString()).not.toBe('Invalid Date');
      expect(new Date(user.updatedAt).toString()).not.toBe('Invalid Date');
    }
  });
});

describe('GET /users/:id', () => {
  it('should return user data for a valid UUID', async () => {
    const validId = 'c75fca81-97a7-47a4-af3b-4c0735f51a9c';

    const response = await request(app).get(`/api/users/${validId}`);
    expect(response.status).toBe(200);

    const data = response.body;
    expect(data).toMatchObject({
      data: {
        createdAt: expect.any(String),
        email: expect.any(String),
        id: expect.any(String),
        name: expect.any(String),
        password: expect.any(String),
        updatedAt: expect.any(String),
      },
      message: expect.any(String),
      status: expect.any(String),
    });
  });

  it('should return 404 for non-existing UUID', async () => {
    const nonExistingId = '123e4567-e89b-12d3-a456-426614174999';

    const response = await request(app).get(`/api/users/${nonExistingId}`);
    expect(response.status).toBe(404);
  });

  it('should return 400 for invalid UUID format', async () => {
    const invalidId = 'not-a-valid-uuid';

    const response = await request(app).get(`/api/users/${invalidId}`);
    expect(response.status).toBe(400);
  });
});
