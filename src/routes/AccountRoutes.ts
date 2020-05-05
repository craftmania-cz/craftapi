import { Router, Request, Response, NextFunction } from 'express';
import * as Res from "../services/response";
import LoginGenerator from "../utils/authentification/LoginGenerator";

export class AccountRoutes {
	public router: Router;

	constructor() {
		this.router = Router();
		this.init();
	}

	public missingRoute(_req: Request, res: Response, _next: NextFunction) {
		res.json(Res.property_required(res, 'Achievement route').json);
	}

	public init() {
		let loginHandler = new LoginGenerator();
		this.router.post('/login', loginHandler.login);
		this.router.post('/register');

	}
}

const accountRoutes = new AccountRoutes();
accountRoutes.init();

export default accountRoutes.router;
