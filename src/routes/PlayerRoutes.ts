import { Router, Request, Response, NextFunction } from 'express';
import * as Ccomunity from "../controllers/player/ccomunity_profile";
import * as Res from "../services/response";

export class PlayerRoutes {
	public router: Router;

	constructor() {
		this.router = Router();
		this.init();
	}

	public missingName(_req: Request, res: Response, _next: NextFunction) {
		res.status(200).json(Res.property_required(res, 'Player name').json);
	}

	public missingUUID(_req: Request, res: Response, _next: NextFunction) {
		res.status(200).json(Res.property_required(res, 'Player UUID').json);
	}

	public init() {
		this.router.get('/', this.missingName);
		this.router.get('/:name', Ccomunity.getProfileByName);
		this.router.get('/uuid', this.missingUUID); //TODO: Fix, presunout do vlastni route?
		this.router.get('/uuid/:uuid', Ccomunity.getProfileByUUID)
	}
}

const playerRoutes = new PlayerRoutes();
playerRoutes.init();

export default playerRoutes.router;
