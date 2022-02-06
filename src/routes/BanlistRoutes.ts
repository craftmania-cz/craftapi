import { Router, Request, Response, NextFunction } from 'express';
import * as Res from "../services/response";
import Banlist from "../controllers/banlist/banlistPunishmentList";
import { BanlistGlobalStats } from "../controllers/banlist/banlistGlobalStats";

export class BanlistRoutes {
	public router: Router;

	constructor() {
		this.router = Router();
		this.init();
	}

	public missingRoute(_req: Request, res: Response, _next: NextFunction) {
		res.json(Res.property_required(res, 'Banlist route').json);
	}

	public init() {
		this.router.get('/stats', BanlistGlobalStats.getStatistics);
		this.router.get('/list/:type', Banlist.getGlobalList);
		this.router.get('/list/:type/:page', Banlist.getGlobalList);
		this.router.get('/lookup/:nick/:page', Banlist.getPlayerLookup);
		//this.router.get('/lookup-at/:nick/:type/:page');
	}
}

const banlistRoutes = new BanlistRoutes();
banlistRoutes.init();

export default banlistRoutes.router;
