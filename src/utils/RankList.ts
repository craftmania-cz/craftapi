/**
 * CraftMania Rank list pro ATS
 */
class RankList {

	private readonly _rank: number;

	constructor(rank: number) {
		this._rank = rank;
	}

	public get getRank(): number {
		return this._rank;
	}

	/**
	 * Vrací roli pro ATS dle zadaného ID v constructoru
	 */
	public getRankAsRole(): string {
		if (this._rank === 12) {
			return "owner";
		}
		if (this._rank === 11) {
			return "manager";
		}
		if (this._rank === 9) {
			return "developer";
		}
		if (this._rank === 7) {
			return "eventer";
		}
		if (this._rank === 6) {
			return "builder";
		}
		if (this._rank === 5) {
			return "adminka";
		}
		if (this._rank === 4) {
			return "admin";
		}
		if (this._rank === 3) {
			return "helperka";
		}
		if (this._rank === 2) {
			return "helper";
		}
		if (this._rank === 1) {
			return "tester";
		}
		return "unknown";
	}
}

export default RankList;
