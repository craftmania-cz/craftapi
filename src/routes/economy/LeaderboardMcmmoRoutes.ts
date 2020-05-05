import { NextFunction, Request, Response, Router } from "express";
import * as Res from "../../services/response";
import Mcmmo_stats from "../../controllers/economy/mcmmo_stats";

export class LeaderboardMcmmoRoutes {

	public router: Router;

	constructor() {
		this.router = Router();
		this.init();
	}

	public missingRoute(_req: Request, res: Response, _next: NextFunction) {
		res.json(Res.property_required(res, 'Server route').json);
	}

	public init() {
		this.router.get('/', this.missingRoute);

		this.router.get('/swords', Mcmmo_stats.getTop50Swords);
		this.router.get('/taming', Mcmmo_stats.getTop50Taming);
		this.router.get('/mining', Mcmmo_stats.getTop50Mining);
		this.router.get('/woodcutting', Mcmmo_stats.getTop50Woodcutting);
		this.router.get('/repair', Mcmmo_stats.getTop50Repair);
		this.router.get('/unarmed', Mcmmo_stats.getTop50Unarmed);
		this.router.get('/herbalism', Mcmmo_stats.getTop50Herbalism);
		this.router.get('/excavation', Mcmmo_stats.getTop50Excavation);
		this.router.get('/archery', Mcmmo_stats.getTop50Archery);
		this.router.get('/axes', Mcmmo_stats.getTop50Axes);
		this.router.get('/acrobatics', Mcmmo_stats.getTop50Acrobatics);
		this.router.get('/fishing', Mcmmo_stats.getTop50Fishing);
		this.router.get('/alchemy', Mcmmo_stats.getTop50Alchemy);
		this.router.get('/total', Mcmmo_stats.getTop50Total);

	}

}

const leaderboardLevelsRoutes = new LeaderboardMcmmoRoutes();
leaderboardLevelsRoutes.init();

export default leaderboardLevelsRoutes.router;
