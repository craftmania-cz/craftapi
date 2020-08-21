import { NextFunction, Request, Response, Router } from "express";
import * as Res from "../services/response";
import Notes from "../controllers/administrative/notes";
import TokenAuth from "../utils/authentification/tokenAuth";

export class AdministrativeRoutes {

	public router: Router;

	constructor() {
		this.router = Router();
		this.init();
	}

	public missingRoute(_req: Request, res: Response, _next: NextFunction) {
		res.json(Res.property_required(res, 'Administrative route').json);
	}

	public init() {
		let tokenAuth = new TokenAuth();

		// Notes
		this.router.get('/notes', tokenAuth.checkToken, Notes.getAllNotes); // GET - All List
		this.router.get('/notes/:id', tokenAuth.checkToken, Notes.getNoteById); // GET - Note by ID or name
		this.router.post('/notes', tokenAuth.checkToken, Notes.postNewNote); // POST - New note
		this.router.put('/notes/:id', tokenAuth.checkToken, Notes.editNoteById); // PUT - Update note by id
		this.router.delete('/notes/:id', tokenAuth.checkToken, Notes.deleteById); // DELETE - Note by id

	}
}

const administrativeRoutes = new AdministrativeRoutes();
administrativeRoutes.init();

export default administrativeRoutes.router;
