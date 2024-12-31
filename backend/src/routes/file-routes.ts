import { Router } from 'express';
import { csvController} from '../controllers/csv-controller';
import { uploadMiddleware } from '../middelware/upload-middelware'
import { apiKeyAuthMiddleware } from '../middelware/api-key-auth-middleware';

const router = Router();

router.post('/upload', apiKeyAuthMiddleware, uploadMiddleware, csvController);

export default router;
