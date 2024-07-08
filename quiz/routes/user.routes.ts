
import { Router } from 'express';
import { QuestionController} from '../controller/question.controller';
import { UserController} from '../controller/user.controller';


const userController = new UserController();
const qController = new QuestionController();


const router = Router();

router.post('/signup', userController.createUser);
router.post('/login', userController.login);

//question routes
// router.post('/createQue', qController.createQuestion);


export { router };