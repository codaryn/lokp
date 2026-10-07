/* =========================================================
   lokp — interactions & animations (vanilla JS, no deps)
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
      "nav.services": "Serviços",
      "nav.examples": "Exemplos",
      "nav.process": "Como trabalhamos",
      "nav.cta": "Contato",
      "hero.kicker": "Software sob demanda e automação",
      "hero.t1": "Menos planilha.",
      "hero.t2": "Menos retrabalho.",
      "hero.t3": "Destrave sua operação.",
      "hero.about": "A lokp desenvolve sistemas sob medida e automações para empresas que cresceram mais rápido que as próprias ferramentas.",
      "hero.cta": "Conversar sobre um projeto",
      "hero.cta2": "Ver serviços",
      "hero.note": "Atendimento em português e chinês.",
      "sv.title": "O que fazemos",
      "sv.lead": "Projetos pequenos ou grandes, sempre escritos para o seu processo, não adaptados de um pacote pronto.",
      "sv.1t": "Software sob medida",
      "sv.1d": "Sistemas internos, portais e aplicativos feitos para o jeito que a sua empresa trabalha.",
      "sv.2t": "Automação de processos",
      "sv.2d": "Robôs para o trabalho repetitivo: conferir, copiar, lançar, enviar. Rodando todo dia, no horário certo.",
      "sv.3t": "Integrações",
      "sv.3d": "ERP, CRM, e-commerce, banco e planilhas trocando dados sem ninguém no meio.",
      "sv.4t": "IA aplicada",
      "sv.4d": "Leitura de documentos, triagem de e-mails e atendimento, com revisão humana onde for necessário.",
      "sv.5t": "Painéis e relatórios",
      "sv.5d": "Os números que você já tem, organizados para decidir rápido.",
      "sv.6t": "Suporte contínuo",
      "sv.6d": "Manutenção, ajustes e melhorias depois da entrega. O sistema acompanha a empresa.",
      "ul.1t": "Antes",
      "ul.1d": "Planilhas manuais, retrabalho, sistemas que não conversam e uma equipe presa em tarefas repetitivas.",
      "ul.2t": "Durante",
      "ul.2d": "Mapeamos cada etapa, cortamos o que não precisa existir e automatizamos o resto.",
      "ul.3t": "Depois",
      "ul.3d": "O processo roda sozinho, os dados batem e a equipe volta a cuidar do negócio.",
      "ex.title": "Problemas comuns",
      "ex.lead": "Situações que aparecem em quase toda operação. Se alguma parece familiar, é por aí que a conversa começa.",
      "ex.before": "Hoje",
      "ex.after": "Com automação",
      "ex.1a": "Duas pessoas passam o fim do mês conferindo notas fiscais contra pedidos.",
      "ex.1b": "Um robô cruza tudo diariamente e só aponta o que não bate.",
      "ex.2a": "Pedidos do e-commerce digitados à mão no ERP.",
      "ex.2b": "O pedido entra no ERP sozinho e o estoque se atualiza em todos os canais.",
      "ex.3a": "Relatório semanal montado copiando dados de cinco planilhas.",
      "ex.3b": "Um painel sempre atualizado, sem copiar e colar.",
      "ex.4a": "Clientes esperando resposta para as mesmas perguntas de sempre.",
      "ex.4b": "O básico é respondido na hora; a equipe fica com os casos que exigem atenção.",
      "pr.title": "Como trabalhamos",
      "pr.1t": "Conversa",
      "pr.1d": "Entendemos o processo como ele acontece hoje, não como está no manual.",
      "pr.2t": "Proposta",
      "pr.2d": "Escopo, prazo e custo por escrito. Quando faz sentido, um protótipo antes do código.",
      "pr.3t": "Desenvolvimento",
      "pr.3d": "Entregas curtas. Você testa no caminho e ajustamos antes do fim, não depois.",
      "pr.4t": "Entrega e suporte",
      "pr.4d": "Colocamos no ar, treinamos a equipe e seguimos acompanhando.",
      "ct.title": "Qual processo está travando a sua empresa?",
      "ct.sub": "Escreva com as suas palavras. Respondemos com perguntas, uma ideia de caminho e os próximos passos.",
      "ct.name": "Nome",
      "ct.email": "E-mail",
      "ct.company": "Empresa",
      "ct.msg": "O que você quer resolver?",
      "ct.msgPh": "Ex.: conferir notas fiscais e lançar no ERP",
      "ct.send": "Enviar",
      "ct.sent": "Abrindo seu e-mail…",
      "ft.top": "Voltar ao topo",
    },
    zh: {
      "nav.services": "服务",
      "nav.examples": "案例场景",
      "nav.process": "合作方式",
      "nav.cta": "联系",
      "hero.kicker": "定制软件与流程自动化",
      "hero.t1": "告别手工表格。",
      "hero.t2": "告别重复返工。",
      "hero.t3": "解锁您的运营。",
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
      "ct.title": "哪个流程正在拖慢您的公司？",
      "ct.sub": "用您自己的话描述就好。我们会回复需要了解的问题、初步思路和下一步安排。",
      "ct.name": "姓名",
      "ct.email": "电子邮箱",
      "ct.company": "公司",
      "ct.msg": "您想解决什么问题？",
      "ct.msgPh": "例如：核对发票并录入 ERP",
      "ct.send": "发送",
      "ct.sent": "正在打开邮件…",
      "ft.top": "返回顶部",
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
    document.body.classList.add("loading");
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
     Reveal on scroll
  --------------------------------------------------------- */
  function reveals() {
    $$(".svc-list, .ex-list, .hero-foot").forEach((g) =>
      $$(".reveal", g).forEach((el, i) => el.style.setProperty("--rd", `${i * 80}ms`))
    );
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        io.unobserve(e.target);
      });
    }, { threshold: 0.2, rootMargin: "0px 0px -6% 0px" });
    $$(".reveal, .rule, [data-split]:not(.hero-title .line)").forEach((el) => io.observe(el));
  }

  /* ---------------------------------------------------------
     Scroll-driven: nav, hero padlock, unlock scene, process
  --------------------------------------------------------- */
  function scrollScenes() {
    const nav = $("#nav");
    const hero = $("#hero"), heroShackle = $("#heroShackle");
    const unlock = $("#unlock"), sticky = $(".unlock-sticky");
    const shackle = $("#bigShackle"), bL = $("#bigL"), bR = $("#bigR");
    const ringFg = $("#ringFg");
    const phases = $$(".phase"), dots = $$(".phase-dots i");
    const stepsWrap = $("#steps"), steps = $$(".step");
    const links = $$(".nav-links a");
    const sections = links.map((a) => $(a.getAttribute("href")));
    const RING = 2 * Math.PI * 92;
    let lastY = scrollY, curPhase = -1, ticking = false;

    function update() {
      ticking = false;
      const y = scrollY, vh = innerHeight;

      nav.classList.toggle("scrolled", y > 30);
      nav.classList.toggle("hidden", y > lastY && y > 400);
      lastY = y;

      // hero padlock opens as the hero scrolls away
      const hp = clamp(y / (hero.offsetHeight * 0.7));
      heroShackle.setAttribute("transform", `translate(0 ${-easeOut(hp) * 46}) rotate(${-easeOut(clamp(hp * 1.6 - 0.6)) * 26} 27 132)`);

      // unlock scene
      const ur = unlock.getBoundingClientRect();
      const p = ur.height > vh ? clamp(-ur.top / (ur.height - vh)) : 0;
      sticky.style.setProperty("--p", p.toFixed(3));
      const lift = clamp((p - 0.2) / 0.45);
      const swing = clamp((p - 0.55) / 0.3);
      shackle.setAttribute("transform", `translate(0 ${-easeOut(lift) * 48}) rotate(${-easeOut(swing) * 32} 27 132)`);
      const split = easeOut(clamp((p - 0.6) / 0.3)) * 10;
      bL.setAttribute("transform", `translate(${-split} ${split * 0.4})`);
      bR.setAttribute("transform", `translate(${split} ${-split * 0.2})`);
      ringFg.style.strokeDasharray = RING;
      ringFg.style.strokeDashoffset = RING * (1 - p);
      sticky.classList.toggle("light", p > 0.62);
      const ph = Math.min(2, Math.floor(p * 3.001));
      if (ph !== curPhase) {
        phases.forEach((el, i) => {
          el.classList.toggle("leaving", i < ph);
          el.classList.toggle("active", i === ph);
        });
        dots.forEach((d, i) => d.classList.toggle("on", i === ph));
        curPhase = ph;
      }

      // process: each step's line fills in sequence
      const sr = stepsWrap.getBoundingClientRect();
      const tp = clamp((vh * 0.85 - sr.top) / (vh * 0.55));
      steps.forEach((s, i) => {
        const f = clamp(tp * steps.length - i);
        s.style.setProperty("--f", f.toFixed(3));
        s.classList.toggle("on", f > 0.05);
      });

      // active nav link
      let active = -1;
      sections.forEach((s, i) => { if (s && s.getBoundingClientRect().top < vh * 0.4) active = i; });
      links.forEach((a, i) => a.classList.toggle("active", i === active));
    }
    addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    addEventListener("resize", update);
    update();
  }

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
  scrollScenes();

  runPreloader(() => {
    $$(".hero-title .line").forEach((el, i) => {
      el.style.setProperty("--d", `${i * 140}ms`);
      el.classList.add("in");
    });
    $(".hero-mark").classList.add("in");
    setTimeout(reveals, 500);
  });
})();
