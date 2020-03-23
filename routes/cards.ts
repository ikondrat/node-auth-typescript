import { Router } from 'express';
import { Response } from 'express';
import verifyToken, { AuthRequest } from './verifyToken';
// import User from '../model/User';

const router = Router();

router.get('/', verifyToken, (req: AuthRequest, res: Response) => {
  res.send(req.user);
  // User.findOne({
  //   _id: req.user,
  // });
});

export default router;
