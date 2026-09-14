"use strict";

const driverName = "Nguyen Van A";
const distanceToStore = 2.5;
const starRating = 4.8;
const currentActiveOrders = 1;
const isOnline = true;

const maxDistance = 5;
const minStarRating = 4.0;
const maxActiveOrders = 2;

const isDistanceValid =
  distanceToStore === distanceToStore &&
  distanceToStore >= 0;

const isStarRatingValid =
  starRating === starRating &&
  starRating >= 0 &&
  starRating <= 5;

const isActiveOrdersValid =
  currentActiveOrders === currentActiveOrders &&
  currentActiveOrders >= 0 &&
  currentActiveOrders % 1 === 0;

const isWithinDistance =
  isDistanceValid &&
  distanceToStore <= maxDistance;

const hasGoodRating =
  isStarRatingValid &&
  starRating >= minStarRating;

const isNotOverloaded =
  isActiveOrdersValid &&
  currentActiveOrders <= maxActiveOrders;

const isEligibleDriver =
  isOnline &&
  isWithinDistance &&
  hasGoodRating &&
  isNotOverloaded;

const starScore = starRating * 20;

const distanceScore =
  (maxDistance - distanceToStore) * 10;

const activeOrderPenalty =
  currentActiveOrders * 15;

const rawPriorityScore =
  starScore +
  distanceScore -
  activeOrderPenalty;

const priorityScore =
  rawPriorityScore * isEligibleDriver;

const driverStatus =
  (isEligibleDriver && "Đủ điều kiện nhận đơn") ||
  "Không đủ điều kiện nhận đơn";

console.log(`===== DRIVER MATCHING ENGINE =====`);
console.log(`Tài xế: ${driverName}`);
console.log(`Khoảng cách tới quán: ${distanceToStore} km`);
console.log(`Điểm sao: ${starRating}`);
console.log(`Số đơn đang giao: ${currentActiveOrders}`);
console.log(`Trạng thái online: ${isOnline}`);
console.log(`Trong phạm vi phục vụ: ${isWithinDistance}`);
console.log(`Đạt tiêu chuẩn điểm sao: ${hasGoodRating}`);
console.log(`Không quá tải đơn: ${isNotOverloaded}`);
console.log(`Kết quả thẩm định: ${driverStatus}`);
console.log(`Điểm ưu tiên: ${priorityScore}`);