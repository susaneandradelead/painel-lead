import { useState, useEffect } from "react";

// ─── CONFIGURAÇÃO ────────────────────────────────────────────────
const GOOGLE_SCRIPT_URL = ""; // Insira a URL do Google Apps Script aqui
const APP_VERSION = "1.0.0";
// Grafia oficial: Jiu Jitsu (sem hífen)

// ─── TOKENS VISUAIS ──────────────────────────────────────────────
const GOLD = "#B8963E";
const GOLD_LIGHT = "#F5EDD6";
const CHARCOAL = "#2C2C2C";
const MUTED = "#6B6B6B";
const BORDER = "#E8E4DC";
const BG = "#FAFAF8";
const WHITE = "#FFFFFF";

// ─── DADOS DO SISTEMA DE FAIXAS ──────────────────────────────────
const FAIXAS = [
  {
    id: "branca", nome: "Faixa Branca LEAD", subtitulo: "O início da jornada com método.",
    cor: "#FFFFFF", objetivo: "Sair do achismo.",
    fraseCard: "Antes de ajustar, o professor LEAD aprende a enxergar.",
    mensagemDesbloqueio: "Você iniciou a sua jornada de clareza pedagógica.\n\nO primeiro passo do professor LEAD é sair do achismo e começar a conduzir com método.",
    campoRelato: "O que o primeiro diagnóstico revelou sobre a sua turma?",
    checklist: [
      { id: "diag", label: "Diagnóstico mensal preenchido", auto: true },
      { id: "ind", label: "Indicadores principais preenchidos", auto: true },
      { id: "qual", label: "Indicadores qualitativos preenchidos", auto: true },
      { id: "comp", label: "Evolução comportamental preenchida", auto: true },
      { id: "plano", label: "Plano de ação do mês preenchido", auto: true },
    ],
    temEvidencia: false, temRelato: true, temPilares: false, temCasoEvolucao: false,
  },
  {
    id: "azul", nome: "Faixa Azul LEAD", subtitulo: "Da intenção ao primeiro padrão de aplicação.",
    cor: "#0F62D6", objetivo: "Transformar diagnóstico em primeira aplicação prática.",
    fraseCard: "Você começou a construir uma cultura de tatame com método.",
    mensagemDesbloqueio: "Você começou a transformar intenção em hábito.\n\nAs regras do tatame são o primeiro passo para construir segurança, previsibilidade e cultura dentro da aula infantil.",
    campoRelato: "Como as crianças responderam à implementação das 3 regras do tatame?",
    checklist: [
      { id: "paineis2", label: "2 painéis mensais preenchidos", auto: true },
      { id: "curso50", label: "50% do curso assistido" },
      { id: "regras3", label: "3 regras do tatame implementadas" },
      { id: "evidAzul", label: "Evidência simples registrada" },
      { id: "relatoAzul", label: "Relato enviado na Comunidade ou salvo no app" },
    ],
    temEvidencia: true, temRelato: true, temPilares: false, temCasoEvolucao: false,
    tiposEvidencia: ["Registrei vídeo simples", "Compartilhei relato na comunidade", "Tenho print/foto/vídeo privado", "Ainda vou registrar"],
  },
  {
    id: "roxa", nome: "Faixa Roxa LEAD", subtitulo: "Aplicação visível e posicionamento em construção.",
    cor: "#8A1FC2", objetivo: "Transformar aplicação em autoridade percebida.",
    fraseCard: "Você começou a transformar método em autoridade percebida.",
    mensagemDesbloqueio: "Você entrou em uma nova etapa de aplicação.\n\nA autoridade do professor LEAD nasce quando o método deixa de ser conteúdo e começa a aparecer na condução da turma, na comunicação com os pais e no posicionamento profissional.",
    // Jiu Jitsu sem hífen
    campoRelato: "O que mudou na percepção dos alunos, pais ou academia depois dessa implementação?",
    checklist: [
      { id: "paineis4", label: "4 painéis mensais preenchidos", auto: true },
      { id: "curso75", label: "75% do curso assistido" },
      { id: "pilarRoxa", label: "Pelo menos 1 pilar de autoridade implementado" },
      { id: "relatoRoxa", label: "Relato registrado na Comunidade ou no app" },
    ],
    temEvidencia: true, temRelato: true, temPilares: true,
    pilares: ["Divisão de turmas por idade", "Desafio de graus comportamentais com os responsáveis", "Post de posicionamento no Instagram"],
    tiposEvidencia: ["Link do post", "Print do desafio", "Relato na Comunidade LEAD", "Ajuste de turma registrado", "Outra evidência"],
    temCasoEvolucao: false,
  },
  {
    id: "marrom", nome: "Faixa Marrom LEAD", subtitulo: "Estrutura, comunicação e refinamento pedagógico.",
    cor: "#8C4A1E", objetivo: "Transformar aplicação em estrutura.",
    fraseCard: "Você transformou aplicação em estrutura.",
    mensagemDesbloqueio: "Você alcançou um novo nível de maturidade pedagógica.\n\nAgora, o método já não aparece apenas em ações isoladas. Ele começa a se tornar estrutura, rotina e percepção de valor para as famílias.",
    campoRelato: "Qual foi a maior mudança percebida depois que você começou a estruturar a operação Baby Class com mais método?",
    checklist: [
      { id: "paineis8", label: "8 painéis mensais preenchidos", auto: true },
      { id: "curso95", label: "95% do curso assistido" },
      { id: "divisaoIdade", label: "Divisão de turmas por idade implementada" },
      { id: "feedbackPais", label: "Rotina de feedback aos pais implementada" },
      { id: "casoEvolucao", label: "1 caso de evolução documentado" },
              { id: "postInsta", label: "Post de posicionamento no Instagram realizado" },
      { id: "relatoMarrom", label: "Relato registrado na Comunidade ou no app" },
    ],
    temEvidencia: true, temRelato: true, temPilares: false, temCasoEvolucao: true,
    tiposEvidencia: ["Relato escrito", "Print de feedback aos pais", "Link do post", "Registro de evolução", "Evidência compartilhada na Comunidade LEAD"],
  },
  {
    id: "preta", nome: "Faixa Preta LEAD", subtitulo: "Excelência, autoridade e legado em construção.",
    cor: "#1C1C1C", objetivo: "Transformar estrutura em autoridade.",
    fraseCard: "Você sustenta método, autoridade e legado.",
    mensagemDesbloqueio: "Você alcançou um novo patamar dentro da Comunidade LEAD.\n\nA Faixa Preta LEAD representa excelência em acompanhamento, aplicação, comunicação e posicionamento de alto valor no Jiu Jitsu infantil.",
            campoRelato: "Como o Método LEAD transformou a sua forma de conduzir, comunicar e posicionar o Jiu Jitsu infantil?",
    checklist: [
      { id: "paineisMensal", label: "Painel de Bordo preenchido mensalmente com consistência", auto: true },
      { id: "certificado", label: "Certificado do curso emitido" },
      { id: "turmaIdadePreta", label: "Turma organizada por idade" },
      { id: "metodoContinuo", label: "Método aplicado de forma contínua" },
      { id: "comPaisPreta", label: "Comunicação com pais implementada" },
      { id: "reuniaoPais", label: "Reunião ou alinhamento com responsáveis realizado" },
      { id: "dossie", label: "Dossiê de venda na recepção ou atendimento" },
      { id: "planoCaptacao", label: "Plano de captação ativo" },
      { id: "indicadoresPreta", label: "Indicadores acompanhados" },
      { id: "casoSucesso", label: "Caso de sucesso validado" },
      { id: "validacaoLEAD", label: "Validação final pela equipe LEAD" },
    ],
    temEvidencia: true, temRelato: true, temPilares: false, temCasoEvolucao: true,
    tiposEvidencia: ["Relato escrito", "Print de feedback aos pais", "Link do post", "Dossiê de venda", "Plano de captação", "Reunião com responsáveis", "Caso de sucesso"],
  },
];

const MESES_PARA_FAIXA = { branca: 1, azul: 2, roxa: 4, marrom: 8, preta: 12 };

const QUALITATIVE_OPTIONS = {
  participacaoPais: [
    { label: "Baixa participação", desc: "Os pais quase não interagem, não respondem mensagens e parecem pouco conectados à proposta da aula." },
    { label: "Participação moderada", desc: "Os pais acompanham, mas ainda precisam entender melhor o valor pedagógico do Baby Class." },
    { label: "Alta participação", desc: "Os pais respondem, elogiam, enviam vídeos, perguntam sobre evolução e demonstram confiança no trabalho." },
  ],
  satisfacaoTurma: [
    { label: "Baixa satisfação", desc: "Muitas crianças choram, resistem para entrar, se desconectam rapidamente ou demonstram pouca vontade de retornar." },
    { label: "Satisfação moderada", desc: "A turma participa, mas ainda há oscilação de foco, resistência ou dificuldade em manter engajamento." },
    { label: "Alta satisfação", desc: "As crianças entram com alegria, participam, demonstram vínculo com o professor e saem querendo voltar." },
  ],
  organizacaoAula: [
    { label: "Aula improvisada", desc: "A aula muda conforme o comportamento da turma e não possui estrutura clara." },
    { label: "Aula parcialmente organizada", desc: "Existe uma ideia central, mas ainda faltam microblocos, transições e objetivo definido." },
    { label: "Aula estruturada", desc: "A aula possui objetivo, sequência, comandos claros, reforço positivo e fechamento." },
  ],
  reforcoPosi: [
    { label: "Pouco usado", desc: "O professor corrige mais do que reforça." },
    { label: "Usado às vezes", desc: "O professor elogia, mas ainda sem estratégia clara." },
    { label: "Usado com intenção", desc: "O professor reforça comportamentos específicos e usa o elogio como ferramenta de condução." },
  ],
  posicionamento: [
    { label: "Baixo posicionamento", desc: "A aula ainda é comunicada como recreação, gasto de energia ou 'aula para criança pequena'." },
    { label: "Posicionamento em construção", desc: "O professor já fala sobre desenvolvimento, mas ainda precisa comunicar com mais clareza e frequência." },
    { label: "Posicionamento premium", desc: "A turma é apresentada como uma experiência de desenvolvimento motor, cognitivo, afetivo e social através do Jiu-Jitsu." },
  ],
};

const COMPORTAMENTOS = [
  "Espera a vez com mais facilidade","Obedece comandos simples","Participa melhor das atividades",
  "Demonstra mais coragem","Chora menos na entrada","Aceita melhor os limites",
  "Interage melhor com outras crianças","Permanece mais tempo na proposta",
  "Demonstra mais autonomia","Responde melhor ao reforço positivo",
];

const PRIORIDADES = [
  "Melhorar retenção","Captar novos alunos","Organizar melhor a aula",
  "Melhorar comunicação com os pais","Separar melhor as faixas etárias",
  "Aumentar valor percebido","Fortalecer reforço positivo",
  "Melhorar adaptação das crianças","Criar nova turma Baby Class",
];

const MESES = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];

const TIPOS_EVIDENCIA_GERAL = ["Relato escrito","Print","Vídeo","Link do Instagram","Feedback dos pais","Caso de evolução","Ajuste de turma","Desafio comportamental","Dossiê de venda","Plano de captação","Reunião com responsáveis"];

// ─── STORAGE ─────────────────────────────────────────────────────
const ls = {
  get: (k) => { try { return JSON.parse(localStorage.getItem(k) || "null"); } catch { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};
const loadHistory = () => ls.get("lead_historia") || [];
const saveToHistory = (entry) => {
  const h = loadHistory();
  const e = { ...entry, id: Date.now() };
  h.unshift(e);
  ls.set("lead_historia", h);
  return h;
};
const deleteFromHistory = (id) => {
  const h = loadHistory().filter(e => e.id !== id);
  ls.set("lead_historia", h);
  return h;
};
const loadJornada = () => ls.get("lead_jornada") || { checklists: {}, relatos: {}, evidencias: {}, pilares: {}, datasDesbloqueio: {}, casoEvolucao: {} };
const saveJornada = (j) => ls.set("lead_jornada", j);

// ─── LÓGICA DE PROGRESSÃO ────────────────────────────────────────
function calcMesesConsecutivos(history) {
  if (!history.length) return 0;
  const sorted = [...history].sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));
  const seen = new Set();
  let cons = 0;
  let idx = MESES.indexOf(sorted[0].mes);
  let ano = parseInt(sorted[0].ano);
  for (const h of sorted) {
    const key = `${h.mes}-${h.ano}`;
    if (seen.has(key)) continue;
    if (MESES.indexOf(h.mes) === idx && parseInt(h.ano) === ano) {
      seen.add(key);
      cons++;
      idx--; if (idx < 0) { idx = 11; ano--; }
    } else break;
  }
  return cons;
}

function calcFaixaProgress(faixa, mesesCons, jornada, totalPaineis) {
  const checks = jornada.checklists[faixa.id] || {};
  let total = faixa.checklist.length, done = 0;
  faixa.checklist.forEach(item => {
    if (item.auto) {
      const mNec = MESES_PARA_FAIXA[faixa.id];
      if (faixa.id === "branca") { if (totalPaineis >= 1) done++; }
      else if (mesesCons >= mNec) done++;
    } else {
      if (checks[item.id]) done++;
    }
  });
  const pct = Math.round((done / total) * 100);
  const desbloqueada = pct === 100;
  return { pct, done, total, desbloqueada };
}

function getProgressoGeral(history, jornada) {
  const mesesCons = calcMesesConsecutivos(history);
  const totalPaineis = history.length;
  const resultados = FAIXAS.map(f => ({ faixa: f, ...calcFaixaProgress(f, mesesCons, jornada, totalPaineis) }));
  const desbloqueadas = resultados.filter(r => r.desbloqueada);
  const faixaAtualIdx = desbloqueadas.length > 0 ? FAIXAS.indexOf(desbloqueadas[desbloqueadas.length - 1].faixa) : -1;
  const faixaAtual = faixaAtualIdx >= 0 ? FAIXAS[faixaAtualIdx] : null;
  const proximaFaixa = faixaAtualIdx + 1 < FAIXAS.length ? FAIXAS[faixaAtualIdx + 1] : null;
  const proximoResultado = proximaFaixa ? resultados.find(r => r.faixa.id === proximaFaixa.id) : null;
  return { mesesCons, totalPaineis, resultados, faixaAtual, proximaFaixa, proximoResultado };
}

// ─── COMPONENTE: INSÍGNIA SVG ─────────────────────────────────────
function FaixaIcon({ faixa, size = 64, locked = false }) {
  const w = 220, h = 86;
  const gId = `g${faixa.id}${locked ? "l" : "u"}`;
  const sId = `s${faixa.id}${locked ? "l" : "u"}`;
  const glId = `gl${faixa.id}`;
  const isLight = faixa.id === "branca";
  return (
    <svg width={size} height={size * (h / w)} viewBox={`0 0 ${w} ${h}`} style={{ filter: locked ? "saturate(0.35)" : "none", opacity: locked ? 0.7 : 1 }}>
      <defs>
        <linearGradient id={gId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={faixa.cor} stopOpacity="1" />
          <stop offset="55%" stopColor={faixa.cor} stopOpacity="1" />
          <stop offset="100%" stopColor={isLight ? "#E2DDD0" : "#000"} stopOpacity={isLight ? 1 : 0.22} />
        </linearGradient>
        <radialGradient id={glId} cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <filter id={sId} x="-20%" y="-30%" width="140%" height="180%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#000" floodOpacity={locked ? 0.08 : (isLight ? 0.14 : 0.26)} />
        </filter>
      </defs>
      <rect x="8" y="18" width={w-16} height="50" rx="5" fill={`url(#${gId})`} stroke={isLight ? BORDER : "#000"} strokeOpacity={isLight ? 1 : 0.3} strokeWidth={isLight ? 1.2 : 0.9} filter={`url(#${sId})`} />
      <rect x="8" y="18" width={w-16} height="50" rx="5" fill={`url(#${glId})`} />
      <rect x="8" y="18" width={w-16} height="1.4" fill={GOLD} opacity={locked ? 0.25 : 0.45} />
      <rect x="8" y="18" width="18" height="50" rx="5" fill={isLight ? "#EFEAE0" : "#000"} opacity={isLight ? 0.4 : 0.16} />
      <rect x="22" y="18" width="1.8" height="50" fill={GOLD} opacity={locked ? 0.3 : 0.6} />
      <rect x={w-26} y="18" width="18" height="50" rx="5" fill={isLight ? "#EFEAE0" : "#000"} opacity={isLight ? 0.4 : 0.16} />
      <rect x={w-23.8} y="18" width="1.8" height="50" fill={GOLD} opacity={locked ? 0.3 : 0.6} />
      <g transform={`translate(${w/2},41)`}>
        <polygon points="0,-14 13,9 -13,9" fill="none" stroke={GOLD} strokeWidth="2" strokeLinejoin="round" opacity={locked ? 0.45 : 0.95} />
        <circle cx="0" cy="2" r="1.7" fill={GOLD} opacity={locked ? 0.4 : 0.9} />
      </g>
      <text x={w/2} y="60" textAnchor="middle" fontFamily="sans-serif" fontSize="5" letterSpacing="2" fill={GOLD} opacity={locked ? 0.35 : 0.8}>LEAD</text>
      {locked && (
        <g transform={`translate(${w-28},24)`} opacity="0.65">
          <rect x="-5" y="0" width="10" height="8" rx="1.5" fill={WHITE} stroke={MUTED} strokeWidth="1" />
          <path d="M -3 0 L -3 -3 A 3 3 0 0 1 3 -3 L 3 0" fill="none" stroke={MUTED} strokeWidth="1.2" />
        </g>
      )}
    </svg>
  );
}

// ─── UTILITÁRIOS DE ESTILO ────────────────────────────────────────
const s = {
  app: { fontFamily: "'Georgia', serif", background: BG, minHeight: "100vh", color: CHARCOAL },
  wrap: { maxWidth: 720, margin: "0 auto", padding: "0 20px 60px" },
  hdr: { borderBottom: `1px solid ${BORDER}`, padding: "24px 0 20px", marginBottom: 32, textAlign: "center" },
  logo: { fontSize: 11, letterSpacing: 4, color: GOLD, textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: 6 },
  h1: { fontSize: 22, fontWeight: 400, color: CHARCOAL, margin: 0, lineHeight: 1.3 },
  sub: { fontSize: 13, color: MUTED, marginTop: 6, fontFamily: "sans-serif" },
  secTitle: { fontSize: 13, letterSpacing: 3, color: GOLD, textTransform: "uppercase", fontFamily: "sans-serif", fontWeight: 400, marginBottom: 16, paddingBottom: 8, borderBottom: `0.5px solid ${BORDER}` },
  lbl: { fontSize: 12, color: MUTED, fontFamily: "sans-serif", letterSpacing: 1, textTransform: "uppercase", display: "block", marginBottom: 6 },
  inp: { width: "100%", padding: "10px 14px", border: `1px solid ${BORDER}`, borderRadius: 4, fontSize: 15, color: CHARCOAL, background: WHITE, fontFamily: "sans-serif", boxSizing: "border-box", outline: "none" },
  ta: { width: "100%", padding: "10px 14px", border: `1px solid ${BORDER}`, borderRadius: 4, fontSize: 14, color: CHARCOAL, background: WHITE, fontFamily: "sans-serif", boxSizing: "border-box", resize: "vertical", minHeight: 80, outline: "none" },
  r2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  fg: { marginBottom: 18 },
  card: { background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "20px 24px", marginBottom: 16 },
  cardG: { background: GOLD_LIGHT, border: `1px solid ${GOLD}`, borderRadius: 8, padding: "20px 24px", marginBottom: 16 },
  btnP: { background: CHARCOAL, color: WHITE, border: "none", padding: "14px 32px", borderRadius: 4, fontSize: 13, fontFamily: "sans-serif", letterSpacing: 2, textTransform: "uppercase", cursor: "pointer" },
  btnS: { background: "transparent", color: CHARCOAL, border: `1px solid ${BORDER}`, padding: "12px 24px", borderRadius: 4, fontSize: 13, fontFamily: "sans-serif", letterSpacing: 1, cursor: "pointer" },
  btnG: { background: GOLD, color: WHITE, border: "none", padding: "14px 32px", borderRadius: 4, fontSize: 13, fontFamily: "sans-serif", letterSpacing: 2, textTransform: "uppercase", cursor: "pointer" },
  btnRow: { display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 },
  quote: { borderLeft: `2px solid ${GOLD}`, paddingLeft: 16, color: MUTED, fontSize: 13, fontStyle: "italic", fontFamily: "sans-serif", margin: "24px 0", lineHeight: 1.7 },
  mc: { background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "16px 20px", textAlign: "center" },
  mv: { fontSize: 28, fontWeight: 400, color: CHARCOAL, marginBottom: 4 },
  ml: { fontSize: 11, color: MUTED, fontFamily: "sans-serif", letterSpacing: 2, textTransform: "uppercase" },
  zone: (z) => ({ display: "inline-block", padding: "4px 14px", borderRadius: 20, fontSize: 11, fontFamily: "sans-serif", letterSpacing: 2, textTransform: "uppercase", background: z==="atenção"?"#FDECEA":z==="ajuste"?"#FEF9E7":"#EAF7ED", color: z==="atenção"?"#922B21":z==="ajuste"?"#B7770D":"#1E8449" }),
  optCard: (sel) => ({ border: sel ? `1.5px solid ${GOLD}` : `1px solid ${BORDER}`, borderRadius: 8, padding: "14px 18px", cursor: "pointer", background: sel ? GOLD_LIGHT : WHITE, marginBottom: 10 }),
  chkRow: { display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 0", borderBottom: `0.5px solid ${BORDER}`, cursor: "pointer" },
  chkBox: (sel) => ({ width: 18, height: 18, border: sel ? `1.5px solid ${GOLD}` : `1px solid ${BORDER}`, borderRadius: 3, background: sel ? GOLD : "transparent", flexShrink: 0, marginTop: 1, display: "flex", alignItems: "center", justifyContent: "center" }),
  barRow: { display: "flex", alignItems: "center", gap: 12, marginBottom: 10 },
  barLbl: { fontSize: 12, fontFamily: "sans-serif", color: MUTED, width: 160, flexShrink: 0 },
  barTr: { flex: 1, background: BORDER, borderRadius: 2, height: 6, overflow: "hidden" },
  barFl: (pct, clr) => ({ width: `${pct}%`, height: "100%", background: clr || GOLD, borderRadius: 2, transition: "width 0.5s ease" }),
  priv: { background: "#F8F8F6", border: `0.5px solid ${BORDER}`, borderRadius: 4, padding: "12px 16px", fontSize: 12, color: MUTED, fontFamily: "sans-serif", lineHeight: 1.7, marginTop: 16 },
  tab: (a) => ({ padding: "10px 0", fontSize: 10, fontFamily: "sans-serif", letterSpacing: 1, color: a ? GOLD : MUTED, borderBottom: a ? `2px solid ${GOLD}` : "2px solid transparent", cursor: "pointer", background: "none", border: "none", textTransform: "uppercase" }),
  overlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(20,18,12,0.78)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 },
  modal: { background: WHITE, borderRadius: 12, padding: "36px 28px", maxWidth: 480, width: "100%", maxHeight: "90vh", overflowY: "auto" },
};

const Chk = () => <svg width="10" height="8" viewBox="0 0 10 8"><path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const Field = ({ label, children }) => <div style={s.fg}><label style={s.lbl}>{label}</label>{children}</div>;

// ─── APP PRINCIPAL ────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("welcome");
  const [step, setStep] = useState(0);
  const [history, setHistory] = useState(loadHistory());
  const [jornada, setJornada] = useState(loadJornada());
  const [viewHist, setViewHist] = useState(null);
  const [adminTab, setAdminTab] = useState(false);
  const [achievModal, setAchievModal] = useState(null);
  const [sendStatus, setSendStatus] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [copied, setCopied] = useState(false);
  const [evidModal, setEvidModal] = useState(null); // {faixaId}

  const [form, setForm] = useState({
    professor:"",academia:"",cidade:"",turma:"",faixaEtaria:"",
    mes:"",ano:new Date().getFullYear().toString(),
    alunosInicio:"",alunosFinal:"",novosAlunos:"",cancelamentos:"",
    participacaoPais:null,satisfacaoTurma:null,organizacaoAula:null,reforcoPosi:null,posicionamento:null,
    comportamentos:[],
    criancaDestaque:"",evolucaoObservada:"",evolucaoComunicada:"",
    prioridade:"",oQueAjustar:"",porQueAjuste:"",primeiraAcao:"",dataAplicacao:"",comoMedir:"",observacoes:"",
  });

  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const updJ = (newJ) => { setJornada(newJ); saveJornada(newJ); };
  const toggleComp = (item) => setForm(f => ({ ...f, comportamentos: f.comportamentos.includes(item) ? f.comportamentos.filter(c=>c!==item) : [...f.comportamentos, item] }));

  const taxa = (() => { const i = parseInt(form.alunosInicio)||0; if(!i) return null; return Math.round(((i-(parseInt(form.cancelamentos)||0))/i)*100); })();
  const qualScores = ["participacaoPais","satisfacaoTurma","organizacaoAula","reforcoPosi","posicionamento"].map(k=>form[k]!==null?form[k]+1:0).filter(v=>v>0);
  const zone = (() => { const avg=qualScores.length?qualScores.reduce((a,b)=>a+b,0)/qualScores.length:0; const t=taxa!==null?(taxa>=90?3:taxa>=75?2:1):0; const n=(t+avg)/2; return n<1.5?"atenção":n<2.3?"ajuste":"crescimento"; })();

  const progGeral = getProgressoGeral(history, jornada);

  const STEPS = ["Diagnóstico","Indicadores","Qualitativos","Comportamental","Plano de Ação","Relatório","Histórico","Meu Perfil LEAD","Equipe LEAD"];

  const saveMonth = () => {
    const entry = { ...form, taxaRetencao: taxa, zone, savedAt: new Date().toISOString() };
    const h = saveToHistory(entry);
    setHistory(h);
    const pgAntes = getProgressoGeral(history, jornada);
    const pgDepois = getProgressoGeral(h, jornada);
    if (pgDepois.faixaAtual && pgDepois.faixaAtual.id !== (pgAntes.faixaAtual?.id || null)) {
      const datas = { ...(jornada.datasDesbloqueio || {}) };
      if (!datas[pgDepois.faixaAtual.id]) datas[pgDepois.faixaAtual.id] = new Date().toISOString();
      updJ({ ...jornada, datasDesbloqueio: datas });
      setAchievModal(pgDepois.faixaAtual);
    }
  };

  const toggleCheckItem = (faixaId, itemId) => {
    const checks = { ...(jornada.checklists[faixaId] || {}) };
    checks[itemId] = !checks[itemId];
    updJ({ ...jornada, checklists: { ...jornada.checklists, [faixaId]: checks } });
  };

  const togglePilar = (faixaId, pilar) => {
    const p = [...(jornada.pilares[faixaId] || [])];
    const idx = p.indexOf(pilar);
    if (idx >= 0) p.splice(idx, 1); else p.push(pilar);
    updJ({ ...jornada, pilares: { ...jornada.pilares, [faixaId]: p } });
  };

  const sendToLEAD = async () => {
    if (!GOOGLE_SCRIPT_URL) { setSendStatus("no_url"); setShowConfirm(false); return; }
    const entry = { ...form, taxaRetencao: taxa, zone, dataEnvio: new Date().toISOString(), faixaAtual: progGeral.faixaAtual?.nome || "Sem faixa", mesesConsecutivos: progGeral.mesesCons };
    try { await fetch(GOOGLE_SCRIPT_URL, { method: "POST", body: JSON.stringify(entry) }); setSendStatus("success"); }
    catch { setSendStatus("error"); }
    setShowConfirm(false);
  };

  const proximo = progGeral.proximaFaixa;
  const proxPend = proximo ? (() => {
    const r = progGeral.proximoResultado;
    const checks = jornada.checklists[proximo.id] || {};
    const pendente = proximo.checklist.find(c => !c.auto && !checks[c.id]);
    return pendente ? pendente.label : null;
  })() : null;

  const whatsapp = `*Relatório Mensal LEAD — ${form.mes} ${form.ano}*\n\nTurma: ${form.turma}\nAlunos ativos: ${form.alunosFinal}\nTaxa de retenção: ${taxa !== null ? taxa + "%" : "—"}\nZona LEAD: ${zone.charAt(0).toUpperCase()+zone.slice(1)}\n\nFaixa atual: ${progGeral.faixaAtual?.nome || "Em andamento"}\nPróxima faixa: ${proximo?.nome || "Jornada completa"}\nPróximo passo da jornada:\n${proxPend || "Continuar preenchendo o Painel de Bordo"}\n\nPrioridade do próximo mês:\n${form.prioridade}\n\nPrimeira ação prática:\n${form.primeiraAcao}\n\nSeguimos acompanhando, ajustando e construindo um Baby Class com mais método, valor percebido e desenvolvimento real.`;

  const copyWA = () => { navigator.clipboard.writeText(whatsapp).then(()=>{ setCopied(true); setTimeout(()=>setCopied(false),2000); }); };

  if (screen === "welcome") return <Welcome onStart={() => setScreen("app")} />;
  if (adminTab) return <AdminView history={history} jornada={jornada} progGeral={progGeral} onBack={() => setAdminTab(false)} />;
  if (viewHist) return (
    <div style={s.app}><div style={s.wrap}>
      <div style={s.hdr}><div style={s.logo}>Método LEAD</div><h1 style={s.h1}>Relatório Salvo</h1><div style={s.sub}>{viewHist.mes} {viewHist.ano} · {viewHist.turma}</div></div>
      <ReportView data={viewHist} progGeral={progGeral} />
      <div style={s.btnRow}><button style={s.btnS} onClick={() => setViewHist(null)}>← Voltar ao histórico</button></div>
    </div></div>
  );

  return (
    <div style={s.app}>
      {achievModal && <AchievModal faixa={achievModal} onClose={() => setAchievModal(null)} />}
      {evidModal && <EvidModal faixaId={evidModal} jornada={jornada} updJ={updJ} onClose={() => setEvidModal(null)} />}
      <div style={s.wrap}>
        <div style={s.hdr}>
          <div style={s.logo}>Comunidade LEAD · Turma Fundadora</div>
          <h1 style={s.h1}>Painel de Bordo do Professor LEAD</h1>
          <div style={s.sub}>Acompanhe crescimento, retenção, evolução comportamental e valor percebido das suas turmas com método.</div>
          <div style={{ display:"flex", gap:6, justifyContent:"center", marginTop:16, flexWrap:"wrap" }}>
            {STEPS.map((t,i) => <button key={i} style={s.tab(step===i)} onClick={()=>setStep(i)}>{t}</button>)}
          </div>
          <div style={{ background:BORDER, borderRadius:2, height:2, margin:"16px 0 0", overflow:"hidden" }}>
            <div style={{ background:GOLD, height:"100%", width:`${((step+1)/STEPS.length)*100}%`, transition:"width 0.4s" }} />
          </div>
          <div style={{ fontSize:11, color:MUTED, fontFamily:"sans-serif", letterSpacing:2, textTransform:"uppercase", marginTop:8, textAlign:"right" }}>{step+1} / {STEPS.length} — {STEPS[step]}</div>
        </div>

        {step===0 && <StepDiag form={form} upd={upd} />}
        {step===1 && <StepInd form={form} taxa={taxa} zone={zone} />}
        {step===2 && <StepQual form={form} upd={upd} />}
        {step===3 && <StepComp form={form} upd={upd} toggle={toggleComp} />}
        {step===4 && <StepPlano form={form} upd={upd} />}
        {step===5 && <StepRel form={form} taxa={taxa} zone={zone} onSave={saveMonth} onCopy={copyWA} copied={copied} progGeral={progGeral} />}
        {step===6 && <StepHist history={history} setHistory={setHistory} onView={setViewHist} />}
        {step===7 && <StepPerfil history={history} jornada={jornada} updJ={updJ} progGeral={progGeral} onEvidModal={setEvidModal} toggleCheck={toggleCheckItem} togglePilar={togglePilar} />}
        {step===8 && <StepEnvio form={form} sendStatus={sendStatus} showConfirm={showConfirm} setShowConfirm={setShowConfirm} onSend={sendToLEAD} />}

        <div style={{ ...s.btnRow, justifyContent:"space-between" }}>
          <button style={s.btnS} onClick={() => step>0?setStep(v=>v-1):setScreen("welcome")}>← {step>0?"Anterior":"Início"}</button>
          <div style={{ display:"flex", gap:8 }}>
            <button style={{ ...s.btnS, fontSize:11, padding:"10px 16px" }} onClick={() => setAdminTab(true)}>Visão da Equipe</button>
            {step<STEPS.length-1 && <button style={s.btnP} onClick={()=>setStep(v=>v+1)}>Próximo →</button>}
          </div>
        </div>
        <div style={{ textAlign:"center", marginTop:48, paddingTop:24, borderTop:`0.5px solid ${BORDER}` }}>
          <p style={{ fontSize:12, fontStyle:"italic", color:MUTED, fontFamily:"sans-serif" }}>"É muito mais do que ensinar Jiu Jitsu. É sobre deixar legado."</p>
        </div>
      </div>
    </div>
  );
}

// ─── WELCOME ──────────────────────────────────────────────────────
function Welcome({ onStart }) {
  return (
    <div style={{ ...s.app, display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh" }}>
      <div style={{ maxWidth:580, padding:"0 24px", textAlign:"center" }}>
        <div style={{ ...s.logo, marginBottom:8 }}>Comunidade LEAD · Turma Fundadora</div>
        <h1 style={{ fontSize:26, fontWeight:400, color:CHARCOAL, lineHeight:1.4, marginBottom:16 }}>Painel de Bordo<br/>do Professor LEAD</h1>
                  <p style={{ fontSize:13, color:MUTED, fontFamily:"sans-serif", lineHeight:1.8, marginBottom:32 }}>Acompanhe crescimento, retenção, evolução comportamental e valor percebido das suas turmas com método.</p>
        <div style={{ background:GOLD_LIGHT, border:`1px solid ${GOLD}`, borderRadius:8, padding:"20px 28px", marginBottom:36, textAlign:"left" }}>
          <p style={{ fontSize:13, fontStyle:"italic", color:CHARCOAL, fontFamily:"sans-serif", lineHeight:1.8, margin:0 }}>"O professor comum termina o mês apenas sentindo se a turma foi boa ou ruim. O professor LEAD termina o mês com dados, leitura pedagógica e direção."</p>
        </div>
        <div style={{ display:"flex", gap:16, justifyContent:"center", marginBottom:40, flexWrap:"wrap" }}>
          {["Ludicidade","Educação","Autonomia","Desenvolvimento"].map((w,i)=>(
            <div key={i} style={{ textAlign:"center" }}><div style={{ fontSize:20, color:GOLD }}>{w[0]}</div><div style={{ fontSize:10, color:MUTED, fontFamily:"sans-serif", letterSpacing:1 }}>{w}</div></div>
          ))}
        </div>
        <button style={s.btnP} onClick={onStart}>Começar diagnóstico mensal</button>
        <div style={{ marginTop:48, paddingTop:24, borderTop:`0.5px solid ${BORDER}` }}>
          <p style={{ fontSize:11, fontStyle:"italic", color:MUTED, fontFamily:"sans-serif" }}>"É muito mais do que ensinar Jiu Jitsu. É sobre deixar legado."</p>
        </div>
      </div>
    </div>
  );
}

// ─── STEPS ────────────────────────────────────────────────────────
function StepDiag({ form, upd }) {
  return <div>
    <div style={s.quote}>"Aquilo que não é acompanhado, dificilmente é melhorado."</div>
    <div style={{ marginBottom:32 }}>
      <div style={s.secTitle}>Identificação</div>
      <div style={s.r2}><Field label="Nome do professor"><input style={s.inp} value={form.professor} onChange={e=>upd("professor",e.target.value)} placeholder="Seu nome completo"/></Field><Field label="Nome da academia"><input style={s.inp} value={form.academia} onChange={e=>upd("academia",e.target.value)} placeholder="Nome da academia"/></Field></div>
      <Field label="Cidade e estado"><input style={s.inp} value={form.cidade} onChange={e=>upd("cidade",e.target.value)} placeholder="Ex: São Paulo — SP"/></Field>
      <div style={s.r2}><Field label="Nome da turma"><input style={s.inp} value={form.turma} onChange={e=>upd("turma",e.target.value)} placeholder="Ex: Baby Class Manhã"/></Field><Field label="Faixa etária"><input style={s.inp} value={form.faixaEtaria} onChange={e=>upd("faixaEtaria",e.target.value)} placeholder="Ex: 2 a 4 anos"/></Field></div>
      <div style={s.r2}><Field label="Mês avaliado"><select style={s.inp} value={form.mes} onChange={e=>upd("mes",e.target.value)}><option value="">Selecionar</option>{MESES.map(m=><option key={m} value={m}>{m}</option>)}</select></Field><Field label="Ano"><input style={s.inp} value={form.ano} onChange={e=>upd("ano",e.target.value)} type="number" min="2024"/></Field></div>
    </div>
    <div style={{ marginBottom:32 }}>
      <div style={s.secTitle}>Dados da turma no mês</div>
      <div style={s.r2}><Field label="Alunos no início do mês"><input style={s.inp} type="number" value={form.alunosInicio} onChange={e=>upd("alunosInicio",e.target.value)} placeholder="0" min="0"/></Field><Field label="Alunos ativos no final"><input style={s.inp} type="number" value={form.alunosFinal} onChange={e=>upd("alunosFinal",e.target.value)} placeholder="0" min="0"/></Field></div>
      <div style={s.r2}><Field label="Novos alunos no mês"><input style={s.inp} type="number" value={form.novosAlunos} onChange={e=>upd("novosAlunos",e.target.value)} placeholder="0" min="0"/></Field><Field label="Cancelamentos ou pausas"><input style={s.inp} type="number" value={form.cancelamentos} onChange={e=>upd("cancelamentos",e.target.value)} placeholder="0" min="0"/></Field></div>
    </div>
  </div>;
}

function StepInd({ form, taxa, zone }) {
  const i=parseInt(form.alunosInicio)||0, f=parseInt(form.alunosFinal)||0, n=parseInt(form.novosAlunos)||0, c=parseInt(form.cancelamentos)||0;
  const ZONE_MSGS = { atenção:"Este mês exige ajustes imediatos. A prioridade deve ser organizar a experiência, melhorar a comunicação com os pais e proteger a retenção.", ajuste:"A estrutura já começou a aparecer, mas ainda precisa de refinamento. A prioridade deve ser transformar boas intenções em padrão repetível.", crescimento:"A base está pronta para crescer. A prioridade agora é fortalecer captação, indicações e posicionamento premium." };
  return <div>
    <div style={s.quote}>"Retenção não é apenas permanência. É sinal de vínculo, confiança e percepção de valor."</div>
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:24 }}>
      <div style={s.mc}><div style={s.mv}>{f||"—"}</div><div style={s.ml}>Alunos ativos</div></div>
      <div style={s.mc}><div style={{ ...s.mv, color:"#1E8449" }}>+{n||0}</div><div style={s.ml}>Novos alunos</div></div>
      <div style={s.mc}><div style={{ ...s.mv, color:"#922B21" }}>{c||0}</div><div style={s.ml}>Cancelamentos</div></div>
      <div style={s.mc}><div style={{ ...s.mv, color:GOLD }}>{taxa!==null?taxa+"%":"—"}</div><div style={s.ml}>Taxa de retenção</div>{taxa!==null&&<div style={{ fontSize:10, fontFamily:"sans-serif", color:MUTED, marginTop:4, letterSpacing:1 }}>{taxa>=90?"Zona de Força":taxa>=75?"Zona de Estabilidade":"Zona de Atenção"}</div>}</div>
    </div>
    {taxa===null&&<div style={s.priv}>Dados insuficientes para calcular a taxa de retenção.</div>}
    <div style={{ marginBottom:32 }}>
      <div style={s.secTitle}>Movimento da turma</div>
      <div style={{ display:"flex", alignItems:"center", gap:8, overflowX:"auto", paddingBottom:8 }}>
        {[{v:i,l:"Início",c:CHARCOAL},{v:`+${n}`,l:"Novos",c:"#1E8449"},{v:`−${c}`,l:"Cancel.",c:"#922B21"},{v:f,l:"Final",c:GOLD}].map((item,idx)=>(
          <span key={idx} style={{ display:"flex", alignItems:"center", gap:8 }}>
            {idx>0&&<span style={{ color:BORDER, fontSize:20 }}>→</span>}
            <div style={{ textAlign:"center", flexShrink:0 }}><div style={{ fontSize:22, color:item.c }}>{item.v}</div><div style={{ fontSize:10, fontFamily:"sans-serif", color:MUTED, letterSpacing:1, textTransform:"uppercase" }}>{item.l}</div></div>
          </span>
        ))}
      </div>
    </div>
    <div style={{ marginBottom:32 }}>
      <div style={s.secTitle}>Semáforo LEAD do mês</div>
      <div style={{ textAlign:"center", padding:"24px 0" }}>
        <div style={s.zone(zone)}>{zone==="atenção"?"Zona de Atenção":zone==="ajuste"?"Zona de Ajuste":"Zona de Crescimento"}</div>
        <p style={{ fontSize:13, fontFamily:"sans-serif", color:MUTED, marginTop:16, lineHeight:1.7 }}>{ZONE_MSGS[zone]}</p>
      </div>
    </div>
  </div>;
}

function StepQual({ form, upd }) {
  const secs = [["participacaoPais","Participação dos pais"],["satisfacaoTurma","Satisfação da turma"],["organizacaoAula","Organização da aula"],["reforcoPosi","Reforço positivo"],["posicionamento","Posicionamento e valor percebido"]];
  return <div>
    <div style={s.quote}>"Pais não valorizam o que não entendem. Por isso, comunicação também é indicador."</div>
    {secs.map(([k,lbl])=>(
      <div key={k} style={{ marginBottom:32 }}>
        <div style={s.secTitle}>{lbl}</div>
        {QUALITATIVE_OPTIONS[k].map((o,i)=>(
          <div key={i} style={s.optCard(form[k]===i)} onClick={()=>upd(k,form[k]===i?null:i)}>
            <div style={{ fontSize:14, fontWeight:500, color:CHARCOAL, fontFamily:"sans-serif", marginBottom:4 }}>{i+1}. {o.label}</div>
            <div style={{ fontSize:12, color:MUTED, fontFamily:"sans-serif", lineHeight:1.6 }}>{o.desc}</div>
          </div>
        ))}
      </div>
    ))}
    <div style={{ marginBottom:32 }}>
      <div style={s.secTitle}>Radar LEAD</div>
      {secs.map(([k,lbl])=>(
        <div key={k} style={s.barRow}>
          <div style={s.barLbl}>{lbl}</div>
          <div style={s.barTr}><div style={s.barFl(form[k]!==null?((form[k]+1)/3)*100:0)} /></div>
          <div style={{ fontSize:12, fontFamily:"sans-serif", color:MUTED, width:24, textAlign:"right" }}>{form[k]!==null?form[k]+1:"—"}</div>
        </div>
      ))}
    </div>
  </div>;
}

function StepComp({ form, upd, toggle }) {
  return <div>
    <div style={s.quote}>"O professor LEAD não conduz o infantil apenas pela sensação. Ele observa, registra, interpreta e ajusta."</div>
    <div style={{ marginBottom:32 }}>
      <div style={s.secTitle}>Evolução comportamental do mês</div>
      {COMPORTAMENTOS.map((c,i)=>(
        <div key={i} style={s.chkRow} onClick={()=>toggle(c)}>
          <div style={s.chkBox(form.comportamentos.includes(c))}>{form.comportamentos.includes(c)&&<Chk/>}</div>
          <span style={{ fontSize:14, fontFamily:"sans-serif", color:CHARCOAL }}>{c}</span>
        </div>
      ))}
    </div>
    <div style={{ marginBottom:32 }}>
      <div style={s.secTitle}>Destaque do mês</div>
      <div style={s.priv}>Para proteger a privacidade das crianças, orientamos que não sejam inseridos nomes completos de alunos. Utilize apenas iniciais, apelidos internos ou códigos de identificação.</div>
      <div style={{ marginTop:16 }}>
        <Field label="Criança que mais evoluiu (iniciais ou código)"><input style={s.inp} value={form.criancaDestaque} onChange={e=>upd("criancaDestaque",e.target.value)} placeholder="Ex: M.S. ou Aluno-03"/></Field>
        <Field label="Evolução observada"><textarea style={s.ta} value={form.evolucaoObservada} onChange={e=>upd("evolucaoObservada",e.target.value)} placeholder="Descreva o que você observou..."/></Field>
        <Field label="Evolução que pode ser comunicada aos pais"><textarea style={s.ta} value={form.evolucaoComunicada} onChange={e=>upd("evolucaoComunicada",e.target.value)} placeholder="Como você comunicaria essa evolução para a família?"/></Field>
      </div>
    </div>
  </div>;
}

function StepPlano({ form, upd }) {
  return <div>
    <div style={s.quote}>"Crescimento sem acompanhamento vira sorte. Crescimento com método vira construção."</div>
    <div style={{ marginBottom:32 }}>
      <div style={s.secTitle}>Prioridade do próximo mês</div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:24 }}>
        {PRIORIDADES.map((p,i)=>(
          <div key={i} style={{ ...s.optCard(form.prioridade===p), padding:"10px 14px" }} onClick={()=>upd("prioridade",form.prioridade===p?"":p)}>
            <div style={{ fontSize:13, fontFamily:"sans-serif", color:form.prioridade===p?GOLD:CHARCOAL }}>{p}</div>
          </div>
        ))}
      </div>
    </div>
    <div style={{ marginBottom:32 }}>
      <div style={s.secTitle}>Plano de ação</div>
      <Field label="O que vamos ajustar?"><textarea style={s.ta} value={form.oQueAjustar} onChange={e=>upd("oQueAjustar",e.target.value)} placeholder="Descreva o ajuste principal..."/></Field>
      <Field label="Por que esse ajuste é importante?"><textarea style={s.ta} value={form.porQueAjuste} onChange={e=>upd("porQueAjuste",e.target.value)} placeholder="Qual é o impacto esperado?"/></Field>
      <Field label="Qual será a primeira ação prática?"><textarea style={s.ta} value={form.primeiraAcao} onChange={e=>upd("primeiraAcao",e.target.value)} placeholder="Seja específico..."/></Field>
      <Field label="Quando será aplicada?"><input style={s.inp} type="date" value={form.dataAplicacao} onChange={e=>upd("dataAplicacao",e.target.value)}/></Field>
      <Field label="Como vamos medir se funcionou?"><textarea style={s.ta} value={form.comoMedir} onChange={e=>upd("comoMedir",e.target.value)} placeholder="Qual será o indicador de sucesso?"/></Field>
      <Field label="Observações (opcional)"><textarea style={s.ta} value={form.observacoes} onChange={e=>upd("observacoes",e.target.value)} placeholder="Qualquer outra observação sobre este mês..."/></Field>
    </div>
  </div>;
}

function ReportView({ data, progGeral }) {
  const STRATEGIC_MSGS = { atenção:"Com base nos indicadores preenchidos, a prioridade deste mês deve ser reorganizar a estrutura da aula e fortalecer a comunicação com as famílias. O vínculo começa antes do tatame — e se perde quando o professor não conta o que está acontecendo.", ajuste:"A estrutura já tem forma. O que falta agora é consistência. Transforme suas boas práticas em padrão repetível — crie registros simples, fortaleça o reforço positivo e comunique com mais frequência.", crescimento:"A prioridade agora é fortalecer captação, indicações e posicionamento premium. A turma que cresce bem precisa ser comunicada com estratégia. Cada feedback dado aos pais é uma semente de indicação." };
  const z = data.zone || "ajuste";
  return <div>
    <div style={s.cardG}>
      <div style={{ fontSize:11, fontFamily:"sans-serif", color:GOLD, letterSpacing:3, textTransform:"uppercase", marginBottom:8 }}>Relatório Mensal LEAD</div>
      <div style={{ fontSize:18, color:CHARCOAL, marginBottom:4 }}>{data.mes} {data.ano}</div>
      <div style={{ fontSize:13, fontFamily:"sans-serif", color:MUTED }}>{data.professor} · {data.academia} · {data.cidade}</div>
      <div style={{ fontSize:13, fontFamily:"sans-serif", color:MUTED, marginTop:2 }}>{data.turma} · {data.faixaEtaria}</div>
    </div>
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:20 }}>
      <div style={s.mc}><div style={s.mv}>{data.alunosFinal||"—"}</div><div style={s.ml}>Ativos</div></div>
      <div style={s.mc}><div style={{ ...s.mv, color:"#1E8449" }}>+{data.novosAlunos||0}</div><div style={s.ml}>Novos</div></div>
      <div style={s.mc}><div style={{ ...s.mv, color:GOLD }}>{data.taxaRetencao!==null?data.taxaRetencao+"%":"—"}</div><div style={s.ml}>Retenção</div></div>
    </div>
    <div style={{ textAlign:"center", marginBottom:20 }}><div style={s.zone(z)}>{z==="atenção"?"Zona de Atenção":z==="ajuste"?"Zona de Ajuste":"Zona de Crescimento"}</div></div>
    {data.comportamentos?.length>0&&<div style={s.card}><div style={s.secTitle}>Evoluções comportamentais</div>{data.comportamentos.map((c,i)=><div key={i} style={{ fontSize:13, fontFamily:"sans-serif", color:CHARCOAL, padding:"5px 0", borderBottom:`0.5px solid ${BORDER}` }}>✓ {c}</div>)}</div>}
    {progGeral?.faixaAtual&&<div style={s.card}><div style={s.secTitle}>Jornada LEAD do Professor</div><div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}><FaixaIcon faixa={progGeral.faixaAtual} size={80}/><div><div style={{ fontSize:14, fontFamily:"sans-serif", color:CHARCOAL, fontWeight:500 }}>{progGeral.faixaAtual.nome}</div><div style={{ fontSize:12, fontFamily:"sans-serif", color:MUTED, marginTop:4 }}>{progGeral.faixaAtual.subtitulo}</div></div></div></div>}
    <div style={s.card}><div style={s.secTitle}>Prioridade do próximo mês</div><div style={{ fontSize:14, fontFamily:"sans-serif", color:GOLD, fontWeight:500, marginBottom:8 }}>{data.prioridade||"—"}</div>{data.oQueAjustar&&<p style={{ fontSize:13, fontFamily:"sans-serif", color:MUTED, lineHeight:1.7 }}>{data.oQueAjustar}</p>}</div>
    <div style={s.cardG}><div style={{ fontSize:11, fontFamily:"sans-serif", color:GOLD, letterSpacing:2, textTransform:"uppercase", marginBottom:10 }}>Mensagem estratégica · Equipe LEAD</div><p style={{ fontSize:13, fontFamily:"sans-serif", color:CHARCOAL, lineHeight:1.8, fontStyle:"italic", margin:0 }}>{STRATEGIC_MSGS[z]}</p></div>
  </div>;
}

function StepRel({ form, taxa, zone, onSave, onCopy, copied, progGeral }) {
  return <div>
    <div style={s.quote}>"O desenvolvimento que não é comunicado perde valor."</div>
    <ReportView data={{ ...form, taxaRetencao:taxa, zone }} progGeral={progGeral} />
    <div style={{ ...s.btnRow, flexDirection:"column" }}>
      <button style={s.btnP} onClick={onSave}>Salvar painel do mês</button>
      <button style={s.btnS} onClick={onCopy}>{copied?"Copiado!":"Copiar resumo para WhatsApp"}</button>
      <button style={s.btnS} onClick={()=>window.print()}>Imprimir relatório</button>
    </div>
  </div>;
}

function StepHist({ history, setHistory, onView }) {
  const zoneLabel = z => z==="atenção"?"Atenção":z==="ajuste"?"Ajuste":"Crescimento";
  const zTag = z => ({ display:"inline-block", padding:"4px 14px", borderRadius:20, fontSize:11, fontFamily:"sans-serif", letterSpacing:2, textTransform:"uppercase", background:z==="atenção"?"#FDECEA":z==="ajuste"?"#FEF9E7":"#EAF7ED", color:z==="atenção"?"#922B21":z==="ajuste"?"#B7770D":"#1E8449" });
  return <div>
    <div style={s.secTitle}>Histórico mensal</div>
    {history.length===0?<div style={{ ...s.priv, textAlign:"center", padding:32 }}><p style={{ margin:0, fontSize:13 }}>Nenhum registro salvo ainda.</p></div>:history.map(h=>(
      <div key={h.id} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 0", borderBottom:`0.5px solid ${BORDER}`, gap:12, flexWrap:"wrap" }}>
        <div style={{ flex:1 }}><div style={{ fontSize:13, fontFamily:"sans-serif", color:CHARCOAL, fontWeight:500 }}>{h.mes} {h.ano} · {h.turma}</div><div style={{ fontSize:11, fontFamily:"sans-serif", color:MUTED, marginTop:2 }}>{h.alunosFinal} alunos · {h.taxaRetencao!==null?h.taxaRetencao+"% retenção":"sem dados de retenção"}</div></div>
        <div style={zTag(h.zone||"ajuste")}>{zoneLabel(h.zone||"ajuste")}</div>
        <button style={{ ...s.btnS, fontSize:11, padding:"8px 14px" }} onClick={()=>onView(h)}>Ver</button>
        <button style={{ ...s.btnS, fontSize:11, padding:"8px 14px", color:"#922B21" }} onClick={()=>{ const h2=deleteFromHistory(h.id); setHistory(h2); }}>Excluir</button>
      </div>
    ))}
  </div>;
}

function StepEnvio({ form, sendStatus, showConfirm, setShowConfirm, onSend }) {
  return <div>
    <div style={s.quote}>"O professor que mede, melhora. O professor que melhora, retém."</div>
    <div style={s.card}>
      <div style={s.secTitle}>Envio para a equipe LEAD</div>
      <p style={{ fontSize:13, fontFamily:"sans-serif", color:MUTED, lineHeight:1.7, marginBottom:20 }}>Ao enviar os dados, a equipe LEAD poderá acompanhar os indicadores da Comunidade, identificar padrões e direcionar as próximas mentorias com mais precisão.</p>
      <div style={s.priv}>Para proteger a privacidade das crianças, orientamos que não sejam inseridos nomes completos de alunos. Utilize apenas iniciais, apelidos internos ou códigos de identificação. Os dados enviados serão utilizados pela equipe LEAD para acompanhamento pedagógico e melhoria da experiência da Comunidade LEAD.</div>
      {!showConfirm&&!sendStatus&&<button style={{ ...s.btnG, marginTop:20 }} onClick={()=>setShowConfirm(true)}>Enviar dados para a equipe LEAD</button>}
      {showConfirm&&<div style={{ ...s.cardG, marginTop:16 }}><p style={{ fontSize:13, fontFamily:"sans-serif", color:CHARCOAL, lineHeight:1.7, marginBottom:16 }}>Confirmamos que os dados preenchidos serão enviados para a equipe LEAD com a finalidade de acompanhamento pedagógico e estratégico da Comunidade LEAD.</p><div style={s.btnRow}><button style={s.btnG} onClick={onSend}>Confirmar envio</button><button style={s.btnS} onClick={()=>setShowConfirm(false)}>Voltar e revisar</button></div></div>}
      {sendStatus==="success"&&<div style={{ ...s.card, borderColor:"#1E8449", marginTop:16 }}><p style={{ fontSize:13, fontFamily:"sans-serif", color:"#1E8449", lineHeight:1.7, margin:0 }}>Dados enviados com sucesso para a equipe LEAD.</p></div>}
      {sendStatus==="error"&&<div style={{ ...s.card, borderColor:"#922B21", marginTop:16 }}><p style={{ fontSize:13, fontFamily:"sans-serif", color:"#922B21", lineHeight:1.7, margin:0 }}>Não foi possível enviar os dados neste momento. O painel foi salvo neste dispositivo.</p></div>}
      {sendStatus==="no_url"&&<div style={s.priv}>Configure o endpoint (GOOGLE_SCRIPT_URL) para ativar o acompanhamento centralizado.</div>}
    </div>
  </div>;
}

// ─── MEU PERFIL LEAD ─────────────────────────────────────────────
function StepPerfil({ history, jornada, updJ, progGeral, onEvidModal, toggleCheck, togglePilar }) {
  const { mesesCons, faixaAtual, proximaFaixa, proximoResultado, resultados, totalPaineis } = progGeral;
  const datas = jornada.datasDesbloqueio || {};
  const [relatoAtivo, setRelatoAtivo] = useState(null);

  let proxPct = 0, mesesFaltam = 0;
  if (proximaFaixa) {
    const base = faixaAtual ? MESES_PARA_FAIXA[faixaAtual.id] : 0;
    const range = MESES_PARA_FAIXA[proximaFaixa.id] - base;
    proxPct = Math.min(100, Math.max(0, ((mesesCons - base) / range) * 100));
    mesesFaltam = Math.max(0, MESES_PARA_FAIXA[proximaFaixa.id] - mesesCons);
  } else if (faixaAtual) proxPct = 100;

  const proxPendente = proximaFaixa ? (() => {
    const checks = jornada.checklists[proximaFaixa.id] || {};
    return proximaFaixa.checklist.find(c => !c.auto && !checks[c.id])?.label || null;
  })() : null;

  const relato = jornada.relatos || {};
  const updRelato = (faixaId, txt) => updJ({ ...jornada, relatos: { ...relato, [faixaId]: txt } });

  return <div>
    <div style={s.quote}>"No LEAD, o professor não sobe de faixa apenas por preencher dados. Ele sobe porque transforma dados em ação, ação em experiência e experiência em legado."</div>

    {/* CARD HERO */}
    <div style={{ marginBottom:32 }}>
      <div style={s.secTitle}>Sua Jornada LEAD</div>
      <div style={{ background:`linear-gradient(135deg, ${WHITE} 0%, ${GOLD_LIGHT} 100%)`, border:`1.5px solid ${GOLD}`, borderRadius:16, padding:"32px 28px", boxShadow:"0 12px 32px rgba(184,150,62,0.18)", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-40, right:-40, width:140, height:140, borderRadius:"50%", background:GOLD, opacity:0.07 }} />
        <div style={{ fontSize:11, fontFamily:"sans-serif", color:GOLD, letterSpacing:3, textTransform:"uppercase", marginBottom:18 }}>{totalPaineis} {totalPaineis===1?"painel preenchido":"painéis preenchidos"}</div>
        {faixaAtual ? <>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:16 }}><FaixaIcon faixa={faixaAtual} size={150}/></div>
          <div style={{ textAlign:"center", marginBottom:4 }}><div style={{ fontSize:20, color:CHARCOAL, fontWeight:500 }}>{faixaAtual.nome}</div><div style={{ fontSize:13, fontFamily:"sans-serif", color:MUTED, marginTop:4 }}>{faixaAtual.subtitulo}</div></div>
          {proximaFaixa && <div style={{ marginTop:24, paddingTop:20, borderTop:`0.5px solid rgba(184,150,62,0.3)` }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:8 }}>
              <span style={{ fontSize:11, fontFamily:"sans-serif", color:MUTED, letterSpacing:1, textTransform:"uppercase" }}>Próxima conquista</span>
              <span style={{ fontSize:12, fontFamily:"sans-serif", color:GOLD, fontWeight:600 }}>{proximaFaixa.nome}</span>
            </div>
            <div style={{ background:"rgba(184,150,62,0.18)", borderRadius:4, height:8, overflow:"hidden" }}>
              <div style={{ width:`${proxPct}%`, height:"100%", background:`linear-gradient(90deg, ${GOLD}, #D4AF37)`, borderRadius:4, transition:"width 0.6s" }} />
            </div>
            <div style={{ fontSize:12, fontFamily:"sans-serif", color:MUTED, marginTop:10 }}>{proximoResultado?.done} de {proximoResultado?.total} requisitos concluídos</div>
          </div>}
        </> : <div style={{ textAlign:"center", padding:"12px 0" }}>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:16 }}><FaixaIcon faixa={FAIXAS[0]} size={150} locked/></div>
          <p style={{ fontSize:13, fontFamily:"sans-serif", color:MUTED, lineHeight:1.7 }}>Complete e salve o seu primeiro Painel de Bordo para desbloquear a Faixa Branca LEAD.</p>
        </div>}
      </div>
    </div>

    {/* PRÓXIMO PASSO */}
    {proximaFaixa && proxPendente && <div style={{ marginBottom:32 }}>
      <div style={s.secTitle}>Próximo Passo da Jornada</div>
      <div style={{ background:WHITE, border:`1.5px solid rgba(184,150,62,0.4)`, borderRadius:12, padding:"20px 24px" }}>
        <div style={{ fontSize:11, fontFamily:"sans-serif", color:GOLD, letterSpacing:2, textTransform:"uppercase", marginBottom:10 }}>Para desbloquear a {proximaFaixa.nome}</div>
        <p style={{ fontSize:14, fontFamily:"sans-serif", color:CHARCOAL, lineHeight:1.7, margin:0 }}>Falta concluir: <strong>{proxPendente}</strong></p>
        <p style={{ fontSize:12, fontFamily:"sans-serif", color:MUTED, marginTop:10, lineHeight:1.6, fontStyle:"italic" }}>Cada requisito da jornada existe para aproximar o professor de uma prática mais organizada, segura e valorizada.</p>
      </div>
    </div>}

    {/* VITRINE DE INSÍGNIAS */}
    <div style={{ marginBottom:32 }}>
      <div style={s.secTitle}>Minhas Insígnias</div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
        <style>{`.lead-last{grid-column:1 / -1;max-width:calc(50% - 10px);margin:0 auto;width:100%}@media(max-width:600px){.lead-grid{grid-template-columns:1fr!important}.lead-last{max-width:100%}}`}</style>
        {FAIXAS.map((f, idx) => {
          const res = resultados.find(r=>r.faixa.id===f.id);
          const desbloqueada = res.desbloqueada;
          const emProg = !desbloqueada && faixaAtual && FAIXAS.indexOf(f)===FAIXAS.indexOf(faixaAtual)+1;
          const bloqueada = !desbloqueada && !emProg;
          const isLast = idx === FAIXAS.length - 1;
          const checks = jornada.checklists[f.id] || {};
          const pilaresSel = jornada.pilares[f.id] || [];

          let cardBg = bloqueada ? "#F4F3F0" : desbloqueada ? `linear-gradient(160deg, ${GOLD_LIGHT} 0%, ${WHITE} 70%)` : WHITE;
          let cardBorder = bloqueada ? `1px solid ${BORDER}` : desbloqueada ? `1.5px solid ${GOLD}` : `1.5px solid rgba(184,150,62,0.5)`;
          let cardShadow = desbloqueada ? "0 10px 28px rgba(184,150,62,0.22)" : emProg ? "0 6px 18px rgba(184,150,62,0.1)" : "none";
          let statusLbl = desbloqueada ? "Conquista desbloqueada" : emProg ? "Em progresso" : "Bloqueada";
          let statusBg = desbloqueada ? GOLD : emProg ? GOLD_LIGHT : "#E8E4DC";
          let statusColor = desbloqueada ? WHITE : emProg ? GOLD : MUTED;

          return (
            <div key={f.id} className={isLast?"lead-last":""} style={{ background:cardBg, border:cardBorder, borderRadius:14, padding:"24px 20px", position:"relative", overflow:"hidden", boxShadow:cardShadow, opacity:bloqueada?0.82:1 }}>
              {desbloqueada && <div style={{ position:"absolute", top:-30, right:-30, width:100, height:100, borderRadius:"50%", background:GOLD, opacity:0.08 }} />}
              <div style={{ display:"flex", justifyContent:"center", marginBottom:16 }}><FaixaIcon faixa={f} size={130} locked={bloqueada}/></div>
              <div style={{ textAlign:"center", marginBottom:12 }}>
                <div style={{ fontSize:16, color:CHARCOAL, fontWeight:500 }}>{f.nome}</div>
                <div style={{ fontSize:12, fontFamily:"sans-serif", color:MUTED, marginTop:4, lineHeight:1.5 }}>{f.subtitulo}</div>
              </div>
              <div style={{ display:"flex", justifyContent:"center", marginBottom:16 }}>
                <span style={{ background:statusBg, color:statusColor, fontSize:10, fontFamily:"sans-serif", letterSpacing:1.5, textTransform:"uppercase", padding:"5px 14px", borderRadius:20 }}>{statusLbl}</span>
              </div>

              {/* Barra de progresso */}
              <div style={{ marginBottom:14 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                  <span style={{ fontSize:11, fontFamily:"sans-serif", color:MUTED }}>Progresso</span>
                  <span style={{ fontSize:11, fontFamily:"sans-serif", color:GOLD, fontWeight:600 }}>{res.pct}%</span>
                </div>
                <div style={{ background:"rgba(184,150,62,0.15)", borderRadius:4, height:6, overflow:"hidden" }}>
                  <div style={{ width:`${res.pct}%`, height:"100%", background:desbloqueada?GOLD:"rgba(184,150,62,0.55)", borderRadius:4, transition:"width 0.6s" }} />
                </div>
              </div>

              {/* Checklist */}
              <div style={{ marginBottom:16 }}>
                <div style={{ fontSize:11, fontFamily:"sans-serif", color:MUTED, letterSpacing:1, textTransform:"uppercase", marginBottom:8 }}>Requisitos</div>
                {f.checklist.map(item => {
                  const done = item.auto ? res.pct > 0 && (item.id==="diag"||item.id==="ind"||item.id==="qual"||item.id==="comp"||item.id==="plano" ? resultados[0].desbloqueada||resultados[0].pct>0 : mesesCons>=MESES_PARA_FAIXA[f.id]) : !!checks[item.id];
                  const autoCheck = item.auto;
                  return (
                    <div key={item.id} style={{ display:"flex", alignItems:"flex-start", gap:10, padding:"7px 0", borderBottom:`0.5px solid ${BORDER}`, cursor:autoCheck?"default":"pointer" }}
                      onClick={()=>!autoCheck&&toggleCheck(f.id, item.id)}>
                      <div style={s.chkBox(done)}>{done&&<Chk/>}</div>
                      <span style={{ fontSize:12, fontFamily:"sans-serif", color:done?CHARCOAL:MUTED, lineHeight:1.5 }}>{item.label}{autoCheck&&<span style={{ fontSize:10, color:GOLD, marginLeft:6 }}>auto</span>}</span>
                    </div>
                  );
                })}
              </div>

              {/* Pilares (Faixa Roxa) */}
              {f.temPilares && <div style={{ marginBottom:16 }}>
                <div style={{ fontSize:11, fontFamily:"sans-serif", color:MUTED, letterSpacing:1, textTransform:"uppercase", marginBottom:8 }}>Pilar implementado</div>
                {f.pilares.map((p,i)=>(
                  <div key={i} style={{ ...s.optCard(pilaresSel.includes(p)), padding:"8px 12px", marginBottom:6 }} onClick={()=>togglePilar(f.id, p)}>
                    <div style={{ fontSize:12, fontFamily:"sans-serif", color:pilaresSel.includes(p)?GOLD:CHARCOAL }}>{p}</div>
                  </div>
                ))}
              </div>}

              {/* Campo de relato */}
              {f.temRelato && <div style={{ marginBottom:16 }}>
                <div style={{ fontSize:11, fontFamily:"sans-serif", color:MUTED, letterSpacing:1, textTransform:"uppercase", marginBottom:8 }}>Relato</div>
                <textarea style={{ ...s.ta, minHeight:64, fontSize:12 }} placeholder={f.campoRelato} value={(jornada.relatos||{})[f.id]||""} onChange={e=>updRelato(f.id, e.target.value)} />
                {["roxa","marrom","preta"].includes(f.id) && <button style={{ ...s.btnS, fontSize:11, padding:"8px 14px", marginTop:8 }} onClick={()=>{
                  const txt = `Minha evolução na Jornada LEAD:\n\nFaixa em andamento: ${f.nome}\nO que implementei: \nO que percebi na turma: \nO que percebi nos pais: \nMeu próximo ajuste será: \n\nSeguimos construindo um Jiu Jitsu infantil com mais método, desenvolvimento e legado.`;
                  navigator.clipboard.writeText(txt);
                }}>Copiar relato para WhatsApp</button>}
              </div>}

              {/* Botão evidência */}
              {f.temEvidencia && <div style={{ marginBottom:12 }}>
                <button style={{ ...s.btnS, fontSize:11, padding:"8px 14px", width:"100%", textAlign:"center" }} onClick={()=>onEvidModal(f.id)}>
                  Registrar evidência
                </button>
                {(jornada.evidencias||{})[f.id]?.length>0&&<div style={{ fontSize:11, fontFamily:"sans-serif", color:GOLD, marginTop:8 }}>✓ {(jornada.evidencias[f.id]||[]).length} evidência(s) registrada(s)</div>}
              </div>}

              <div style={{ fontSize:12, fontFamily:"sans-serif", color:desbloqueada?GOLD:MUTED, fontStyle:"italic", textAlign:"center", marginTop:8 }}>
                {desbloqueada ? f.fraseCard : bloqueada ? "Continue preenchendo o Painel de Bordo para avançar." : f.fraseCard}
              </div>
              {desbloqueada && datas[f.id] && <div style={{ fontSize:11, fontFamily:"sans-serif", color:GOLD, textAlign:"center", marginTop:10, paddingTop:10, borderTop:`0.5px solid rgba(184,150,62,0.25)` }}>Desbloqueada em {new Date(datas[f.id]).toLocaleDateString("pt-BR")}</div>}
            </div>
          );
        })}
      </div>
    </div>

    {/* AVISO PRIVACIDADE EVIDÊNCIAS */}
    <div style={s.priv}>Para proteger a privacidade das crianças, orientamos que não sejam enviados nomes completos, dados sensíveis ou imagens sem autorização dos responsáveis. Quando possível, use registros sem expor o rosto da criança, vídeos demonstrativos do professor ou relatos escritos.</div>

    {/* HISTÓRICO DE CONQUISTAS */}
    <div style={{ marginBottom:32, marginTop:32 }}>
      <div style={s.secTitle}>Histórico de Conquistas</div>
      <div style={s.card}>
        <div style={{ ...s.chkRow, borderBottom:`0.5px solid ${BORDER}` }}>
          <div style={s.chkBox(totalPaineis>0)}>{totalPaineis>0&&<Chk/>}</div>
          <div style={{ fontSize:13, fontFamily:"sans-serif", color:CHARCOAL }}>Primeiro painel preenchido {totalPaineis===0&&<span style={{ color:MUTED }}>— Em progresso</span>}</div>
        </div>
        {FAIXAS.map(f=>{
          const res = resultados.find(r=>r.faixa.id===f.id);
          return <div key={f.id} style={{ ...s.chkRow, borderBottom:`0.5px solid ${BORDER}` }}>
            <div style={s.chkBox(res.desbloqueada)}>{res.desbloqueada&&<Chk/>}</div>
            <div style={{ fontSize:13, fontFamily:"sans-serif", color:CHARCOAL }}>
              {f.nome} {!res.desbloqueada&&<span style={{ color:MUTED }}>— Em progresso</span>}
              {res.desbloqueada&&datas[f.id]&&<span style={{ color:MUTED, fontSize:11 }}> · {new Date(datas[f.id]).toLocaleDateString("pt-BR")}</span>}
            </div>
          </div>;
        })}
      </div>
    </div>

    <div style={s.cardG}><p style={{ fontSize:12, fontFamily:"sans-serif", color:CHARCOAL, lineHeight:1.8, fontStyle:"italic", margin:0 }}>A Jornada LEAD não existe para criar comparação. Ela existe para reconhecer consistência, aplicação e evolução. Porque o professor que acompanha, aplica e ajusta passa a conduzir o infantil com mais clareza, mais segurança e mais valor percebido.</p></div>
  </div>;
}

// ─── MODAL EVIDÊNCIA ─────────────────────────────────────────────
function EvidModal({ faixaId, jornada, updJ, onClose }) {
  const faixa = FAIXAS.find(f=>f.id===faixaId);
  const existentes = (jornada.evidencias||{})[faixaId] || [];
  const [tipo, setTipo] = useState(faixa?.tiposEvidencia?.[0] || TIPOS_EVIDENCIA_GERAL[0]);
  const [desc, setDesc] = useState("");
  const [link, setLink] = useState("");
  const [enviada, setEnviada] = useState(false);
  const [pendente, setPendente] = useState(false);

  const salvar = () => {
    if (!desc.trim()) return;
    const nova = { tipo, desc, link, enviada, pendente, data: new Date().toISOString() };
    const novas = [...existentes, nova];
    updJ({ ...jornada, evidencias: { ...(jornada.evidencias||{}), [faixaId]: novas } });
    onClose();
  };

  const tipos = faixa?.tiposEvidencia || TIPOS_EVIDENCIA_GERAL;
  return (
    <div style={s.overlay} onClick={onClose}>
      <div style={{ ...s.modal, border:`1px solid ${GOLD}`, boxShadow:"0 20px 60px rgba(0,0,0,0.2)" }} onClick={e=>e.stopPropagation()}>
        <div style={{ fontSize:11, fontFamily:"sans-serif", color:GOLD, letterSpacing:3, textTransform:"uppercase", marginBottom:16 }}>Registrar Evidência — {faixa?.nome}</div>
        <div style={s.priv}>Para proteger a privacidade das crianças, orientamos que não sejam enviados nomes completos, dados sensíveis ou imagens sem autorização dos responsáveis.</div>
        <div style={{ marginTop:20 }}>
          <Field label="Tipo de evidência">
            <select style={s.inp} value={tipo} onChange={e=>setTipo(e.target.value)}>
              {tipos.map(t=><option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Descrição curta"><textarea style={{ ...s.ta, minHeight:64 }} value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Descreva brevemente a evidência..."/></Field>
          <Field label="Link opcional (Instagram, Drive, etc.)"><input style={s.inp} value={link} onChange={e=>setLink(e.target.value)} placeholder="https://..."/></Field>
          <div style={{ display:"flex", gap:16, marginBottom:16 }}>
            <div style={s.chkRow} onClick={()=>setEnviada(v=>!v)}>
              <div style={s.chkBox(enviada)}>{enviada&&<Chk/>}</div>
              <span style={{ fontSize:13, fontFamily:"sans-serif", color:CHARCOAL }}>Enviada na Comunidade LEAD</span>
            </div>
          </div>
          <div style={{ display:"flex", gap:16, marginBottom:20 }}>
            <div style={s.chkRow} onClick={()=>setPendente(v=>!v)}>
              <div style={s.chkBox(pendente)}>{pendente&&<Chk/>}</div>
              <span style={{ fontSize:13, fontFamily:"sans-serif", color:CHARCOAL }}>Pendente de validação pela equipe LEAD</span>
            </div>
          </div>
          {existentes.length>0&&<div style={{ marginBottom:16 }}><div style={{ fontSize:11, fontFamily:"sans-serif", color:MUTED, letterSpacing:1, textTransform:"uppercase", marginBottom:8 }}>Evidências já registradas</div>{existentes.map((e,i)=><div key={i} style={{ fontSize:12, fontFamily:"sans-serif", color:MUTED, padding:"6px 0", borderBottom:`0.5px solid ${BORDER}` }}>{e.tipo} · {e.desc.substring(0,60)}{e.desc.length>60?"...":""}</div>)}</div>}
        </div>
        <div style={s.btnRow}>
          <button style={s.btnG} onClick={salvar}>Salvar evidência</button>
          <button style={s.btnS} onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

// ─── MODAL CONQUISTA ─────────────────────────────────────────────
function AchievModal({ faixa, onClose }) {
  return (
    <div style={{ ...s.overlay, background:"rgba(20,18,12,0.82)" }} onClick={onClose}>
      <div style={{ ...s.modal, background:`linear-gradient(160deg, ${WHITE} 0%, ${GOLD_LIGHT} 100%)`, border:`2px solid ${GOLD}`, boxShadow:`0 0 0 1px rgba(184,150,62,0.3), 0 30px 80px rgba(184,150,62,0.4), 0 0 60px rgba(184,150,62,0.25)`, position:"relative", overflow:"hidden", maxWidth:480 }} onClick={e=>e.stopPropagation()}>
        <div style={{ position:"absolute", top:-60, left:"50%", transform:"translateX(-50%)", width:240, height:240, borderRadius:"50%", background:`radial-gradient(circle, ${GOLD} 0%, transparent 70%)`, opacity:0.22 }} />
        <div style={{ position:"absolute", top:0, left:0, right:0, height:4, background:`linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
        <div style={{ fontSize:10, fontFamily:"sans-serif", color:GOLD, letterSpacing:4, textTransform:"uppercase", marginBottom:8 }}>✦ Comunidade LEAD ✦</div>
        <div style={{ fontSize:12, fontFamily:"sans-serif", color:GOLD, letterSpacing:3, textTransform:"uppercase", marginBottom:24, fontWeight:600 }}>Nova Insígnia Desbloqueada</div>
        <div style={{ display:"flex", justifyContent:"center", marginBottom:24, position:"relative" }}>
          <div style={{ position:"absolute", width:200, height:90, borderRadius:"50%", background:`radial-gradient(ellipse, rgba(255,255,255,0.6) 0%, transparent 70%)`, top:"50%", left:"50%", transform:"translate(-50%,-50%)" }} />
          <FaixaIcon faixa={faixa} size={180}/>
        </div>
        <div style={{ fontSize:22, color:CHARCOAL, marginBottom:6, fontWeight:600 }}>{faixa.nome}</div>
        <div style={{ fontSize:13, fontFamily:"sans-serif", color:GOLD, marginBottom:24, fontStyle:"italic" }}>{faixa.subtitulo}</div>
        <p style={{ fontSize:14, fontFamily:"sans-serif", color:CHARCOAL, lineHeight:1.8, whiteSpace:"pre-line", marginBottom:20 }}>{faixa.mensagemDesbloqueio}</p>
        <div style={{ height:1, background:`linear-gradient(90deg, transparent, ${GOLD}, transparent)`, opacity:0.4, margin:"20px 0" }} />
        <p style={{ fontSize:12, fontFamily:"sans-serif", color:MUTED, lineHeight:1.7, marginBottom:28, fontStyle:"italic" }}>Essa conquista representa sua consistência, sua intenção pedagógica e seu compromisso com uma experiência infantil mais organizada, segura e valiosa.</p>
        <button style={{ ...s.btnG, boxShadow:"0 8px 20px rgba(184,150,62,0.4)", padding:"16px 40px" }} onClick={onClose}>Continuar minha jornada</button>
      </div>
    </div>
  );
}

// ─── ADMIN VIEW ───────────────────────────────────────────────────
function AdminView({ history, jornada, progGeral, onBack }) {
  const total = history.length;
  if (total === 0) return (
    <div style={s.app}><div style={s.wrap}>
      <div style={s.hdr}><div style={s.logo}>Equipe LEAD · Visão estratégica</div><h1 style={s.h1}>Visão da Equipe LEAD</h1></div>
      <div style={{ textAlign:"center", padding:40 }}><p style={{ fontSize:13, fontFamily:"sans-serif", color:MUTED }}>Nenhum dado disponível ainda.</p><button style={{ ...s.btnS, marginTop:20 }} onClick={onBack}>← Voltar</button></div>
    </div></div>
  );

  const { resultados, faixaAtual, mesesCons } = progGeral;
  const avgAlunos = Math.round(history.reduce((s,h)=>s+(parseInt(h.alunosFinal)||0),0)/total);
  const totalNovos = history.reduce((s,h)=>s+(parseInt(h.novosAlunos)||0),0);
  const retList = history.filter(h=>h.taxaRetencao!==null).map(h=>h.taxaRetencao);
  const avgRet = retList.length?Math.round(retList.reduce((a,b)=>a+b,0)/retList.length):null;
  const atencao=history.filter(h=>h.zone==="atenção").length, ajuste=history.filter(h=>h.zone==="ajuste").length, crescimento=history.filter(h=>h.zone==="crescimento").length;
  const prios = {}; history.forEach(h=>{ if(h.prioridade) prios[h.prioridade]=(prios[h.prioridade]||0)+1; });
  const topPrios = Object.entries(prios).sort((a,b)=>b[1]-a[1]).slice(0,3);

  const checksCounts = (faixaId, itemId) => { const c = (jornada.checklists[faixaId]||{})[itemId]; return c ? 1 : 0; };

  return (
    <div style={s.app}><div style={s.wrap}>
      <div style={s.hdr}><div style={s.logo}>Equipe LEAD · Visão estratégica</div><h1 style={s.h1}>Visão da Equipe LEAD</h1><div style={s.sub}>Painel estratégico da Comunidade LEAD</div></div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:24 }}>
        <div style={s.mc}><div style={s.mv}>{total}</div><div style={s.ml}>Registros</div></div>
        <div style={s.mc}><div style={s.mv}>{avgAlunos}</div><div style={s.ml}>Média alunos</div></div>
        <div style={s.mc}><div style={{ ...s.mv, color:"#1E8449" }}>+{totalNovos}</div><div style={s.ml}>Novos alunos</div></div>
        <div style={s.mc}><div style={{ ...s.mv, color:GOLD }}>{avgRet!==null?avgRet+"%":"—"}</div><div style={s.ml}>Média retenção</div></div>
      </div>
      <div style={s.card}>
        <div style={s.secTitle}>Zonas LEAD</div>
        {[["atenção","Zona de Atenção","#922B21",atencao],["ajuste","Zona de Ajuste","#B7770D",ajuste],["crescimento","Zona de Crescimento","#1E8449",crescimento]].map(([z,lbl,cor,cnt])=>(
          <div key={z} style={s.barRow}><div style={{ ...s.barLbl, color:cor }}>{lbl}</div><div style={s.barTr}><div style={s.barFl(total?(cnt/total)*100:0,cor)} /></div><div style={{ fontSize:12, fontFamily:"sans-serif", color:MUTED, width:24, textAlign:"right" }}>{cnt}</div></div>
        ))}
      </div>
      <div style={s.card}>
        <div style={s.secTitle}>Distribuição por faixa LEAD</div>
        {FAIXAS.map(f=>{
          const res = resultados.find(r=>r.faixa.id===f.id);
          return <div key={f.id} style={s.barRow}>
            <div style={s.barLbl}>{f.nome}</div>
            <div style={s.barTr}><div style={s.barFl(res.desbloqueada?100:res.pct)} /></div>
            <div style={{ fontSize:12, fontFamily:"sans-serif", color:MUTED, width:32, textAlign:"right" }}>{res.pct}%</div>
          </div>;
        })}
      </div>
      <div style={s.card}>
        <div style={s.secTitle}>Aplicação do método</div>
        {[
          ["Implementaram 3 regras do tatame", checksCounts("azul","regras3")],
          ["Criaram desafio comportamental", checksCounts("roxa","pilarRoxa")],
          ["Fizeram post de posicionamento", checksCounts("marrom","postInsta")],
          ["Implementaram feedback aos pais", checksCounts("marrom","feedbackPais")],
          ["Documentaram caso de evolução", checksCounts("marrom","casoEvolucao")],
          ["Prontos para validação Faixa Preta", checksCounts("preta","validacaoLEAD")],
        ].map(([lbl, cnt])=>(
          <div key={lbl} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom:`0.5px solid ${BORDER}` }}>
            <span style={{ fontSize:13, fontFamily:"sans-serif", color:CHARCOAL }}>{lbl}</span>
            <span style={{ fontSize:10, fontFamily:"sans-serif", letterSpacing:1, padding:"3px 10px", borderRadius:20, background:GOLD_LIGHT, color:GOLD, textTransform:"uppercase" }}>{cnt > 0 ? "✓" : "—"}</span>
          </div>
        ))}
      </div>
      {topPrios.length>0&&<div style={s.card}>
        <div style={s.secTitle}>Principais prioridades</div>
        {topPrios.map(([p,n])=>(
          <div key={p} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom:`0.5px solid ${BORDER}` }}>
            <span style={{ fontSize:13, fontFamily:"sans-serif", color:CHARCOAL }}>{p}</span>
            <span style={{ fontSize:10, fontFamily:"sans-serif", letterSpacing:1, padding:"3px 10px", borderRadius:20, background:GOLD_LIGHT, color:GOLD, textTransform:"uppercase" }}>{n}x</span>
          </div>
        ))}
      </div>}
      <div style={{ textAlign:"center", marginTop:24 }}><p style={{ fontSize:11, fontStyle:"italic", color:MUTED, fontFamily:"sans-serif" }}>"É muito mais do que ensinar Jiu Jitsu. É sobre deixar legado."</p></div>
      <button style={{ ...s.btnS, marginTop:24 }} onClick={onBack}>← Voltar ao painel</button>
    </div></div>
  );
}
