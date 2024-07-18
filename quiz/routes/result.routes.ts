
import { Router } from 'express';
import { ResultController } from '../controller/result.controller';


const resultController = new ResultController();



const router = Router();

router.get('/', resultController.getAttempts);
router.get('/:id', resultController.getAttemptDetails);

export default router;