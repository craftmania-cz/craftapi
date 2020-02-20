import { Response } from 'express';

namespace Res {

	export function not_found(res: Response) {
		return res.status(404).json({status: 404, error: 'Not found!' , data: []});
	}

	export function forbidden(res: Response) {
		return res.status(403).json({status: 403, error: 'Forbidden' , data: []});
	}

	export function forbiddenWithText(res: Response, property: string) {
		return res.status(403).json({status: 403, error: property , data: []});
	}

	export function body_missing(res: Response) {
		return res.status(500).json({status: 500, error: 'Request Body is missing' , data: []});
	}

	export function success(res: Response, object: Object) {
		return res.status(200).json({status: 200, data: object});
	}

	export function property_required(res: Response, property: String) {
		return res.status(400).json({status: 400, error: 'Property ' + property + ' required', data: []});
	}

	export function error(res: Response, err: Error) {
		return res.status(500).json({status: 500, error: err.message , data: []});
	}
}

export = Res;
