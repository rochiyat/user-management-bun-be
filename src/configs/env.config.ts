const development = {
  NODE_ENV: 'development',
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || 'sengajadirahasiakan',
};

const production = {
  NODE_ENV: 'production',
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || 'sengajadirahasiakan',
};

const env = process.env.NODE_ENV === 'development' ? development : production;

export default env;
