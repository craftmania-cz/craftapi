import { Router, Request, Response, NextFunction } from 'express';
import * as Ccomunity from "../controllers/player/ccomunity_profile";
import * as Res from "../services/response";
import * as PlayerVipStatus from "../controllers/player/vipstatus_profile";
import HalloweenStats from "../controllers/player/halloween_stats";
import KarmaHistory from '../controllers/player/karma_history';

export class PlayerRoutes {
	public router: Router;

	constructor() {
		this.router = Router();
		this.init();
	}

	public unknownRoute(_req: Request, res: Response, _next: NextFunction) {
		res.status(200).json(Res.property_required(res, 'Unknown route').json);
	}

	public init() {

		// Name routes
		this.router.get('/', this.unknownRoute);
		this.router.get('/:name', Ccomunity.getProfileByName);
		this.router.get('/:name/vip', PlayerVipStatus.getVIPByName);
		this.router.get('/:name/halloween', HalloweenStats.getStatsByName);
		this.router.get('/:name/karma', KarmaHistory.getHistoryByname);

		// UUID routes
		this.router.get('/uuid', this.unknownRoute);
		this.router.get('/uuid/:uuid', Ccomunity.getProfileByUUID);
		this.router.get('/uuid/:uuid/vip', PlayerVipStatus.getVIPByUUID);
	}
}

const playerRoutes = new PlayerRoutes();
playerRoutes.init();

export default playerRoutes.router;
