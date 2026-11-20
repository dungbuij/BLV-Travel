# CLAUDE.md – BLV Travel

Landing page giới thiệu tour du lịch trong nước, quốc tế và tour đoàn MICE.
Website tĩnh viết bằng HTML/CSS/JavaScript thuần: **không framework, không build step**.

## Cấu trúc thư mục

```
Buoi1/
├── .claude/
│   ├── CLAUDE.md        # Quy tắc & kiến trúc dự án (file này)
│   └── skills/
│       └── tao-page/    # Skill /tao-page: tạo trang mới hoàn chỉnh
├── index.html           # Trang chính (CSS + JS inline)
├── pages/               # Trang chi tiết từng tour: <slug>.html
├── assets/
│   ├── css/
│   │   └── tour-detail.css     # CSS dùng chung cho mọi trang chi tiết tour
│   ├── js/
│   │   ├── tour-detail.js      # Bộ dựng dùng chung: render danh sách + toàn bộ tương tác
│   │   └── tours/<slug>.js     # Dữ liệu riêng từng tour (window.BLV_TOUR)
│   ├── images/          # Ảnh tự host (webp/jpg đã nén)
│   └── icons/           # SVG icon, favicon
├── data/                # Dữ liệu tĩnh dạng JSON (dự phòng)
├── docs/                # Tài liệu, ghi chú nghiệp vụ, ảnh chụp thiết kế
├── .editorconfig
├── .gitignore
└── README.md
```

## Kiến trúc trang chi tiết tour (`pages/`)

Mọi trang tour dùng **chung một bố cục** (header logo BLV + *Travel*, hero, điểm nhấn, lịch trình
dạng tab, tiện ích, bảng giá + công cụ tính giá, đánh giá, FAQ, form đặt tour, footer).

| Tầng | File | Nội dung |
|---|---|---|
| Khung HTML | `pages/<slug>.html` | `<head>` SEO, hero, thông tin nhanh, tiêu đề các section, form. Nạp 2 script theo thứ tự: `tours/<slug>.js` rồi `tour-detail.js` (cùng `defer`) |
| Dữ liệu | `assets/js/tours/<slug>.js` | `window.BLV_TOUR = { code, slug, type: 'dom'\|'intl', name, duration, hero, quick, heads, counters, departDays, leadDays, highlights, days, benefits, pricing, reviews, faqs }` |
| Bộ dựng | `assets/js/tour-detail.js` | Render thẻ điểm nhấn, tab ngày, tiện ích (tự bổ sung mặc định theo `type` cho đủ 8), bảng giá, gói, đánh giá, FAQ, ngày khởi hành; menu, cuộn, reveal, bộ đếm, tính giá, kiểm tra form |
| Giao diện | `assets/css/tour-detail.css` | Token màu, responsive mobile-first, không màu cứng ngoài `:root` |

Quy tắc:
- **Sửa nội dung danh sách** (lịch trình, giá, FAQ, đánh giá…) → chỉ sửa `assets/js/tours/<slug>.js`.
- **Sửa tiêu đề, hero, SEO** → sửa trực tiếp trong `pages/<slug>.html` (giữ khớp với file dữ liệu).
- **Sửa giao diện hoặc tương tác cho mọi tour** → sửa `tour-detail.css` / `tour-detail.js`, không sửa từng trang.
- Tên, mã, thời gian, giá gói đầu tiên (`price`, `old`) và ảnh hero phải **khớp với mục tương ứng trong `TOURS`** của `index.html`.
- `pricing.flights` chỉ khai báo cho tour nội địa bay tự túc; tour quốc tế và tour đi xe không có mục này (form tự ẩn ô vé máy bay).
- `leadDays`: số ngày tối thiểu trước khởi hành (quốc tế cần thời gian làm visa: 15–30 ngày).
- Thẻ điểm nhấn không có ảnh thật thì dùng `art` (biểu tượng minh họa) thay cho `img`.

## Kiến trúc `index.html`

### CSS (trong `<style>`)
Chia theo các khối có comment `/* ============ TÊN ============ */`:
1. **TOKENS**: biến CSS trên `:root` (màu `--green`, `--gold`, `--ink`, `--muted`, bán kính, shadow, font)
2. **BUTTONS**: `.btn`, `.btn-gold`, `.btn-green`, `.btn-outline`, `.btn-ghost`
3. **TOPBAR & HEADER**
4. **HERO**
5. **SECTIONS**: các section nội dung
6. **RESPONSIVE**: toàn bộ media query đặt ở cuối

### HTML (thứ tự section)
`header` → `main#main` [hero · cam kết · điểm đến · `#tour-nuoc-ngoai` · `#tour-trong-nuoc` ·
`#mice` · `#dich-vu` · đánh giá · `#cam-nang` · FAQ · cta-band] → `footer#lien-he`

Các `id` section được dùng làm anchor cho menu và cho JS: **không đổi tên khi chưa cập nhật mọi chỗ tham chiếu**.

### JavaScript (trong `<script>` cuối trang)
| Khối | Vai trò |
|---|---|
| DATA | `HERO`, `DESTS`, `TOURS`, `FAQS`; hàm `IMG()` tạo URL Unsplash |
| HELPERS | `$`, `vnd()` (định dạng giá ₫), `store` (localStorage), `norm()` (bỏ dấu tiếng Việt), `toast()` |
| HERO SLIDER | slider tự chạy 6s, có dots |
| DESTINATIONS / TOURS | render thẻ tour, tab theo khu vực, bộ lọc tìm kiếm `applyFilter()` |
| WISHLIST | lưu yêu thích vào `localStorage` key `sv_wish` |
| FAQ | accordion |
| BOOKING MODAL | form đặt tour |
| VALIDATION & MICE FORM | kiểm tra dữ liệu form |
| HEADER / MOBILE MENU | sticky header, menu mobile |
| REVEAL & COUNTERS | hiệu ứng xuất hiện khi cuộn, đếm số |

Nội dung động (tour, FAQ, điểm đến) **render từ mảng dữ liệu**: muốn thêm tour thì sửa `TOURS`, không viết HTML tay.

**Mã tour:** luôn dạng `BLV-xxxx` (4 chữ số, không trùng). Không dùng tiền tố cũ `SV-`.
Tour có trang riêng thì thêm trường `url: 'pages/<slug>.html'`; thẻ tour sẽ tự hiện liên kết "Xem lịch trình chi tiết".
Mã đặt chỗ tạo trong modal có dạng `BLV` + 6 chữ số.

## Quy tắc code

### Chung
- Ngôn ngữ giao diện: **tiếng Việt** (`lang="vi"`), giá hiển thị qua `vnd()`.
- Không thêm framework/thư viện hoặc bước build nếu chưa được yêu cầu.
- Thụt lề 2 dấu cách, UTF-8, xuống dòng LF.
- Giữ đúng comment chia khối `/* ==== ... ==== */` khi thêm code mới.

### HTML
- HTML ngữ nghĩa: `header`, `nav`, `main`, `section`, `footer`, `button` cho hành động.
- Mỗi `section` có `aria-labelledby` trỏ tới tiêu đề của nó.
- Ảnh luôn có `alt` mô tả; ảnh dưới màn hình đầu dùng `loading="lazy"`.
- Giữ `skip-link` và các thuộc tính ARIA hiện có.

### CSS
- **Chỉ dùng biến token** (`var(--green)`, `var(--radius)`…), không hard-code màu mới.
  Cần màu mới thì thêm token vào `:root` trước.
- Đặt tên class ngắn, dạng kebab-case (`.tour-card`, `.btn-gold`).
- Media query gom vào khối RESPONSIVE; thiết kế phải hiển thị tốt từ 360px trở lên.
- Giữ `:focus-visible` cho mọi phần tử tương tác.

### JavaScript
- ES6+, dùng `const`/`let`, không dùng `var`; không biến toàn cục mới ngoài khối DATA.
- Dùng helper sẵn có (`$`, `store`, `norm`, `toast`, `vnd`) thay vì viết lại.
- Truy cập `localStorage` luôn qua `store` (đã bọc try/catch); key có tiền tố `sv_`.
- Dùng event delegation (`closest()`) cho các phần tử được render động.
- Không chèn chuỗi người dùng nhập vào `innerHTML`; dùng `textContent`.

### Hiệu năng & SEO
- Giữ `<title>`, `meta description`, `og:*` cập nhật khi đổi nội dung.
- Ảnh Unsplash qua `IMG(id, w)` với độ rộng phù hợp, không tải ảnh gốc.
- Font chỉ dùng Be Vietnam Pro (nội dung) và Playfair Display (tiêu đề).

## Quy trình làm việc
1. Đọc khối liên quan trong `index.html` trước khi sửa.
2. Sửa nhỏ, đúng phạm vi yêu cầu; không định dạng lại toàn file.
3. Kiểm tra bằng cách mở `index.html` trên trình duyệt (desktop + mobile), xem Console không có lỗi.
4. Cập nhật file này khi kiến trúc hoặc quy tắc thay đổi.
