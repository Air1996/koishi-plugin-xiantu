
import { Context } from "koishi"

import { Items } from './items.model'

declare module 'koishi' {
  interface Tables {
    players: Players
  }
}



interface Players {
  id: number; // 玩家 ID
  name: string; // 玩家名称
  gender: string;// 玩家性别
  age: number; // 玩家年龄
  level: number; // 玩家等级
  experience: number; // 玩家经验值
  gold: number; // 玩家金币数量
  health: number; // 玩家当前生命值
  mana: number; // 玩家当前法力值
  attack: number; // 玩家攻击力
  defense: number; // 玩家防御力
  location: string; // 玩家当前所在位置
  online: boolean; // 玩家是否在线
  last_login: Date; // 玩家上次登录时间
  last_logout: Date; // 玩家上次登出时间
  created_at: Date; // 玩家账号创建时间
  updated_at: Date; // 玩家账号信息最后一次更新时间
  kook: string;
  platform: string; // 玩家平台
}





function register(ctx: Context) {
  ctx.model.extend('players', {
    id: 'unsigned',
    name: 'string',
    age: "integer",
    gender: "string",
    level: 'integer',
    experience: 'integer',
    gold: 'integer',
    health: 'integer',
    mana: 'integer',
    attack: 'integer',
    defense: 'integer',
    location: 'string',
    online: 'boolean',
    last_login: 'date',
    last_logout: 'date',
    created_at: 'date',
    updated_at: 'date',
    kook: "string",
    platform: "string"

  }, {
    autoInc: true,
  });
}


export default {
  register
}
