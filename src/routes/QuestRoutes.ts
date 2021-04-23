import { Router, Request, Response, NextFunction } from 'express';
import * as Res from "../services/response";
import Quests from "../controllers/quests/quests";

export class QuestRoutes {
	public router: Router;

	constructor() {
		this.router = Router();
		this.init();
	}

	public missingRoute(_req: Request, res: Response, _next: NextFunction) {
		res.json(Res.property_required(res, 'Quest route').json);
	}

	public init() {
		this.router.get('/', this.missingRoute);
		this.router.get('/log', Quests.getQuestLog);
	}
}

const questRoutes = new QuestRoutes();
questRoutes.init();

export default questRoutes.router;
