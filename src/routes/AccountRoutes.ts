import { Router, Request, Response, NextFunction } from 'express';
import * as Res from "../services/response";
import LoginGenerator from "../utils/authentification/LoginGenerator";
import RegisterGenerator from "../utils/authentification/RegisterGenerator";
import Permissions from "../controllers/account/permissions";
import TokenAuth from "../utils/authentification/tokenAuth";

export class AccountRoutes {
	public router: Router;

	constructor() {
		this.router = Router();
		this.init();
	}

	public missingRoute(_req: Request, res: Response, _next: NextFunction) {
		res.json(Res.property_required(res, 'Quest route').json);
	}

	public init() {
		let loginHandler = new LoginGenerator();
		this.router.post('/login', loginHandler.login);

		let registerHandler = new RegisterGenerator();
		this.router.post('/register', registerHandler.register);

		let tokenAuth = new TokenAuth();
		this.router.get('/permissions', Permissions.getPermissions);

		this.router.post('/tokenCheck', Permissions.checkIfTokensIsValid);

	}
}

const accountRoutes = new AccountRoutes();
accountRoutes.init();

export default accountRoutes.router;
