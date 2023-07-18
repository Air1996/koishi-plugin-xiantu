// 修炼相关

import { Session } from "inspector";
import { Context } from "koishi";
import { getPlayer } from "../utils/auth";

function registerCommand(ctx: Context) {

  // 聚灵阵
  ctx.command("聚灵阵").option("update", '-up').alias("cult").action(async ({ session, options }) => {
    console.log('%c [ session ]-10', 'font-size:13px; background:pink; color:#bf2c9f;', session)
    console.log('%c [ options ]-10', 'font-size:13px; background:pink; color:#bf2c9f;', options)
    // 查看当前




  });




  ctx.command("开始修炼").action(async ({ session }) => {
    // 查看当前
    const player = await getPlayer(ctx, session)

    if (player.cult_start_time) {
      // session.send()
    }

    // 写入实践
    await ctx.database.set("players", player.id, {
      cult_start_time: new Date()
    });
    // cult_start_time




  });
}


export default {
  registerCommand
}
