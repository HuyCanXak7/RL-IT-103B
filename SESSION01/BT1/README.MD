# Dò vết & Khắc phục Lỗi Nối chuỗi Tính tiền Đơn hàng

## 1. Phân tích lỗi

Trong chương trình ban đầu, các dữ liệu nhận từ biểu mẫu gồm:

```javascript
const rawFoodPrice = "55000";
const rawToppingPrice = "15000";
const rawDistanceKm = "3.5";
```

Các giá trị trên có kiểu dữ liệu `string`.

Dòng lệnh gây lỗi chính là:

```javascript
const foodTotal = rawFoodPrice + rawToppingPrice;
```

Trong JavaScript, khi toán tử `+` được sử dụng với hai chuỗi, chương trình thực hiện nối chuỗi thay vì phép cộng số học.

Do đó:

```text
"55000" + "15000"
```

không cho kết quả:

```text
70000
```

mà cho kết quả:

```text
"5500015000"
```

Điều này làm `foodTotal` bị sai kiểu dữ liệu và sai giá trị.

Ngoài ra, khi kiểm tra:

```javascript
foodTotal >= 60000
```

JavaScript tự động ép chuỗi `"5500015000"` thành số để thực hiện phép so sánh. Vì giá trị này lớn hơn `60000`, điều kiện Freeship có thể bị đánh giá sai trong những trường hợp tổng tiền thực tế chưa đạt mức quy định.

Phép tính:

```javascript
const finalPayment = foodTotal + deliveryFee - voucherDiscount;
```

cũng tiếp tục bị ảnh hưởng vì `foodTotal` là chuỗi. Khi thực hiện `foodTotal + deliveryFee`, JavaScript tiếp tục nối chuỗi trước khi thực hiện phép trừ.

## 2. Cách khắc phục

Chuyển dữ liệu số nhận từ biểu mẫu sang kiểu `Number` trước khi thực hiện tính toán:

```javascript
const foodPrice = Number(rawFoodPrice);
const toppingPrice = Number(rawToppingPrice);
const distanceKm = Number(rawDistanceKm);
```

Sau đó thực hiện phép cộng:

```javascript
const foodTotal = foodPrice + toppingPrice;
```

Điều kiện Freeship:

```javascript
const isEligibleFreeship =
  foodTotal >= 60000 &&
  distanceKm <= 5 &&
  isStoreOpen &&
  !isUserBlocked;
```

Không sử dụng `if-else`. Phí giao hàng thực tế được xác định bằng toán tử ba ngôi:

```javascript
const actualDeliveryFee = isEligibleFreeship ? 0 : deliveryFee;
```

## 3. Bảng Test Cases

| Trường hợp kiểm thử                   | Dữ liệu đầu vào                                                                                        | Kết quả sai thực tế                                                                       | Kết quả đúng mong đợi                                                     |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| TC01 - Đơn hàng đủ điều kiện Freeship | Giá món = `"55000"`, topping = `"15000"`, khoảng cách = `"3.5"`, cửa hàng mở, người dùng không bị khóa | Tổng tiền món = `"5500015000"` VND, dữ liệu bị nối chuỗi                                  | Tổng tiền món = `70000` VND, Freeship = `true`, thanh toán = `55000` VND  |
| TC02 - Đơn hàng chưa đạt mức Freeship | Giá món = `"40000"`, topping = `"15000"`, khoảng cách = `"3.5"`, cửa hàng mở, người dùng không bị khóa | Tổng tiền món = `"4000015000"` VND nên hệ thống hiểu nhầm lớn hơn `60000` và cho Freeship | Tổng tiền món = `55000` VND, Freeship = `false`, thanh toán = `60000` VND |

## 4. Kết luận

Nguyên nhân của lỗi là dữ liệu số nhận từ biểu mẫu đang ở dạng chuỗi và được sử dụng trực tiếp với toán tử `+`.

Giải pháp là ép kiểu dữ liệu sang `Number` trước khi tính toán. Sau khi sửa, chương trình tính đúng tổng tiền món, điều kiện Freeship và số tiền khách hàng phải thanh toán.
