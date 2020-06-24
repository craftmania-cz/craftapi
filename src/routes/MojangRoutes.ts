import { Router, Request, Response, NextFunction } from 'express';
import * as Res from "../services/response";
import * as Mojang from "../controllers/mojang/mojang";
import TokenAuth from "../utils/authentification/tokenAuth";

export class MojangRoutes {

	public router: Router;

	constructor() {
		this.router = Router();
		this.init();
	}

	public missingRoute(_req: Request, res: Response, _next: NextFunction) {
		res.json(Res.property_required(res, 'Mojang route').json);
	}

	public init() {
		let tokenAuth = new TokenAuth();
		this.router.get('/uuid/:name', tokenAuth.checkToken, Mojang.getPlayerMojangUUID);
		this.router.get('/namehistory/:uuid', tokenAuth.checkToken, Mojang.getPlayerMojangNameHistory);
		this.router.get('/profile/:uuid', tokenAuth.checkToken, Mojang.getPlayerMojangProfile);
	}
}

const mojangRoutes = new MojangRoutes();
mojangRoutes.init();

export default mojangRoutes.router;
