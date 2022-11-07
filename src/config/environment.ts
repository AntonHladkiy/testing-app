export const loadEnv = () => {
  return {
    db: {
      protocol: process.env.DB_PROTOCOL,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dbname: process.env.DB_NAME,
      username: process.env.DB_ROOT_USERNAME,
      password: process.env.DB_ROOT_PASSWORD,
    },
    auth: {
      secret: process.env.JWT_SECRET,
      expiration_time: process.env.JWT_EXPIRATION,
    },
  };
};

export const loadAll = async () => {
  return loadEnv();
};
