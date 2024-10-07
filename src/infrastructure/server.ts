import express from 'express';
import userRoutes from '../app/routes';

export const app = express();
userRoutes(app)
export default app;
