import { Router, Request, Response, NextFunction } from 'express';
import * as Res from "../services/response";
import Achievements from "../controllers/achievements/achievements";

export class AchievementRoutes {
	public router: Router;

	constructor() {
		this.router = Router();
		this.init();
	}

	public missingRoute(_req: Request, res: Response, _next: NextFunction) {
		res.json(Res.property_required(res, 'Achievement route').json);
	}

	public init() {
		this.router.get('/', this.missingRoute);
		this.router.get('/log', Achievements.getAchievementLog);
	}
}

const achievementRoutes = new AchievementRoutes();
achievementRoutes.init();

export default achievementRoutes.router;
