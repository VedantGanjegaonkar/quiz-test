
import { Router } from 'express';
import { QuizController} from '../controller/QuizController';
import { UserController} from '../controller/user.controller';


const userController = new QuizController();



const router = Router();

router.post('/create', userController.createQuiz);   //first quiz
router.post('/createD', userController.createQuizDynamically);   //dynamic
router.get('/getFirstQuiz', userController.getQuiz);
router.get('/:id', userController.getnewQuiz);

export default router;