import { Router, Request, Response, NextFunction } from 'express';
import * as Res from "../../services/response";
import EconomyTopVotes from "../../controllers/economy/economy_topVotes";
import EconomyTopCoins from "../../controllers/economy/economy_playercoins";
import HalloweenGame from "../../controllers/server/halloween_game";
import { BSkyblockTopIslands } from "../../controllers/islands/BSkyblockTops";

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

		// Votes
		this.router.get('/total-votes', EconomyTopVotes.getTop50Total);
		this.router.get('/month-votes', EconomyTopVotes.getTop50Month);
		this.router.get('/week-votes', EconomyTopVotes.getTop50Week);

		// Economy
		this.router.get('/craftcoins', EconomyTopCoins.getTopCraftcoins);
		this.router.get('/votetokens', EconomyTopCoins.getTopVoteTokens);
		this.router.get('/crafttokens', EconomyTopCoins.getTopCraftTokens);
		this.router.get('/played-time', EconomyTopCoins.getTopPlayedTime);
		this.router.get('/achievement-points', EconomyTopCoins.getTopAchievementPoints);
		this.router.get('/event-points', EconomyTopCoins.getTopEventPoints);

		// Skyblocks Islands
		this.router.get('/skyblock-islands', BSkyblockTopIslands.getSkyblockIslandLeaderboard);

		// Servers
		this.router.get('/halloween-players', HalloweenGame.getTopPlayerHalloween);
	}
}

const leaderboardRoutes = new LeaderboardRoutes();
leaderboardRoutes.init();

export default leaderboardRoutes.router;
