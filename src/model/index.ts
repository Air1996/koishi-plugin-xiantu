import { Context } from "koishi";
import Items from './items.model'
import Players from './players.model'

export function registerModal(ctx: Context) {
  Items.register(ctx)
  Players.register(ctx)
}
