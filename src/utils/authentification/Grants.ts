import { AccessControl } from 'accesscontrol';

class Grants {

	private readonly grants: any;

	constructor() {
		const ac = new AccessControl();

		ac.grant('helper')

			// ATS Permissions
			.read('ats')

			// Profile permissions
			.read('profile')
			.update('profile')

			// Notes
			.read('notes')
			.update('notes')
			.create('notes')
			.delete('notes')

		.grant('helperka')
		.grant('builder')
		.grant('admin')
		.grant('adminka')
		.grant('admin')
		.grant('eventer')
		.grant('developer')
		.grant('manager')

			// ATS
			.create('ats')
			.update('ats')
			.delete('ats')

			// Profile permissions
			.update('profile')
		.grant('owner');

		this.grants = ac.getGrants();
	}

	public get getGrants(): any {
		return this.grants;
	}

}

export default Grants;
