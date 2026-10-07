/* =========================================================
   lokp: interactions & animations (vanilla JS, no deps)
   ========================================================= */
(() => {
  "use strict";

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const easeOut = (v) => 1 - Math.pow(1 - v, 3);
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------------------------------------------------------
     i18n
  --------------------------------------------------------- */
  const I18N = {
    pt: {
      "nav.services": "O que nois faz",
      "nav.works": "Os corre",
      "nav.examples": "Os B.O.",
      "nav.process": "O esquema",
      "nav.cta": "Chama nois",
      "hero.kicker": "Software sob medida e automação, sem meme",
      "hero.title": "Nois faz programa.",
      "hero.about": "A lokp é a firma que monta sistema na medida e automação pra empresa que cresceu mais rápido que as próprias ferramenta. Papo reto.",
      "hero.cta": "Trocar uma ideia",
      "hero.cta2": "Ver os corre",
      "hero.note": "Atendimento em português e chinês, tá ligado?",
      "sv.title": "O que nois faz",
      "sv.lead": "Corre pequeno ou grande, sempre feito pro seu esquema. Nada de pacote genérico de camelô.",
      "sv.1t": "Sistema na medida",
      "sv.1d": "Sistema interno, portal e aplicativo no jeito que a sua firma trabalha. Sem gambiarra.",
      "sv.2t": "Automação dos corre",
      "sv.2d": "Robô pro trampo chato: conferir, copiar, lançar, enviar. Todo dia, no horário, sem dar falta.",
      "sv.3t": "Integração",
      "sv.3d": "ERP, CRM, loja online, banco e planilha trocando ideia sozinhos, sem atravessador.",
      "sv.4t": "IA na moral",
      "sv.4d": "Lê documento, separa e-mail e atende cliente, com um parça humano conferindo quando precisa.",
      "sv.5t": "Painel e relatório",
      "sv.5d": "Os número que cê já tem, organizado pra decidir na hora.",
      "sv.6t": "Fortalecimento contínuo",
      "sv.6d": "Manutenção, ajuste e melhoria depois da entrega. Nois não some, não.",
      "ul.1t": "Antes",
      "ul.1d": "Planilha na mão, retrabalho, sistema que não se conversa e a rapaziada presa no corre repetitivo.",
      "ul.2t": "Durante",
      "ul.2d": "Nois mapeia cada etapa, corta o que não precisa existir e automatiza o resto.",
      "ul.3t": "Depois",
      "ul.3d": "O processo roda sozinho, os dado bate e a equipe volta a cuidar do negócio.",
      "wk.title": "Os corre",
      "wk.lead": "Os programa que nois já fez. O resto tá no forno.",
      "wk.1d": "Loja de automação comercial e informática: catálogo, carrinho e orçamento no WhatsApp. Entregue e rodando liso.",
      "wk.visit": "Colar no site",
      "wk.soon": "em breve se pá",
      "wk.soonD": "Tá no forno. Pode ser o seu.",
      "wk.soonCta": "Chama nois",
      "ex.title": "Os B.O. de sempre",
      "ex.lead": "Uns perrengue que aparece em toda firma. Se algum te pareceu familiar, é por aí que o papo começa.",
      "ex.before": "Hoje",
      "ex.after": "Com nois",
      "ex.1a": "Dois maluco passam o fim do mês conferindo nota fiscal contra pedido.",
      "ex.1b": "Um robô cruza tudo todo dia e só dedura o que não bate.",
      "ex.2a": "Pedido da loja online digitado na mão no ERP.",
      "ex.2b": "O pedido cai no ERP sozinho e o estoque se acerta em todos os canal.",
      "ex.3a": "Relatório da semana montado no Ctrl+C, Ctrl+V de cinco planilha.",
      "ex.3b": "Um painel sempre atualizado, sem copiar e colar.",
      "ex.4a": "Cliente esperando resposta pras mesmas pergunta de sempre.",
      "ex.4b": "O básico é respondido na hora; a equipe fica só com os caso que pede atenção.",
      "pr.title": "Como funciona o esquema",
      "pr.1t": "Trocar ideia",
      "pr.1d": "Nois entende o processo do jeito que ele rola hoje, não como tá no manual.",
      "pr.2t": "Proposta",
      "pr.2d": "Escopo, prazo e valor no papel, sem meme. Se fizer sentido, um protótipo antes do código.",
      "pr.3t": "Desenvolvimento",
      "pr.3d": "Entrega picada. Cê testa no caminho e nois ajusta antes do fim, não depois.",
      "pr.4t": "Entrega e suporte",
      "pr.4d": "Nois sobe pro ar, treina a rapaziada e segue colando junto.",
      "ct.title": "Vem farmar aura com nois.",
      "ct.sub": "Chega mais. Conta qual processo tá travando a sua firma que nois responde com pergunta, uma ideia de caminho e os próximos passo.",
      "ct.name": "Nome (ou vulgo)",
      "ct.email": "E-mail",
      "ct.company": "Firma",
      "ct.msg": "Qual é o B.O.?",
      "ct.msgPh": "Ex.: conferir nota fiscal e lançar no ERP",
      "ct.send": "Farmar aura",
      "ct.sent": "Carregando a aura…",
      "ft.tag": "Nois faz programa.",
      "ft.top": "Subir pro topo",
      "dl.home": "Início",
      "dl.services": "Nois faz",
      "dl.unlock": "Destrava",
      "dl.works": "Os corre",
      "dl.examples": "B.O.",
      "dl.process": "Esquema",
      "dl.contact": "Chama",
    },
    zh: {
      "nav.services": "咱干啥",
      "nav.works": "作品",
      "nav.examples": "案例场景",
      "nav.process": "合作方式",
      "nav.cta": "联系",
      "hero.kicker": "定制软件与流程自动化",
      "hero.title": "咱就是写程序的。",
      "hero.about": "lokp 为业务增长快于工具的企业，开发定制系统与自动化方案。",
      "hero.cta": "聊聊您的项目",
      "hero.cta2": "查看服务",
      "hero.note": "支持葡萄牙语与中文沟通。",
      "sv.title": "我们做什么",
      "sv.lead": "无论项目大小，都按照您的流程从头编写，而不是套用现成的软件包。",
      "sv.1t": "定制软件",
      "sv.1d": "内部系统、门户网站与应用程序，按照您公司的工作方式打造。",
      "sv.2t": "流程自动化",
      "sv.2d": "让机器人处理重复工作：核对、复制、录入、发送。每天准时运行。",
      "sv.3t": "系统集成",
      "sv.3d": "ERP、CRM、电商平台、银行与表格之间自动交换数据，无需人工中转。",
      "sv.4t": "AI 应用",
      "sv.4d": "文档识别、邮件分拣与客户服务，在需要的环节保留人工审核。",
      "sv.5t": "数据看板与报表",
      "sv.5d": "把您已有的数据整理清楚，帮助更快做出决策。",
      "sv.6t": "持续支持",
      "sv.6d": "交付后的维护、调整与优化，让系统跟着企业一起成长。",
      "ul.1t": "之前",
      "ul.1d": "手工表格、反复返工、系统之间互不相通，团队被困在重复性任务中。",
      "ul.2t": "过程中",
      "ul.2d": "我们梳理每个环节，去掉不必要的步骤，把剩下的交给自动化。",
      "ul.3t": "之后",
      "ul.3d": "流程自动运转，数据准确一致，团队重新专注于业务本身。",
      "wk.title": "作品",
      "wk.lead": "咱已经交付的项目。其他的还在锅里。",
      "wk.1d": "商业自动化与电脑设备商城：产品目录、购物车、WhatsApp 询价。已上线，稳稳运行。",
      "wk.visit": "去看看",
      "wk.soon": "敬请期待（大概吧）",
      "wk.soonD": "还在锅里。下一个也许就是你的。",
      "wk.soonCta": "联系我们",
      "ex.title": "常见问题场景",
      "ex.lead": "这些情况几乎在每家企业都会出现。如果您觉得眼熟，我们就从这里开始聊。",
      "ex.before": "现在",
      "ex.after": "自动化之后",
      "ex.1a": "每到月底，两名员工要花大量时间逐一核对发票与订单。",
      "ex.1b": "机器人每天自动比对，只提示对不上的部分。",
      "ex.2a": "电商订单需要手动录入 ERP。",
      "ex.2b": "订单自动进入 ERP，各渠道库存同步更新。",
      "ex.3a": "每周报表要从五个表格里复制粘贴拼出来。",
      "ex.3b": "一个随时更新的看板，不再复制粘贴。",
      "ex.4a": "客户总在等待同样问题的回复。",
      "ex.4b": "常见问题即时回复，团队专心处理真正需要关注的情况。",
      "pr.title": "合作方式",
      "pr.1t": "沟通",
      "pr.1d": "了解流程今天真实的运作方式，而不是手册上写的样子。",
      "pr.2t": "方案",
      "pr.2d": "书面确认范围、周期与费用。必要时，先做原型再写代码。",
      "pr.3t": "开发",
      "pr.3d": "小步快跑，您边用边测，问题在交付前就解决。",
      "pr.4t": "交付与支持",
      "pr.4d": "上线部署、培训团队，并持续跟进。",
      "ct.title": "来跟咱一起刷 aura。",
      "ct.sub": "来吧。说说哪个流程在拖慢您的公司，咱会回复需要了解的问题、初步思路和下一步安排。",
      "ct.name": "姓名",
      "ct.email": "电子邮箱",
      "ct.company": "公司",
      "ct.msg": "您想解决什么问题？",
      "ct.msgPh": "例如：核对发票并录入 ERP",
      "ct.send": "一起刷 aura",
      "ct.sent": "正在打开邮件…",
      "ft.tag": "咱就是写程序的。",
      "ft.top": "返回顶部",
      "dl.home": "首页",
      "dl.services": "服务",
      "dl.unlock": "解锁",
      "dl.works": "作品",
      "dl.examples": "场景",
      "dl.process": "流程",
      "dl.contact": "联系",
    },
  };

  const HTML_LANG = { pt: "pt-BR", zh: "zh-CN" };
  let lang = "pt";
  try {
    const saved = localStorage.getItem("lokp-lang");
    if (saved && I18N[saved]) lang = saved;
    else if ((navigator.language || "").toLowerCase().startsWith("zh")) lang = "zh";
  } catch (_) {}

  const t = (k) => I18N[lang][k];
  const onLangChange = [];

  /* ---------- split text into animated characters ---------- */
  function splitText(el) {
    const text = el.textContent;
    el.setAttribute("aria-label", text);
    el.innerHTML = "";
    let i = 0;
    const isCJK = /[　-鿿＀-￯]/.test(text);
    const words = isCJK ? [text] : text.split(" ");
    words.forEach((word, wi) => {
      const w = document.createElement("span");
      w.className = "w";
      w.setAttribute("aria-hidden", "true");
      for (const c of word) {
        const ch = document.createElement("span");
        ch.className = "ch";
        const inner = document.createElement("span");
        inner.textContent = c;
        inner.style.setProperty("--i", i++);
        ch.appendChild(inner);
        w.appendChild(ch);
      }
      el.appendChild(w);
      if (wi < words.length - 1) el.appendChild(document.createTextNode(" "));
    });
  }

  function applyLang(animate) {
    const dict = I18N[lang];
    document.documentElement.lang = HTML_LANG[lang];
    $$("[data-i18n]").forEach((el) => {
      const v = dict[el.dataset.i18n];
      if (v == null) return;
      el.textContent = v;
      if (el.hasAttribute("data-split")) {
        splitText(el);
        if (animate && el.classList.contains("in")) {
          el.classList.remove("in");
          void el.offsetWidth;
          requestAnimationFrame(() => el.classList.add("in"));
        }
      }
    });
    $$("[data-i18n-ph]").forEach((el) => {
      const v = dict[el.dataset.i18nPh];
      if (v != null) el.placeholder = v;
    });
    onLangChange.forEach((fn) => fn());
    try { localStorage.setItem("lokp-lang", lang); } catch (_) {}
  }

  $("#langToggle").addEventListener("click", () => {
    lang = lang === "pt" ? "zh" : "pt";
    document.documentElement.lang = HTML_LANG[lang]; // knob moves immediately
    document.body.classList.add("lang-out");
    setTimeout(() => {
      applyLang(true);
      document.body.classList.remove("lang-out");
    }, 280);
  });

  /* ---------------------------------------------------------
     Preloader
  --------------------------------------------------------- */
  function runPreloader(done) {
    const pre = $("#preloader");
    const count = $("#preCount");
    if (reduced) { pre.classList.add("gone"); document.body.classList.remove("loading"); done(); return; }
    const start = performance.now();
    const dur = 1500;
    (function step(now) {
      const p = clamp((now - start) / dur);
      count.textContent = String(Math.round(easeOut(p) * 100)).padStart(3, "0");
      if (p < 1) return requestAnimationFrame(step);
      pre.classList.add("unlocked");
      setTimeout(() => {
        pre.classList.add("done");
        document.body.classList.remove("loading");
        done();
        setTimeout(() => pre.classList.add("gone"), 1200);
      }, 600);
    })(start);
  }

  /* ---------------------------------------------------------
     Magnetic buttons (subtle)
  --------------------------------------------------------- */
  if (finePointer && !reduced) {
    $$(".magnetic").forEach((btn) => {
      const inner = btn.firstElementChild;
      btn.addEventListener("pointermove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`;
        if (inner) inner.style.transform = `translate(${x * 0.08}px, ${y * 0.12}px)`;
      });
      btn.addEventListener("pointerleave", () => {
        btn.style.transition = "transform .7s cubic-bezier(.34,1.56,.64,1)";
        btn.style.transform = "";
        if (inner) inner.style.transform = "";
        setTimeout(() => (btn.style.transition = ""), 700);
      });
    });
  }

  /* ---------------------------------------------------------
     Screenshots: local file first, live capture as fallback
  --------------------------------------------------------- */
  function loadShot(src, live, cb) {
    const img = new Image();
    img.onload = () => cb(img.src);
    img.onerror = () => live && cb(`https://s.wordpress.com/mshots/v1/${encodeURIComponent(live)}?w=1440&h=900`);
    img.src = src;
  }

  /* ---------------------------------------------------------
     Unlock page: lock opens across its three sub-steps
  --------------------------------------------------------- */
  const unlockScene = (() => {
    const shackle = $("#bigShackle"), bL = $("#bigL"), bR = $("#bigR"), ring = $("#ringFg");
    const phases = $$("#unlock .phase"), dots = $$("#unlock .phase-dots i");
    const RING = 2 * Math.PI * 92;
    const easeInOut = (v) => (v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2);
    ring.style.strokeDasharray = RING;
    let p = 0, raf = 0;

    function draw(v) {
      const lift = clamp((v - 0.2) / 0.45), swing = clamp((v - 0.55) / 0.3);
      shackle.setAttribute("transform", `translate(0 ${-easeOut(lift) * 48}) rotate(${-easeOut(swing) * 32} 27 132)`);
      const split = easeOut(clamp((v - 0.6) / 0.3)) * 10;
      bL.setAttribute("transform", `translate(${-split} ${split * 0.4})`);
      bR.setAttribute("transform", `translate(${split} ${-split * 0.2})`);
      ring.style.strokeDashoffset = RING * (1 - Math.max(v, 0.04));
    }
    draw(0);

    return function to(step) {
      phases.forEach((el, i) => { el.classList.toggle("leaving", i < step); el.classList.toggle("active", i === step); });
      dots.forEach((d, i) => d.classList.toggle("on", i === step));
      const from = p, target = step / 2, t0 = performance.now(), dur = reduced ? 1 : 1100;
      cancelAnimationFrame(raf);
      (function tick(now) {
        const k = clamp((now - t0) / dur);
        p = from + (target - from) * easeInOut(k);
        draw(p);
        if (k < 1) raf = requestAnimationFrame(tick);
      })(t0);
    };
  })();

  /* ---------------------------------------------------------
     Deck: pages slide sideways, the dial turns between them
     and crossfades the stage background
  --------------------------------------------------------- */
  const deck = (() => {
    const track = $("#track"), pages = $$(".page", track), stage = $("#stageBg");
    const dial = $("#dial"), rotor = $("#dialRotor"), prevBtn = $("#prevBtn"), nextBtn = $("#nextBtn");
    const navLinks = $$(".nav-links a");
    const N = pages.length, STEP = 360 / N, NS = "http://www.w3.org/2000/svg";
    const pad = (v) => String(v).padStart(2, "0");
    const list = (p, k) => (p.dataset[k] || "").split(",");
    const at = (arr, s) => arr[Math.min(s, arr.length - 1)];
    const stepsOf = (p) => +(p.dataset.steps || 1);
    const svg = (tag, attrs) => {
      const el = document.createElementNS(NS, tag);
      for (const k in attrs) el.setAttribute(k, attrs[k]);
      return el;
    };
    let idx = 0, sub = 0, busy = false, started = false;
    let dragStart = null, dragMoved = false;

    // one background layer per distinct data-bg key
    const layers = {};
    pages.forEach((p) => list(p, "bg").forEach((key) => {
      if (!key || layers[key]) return;
      const d = document.createElement("div");
      d.className = "bg-layer";
      if (key.startsWith("shot:")) {
        const [src, live] = key.slice(5).split("|");
        d.classList.add("bg-shot");
        loadShot(src, live, (u) => d.style.setProperty("--shot", `url("${u}")`));
      } else d.classList.add(`bg-${key}`);
      stage.appendChild(d);
      layers[key] = d;
    }));
    $$("[data-shot]").forEach((el) => loadShot(el.dataset.shot, el.dataset.live, (u) => (el.style.backgroundImage = `url("${u}")`)));

    // dial: fine ticks + one labelled notch per page, laid out from 12 o'clock.
    // Side wheel (tablet/desktop): the active notch turns to 9 o'clock, at the right screen edge,
    // and labels are pre-rotated 90deg so they read horizontally there.
    // Bottom wheel (phones): the active notch stays at 12 o'clock, labels upright.
    const bottomMQ = matchMedia("(max-width: 560px)");
    const rotation = (i) => (bottomMQ.matches ? 0 : -90) - i * STEP;
    for (let a = 0; a < 360; a += 4) rotor.appendChild(svg("line", { x1: 180, y1: 4, x2: 180, y2: 10, class: "dial-tick", transform: `rotate(${a} 180 180)` }));
    const notches = pages.map((p, i) => {
      const g = svg("g", { class: "dial-notch", transform: `rotate(${i * STEP} 180 180)` });
      g.appendChild(svg("rect", { x: 168, y: 0, width: 24, height: 96 }));
      g.appendChild(svg("line", { x1: 180, y1: 4, x2: 180, y2: 18 }));
      g.appendChild(svg("text", { x: 180 }));
      g.addEventListener("click", () => { if (!dragMoved) go(i); });
      rotor.appendChild(g);
      return g;
    });
    const labelDial = () => notches.forEach((g, i) => (g.lastChild.textContent = t(pages[i].dataset.label) || pad(i + 1)));
    const orientDial = () => notches.forEach((g) => {
      const text = g.lastChild;
      if (bottomMQ.matches) { text.setAttribute("y", 32); text.removeAttribute("transform"); }
      else { text.setAttribute("y", 26); text.setAttribute("transform", "rotate(90 180 26)"); }
    });
    orientDial();
    bottomMQ.addEventListener("change", () => { orientDial(); render(); });
    onLangChange.push(labelDial);
    $("#dialTotal").textContent = pad(N);

    // stagger reveals inside each page
    pages.forEach((p) => $$(".reveal", p).forEach((el, i) => el.style.setProperty("--rd", `${120 + i * 70}ms`)));
    const animated = (p) => $$(".reveal, [data-split], .step, .hero-mark", p);

    function render() {
      track.style.setProperty("--i", idx);
      pages.forEach((p, i) => {
        const s = i < idx ? stepsOf(p) - 1 : i > idx ? 0 : sub;
        p.classList.toggle("is-dark", at(list(p, "theme"), s) === "dark");
        p.classList.toggle("active", i === idx);
        p.inert = i !== idx;
      });
      const p = pages[idx];
      const bgKey = at(list(p, "bg"), sub);
      for (const k in layers) layers[k].classList.toggle("on", k === bgKey);
      document.body.classList.toggle("theme-dark", at(list(p, "theme"), sub) === "dark");
      rotor.style.transform = `rotate(${rotation(idx)}deg)`;
      notches.forEach((g, i) => g.classList.toggle("on", i === idx));
      $("#dialNum").textContent = pad(idx + 1);
      prevBtn.disabled = idx === 0 && sub === 0;
      nextBtn.disabled = idx === N - 1;
      const navKey = p.dataset.nav || p.id;
      navLinks.forEach((a) => a.classList.toggle("active", a.hash === `#${navKey}`));
      if (p.id === "unlock") unlockScene(sub);
      if (started) animated(p).forEach((el) => el.classList.add("in"));
      try { history.replaceState(null, "", `#${p.id}`); } catch (_) {}
    }

    function lock(ms) { busy = true; clearTimeout(lock.t); lock.t = setTimeout(() => (busy = false), ms); }

    function go(i, s = 0) {
      i = Math.max(0, Math.min(N - 1, i));
      if (i === idx && s === sub) return render();
      const old = pages[idx];
      idx = i; sub = s;
      lock(950);
      pages[idx].scrollTop = 0;
      render();
      // replay animations next time the old page comes back
      if (old !== pages[idx]) setTimeout(() => { if (old !== pages[idx]) animated(old).forEach((el) => el.classList.remove("in")); }, 1000);
    }
    function next() {
      if (sub < stepsOf(pages[idx]) - 1) { sub++; lock(750); render(); }
      else if (idx < N - 1) go(idx + 1, 0);
    }
    function prev() {
      if (sub > 0) { sub--; lock(750); render(); }
      else if (idx > 0) go(idx - 1, stepsOf(pages[idx - 1]) - 1);
    }

    // a page with more content than the screen scrolls natively first
    const canScroll = (el, dir) => (dir > 0 ? el.scrollTop + el.clientHeight < el.scrollHeight - 2 : el.scrollTop > 2);

    // wheel: one page per gesture (ignore trackpad inertia tails)
    let lastWheel = 0;
    addEventListener("wheel", (e) => {
      if (document.body.classList.contains("loading")) return e.preventDefault();
      const vertical = Math.abs(e.deltaY) >= Math.abs(e.deltaX);
      const d = vertical ? e.deltaY : e.deltaX;
      if (vertical && canScroll(pages[idx], Math.sign(d))) return;
      e.preventDefault();
      const now = performance.now(), gap = now - lastWheel;
      lastWheel = now;
      if (busy || gap < 160 || Math.abs(d) < 4) return;
      d > 0 ? next() : prev();
    }, { passive: false });

    addEventListener("keydown", (e) => {
      if (e.target.closest("input, textarea")) return;
      if (["ArrowDown", "ArrowUp"].includes(e.key) && canScroll(pages[idx], e.key === "ArrowDown" ? 1 : -1)) return;
      if (e.key === " " && e.target.closest("button, a")) return;
      const fwd = ["ArrowRight", "ArrowDown", "PageDown", " "].includes(e.key);
      const back = ["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key);
      if (e.key === "Home") { e.preventDefault(); go(0); }
      else if (e.key === "End") { e.preventDefault(); go(N - 1); }
      else if (fwd || back) { e.preventDefault(); if (!busy) fwd ? next() : prev(); }
    });

    // touch: horizontal swipe pages; vertical swipe pages once the page can't scroll further
    let tx = null, ty = 0, atTop = false, atBottom = false;
    addEventListener("touchstart", (e) => {
      if (e.target.closest(".dial")) return;
      tx = e.touches[0].clientX; ty = e.touches[0].clientY;
      atTop = !canScroll(pages[idx], -1); atBottom = !canScroll(pages[idx], 1);
    }, { passive: true });
    addEventListener("touchend", (e) => {
      if (tx == null) return;
      const dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
      tx = null;
      if (busy) return;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.2) dx < 0 ? next() : prev();
      else if (dy < -70 && atBottom) next();
      else if (dy > 70 && atTop) prev();
    }, { passive: true });

    // dial: drag it up/down to spin, release snaps to the nearest page
    // side wheel: dragging down brings the next page; bottom wheel: dragging left does
    const DRAG = 0.3; // degrees per pixel
    const dragDelta = (e) => (bottomMQ.matches ? dragStart.x - e.clientX : e.clientY - dragStart.y);
    dial.addEventListener("pointerdown", (e) => { dragStart = { x: e.clientX, y: e.clientY }; dragMoved = false; });
    addEventListener("pointermove", (e) => {
      if (!dragStart) return;
      const d = dragDelta(e);
      if (!dragMoved && Math.abs(d) > 6) { dragMoved = true; dial.classList.add("dragging"); }
      if (dragMoved) rotor.style.transform = `rotate(${rotation(idx) - d * DRAG}deg)`;
    });
    addEventListener("pointerup", (e) => {
      if (!dragStart) return;
      const d = dragDelta(e);
      dragStart = null;
      dial.classList.remove("dragging");
      if (dragMoved) go(idx + Math.round((d * DRAG) / STEP));
      setTimeout(() => (dragMoved = false), 0);
    });

    prevBtn.addEventListener("click", prev);
    nextBtn.addEventListener("click", next);

    // in-page anchors jump to their page
    document.addEventListener("click", (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const i = pages.findIndex((p) => p.id === a.hash.slice(1));
      if (i < 0) return;
      e.preventDefault();
      go(i);
    });

    // keep the slide aligned while resizing
    addEventListener("resize", () => {
      track.style.transition = "none";
      render();
      requestAnimationFrame(() => (track.style.transition = ""));
    });

    return {
      init() {
        idx = Math.max(0, pages.findIndex((p) => `#${p.id}` === location.hash));
        labelDial();
        render();
      },
      start() { started = true; render(); },
    };
  })();

  /* ---------------------------------------------------------
     Contact form → mailto
  --------------------------------------------------------- */
  function contactForm() {
    const form = $("#contactForm");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const d = new FormData(form);
      const subject = `[lokp] ${d.get("company") || d.get("name")}`;
      const body = `${d.get("message")}\n\n${d.get("name")}\n${d.get("email")}\n${d.get("company") || ""}`;
      const label = $(".btn span", form);
      form.classList.add("sent");
      label.textContent = t("ct.sent");
      location.href = `mailto:contato@lokptech.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setTimeout(() => { form.classList.remove("sent"); label.textContent = t("ct.send"); }, 3500);
    });
  }

  /* ---------------------------------------------------------
     Boot
  --------------------------------------------------------- */
  $("#year").textContent = new Date().getFullYear();
  applyLang(false);
  contactForm();
  deck.init();
  runPreloader(() => deck.start());
})();
