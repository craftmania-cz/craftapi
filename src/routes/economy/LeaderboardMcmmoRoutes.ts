import { NextFunction, Request, Response, Router } from "express";
import * as Res from "../../services/response";
import Mcmmo_stats from "../../controllers/economy/mcmmo_stats";

export class LeaderboardMcmmoRoutes {

	public router: Router;

	constructor() {
		this.router = Router();
		this.init();
	}

	public missingServerRoute(_req: Request, res: Response, _next: NextFunction) {
		res.json(Res.property_required(res, 'Server route').json);
	}

	public missingAbilityRoute(_req: Request, res: Response, _next: NextFunction) {
		res.json(Res.property_required(res, 'McMMO Ability Type').json);
	}

	public init() {
		this.router.get('/', this.missingServerRoute);
		this.router.get('/:server', this.missingAbilityRoute);
		this.router.get('/:server/:abilityType', Mcmmo_stats.getMcMMOStatistics);
	}

}

const leaderboardLevelsRoutes = new LeaderboardMcmmoRoutes();
leaderboardLevelsRoutes.init();

export default leaderboardLevelsRoutes.router;
