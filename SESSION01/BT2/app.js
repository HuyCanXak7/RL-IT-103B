"use strict";

const rawUnitPrice = "55000";
const rawQuantity = "2";
const rawDistanceKm = "3.5";
const rawOrderHour = "12";
const voucherCode = "FREESHIP_EXTRA";
const stockQuantity = 10;
const isStoreOpen = true;

const unitPrice = +rawUnitPrice;
const quantity = +rawQuantity;
const distanceKm = +rawDistanceKm;
const orderHour = +rawOrderHour;

const isUnitPriceValid = unitPrice === unitPrice;
const isQuantityValid = quantity === quantity;
const isDistanceValid = distanceKm === distanceKm;
const isOrderHourValid = orderHour === orderHour;

const hasNoNaN =
  isUnitPriceValid &&
  isQuantityValid &&
  isDistanceValid &&
  isOrderHourValid;

const isValidOrder =
  isStoreOpen &&
  hasNoNaN &&
  unitPrice >= 0 &&
  quantity > 0 &&
  quantity <= stockQuantity &&
  distanceKm >= 0 &&
  distanceKm <= 15 &&
  orderHour >= 0 &&
  orderHour <= 23;

const foodTotal = unitPrice * quantity;

const extraDistance = (distanceKm > 1) * (distanceKm - 1);

const baseDeliveryFee =
  16000 + extraDistance * 4000;

const isLunchPeak =
  orderHour >= 11 && orderHour <= 13;

const isDinnerPeak =
  orderHour >= 18 && orderHour <= 20;

const isPeakHour =
  isLunchPeak || isDinnerPeak;

const peakHourFee =
  isPeakHour * 10000;

const isFreeshipEligible =
  foodTotal >= 100000 &&
  distanceKm <= 5 &&
  voucherCode === "FREESHIP_EXTRA";

const freeshipDiscount =
  isFreeshipEligible * 15000;

const calculatedPayment =
  foodTotal +
  baseDeliveryFee +
  peakHourFee -
  freeshipDiscount;

const finalPayment =
  isValidOrder * calculatedPayment;

console.log(`===== SHOPEEFOOD CHECKOUT =====`);
console.log(`Đơn giá món: ${unitPrice} VND`);
console.log(`Số lượng: ${quantity}`);
console.log(`Tồn kho: ${stockQuantity}`);
console.log(`Khoảng cách: ${distanceKm} km`);
console.log(`Khung giờ đặt: ${orderHour}h`);
console.log(`Mã voucher: ${voucherCode}`);
console.log(`Quán đang mở: ${isStoreOpen}`);
console.log(`Đơn hàng hợp lệ: ${Boolean(isValidOrder)}`);
console.log(`Tiền món: ${foodTotal} VND`);
console.log(`Cước vận chuyển cơ bản: ${baseDeliveryFee} VND`);
console.log(`Phụ phí cao điểm: ${peakHourFee} VND`);
console.log(`Giảm phí vận chuyển: ${freeshipDiscount} VND`);
console.log(`Tổng thanh toán: ${finalPayment} VND`);