import { Router, Request, Response, NextFunction } from 'express';

export class PlayerRoutes {
	public router: Router;

	constructor() {
		this.router = Router();
		this.init();
	}

	public getBasic(_req: Request, res: Response, _next: NextFunction) {
		res.status(200).json({success: true});
	}

	public getName(req: Request, res: Response, _next: NextFunction) {
		res.status(200).json({yourName: req.params.name});
	}

	public init() {
		this.router.get('/', this.getBasic);
		this.router.get('/:name', this.getName);
	}
}

const playerRoutes = new PlayerRoutes();
playerRoutes.init();

export default playerRoutes.router;
