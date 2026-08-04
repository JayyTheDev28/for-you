/* ============================================
   LOVE LETTER — main.js
   ============================================ */

// ── Letter content ─────────────────────────────────────────────────────────
const LETTER_PARAS = [
  "hiii loveeelovee, welcomee sa websitee na ginawa ko for youu. there's so much i want to say peroo ayoko sabihinn sayo in chats langg, so here i made a websitee to tell it to youu. i want to make you smilee kase andamii mo po pinag dadaanan, i hope you like this little effort na ginawa ko poo.",
  "loveeloveee i just want to tell you how thankful i am to youu, and i am beyond grateful for you po. i reallyy see your efforts po lovee to make up for what you did, i really see how much effort you are putting up to our relationship poo, and now i really knoww just how much i reallyy loveee youu bebe.",
  "thankyouu po for always being there when i am having trouble with everything po. thankyouu po for being there for me alwayss po. thankyouu lovee for listening to me when i yap about everythinn. thankyouu po for understanding me when there are times na hindi ko na rin maintindihan sarili ko.",
  "thankyouu po for not wasting the chance that i gave you to make up for everything. thankyouu soo much for everything po loveee. i just wantt you to know na you aree doing enoughh and you are doing soo great lovee on improving yourself. you are worthyy of lovingg again and be the happiest girll in the worldd. you aree speciall poo lalo sakenn bebe.",
  "and lovieee about po sa naiisip mo na you are not enough for everything lovee, no no no nooo noooo you areee doing great lovee. yes there were things you did na it would be unreversable pero you aree making up for it po lovee. to me lovee you are doing enough poo.",
  "and about naman po sa schoolworks loveelove koo, i really am proud of youu poo, you had so much progress since senior highschool you improved alot po lovee, sa pag rerevieww, scores sa examss, and quizzess, yung hardwork na binibigay mo poo. you're doing greatt loveee.",
  "dibaa dapat rememberr na we each have our own paces poo, hindi ka po nahuhulii lovieee, you are doing great poo. kahit mga friends mo po pag nakita progress mo ganon din po sasabihin nila sayo bebe. just keep doing what you're doing po lovee kase its enough poo. and alsoo im always here lang to help and support you po. kase i loveee youu veryy muchh.",
  "and i am so proud of what you havee right noww. dont be pressured na lovelovee koo, we'll have the future we alwayss wanted soon po. i loveee youu soo muchh.",
  "this is my messagee lovee, i want to cheer youu up kasee i know deep inside andami mo pong dinadalaa, you're just my sweett little babyy girl peroo andamii na poo. you can restt with me na lovee, i forgave youu, and im hereee., and i loveee youu veryy muchh. 🌸"
];

const LOVE_NOTES = [
  "You're beautiful ❤️", "I'm proud of you 🌸", "You're enough ❤️",
  "You matter so much 💕", "Keep going, love 🌷", "You're my favorite 🥰",
  "So grateful for you ✨", "You're doing great 💖"
];

const LOADING_MSGS = [
  "Preparing the surprise bebe... 🌸",
  "Loading lang po saglit... 💕",
  "Lapit na po loveelovee... ❤️"
];

// ── DOM refs ───────────────────────────────────────────────────────────────
const screens = {
  welcome:  document.getElementById('welcomeScreen'),
  loading:  document.getElementById('loadingScreen'),
  envelope: document.getElementById('envelopeScreen'),
  letter:   document.getElementById('letterScreen'),
  ending:   document.getElementById('endingScreen'),
};

const btnYes       = document.getElementById('btnYes');
const btnNo        = document.getElementById('btnNo');
const teaseMsg     = document.getElementById('teaseMsg');
const loadingText  = document.getElementById('loadingText');
const envelopeWrap = document.getElementById('envelopeWrap');
const envelopeFlap = document.getElementById('envelopeFlap');
const envelopeSeal = document.getElementById('envelopeSeal');
const letterPeek   = document.getElementById('letterPeek');
const letterBody   = document.getElementById('letterBody');
const btnReveal    = document.getElementById('btnReveal');
const finalMsg     = document.getElementById('finalMessage');
const thankYou     = document.getElementById('thankYou');
const musicBtn     = document.getElementById('musicBtn');
const audio        = document.getElementById('bgMusic');

// ── State ──────────────────────────────────────────────────────────────────
let noAttempts = 0;
let muted = false;
let noteInterval;

// ── Utility ────────────────────────────────────────────────────────────────
const rand = (min, max) => Math.random() * (max - min) + min;

function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
}

// ── Floating hearts background ─────────────────────────────────────────────
function initHeartsBackground() {
  const bg = document.getElementById('heartsBg');
  const emojis = ['🩷','💕','💗','💖','🌸','✨'];
  for (let i = 0; i < 18; i++) {
    const h = document.createElement('div');
    h.className = 'heart-float';
    h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    h.style.left              = rand(0, 100) + '%';
    h.style.fontSize          = rand(14, 28) + 'px';
    h.style.animationDuration = rand(8, 18) + 's';
    h.style.animationDelay    = rand(0, 12) + 's';
    bg.appendChild(h);
  }
}

// ── Sparkles on mouse move ─────────────────────────────────────────────────
let lastSparkle = 0;
function spawnSparkle(x, y) {
  const now = Date.now();
  if (now - lastSparkle < 220) return;
  lastSparkle = now;
  const s = document.createElement('div');
  s.className = 'sparkle';
  s.textContent = ['✨','💫','🌸','⭐'][Math.floor(Math.random() * 4)];
  s.style.left = (x + rand(-18, 18)) + 'px';
  s.style.top  = (y + rand(-18, 18)) + 'px';
  document.body.appendChild(s);
  setTimeout(() => s.remove(), 2000);
}
document.addEventListener('mousemove', e => spawnSparkle(e.clientX, e.clientY));

// ── Love notes ─────────────────────────────────────────────────────────────
function spawnLoveNote() {
  const note = document.createElement('div');
  note.className = 'love-note';
  note.textContent = LOVE_NOTES[Math.floor(Math.random() * LOVE_NOTES.length)];
  note.style.left   = rand(5, 75) + '%';
  note.style.bottom = rand(10, 40) + '%';
  document.body.appendChild(note);
  setTimeout(() => note.remove(), 5000);
}

// ── Music ──────────────────────────────────────────────────────────────────
musicBtn.addEventListener('click', () => {
  muted = !muted;
  audio.muted = muted;
  musicBtn.textContent = muted ? '🔇' : '🎵';
  if (!muted && audio.paused) audio.play().catch(() => {});
});

function tryPlayMusic() {
  audio.volume = 0.35;
  audio.loop   = true;
  audio.play().catch(() => {});
}

// ── SCREEN 1: Welcome ──────────────────────────────────────────────────────
function initWelcome() {
  showScreen('welcome');
  // align No button with Yes button
  const yesRect = btnYes.getBoundingClientRect();
  btnNo.style.top    = yesRect.top + 'px';
  btnNo.style.left   = (yesRect.right + 20) + 'px';
  btnNo.style.height = yesRect.height + 'px';
}

// No button moves only on click / tap
btnNo.addEventListener('click', handleNoClick);
btnNo.addEventListener('touchstart', e => { e.preventDefault(); handleNoClick(); }, { passive: false });

function handleNoClick() {
  noAttempts++;
  if (noAttempts >= 5) {
    teaseMsg.textContent = 'Hehe... wala kang choice 😝';
    teaseMsg.classList.add('show');
    setTimeout(() => { btnNo.style.display = 'none'; }, 1800);
    return;
  }
  const margin = 60;
  const x = rand(margin, window.innerWidth  - margin - btnNo.offsetWidth);
  const y = rand(margin, window.innerHeight - margin - btnNo.offsetHeight);
  btnNo.style.left = x + 'px';
  btnNo.style.top  = y + 'px';
  const msgs = ['bawal po lovelovee 🙈', 'yes po dapattt ❤️', 'wag po noo 😤', 'ihhh yess mo naa 😝', 'yes mo na bebee 💕'];
  teaseMsg.textContent = msgs[Math.min(noAttempts - 1, msgs.length - 1)];
  teaseMsg.classList.add('show');
  setTimeout(() => teaseMsg.classList.remove('show'), 2500);
}

btnYes.addEventListener('click', () => {
  tryPlayMusic();
  startLoading();
});

// ── SCREEN 2: Loading ──────────────────────────────────────────────────────
function startLoading() {
  showScreen('loading');
  let i = 0;
  loadingText.textContent = LOADING_MSGS[0];
  const iv = setInterval(() => {
    i++;
    if (i < LOADING_MSGS.length) {
      loadingText.textContent = LOADING_MSGS[i];
    } else {
      clearInterval(iv);
      setTimeout(showEnvelope, 900);
    }
  }, 1400);
}

// ── SCREEN 3: Envelope ────────────────────────────────────────────────────
function showEnvelope() {
  showScreen('envelope');
  noteInterval = setInterval(spawnLoveNote, 4000);
}

envelopeWrap.addEventListener('click', openEnvelope);

function openEnvelope() {
  envelopeWrap.removeEventListener('click', openEnvelope);
  envelopeSeal.style.opacity = '0';
  envelopeFlap.classList.add('open');
  setTimeout(() => letterPeek.classList.add('rise'), 600);
  setTimeout(showLetter, 2000);
}

// ── SCREEN 4: Letter ──────────────────────────────────────────────────────
function showLetter() {
  showScreen('letter');
  letterBody.innerHTML = '';

  const paras = LETTER_PARAS.map(text => {
    const p = document.createElement('p');
    p.className = 'letter-para';
    p.dataset.text = text;
    letterBody.appendChild(p);
    return p;
  });

  const sign = document.createElement('p');
  sign.className = 'letter-sign';
  sign.textContent = '— Loveeyy 🌸';
  letterBody.appendChild(sign);

  typeParas(paras, 0, sign);
}

function typeParas(paras, idx, sign) {
  if (idx >= paras.length) {
    sign.classList.add('visible');
    setTimeout(showEnding, 10000);
    return;
  }
  const p = paras[idx];
  p.classList.add('visible');
  setTimeout(() => p.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);

  const text = p.dataset.text;
  let charIdx = 0;
  const typingCursor = document.createElement('span');
  typingCursor.className = 'typing-cursor';
  p.appendChild(typingCursor);

  const iv = setInterval(() => {
    if (charIdx < text.length) {
      typingCursor.before(text[charIdx++]);
    } else {
      clearInterval(iv);
      typingCursor.remove();
      setTimeout(() => typeParas(paras, idx + 1, sign), 700);
    }
  }, 55);
}

// ── SCREEN 5: Ending ──────────────────────────────────────────────────────
function showEnding() {
  clearInterval(noteInterval);
  showScreen('ending');
}

btnReveal.addEventListener('click', () => {
  btnReveal.style.display = 'none';
  finalMsg.style.display = 'block';
  requestAnimationFrame(() => {
    finalMsg.classList.add('show');
    thankYou.classList.add('show');
  });
  launchConfetti();
  for (let i = 0; i < 5; i++) setTimeout(spawnLoveNote, i * 600);
});

// ── Confetti ───────────────────────────────────────────────────────────────
function launchConfetti() {
  const colors = ['#b07fe0','#d0b0f0','#e8d5ff','#8b5cf6','#f5f0ff','#7c3aed'];
  const emojis = ['🩷','💕','💖','🌸','✨'];
  for (let i = 0; i < 80; i++) {
    setTimeout(() => {
      const isEmoji = Math.random() > 0.5;
      const el = document.createElement('div');
      el.className = 'confetti-piece';
      if (isEmoji) {
        el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        el.style.background = 'transparent';
        el.style.fontSize = rand(14, 22) + 'px';
        el.style.width = el.style.height = 'auto';
      } else {
        el.style.background = colors[Math.floor(Math.random() * colors.length)];
        el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      }
      el.style.left = rand(0, 100) + 'vw';
      el.style.animationDuration = rand(2.5, 5) + 's';
      el.style.animationDelay    = rand(0, 1.5) + 's';
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 6500);
    }, i * 40);
  }
}

// ── Init ───────────────────────────────────────────────────────────────────
initHeartsBackground();
initWelcome();
