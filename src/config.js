import "dotenv/config";

export function getConfig() {
  return {
    name: process.env.PROJECT_NAME,
    env: process.env.PROJECT_ENV,
    port: process.env.PROJECT_PORT,
    username: process.env.PROJECT_USERNAME,
  };
}

setInterval(() => {
  console.log("Current config:", getConfig());
}, 5000);