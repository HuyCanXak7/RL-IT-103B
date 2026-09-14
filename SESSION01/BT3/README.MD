# Phân tích Trade-off: Biểu thức Lồng nhau vs Cờ hiệu Boolean

## 1. Bảng so sánh Trade-off

| Tiêu chí              | Nested Logic Expression                                                                 | Tiered Boolean Flags                                                 |
| --------------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Độ phức tạp nhận thức | Cao vì nhiều điều kiện được viết chung trong một biểu thức dài, khó đọc và khó kiểm tra | Thấp hơn vì mỗi điều kiện được tách thành từng biến boolean rõ ràng  |
| Khả năng mở rộng      | Khó mở rộng. Khi thêm voucher mới, biểu thức ngày càng dài và dễ gây lỗi                | Dễ mở rộng vì chỉ cần bổ sung các biến kiểm tra cho voucher mới      |
| Nguy cơ lỗi ép kiểu   | Cao hơn nếu dữ liệu chuỗi được sử dụng trực tiếp trong biểu thức phức tạp               | Thấp hơn vì dữ liệu được ép kiểu và kiểm tra riêng trước khi sử dụng |
| Khả năng dò lỗi       | Khó xác định điều kiện nào gây sai                                                      | Dễ xác định vì có thể kiểm tra từng biến boolean                     |
| Khả năng bảo trì      | Thấp khi số lượng voucher tăng                                                          | Tốt hơn và rõ ràng hơn                                               |

## 2. Lựa chọn giải pháp

Giải pháp được lựa chọn là **Tiered Boolean Flags**.

Phương pháp này chia nghiệp vụ thành nhiều biến boolean nhỏ, mỗi biến chịu trách nhiệm kiểm tra một điều kiện cụ thể.

Ví dụ:

```javascript
const isGiam20KCode =
  voucherCode === "GIAM20K";

const isGiam20KEligible =
  isGiam20KCode &&
  isFoodTotalValid &&
  foodTotal >= 100000;
```

Cách viết này dễ đọc hơn so với việc đưa tất cả điều kiện vào một biểu thức duy nhất.

## 3. Xử lý dữ liệu đầu vào

Tiền món và khoảng cách được tiếp nhận dưới dạng chuỗi:

```javascript
const rawFoodTotal = "120000";
const rawDistanceKm = "4";
```

Dữ liệu được chuyển sang kiểu số bằng toán tử `+`:

```javascript
const foodTotal = +rawFoodTotal;
const distanceKm = +rawDistanceKm;
```

Sau đó kiểm tra `NaN`:

```javascript
const isFoodTotalValid =
  foodTotal === foodTotal;

const isDistanceValid =
  distanceKm === distanceKm;
```

`NaN` là giá trị đặc biệt trong JavaScript không bằng chính nó.

Do đó nếu dữ liệu không chuyển đổi được thành số thì biểu thức trên trả về `false`.

## 4. Kiểm tra voucher GIAM20K

Voucher `GIAM20K` chỉ hợp lệ khi:

* Mã voucher chính xác là `"GIAM20K"`.
* Tiền món hợp lệ.
* Tiền món từ `100000 VND` trở lên.

```javascript
const isGiam20KEligible =
  voucherCode === "GIAM20K" &&
  isFoodTotalValid &&
  foodTotal >= 100000;
```

Mức giảm:

```javascript
const giam20KDiscount =
  isGiam20KEligible * 20000;
```

Nếu điều kiện đúng:

```text
true * 20000 = 20000
```

Nếu điều kiện sai:

```text
false * 20000 = 0
```

## 5. Kiểm tra voucher FREESHIP

Voucher `FREESHIP` chỉ hợp lệ khi:

* Mã voucher chính xác là `"FREESHIP"`.
* Khoảng cách hợp lệ.
* Khoảng cách không âm.
* Khoảng cách nhỏ hơn hoặc bằng `5 km`.

```javascript
const isFreeshipEligible =
  voucherCode === "FREESHIP" &&
  isDistanceValid &&
  distanceKm >= 0 &&
  distanceKm <= 5;
```

Mức giảm:

```javascript
const freeshipDiscount =
  isFreeshipEligible * 15000;
```

## 6. Đảm bảo tối đa một ưu đãi

Biến `voucherCode` chỉ có thể bằng một chuỗi tại một thời điểm.

Ví dụ:

```javascript
voucherCode === "GIAM20K"
```

và:

```javascript
voucherCode === "FREESHIP"
```

không thể đồng thời cùng đúng.

Do đó:

```javascript
const totalDiscount =
  giam20KDiscount + freeshipDiscount;
```

vẫn đảm bảo một đơn hàng chỉ nhận tối đa một ưu đãi.

## 7. Rủi ro ép kiểu mã voucher

Không nên chuyển mã voucher thành số.

Ví dụ:

```text
"00123"
```

nếu ép thành số sẽ trở thành:

```text
123
```

Điều này làm mất định dạng ban đầu của mã và có thể dẫn đến việc xác thực sai.

Voucher cần được giữ dưới dạng chuỗi và so sánh bằng toán tử nghiêm ngặt:

```javascript
voucherCode === "GIAM20K"
```

Cách này giúp tránh ép kiểu ngầm và giảm nguy cơ mã không hợp lệ được hệ thống chấp nhận.

## 8. Kết luận

Tiered Boolean Flags phù hợp hơn cho hệ thống voucher vì dễ đọc, dễ kiểm thử, dễ mở rộng và giảm nguy cơ lỗi ép kiểu.

Chương trình sử dụng toán tử logic và phép toán với boolean để xử lý ưu đãi mà không sử dụng `if`, `else`, `switch`, toán tử ba ngôi, vòng lặp, hàm, mảng hoặc đối tượng.
