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
      "nav.cta": "Fale conosco",
      "sv.title": "Nossas soluções",
      "sv.lead": "Projetos de qualquer porte, desenvolvidos de acordo com os processos da sua empresa, sem pacotes genéricos.",
      "sv.1t": "Software sob medida",
      "sv.1d": "Sistemas internos, portais e aplicativos alinhados à forma como sua empresa opera.",
      "sv.2t": "Automação de processos",
      "sv.2d": "Robôs para tarefas repetitivas, como conferência, lançamento e envio de dados, com execução diária e confiável.",
      "sv.3t": "Integração de sistemas",
      "sv.3d": "ERP, CRM, e-commerce, bancos e planilhas compartilhando dados automaticamente, sem intervenção manual.",
      "sv.4t": "Inteligência artificial",
      "sv.4d": "Leitura de documentos, triagem de e-mails e atendimento ao cliente, com validação humana nas etapas críticas.",
      "sv.5t": "Dashboards e relatórios",
      "sv.5d": "Seus dados organizados em indicadores claros, para decisões mais rápidas e assertivas.",
      "sv.6t": "Suporte contínuo",
      "sv.6d": "Manutenção, ajustes e evolução após a entrega, acompanhando o crescimento da sua empresa.",
      "wk.title": "Projetos",
      "wk.lead": "Soluções já entregues pela lokp. Novos projetos em desenvolvimento.",
      "wk.1d": "E-commerce de automação comercial e informática, com catálogo de produtos, carrinho e orçamento via WhatsApp. Projeto entregue e em operação.",
      "wk.visit": "Acessar site",
      "wk.soon": "Em breve",
      "wk.soonD": "Projeto em desenvolvimento. O próximo pode ser o da sua empresa.",
      "wk.soonCta": "Fale conosco",
      "ex.title": "Casos de uso",
      "ex.lead": "Desafios comuns à maioria das empresas. Se algum deles faz parte da sua rotina, este é o ponto de partida.",
      "ex.before": "Hoje",
      "ex.after": "Com a lokp",
      "ex.1a": "Dois colaboradores dedicam o fechamento do mês à conferência de notas fiscais e pedidos.",
      "ex.1b": "Um robô realiza a conciliação diariamente e sinaliza apenas as divergências.",
      "ex.2a": "Pedidos do e-commerce lançados manualmente no ERP.",
      "ex.2b": "Pedidos integrados automaticamente ao ERP, com estoque sincronizado em todos os canais.",
      "ex.3a": "Relatórios semanais consolidados manualmente a partir de cinco planilhas.",
      "ex.3b": "Um dashboard sempre atualizado, sem trabalho manual.",
      "ex.4a": "Clientes aguardando retorno para as mesmas dúvidas recorrentes.",
      "ex.4b": "Dúvidas frequentes respondidas instantaneamente; a equipe se dedica aos casos que exigem atenção.",
      "pr.title": "Nossa metodologia",
      "pr.1t": "Diagnóstico",
      "pr.1d": "Entendemos como o processo funciona na prática, e não apenas como está documentado.",
      "pr.2t": "Proposta",
      "pr.2d": "Escopo, prazo e investimento formalizados. Quando necessário, validamos a solução com um protótipo antes do desenvolvimento.",
      "pr.3t": "Desenvolvimento",
      "pr.3d": "Entregas incrementais: você valida ao longo do projeto e os ajustes acontecem antes da conclusão.",
      "pr.4t": "Implantação e suporte",
      "pr.4d": "Colocamos a solução em produção, capacitamos sua equipe e seguimos oferecendo suporte.",
      "ct.title": "Vamos conversar sobre o seu projeto.",
      "ct.sub": "Conte-nos qual processo está limitando sua empresa. Retornaremos com as perguntas necessárias, uma proposta inicial de abordagem e os próximos passos.",
      "ct.name": "Nome",
      "ct.email": "E-mail",
      "ct.company": "Empresa",
      "ct.msg": "Como podemos ajudar?",
      "ct.msgPh": "Ex.: conferir nota fiscal e lançar no ERP",
      "ct.send": "Enviar mensagem",
      "ct.sent": "Abrindo seu e-mail…",
      "ft.tag": "Software sob medida e automação.",
      "ft.top": "Voltar ao topo",
      "dl.home": "Início",
      "hero.scroll": "Role para explorar",
      "hero.tag": "Software sob medida, automação e integração de sistemas para a sua empresa.",
      "hero.cta": "Fale conosco",
      "hero.more": "Conheça nossas soluções",
      "dl.services": "Soluções",
      "dl.works": "Projetos",
      "dl.examples": "Casos",
      "dl.process": "Processo",
      "dl.contact": "Contato",
    },
    zh: {
      "nav.cta": "联系",
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
      "wk.title": "作品",
      "wk.lead": "lokp 已交付的项目，更多项目正在开发中。",
      "wk.1d": "商业自动化与电脑设备电商平台，包含产品目录、购物车与 WhatsApp 询价功能。项目已交付并稳定运行。",
      "wk.visit": "访问网站",
      "wk.soon": "敬请期待",
      "wk.soonD": "项目开发中。下一个或许就是贵公司的项目。",
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
      "ct.title": "聊聊您的项目。",
      "ct.sub": "请告诉我们哪个流程正在制约贵公司的发展。我们将回复需要了解的问题、初步方案思路与后续安排。",
      "ct.name": "姓名",
      "ct.email": "电子邮箱",
      "ct.company": "公司",
      "ct.msg": "您想解决什么问题？",
      "ct.msgPh": "例如：核对发票并录入 ERP",
      "ct.send": "发送消息",
      "ct.sent": "正在打开邮件…",
      "ft.tag": "定制软件与流程自动化。",
      "ft.top": "返回顶部",
      "dl.home": "首页",
      "hero.scroll": "向下滑动",
      "hero.tag": "为您的企业提供定制软件、流程自动化与系统集成。",
      "hero.cta": "联系我们",
      "hero.more": "了解我们的服务",
      "dl.services": "服务",
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
    // only play the intro once per visit; returning to the page goes straight in
    let seen = false;
    try { seen = sessionStorage.getItem("lokp-intro") === "1"; sessionStorage.setItem("lokp-intro", "1"); } catch (_) {}
    if (reduced || seen) { pre.classList.add("gone"); document.body.classList.remove("loading"); done(); return; }
    const start = performance.now();
    const dur = 900;
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
      }, 350);
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
     Deck: one continuous position drives everything. The track,
     the dial and the background all follow it frame by frame;
     input moves a target and the position glides after it.
  --------------------------------------------------------- */
  const deck = (() => {
    const track = $("#track"), pages = $$(".page", track), stage = $("#stageBg");
    const inners = pages.map((p) => $(".page-inner", p));
    const dial = $("#dial"), rotor = $("#dialRotor"), prevBtn = $("#prevBtn"), nextBtn = $("#nextBtn");
    const N = pages.length, STEP = 360 / N, NS = "http://www.w3.org/2000/svg";
    const pad = (v) => String(v).padStart(2, "0");
    const svg = (tag, attrs) => {
      const el = document.createElementNS(NS, tag);
      for (const k in attrs) el.setAttribute(k, attrs[k]);
      return el;
    };
    const clampPos = (v) => clamp(v, 0, N - 1);

    let pos = 0, target = 0, idx = -1, raf = 0, last = 0, started = false;
    let holding = false; // finger / dial drag: position tracks input 1:1
    const shown = pages.map(() => false);

    // one background layer per distinct data-bg key
    const layers = {};
    pages.forEach((p) => {
      const key = p.dataset.bg;
      p.classList.toggle("is-dark", p.dataset.theme === "dark");
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
    });
    $$("[data-shot]").forEach((el) => loadShot(el.dataset.shot, el.dataset.live, (u) => (el.style.backgroundImage = `url("${u}")`)));

    // dial: fine ticks + one labelled notch per page, laid out from 12 o'clock.
    // Side wheel (tablet/desktop): the active notch turns to 9 o'clock, at the right screen edge,
    // and labels are pre-rotated 90deg so they read horizontally there.
    // Bottom wheel (phones): the active notch stays at 12 o'clock, labels upright.
    const bottomMQ = matchMedia("(max-width: 560px)");
    const rotation = (v) => (bottomMQ.matches ? 0 : -90) - v * STEP;
    for (let a = 0; a < 360; a += 4) rotor.appendChild(svg("line", { x1: 180, y1: 4, x2: 180, y2: 10, class: "dial-tick", transform: `rotate(${a} 180 180)` }));
    let dialDragged = false;
    const notches = pages.map((p, i) => {
      const g = svg("g", { class: "dial-notch", transform: `rotate(${i * STEP} 180 180)` });
      g.appendChild(svg("rect", { x: 168, y: 0, width: 24, height: 96 }));
      g.appendChild(svg("line", { x1: 180, y1: 4, x2: 180, y2: 18 }));
      g.appendChild(svg("text", { x: 180 }));
      g.addEventListener("click", () => { if (!dialDragged) go(i); });
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
    bottomMQ.addEventListener("change", () => { orientDial(); paint(); });
    onLangChange.push(labelDial);
    $("#dialTotal").textContent = pad(N);

    // stagger reveals inside each page
    pages.forEach((p) => $$(".reveal", p).forEach((el, i) => el.style.setProperty("--rd", `${120 + i * 70}ms`)));
    const animated = (p) => $$(".reveal, [data-split], .step, .hero-mark", p);

    /* ---------- painting ---------- */
    function paint() {
      track.style.transform = `translate3d(${-pos * 100}%, 0, 0)`;
      rotor.style.transform = `rotate(${rotation(pos)}deg)`;

      const weight = {};
      pages.forEach((p, i) => {
        const d = i - pos, a = Math.min(Math.abs(d), 1);
        // content lags slightly behind its page and eases in as it centres
        if (a < 1) {
          inners[i].style.transform = `translate3d(${-d * 28}%, 0, 0) scale(${1 - a * 0.06})`;
          inners[i].style.opacity = 1 - a * 0.85;
          weight[p.dataset.bg] = (weight[p.dataset.bg] || 0) + (1 - a);
        }
        // entrance animations start as the page slides in, and replay next visit
        if (started && !shown[i] && a < 0.6) { shown[i] = true; animated(p).forEach((el) => el.classList.add("in")); }
        if (shown[i] && a >= 1) { shown[i] = false; p.scrollTop = 0; animated(p).forEach((el) => el.classList.remove("in")); }
      });
      for (const k in layers) layers[k].style.opacity = Math.min(weight[k] || 0, 1);

      const near = Math.round(pos);
      if (near !== idx) {
        idx = near;
        const p = pages[idx];
        pages.forEach((q, i) => { q.classList.toggle("active", i === idx); q.inert = i !== idx; });
        notches.forEach((g, i) => g.classList.toggle("on", i === idx));
        document.body.classList.toggle("theme-dark", p.dataset.theme === "dark");
        $("#dialNum").textContent = pad(idx + 1);
        try { history.replaceState(null, "", `#${p.id}`); } catch (_) {}
      }
      prevBtn.disabled = target <= 0;
      nextBtn.disabled = target >= N - 1;
    }

    function frame(now) {
      const dt = Math.min(now - last, 64);
      last = now;
      // frame-rate independent exponential glide
      const k = holding || reduced ? 1 : 1 - Math.pow(0.9, dt / 16.67);
      pos += (target - pos) * k;
      if (Math.abs(target - pos) < 0.0005) pos = target;
      paint();
      raf = pos !== target ? requestAnimationFrame(frame) : 0;
    }
    function kick() {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }

    function setTarget(v) { target = clampPos(v); kick(); }
    function go(i) { gesture = null; setTarget(Math.round(i)); }
    const next = () => go(Math.round(target) + 1);
    const prev = () => go(Math.round(target) - 1);

    // a page with more content than the screen scrolls natively first
    const canScroll = (el, dir) => (dir > 0 ? el.scrollTop + el.clientHeight < el.scrollHeight - 2 : el.scrollTop > 2);

    /* ---------- continuous gestures ----------
       A gesture starts on a page (base), drags the deck up to one page
       either way, and on release settles on the page it leaned towards. */
    let gesture = null, snapT = 0;
    function lean(offset) {
      return gesture.base + (Math.abs(offset) > 0.12 ? Math.sign(offset) : 0);
    }
    function release(velocity = 0) {
      if (!gesture) return;
      const offset = target - gesture.base;
      const dest = Math.abs(velocity) > 0.0006 ? gesture.base + Math.sign(velocity) : lean(offset);
      gesture = null;
      holding = false;
      setTarget(dest);
    }

    // wheel / trackpad: the deck follows the scroll, then glides to the nearest page
    addEventListener("wheel", (e) => {
      if (document.body.classList.contains("loading")) return e.preventDefault();
      const vertical = Math.abs(e.deltaY) >= Math.abs(e.deltaX);
      let d = vertical ? e.deltaY : e.deltaX;
      if (e.deltaMode === 1) d *= 16; else if (e.deltaMode === 2) d *= innerHeight;
      if (!gesture && vertical && canScroll(pages[Math.round(target)], Math.sign(d))) return;
      e.preventDefault();
      if (!gesture) gesture = { base: Math.round(target) };
      const step = clamp(d / Math.max(innerHeight, 600), -0.35, 0.35);
      setTarget(clamp(target + step, gesture.base - 1, gesture.base + 1));
      clearTimeout(snapT);
      snapT = setTimeout(() => release(), 160);
    }, { passive: false });

    addEventListener("keydown", (e) => {
      if (e.target.closest("input, textarea")) return;
      if (["ArrowDown", "ArrowUp"].includes(e.key) && canScroll(pages[idx], e.key === "ArrowDown" ? 1 : -1)) return;
      if (e.key === " " && e.target.closest("button, a")) return;
      const fwd = ["ArrowRight", "ArrowDown", "PageDown", " "].includes(e.key);
      const back = ["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key);
      if (e.key === "Home") { e.preventDefault(); go(0); }
      else if (e.key === "End") { e.preventDefault(); go(N - 1); }
      else if (fwd || back) { e.preventDefault(); fwd ? next() : prev(); }
    });

    // hero scroll cue: click advances like a scroll
    document.getElementById("scrollCue")?.addEventListener("click", next);

    // touch: horizontal swipes drag the deck under the finger;
    // vertical swipes turn the page once the page can't scroll further
    let touch = null;
    addEventListener("touchstart", (e) => {
      if (e.target.closest(".dial")) return;
      const p = e.touches[0];
      touch = { x: p.clientX, y: p.clientY, t: performance.now(), axis: null,
        atTop: !canScroll(pages[idx], -1), atBottom: !canScroll(pages[idx], 1) };
    }, { passive: true });
    addEventListener("touchmove", (e) => {
      if (!touch) return;
      const p = e.touches[0], dx = p.clientX - touch.x, dy = p.clientY - touch.y;
      if (!touch.axis && Math.hypot(dx, dy) > 8) touch.axis = Math.abs(dx) > Math.abs(dy) * 1.2 ? "x" : "y";
      if (touch.axis !== "x") return;
      if (!gesture) { gesture = { base: Math.round(target) }; holding = true; }
      setTarget(clamp(gesture.base - dx / innerWidth, gesture.base - 1, gesture.base + 1));
    }, { passive: true });
    addEventListener("touchend", (e) => {
      if (!touch) return;
      const p = e.changedTouches[0], dx = p.clientX - touch.x, dy = p.clientY - touch.y;
      const { axis, atTop, atBottom } = touch, dt = Math.max(performance.now() - touch.t, 1);
      touch = null;
      if (axis === "x") release(-dx / innerWidth / dt * (dt < 300 ? 1 : 0));
      else if (dy < -70 && atBottom) next();
      else if (dy > 70 && atTop) prev();
    }, { passive: true });
    addEventListener("touchcancel", () => { touch = null; release(); }, { passive: true });

    // dial: drag it to spin the deck, release settles on the nearest page
    // side wheel: dragging down brings the next page; bottom wheel: dragging left does
    const DRAG = 0.3; // degrees per pixel
    let dialStart = null;
    const dialDelta = (e) => (bottomMQ.matches ? dialStart.x - e.clientX : e.clientY - dialStart.y);
    dial.addEventListener("pointerdown", (e) => { dialStart = { x: e.clientX, y: e.clientY, base: target }; dialDragged = false; });
    addEventListener("pointermove", (e) => {
      if (!dialStart) return;
      const d = dialDelta(e);
      if (!dialDragged && Math.abs(d) > 6) { dialDragged = true; dial.classList.add("dragging"); holding = true; gesture = null; }
      if (dialDragged) setTarget(dialStart.base + (d * DRAG) / STEP);
    });
    addEventListener("pointerup", () => {
      if (!dialStart) return;
      dialStart = null;
      dial.classList.remove("dragging");
      if (dialDragged) { holding = false; go(target); }
      setTimeout(() => (dialDragged = false), 0);
    });

    prevBtn.addEventListener("click", prev);
    nextBtn.addEventListener("click", next);

    // in-page anchors glide to their page
    document.addEventListener("click", (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const i = pages.findIndex((p) => p.id === a.hash.slice(1));
      if (i < 0) return;
      e.preventDefault();
      go(i);
    });

    addEventListener("resize", paint);

    return {
      init() {
        pos = target = Math.max(0, pages.findIndex((p) => `#${p.id}` === location.hash));
        labelDial();
        paint();
      },
      start() { started = true; paint(); },
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
      location.href = `mailto:lokptech@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
