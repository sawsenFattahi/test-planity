import request from 'supertest';
import express from 'express';
import { apiKeyAuthMiddleware } from '../../middelware/api-key-auth-middleware';  // Adjust the path as needed

// Create an Express app for testing
const app = express();

// Use the middleware in the app
app.use(apiKeyAuthMiddleware);

app.get('/test', (req, res) => {
  res.status(200).json({ message: 'Success' });
});

describe('API Key Authentication Middleware', () => {
  const validApiKey = 'valid-api-key';
  const validBearerToken = `Bearer ${validApiKey}`;

  beforeAll(() => {
    process.env.API_KEY = validApiKey; // Set the valid API key in the environment
  });

  afterAll(() => {
    jest.clearAllMocks(); // Clean up after tests
  });

  it('should return 200 for requests with a valid Bearer token', async () => {
    const response = await request(app)
      .get('/test')
      .set('Authorization', validBearerToken);  // Valid Bearer token

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Success');
  });

  it('should return 403 for requests with an invalid Bearer token', async () => {
    const invalidBearerToken = 'Bearer invalid-api-key'; // Invalid API key
    const response = await request(app)
      .get('/test')
      .set('Authorization', invalidBearerToken);  // Invalid Bearer token

    expect(response.status).toBe(403);
    expect(response.body.message).toBe('Forbidden: Invalid API key');
  });

  it('should return 403 for requests with no Bearer token', async () => {
    const response = await request(app)
      .get('/test')
      .set('Authorization', '');  // No Authorization header

    expect(response.status).toBe(403);
    expect(response.body.message).toBe('Forbidden: No API key provided');
  });

  it('should return 403 for requests with incorrect Authorization header format', async () => {
    const incorrectFormatToken = 'Basic invalid-api-key'; // Incorrect format, not Bearer
    const response = await request(app)
      .get('/test')
      .set('Authorization', incorrectFormatToken);  // Incorrect format

    expect(response.status).toBe(403);
    expect(response.body.message).toBe('Forbidden: Invalid API key');
  });

  it('should return 403 for requests with undefined Authorization header', async () => {
    const response = await request(app)
      .get('/test')
      .unset('Authorization');  // No Authorization header at all

    expect(response.status).toBe(403);
    expect(response.body.message).toBe('Forbidden: No API key provided');
  });
});
