const development = {
  NODE_ENV: 'development',
  PORT: 3000,
};

const production = {
  NODE_ENV: 'production',
  PORT: 3000,
};

const env = process.env.NODE_ENV === 'development' ? development : production;

export default env;
