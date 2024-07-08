import { Router } from 'express';

import { QuestionController} from '../controller/question.controller';


const qController = new QuestionController();

const router = Router();

router.post('/create', qController.createQuestion);
// router.post('/createMany', qController.createManyQuestions);



export default router;