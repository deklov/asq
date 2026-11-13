// Anton's Story Quest: pick a book, read a chapter, answer questions, earn Robux.
// All progress lives in this browser's localStorage; the server only serves files.

const STORE_KEY = "asq-v1";
const DEFAULTS = {
  robuxPerAnswer: 5,  // first-try correct answer
  robuxRetry: 2,      // correct on the second try
  earned: 0,          // total Robux ever earned
  paid: 0,            // total Robux the parent has handed out
  answered: {},       // "bookId/chapter/question" -> true once earned
  stars: {},          // "bookId/chapter" -> best stars (0-3)
  history: [],        // [{date, text}]
};

let state = load();

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY));
    if (saved) return { ...DEFAULTS, ...saved };
  } catch (e) { /* fall through */ }
  return structuredClone(DEFAULTS);
}
function save() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
}
function log(text) {
  state.history.unshift({ date: new Date().toISOString(), text });
  state.history = state.history.slice(0, 200);
}

const app = document.getElementById("app");
const balance = () => state.earned - state.paid;

function updateWallet(bump) {
  document.getElementById("walletAmount").textContent = balance();
  if (bump) {
    const w = document.getElementById("wallet");
    w.classList.remove("bump");
    void w.offsetWidth;
    w.classList.add("bump");
  }
}

// ---------- Speech ----------
let voice = null;
function pickVoice() {
  const voices = speechSynthesis.getVoices();
  voice = voices.find(v => /en[-_](US|GB)/i.test(v.lang) && /natural|google|samantha|daniel/i.test(v.name))
    || voices.find(v => /^en/i.test(v.lang)) || null;
}
if ("speechSynthesis" in window) {
  pickVoice();
  speechSynthesis.onvoiceschanged = pickVoice;
}
function speak(text, rate = 0.85) {
  if (!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  if (voice) u.voice = voice;
  u.lang = voice ? voice.lang : "en-US";
  u.rate = rate;
  speechSynthesis.speak(u);
  return u;
}

// ---------- Helpers ----------
const esc = s => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const shuffle = a => {
  a = [...a];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const starText = n => "⭐".repeat(n) + "☆".repeat(3 - n);
const bookById = id => BOOKS.find(b => b.id === id);

function confetti() {
  const box = document.getElementById("confetti");
  const colors = ["#ff7a00", "#4caf50", "#3f51b5", "#e53935", "#f9a825", "#00bcd4"];
  for (let i = 0; i < 60; i++) {
    const c = document.createElement("div");
    c.className = "confetto";
    c.style.left = Math.random() * 100 + "vw";
    c.style.background = colors[i % colors.length];
    c.style.animationDelay = Math.random() * 0.6 + "s";
    box.append(c);
    setTimeout(() => c.remove(), 3000);
  }
}

// Wrap every word so it can be tapped to hear it.
function wordify(text) {
  return text.split(/\n\s*\n/).map(para =>
    "<p>" + para.trim().split(/\s+/).map(w =>
      `<span class="word" data-say="${esc(w.replace(/[^\p{L}\p{N}'-]/gu, ""))}">${esc(w)}</span>`
    ).join(" ") + "</p>"
  ).join("");
}

// ---------- Routing ----------
function go(hash) { location.hash = hash; }
function route() {
  speechSynthesis?.cancel?.();
  const [view, bookId, ch] = location.hash.replace(/^#\/?/, "").split("/");
  window.scrollTo(0, 0);
  if (view === "book" && bookById(bookId)) return showBook(bookById(bookId));
  if (view === "read" && bookById(bookId) && bookById(bookId).chapters[ch]) return showRead(bookById(bookId), +ch);
  if (view === "parents") return showParentGate();
  showHome();
}
window.addEventListener("hashchange", route);
document.getElementById("homeBtn").onclick = () => go("");
document.getElementById("parentBtn").onclick = () => go("parents");

// ---------- Screens ----------
function bookProgress(book) {
  const done = book.chapters.filter((_, i) => state.stars[`${book.id}/${i}`] !== undefined).length;
  return { done, total: book.chapters.length };
}

function showHome() {
  const hour = new Date().getHours();
  const hello = hour < 12 ? "Good morning" : hour < 18 ? "Hi" : "Good evening";
  app.innerHTML = `
    <h2>${hello}, Anton! 👋</h2>
    <p class="subtitle">Pick a book to read. Answer questions to earn Robux!</p>
    <div class="shelf">
      ${BOOKS.map(b => {
        const p = bookProgress(b);
        return `<button class="book" style="background:${b.color}" data-id="${b.id}">
          <span class="emoji">${b.emoji}</span>
          <span class="title">${esc(b.title)}</span>
          <div class="progress"><div style="width:${(100 * p.done) / p.total}%"></div></div>
          <span class="progress-label">${p.done} of ${p.total} chapters</span>
        </button>`;
      }).join("")}
    </div>`;
  app.querySelectorAll(".book").forEach(el => (el.onclick = () => go(`book/${el.dataset.id}`)));
}

function showBook(book) {
  app.innerHTML = `
    <h2>${book.emoji} ${esc(book.title)}</h2>
    <div class="chapters">
      ${book.chapters.map((c, i) => {
        const s = state.stars[`${book.id}/${i}`];
        return `<button class="chapter" data-i="${i}">
          <span class="num" style="background:${book.color}">${i + 1}</span>
          <span class="name">${esc(c.title)}</span>
          <span class="stars">${s === undefined ? "" : starText(s)}</span>
        </button>`;
      }).join("")}
    </div>`;
  app.querySelectorAll(".chapter").forEach(el => (el.onclick = () => go(`read/${book.id}/${el.dataset.i}`)));
}

function showRead(book, chIndex) {
  const ch = book.chapters[chIndex];
  app.innerHTML = `
    <h2>${book.emoji} ${esc(ch.title)}</h2>
    <div class="story">${wordify(ch.text)}</div>
    <p class="hint">💡 Tricky word? Tap it to hear it.</p>
    <div class="actions">
      <button class="btn big" id="toQuiz">I'm done reading! ➜</button>
    </div>`;
  bindWords();
  app.querySelector("#toQuiz").onclick = () => startQuiz(book, chIndex);
}

function bindWords() {
  app.querySelectorAll(".word").forEach(el => (el.onclick = () => {
    app.querySelectorAll(".word.speaking").forEach(w => w.classList.remove("speaking"));
    el.classList.add("speaking");
    const u = speak(el.dataset.say, 0.7);
    if (u) u.onend = () => el.classList.remove("speaking");
  }));
}

function startQuiz(book, chIndex) {
  const quiz = { book, chIndex, qIndex: 0, firstTry: 0, earnedNow: 0 };
  showQuestion(quiz);
}

function showQuestion(quiz) {
  const { book, chIndex, qIndex } = quiz;
  const ch = book.chapters[chIndex];
  const q = ch.questions[qIndex];
  const key = `${book.id}/${chIndex}/${qIndex}`;
  const correct = q.choices[0];
  let tries = 0;
  window.scrollTo(0, 0);

  app.innerHTML = `
    <h2>${book.emoji} ${esc(ch.title)}</h2>
    <div class="question">
      <div class="qcount">Question ${qIndex + 1} of ${ch.questions.length}</div>
      <p class="q">${esc(q.q)}</p>
      <div class="choices">
        ${shuffle(q.choices).map(c => `<button class="choice" data-c="${esc(c)}">${esc(c)}</button>`).join("")}
      </div>
      <div class="feedback" id="feedback"></div>
    </div>
    <div class="actions">
      <button class="btn secondary" id="hearQ">🔊 Read the question</button>
      <button class="btn secondary" id="peek">📖 Look at the story again</button>
    </div>
    <div class="story" id="peekText" style="display:none;margin-top:16px">${wordify(ch.text)}</div>`;
  bindWords();

  const fb = app.querySelector("#feedback");
  app.querySelector("#hearQ").onclick = () => speak(q.q + " " + [...app.querySelectorAll(".choice")].map(b => b.dataset.c).join(". Or, "));
  app.querySelector("#peek").onclick = () => {
    const p = app.querySelector("#peekText");
    p.style.display = p.style.display === "none" ? "block" : "none";
  };

  app.querySelectorAll(".choice").forEach(btn => (btn.onclick = () => {
    tries++;
    if (btn.dataset.c !== correct) {
      btn.classList.add("wrong");
      btn.disabled = true;
      fb.className = "feedback bad";
      fb.textContent = tries === 1 ? "Not quite. Try again! You can look at the story. 🙂" : "Hmm, not that one either.";
      if (tries >= 2) reveal();
      return;
    }
    btn.classList.add("correct");
    let reward = 0;
    if (!state.answered[key]) {
      reward = tries === 1 ? state.robuxPerAnswer : state.robuxRetry;
      if (reward > 0) {
        state.answered[key] = true;
        state.earned += reward;
        quiz.earnedNow += reward;
        log(`+${reward} R$ — ${book.title}: "${q.q}"`);
        save();
        updateWallet(true);
      }
    }
    if (tries === 1) quiz.firstTry++;
    fb.className = "feedback good";
    const cheers = ["Awesome! 🎉", "You got it! 🌟", "Super reader! 🚀", "Yes! Great job! 💪", "Correct! 🦖"];
    fb.textContent = cheers[Math.floor(Math.random() * cheers.length)] + (reward ? `  +${reward} R$` : "");
    finish();
  }));

  function reveal() {
    app.querySelectorAll(".choice").forEach(b => {
      b.disabled = true;
      if (b.dataset.c === correct) b.classList.add("correct");
    });
    fb.className = "feedback bad";
    fb.textContent = `The answer is: ${correct}. You'll get the next one!`;
    finish();
  }

  function finish() {
    app.querySelectorAll(".choice").forEach(b => (b.disabled = true));
    const next = document.createElement("button");
    next.className = "btn big";
    next.style.marginTop = "12px";
    next.textContent = "Next ➜";
    next.onclick = () => {
      quiz.qIndex++;
      if (quiz.qIndex < ch.questions.length) showQuestion(quiz);
      else showDone(quiz);
    };
    fb.after(next);
    next.focus();
  }
}

function showDone(quiz) {
  const { book, chIndex, firstTry, earnedNow } = quiz;
  const total = book.chapters[chIndex].questions.length;
  const stars = firstTry === total ? 3 : firstTry > 0 ? 2 : 1;
  const key = `${book.id}/${chIndex}`;
  state.stars[key] = Math.max(state.stars[key] ?? 0, stars);
  save();
  if (stars === 3) confetti();

  const nextCh = chIndex + 1 < book.chapters.length ? chIndex + 1 : null;
  const bookDone = bookProgress(book).done === book.chapters.length;
  app.innerHTML = `
    <div class="done">
      <h2>${stars === 3 ? "Perfect! 🏆" : "Chapter done! 🎉"}</h2>
      <div class="big-stars">${starText(stars)}</div>
      <p class="earned">${earnedNow ? `You earned <b>${earnedNow} Robux</b>!` : "You already earned the Robux for this chapter. Reading it again makes you stronger! 💪"}</p>
      <p class="earned">Your Robux: <b>${balance()} R$</b></p>
      ${bookDone && !nextCh ? `<p class="earned">You finished the whole book! 📚</p>` : ""}
      <div class="actions">
        ${nextCh !== null ? `<button class="btn big" id="next">Next chapter ➜</button>` : ""}
        <button class="btn secondary" id="again">Read again</button>
        <button class="btn secondary" id="shelf">Pick another book</button>
      </div>
    </div>`;
  app.querySelector("#next")?.addEventListener("click", () => go(`read/${book.id}/${nextCh}`));
  app.querySelector("#again").onclick = () => route();
  app.querySelector("#shelf").onclick = () => go("");
}

// ---------- Parents ----------
let parentUnlocked = false;

function showParentGate() {
  if (parentUnlocked) return showParents();
  const a = 12 + Math.floor(Math.random() * 20);
  const b = 3 + Math.floor(Math.random() * 7);
  app.innerHTML = `
    <h2>👪 For grown-ups</h2>
    <div class="panel">
      <p>What is ${a} × ${b}?</p>
      <input id="gate" type="number" inputmode="numeric" autofocus>
      <button class="btn" id="gateBtn">OK</button>
    </div>`;
  const check = () => {
    if (+app.querySelector("#gate").value === a * b) { parentUnlocked = true; showParents(); }
    else go("");
  };
  app.querySelector("#gateBtn").onclick = check;
  app.querySelector("#gate").onkeydown = e => e.key === "Enter" && check();
}

function showParents() {
  const chaptersDone = Object.keys(state.stars).length;
  const totalChapters = BOOKS.reduce((n, b) => n + b.chapters.length, 0);
  app.innerHTML = `
    <h2>👪 For grown-ups</h2>
    <div class="panel">
      <div class="stat-row">
        <div class="stat">Owed to Anton<b>${balance()} R$</b></div>
        <div class="stat">Earned in total<b>${state.earned} R$</b></div>
        <div class="stat">Paid out<b>${state.paid} R$</b></div>
        <div class="stat">Chapters read<b>${chaptersDone} / ${totalChapters}</b></div>
      </div>
    </div>
    <div class="panel">
      <h3>Pay out Robux</h3>
      <p>When you buy Robux for Anton (e.g. a Roblox gift card or in the Roblox app), record it here so his balance goes down.</p>
      <input id="payAmount" type="number" min="1" value="${balance()}"> R$
      <button class="btn" id="payBtn">Mark as paid</button>
    </div>
    <div class="panel">
      <h3>Rewards</h3>
      <p>Robux for a correct answer on the first try:
        <input id="rFirst" type="number" min="0" value="${state.robuxPerAnswer}"></p>
      <p>Robux for a correct answer on the second try:
        <input id="rRetry" type="number" min="0" value="${state.robuxRetry}"></p>
      <p class="hint">Each question pays only once. Right now all ${BOOKS.length} books are worth up to
        ${BOOKS.reduce((n, b) => n + b.chapters.reduce((m, c) => m + c.questions.length, 0), 0) * state.robuxPerAnswer} R$.</p>
      <button class="btn" id="saveRates">Save</button>
    </div>
    <div class="panel">
      <h3>History</h3>
      <div class="history">${state.history.map(h => `<div>${new Date(h.date).toLocaleString()} — ${esc(h.text)}</div>`).join("") || "Nothing yet."}</div>
    </div>
    <div class="panel">
      <h3>Reset</h3>
      <button class="btn secondary" id="reset">Reset all progress and Robux</button>
    </div>`;

  app.querySelector("#payBtn").onclick = () => {
    const n = Math.floor(+app.querySelector("#payAmount").value);
    if (n > 0) {
      state.paid += n;
      log(`Paid out ${n} R$`);
      save();
      updateWallet();
      showParents();
    }
  };
  app.querySelector("#saveRates").onclick = () => {
    state.robuxPerAnswer = Math.max(0, Math.floor(+app.querySelector("#rFirst").value));
    state.robuxRetry = Math.max(0, Math.floor(+app.querySelector("#rRetry").value));
    save();
    showParents();
  };
  app.querySelector("#reset").onclick = () => {
    if (confirm("Really erase all progress and Robux?")) {
      state = structuredClone(DEFAULTS);
      save();
      updateWallet();
      showParents();
    }
  };
}

updateWallet();
route();
