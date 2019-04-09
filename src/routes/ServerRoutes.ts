import { Router, Request, Response, NextFunction } from 'express';
import * as Res from "../services/response";
import * as PlayerCount from "../controllers/server/playercount";
import * as UniquePlayers from "../controllers/server/uniqueplayers";

export class ServerRoutes {
	public router: Router;

	constructor() {
		this.router = Router();
		this.init();
	}

	public missingPropery(_req: Request, res: Response, _next: NextFunction) {
		res.status(200).json(Res.property_required(res, 'Type property').json);
	}

	public init() {
		this.router.get('/', this.missingPropery);
		this.router.get('/playercount', PlayerCount.getServerStatus);
		this.router.get('/uniqueplayers', UniquePlayers.getAmount);
	}

}

const serverRoutes = new ServerRoutes();
serverRoutes.init();

export default serverRoutes.router;
