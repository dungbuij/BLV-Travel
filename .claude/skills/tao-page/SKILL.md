---
name: tao-page
description: Tạo một trang web (landing page) hoàn chỉnh, responsive bằng HTML/CSS/JS thuần theo cấu trúc dự án, gồm Banner giới thiệu, thông tin nổi bật, tiện ích/giá trị và khu vực kêu gọi hành động/liên hệ, kèm JavaScript tương tác. Dùng khi người dùng gõ /tao-page hoặc yêu cầu "tạo trang", "làm landing page", "tạo page mới".
argument-hint: "[mô tả trang cần tạo, ví dụ: trang tour Đà Nẵng 3N2Đ cho gia đình]"
---

# /tao-page: Tạo trang web hoàn chỉnh

Yêu cầu của người dùng: **$ARGUMENTS**

Nếu yêu cầu trống, tạo trang giới thiệu chung cho dự án hiện tại (đọc `index.html` và
`.claude/CLAUDE.md` để lấy thương hiệu, màu sắc, nội dung). Không hỏi lại trừ khi yêu cầu
mâu thuẫn hoặc không thể hiểu. Tự chọn giá trị hợp lý cho phần còn thiếu.

## Bước 1: Phân tích yêu cầu
1. Đọc `.claude/CLAUDE.md` và làm theo mọi quy tắc trong đó (token màu, đặt tên, a11y, JS).
2. Xác định: **chủ đề**, **đối tượng khách**, **mục tiêu chuyển đổi** (đặt tour, gọi điện, đăng ký, gửi form…).
3. Đặt `slug` dạng kebab-case không dấu từ chủ đề (vd: "Tour Đà Nẵng" → `tour-da-nang`).
   Nếu file đã tồn tại, thêm hậu tố `-2`, `-3`… **Không ghi đè file có sẵn.**
4. Nếu trang là một tour, cấp **mã tour dạng `BLV-xxxx`** (4 chữ số, ví dụ `BLV-0932`):
   - Đọc mảng `TOURS` trong `index.html`, lấy số lớn nhất trong nhóm cùng loại rồi tăng dần, **không trùng mã đã có**.
   - Nếu người dùng đã cho mã thì dùng mã đó, nhưng luôn dùng tiền tố `BLV-` (không dùng `SV-`).
   - Dùng đúng mã này ở mọi nơi: dòng eyebrow/thông tin nhanh của trang, JSON-LD và mục thêm vào `TOURS`.

## Bước 2: Tạo file theo cấu trúc

### A. Trang tour (mặc định khi yêu cầu là một tour) – dùng bộ dựng chung
Không viết CSS/JS mới. Chỉ tạo 2 file:

```
assets/js/tours/<slug>.js    # Dữ liệu tour: window.BLV_TOUR = {...}
pages/<slug>.html            # Khung HTML
```

1. **Sao chép một file dữ liệu cùng loại** làm mẫu (`type: 'dom'` → `tour-phu-quoc.js`; có vé máy bay tùy chọn → `tour-hue-da-nang-hoi-an.js`; `type: 'intl'` → `tour-nhat-ban-nagoya-tokyo.js`) rồi thay toàn bộ nội dung cho tour mới. Giữ đúng tên các trường (xem bảng "Kiến trúc trang chi tiết tour" trong `CLAUDE.md`).
2. **Sao chép một trang `pages/*.html` cùng kiểu** (có/không ô vé máy bay) rồi thay: `<title>`, meta, og, JSON-LD, ảnh và nội dung hero, breadcrumb, thông tin nhanh, tiêu đề + mô tả từng section, số liệu bộ đếm, dòng đặt cọc, placeholder ghi chú, tiêu đề form có mã tour, và 2 thẻ `<script>`:
   `<script src="../assets/js/tours/<slug>.js" defer></script>` rồi `<script src="../assets/js/tour-detail.js" defer></script>`.
3. **Thêm tour vào `TOURS` trong `index.html`** với `url: 'pages/<slug>.html'`; tên, mã, thời gian, giá gói đầu, ảnh phải khớp file dữ liệu.
4. Không sửa `tour-detail.css` / `tour-detail.js` trừ khi cần tính năng dùng chung mới (khi đó kiểm tra lại mọi trang tour).

### B. Trang không phải tour (giới thiệu, landing chiến dịch…)

```
pages/<slug>.html            # HTML trang
assets/css/<slug>.css        # CSS riêng của trang
assets/js/<slug>.js          # JS riêng của trang
```

- HTML liên kết bằng đường dẫn tương đối: `../assets/css/<slug>.css`, `<script src="../assets/js/<slug>.js" defer>`.
- Không viết CSS/JS inline (trừ JSON-LD nếu cần). Không dùng framework hay build step.
- Chỉ được dùng tài nguyên ngoài: Google Fonts, ảnh Unsplash (`https://images.unsplash.com/<id>?auto=format&fit=crop&w=<w>&q=70`).

## Bước 3: Bố cục bắt buộc (theo thứ tự)

| # | Khu vực | Nội dung tối thiểu |
|---|---|---|
| 0 | **Header** sticky | Logo (ô logo `BLV` + chữ `<em>Travel</em>`, không lặp chữ "BLV" bên cạnh; giữ `aria-label="BLV Travel – Trang chủ"`), menu anchor tới các section, nút CTA, nút hamburger trên mobile |
| 1 | **Banner / Hero** | Tiêu đề chính `<h1>` (≤ 12 từ), mô tả 1–2 câu, 2 nút (CTA chính + phụ), ảnh nền có lớp phủ đảm bảo tương phản, 3 số liệu tin cậy |
| 2 | **Thông tin nổi bật** | 3–6 thẻ điểm nổi bật/sản phẩm (ảnh, tên, mô tả ngắn, giá/thông số nếu phù hợp) |
| 3 | **Tiện ích / Giá trị** | 4–8 lợi ích có icon SVG inline + tiêu đề + mô tả; có thể kèm bộ đếm số liệu |
| 4 | **Bằng chứng xã hội** | 3 đánh giá khách hàng hoặc logo đối tác (nên có) |
| 5 | **FAQ** | 4–6 câu hỏi dạng accordion (nên có khi chủ đề là dịch vụ/sản phẩm) |
| 6 | **CTA / Liên hệ** | Dải kêu gọi hành động + form liên hệ (họ tên, SĐT, email, nhu cầu, ghi chú) + thông tin liên hệ |
| 7 | **Footer** | Logo giống header (ô `BLV` + `<em>Travel</em>`), thông tin, liên kết nhanh, bản quyền |

Nội dung phải **cụ thể theo yêu cầu** bằng tiếng Việt tự nhiên: tên, giá, lịch trình, lợi ích
thật sự liên quan. Không để lorem ipsum hay "Tiêu đề 1". Thẻ lặp lại (tour, lợi ích, FAQ,
đánh giá) khai báo dưới dạng **mảng dữ liệu trong JS** rồi render, không lặp HTML bằng tay.

## Bước 4: CSS (responsive, mobile-first)
- Khai báo token trên `:root` (lấy giá trị từ `index.html` nếu cùng thương hiệu: `--green`, `--gold`, `--ink`, `--muted`, `--line`, `--radius`, `--shadow`, `--font`, `--serif`). Không hard-code màu ngoài token.
- Mobile-first; breakpoint: `640px`, `900px`, `1200px`. Không cuộn ngang ở 360px.
- Dùng CSS Grid/Flex, `clamp()` cho cỡ chữ tiêu đề, `max-width` container 1240px, padding 16–20px.
- Vùng bấm ≥ 44px; giữ `:focus-visible` rõ ràng.
- Hiệu ứng nhẹ (hover, reveal) và tắt theo `@media (prefers-reduced-motion: reduce)`.
- Chia khối bằng comment `/* ============ TÊN ============ */`.

## Bước 5: JavaScript tương tác
Viết ES6+, gói trong IIFE hoặc `DOMContentLoaded`, không tạo biến toàn cục. Tối thiểu:
1. **Menu mobile**: mở/đóng, cập nhật `aria-expanded`, đóng khi bấm link hoặc phím `Esc`.
2. **Header**: thêm class khi cuộn; tô sáng mục menu theo section đang xem (IntersectionObserver).
3. **Cuộn mượt** tới anchor, bù chiều cao header.
4. **Render dữ liệu** từ mảng cho các thẻ lặp lại.
5. **Reveal khi cuộn** + **bộ đếm số** chạy một lần khi hiện ra.
6. **FAQ accordion** dùng `<button aria-expanded>` (hoặc `<details>`).
7. **Form liên hệ**: kiểm tra họ tên, SĐT Việt Nam (`/^(0|\+84)\d{9}$/`), email; báo lỗi ngay dưới ô (`aria-live`), thành công thì hiện toast và reset form. Không gửi dữ liệu ra ngoài.
8. **Nút lên đầu trang** xuất hiện khi cuộn.
- Thêm bộ lọc/tab, slider, modal chỉ khi yêu cầu phù hợp.
- Không đưa chuỗi người dùng nhập vào `innerHTML`; `localStorage` (nếu dùng) phải bọc try/catch, key có tiền tố `sv_`.

## Bước 6: HTML, SEO & truy cập
- `<html lang="vi">`, `meta viewport`, `<title>` và `meta description` riêng cho trang, thẻ `og:title/description/image`.
- Có `skip-link`, `header/nav/main/section/footer`; mỗi section có `aria-labelledby`.
- Chỉ một `<h1>`; tiêu đề phân cấp đúng.
- Ảnh có `alt` ý nghĩa, `width/height`, ảnh dưới màn hình đầu dùng `loading="lazy"`.
- Label gắn với mọi ô input.

## Bước 7: Kiểm tra trước khi báo xong
- [ ] Trang tour: đủ 2 file (`pages/<slug>.html`, `assets/js/tours/<slug>.js`), slug trong dữ liệu khớp tên file, mục `TOURS` có `url`. Trang khác: đủ 3 file.
- [ ] Đường dẫn CSS/JS đúng (thử mở bằng trình duyệt hoặc kiểm tra bằng `grep`).
- [ ] Đủ các khu vực bắt buộc ở Bước 3, nội dung khớp yêu cầu.
- [ ] Không lỗi cú pháp JS (chạy `node --check assets/js/<slug>.js` nếu có Node).
- [ ] Không có màu hard-code ngoài `:root`, không có lorem ipsum.
- [ ] Nếu `index.html` có menu, đề xuất (không tự thêm) liên kết tới trang mới.
- [ ] Trang tour có mã `BLV-xxxx` không trùng với mã nào trong `TOURS` (`grep -o "BLV-[0-9]\{4\}" index.html`).

## Báo cáo cho người dùng
Trả lời ngắn bằng tiếng Việt: đường dẫn 3 file (dạng link markdown), các section đã tạo,
các tương tác JS có sẵn, cách mở trang (mở `pages/<slug>.html` hoặc `npx serve .`), và
những giả định đã tự chọn (giá, số liệu, thông tin liên hệ mẫu) để người dùng thay bằng dữ liệu thật.
