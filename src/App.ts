
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import PlayerRoutes from "./routes/PlayerRoutes";
import * as path from "path";
import { Request, Response } from "express";

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
		this.express.use(bodyParser.urlencoded({ extended: false }));
	}

	// API endpoints
	private routes(): void {
		// Docs root
		this.express.use('/', function(_req: Request, res: Response) {
			res.sendFile(path.join(__dirname + '/index.html'));
		});

		// Player testing
		this.express.use('/player', PlayerRoutes);
	}

}

export default new App().express;
