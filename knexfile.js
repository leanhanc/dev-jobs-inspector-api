module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'jobinspector',
      user: process.env.DB_USER,
      password: process.env.DB_SECRET
    },
    migrations: { directory: __dirname + '/db/migrations' }
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL + '?ssl=true',
    pool: {
      min: 2,
      max: 5
    },
    migrations: { directory: __dirname + '/db/migrations' }
  }
};
