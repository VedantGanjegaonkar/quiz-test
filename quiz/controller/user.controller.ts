import { Request, Response,NextFunction } from 'express';
import { UserService } from '../service/user.service';
import{errorHandler} from "../middleware/errorHandler.middleware"

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();

        this.login = this.login.bind(this);
        this.createUser = this.createUser.bind(this);
    }

    public async login(req: Request, res: Response, next:NextFunction): Promise<void> {
        try {
            const { email, password } = req.body;

            const user = await this.userService.findUserByEmail(email);

            await this.userService.validatePassword(password, user.password);

            const token = this.userService.generateAuthToken(user._id.toString(), user.role);

            res.status(200).json({ message: 'Login successful', token });
        } catch (err: any) {
            errorHandler(err,req,res,next)
        }
    }

    public async createUser(req: Request, res: Response,next:NextFunction): Promise<void> {
        try {
            const {  firstName,lastName, email, role, acceptTerms,password} = req.body;

            // Create the user object
            const createUserParams = { firstName,lastName, email, role, acceptTerms,password };

            // Call the service to create a user
            const newUser = await this.userService.createUser(req.body);

            res.status(201).json({ message: 'User created successfully', user: newUser });
        } catch (err: any) {
            errorHandler(err,req,res,next)
        }
    }
}