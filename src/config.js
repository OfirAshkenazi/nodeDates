import "dotenv/config";

export function getConfig() {
  return {
    name: process.env.name,
    env: process.env.env,
    port: process.env.port,
    username: process.env.username,
  };
}