"use strict";

const rawUnitPrice = "55000";
const rawQuantity = "2";
const rawDistanceKm = "3.5";
const isStoreOpen = true;

const unitPrice = +rawUnitPrice;
const quantity = +rawQuantity;
const distanceKm = +rawDistanceKm;

const foodTotal = unitPrice * quantity;

const deliveryFee =
  15000 + distanceKm * 4000;

const isEligibleFreeship =
  foodTotal >= 100000 &&
  distanceKm <= 5 &&
  isStoreOpen;

const freeshipDiscount =
  isEligibleFreeship * 15000;

const calculatedPayment =
  foodTotal +
  deliveryFee -
  freeshipDiscount;

const finalPayment =
  calculatedPayment * isStoreOpen;

console.log(`===== SHOPEEFOOD ORDER =====`);
console.log(`Đơn giá món: ${unitPrice} VND`);
console.log(`Số lượng món: ${quantity}`);
console.log(`Khoảng cách giao hàng: ${distanceKm} km`);
console.log(`Trạng thái quán mở cửa: ${isStoreOpen}`);
console.log(`Tiền món ăn: ${foodTotal} VND`);
console.log(`Cước giao hàng: ${deliveryFee} VND`);
console.log(`Đủ điều kiện Freeship: ${isEligibleFreeship}`);
console.log(`Giảm phí vận chuyển: ${freeshipDiscount} VND`);
console.log(`Tổng tiền thanh toán: ${finalPayment} VND`);