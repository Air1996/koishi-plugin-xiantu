// 修炼相关

import { Session } from "inspector";
import { Context, I18n } from "koishi";
import { getPlayer } from "../utils/auth";
import dayjs from "dayjs";
import {
  MAX_CULTIVATE_TIME,
  getCultivateByInterval,
} from "../config/cultivate";
import Decimal from "decimal.js";
import { getCultivationRealm, getExperience } from "../config/experience";

function registerCommand(ctx: Context) {
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
        cult_time =
          cult_time > MAX_CULTIVATE_TIME ? MAX_CULTIVATE_TIME : cult_time;

        session.send(
          <>
            <quote id={session.messageId}></quote>
            <p>=========================</p>
            <p>
              您已累计修炼
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
          <p>你来到一座看似幽静的山林,开始了修炼,</p>
          <p>默诵咒语,将真气引入丹田,内丹渐长。</p>
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
      if (!player.cultivate_at) {
        session.send(
          <xt-layout>
            <p>尚未开始修炼</p>
            <p>
              请先输入<code>开始修炼</code>
            </p>
          </xt-layout>
        );
        return;
      }

      //  修炼时长不足1min 无法收功
      let time1 = dayjs(player.cultivate_at);
      let time2 = dayjs();
      let cult_time = time2.diff(time1);
      cult_time =
        cult_time > MAX_CULTIVATE_TIME ? MAX_CULTIVATE_TIME : cult_time;

      if (cult_time / 1000 / 60 < 1) {
        session.send(
          <xt-layout>
            <p>
              修炼时长:
              <code>
                <i18n:time value={cult_time} />
              </code>
            </p>
            <p>不足 1 分钟</p>
            <p>无法收功</p>
          </xt-layout>
        );
        return;
      }

      // 计算收益
      const cult = getCultivateByInterval(cult_time, player.level, 1.2);

      // 写入数据
      const exp = new Decimal(player.experience);
      let newExp = exp.plus(new Decimal(cult));

      console.log(
        "%c [ exp ]-133",
        "font-size:13px; background:pink; color:#bf2c9f;",
        newExp.toNumber()
      );

      await ctx.database.set("players", player.id, {
        cultivate_at: null,
        experience: newExp.toNumber(),
      });

      session.send(
        <xt-layout>
          <p>修炼结束</p>
          <p>
            获得修为：<code>{cult}</code>
          </p>
        </xt-layout>
      );
    });

  ctx
    .command("突破")
    .alias("level up")
    .action(async ({ session }) => {
      const player = await getPlayer(ctx, session);
      const playerExperience = getExperience(player.level);
      let canLevelUp = Number(player.experience) >= Number(playerExperience);
      let currentExp = new Decimal(0);
      let currentLevel = new Decimal(player.level);

      if (canLevelUp) {
        currentExp = new Decimal(player.experience).minus(
          new Decimal(playerExperience)
        );

        currentLevel.add(new Decimal(1));

        await ctx.database.set("players", player.id, {
          experience: currentExp.toNumber(),
          level: currentLevel.toNumber() + 1,
        });

        const currentRealm = getCultivationRealm(currentLevel.toNumber() + 1);

        session.send(
          <xt-layout>
            <p>突破成功!</p>
            <p>当前等级：{currentLevel.toNumber() + 1}</p>
            <p>当前境界：{currentRealm}</p>
          </xt-layout>
        );
      }
    });
}

export default {
  registerCommand,
};
