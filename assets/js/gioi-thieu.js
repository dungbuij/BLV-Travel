/* Trang Giới thiệu – BLV Travel */
(() => {
  'use strict';

  /* ================= DATA ================= */
  const IMG = (id, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;

  // Lấy đúng tên, mã, giá, ảnh từ mảng TOURS trong index.html
  const FEATURED = [
    { id: 'BLV-0950', type: 'intl', badge: 'Châu Á', name: 'Nagoya – Osaka – Kyoto – Phú Sĩ – Hakone – Tokyo', dur: '7N6Đ', price: 35990000, img: 'photo-1490806843957-31f4c9a91c65', url: 'tour-nhat-ban-nagoya-tokyo.html' },
    { id: 'BLV-1415', type: 'intl', badge: 'Châu Âu', name: 'Du lịch Châu Âu: Pháp – Thụy Sĩ – Ý', dur: '8N7Đ', price: 40999000, img: 'photo-1502602898657-3e91760cbb34', url: 'tour-chau-au-phap-thuy-si-y.html' },
    { id: 'BLV-0947', type: 'intl', badge: 'Châu Á', name: 'Hàn Quốc: Seoul – Đảo Nami – Everland', dur: '5N4Đ', price: 13990000, old: 14200000, img: 'photo-1538485399081-7191377e8241', url: 'tour-han-quoc-seoul-nami-everland.html' },
    { id: 'BLV-0931', type: 'dom', badge: 'Miền Trung', name: 'Cố Đô Huế – Đà Nẵng – Bà Nà Hills – Phố Cổ Hội An', dur: '5N4Đ', price: 5990000, old: 6590000, img: 'photo-1559592413-7cec4d0cae2b', url: 'tour-hue-da-nang-hoi-an.html' },
    { id: 'BLV-0926', type: 'dom', badge: 'Miền Bắc', name: 'Hà Nội – Sapa – Vịnh Hạ Long', dur: '5N4Đ', price: 10500000, old: 10970000, img: 'photo-1528127269322-539801943592', url: 'tour-ha-noi-sapa-ha-long.html' },
    { id: 'BLV-0989', type: 'dom', badge: 'Biển Đảo', name: 'Khám Phá Đảo Ngọc Phú Quốc', dur: '3N2Đ', price: 2685000, img: 'photo-1507525428034-b723cf961d3e', url: 'tour-phu-quoc.html' }
  ];

  const ICONS = {
    route: '<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8a3 3 0 0 0 0-6H8a3 3 0 0 1 0-6h8"/>',
    tag: '<path d="M20 12l-8 8-9-9V3h8z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
    passport: '<rect x="5" y="3" width="14" height="18" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M9 17h6"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
    invoice: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6M9 16h3"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    heart: '<path d="M12 20s-7-4.5-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.5-9 9-9 9z"/>',
    map: '<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
    group: '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-3.5 3-6 6-6s6 2.5 6 6M15 20c0-2.5 1.5-4.5 4-4.5s3 1.5 3 4.5"/>',
    plane: '<path d="M2 16l8-3V6a2 2 0 0 1 4 0v7l8 3v2l-8-2v4l2 2v1l-4-1-4 1v-1l2-2v-4l-8 2z"/>',
    car: '<path d="M5 17h14M6 17v2M18 17v2M3 13l2-6h14l2 6v4H3z"/><circle cx="7.5" cy="14" r="1"/><circle cx="16.5" cy="14" r="1"/>'
  };

  const VALUES = [
    { icon: 'route', title: 'Lịch trình minh bạch', desc: 'Chi tiết từng ngày, khách sạn 3–5 sao đúng như hợp đồng cam kết.' },
    { icon: 'tag', title: 'Giá trọn gói tối ưu', desc: 'Báo giá rõ ràng cho khách lẻ, gia đình và doanh nghiệp. Không phí ẩn.' },
    { icon: 'passport', title: 'Hỗ trợ visa & vé bay', desc: 'Chuyên sâu hồ sơ Nhật, Hàn, Đài Loan, Châu Âu Schengen và Úc.' },
    { icon: 'phone', title: 'Đồng hành 24/7', desc: 'Đội ngũ điều hành và HDV nhiều năm kinh nghiệm tại TP.HCM và Long An.' },
    { icon: 'clock', title: 'Giữ chỗ miễn phí', desc: 'Xác nhận chỗ trong 15–30 phút, chưa cần thanh toán ngay.' },
    { icon: 'invoice', title: 'Hóa đơn VAT đầy đủ', desc: 'Hợp đồng minh bạch, xuất hóa đơn nhanh gọn cho doanh nghiệp và đoàn thể.' },
    { icon: 'shield', title: 'Bảo hiểm trọn gói', desc: 'Mọi tour đều có bảo hiểm du lịch cho từng thành viên trong đoàn.' },
    { icon: 'heart', title: 'Không ép mua sắm', desc: 'Thời gian mua sắm tự do, bạn chủ động chọn nơi và món muốn mua.' }
  ];

  const SERVICES = [
    { icon: 'map', need: 'tour-trong-nuoc', title: 'Tour trong nước', desc: 'Biển đảo, miền Trung di sản, miền Bắc – Hạ Long, miền Tây sông nước.', items: ['Khởi hành hằng tuần', 'Khách sạn 3–5★', 'Đón tại TP.HCM, Long An'] },
    { icon: 'globe', need: 'tour-nuoc-ngoai', title: 'Tour nước ngoài', desc: 'Nhật Bản, Hàn Quốc, Thái Lan, Trung Quốc, Châu Âu, Úc.', items: ['Trọn gói vé máy bay & visa', 'HDV tiếng Việt suốt tuyến', 'Bảo hiểm du lịch quốc tế'] },
    { icon: 'group', need: 'mice', title: 'Tour đoàn MICE', desc: 'Teambuilding, hội nghị khách hàng, Gala Dinner cho đoàn 15 đến 500+ khách.', items: ['Báo giá trong 30 phút', 'Âm thanh – ánh sáng chuyên nghiệp', 'Xuất hóa đơn VAT'] },
    { icon: 'passport', need: 'visa', title: 'Dịch vụ visa', desc: 'Châu Á: Nhật, Hàn, Đài Loan, Trung Quốc. Schengen, Úc, Mỹ, Canada.', items: ['Hướng dẫn hồ sơ 1 kèm 1', 'Dịch thuật công chứng, đặt lịch hẹn', 'Xử lý 5–8 ngày làm việc (Châu Á)'] },
    { icon: 'plane', need: 've-may-bay', title: 'Đại lý vé máy bay', desc: 'Vé nội địa và quốc tế Vietnam Airlines, Vietjet, Bamboo và hãng quốc tế.', items: ['So sánh giá nhiều hãng', 'Hỗ trợ đổi ngày', 'Mua thêm hành lý ký gửi'] },
    { icon: 'car', need: 'thue-xe', title: 'Thuê xe 7 – 45 chỗ', desc: 'Xe 7, 16, 29, 45 chỗ và Limousine, máy lạnh, tài xế kinh nghiệm.', items: ['Đón tại TP.HCM, Long An & các tỉnh', 'Xe đời mới', 'Giá trọn gói theo tuyến'] }
  ];

  const NEEDS = [
    ['tour-trong-nuoc', 'Tour trong nước'],
    ['tour-nuoc-ngoai', 'Tour nước ngoài'],
    ['mice', 'Tour đoàn MICE / Teambuilding'],
    ['visa', 'Làm visa'],
    ['ve-may-bay', 'Đặt vé máy bay'],
    ['thue-xe', 'Thuê xe']
  ];

  const OFFICES = [
    { title: 'Văn phòng TP.HCM', address: '123 Đường ABC, Phường X, Quận Tân Bình', phone: '(028) 0000 0000', tel: '02800000000', meta: ['Tư vấn tour & visa', 'Nhận hồ sơ'] },
    { title: 'Văn phòng Long An', address: '45 Đường XYZ, Phường 2, TP. Tân An', phone: '0909 553 130', tel: '0909553130', meta: ['Điều hành đoàn', 'Tour MICE'] }
  ];

  // Nhận xét lấy từ mục "Khách hàng nói gì" của index.html
  const REVIEWS = [
    { name: 'Chị Minh Trang', from: 'Quận 7, TP.HCM', group: 'Tour Nhật Bản 6N5Đ', text: 'Gia đình tôi có ông bà và hai bé nhỏ, đi Nhật mùa hoa anh đào 6N5Đ. Visa được lo trọn vẹn, khách sạn ngay trung tâm, HDV chu đáo từng bữa ăn. Cả nhà rất hài lòng!' },
    { name: 'Anh Quốc Tuấn', from: 'Đại diện Công đoàn, Long An', group: 'MICE Phan Thiết', text: 'Đoàn công đoàn 85 người đi Phan Thiết teambuilding + Gala Dinner. Xe 45 chỗ đúng giờ, chương trình Gala rất sôi động, hóa đơn VAT xuất nhanh gọn.' },
    { name: 'Chị Hồng Hạnh', from: 'Tân Bình, TP.HCM', group: 'Đà Nẵng 3N2Đ', text: 'Tour Đà Nẵng – Hội An – Bà Nà giá rất minh bạch, không phát sinh phí, không ép mua sắm. Lần sau chắc chắn sẽ quay lại đặt tiếp.' }
  ];

  // Câu hỏi lấy từ mục FAQ của index.html
  const FAQS = [
    ['Làm sao để giữ chỗ tour?', 'Bạn chỉ cần bấm nút “Giữ Chỗ” trên tour muốn đi, hoặc gọi / nhắn Zalo hotline. Chỗ được xác nhận miễn phí trong 15 – 30 phút, chưa cần thanh toán.'],
    ['Giá tour đã bao gồm những gì?', 'Mỗi tour có bảng giá chi tiết: vận chuyển, khách sạn 3 – 5 sao, bữa ăn theo chương trình, vé tham quan, hướng dẫn viên và bảo hiểm du lịch.'],
    ['Có nhận thiết kế tour đoàn riêng không?', 'Có. Chúng tôi thiết kế tour cho đoàn từ 15 đến 500+ khách khởi hành từ TP.HCM, Long An và các tỉnh lân cận, có hợp đồng và xuất hóa đơn VAT đầy đủ.'],
    ['Công ty có hỗ trợ làm visa không?', 'Có. Chuyên viên hướng dẫn hồ sơ 1 kèm 1, dịch thuật, điền đơn và đặt lịch hẹn lãnh sự quán cho các nước Châu Á, Châu Âu, Úc, Mỹ, Canada.'],
    ['Tôi có thể đến văn phòng tư vấn trực tiếp?', 'Bạn có thể ghé 1 trong 2 văn phòng tại TP.HCM và Long An, hoặc nhân viên sẽ đến tận nơi để giao hồ sơ, ký hợp đồng.']
  ];

  /* ================= HELPERS ================= */
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const vnd = n => n.toLocaleString('vi-VN') + ' ₫';
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const svg = name => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[name]}</svg>`;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = $('#header');

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
    const top = el.getBoundingClientRect().top + window.scrollY - header.offsetHeight + 1;
    window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  /* ================= RENDER ================= */
  function renderOffices() {
    $('#officeList').innerHTML = OFFICES.map(o => `
      <article class="card office">
        <h3>${esc(o.title)}</h3>
        <p>${esc(o.address)}</p>
        <p>Điện thoại: <a href="tel:${o.tel}">${esc(o.phone)}</a></p>
        <div class="office-meta">${o.meta.map(m => `<span>${esc(m)}</span>`).join('')}</div>
      </article>`).join('');
  }

  function renderTours() {
    $('#tourGrid').innerHTML = FEATURED.map(t => `
      <article class="card hl-card tour-card reveal" data-type="${t.type}">
        <a class="hl-media" href="${t.url}" tabindex="-1" aria-hidden="true">
          <img src="${IMG(t.img, 700)}" alt="" width="700" height="438" loading="lazy">
          <span class="hl-tag">${esc(t.badge)} · ${esc(t.dur)}</span>
        </a>
        <div class="hl-body">
          <p class="hl-meta"><span>Mã ${esc(t.id)}</span><span>${t.type === 'intl' ? 'Tour nước ngoài' : 'Tour trong nước'}</span></p>
          <h3><a href="${t.url}">${esc(t.name)}</a></h3>
          <div class="tour-price">
            <div><small>Giá từ</small>${t.old ? `<del>${vnd(t.old)}</del>` : ''}<b>${vnd(t.price)}</b></div>
            <a class="btn btn-gold" href="${t.url}">Xem chi tiết</a>
          </div>
        </div>
      </article>`).join('');
  }

  function renderValues() {
    $('#valueGrid').innerHTML = VALUES.map(v => `
      <article class="card bn-card reveal">
        <div class="bn-icon">${svg(v.icon)}</div>
        <h3>${esc(v.title)}</h3>
        <p>${esc(v.desc)}</p>
      </article>`).join('');
  }

  function renderServices() {
    $('#serviceGrid').innerHTML = SERVICES.map(s => `
      <article class="card svc-card reveal">
        <div class="bn-icon">${svg(s.icon)}</div>
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.desc)}</p>
        <ul class="pkg-list">${s.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul>
        <button type="button" class="btn btn-outline btn-block" data-need="${s.need}">Tư vấn ${esc(s.title.toLowerCase())}</button>
      </article>`).join('');
    $('#fNeed').insertAdjacentHTML('beforeend', NEEDS.map(([v, l]) => `<option value="${v}">${esc(l)}</option>`).join(''));
  }

  function renderReviews() {
    $('#reviewGrid').innerHTML = REVIEWS.map(r => {
      const initials = r.name.replace(/^(Chị|Anh|Chú|Cô|Bác)\s+/, '').split(' ').map(w => w[0]).slice(-2).join('');
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
    $('#faqList').innerHTML = FAQS.map(([q, a], i) => `
      <div class="faq-item reveal">
        <h3><button class="faq-q" id="faq-q-${i}" aria-expanded="false" aria-controls="faq-a-${i}">${esc(q)}</button></h3>
        <div class="faq-a" id="faq-a-${i}" role="region" aria-labelledby="faq-q-${i}"><div><p>${esc(a)}</p></div></div>
      </div>`).join('');
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
    const toTop = $('#toTop'), bar = $('.mobile-bar'), hero = $('.hero'), contact = $('#lien-he');
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
    const fmt = v => Math.round(v).toLocaleString('vi-VN');
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

  /* ================= LỌC TOUR ================= */
  function initFilter() {
    const tabs = $$('#tourFilter [role="tab"]');
    const select = btn => {
      tabs.forEach(t => {
        const on = t === btn;
        t.setAttribute('aria-selected', on);
        t.tabIndex = on ? 0 : -1;
      });
      const type = btn.dataset.type;
      $$('#tourGrid .tour-card').forEach(c => {
        c.hidden = type !== 'all' && c.dataset.type !== type;
        c.classList.add('is-in');
      });
    };
    tabs.forEach((t, i) => {
      t.tabIndex = i === 0 ? 0 : -1;
      t.addEventListener('click', () => select(t));
      t.addEventListener('keydown', e => {
        const k = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
        if (!k) return;
        e.preventDefault();
        const next = tabs[(i + k + tabs.length) % tabs.length];
        next.focus();
        select(next);
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

  /* ================= FORM LIÊN HỆ ================= */
  function initForm() {
    const form = $('#contactForm');

    // Nút "Tư vấn …" ở khu Dịch vụ: điền sẵn nhu cầu và chuyển tới form
    $('#serviceGrid').addEventListener('click', e => {
      const b = e.target.closest('[data-need]');
      if (!b) return;
      form.elements.need.value = b.dataset.need;
      check(form.elements.need);
      scrollToEl($('#lien-he'));
      setTimeout(() => $('#fName').focus({ preventScroll: true }), reduceMotion ? 0 : 600);
      toast(`Đã chọn nhu cầu: ${form.elements.need.selectedOptions[0].textContent}.`);
    });

    const rules = {
      name: v => v.trim().length >= 2 ? '' : 'Vui lòng nhập họ tên (ít nhất 2 ký tự).',
      phone: v => /^(0|\+84)\d{9}$/.test(v.replace(/[\s.-]/g, '')) ? '' : 'Số điện thoại chưa đúng, ví dụ: 0946 789 438.',
      email: v => !v.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Email chưa đúng định dạng.',
      need: v => v ? '' : 'Vui lòng chọn nhu cầu để chúng tôi tư vấn đúng chuyên viên.'
    };

    function check(input) {
      const rule = rules[input.name];
      if (!rule) return true;
      const msg = rule(input.value);
      const field = input.closest('.field');
      field.classList.toggle('has-error', !!msg);
      input.setAttribute('aria-invalid', !!msg);
      $('.field-err', field).textContent = msg;
      return !msg;
    }

    form.addEventListener('blur', e => { if (rules[e.target.name] && e.target.value) check(e.target); }, true);
    form.addEventListener('input', e => {
      if (e.target.closest('.field')?.classList.contains('has-error')) check(e.target);
    });
    form.addEventListener('change', e => { if (e.target.name === 'need') check(e.target); });

    form.addEventListener('submit', e => {
      e.preventDefault();
      const invalid = Object.keys(rules).map(n => form.elements[n]).filter(i => !check(i));
      if (invalid.length) { invalid[0].focus(); return; }

      const btn = $('button[type="submit"]', form);
      btn.disabled = true;
      btn.textContent = 'Đang gửi…';
      // Mô phỏng gửi: chưa kết nối máy chủ, không gửi dữ liệu ra ngoài
      setTimeout(() => {
        toast(`Cảm ơn ${form.elements.name.value.trim()}! BLV Travel sẽ gọi lại cho bạn trong 15 phút.`);
        form.reset();
        btn.disabled = false;
        btn.textContent = 'Gửi yêu cầu tư vấn';
      }, 800);
    });
  }

  /* ================= KHỞI TẠO ================= */
  document.documentElement.classList.remove('no-js');
  renderOffices();
  renderTours();
  renderValues();
  renderServices();
  renderReviews();
  renderFaqs();
  initMenu();
  initScroll();
  initFilter();
  initFaq();
  initForm();
  initReveal();
  $('#year').textContent = new Date().getFullYear();
})();
