import { Router } from 'express';
import googleAuthRoute from './google';

const router = Router();

router.use(googleAuthRoute);

export default router;
