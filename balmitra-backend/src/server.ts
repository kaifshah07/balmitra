import app from "./app";
import { env } from "./config/env";
import { connectDB } from "./config/database";

const startServer = async () => {
  await connectDB();

  app.listen(env.PORT, () => {
    console.log(`
==========================================
🚀 Balmitra Backend Started Successfully
🌐 Server : http://localhost:${env.PORT}
❤️ Health : http://localhost:${env.PORT}/health
==========================================
`);
  });
};

startServer();