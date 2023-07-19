import { Context } from "koishi";
import layout from "./layout";

export function useComponent(ctx: Context) {
  ctx.component("xt-layout", layout);
}
