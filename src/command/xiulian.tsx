// 修炼相关

import { Session } from "inspector";
import { Context, I18n } from "koishi";
import { getPlayer } from "../utils/auth";
import dayjs from "dayjs";

function registerCommand(ctx: Context) {
  console.log("[ register ] >");
  // 聚灵阵
  ctx
    .command("聚灵阵")
    .option("update", "-up")
    .alias("cult")
    .action(async ({ session, options }) => {
      console.log(
        "%c [ session ]-10",
        "font-size:13px; background:pink; color:#bf2c9f;",
        session
      );
      console.log(
        "%c [ options ]-10",
        "font-size:13px; background:pink; color:#bf2c9f;",
        options
      );
      // 查看当前
    });

  ctx
    .command("开始修炼")
    .alias("ksxl")
    .action(async ({ session }) => {
      // 查看当前
      const player = await getPlayer(ctx, session);

      if (player.cultivate_at) {
        let time1 = dayjs(player.cultivate_at);
        let time2 = dayjs();
        let cult_time = time2.diff(time1);

        console.log(
          "%c [ cult_time ]-40",
          "font-size:13px; background:pink; color:#bf2c9f;",
          cult_time / 60 / 1000
        );

        session.send(
          <>
            <quote id={session.messageId}></quote>
            <p>=========================</p>
            <p>
              您已累计修炼{" "}
              <code>
                <i18n:time value={cult_time} />
              </code>
            </p>
            <p></p>
            <p>
              请先输入 <code>收功</code> 结束修炼
            </p>
            <p>=========================</p>
          </>
        );
        return;
      }

      // 写入修炼时间
      await ctx.database.set("players", player.id, {
        cultivate_at: new Date(),
      });
      session.send(
        <>
          <quote id={session.messageId}></quote>
          <p>=========================</p>
          <p>已开始修炼</p>
          {/* <p>聚灵阵等级：</p> */}
          <p>=========================</p>
        </>
      );

      // cultivate_at
    });

  ctx
    .command("收功")
    .alias("sg")
    .action(async ({ session }) => {
      // 查看当前
      const player = await getPlayer(ctx, session);

      // 是否开始过修炼

      session.send(
        <xiantu-content title="修炼结束">
          <p>
            获得修为：<code>100</code>
          </p>
        </xiantu-content>
      );
    });
}

export default {
  registerCommand,
};
