type TCity = {
  [key: number]: string;
};
const aCity: TCity = {
  11: "北京",
  12: "天津",
  13: "河北",
  14: "山西",
  15: "内蒙古",
  21: "辽宁",
  22: "吉林",
  23: "黑龙江",
  31: "上海",
  32: "江苏",
  33: "浙江",
  34: "安徽",
  35: "福建",
  36: "江西",
  37: "山东",
  41: "河南",
  42: "湖北",
  43: "湖南",
  44: "广东",
  45: "广西",
  46: "海南",
  50: "重庆",
  51: "四川",
  52: "贵州",
  53: "云南",
  54: "西藏",
  61: "陕西",
  62: "甘肃",
  63: "青海",
  64: "宁夏",
  65: "新疆",
  71: "台湾",
  81: "香港",
  82: "澳门",
  83: "台湾",
  91: "国外",
};
/**
 * 大陆居民身份证验证 格式校验
 */
export const isIdentityCard: (idcard: string) => boolean = (idcard) => {
  let iSum = 0;
  if (!/^\d{17}(\d|x)$/i.test(idcard)) {
    // 你输入的身份证长度或格式错误
    return false;
  }
  idcard = idcard.replace(/x$/i, "a");
  if (aCity[parseInt(idcard.substring(0, 2), 10)] == null) {
    // 你的身份证地区非法
    return false;
  }
  const sBirthday =
    idcard.substring(6, 10) +
    "-" +
    Number(idcard.substring(10, 12)) +
    "-" +
    Number(idcard.substring(12, 14));
  const d = new Date(sBirthday.replace(/-/g, "/"));
  if (
    sBirthday !==
    d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
  ) {
    // 身份证上的出生日期非法
    return false;
  }
  for (let i = 17; i >= 0; i--) {
    iSum += (Math.pow(2, i) % 11) * parseInt(idcard.charAt(17 - i), 11);
  }
  if (iSum % 11 !== 1) {
    // 你输入的身份证号非法
    return false;
  }
  return true;
};

/**
 * 港澳居民来往内地通行证 格式校验
 */
export const isHomeVisitPermitHKMC: (val: string) => boolean = (val) => {
  const reg = /^[HMhm]{1}\d{8}$/;
  return reg.test(val);
};

/**
 * 台湾通行证 格式校验
 */
export const isHomeVisitPermitTaiwan: (val: string) => boolean = (val) => {
  var reg = /^[0-9]{8}$/;
  return reg.test(val);
};

/**
 * 中华人民共和国外国人永久居留身份证 格式校验
 */
export const isPermanentSettlementCard: (val: string) => boolean = (val) => {
  const reg = /^[a-zA-Z]{3}\d{12}$/;
  return reg.test(val);
};

/**
 * 军官证 格式校验
 */
export const isMilitary: (val: string) => boolean = (val) => {
  const reg = /^[\u4E00-\u9FA5](字第)([0-9a-zA-Z]{4,8})(号?)$/;
  return reg.test(val);
};

/**
 * 手机号验证
 */
export const isTelVerify: (val: string) => boolean = (val) => {
  const reg = /^1\d{10}$/;
  return reg.test(val);
};