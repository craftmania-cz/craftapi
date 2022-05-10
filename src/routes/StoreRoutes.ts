import { Router, Request, Response, NextFunction } from 'express';
import Payments from "../controllers/store/storePayments";
import * as Res from "../services/response";

export class StoreRoutes {
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
		this.router.post('/createPayment', Payments.createPayment);
		this.router.get('/completePayment', Payments.forwardPayment);
	}
}

const storeRoutes = new StoreRoutes();
storeRoutes.init();

export default storeRoutes.router;
