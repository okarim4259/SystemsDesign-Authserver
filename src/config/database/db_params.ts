let params = null;

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  params = {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    logging: false,
    entities: [process.env.DB_PROD_ENTITIES_PATH],
    migrations: [process.env.DB_PROD_MIGRATIONS_PATH],
    subscribers: [process.env.DB_PROD_SUBSCRIBERS_PATH]
  };
} else {
  params = {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [process.env.DB_DEV_ENTITIES_PATH],
    migrations: [process.env.DB_DEV_MIGRATIONS_PATH],
    subscribers: [process.env.DB_DEV_SUBSCRIBERS_PATH]
  };
}

export const DatabaseParams = params;
