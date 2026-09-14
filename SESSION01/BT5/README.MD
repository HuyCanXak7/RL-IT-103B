# Thiết kế Thuật toán Điều phối & Ghép đôi Tài xế Tự động

## 1. Ý tưởng triển khai

Hệ thống thẩm định tài xế dựa trên 4 yếu tố:

* Tài xế đang online.
* Khoảng cách tới quán không vượt quá 5 km.
* Điểm sao từ 4.0 trở lên.
* Số đơn đang giao không vượt quá 2 đơn.

Chương trình sử dụng toán tử so sánh, toán tử logic và phép toán số học để xử lý toàn bộ nghiệp vụ mà không sử dụng `if`, `else`, `switch`, toán tử ba ngôi, vòng lặp, hàm, mảng hoặc đối tượng.

## 2. Tiêu chuẩn nhận đơn

| Tiêu chí         | Điều kiện         |
| ---------------- | ----------------- |
| Trạng thái       | `isOnline = true` |
| Khoảng cách      | Từ 0 đến 5 km     |
| Điểm sao         | Từ 4.0 đến 5.0    |
| Số đơn đang giao | Từ 0 đến 2 đơn    |

Tài xế chỉ đủ điều kiện khi tất cả tiêu chí đều đúng.

```javascript
const isEligibleDriver =
  isOnline &&
  isWithinDistance &&
  hasGoodRating &&
  isNotOverloaded;
```

## 3. Kiểm tra dữ liệu đầu vào

Khoảng cách phải là số hợp lệ và không âm:

```javascript
const isDistanceValid =
  distanceToStore === distanceToStore &&
  distanceToStore >= 0;
```

Điểm sao phải nằm trong khoảng từ 0 đến 5:

```javascript
const isStarRatingValid =
  starRating === starRating &&
  starRating >= 0 &&
  starRating <= 5;
```

Số đơn đang giao phải là số nguyên không âm:

```javascript
const isActiveOrdersValid =
  currentActiveOrders === currentActiveOrders &&
  currentActiveOrders >= 0 &&
  currentActiveOrders % 1 === 0;
```

Điều kiện:

```text
value === value
```

được dùng để phát hiện `NaN`.

`NaN` là giá trị đặc biệt không bằng chính nó.

## 4. Kiểm tra phạm vi phục vụ

```javascript
const isWithinDistance =
  isDistanceValid &&
  distanceToStore <= maxDistance;
```

Bán kính phục vụ tối đa được thiết kế là:

```text
5 km
```

Tài xế ở xa hơn 5 km sẽ không đủ điều kiện nhận đơn.

## 5. Kiểm tra điểm sao

```javascript
const hasGoodRating =
  isStarRatingValid &&
  starRating >= minStarRating;
```

Điểm sao tối thiểu:

```text
4.0 sao
```

Điểm sao cao thể hiện mức độ uy tín và chất lượng phục vụ của tài xế.

## 6. Kiểm tra tải đơn

```javascript
const isNotOverloaded =
  isActiveOrdersValid &&
  currentActiveOrders <= maxActiveOrders;
```

Mỗi tài xế được phép mang tối đa:

```text
2 đơn
```

Điều này giúp hạn chế tình trạng tài xế nhận quá nhiều đơn cùng lúc dẫn đến giao hàng chậm.

## 7. Công thức điểm ưu tiên

Điểm ưu tiên được thiết kế theo công thức:

```text
Điểm ưu tiên
= Điểm sao
+ Điểm khoảng cách
- Điểm phạt số đơn đang giao
```

Điểm sao:

```javascript
const starScore = starRating * 20;
```

Điểm sao càng cao thì điểm ưu tiên càng lớn.

Điểm khoảng cách:

```javascript
const distanceScore =
  (maxDistance - distanceToStore) * 10;
```

Tài xế càng gần quán thì điểm khoảng cách càng cao.

Điểm phạt tải đơn:

```javascript
const activeOrderPenalty =
  currentActiveOrders * 15;
```

Tài xế đang mang nhiều đơn sẽ bị giảm điểm ưu tiên.

Điểm tổng:

```javascript
const rawPriorityScore =
  starScore +
  distanceScore -
  activeOrderPenalty;
```

## 8. Chặn tài xế không hợp lệ

Điểm cuối cùng được tính bằng:

```javascript
const priorityScore =
  rawPriorityScore * isEligibleDriver;
```

Khi tài xế hợp lệ:

```text
true = 1
```

Điểm ưu tiên được giữ nguyên.

Khi tài xế không hợp lệ:

```text
false = 0
```

Do đó:

```text
priorityScore = 0
```

Không cần sử dụng `if-else`.

## 9. Hiển thị trạng thái bằng logic ngắn mạch

```javascript
const driverStatus =
  (isEligibleDriver && "Đủ điều kiện nhận đơn") ||
  "Không đủ điều kiện nhận đơn";
```

Nếu tài xế hợp lệ, hệ thống trả về:

```text
Đủ điều kiện nhận đơn
```

Ngược lại:

```text
Không đủ điều kiện nhận đơn
```

## 10. Các trường hợp kiểm thử ngoại lệ

| Trường hợp                   | Dữ liệu                   | Kết quả mong đợi                              |
| ---------------------------- | ------------------------- | --------------------------------------------- |
| EC01 - Tài xế offline        | `isOnline = false`        | Không đủ điều kiện, điểm ưu tiên = 0          |
| EC02 - Tài xế quá tải        | `currentActiveOrders = 3` | Không đủ điều kiện, điểm ưu tiên = 0          |
| EC03 - Điểm sao thấp         | `starRating = 3.9`        | Không đủ điều kiện, điểm ưu tiên = 0          |
| EC04 - Quá xa quán           | `distanceToStore = 5.1`   | Không đủ điều kiện, điểm ưu tiên = 0          |
| EC05 - Đúng biên khoảng cách | `distanceToStore = 5`     | Vẫn đủ điều kiện nếu các tiêu chí khác hợp lệ |
| EC06 - Đúng biên điểm sao    | `starRating = 4.0`        | Vẫn đạt tiêu chuẩn điểm sao                   |
| EC07 - Khoảng cách âm        | `distanceToStore = -1`    | Dữ liệu không hợp lệ, điểm ưu tiên = 0        |
| EC08 - Điểm sao lớn hơn 5    | `starRating = 5.5`        | Dữ liệu không hợp lệ, điểm ưu tiên = 0        |

## 11. Ví dụ tính điểm

Tài xế có:

```text
Điểm sao = 4.8
Khoảng cách = 2.5 km
Số đơn đang giao = 1
```

Điểm sao:

```text
4.8 × 20 = 96
```

Điểm khoảng cách:

```text
(5 - 2.5) × 10 = 25
```

Điểm phạt:

```text
1 × 15 = 15
```

Điểm ưu tiên:

```text
96 + 25 - 15 = 106
```

Vì tài xế thỏa mãn tất cả điều kiện nên:

```text
Điểm ưu tiên = 106
```

## 12. Kết luận

Giải pháp sử dụng các cờ Boolean để tách từng tiêu chí thẩm định tài xế.

Điểm ưu tiên kết hợp ba yếu tố chính:

* Điểm sao càng cao càng được ưu tiên.
* Khoảng cách tới quán càng gần càng được ưu tiên.
* Tài xế đang mang nhiều đơn sẽ bị giảm mức ưu tiên.

Tài xế không đáp ứng điều kiện nhận đơn sẽ tự động có điểm ưu tiên bằng `0`, không cần sử dụng cấu trúc `if-else`.
