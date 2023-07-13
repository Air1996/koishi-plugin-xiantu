import { Context } from "koishi"

declare module 'koishi' {
  interface Tables {
    items: Items
  }
}

enum EItem {
  "武器",
  "防具",
  "丹药",
  "材料",
  "宝石"
}

enum ERarity {
  "普通",
  "精良",
  "史诗"
}



// 物品表
/**
id: 物品ID (主键)
item_name: 物品名称
item_type: 物品类型 (例如武器、防具、药品等)
item_level: 物品等级
item_description: 物品描述
item_rarity: 物品稀有度 (如普通、稀有、史诗、传说等)
item_price: 物品价格
item_weight: 物品重量
item_stats: 物品属性 (可以是一个JSON对象，存储物品的属性和数值)
required_level: 使用该物品所需的最低修仙等级
required_skill: 使用该物品所需的技能或能力
required_faction: 使用该物品所需的阵营或门派
usable: 是否可使用 (布尔值，表示该物品是否可以使用)
durability: 物品耐久度
max_durability: 物品最大耐久度
enchantments: 附魔效果 (可以是一个JSON对象，存储附加在物品上的附魔效果)
 *
 */
export interface Items {
  id: number;
  item_name: string;
  item_type: string;
  item_level: number;
  item_description: string;
  item_rarity: string;
  item_price: number;
  item_weight: number;
  item_stats: Record<string, number>;
  required_level: number;
  required_skill: string;
  required_faction: string;
  usable: boolean;
  durability: number;
  max_durability: number;
  enchantments: Record<string, string>;
}


function register(ctx: Context) {
  ctx.model.extend('items', {
    id: 'unsigned',
    item_name: 'string',
    item_type: 'string',
    item_level: 'integer',
    item_description: 'text',
    item_rarity: 'string',
    item_price: 'integer',
    item_weight: 'float',
    item_stats: 'json',
    required_level: 'integer',
    required_skill: 'string',
    required_faction: 'string',
    usable: 'boolean',
    durability: 'integer',
    max_durability: 'integer',
    enchantments: 'json',
  }, {
    autoInc: true,
  });
}

export default {
  register
}
