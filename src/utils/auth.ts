import { Context, Session } from "koishi";
import { IPlayer } from "../types";

export async function checkAuth(ctx: Context, session: Session): Promise<boolean> {
  const user = await session.getUser(session.userId)
  let re = new RegExp(/^sandbox/)

  // 仅处理 kook 平台
  if (session.platform !== 'kook' && !re.test(session.platform)) return

  const player = await ctx.database.get("players", {
    $or: [{ "kook": user[session.platform] }, {
      'platform': user[session.platform]
    }]
  })
  return !!player?.length


}

export async function getPlayer(ctx: Context, session: Session): Promise<IPlayer> {
  const user = await session.getUser(session.userId)
  let re = new RegExp(/^sandbox/)
  if (session.platform !== 'kook' && !re.test(session.platform)) return
  const player = await ctx.database.get("players", {
    $or: [{ "kook": user[session.platform] }, {
      'platform': user[session.platform]
    }]
  })

  return player[0]
}

