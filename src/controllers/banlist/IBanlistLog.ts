export interface IBanlistLog {
	id: number;
	uuid: string;
	name: string;
	reason: string;
	banned_by_uuid: string | null;
	banned_by_name: string | null;
	ipban: number;
	time: number;
	until: number;
	active: number;
	removed_by_date: Date;
	removed_by_name: string | null;
	removed_by_uuid: string | null;
}

export interface IPaginateObject {
	totalItems: number;
	lastPage: number;
	currentPage: number;
	fromItem: number;
	toItem: number;
}
