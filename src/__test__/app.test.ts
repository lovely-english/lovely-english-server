import request from 'supertest';

import app from '../app';

describe('App Endpoint', () => {
  it('should return 200 OK and server is up message', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Server is up ✅ - Environment: test');
    expect(res.body.error).toBeFalsy();
  });
});
