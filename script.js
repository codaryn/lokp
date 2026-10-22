/* =========================================================
   lokp: i18n, menu, scroll spy, reveals, contact form
   Vanilla JS, no deps. The page works fully without it.
   ========================================================= */
(() => {
  "use strict";

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const EMAIL = "lokptech@outlook.com";

  /* ---------------------------------------------------------
     i18n
  --------------------------------------------------------- */
  const I18N = {
    pt: {
      "meta.title": "lokp · Software sob medida, automação e integração de sistemas",
      "meta.desc": "lokp: software sob medida, automação de processos e integração de sistemas para empresas. Atendimento em português e chinês.",
      "skip": "Pular para o conteúdo",
      "top.note": "Atendimento em português e chinês",
      "lang.label": "Idioma",
      "brand.home": "lokp, página inicial",
      "menu.open": "Menu",
      "menu.close": "Fechar",
      "nav.label": "Principal",
      "nav.solutions": "Soluções",
      "nav.cases": "Casos de uso",
      "nav.works": "Projetos",
      "nav.process": "Metodologia",
      "nav.contact": "Contato",
      "nav.cta": "Solicitar proposta",
      "newTab": "(abre em nova aba)",

      "hero.eyebrow": "Software · Automação · Integração",
      "hero.title": "Tecnologia sob medida para a operação da sua empresa.",
      "hero.tag": "Software sob medida, automação de processos e integração de sistemas, do diagnóstico ao suporte contínuo.",
      "hero.cta": "Solicitar proposta",
      "hero.more": "Conheça as soluções",
      "hero.alt": "Imagem ilustrativa: edifício de vidro escuro visto de baixo, com a marca LOKP no alto da fachada.",
      "hero.note": "Imagem ilustrativa",

      "hl.label": "Diferenciais",
      "hl.1t": "Projetos sob medida",
      "hl.1d": "Desenvolvidos a partir dos seus processos, sem pacotes genéricos.",
      "hl.2t": "Atendimento bilíngue",
      "hl.2d": "Comunicação em português e chinês em todas as etapas.",
      "hl.3t": "Entregas incrementais",
      "hl.3d": "Você valida cada etapa antes da conclusão do projeto.",
      "hl.4t": "Suporte contínuo",
      "hl.4d": "Manutenção e evolução após a implantação.",

      "sv.eyebrow": "Soluções",
      "sv.title": "Nossas soluções",
      "sv.lead": "Projetos desenvolvidos de acordo com os processos da sua empresa, sem pacotes genéricos.",
      "sv.1t": "Software sob medida",
      "sv.1d": "Sistemas internos, portais e aplicativos alinhados à forma como sua empresa opera.",
      "sv.2t": "Automação de processos",
      "sv.2d": "Robôs para tarefas repetitivas, como conferência, lançamento e envio de dados, executados nos horários programados.",
      "sv.3t": "Integração de sistemas",
      "sv.3d": "ERP, CRM, e-commerce, bancos e planilhas compartilhando dados automaticamente, com menos trabalho manual.",
      "sv.4t": "Inteligência artificial",
      "sv.4d": "Leitura de documentos, triagem de e-mails e atendimento ao cliente, com validação humana nas etapas críticas.",
      "sv.5t": "Dashboards e relatórios",
      "sv.5d": "Seus dados organizados em indicadores claros, para apoiar as decisões da sua empresa.",
      "sv.6t": "Suporte contínuo",
      "sv.6d": "Manutenção, ajustes e evolução após a entrega, acompanhando o crescimento da sua empresa.",

      "ex.eyebrow": "Casos de uso",
      "ex.title": "Desafios que resolvemos",
      "ex.lead": "Desafios comuns à maioria das empresas. Se algum deles faz parte da sua rotina, este é o ponto de partida.",
      "ex.before": "Hoje",
      "ex.after": "Com a lokp",
      "ex.1a": "Dois colaboradores dedicam o fechamento do mês à conferência de notas fiscais e pedidos.",
      "ex.1b": "Um robô realiza a conciliação diariamente e sinaliza apenas as divergências.",
      "ex.2a": "Pedidos do e-commerce lançados manualmente no ERP.",
      "ex.2b": "Pedidos integrados automaticamente ao ERP, com estoque sincronizado em todos os canais.",
      "ex.3a": "Relatórios semanais consolidados manualmente a partir de cinco planilhas.",
      "ex.3b": "Um dashboard atualizado automaticamente.",
      "ex.4a": "Clientes aguardando retorno para as mesmas dúvidas recorrentes.",
      "ex.4b": "Dúvidas frequentes respondidas automaticamente; a equipe se dedica aos casos que exigem atenção.",
      "ex.note": "Exemplos ilustrativos. O resultado de cada projeto depende do processo, dos sistemas envolvidos e do escopo contratado.",

      "wk.eyebrow": "Projetos",
      "wk.title": "Projetos entregues",
      "wk.lead": "Soluções já entregues pela lokp. Novos projetos em desenvolvimento.",
      "wk.status": "Em operação",
      "wk.shotAlt": "Página inicial do site infotekbrasil.com",
      "wk.1d": "E-commerce de automação comercial e informática, com catálogo de produtos, carrinho e orçamento via WhatsApp. Projeto entregue e em operação.",
      "wk.visit": "Acessar infotekbrasil.com",
      "wk.soonBadge": "Em desenvolvimento",
      "wk.soon": "Em breve",
      "wk.soonD": "Projeto em desenvolvimento. O próximo pode ser o da sua empresa.",
      "wk.soonCta": "Fale conosco",

      "pr.eyebrow": "Metodologia",
      "pr.title": "Nossa metodologia",
      "pr.1t": "Diagnóstico",
      "pr.1d": "Entendemos como o processo funciona na prática, e não apenas como está documentado.",
      "pr.2t": "Proposta",
      "pr.2d": "Escopo, prazo e investimento formalizados. Quando necessário, validamos a solução com um protótipo antes do desenvolvimento.",
      "pr.3t": "Desenvolvimento",
      "pr.3d": "Entregas incrementais: você valida ao longo do projeto e os ajustes acontecem antes da conclusão.",
      "pr.4t": "Implantação e suporte",
      "pr.4d": "Colocamos a solução em produção, capacitamos sua equipe e seguimos oferecendo suporte, conforme o contratado.",

      "ct.eyebrow": "Contato",
      "ct.title": "Vamos conversar sobre o seu projeto.",
      "ct.sub": "Conte-nos qual processo está limitando sua empresa. Retornaremos com as perguntas necessárias, uma proposta inicial de abordagem e os próximos passos.",
      "ct.langs": "Idiomas de atendimento",
      "ct.langsV": "Português e chinês",
      "ct.req": "Campos obrigatórios",
      "ct.name": "Nome",
      "ct.email": "E-mail",
      "ct.company": "Empresa",
      "ct.msg": "Como podemos ajudar?",
      "ct.msgPh": "Ex.: conferir nota fiscal e lançar no ERP.",
      "ct.send": "Enviar mensagem",
      "ct.errName": "Informe seu nome.",
      "ct.errEmail": "Informe um e-mail válido, por exemplo nome@empresa.com.",
      "ct.errMsg": "Descreva brevemente como podemos ajudar.",
      "ct.errSummary": "Não foi possível enviar. Revise os campos destacados.",
      "ct.phone": "Telefone",
      "ct.company2": "Lokptech Sistemas e Tecnologia",
      "ct.consent": "Li a Política de Privacidade e concordo com o uso destes dados para a lokp responder ao meu contato.",
      "ct.consentLink": "Ler a Política de Privacidade",
      "ct.errConsent": "Para enviar, marque que leu a Política de Privacidade.",
      "ct.sent": "Abrindo seu aplicativo de e-mail com a mensagem pronta. Se nada abrir, escreva para " + EMAIL + ".",

      "ft.tag": "Software sob medida, automação e integração de sistemas.",
      "ft.solutions": "Soluções",
      "ft.company": "Empresa",
      "ft.contact": "Contato",
      "ft.rights": "Todos os direitos reservados.",
      "ft.top": "Voltar ao topo",
      "ft.legal": "Legal",
      "ft.privacy": "Política de Privacidade",
      "ft.terms": "Termos de Uso",
      "ft.cookies": "Política de Cookies",
      "ft.refund": "Cancelamento e reembolso",
    },
    zh: {
      "meta.title": "lokp · 定制软件、流程自动化与系统集成",
      "meta.desc": "lokp：为企业提供定制软件、流程自动化与系统集成服务。提供葡萄牙语与中文服务。",
      "skip": "跳到主要内容",
      "top.note": "提供葡萄牙语与中文服务",
      "lang.label": "语言",
      "brand.home": "lokp，返回首页",
      "menu.open": "菜单",
      "menu.close": "关闭",
      "nav.label": "主导航",
      "nav.solutions": "解决方案",
      "nav.cases": "应用场景",
      "nav.works": "项目案例",
      "nav.process": "合作流程",
      "nav.contact": "联系我们",
      "nav.cta": "获取方案",
      "newTab": "（在新标签页打开）",

      "hero.eyebrow": "定制软件 · 流程自动化 · 系统集成",
      "hero.title": "为企业运营量身打造的技术方案。",
      "hero.tag": "从需求诊断到持续支持，提供定制软件、流程自动化与系统集成服务。",
      "hero.cta": "获取方案",
      "hero.more": "了解解决方案",
      "hero.alt": "示意图：仰视的深色玻璃大楼，外立面顶部是 LOKP 标志。",
      "hero.note": "示意图",

      "hl.label": "我们的优势",
      "hl.1t": "量身定制",
      "hl.1d": "根据您的业务流程开发，不套用通用软件包。",
      "hl.2t": "双语服务",
      "hl.2d": "全程提供葡萄牙语与中文沟通。",
      "hl.3t": "分阶段交付",
      "hl.3d": "每个阶段都由您确认后再继续。",
      "hl.4t": "持续支持",
      "hl.4d": "上线后提供维护与持续优化。",

      "sv.eyebrow": "解决方案",
      "sv.title": "我们的解决方案",
      "sv.lead": "按照您的业务流程开发，而不是套用现成的软件包。",
      "sv.1t": "定制软件",
      "sv.1d": "内部系统、门户网站与应用程序，按照您公司的工作方式打造。",
      "sv.2t": "流程自动化",
      "sv.2d": "让机器人处理重复工作：核对、录入、发送数据，按计划时间运行。",
      "sv.3t": "系统集成",
      "sv.3d": "ERP、CRM、电商平台、银行与表格之间自动交换数据，减少人工操作。",
      "sv.4t": "人工智能",
      "sv.4d": "文档识别、邮件分拣与客户服务，在关键环节保留人工审核。",
      "sv.5t": "数据看板与报表",
      "sv.5d": "把您的数据整理成清晰的指标，为企业决策提供支持。",
      "sv.6t": "持续支持",
      "sv.6d": "交付后的维护、调整与优化，让系统跟着企业一起成长。",

      "ex.eyebrow": "应用场景",
      "ex.title": "我们解决的问题",
      "ex.lead": "这些情况几乎在每家企业都会出现。如果您觉得眼熟，我们就从这里开始。",
      "ex.before": "现在",
      "ex.after": "使用 lokp 之后",
      "ex.1a": "每到月底，两名员工要花大量时间逐一核对发票与订单。",
      "ex.1b": "机器人每天自动比对，只提示不一致的部分。",
      "ex.2a": "电商订单需要手动录入 ERP。",
      "ex.2b": "订单自动进入 ERP，各渠道库存同步更新。",
      "ex.3a": "每周报表要从五个表格里手动汇总。",
      "ex.3b": "一个自动更新的数据看板。",
      "ex.4a": "客户总在等待同样问题的回复。",
      "ex.4b": "常见问题自动回复，团队专注处理真正需要关注的情况。",
      "ex.note": "以上为示例。每个项目的效果取决于具体流程、所涉及的系统以及合同约定的范围。",

      "wk.eyebrow": "项目案例",
      "wk.title": "已交付项目",
      "wk.lead": "lokp 已交付的项目，更多项目正在开发中。",
      "wk.status": "运行中",
      "wk.shotAlt": "infotekbrasil.com 网站首页",
      "wk.1d": "商业自动化与电脑设备电商平台，包含产品目录、购物车与 WhatsApp 询价功能。项目已交付并稳定运行。",
      "wk.visit": "访问 infotekbrasil.com",
      "wk.soonBadge": "开发中",
      "wk.soon": "敬请期待",
      "wk.soonD": "项目开发中。下一个或许就是贵公司的项目。",
      "wk.soonCta": "联系我们",

      "pr.eyebrow": "合作流程",
      "pr.title": "我们的工作方法",
      "pr.1t": "需求诊断",
      "pr.1d": "了解流程在实际中如何运作，而不只是文档上写的样子。",
      "pr.2t": "方案确认",
      "pr.2d": "书面确认范围、周期与费用。必要时，先用原型验证方案再开始开发。",
      "pr.3t": "开发",
      "pr.3d": "分阶段交付：您在过程中随时验证，问题在完成前就得到调整。",
      "pr.4t": "上线与支持",
      "pr.4d": "部署上线、培训团队，并按合同约定持续提供支持。",

      "ct.eyebrow": "联系我们",
      "ct.title": "聊聊您的项目。",
      "ct.sub": "请告诉我们哪个流程正在制约贵公司的发展。我们将回复需要了解的问题、初步方案思路与后续安排。",
      "ct.langs": "服务语言",
      "ct.langsV": "葡萄牙语、中文",
      "ct.req": "为必填项",
      "ct.name": "姓名",
      "ct.email": "电子邮箱",
      "ct.company": "公司",
      "ct.msg": "您想解决什么问题？",
      "ct.msgPh": "例如：核对发票并录入 ERP。",
      "ct.send": "发送消息",
      "ct.errName": "请填写您的姓名。",
      "ct.errEmail": "请填写有效的电子邮箱，例如 name@company.com。",
      "ct.errMsg": "请简要描述您的需求。",
      "ct.errSummary": "无法发送，请检查标出的字段。",
      "ct.phone": "电话",
      "ct.company2": "Lokptech Sistemas e Tecnologia",
      "ct.consent": "我已阅读隐私政策，并同意 lokp 使用这些信息回复我的咨询。",
      "ct.consentLink": "阅读隐私政策（葡萄牙语）",
      "ct.errConsent": "发送前，请勾选已阅读隐私政策。",
      "ct.sent": "正在打开您的邮件应用，内容已填好。如果没有打开，请发送邮件至 " + EMAIL + "。",

      "ft.tag": "定制软件、流程自动化与系统集成。",
      "ft.solutions": "解决方案",
      "ft.company": "公司",
      "ft.contact": "联系方式",
      "ft.rights": "版权所有。",
      "ft.top": "返回顶部",
      "ft.legal": "法律信息",
      "ft.privacy": "隐私政策",
      "ft.terms": "使用条款",
      "ft.cookies": "Cookie 政策",
      "ft.refund": "取消与退款",
    },
  };

  const HTML_LANG = { pt: "pt-BR", zh: "zh-CN" };
  let lang = "pt";
  try {
    const saved = localStorage.getItem("lokp-lang");
    if (saved && I18N[saved]) lang = saved;
    else if ((navigator.language || "").toLowerCase().startsWith("zh")) lang = "zh";
  } catch (_) {}
  const t = (k) => I18N[lang][k] ?? I18N.pt[k] ?? "";

  function applyLang() {
    const dict = I18N[lang];
    document.documentElement.lang = HTML_LANG[lang];
    document.title = dict["meta.title"];
    $('meta[name="description"]').setAttribute("content", dict["meta.desc"]);
    $$("[data-i18n]").forEach((el) => { const v = dict[el.dataset.i18n]; if (v != null) el.textContent = v; });
    $$("[data-i18n-alt]").forEach((el) => { const v = dict[el.dataset.i18nAlt]; if (v != null) el.alt = v; });
    $$("[data-i18n-aria]").forEach((el) => { const v = dict[el.dataset.i18nAria]; if (v != null) el.setAttribute("aria-label", v); });
    $$(".lang-btn").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
    // visible error messages follow the language too
    $$(".field-error").forEach((el) => { if (el.textContent) el.textContent = t(el.dataset.err); });
    syncMenuLabel();
    try { localStorage.setItem("lokp-lang", lang); } catch (_) {}
  }

  $$(".lang-btn").forEach((b) => b.addEventListener("click", () => {
    if (b.dataset.lang === lang) return;
    lang = b.dataset.lang;
    applyLang();
  }));

  /* ---------------------------------------------------------
     Mobile menu
  --------------------------------------------------------- */
  const header = $("#header");
  const toggle = $("#menuToggle");
  const menu = $("#menu");
  const isOpen = () => toggle.getAttribute("aria-expanded") === "true";
  function syncMenuLabel() { $(".menu-label", toggle).textContent = t(isOpen() ? "menu.close" : "menu.open"); }
  function setMenu(open, { focusToggle = false } = {}) {
    toggle.setAttribute("aria-expanded", String(open));
    menu.classList.toggle("open", open);
    syncMenuLabel();
    if (open) $("a", menu).focus();
    else if (focusToggle) toggle.focus();
  }
  toggle.addEventListener("click", () => setMenu(!isOpen()));
  menu.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) setMenu(false, { focusToggle: true });
  });
  document.addEventListener("click", (e) => {
    if (isOpen() && !header.contains(e.target)) setMenu(false);
  });
  matchMedia("(min-width: 1081px)").addEventListener("change", (e) => { if (e.matches) setMenu(false); });

  /* ---------------------------------------------------------
     Header shadow + scroll spy (aria-current on the nav)
  --------------------------------------------------------- */
  const onScroll = () => header.classList.toggle("scrolled", scrollY > 8);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const navLinks = $$(".nav-list a");
  const sections = navLinks.map((a) => $(a.hash)).filter(Boolean);
  if ("IntersectionObserver" in window) {
    const visible = new Map();
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => visible.set(en.target.id, en.isIntersecting));
      const current = sections.find((s) => visible.get(s.id));
      navLinks.forEach((a) => {
        if (current && a.hash === `#${current.id}`) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => spy.observe(s));
  }

  // moving focus with in-page links keeps keyboard and screen-reader users in place
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || a.hash.length < 2) return;
    const target = $(a.hash);
    if (!target) return;
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    requestAnimationFrame(() => target.focus({ preventScroll: true }));
  });

  /* ---------------------------------------------------------
     Reveal on scroll (CSS ignores it under reduced motion)
  --------------------------------------------------------- */
  const reveals = $$(".reveal");
  if (!reduced && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add("in");
        io.unobserve(en.target);
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    reveals.forEach((el) => {
      const siblings = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
      el.style.setProperty("--rd", `${siblings.indexOf(el) * 80}ms`);
      io.observe(el);
    });
  } else reveals.forEach((el) => el.classList.add("in"));

  /* ---------------------------------------------------------
     Contact form: accessible validation, then mailto
  --------------------------------------------------------- */
  const form = $("#contactForm");
  const status = $("#formStatus");
  const fields = [
    { el: $("#f-name"), err: $("#e-name"), ok: (v) => v.trim().length > 0 },
    { el: $("#f-email"), err: $("#e-email"), ok: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) },
    { el: $("#f-msg"), err: $("#e-msg"), ok: (v) => v.trim().length > 0 },
    { el: $("#f-consent"), err: $("#e-consent"), ok: () => $("#f-consent").checked },
  ];
  const check = (f) => {
    const valid = f.ok(f.el.value);
    f.el.setAttribute("aria-invalid", String(!valid));
    f.err.textContent = valid ? "" : t(f.err.dataset.err);
    return valid;
  };
  fields.forEach((f) => {
    if (f.el.type === "checkbox") { f.el.addEventListener("change", () => check(f)); return; }
    f.el.addEventListener("blur", () => { if (f.el.value || f.el.hasAttribute("aria-invalid")) check(f); });
    f.el.addEventListener("input", () => { if (f.el.getAttribute("aria-invalid") === "true") check(f); });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const invalid = fields.filter((f) => !check(f));
    if (invalid.length) {
      status.textContent = t("ct.errSummary");
      invalid[0].el.focus();
      return;
    }
    const d = new FormData(form);
    const subject = `[lokp] ${d.get("company") || d.get("name")}`;
    const body = `${d.get("message")}\n\n${d.get("name")}\n${d.get("email")}\n${d.get("company") || ""}`;
    status.textContent = t("ct.sent");
    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

  /* ---------------------------------------------------------
     Boot
  --------------------------------------------------------- */
  $("#year").textContent = new Date().getFullYear();
  applyLang();
})();
