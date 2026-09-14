# Thiết kế Hệ thống Phân hạng & Tích điểm ShopeeFood Rewards

## 1. Ý tưởng triển khai

Hệ thống sử dụng các biến Boolean để kiểm tra điều kiện phân hạng và toán tử logic ngắn mạch để lựa chọn hạng thành viên.

Chương trình không sử dụng:

* `if`
* `else`
* `switch`
* toán tử `? :`
* vòng lặp
* hàm tự định nghĩa
* mảng
* đối tượng

## 2. Quy tắc phân hạng

| Hạng thành viên |                                  Tổng chi tiêu | Số đơn hoàn thành/tháng | Hoàn xu |
| --------------- | ---------------------------------------------: | ----------------------: | ------: |
| Bạc             | Dưới 2.000.000 VND hoặc chưa đủ điều kiện Vàng |             Dưới 10 đơn |      1% |
| Vàng            |                               Từ 2.000.000 VND |               Từ 10 đơn |      3% |
| Kim Cương       |                               Từ 5.000.000 VND |               Từ 20 đơn |      5% |

Nếu đơn hàng phát sinh trong tháng sinh nhật, tỷ lệ hoàn xu được nhân đôi.

Ví dụ:

```text
Bạc: 1% → 2%
Vàng: 3% → 6%
Kim Cương: 5% → 10%
```

## 3. Luồng xử lý

Luồng xử lý của hệ thống:

```text
Nhận dữ liệu
    ↓
Kiểm tra dữ liệu hợp lệ
    ↓
Kiểm tra tài khoản có bị khóa không
    ↓
Xác định hạng Kim Cương
    ↓
Xác định hạng Vàng
    ↓
Xác định hạng Bạc
    ↓
Xác định tỷ lệ hoàn xu
    ↓
Kiểm tra tháng sinh nhật
    ↓
Tính số xu được hoàn
    ↓
Xuất thẻ thành viên ra Console
```

## 4. Kiểm tra dữ liệu

Tổng chi tiêu không được âm:

```javascript
const isSpendingValid =
  totalSpending === totalSpending &&
  totalSpending >= 0;
```

Số đơn hoàn thành phải là số nguyên không âm:

```javascript
const isOrdersValid =
  monthlyOrders === monthlyOrders &&
  monthlyOrders >= 0 &&
  monthlyOrders % 1 === 0;
```

Giá trị đơn hiện tại cũng không được âm:

```javascript
const isOrderAmountValid =
  currentOrderAmount === currentOrderAmount &&
  currentOrderAmount >= 0;
```

Điều kiện:

```javascript
value === value
```

được dùng để phát hiện `NaN`, vì `NaN` là giá trị duy nhất trong JavaScript không bằng chính nó.

## 5. Kiểm soát tài khoản

Tài khoản chỉ được tham gia chương trình Rewards khi:

```javascript
const isAccountValid =
  !isAccountLocked &&
  isSpendingValid &&
  isOrdersValid &&
  isOrderAmountValid;
```

Nếu tài khoản bị khóa hoặc dữ liệu không hợp lệ, số xu được nhận bằng `0`.

## 6. Phân hạng thành viên

### Kim Cương

```javascript
const isDiamond =
  isAccountValid &&
  totalSpending >= 5000000 &&
  monthlyOrders >= 20;
```

### Vàng

```javascript
const isGold =
  isAccountValid &&
  !isDiamond &&
  totalSpending >= 2000000 &&
  monthlyOrders >= 10;
```

### Bạc

```javascript
const isSilver =
  isAccountValid &&
  !isDiamond &&
  !isGold;
```

Việc thêm `!isDiamond` và `!isGold` đảm bảo người dùng chỉ thuộc một hạng duy nhất.

## 7. Xác định tên hạng bằng logic ngắn mạch

Không sử dụng `if-else` hoặc toán tử ba ngôi.

```javascript
const memberRank =
  (isDiamond && "Kim Cương") ||
  (isGold && "Vàng") ||
  (isSilver && "Bạc") ||
  "Không hợp lệ";
```

JavaScript sẽ dừng khi tìm thấy giá trị truthy đầu tiên.

## 8. Xác định tỷ lệ hoàn xu

```javascript
const cashbackRate =
  (isDiamond && 0.05) ||
  (isGold && 0.03) ||
  (isSilver && 0.01) ||
  0;
```

Tỷ lệ:

```text
Bạc        = 1%
Vàng       = 3%
Kim Cương  = 5%
```

## 9. Ưu đãi sinh nhật

Nếu đang trong tháng sinh nhật:

```javascript
const birthdayMultiplier =
  (isBirthdayMonth && 2) || 1;
```

Nếu:

```text
isBirthdayMonth = true
```

thì:

```text
birthdayMultiplier = 2
```

Ngược lại:

```text
birthdayMultiplier = 1
```

Tỷ lệ hoàn xu cuối cùng:

```javascript
const finalCashbackRate =
  cashbackRate * birthdayMultiplier;
```

## 10. Tính xu

Số xu nhận được:

```javascript
const earnedCoins =
  currentOrderAmount *
  finalCashbackRate *
  Number(isAccountValid);
```

Khi tài khoản hợp lệ:

```text
Number(true) = 1
```

Số xu được tính bình thường.

Khi tài khoản bị khóa hoặc dữ liệu không hợp lệ:

```text
Number(false) = 0
```

Do đó:

```text
earnedCoins = 0
```

## 11. Edge Cases

| Trường hợp                            | Dữ liệu                           | Kết quả mong đợi              |
| ------------------------------------- | --------------------------------- | ----------------------------- |
| EC01 - Đúng biên hạng Vàng            | Chi tiêu = 2.000.000, số đơn = 10 | Hạng Vàng, hoàn xu 3%         |
| EC02 - Đúng biên Kim Cương            | Chi tiêu = 5.000.000, số đơn = 20 | Hạng Kim Cương, hoàn xu 5%    |
| EC03 - Chi tiêu âm                    | Chi tiêu = -100.000               | Dữ liệu không hợp lệ, xu = 0  |
| EC04 - Tài khoản bị khóa              | `isAccountLocked = true`          | Không áp dụng Rewards, xu = 0 |
| EC05 - Sinh nhật thành viên Kim Cương | Kim Cương, sinh nhật = true       | Hoàn xu tăng từ 5% lên 10%    |
| EC06 - Số đơn âm                      | Số đơn = -1                       | Dữ liệu không hợp lệ, xu = 0  |

## 12. Kết luận

Giải pháp sử dụng cờ Boolean và toán tử logic ngắn mạch để thay thế hoàn toàn cấu trúc rẽ nhánh.

Cách triển khai giúp:

* Phân hạng thành viên rõ ràng.
* Không cho một người thuộc nhiều hạng cùng lúc.
* Tính tỷ lệ hoàn xu tự động.
* Nhân đôi hoàn xu trong tháng sinh nhật.
* Chặn dữ liệu âm.
* Chặn tài khoản bị khóa.
* Đưa số xu về `0` khi dữ liệu không hợp lệ.
