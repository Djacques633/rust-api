import axios from "axios";
import jsdom from "jsdom";
import Discord from "discord.js";
import * as dotenv from "dotenv";
import { formatMapUrl, getMapUrl, getServerInfo } from "./infoGather";
dotenv.config();
const client = new Discord.Client();

client.on("ready", () => {
  console.log("Ready!");
});

client.on("message", async (message) => {
  const channel = message.channel;
  const rustInfo = await getServerInfo();
  switch (message.content) {
    case "!map":
      channel.send(await getMapUrl(rustInfo.seed, rustInfo.size));
      break;
    case "!version":
      channel.send(`Version ${process.env.VERSION}`);
      break;
    case "!info":
      channel.send(`
        Server info:
        Status: ${rustInfo.online_state == 1 ? "Online" : "Offline"}
        Players: ${rustInfo.players_cur}
      `);
      break;
    case "!heatmaps":
      channel.send(formatMapUrl(rustInfo.size, rustInfo.seed) + "#NodeHeatMap");
      break;
  }
});

client.login(process.env.TOKEN);
