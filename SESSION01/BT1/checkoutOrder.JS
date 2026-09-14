const customerName = "Nguyen Thi Mai";
const foodItemName = "Com Tam Suon Bi Cha";
const rawFoodPrice = "55000";
const rawToppingPrice = "15000";
const rawDistanceKm = "3.5";
const isStoreOpen = true;
const isUserBlocked = false;

const deliveryFee = 20000;
const voucherDiscount = 15000;

const foodPrice = Number(rawFoodPrice);
const toppingPrice = Number(rawToppingPrice);
const distanceKm = Number(rawDistanceKm);

const foodTotal = foodPrice + toppingPrice;

const isEligibleFreeship =
  foodTotal >= 60000 &&
  distanceKm <= 5 &&
  isStoreOpen &&
  !isUserBlocked;

const actualDeliveryFee = isEligibleFreeship ? 0 : deliveryFee;

const finalPayment =
  foodTotal + actualDeliveryFee - voucherDiscount;

console.log(`Khách hàng: ${customerName}`);
console.log(`Món ăn đặt: ${foodItemName}`);
console.log(`Tổng tiền món ăn: ${foodTotal} VND`);
console.log(`Đủ điều kiện Freeship: ${isEligibleFreeship}`);
console.log(`Số tiền thanh toán thực tế: ${finalPayment} VND`);