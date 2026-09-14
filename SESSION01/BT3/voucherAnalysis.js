"use strict";

const rawFoodTotal = "120000";
const rawDistanceKm = "4";
const voucherCode = "GIAM20K";

const foodTotal = +rawFoodTotal;
const distanceKm = +rawDistanceKm;

const isFoodTotalValid = foodTotal === foodTotal;
const isDistanceValid = distanceKm === distanceKm;

const isGiam20KCode =
  voucherCode === "GIAM20K";

const isGiam20KEligible =
  isGiam20KCode &&
  isFoodTotalValid &&
  foodTotal >= 100000;

const isFreeshipCode =
  voucherCode === "FREESHIP";

const isFreeshipEligible =
  isFreeshipCode &&
  isDistanceValid &&
  distanceKm >= 0 &&
  distanceKm <= 5;

const giam20KDiscount =
  isGiam20KEligible * 20000;

const freeshipDiscount =
  isFreeshipEligible * 15000;

const totalDiscount =
  giam20KDiscount + freeshipDiscount;

console.log(`===== VOUCHER ANALYSIS =====`);
console.log(`Tiền món: ${foodTotal} VND`);
console.log(`Khoảng cách: ${distanceKm} km`);
console.log(`Mã voucher: ${voucherCode}`);
console.log(`GIAM20K hợp lệ: ${isGiam20KEligible}`);
console.log(`FREESHIP hợp lệ: ${isFreeshipEligible}`);
console.log(`Tổng ưu đãi: ${totalDiscount} VND`);