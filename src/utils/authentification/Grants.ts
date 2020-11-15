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
		.grant('builder')

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
		.grant('admin')

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
		.grant('adminka')

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
		.grant('admin')

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
		.grant('eventer')

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
		.grant('developer')

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
		.grant('manager')

			// ATS Permissions
			.read('ats')
			.create('ats')
			.update('ats')
			.delete('ats')

			// Profile permissions
			.read('profile')
			.update('profile')

			// Notes
			.read('notes')
			.update('notes')
			.create('notes')
			.delete('notes')
		.grant('owner')

			// ATS Permissions
			.read('ats')
			.create('ats')
			.update('ats')
			.delete('ats')

			// Profile permissions
			.read('profile')
			.update('profile')
			.create('profile')
			.delete('profile')

			// Notes
			.read('notes')
			.update('notes')
			.create('notes')
			.delete('notes');

		this.grants = ac.getGrants();
	}

	public get getGrants(): any {
		return this.grants;
	}

}

export default Grants;
