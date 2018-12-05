
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import PlayerRoutes from "./routes/PlayerRoutes";
import * as swaggerDocument from '../swagger.json';
const swaggerUi = require('swagger-ui-express');
import * as exphbs from 'express-handlebars';
import * as cookieParser from 'cookie-parser';

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
		// Docs root
		this.express.use('/', swaggerUi.serve);
		this.express.get('/', swaggerUi.setup(swaggerDocument));

		// Player testing
		this.express.use('/player', PlayerRoutes);
	}

}

export default new App().express;
