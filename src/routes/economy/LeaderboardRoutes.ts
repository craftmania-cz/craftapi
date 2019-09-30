import { Router, Request, Response, NextFunction } from 'express';
import * as Res from "../../services/response";
import EconomyTopVotes from "../../controllers/economy/economy_topVotes";

export class LeaderboardRoutes {
	public router: Router;

	constructor() {
		this.router = Router();
		this.init();
	}

	public missingRoute(_req: Request, res: Response, _next: NextFunction) {
		res.json(Res.property_required(res, 'Leaderboard route').json);
	}

	public init() {
		this.router.get('/', this.missingRoute);
		this.router.get('/total-votes', EconomyTopVotes.getTop50Total);
		this.router.get('/month-votes', EconomyTopVotes.getTop50Month);
		this.router.get('/week-votes', EconomyTopVotes.getTop50Week);
	}
}

const leaderboardRoutes = new LeaderboardRoutes();
leaderboardRoutes.init();

export default leaderboardRoutes.router;
