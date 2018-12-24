let params = null;

if (process.env.NODE_ENV === "production") {
  params = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "omarkarim",
    password: "omarkarim",
    database: "app_auth_server",
    synchronize: true,
    logging: false,
    entities: ["./dist/entity/**/*.js"],
    migrations: ["dist/migration/**/*.js"],
    subscribers: ["dist/subscriber/**/*.js"]
  };
} else {
  params = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "omarkarim",
    password: "omarkarim",
    database: "app_auth_server",
    synchronize: true,
    logging: false,
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/migration/**/*.ts"]
  };
}

export const DatabaseParams = params;

// type: process.env.DB_TYPE,
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     synchronize: process.env.SYNC,
//     logging: process.env.LOG,
