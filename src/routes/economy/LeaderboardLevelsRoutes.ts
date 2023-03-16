import { NextFunction, Request, Response, Router } from "express";
import * as Res from "../../services/response";
import EconomyTopLevels from "../../controllers/economy/economy_levels";

export class LeaderboardLevelsRoutes {
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

		this.router.get('/global', EconomyTopLevels.getTopGlobalLevels);
		this.router.get('/creative', EconomyTopLevels.getTopCreativeLevels);
		this.router.get('/survival', EconomyTopLevels.getTopSurvivalLevels118);
		this.router.get('/skyblock', EconomyTopLevels.getTopSkyblockLevels118);
		this.router.get('/vanilla', EconomyTopLevels.getTopVanillaLevels118);

		// Legacy
		this.router.get('/skycloud', EconomyTopLevels.getTopSkycloudLevels);
		this.router.get('/hardcore-vanilla', EconomyTopLevels.getTopHardcoreVanillaLevels);
		this.router.get('/prison', EconomyTopLevels.getTopPrisonLevels);
		this.router.get('/vanilla_116', EconomyTopLevels.getTopVanilla116Levels);
		this.router.get('/survival_117', EconomyTopLevels.getTopSurvivalLevels117);
		this.router.get('/skyblock_117', EconomyTopLevels.getTopSkyblockLevels117);
		this.router.get('/vanilla_116', EconomyTopLevels.getTopVanillaLevels116);
	}

}

const leaderboardLevelRoutes = new LeaderboardLevelsRoutes();
leaderboardLevelRoutes.init();

export default leaderboardLevelRoutes.router;
