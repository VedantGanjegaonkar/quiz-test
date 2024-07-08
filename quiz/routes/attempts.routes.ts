import { Router } from 'express';
import { AttemtsController} from '../controller/attempt.controller';



const userController = new AttemtsController();



const router = Router();

router.post('/start', userController.startQuiz);
router.post('/answer', userController.answerQuestion);



export default router;