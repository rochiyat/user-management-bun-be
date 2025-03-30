const development = {
  NODE_ENV: 'development',
  PORT: Bun.env.PORT || 3000,
  JWT_SECRET: Bun.env.JWT_SECRET || 'sengajadirahasiakan',
};

const production = {
  NODE_ENV: 'production',
  PORT: Bun.env.PORT || 3000,
  JWT_SECRET: Bun.env.JWT_SECRET || 'sengajadirahasiakan',
};

const env = Bun.env.NODE_ENV === 'development' ? development : production;

export default env;
