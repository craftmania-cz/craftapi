import { Response } from 'express';

namespace Res {

	export function not_found(res: Response) {
		return res.status(404).json({status: 404, success: false, error: 'Not found!' , data: []});
	}

	export function forbidden(res: Response) {
		return res.status(403).json({status: 403, success: false, error: 'Forbidden' , data: []});
	}

	export function forbiddenWithText(res: Response, property: string) {
		return res.status(403).json({status: 403, success: false, error: property , data: []});
	}

	export function body_missing(res: Response) {
		return res.status(500).json({status: 500, success: false, error: 'Request Body is missing' , data: []});
	}

	export function success(res: Response, object: Object) {
		return res.status(200).json({status: 200, success: true, data: object});
	}

	export function property_required(res: Response, property: String) {
		return res.status(400).json({status: 400, success: false, error: 'Property ' + property + 'is required!', data: []});
	}

	export function bad_request(res: Response, message: string) {
		return res.status(400).json({status: 400, success: false, error: message, data: []});
	}

	export function error(res: Response, err: Error) {
		return res.status(500).json({status: 500, success: false, error: err.message , data: []});
	}

	export function noPerms(res: Response) {
		return res.status(403).json({status: 403, success: false, error: 'You do not have permissions for that!' , data: []});
	}
}

export = Res;
