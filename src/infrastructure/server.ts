import express from 'express';
import userRoutes from '../app/routes/v1';
import userRoutesV2 from '../app/routes/v2';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

userRoutes(app)
userRoutesV2(app)
export default app;
