import { Context } from "koishi";
import { IPlayer } from "../types";

declare module "koishi" {
  interface Tables {
    players: IPlayer;
  }
}

function register(ctx: Context) {
  ctx.model.extend(
    "players",
    {
      id: "unsigned",
      name: "string",
      age: "integer",
      gender: "string",
      level: "integer",
      experience: "integer",
      gold: "integer",
      total_health: "integer",
      current_health: "integer",
      current_mana: "integer",
      total_mana: "integer",
      attack: "integer",
      defense: "integer",
      location: "string",
      online: "boolean",
      last_login: "timestamp",
      last_logout: "timestamp",
      created_at: "timestamp",
      updated_at: "timestamp",
      cultivate_at: "timestamp",
      kook: "string",
      platform: "string",
    },
    {
      autoInc: true,
    }
  );
}

export default {
  register,
};
