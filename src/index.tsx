import { Context, Schema } from "koishi";
import { registerModal } from "./model";
import { checkAuth, getPlayer } from "./utils/auth";

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

      let ramdomGold = generateNaturalLessThan100();

      // 更新玩家 金钱数量
      const player = await getPlayer(ctx, session);
      await ctx.database.set("players", player.id, {
        gold: player.gold + ramdomGold,
      });

      session.send(`签到成功！获得灵石: +${ramdomGold}`);
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
  ctx.command("个人信息").action(async ({ session }) => {
    if (!(await checkAuth(ctx, session))) {
      session.send("您当前尚未注册游戏，请输入：开始游戏 ，开始你的修仙之路");
      return;
    }

    let infoCard = [
      {
        type: "card",
        size: "lg",
        theme: "warning",
        modules: [
          {
            type: "header",
            text: {
              type: "plain-text",
              content: "个人信息",
            },
          },
          {
            type: "divider",
          },
          {
            type: "section",
            mode: "left",
            accessory: {
              type: "image",
              src: "https://img.kaiheila.cn/assets/2021-01/FckX3MDe6S02i020.png",
              circle: true,
            },
            text: {
              type: "kmarkdown",
              content: "机智的叶子 [炼气一阶]",
            },
          },
          {
            type: "section",
            text: {
              type: "kmarkdown",
              content: "**状态**\n",
            },
          },
          {
            type: "section",
            accessory: {},
            text: {
              type: "paragraph",
              cols: 3,
              fields: [
                {
                  type: "kmarkdown",
                  content: "生命值",
                },
                {
                  type: "kmarkdown",
                  content: "法力值",
                },
                {
                  type: "kmarkdown",
                  content: "灵石",
                },
                {
                  type: "kmarkdown",
                  content: "100",
                },
                {
                  type: "kmarkdown",
                  content: "100",
                },
                {
                  type: "kmarkdown",
                  content: "0",
                },
              ],
            },
          },
          {
            type: "section",
            accessory: {},
            text: {
              type: "paragraph",
              cols: 3,
              fields: [
                {
                  type: "kmarkdown",
                  content: "攻击力",
                },
                {
                  type: "kmarkdown",
                  content: "防御力",
                },
                {
                  type: "kmarkdown",
                  content: "经验值",
                },
                {
                  type: "kmarkdown",
                  content: "100",
                },
                {
                  type: "kmarkdown",
                  content: "100",
                },
                {
                  type: "kmarkdown",
                  content: "0",
                },
              ],
            },
          },
        ],
      },
    ];
    let msg = {
      type: "card",
      theme: "primary.", // 卡片风格，默认为primay
      color: "#aaaaaa", //16 进制色值
      size: "lg", //目前只支持sm与lg, 如果不填为lg。 lg仅在PC端有效, 在移动端不管填什么，均为sm。
      modules: [...infoCard],
    };

    session.send("状态");
  });
}
