import { Context, Schema } from "koishi";
import { registerModal } from "./model";
import { checkAuth, getPlayer } from "./utils/auth";

import { MersenneTwister19937, integer } from "random-js";
import { getCultivationRealm, getExperience } from "./config/experience";

import xiulian from "./command/xiulian";
import horseRace from "./command/horseRace";

import { useComponent } from "./components";
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

  // 注册回复模板
  useComponent(ctx);

  // 注册指令
  xiulian.registerCommand(ctx);
  // 赛马 🐴
  horseRace.registerCommand(ctx);

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

      let ramdomGold = generateNaturalLessThan100();

      // 更新玩家 金钱数量
      const player = await getPlayer(ctx, session);
      await ctx.database.set("players", player.id, {
        gold: player.gold + ramdomGold,
      });

      session.send(
        <xt-layout>
          <p>
            签到成功！获得灵石:<code>{ramdomGold}</code>
          </p>
        </xt-layout>
      );
    });

  // 开始游戏
  ctx
    .command("开始游戏 <name:string> <gender:string> <age:number>")
    .example("开始游戏 叶子 男 18")
    .alias("start_game")
    .alias("register")
    .action(async ({ session }, name, gender, age) => {
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
        current_health: 100,
        total_health: 100,
        current_mana: 100,
        total_mana: 100,
        attack: 10,
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
  ctx
    .command("个人信息")
    .alias("me")
    .action(async ({ session }) => {
      if (!(await checkAuth(ctx, session))) {
        session.send("您当前尚未注册游戏，请输入：开始游戏 ，开始你的修仙之路");
        return;
      }

      const player = await getPlayer(ctx, session);
      const playerExperience = getExperience(player.level);
      const playerRealm = getCultivationRealm(player.level);
      let levelUpTips =
        Number(player.experience) >= Number(playerExperience)
          ? "【可突破】"
          : "";

      session.send(
        <xt-layout>
          <p>昵称：{player.name}</p>
          <p>境界：{playerRealm}</p>
          <p>
            修为：{player.experience}/{playerExperience} {levelUpTips}
          </p>
          <p>
            气血：{player.current_health}/{player.total_health}
          </p>
          <p>
            法力：{player.current_mana}/{player.total_mana}
          </p>
          <p>攻击：{player.attack}</p>
          <p>防御：{player.defense}</p>
          <p>灵石：{player.gold}</p>
          <p>装备：无</p>
          <p>技能：无</p>
          <p></p>
          <p>任务进度：当前无任务</p>
        </xt-layout>
      );
    });
}
