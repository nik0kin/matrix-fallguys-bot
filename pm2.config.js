module.exports = {
  apps: [
    {
      name: 'matrix-fallguys-bot',
      script: './node_modules/.bin/ts-node',
      args: 'src/bootstrap.ts',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
