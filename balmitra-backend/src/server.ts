import app from "./app";
import { env } from "./config/env";
import { connectDatabase } from "./config/database";

const startServer = async () => {
  await connectDatabase();

  app.listen(env.PORT, () => {
    console.log(`
====================================
🚀 Balmitra Backend Started
🌐 Port : ${env.PORT}
🌍 Mode : ${env.NODE_ENV}
====================================
`);
  });
};

startServer();