
import * as express from 'express';
import * as bodyParser from 'body-parser';
import PlayerRoutes from "./routes/PlayerRoutes";
import * as exphbs from 'express-handlebars';
import * as cookieParser from 'cookie-parser';
import * as cors from "cors";
import * as helmet from "helmet";
import * as morgan from 'morgan';
import { Request, Response } from "express";
import ServerRoutes from "./routes/ServerRoutes";
import EconomyRoutes from "./routes/EconomyRoutes";
import LeaderboardRoutes from "./routes/economy/LeaderboardRoutes";
import LeaderboardLevelsRoutes from "./routes/economy/LeaderboardLevelsRoutes";
import QuestRoutes from "./routes/QuestRoutes";
import LeaderboardMcmmoRoutes from "./routes/economy/LeaderboardMcmmoRoutes";
import AccountRoutes from "./routes/AccountRoutes";
import MojangRoutes from "./routes/MojangRoutes";
import { debugStream, winstonStream } from "./utils/Logger";
import AdministrativeRoutes from "./routes/AdministrativeRoutes";
import { IConfig } from "config";

const config: IConfig = require("config");

class App {

	public express: express.Application;

	constructor() {
		this.express = express();
		this.middleware();
		this.routes();
	}

	// Configure Express middleware.
	private middleware(): void {
		this.express.use(bodyParser.json());
		this.express.use(bodyParser.urlencoded({ extended: true }));
		this.express.use(cookieParser());
		this.express.use(helmet());
		this.express.use(morgan(':remote-addr -> (:method) :url :status - :response-time ms', debugStream));
		this.express.use(morgan(':remote-addr -> (:method) :url :status - :response-time ms', winstonStream));
		this.express.use(cors({origin: '*'}));
		// @ts-ignore
		this.express.engine('handlebars', exphbs({defaultLayout: 'main'}));
		this.express.set('view engine', 'handlebars');
	}

	// API endpoints
	private routes(): void {

		// Player routes
		//this.express.use('/player', middleware.checkToken, PlayerRoutes);
		this.express.use('/player', PlayerRoutes);

		// Server routes
		this.express.use('/server', ServerRoutes);

		// Economy routes
		this.express.use('/economy', EconomyRoutes);
		this.express.use('/economy/leaderboard', LeaderboardRoutes);
		this.express.use('/economy/leaderboard/levels', LeaderboardLevelsRoutes);
		this.express.use('/economy/leaderboard/mcmmo', LeaderboardMcmmoRoutes);

		// Logs routes
		this.express.use('/quests', QuestRoutes);

		// Mojang API
		this.express.use('/mojang', MojangRoutes);

		// Internal logins
		this.express.use('/account', AccountRoutes);

		// Administrative routes (primárně pro CraftBox)
		this.express.use('/admin', AdministrativeRoutes);

		// Index route
		this.express.use('/', function(_req: Request, res: Response) {
			res.json({
				"status": 200,
				"data": {
					"status": 'UP',
					"pod-id": config.get('app.pod-id'),
					"documentation": 'https://api-docs.craftmania.cz/'
				}
			});
		});
	}

}

export default new App().express;
