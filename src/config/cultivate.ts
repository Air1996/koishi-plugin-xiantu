// 修炼相关

import Decimal from "decimal.js";



// 最长修炼时间
export const MAX_CULTIVATE_TIME = 1000 * 60 * 60 * 4

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


// 每一级突破时增加的攻防血法
/**
 *
 * @param level 玩家等级
 * @returns  每级升级所需经验值
 */
export function getExperience(level) {
  let levelDecimal = new Decimal(level);
  let experience = new Decimal(0)
  // 炼气 1阶 - 炼气10阶
  if (level <= 10) {
    experience = levelDecimal.pow(0.4).times(1).plus(5);
    return experience.toNumber().toFixed();
  }
  // 筑基期 初、中、后、大后期、圆满  每个阶段5 级
  if (level <= 10 + 5 * 5) {
    experience = levelDecimal.pow(0.6).times(18).plus(10);
    return experience.toNumber().toFixed();
  }
  //  结丹 初、中、后、大后期、圆满  每个阶段 5 级
  if (level <= 10 + 5 * 5 * 2) {
    experience = levelDecimal.pow(0.7).times(22).plus(12);
    return experience.toNumber().toFixed();
  }

  //  元婴 初、中、后、大后期、圆满  每个阶段 5 级
  if (level <= 10 + 5 * 5 * 3) {
    experience = levelDecimal.pow(0.8).times(24).plus(14);
    return experience.toNumber().toFixed();
  }


  //  化神 初、中、后、大后期、圆满  每个阶段 5 级
  if (level <= 10 + 5 * 5 * 4) {
    experience = levelDecimal.pow(0.9).times(26).plus(16);
    return experience.toNumber().toFixed();
  }

  // 炼虚 初、中、后、大后期、圆满  每个阶段 5 级
  if (level <= 10 + 5 * 5 * 5) {
    experience = levelDecimal.pow(1.1).times(28).plus(18);
    return experience.toNumber().toFixed();
  }

  // 合体 初、中、后、大后期、圆满  每个阶段 5 级
  if (level <= 10 + 5 * 5 * 6) {
    experience = levelDecimal.pow(1.2).times(30).plus(22);
    return experience.toNumber().toFixed();
  }


  // 大乘 初、中、后、大后期、圆满  每个阶段 5 级
  if (level <= 10 + 5 * 5 * 7) {
    experience = levelDecimal.pow(1.3).times(40).plus(28);
    return experience.toNumber().toFixed();
  }

  //  真仙
  if (level <= 10 + 5 * 5 * 8) {
    experience = levelDecimal.pow(1.4).times(42).plus(30);
    return experience.toNumber().toFixed();
  }

  // 金仙
  if (level <= 10 + 5 * 5 * 9) {
    experience = levelDecimal.pow(1.6).times(44).plus(32);
    return experience.toNumber().toFixed();
  }

  // 太乙
  if (level <= 10 + 5 * 5 * 10) {
    experience = levelDecimal.pow(1.8).times(46).plus(34);
    return experience.toNumber().toFixed();
  }

  // 大罗
  if (level <= 10 + 5 * 5 * 11) {
    experience = levelDecimal.pow(2).times(50).plus(36);
    return experience.toNumber().toFixed();
  }

  experience = levelDecimal.pow(2.4).times(50).plus(36);
  return experience.toNumber().toFixed();
}

