export default () => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  db_password: process.env.DB_PW,
  database: 'nestapidb',
  entities: ['dist/**/*.entity.js'],
  jwt_secret: process.env.JWT_SECRET,
});
