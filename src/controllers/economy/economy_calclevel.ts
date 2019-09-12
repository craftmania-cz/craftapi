import * as Res from "../../services/response";
import LevelUtils from "../../utils/LevelUtils";

namespace EconomyCalcLevel {

	interface LevelObject {
		level: number;
		expToNext: number;
		totalExp: number;
	}

	export async function calcLevel(req: any, res: any) {

		const reqLevel = req.params.level;

		/*if (typeof reqLevel !== 'number') {
			Res.property_required(res, 'level');
			return;
		}*/

		let finalLevel: LevelObject = {
			level: +reqLevel,
			expToNext: LevelUtils.getExpFromLevelToNext(reqLevel),
			totalExp: LevelUtils.getTotalExpToLevel(reqLevel),
		};

		Res.success(res, finalLevel);
		return;
	}
}

export default EconomyCalcLevel;
