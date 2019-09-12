
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import PlayerRoutes from "./routes/PlayerRoutes";
import * as exphbs from 'express-handlebars';
import * as cookieParser from 'cookie-parser';
import * as path from "path";
import { Request, Response } from "express";
import ServerRoutes from "./routes/ServerRoutes";
import GameRoutes from "./routes/GameRoutes";
import EconomyRoutes from "./routes/EconomyRoutes";

class App {

	public express: express.Application;

	constructor() {
		this.express = express();
		this.middleware();
		this.routes();
	}

	// Configure Express middleware.
	private middleware(): void {
		this.express.use(logger('dev'));
		this.express.use(bodyParser.json());
		this.express.use(bodyParser.urlencoded({ extended: true }));
		this.express.use(cookieParser());
		this.express.engine('handlebars', exphbs({defaultLayout: 'main'}));
		this.express.set('view engine', 'handlebars');
	}

	// API endpoints
	private routes(): void {

		// Player routes
		this.express.use('/player', PlayerRoutes);

		// Server routes
		this.express.use('/server', ServerRoutes);

		// Game routes
		this.express.use('/games', GameRoutes);

		// Economy routes
		this.express.use('/economy', EconomyRoutes);

		// Docs root
		this.express.use('/', function(_req: Request, res: Response) {
			res.sendFile(path.join(__dirname + '/index.html'));
		});
	}

}

export default new App().express;
