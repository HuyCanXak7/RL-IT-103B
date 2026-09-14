"use strict";

const customerName = "Nguyen Hoang Duc Huy";
const totalSpending = 5200000;
const monthlyOrders = 22;
const currentOrderAmount = 150000;
const isBirthdayMonth = true;
const isAccountLocked = false;

const isSpendingValid =
  totalSpending === totalSpending &&
  totalSpending >= 0;

const isOrdersValid =
  monthlyOrders === monthlyOrders &&
  monthlyOrders >= 0 &&
  monthlyOrders % 1 === 0;

const isOrderAmountValid =
  currentOrderAmount === currentOrderAmount &&
  currentOrderAmount >= 0;

const isAccountValid =
  !isAccountLocked &&
  isSpendingValid &&
  isOrdersValid &&
  isOrderAmountValid;

const isDiamond =
  isAccountValid &&
  totalSpending >= 5000000 &&
  monthlyOrders >= 20;

const isGold =
  isAccountValid &&
  !isDiamond &&
  totalSpending >= 2000000 &&
  monthlyOrders >= 10;

const isSilver =
  isAccountValid &&
  !isDiamond &&
  !isGold;

const memberRank =
  (isDiamond && "Kim Cương") ||
  (isGold && "Vàng") ||
  (isSilver && "Bạc") ||
  "Không hợp lệ";

const cashbackRate =
  (isDiamond && 0.05) ||
  (isGold && 0.03) ||
  (isSilver && 0.01) ||
  0;

const birthdayMultiplier =
  (isBirthdayMonth && 2) || 1;

const finalCashbackRate =
  cashbackRate * birthdayMultiplier;

const earnedCoins =
  currentOrderAmount *
  finalCashbackRate *
  Number(isAccountValid);

console.log(`===== SHOPEEFOOD REWARDS =====`);
console.log(`Khách hàng: ${customerName}`);
console.log(`Tổng chi tiêu tích lũy: ${totalSpending} VND`);
console.log(`Số đơn hoàn thành trong tháng: ${monthlyOrders}`);
console.log(`Giá trị đơn hiện tại: ${currentOrderAmount} VND`);
console.log(`Tháng sinh nhật: ${isBirthdayMonth}`);
console.log(`Tài khoản bị khóa: ${isAccountLocked}`);
console.log(`Hạng thành viên: ${memberRank}`);
console.log(`Tỷ lệ hoàn xu cơ bản: ${cashbackRate * 100}%`);
console.log(`Tỷ lệ hoàn xu thực tế: ${finalCashbackRate * 100}%`);
console.log(`Số xu nhận được: ${earnedCoins} xu`);