const cardsArea = document.getElementById("cardsArea");
const pyqArea = document.getElementById("pyqArea");
const questionsArea = document.getElementById("questionsArea");
const pageSubtitle = document.getElementById("pageSubtitle");
const backBtn = document.getElementById("backBtn");
const searchInput = document.getElementById("searchInput");
const mouseGlow = document.querySelector(".mouse-glow");

let pageStack = [];
let currentQuestions = [];
let currentTitlePrefix = "📅 Previous Year Questions";

const chapterData = {
  letterToGod: {
    title: "A Letter to God",
    base: "a-letter-to-god",
    oral: true,
    exercise: true
  },

  nelsonMandela: {
    title: "Nelson Mandela",
    base: "nelson-mandela",
    oral: true,
    exercise: true
  },

  twoStoriesAboutFlying: {
    title: "Two Stories About Flying",
    base: "two-stories-about-flying",
    oral: false,
    exercise: true
  }
};

document.addEventListener("mousemove", (e) => {
  if (!mouseGlow) return;
  mouseGlow.style.left = e.clientX + "px";
  mouseGlow.style.top = e.clientY + "px";
});

const pages = {
  home: {
    subtitle: "Choose your class",
    cards: [
      { title: "📘 Class 10", desc: "CBSE Class 10 PYQs with answers", action: "class10" },
      { title: "📙 Class 12", desc: "Coming Soon", soon: true }
    ]
  },

  class10: {
    subtitle: "Class 10 Subjects",
    cards: [
      { title: "📖 English", desc: "First Flight & Footprints Without Feet", action: "english" },
      { title: "🧪 Science", desc: "Coming Soon", soon: true },
      { title: "📐 Maths", desc: "Coming Soon", soon: true },
      { title: "🌍 SST", desc: "Coming Soon", soon: true },
      { title: "💻 Computer Code 165", desc: "Coming Soon", soon: true },
      { title: "📕 Hindi", desc: "Coming Soon", soon: true }
    ]
  },

  english: {
    subtitle: "Class 10 English Books",
    cards: [
      { title: "📘 First Flight", desc: "Main textbook", action: "firstFlight" },
      { title: "📙 Footprints Without Feet", desc: "Coming Soon", soon: true }
    ]
  },

  firstFlight: {
    subtitle: "First Flight Chapters",
    cards: [
      { title: "Ch-1 A Letter to God", desc: "PYQs, Oral Comprehension & Exercises", action: "menu:letterToGod" },
      { title: "Ch-2 Nelson Mandela", desc: "PYQs, Oral Comprehension & Exercises", action: "menu:nelsonMandela" },
      {
        title: "Ch-3 Two Stories About Flying",
        desc: "PYQs Available",
        action: "menu:twoStoriesAboutFlying"
      },
      { title: "Ch-4 From the Diary of Anne Frank", desc: "Coming Soon", soon: true },
      { title: "Ch-5 Glimpses of India", desc: "Coming Soon", soon: true },
      { title: "Ch-6 Mijbil the Otter", desc: "Coming Soon", soon: true },
      { title: "Ch-7 Madam Rides the Bus", desc: "Coming Soon", soon: true },
      { title: "Ch-8 The Sermon at Benares", desc: "Coming Soon", soon: true },
      { title: "Ch-9 The Proposal", desc: "Coming Soon", soon: true }
    ]
  }
};

function renderPage(pageName, push = true) {
  if (push) pageStack.push(pageName);

  pyqArea.classList.add("hidden");
  cardsArea.classList.remove("hidden");
  cardsArea.innerHTML = "";
  questionsArea.innerHTML = "";
  searchInput.value = "";

  const page = pages[pageName];

  if (!page) {
    pageSubtitle.textContent = "Page not found";
    cardsArea.innerHTML = `<p style="text-align:center;">Page not found.</p>`;
    return;
  }

  pageSubtitle.textContent = page.subtitle;
  backBtn.classList.toggle("hidden", pageStack.length <= 1);

  page.cards.forEach(card => createCard(card));
}

function renderChapterMenu(chapterKey) {
  const chapter = chapterData[chapterKey];
  if (!chapter) return;

  pageStack.push(`menu:${chapterKey}`);

  pyqArea.classList.add("hidden");
  cardsArea.classList.remove("hidden");
  cardsArea.innerHTML = "";
  questionsArea.innerHTML = "";
  searchInput.value = "";

  pageSubtitle.textContent = chapter.title;
  backBtn.classList.remove("hidden");

  const menuCards = [
  {
    title: "📅 PYQs",
    desc: "Previous Year Questions",
    action: `pyq:${chapterKey}`
  }
];

if (chapter.oral) {
  menuCards.push({
    title: "🎤 Oral Comprehension",
    desc: "NCERT Oral Questions",
    action: `oral:${chapterKey}`
  });
}

if (chapter.exercise) {
  menuCards.push({
    title: "📝 Exercise Questions",
    desc: "NCERT Back Exercise",
    action: `exercise:${chapterKey}`
  });
}

menuCards.forEach(card => createCard(card));
}

function createCard(card) {
  const div = document.createElement("div");
  div.className = "card" + (card.soon ? " soon" : "");

  div.innerHTML = `
    <div class="card-content">
      <h2>${card.title}</h2>
      <p>${card.desc}</p>
      <div class="enter">${card.soon ? "🚧 Coming Soon" : "ENTER →"}</div>
    </div>
  `;

  if (!card.soon) {
    div.onclick = () => handleAction(card.action);
  }

  cardsArea.appendChild(div);
}

function handleAction(action) {
  if (action.startsWith("menu:")) {
    renderChapterMenu(action.split(":")[1]);
  } else if (action.startsWith("pyq:")) {
    openChapterData(action.split(":")[1], "pyq");
  } else if (action.startsWith("oral:")) {
    openChapterData(action.split(":")[1], "oral");
  } else if (action.startsWith("exercise:")) {
    openChapterData(action.split(":")[1], "exercise");
  } else {
    renderPage(action);
  }
}

backBtn.onclick = () => {
  if (pageStack.length > 1) {
    pageStack.pop();
    const previous = pageStack.pop();

    if (previous.startsWith("menu:")) {
      renderChapterMenu(previous.split(":")[1]);
    } else {
      renderPage(previous, false);
    }
  }
};

async function openChapterData(chapterKey, section) {
  const chapter = chapterData[chapterKey];
  if (!chapter) return;

  pageStack.push(`${section}:${chapterKey}`);

  cardsArea.classList.add("hidden");
  pyqArea.classList.remove("hidden");
  backBtn.classList.remove("hidden");
  searchInput.value = "";

  let fileName = chapter.base;
  let title = "";
  let placeholder = "";

  if (section === "pyq") {
    fileName = `${chapter.base}.json`;
    title = `${chapter.title} - Previous Year Questions`;
    placeholder = "Search PYQs...";
    currentTitlePrefix = "📅 Previous Year Questions";
  }

  if (section === "oral") {
    fileName = `${chapter.base}-oral.json`;
    title = `${chapter.title} - Oral Comprehension`;
    placeholder = "Search oral comprehension...";
    currentTitlePrefix = "🎤 Oral Comprehension";
  }

  if (section === "exercise") {
    fileName = `${chapter.base}-exercise.json`;
    title = `${chapter.title} - Exercise Questions`;
    placeholder = "Search exercise questions...";
    currentTitlePrefix = "📝 Exercise Questions";
  }

  pageSubtitle.textContent = title;
  searchInput.placeholder = placeholder;

  try {
    const res = await fetch(`/data/class10/english/first-flight/${fileName}`);
    const data = await res.json();

    if (section === "pyq") {
      currentQuestions = data;
    } else {
      currentQuestions = data.map(item => ({
        year: item.page || item.section || title,
        marks: "NCERT",
        type: section === "oral" ? "Oral Comprehension" : "Exercise",
        question: item.question,
        answer: item.answer,
        source: item.page || item.section || "NCERT",
        verified: true
      }));
    }

    renderQuestions(currentTitlePrefix);
  } catch (error) {
    questionsArea.innerHTML = `<p>Failed to load ${chapter.title} ${section}.</p>`;
    console.error(error);
  }
}

function renderQuestions(titlePrefix = currentTitlePrefix) {
  const search = searchInput.value.toLowerCase();

  const filtered = currentQuestions.filter(q =>
    JSON.stringify(q).toLowerCase().includes(search)
  );

  const grouped = {};

  filtered.forEach(q => {
    const groupName = q.year || "Questions";
    if (!grouped[groupName]) grouped[groupName] = [];
    grouped[groupName].push(q);
  });

  questionsArea.innerHTML = "";

  const groups = Object.keys(grouped).sort((a, b) => {
    const numA = Number(a);
    const numB = Number(b);

    if (!isNaN(numA) && !isNaN(numB)) return numB - numA;

    return String(a).localeCompare(String(b), undefined, {
      numeric: true,
      sensitivity: "base"
    });
  });

  groups.forEach(year => {
    questionsArea.innerHTML += `<h2 class="year-title">${titlePrefix} [${year}]</h2>`;

    grouped[year].forEach((q, index) => {
      const cleanYear = String(year).replace(/\s/g, "-").replace(/[^\w-]/g, "");
      const id = `ans-${cleanYear}-${index}`;

      if (q.type === "Extract Based") {
        questionsArea.innerHTML += `
          <div class="question-card">
            <div class="meta">${q.type} • ${q.marks} Marks • Source: ${q.source}</div>

            <div class="extract-box">
              <b>Read the extract:</b><br><br>
              ${q.extract}
            </div>

            ${q.subQuestions.map((sq, i) => `
              <div class="sub-question">
                <div class="question"><b>${sq.no}</b> ${sq.question}</div>

                ${sq.options ? `
                  <div class="options">
                    <p>A. ${sq.options.A}</p>
                    <p>B. ${sq.options.B}</p>
                    <p>C. ${sq.options.C}</p>
                    <p>D. ${sq.options.D}</p>
                  </div>
                ` : ""}

                <button class="view" onclick="toggleAnswer('${id}-${i}', this)">👁 View Answer</button>

                <div class="answer" id="${id}-${i}">
                  ${sq.correctOption ? `<b>Correct Option:</b> ${sq.correctOption}<br><br>` : ""}
                  <b>Answer:</b><br>${sq.answer}
                </div>
              </div>
            `).join("")}
          </div>
        `;
      } else {
        questionsArea.innerHTML += `
          <div class="question-card">
            <div class="meta">${q.type} • ${q.marks} Marks • Source: ${q.source}</div>
            <div class="question"><b>Q.</b> ${q.question}</div>

            <button class="view" onclick="toggleAnswer('${id}', this)">👁 View Answer</button>

            <div class="answer" id="${id}">
              <b>Answer:</b><br>${q.answer}
            </div>
          </div>
        `;
      }
    });
  });

  if (filtered.length === 0) {
    questionsArea.innerHTML = "<p>No question found.</p>";
  }
}

function toggleAnswer(id, btn) {
  const ans = document.getElementById(id);
  if (!ans) return;

  ans.classList.toggle("show");
  btn.textContent = ans.classList.contains("show") ? "🙈 Hide Answer" : "👁 View Answer";
}

searchInput.addEventListener("input", () => renderQuestions(currentTitlePrefix));

renderPage("home", true);

/* particles */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

for (let i = 0; i < 90; i++) {
  particles.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.6,
    dy: (Math.random() - 0.5) * 0.6
  });
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(103,232,249,0.8)";
    ctx.fill();
  });

  requestAnimationFrame(animateParticles);
}

animateParticles();