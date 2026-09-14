# Xây dựng Phân hệ Quyết toán Đơn hàng Đa tầng ShopeeFood

## 1. Ý tưởng triển khai

Chương trình xử lý đơn hàng mà không sử dụng `if`, `else`, `switch`, toán tử ba ngôi, vòng lặp, mảng hoặc đối tượng.

Các dữ liệu dạng chuỗi được chuyển sang số bằng toán tử `+`.

Ví dụ:

```javascript
const unitPrice = +rawUnitPrice;
const quantity = +rawQuantity;
const distanceKm = +rawDistanceKm;
const orderHour = +rawOrderHour;
```

## 2. Kiểm tra NaN

Đặc điểm của `NaN` là không bằng chính nó.

Vì vậy có thể kiểm tra dữ liệu hợp lệ bằng:

```javascript
const isUnitPriceValid = unitPrice === unitPrice;
```

Nếu giá trị là `NaN`, biểu thức trên trả về `false`.

Sau đó kết hợp toàn bộ điều kiện:

```javascript
const hasNoNaN =
  isUnitPriceValid &&
  isQuantityValid &&
  isDistanceValid &&
  isOrderHourValid;
```

## 3. Kiểm tra đơn hàng hợp lệ

Đơn hàng chỉ hợp lệ khi:

* Quán đang mở.
* Các dữ liệu chuyển đổi không phải `NaN`.
* Đơn giá không âm.
* Số lượng lớn hơn `0`.
* Số lượng không vượt tồn kho.
* Khoảng cách từ `0` đến `15 km`.
* Giờ đặt từ `0` đến `23`.

Biểu thức:

```javascript
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
```

## 4. Tính tiền món

Tiền món được tính bằng:

```javascript
const foodTotal = unitPrice * quantity;
```

## 5. Tính phí vận chuyển

Phí cơ bản là `16.000 VND`.

Phần khoảng cách vượt quá `1 km` được tính thêm `4.000 VND/km`.

Không sử dụng câu lệnh rẽ nhánh:

```javascript
const extraDistance = (distanceKm > 1) * (distanceKm - 1);

const baseDeliveryFee =
  16000 + extraDistance * 4000;
```

Khi `distanceKm <= 1`, biểu thức `(distanceKm > 1)` có giá trị `false`.

Trong phép tính số học:

```text
false = 0
true = 1
```

Do đó không cần sử dụng `if-else`.

## 6. Phụ phí cao điểm

Khung giờ cao điểm gồm:

* Trưa: `11h - 13h`.
* Tối: `18h - 20h`.

```javascript
const isLunchPeak =
  orderHour >= 11 && orderHour <= 13;

const isDinnerPeak =
  orderHour >= 18 && orderHour <= 20;

const isPeakHour =
  isLunchPeak || isDinnerPeak;

const peakHourFee =
  isPeakHour * 10000;
```

Nếu thuộc giờ cao điểm:

```text
true * 10000 = 10000
```

Nếu không thuộc giờ cao điểm:

```text
false * 10000 = 0
```

## 7. Kiểm tra Freeship

Đơn hàng được giảm `15.000 VND` phí vận chuyển khi đồng thời đáp ứng:

* Tiền món từ `100.000 VND`.
* Khoảng cách không quá `5 km`.
* Voucher chính xác là `FREESHIP_EXTRA`.

```javascript
const isFreeshipEligible =
  foodTotal >= 100000 &&
  distanceKm <= 5 &&
  voucherCode === "FREESHIP_EXTRA";

const freeshipDiscount =
  isFreeshipEligible * 15000;
```

## 8. Quyết toán

Tổng thanh toán trước khi kiểm tra tính hợp lệ:

```javascript
const calculatedPayment =
  foodTotal +
  baseDeliveryFee +
  peakHourFee -
  freeshipDiscount;
```

Sau đó sử dụng giá trị boolean của `isValidOrder` để quyết định kết quả cuối:

```javascript
const finalPayment =
  isValidOrder * calculatedPayment;
```

Nếu đơn hợp lệ:

```text
true = 1

1 * calculatedPayment = calculatedPayment
```

Nếu đơn không hợp lệ:

```text
false = 0

0 * calculatedPayment = 0
```

Nhờ đó chương trình đưa số tiền thanh toán về `0 VND` mà không cần sử dụng `if-else`.

## 9. Kết luận

Chương trình sử dụng toán tử logic ngắn mạch, phép so sánh và khả năng chuyển đổi boolean thành `0` hoặc `1` trong phép toán số học để xử lý toàn bộ nghiệp vụ.

Giải pháp đáp ứng yêu cầu không sử dụng cấu trúc rẽ nhánh nhưng vẫn xử lý được kiểm tra dữ liệu, phí giao hàng, giờ cao điểm, voucher Freeship và quyết toán đơn hàng.
