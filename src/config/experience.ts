import { Decimal } from 'decimal.js'

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
    experience = levelDecimal.pow(1.5).times(100).plus(50);
    return experience.toNumber().toFixed();
  }
  // 筑基期 初、中、后、大后期、圆满  每个阶段5 级
  if (level <= 10 + 5 * 5) {
    experience = levelDecimal.pow(1.6).times(180).plus(100);
    return experience.toNumber().toFixed();
  }
  //  结丹 初、中、后、大后期、圆满  每个阶段 5 级
  if (level <= 10 + 5 * 5 * 2) {
    experience = levelDecimal.pow(1.7).times(220).plus(120);
    return experience.toNumber().toFixed();
  }

  //  元婴 初、中、后、大后期、圆满  每个阶段 5 级
  if (level <= 10 + 5 * 5 * 3) {
    experience = levelDecimal.pow(1.8).times(240).plus(150);
    return experience.toNumber().toFixed();
  }


  //  化神 初、中、后、大后期、圆满  每个阶段 5 级
  if (level <= 10 + 5 * 5 * 4) {
    experience = levelDecimal.pow(1.9).times(260).plus(180);
    return experience.toNumber().toFixed();
  }

  // 炼虚 初、中、后、大后期、圆满  每个阶段 5 级
  if (level <= 10 + 5 * 5 * 5) {
    experience = levelDecimal.pow(2.1).times(280).plus(200);
    return experience.toNumber().toFixed();
  }

  // 合体 初、中、后、大后期、圆满  每个阶段 5 级
  if (level <= 10 + 5 * 5 * 6) {
    experience = levelDecimal.pow(2.3).times(300).plus(220);
    return experience.toNumber().toFixed();
  }


  // 大乘 初、中、后、大后期、圆满  每个阶段 5 级
  if (level <= 10 + 5 * 5 * 7) {
    experience = levelDecimal.pow(2.6).times(400).plus(280);
    return experience.toNumber().toFixed();
  }

  //  真仙
  if (level <= 10 + 5 * 5 * 8) {
    experience = levelDecimal.pow(2.8).times(420).plus(300);
    return experience.toNumber().toFixed();
  }

  // 金仙
  if (level <= 10 + 5 * 5 * 9) {
    experience = levelDecimal.pow(3).times(440).plus(320);
    return experience.toNumber().toFixed();
  }

  // 太乙
  if (level <= 10 + 5 * 5 * 10) {
    experience = levelDecimal.pow(3.2).times(460).plus(340);
    return experience.toNumber().toFixed();
  }

  // 大罗
  if (level <= 10 + 5 * 5 * 11) {
    experience = levelDecimal.pow(3.4).times(500).plus(360);
    return experience.toNumber().toFixed();
  }

  experience = levelDecimal.pow(3.6).times(500).plus(360);
  return experience.toNumber().toFixed();
}

/**
 *
 * @param level 等级
 * @returns 境界
 */
export function getCultivationRealm(level) {
  const chineseNumbers = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
  const chineseNumbersUpper = ["壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖", "拾"];
  const realm2Chinese = ['初期', '中期', '後期', '大後期', '圓滿'];
  const realms = ['炼气', '筑基', '结丹', '元婴', '化神', '炼虚', '合体', '大乘', '真仙', '金仙', '太乙', '大罗'];

  if (level <= 10) {
    return `${realms[0]}${chineseNumbers[level - 1]}阶`;
  }

  for (let i = 1; i <= realms.length - 1; i++) {
    const baseLevel = 10 + (i - 1) * 25;
    if (level <= baseLevel + 5 * 5) {
      const stageIndex = Math.floor((level - baseLevel - 1) / 5);
      return `${realms[i]}${realm2Chinese[stageIndex]}`;
    }
  }

  return "道主";
}
