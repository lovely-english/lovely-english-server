import express from 'express';

import userRouter from 'src/routes/user';

const router = express.Router();

// router.use('/auth', authRouter);
router.use('/user', userRouter);

export default router;
