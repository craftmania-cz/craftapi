import * as jwt from "jsonwebtoken";
import { IConfig } from "config";

const config: IConfig = require("config");

class LoginGenerator {
	public login (req: any, res: any) {
		console.log('LOGIN?');
		let username = req.body.username;
		let password = req.body.password;
		// For the given username fetch user from DB
		let mockedUsername = 'admin';
		let mockedPassword = 'password';

		console.log('LOGIN-2');

		if (username && password) {
			console.log('LOGIN-3');
			if (username === mockedUsername && password === mockedPassword) { //TODO: Check login
				console.log('LOGIN-4');
				let token = jwt.sign({username: username}, config.get('app.token'), { expiresIn: '24h' }); // expires in 24 hours
				console.log('LOGIN-5');

				// return the JWT token for the future API calls
				res.json({
					success: true,
					message: 'Authentication successful!',
					token: token
				});
			} else {
				res.send(400).json({
					success: false,
					message: 'Authentication failed! Please check the request'
				});
			}
		} else {
			res.json({
				success: false,
				message: 'Missing username & password'
			});
		}
	}
}

export default LoginGenerator;
