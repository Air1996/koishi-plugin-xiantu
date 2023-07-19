// 赛马游戏

import { Context } from "koishi";

function registerCommand(ctx: Context) {
  //
  ctx
    .command("赛马 <message:string>")
    .alias("horse")
    .action(async ({ session, options }, message) => {
      console.log(
        "%c [ session ]-11",
        "font-size:13px; background:pink; color:#bf2c9f;",
        session
      );
      // 开始赛马
      if (message === "start") {
        // KOOK 使用卡片
        if (session.platform === "kook") {
          // await session.
        } else {
          session.send("赛马已开始");
        }
      }
    });
}

export default {
  registerCommand,
};
