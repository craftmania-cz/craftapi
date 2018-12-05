
export = {
	app: {
		port: process.env.PORT,
		environment: process.env.ENVIRONMENT
	},
	mysql: {
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_DATABASE,
	}
};
