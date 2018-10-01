
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import PlayerRoutes from "./routes/PlayerRoutes";


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

		// main router
		let router = express.Router();

		// placeholder route handler
		router.get('/', (_req: any, res: any, _next: any) => {
			res.json({
				message: 'CS WAKE!'
			});
		});
		this.express.use('/', router);
		this.express.use('/player', PlayerRoutes)
	}

}

export default new App().express;
