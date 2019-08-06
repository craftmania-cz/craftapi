import * as Res from "../../services/response";

const ruleFile = require('../../../static/randomRules.json');

namespace RandomRule {

	export async function getRandomRule(_req: any, res: any) {
		Res.success(res, ruleFile[Math.floor(Math.random() * ruleFile.length)]); // Random pravidlo z randomRules.json
	}
}

export = RandomRule;
