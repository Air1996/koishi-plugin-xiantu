import { Context, Schema } from "koishi";
import { registerModal } from "./model";
import { checkAuth } from "./utils/auth";

import { MersenneTwister19937, integer } from "random-js";
const engine = MersenneTwister19937.autoSeed();
const distribution = integer(1, 99);
function generateNaturalLessThan100() {
  return distribution(engine);
}

export const name = "xiantu";

export interface Config {}

export const Config: Schema<Config> = Schema.object({});

export function apply(ctx: Context) {
  // 扩展表结构
  registerModal(ctx);

  // 签到命令
  ctx
    .command("签到")
    .alias("sigin")
    .alias("qd")
    .action(async ({ session }) => {
      if (!(await checkAuth(ctx, session))) {
        session.send("您当前尚未注册游戏，请输入：开始游戏 ，开始你的修仙之路");
        return;
      }

      let gold = generateNaturalLessThan100();

      session.send(`签到成功！获得灵石: +${gold}`);
    });

  // 开始游戏
  ctx
    .command("开始游戏 <name:string> <gender:string> <age:number>")
    .example("开始游戏 叶子 男 18")
    .alias("start_game")
    .alias("register")
    .action(async ({ session }, name, gender, age) => {
      console.log(
        "%c [ session ]-29",
        "font-size:13px; background:pink; color:#bf2c9f;",
        session
      );

      if (await checkAuth(ctx, session)) {
        session.send("您已踏上修仙之路，无法再入轮回");
        return;
      }

      // 注册新用户
      const user = await session.getUser(session.userId);

      const newPlayer = await ctx.database.create("players", {
        name: name || session.author.nickname || session.author.username,
        gender: gender || "男",
        age: Number(age) || 16,
        kook: user["kook"],
        platform: user[session.platform],
        gold: 0,
        health: 100,
        mana: 100,
        attack: 0,
        defense: 10,
        location: "0,0",
        level: 1,
        experience: 0,
        online: true,
        last_login: new Date(),
        last_logout: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      });

      if (newPlayer && newPlayer.id) {
        session.send("注册成功，输入 “菜单” 查看游戏玩法");
      }
    });

  //
  ctx.command("查看状态").action(async ({ session }) => {
    if (!(await checkAuth(ctx, session))) {
      session.send("您当前尚未注册游戏，请输入：开始游戏 ，开始你的修仙之路");
      return;
    }

    session.send("状态");
  });
}
