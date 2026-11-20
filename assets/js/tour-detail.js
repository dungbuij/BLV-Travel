/* Bộ dựng trang chi tiết tour dùng chung – BLV Travel
 * Mỗi trang nạp trước 1 file dữ liệu assets/js/tours/<slug>.js (gán window.BLV_TOUR),
 * sau đó nạp file này để render danh sách và gắn tương tác.
 */
(() => {
  'use strict';

  const T = window.BLV_TOUR;
  if (!T) { console.warn('Thiếu dữ liệu tour (window.BLV_TOUR).'); return; }

  /* ================= THƯ VIỆN BIỂU TƯỢNG ================= */
  // `id` là mã ảnh Unsplash (photo-…) hoặc URL đầy đủ (ảnh Wikimedia Commons)
  const IMG = (id, w = 900) => /^https?:\/\//.test(id) ? id : `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;

  // Hình minh họa cho thẻ điểm nhấn khi chưa có ảnh thật
  const ART = {
    citadel: '<path d="M3 21h18M5 21V10l7-5 7 5v11M9 21v-5h6v5M3 10h18M8 7.5V4M16 7.5V4"/>',
    tomb: '<path d="M4 21h16M6 21v-8h12v8M9 13V9h6v4M12 9V4M10 6h4"/>',
    pass: '<path d="M2 20l6-9 4 5 3-4 7 8z"/><path d="M14 8c2-2 4-1 6 0"/>',
    bridge: '<path d="M2 15c4-6 16-6 20 0M2 15h20M6 15v5M18 15v5M5 11l-2-4M19 11l2-4"/>',
    basket: '<path d="M3 12c0 5 4 8 9 8s9-3 9-8z"/><path d="M3 12h18M9 12l1-6M15 12l-1-6"/>',
    lantern: '<path d="M12 2v3M9 5h6M7 9c0-2 2-4 5-4s5 2 5 4v6c0 2-2 4-5 4s-5-2-5-4zM7 12h10M12 19v3"/>',
    beach: '<path d="M2 20c3-2 6-2 10 0s7 2 10 0"/><path d="M12 17V8M12 8C9 5 5 6 4 8M12 8c3-3 7-2 8 0M12 8c-1-3 0-5 2-6"/>',
    island: '<path d="M2 19c3-2 6-2 10 0s7 2 10 0"/><path d="M5 16c2-4 5-6 7-6s5 2 7 6z"/><path d="M12 10V5l3 2"/>',
    wave: '<path d="M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 17c2-2 4-2 6 0s4 2 6 0 4-2 6 0M8 7a4 4 0 0 1 8 0"/>',
    mountain: '<path d="M2 20l7-12 4 6 3-4 6 10z"/><path d="M7.5 11l1.5-1 1.5 1"/>',
    fuji: '<path d="M2 20l7-11h6l7 11z"/><path d="M9 9l1.5 2 1.5-1.5 1.5 1.5L15 9"/>',
    temple: '<path d="M3 21h18M5 21v-6h14v6M4 15h16M6 15l6-5 6 5M8 10h8M12 10V6M10 6h4M12 6V3"/>',
    city: '<path d="M3 21h18M5 21V9h4v12M9 21V4h6v17M15 21v-9h4v9M11 7h2M11 10h2M11 13h2"/>',
    tower: '<path d="M12 2v3M10 5h4M9 21l3-16 3 16M7 21h10M10 13h4M8.5 17h7"/>',
    castle: '<path d="M3 21h18M4 21V9l2-1 2 1v3h8V9l2-1 2 1v12M10 21v-5h4v5M4 9V6M20 9V6M12 12V5l2 1-2 1"/>',
    colosseum: '<path d="M3 20h18M4 20V9c0-2 4-4 8-4s8 2 8 4v11M4 12h16M7 20v-4M11 20v-4M15 20v-4M19 20v-4M7 9V7M11 9V6M15 9V6"/>',
    boat: '<path d="M3 16l2 4h14l2-4zM12 16V4l6 9h-6M12 6l-5 8h5"/>',
    market: '<path d="M3 9l2-5h14l2 5M4 9h16v11H4zM9 20v-6h6v6"/>',
    cable: '<path d="M2 5l20-2M12 4v4M8 8h8v7H8zM8 11h8"/>',
    pillars: '<path d="M5 21V8l2-4 2 4v13M11 21V5l2-3 2 3v16M17 21v-9l2-3 2 3v9M3 21h20"/>',
    sakura: '<circle cx="12" cy="12" r="2"/><path d="M12 10c-1.5-3 1.5-6 0-7-1.5 1 1.5 4 0 7M14 12c3-1.5 6 1.5 7 0M10 12c-3-1.5-6 1.5-7 0M12 14c-1.5 3 1.5 6 0 7"/>',
    onsen: '<path d="M4 15c0 3 4 5 8 5s8-2 8-5H4zM8 12c-1-2 1-3 0-5M12 12c-1-2 1-3 0-5M16 12c-1-2 1-3 0-5"/>',
    opera: '<path d="M2 18h20M4 18c0-6 4-10 8-11-2 3-2 7 0 11M12 18c0-5 3-9 7-10-2 3-2 7-1 10"/>',
    history: '<path d="M4 21V7l8-4 8 4v14M4 21h16M8 21v-9M12 21v-9M16 21v-9M4 10h16"/>',
    rice: '<path d="M2 20h20M4 20c0-4 2-7 4-8M8 20c0-5 2-8 4-9M12 20c0-5 2-8 4-9M16 20c0-4 2-7 4-8"/>',
    show: '<path d="M3 4h18v3H3zM5 7v13M19 7v13M3 20h18M9 11a3 3 0 0 0 6 0"/>',
    shopping: '<path d="M5 8h14l-1 13H6zM9 8V6a3 3 0 0 1 6 0v2"/>',
    food: '<path d="M7 3v8a2 2 0 0 0 4 0V3M9 11v10M17 3c-2 2-2 6 0 8v10"/>',
    park: '<circle cx="12" cy="9" r="6"/><path d="M12 15v6M8 21h8M9 9h6M12 6v6"/>',
    animal: '<path d="M6 20c0-4 2-7 5-8l-1-5 3 2 2-3 1 5c2 1 3 3 3 6v3zM15 20l3-3"/>'
  };

  // Biểu tượng cho khu Tiện ích
  const ICONS = {
    ticket: '<path d="M3 8a2 2 0 0 0 0 4v4h18v-4a2 2 0 0 1 0-4V4H3z"/><path d="M13 4v12"/>',
    guide: '<circle cx="12" cy="7" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/>',
    car: '<path d="M5 17h14M6 17v2M18 17v2M3 13l2-6h14l2 6v4H3z"/><circle cx="7.5" cy="14" r="1"/><circle cx="16.5" cy="14" r="1"/>',
    hotel: '<path d="M3 21V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v16M3 21h18M9 21v-4h6v4M8 7h2M14 7h2M8 11h2M14 11h2"/>',
    food: '<path d="M7 3v8a2 2 0 0 0 4 0V3M9 11v10M17 3c-2 2-2 6 0 8v10"/>',
    route: '<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8a3 3 0 0 0 0-6H8a3 3 0 0 1 0-6h8"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
    tag: '<path d="M20 12l-8 8-9-9V3h8z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
    plane: '<path d="M2 16l8-3V6a2 2 0 0 1 4 0v7l8 3v2l-8-2v4l2 2v1l-4-1-4 1v-1l2-2v-4l-8 2z"/>',
    passport: '<rect x="5" y="3" width="14" height="18" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M9 17h6"/>',
    wifi: '<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19" r="1"/>',
    boat: '<path d="M3 16l2 4h14l2-4zM12 16V4l6 9h-6"/>',
    camera: '<path d="M4 7h3l2-3h6l2 3h3v13H4z"/><circle cx="12" cy="13" r="4"/>',
    leaf: '<path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15M5 19l7-7"/>'
  };

  const DEFAULT_BENEFITS = {
    dom: [
      { icon: 'ticket', title: 'Trọn gói vé tham quan', desc: 'Đã gồm vé vào cổng các điểm trong chương trình, không phát sinh phí.' },
      { icon: 'guide', title: 'HDV nhiệt tình suốt tuyến', desc: 'Hướng dẫn viên am hiểu văn hóa, lịch sử địa phương, đồng hành từ lúc đón đến lúc tiễn.' },
      { icon: 'car', title: 'Xe đời mới, máy lạnh', desc: 'Xe du lịch đời mới, tài xế kinh nghiệm; nước suối và khăn lạnh mỗi ngày.' },
      { icon: 'hotel', title: 'Khách sạn vị trí đẹp', desc: 'Lưu trú gần trung tâm hoặc gần biển, thuận tiện đi dạo buổi tối.' },
      { icon: 'food', title: 'Ẩm thực đặc sản', desc: 'Thực đơn đổi món mỗi bữa, ưu tiên đặc sản địa phương; hỗ trợ suất chay.' },
      { icon: 'shield', title: 'Bảo hiểm du lịch', desc: 'Bảo hiểm mức 120 triệu đồng/khách trong suốt hành trình.' },
      { icon: 'tag', title: 'Giá minh bạch', desc: 'Không ép mua sắm, không thu thêm phí ngoài chương trình.' },
      { icon: 'phone', title: 'Hỗ trợ 24/7', desc: 'Đường dây nóng xuyên suốt tour; đổi lịch miễn phí khi thời tiết xấu.' }
    ],
    intl: [
      { icon: 'plane', title: 'Vé máy bay khứ hồi', desc: 'Đã gồm vé máy bay, thuế phí sân bay và hành lý ký gửi theo quy định hãng.' },
      { icon: 'passport', title: 'Hỗ trợ visa trọn gói', desc: 'Chuyên viên hướng dẫn chuẩn bị hồ sơ, đặt lịch và theo dõi kết quả visa.' },
      { icon: 'hotel', title: 'Khách sạn chuẩn quốc tế', desc: 'Phòng tiêu chuẩn 2 khách/phòng, vị trí thuận tiện di chuyển.' },
      { icon: 'guide', title: 'HDV tiếng Việt suốt tuyến', desc: 'Trưởng đoàn đi cùng từ Việt Nam và hướng dẫn viên địa phương nói tiếng Việt.' },
      { icon: 'food', title: 'Bữa ăn theo chương trình', desc: 'Kết hợp món bản địa và nhà hàng Việt để cả đoàn đều hợp khẩu vị.' },
      { icon: 'shield', title: 'Bảo hiểm quốc tế', desc: 'Bảo hiểm du lịch quốc tế suốt hành trình theo yêu cầu xét visa.' },
      { icon: 'wifi', title: 'Sim/Wifi 4G', desc: 'Kết nối internet để liên lạc với gia đình và trưởng đoàn mọi lúc.' },
      { icon: 'phone', title: 'Hỗ trợ 24/7', desc: 'Trưởng đoàn và văn phòng BLV Travel trực liên tục trong suốt chuyến đi.' }
    ]
  };

  /* ================= HELPERS ================= */
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const vnd = n => n.toLocaleString('vi-VN') + ' ₫';
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pad = n => String(n).padStart(2, '0');
  const isoDate = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const WEEKDAY = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = $('#header');
  const headerH = () => header.offsetHeight;

  const P = T.pricing;
  const KIDS = P.kids || { label: 'Trẻ 5–10 tuổi', rate: 0.75 };
  const BABIES = P.babies || { label: 'Trẻ dưới 5 tuổi', rate: 0 };
  const FLIGHTS = P.flights || null;
  const DEPART_DAYS = T.departDays || [0, 1, 2, 3, 4, 5, 6];
  const LEAD_DAYS = T.leadDays || 2;
  const defaultPkg = (P.packages.find(p => p.popular) || P.packages[0]).id;
  const kidPrice = p => Math.round(p.price * KIDS.rate);
  const babyPrice = p => Math.round(p.price * BABIES.rate);

  let toastTimer;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('is-show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('is-show'), 4000);
  }

  function scrollToEl(el) {
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - headerH() + 1;
    window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  function nextDepartures(count, fromOffset) {
    const out = [];
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + fromOffset);
    while (out.length < count) {
      if (DEPART_DAYS.includes(d.getDay())) out.push(new Date(d));
      d.setDate(d.getDate() + 1);
    }
    return out;
  }

  /* ================= RENDER ================= */
  function renderHighlights() {
    $('#highlightGrid').innerHTML = T.highlights.map(h => `
      <article class="card hl-card reveal">
        <div class="hl-media">
          ${h.img
            ? `<img src="${IMG(h.img, 700)}" alt="${esc(h.alt || h.name)}" width="700" height="438" loading="lazy">`
            : `<div class="hl-art" aria-hidden="true"><svg viewBox="0 0 24 24">${ART[h.art] || ART.mountain}</svg><span>${esc(h.name)}</span></div>`}
          <span class="hl-tag">${esc(h.tag)}</span>
          ${h.credit ? `<a class="hl-credit" href="${esc(h.credit.url)}" target="_blank" rel="noopener">Ảnh: ${esc(h.credit.by)} · ${esc(h.credit.lic)}</a>` : ''}
        </div>
        <div class="hl-body">
          <h3>${esc(h.name)}</h3>
          <p>${esc(h.desc)}</p>
          <div class="hl-meta">${(h.meta || []).map(m => `<span>${esc(m)}</span>`).join('')}</div>
        </div>
      </article>`).join('');
  }

  function renderDays() {
    $('#dayTabs').innerHTML = T.days.map((d, i) => `
      <button class="tab" role="tab" id="tab-${i}" aria-controls="panel-${i}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">
        Ngày ${i + 1}<small>${esc(d.short)}</small>
      </button>`).join('');
    $('#dayPanels').innerHTML = T.days.map((d, i) => `
      <div class="card day-panel" role="tabpanel" id="panel-${i}" aria-labelledby="tab-${i}" tabindex="0" ${i === 0 ? '' : 'hidden'}>
        <h3>Ngày ${i + 1}: ${esc(d.title)}</h3>
        <p class="day-meals">${esc(d.meals)}</p>
        <ol class="timeline">
          ${d.steps.map(([t, s]) => `<li><time>${esc(t)}</time><p>${esc(s)}</p></li>`).join('')}
        </ol>
        ${d.tip ? `<p class="kid-tip">${esc(d.tip)}</p>` : ''}
      </div>`).join('');
  }

  function renderBenefits() {
    // Tiện ích riêng của tour đứng trước, bổ sung tiện ích mặc định cho đủ 8 thẻ
    const own = T.benefits || [];
    const used = new Set(own.map(b => b.icon));
    const list = own.concat(DEFAULT_BENEFITS[T.type].filter(b => !used.has(b.icon))).slice(0, 8);
    $('#benefitGrid').innerHTML = list.map(b => `
      <article class="card bn-card reveal">
        <div class="bn-icon"><svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[b.icon] || ICONS.tag}</svg></div>
        <h3>${esc(b.title)}</h3>
        <p>${esc(b.desc)}</p>
      </article>`).join('');
  }

  function renderPriceTable() {
    const yes = v => v === true ? '<span class="yes">✓ Có</span>' : v === false ? '<span class="no">–</span>' : esc(v);
    const rows = [
      ['Người lớn', p => `<span class="price-cell">${vnd(p.price)}</span>`],
      [KIDS.label, p => vnd(kidPrice(p))],
      [BABIES.label, p => BABIES.rate ? vnd(babyPrice(p)) : 'Miễn phí'],
      ['Phụ thu phòng đơn', p => vnd(p.single)]
    ].concat((P.table || []).map(r => [r.label, (p, i) => yes(r.cells[i])]));
    $('#priceHead').innerHTML = `<tr><th scope="col">Hạng dịch vụ</th>${P.packages.map(p =>
      `<th scope="col" class="${p.popular ? 'is-popular' : ''}">${esc(p.name)}</th>`).join('')}</tr>`;
    $('#priceBody').innerHTML = rows.map(([label, fn]) =>
      `<tr><th scope="row">${esc(label)}</th>${P.packages.map((p, i) => `<td>${fn(p, i)}</td>`).join('')}</tr>`).join('');
  }

  function renderPackages() {
    $('#packageGrid').innerHTML = P.packages.map(p => `
      <article class="card pkg-card reveal ${p.popular ? 'is-popular' : ''}">
        ${p.popular ? '<span class="pkg-badge">Được chọn nhiều nhất</span>' : ''}
        <div>
          <h3>Gói ${esc(p.name)}</h3>
          <p class="pkg-hotel">${esc(p.summary)}</p>
        </div>
        <div>
          ${p.old ? `<p class="pkg-old">${vnd(p.old)}</p>` : ''}
          <p class="pkg-price">${vnd(p.price)} <small>/ người lớn</small></p>
        </div>
        <ul class="pkg-list">${p.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul>
        <button type="button" class="btn ${p.popular ? 'btn-gold' : 'btn-outline'} btn-block" data-pick="${p.id}">Chọn gói ${esc(p.name)}</button>
      </article>`).join('');

    const pkgOpts = P.packages.map(p => `<option value="${p.id}">Gói ${esc(p.name)} – ${vnd(p.price)}</option>`).join('');
    $('#calcPkg').innerHTML = $('#fPkg').innerHTML = pkgOpts;
    $('#calcPkg').value = $('#fPkg').value = defaultPkg;

    if (FLIGHTS) {
      const flOpts = FLIGHTS.map(f => `<option value="${f.id}">${esc(f.label)}${f.price ? ` – ${vnd(f.price)}` : ''}</option>`).join('');
      $('#calcFlight').innerHTML = $('#fFlight').innerHTML = flOpts;
    }
  }

  function renderReviews() {
    $('#reviewGrid').innerHTML = T.reviews.map(r => {
      const initials = r.name.replace(/^(Gia đình\s+)?(Chị|Anh|Chú|Cô|Bác|Bà|Ông|Em)\s+/, '').split(' ').map(w => w[0]).slice(-2).join('');
      return `
      <figure class="card rv-card reveal">
        <div class="rv-stars" aria-label="5 trên 5 sao">★★★★★</div>
        <blockquote>“${esc(r.text)}”</blockquote>
        <figcaption class="rv-user">
          <span class="rv-avatar" aria-hidden="true">${esc(initials)}</span>
          <span><b>${esc(r.name)}</b><small>${esc(r.from)} · ${esc(r.group)}</small></span>
        </figcaption>
      </figure>`;
    }).join('');
  }

  function renderFaqs() {
    $('#faqList').innerHTML = T.faqs.map((f, i) => `
      <div class="faq-item reveal">
        <h3><button class="faq-q" id="faq-q-${i}" aria-expanded="false" aria-controls="faq-a-${i}">${esc(f.q)}</button></h3>
        <div class="faq-a" id="faq-a-${i}" role="region" aria-labelledby="faq-q-${i}"><div><p>${esc(f.a)}</p></div></div>
      </div>`).join('');
  }

  function renderDates() {
    $('#dateChips').innerHTML = nextDepartures(6, LEAD_DAYS + 1).map(d => {
      const seats = 4 + ((d.getDate() * 7 + d.getMonth() * 3) % 14); // số chỗ minh họa
      return `<li><button type="button" class="${seats <= 6 ? 'is-low' : ''}" data-date="${isoDate(d)}" aria-pressed="false">
        ${WEEKDAY[d.getDay()]}, ${pad(d.getDate())}/${pad(d.getMonth() + 1)}<small>Còn ${seats} chỗ</small></button></li>`;
    }).join('');
  }

  /* ================= HEADER / MOBILE MENU ================= */
  function initMenu() {
    const nav = $('#nav'), btn = $('#menuToggle');
    const setOpen = open => {
      nav.classList.toggle('is-open', open);
      header.classList.toggle('menu-open', open);
      btn.setAttribute('aria-expanded', open);
      btn.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
    };
    btn.addEventListener('click', () => setOpen(btn.getAttribute('aria-expanded') !== 'true'));
    nav.addEventListener('click', e => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) { setOpen(false); btn.focus(); }
    });
    window.matchMedia('(min-width: 900px)').addEventListener('change', e => { if (e.matches) setOpen(false); });
  }

  function initScroll() {
    const toTop = $('#toTop'), bar = $('.mobile-bar'), hero = $('.hero'), contact = $('#dat-tour');
    let ticking = false;
    const onScroll = () => {
      const y = window.scrollY;
      header.classList.toggle('is-scrolled', y > 40);
      toTop.hidden = y < 600;
      bar.classList.toggle('is-visible', y > hero.offsetHeight * 0.6 && contact.getBoundingClientRect().top > window.innerHeight * 0.5);
      ticking = false;
    };
    window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });
    onScroll();

    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
      $('.skip-link').focus({ preventScroll: true });
    });

    document.addEventListener('click', e => {
      const a = e.target.closest('a[href^="#"]');
      if (!a || a.getAttribute('href') === '#') return;
      const target = $(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      scrollToEl(target);
      history.replaceState(null, '', a.getAttribute('href'));
    });

    const links = $$('.nav-list a');
    const map = new Map(links.map(l => [l.getAttribute('href').slice(1), l]));
    const spy = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        links.forEach(l => { l.classList.remove('is-active'); l.removeAttribute('aria-current'); });
        const link = map.get(en.target.id);
        if (link) { link.classList.add('is-active'); link.setAttribute('aria-current', 'true'); }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main section[id]').forEach(s => spy.observe(s));
  }

  /* ================= REVEAL & COUNTERS ================= */
  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const fmt = v => v.toLocaleString('vi-VN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    if (reduceMotion) { el.textContent = fmt(target); return; }
    const dur = 1400, start = performance.now();
    const tick = now => {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = fmt(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  function initReveal() {
    if (!('IntersectionObserver' in window)) {
      $$('.reveal').forEach(el => el.classList.add('is-in'));
      $$('[data-count]').forEach(animateCount);
      return;
    }
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-in');
        obs.unobserve(en.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    $$('.reveal').forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 80}ms`;
      io.observe(el);
    });

    const co = new IntersectionObserver((entries, obs) => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        animateCount(en.target);
        obs.unobserve(en.target);
      });
    }, { threshold: 0.6 });
    $$('[data-count]').forEach(el => co.observe(el));
  }

  /* ================= TABS LỊCH TRÌNH ================= */
  function initTabs() {
    const tabs = $$('#dayTabs [role="tab"]');
    const select = i => {
      tabs.forEach((t, j) => {
        const on = i === j;
        t.setAttribute('aria-selected', on);
        t.tabIndex = on ? 0 : -1;
        $(`#panel-${j}`).hidden = !on;
      });
      tabs[i].focus({ preventScroll: true });
      tabs[i].scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reduceMotion ? 'auto' : 'smooth' });
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(i));
      t.addEventListener('keydown', e => {
        const k = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
        if (k) { e.preventDefault(); select((i + k + tabs.length) % tabs.length); }
        if (e.key === 'Home') { e.preventDefault(); select(0); }
        if (e.key === 'End') { e.preventDefault(); select(tabs.length - 1); }
      });
    });
  }

  /* ================= FAQ ================= */
  function initFaq() {
    $('#faqList').addEventListener('click', e => {
      const btn = e.target.closest('.faq-q');
      if (!btn) return;
      const open = btn.getAttribute('aria-expanded') !== 'true';
      $$('.faq-q', $('#faqList')).forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        b.closest('.faq-item').classList.remove('is-open');
      });
      btn.setAttribute('aria-expanded', open);
      btn.closest('.faq-item').classList.toggle('is-open', open);
    });
  }

  /* ================= TÍNH GIÁ ================= */
  function initCalc() {
    const state = { adults: 2, kids: 0, babies: 0 };
    const limits = { adults: [1, 40], kids: [0, 20], babies: [0, 10] };
    const pkgSel = $('#calcPkg'), flSel = $('#calcFlight');

    const update = () => {
      const pkg = P.packages.find(p => p.id === pkgSel.value);
      const tour = pkg.price * state.adults + kidPrice(pkg) * state.kids + babyPrice(pkg) * state.babies;
      const fl = FLIGHTS && flSel ? FLIGHTS.find(f => f.id === flSel.value) : null;
      const flight = fl ? fl.price * (state.adults + state.kids) : 0;
      $('#calcTotal').textContent = vnd(tour + flight);
      $('#calcNote').textContent = fl && fl.price
        ? `Tạm tính: tour ${vnd(tour)} + vé máy bay ${vnd(flight)} (vé em bé dưới 2 tuổi tính riêng)`
        : (P.calcNote || 'Tạm tính');
      $$('.stepper').forEach(s => {
        const f = s.dataset.field;
        $('output', s).textContent = state[f];
        $('[data-step="-1"]', s).disabled = state[f] <= limits[f][0];
        $('[data-step="1"]', s).disabled = state[f] >= limits[f][1];
      });
    };

    $('#calc').addEventListener('click', e => {
      const b = e.target.closest('[data-step]');
      if (!b) return;
      const f = b.closest('.stepper').dataset.field;
      const [min, max] = limits[f];
      state[f] = Math.min(max, Math.max(min, state[f] + Number(b.dataset.step)));
      update();
    });
    pkgSel.addEventListener('change', update);
    if (flSel) flSel.addEventListener('change', update);

    $('#calcBook').addEventListener('click', () => {
      $('#fPkg').value = pkgSel.value;
      if (flSel && $('#fFlight')) $('#fFlight').value = flSel.value;
      $('#fAdults').value = state.adults;
      $('#fKids').value = state.kids + state.babies;
      goToForm();
    });

    $('#packageGrid').addEventListener('click', e => {
      const b = e.target.closest('[data-pick]');
      if (!b) return;
      pkgSel.value = $('#fPkg').value = b.dataset.pick;
      update();
      goToForm();
      toast(`Đã chọn ${b.textContent.replace('Chọn ', '')}. Mời bạn điền thông tin đặt tour.`);
    });

    update();
  }

  function goToForm() {
    scrollToEl($('#dat-tour'));
    setTimeout(() => $('#fName').focus({ preventScroll: true }), reduceMotion ? 0 : 600);
  }

  /* ================= FORM ĐẶT TOUR ================= */
  function initForm() {
    const form = $('#bookForm');
    const dateInput = $('#fDate');
    const chips = $('#dateChips');
    dateInput.min = isoDate(nextDepartures(1, LEAD_DAYS)[0]);

    const syncChips = () => $$('button', chips).forEach(b => b.setAttribute('aria-pressed', b.dataset.date === dateInput.value));

    const rules = {
      name: v => v.trim().length >= 2 ? '' : 'Vui lòng nhập họ tên (ít nhất 2 ký tự).',
      phone: v => /^(0|\+84)\d{9}$/.test(v.replace(/[\s.-]/g, '')) ? '' : 'Số điện thoại chưa đúng, ví dụ: 0909 553 130.',
      email: v => !v.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Email chưa đúng định dạng.',
      date: v => {
        if (!v) return 'Vui lòng chọn ngày khởi hành.';
        if (v < dateInput.min) return `Vui lòng chọn ngày từ ${LEAD_DAYS} ngày tới trở đi${T.type === 'intl' ? ' (cần thời gian làm visa và vé máy bay)' : ''}.`;
        const day = new Date(v + 'T00:00:00').getDay();
        return DEPART_DAYS.includes(day) ? '' : `Tour ghép khởi hành ${T.departText}. Đoàn riêng vui lòng ghi chú bên dưới.`;
      }
    };

    const check = input => {
      const rule = rules[input.name];
      if (!rule) return true;
      const msg = rule(input.value);
      const field = input.closest('.field');
      field.classList.toggle('has-error', !!msg);
      input.setAttribute('aria-invalid', !!msg);
      $('.field-err', field).textContent = msg;
      return !msg;
    };

    chips.addEventListener('click', e => {
      const b = e.target.closest('[data-date]');
      if (!b) return;
      dateInput.value = b.dataset.date;
      syncChips();
      check(dateInput);
      toast(`Đã chọn ngày khởi hành ${b.firstChild.textContent.trim()}.`);
    });
    dateInput.addEventListener('change', () => { syncChips(); check(dateInput); });

    form.addEventListener('blur', e => { if (rules[e.target.name] && e.target.value) check(e.target); }, true);
    form.addEventListener('input', e => {
      if (e.target.closest('.field')?.classList.contains('has-error')) check(e.target);
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      const invalid = Object.keys(rules).map(n => form.elements[n]).filter(i => !check(i));
      if (invalid.length) { invalid[0].focus(); return; }

      const btn = $('button[type="submit"]', form);
      btn.disabled = true;
      btn.textContent = 'Đang gửi…';
      // Mô phỏng gửi: chưa kết nối máy chủ, không gửi dữ liệu ra ngoài
      setTimeout(() => {
        const name = form.elements.name.value.trim();
        toast(`Cảm ơn ${name}! BLV Travel sẽ gọi lại xác nhận chỗ tour ${T.code} trong 15 phút.`);
        form.reset();
        $('#fPkg').value = defaultPkg;
        syncChips();
        btn.disabled = false;
        btn.textContent = 'Gửi yêu cầu đặt tour';
      }, 800);
    });
  }

  /* ================= KHỞI TẠO ================= */
  document.documentElement.classList.remove('no-js');
  renderHighlights();
  renderDays();
  renderBenefits();
  renderPriceTable();
  renderPackages();
  renderReviews();
  renderFaqs();
  renderDates();
  initMenu();
  initScroll();
  initTabs();
  initFaq();
  initCalc();
  initForm();
  initReveal();
  $('#year').textContent = new Date().getFullYear();
})();
