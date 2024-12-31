export const apiKeyAuthMiddleware = (req: any, res: any, next: any) => {
  const authorizationHeader = req.headers['authorization'];

  if (!authorizationHeader) {
    return res.status(403).json({ message: 'Forbidden: No API key provided' });
  }

  const [scheme, apiKey] = authorizationHeader.split(' ');

  if (scheme !== 'Bearer' || apiKey !== process.env.API_KEY) {
    return res.status(403).json({ message: 'Forbidden: Invalid API key' });
  }

  next();
};
