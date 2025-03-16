import express from 'express';
import userRoutes from '../app/routes/v1';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

userRoutes(app)
export default app;
