// 修炼相关

import Decimal from "decimal.js";

// 计算收益
/**
 *
 * @param interval 时间间隔
 * @param level 玩家等级
 * @param buffLevel 聚灵阵系数
 */
export function getCultivateByInterval(interval, level, buffCoefficient = 1.2) {
  const baseYield = 10;  // 基础收益
  const coefficient = 2; // 系数
  let cultivation = new Decimal(0)

  const cultivationTime = interval / 1000 / 60; // 将时间间隔转换为分钟

  // 计算修炼收益
  cultivation = new Decimal(baseYield + (cultivationTime * coefficient * level * buffCoefficient))

  return cultivation.toNumber().toFixed()
}


// 最长修炼时间
export const MAX_CULTIVATE_TIME = 1000 * 60 * 60 * 4
