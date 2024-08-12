import mongoose from "mongoose";

import app from "./app";
import config from "./src/app/config";

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    // await mongoose.connect(
    //   "mongodb+srv://immigration:immigration@cluster0.yq2vgbi.mongodb.net/visa-immigration"
    // );
    app.listen(config.port, () => {
      console.log(`immigration listening on port ${config.port}✅`);
      console.log("server is connected");
    });
  } catch (error) {
    console.log(error);
  }
}

main();
