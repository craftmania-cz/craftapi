import { Router, Request, Response, NextFunction } from 'express';
import * as Res from "../../services/response";
import EconomyTopVotes from "../../controllers/economy/economy_topVotes";
import EconomyTopCoins from "../../controllers/economy/economy_playercoins";
import { BSkyblockTopIslands } from "../../controllers/islands/BSkyblockTops";
import HalloweenStats from "../../controllers/player/halloween_stats";

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
		this.router.get('/craft-coins', EconomyTopCoins.getTopCraftcoins);
		this.router.get('/vote-tokens', EconomyTopCoins.getTopVoteTokens);
		this.router.get('/craft-tokens', EconomyTopCoins.getTopCraftTokens);
		this.router.get('/played-time', EconomyTopCoins.getTopPlayedTime);
		this.router.get('/quest-points', EconomyTopCoins.getTopQuestPoints);
		this.router.get('/event-points', EconomyTopCoins.getTopEventPoints);
		this.router.get('/season-points', EconomyTopCoins.getTopSeasonPoints);
		this.router.get('/parkour-points', EconomyTopCoins.getTopParkourPoints);
		this.router.get('/karma-points', EconomyTopCoins.getTopKarmaPoints);

		// Skyblocks Islands
		this.router.get('/skyblock-islands', BSkyblockTopIslands.getSkyblockIslandLeaderboard);

		// Halloween
		this.router.get('/halloween', HalloweenStats.getLeaderboard);

		// Balance
		this.router.get('/balance/survival', EconomyTopCoins.getEconomyTopSurvival);
		this.router.get('/balance/skyblock', EconomyTopCoins.getEconomyTopSkyblock);

		this.router.get('/dragon-slayer/vanilla', EconomyTopCoins.getVanillaDragonSlayerData);
	}
}

const leaderboardRoutes = new LeaderboardRoutes();
leaderboardRoutes.init();

export default leaderboardRoutes.router;
