import {
  isTelVerify,
  isIdentityCard,
  isHomeVisitPermitTaiwan,
  isPermanentSettlementCard,
  isMilitary,
  isHomeVisitPermitHKMC,
} from "../certify";

// 验证长度
test("test length", () => {
  expect(isIdentityCard("")).toBe(false);
  expect(isIdentityCard("140111")).toBe(false);
  expect(isIdentityCard("83000019641221004X11")).toBe(false);
});
// 验证地区
test("test area", () => {
  expect(isIdentityCard("88000019641221004X")).toBe(false);
  expect(isIdentityCard("00000019641221004X")).toBe(false);
  expect(isIdentityCard("710000196412210042")).toBe(true);
});
// 验证出生日期
test("test birthday", () => {
  expect(isIdentityCard("83000019642221004X")).toBe(false);
  expect(isIdentityCard("83000019641240004X")).toBe(false);
});
// 验证身份证规则合法
test("test idcardlegal", () => {
  expect(isIdentityCard("130725199710022500")).toBe(false);
  expect(isIdentityCard("510723197403224504")).toBe(false);
  expect(isIdentityCard("350007199103034317")).toBe(false);
  expect(isIdentityCard("130725199710022526")).toBe(true);
  expect(isIdentityCard("510723197403224514")).toBe(true);
  expect(isIdentityCard("350527199103034317")).toBe(true);
});

// 中华人民共和国外国人永久居留身份证 格式验证
test("test prementVerify", () => {
  expect(isPermanentSettlementCard("")).toBe(false);
  expect(isPermanentSettlementCard("123")).toBe(false);
  expect(isPermanentSettlementCard("1234567890989890")).toBe(false);
  expect(isPermanentSettlementCard("123456789098989")).toBe(false);
  expect(isPermanentSettlementCard("AAA456789098989")).toBe(true);
  expect(isPermanentSettlementCard("CAN456789098989")).toBe(true);
});
// 军官证 格式验证
test("test militaryVerify", () => {
  expect(isMilitary("")).toBe(false);
  expect(isMilitary("123")).toBe(false);
  expect(isMilitary("1111111111111")).toBe(false);
  expect(isMilitary("811301000111206")).toBe(false);
  expect(isMilitary("政字第00号")).toBe(false);
  expect(isMilitary("政字第0011120600号")).toBe(false);
  expect(isMilitary("政字第0000号")).toBe(true);
  expect(isMilitary("政字第00000号")).toBe(true);
  expect(isMilitary("政字第000000号")).toBe(true);
  expect(isMilitary("政字第0000000号")).toBe(true);
  expect(isMilitary("政字第00111206号")).toBe(true);
});
// 港澳通行证 格式验证
test("test militaryVerify", () => {
  expect(isHomeVisitPermitHKMC("")).toBe(false);
  expect(isHomeVisitPermitHKMC("123")).toBe(false);
  expect(isHomeVisitPermitHKMC("12345678910")).toBe(false);
  expect(isHomeVisitPermitHKMC("123456789101")).toBe(false);
  expect(isHomeVisitPermitHKMC("H")).toBe(false);
  expect(isHomeVisitPermitHKMC("H12345678910")).toBe(false);
  expect(isHomeVisitPermitHKMC("HM123456789")).toBe(false);
  expect(isHomeVisitPermitHKMC("H123456aa1")).toBe(false);
  expect(isHomeVisitPermitHKMC("h123456789")).toBe(false);
  expect(isHomeVisitPermitHKMC("H123456789")).toBe(false);
  expect(isHomeVisitPermitHKMC("H1234567891")).toBe(false);
  expect(isHomeVisitPermitHKMC("M1234567891")).toBe(false);
  expect(isHomeVisitPermitHKMC("h1234567891")).toBe(false);
  expect(isHomeVisitPermitHKMC("m1234567891")).toBe(false);
  expect(isHomeVisitPermitHKMC("h12345678")).toBe(true);
  expect(isHomeVisitPermitHKMC("H12345678")).toBe(true);
  expect(isHomeVisitPermitHKMC("m12345678")).toBe(true);
  expect(isHomeVisitPermitHKMC("M12345678")).toBe(true);
});
// 台湾通行证  格式验证
test("test isHomeVisitPermitTaiwan", () => {
  expect(isHomeVisitPermitTaiwan("")).toBe(false);
  expect(isHomeVisitPermitTaiwan("111")).toBe(false);
  expect(isHomeVisitPermitTaiwan("11111111111")).toBe(false);
  expect(isHomeVisitPermitTaiwan("aaaaaaaa")).toBe(false);
  expect(isHomeVisitPermitTaiwan("1111111a")).toBe(false);
  expect(isHomeVisitPermitTaiwan("00000000")).toBe(true);
  expect(isHomeVisitPermitTaiwan("11111111")).toBe(true);
  expect(isHomeVisitPermitTaiwan("1111111111")).toBe(false);
});

// 手机号长度验证
test("test tel length", () => {
  expect(isTelVerify("")).toBe(false);
  expect(isTelVerify("187")).toBe(false);
  expect(isTelVerify("187349600000")).toBe(false);
  expect(isTelVerify("18734960000")).toBe(true);
});
// 手机号格式验证
test("test isTelVerify", () => {
  expect(isTelVerify("00000000000")).toBe(false);
  expect(isTelVerify("10000000000")).toBe(true);
});
