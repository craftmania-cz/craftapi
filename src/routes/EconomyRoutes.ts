import { Router, Request, Response, NextFunction } from 'express';
import * as Res from "../services/response";
import EconomyCalcLevel from "../controllers/economy/economy_calclevel";
import Economy from "../controllers/economy/economy";

export class EconomyRoutes {
	public router: Router;

	constructor() {
		this.router = Router();
		this.init();
	}

	public missingRoute(_req: Request, res: Response, _next: NextFunction) {
		res.json(Res.property_required(res, 'Economy route').json);
	}

	public missingLevel(_req: Request, res: Response, _next: NextFunction) {
		res.json(Res.property_required(res, 'Missing level number').json);
	}

	public init() {
		this.router.get('/', this.missingRoute);
		this.router.get('/log', Economy.getEconomyLog);
		this.router.get('/calcLevel/', this.missingLevel);
		this.router.get('/calcLevel/:level', EconomyCalcLevel.calcLevel);
	}
}

const economyRoutes = new EconomyRoutes();
economyRoutes.init();

export default economyRoutes.router;
