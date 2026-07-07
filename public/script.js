const cardsArea = document.getElementById("cardsArea");
const pyqArea = document.getElementById("pyqArea");
const questionsArea = document.getElementById("questionsArea");
const pageSubtitle = document.getElementById("pageSubtitle");
const backBtn = document.getElementById("backBtn");
const searchInput = document.getElementById("searchInput");
const mouseGlow = document.querySelector(".mouse-glow");

let pageStack = [];
let currentQuestions = [];

document.addEventListener("mousemove", (e) => {
  mouseGlow.style.left = e.clientX + "px";
  mouseGlow.style.top = e.clientY + "px";
});

const pages = {
  home: {
    subtitle: "Choose your class",
    cards: [
      {
        title: "📘 Class 10",
        desc: "CBSE Class 10 PYQs with answers",
        action: "class10"
      },
      {
        title: "📙 Class 12",
        desc: "Coming Soon",
        soon: true
      }
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
      { title: "Ch-1 A Letter to God", desc: "Previous Year Questions", action: "letterToGod" },
      { title: "Ch-2 Nelson Mandela", desc: "Coming Soon", soon: true },
      { title: "Ch-3 Two Stories About Flying", desc: "Coming Soon", soon: true },
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

  const page = pages[pageName];
  pageSubtitle.textContent = page.subtitle;

  backBtn.classList.toggle("hidden", pageStack.length <= 1);

  page.cards.forEach(card => {
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
      div.onclick = () => {
        if (card.action === "letterToGod") {
          openLetterToGod();
        } else {
          renderPage(card.action);
        }
      };
    }

    cardsArea.appendChild(div);
  });
}

backBtn.onclick = () => {
  if (pageStack.length > 1) {
    pageStack.pop();
    const previous = pageStack.pop();
    renderPage(previous);
  }
};

async function openLetterToGod() {
  pageStack.push("letterToGod");

  cardsArea.classList.add("hidden");
  pyqArea.classList.remove("hidden");
  backBtn.classList.remove("hidden");

  pageSubtitle.textContent = "A Letter to God - Previous Year Questions";

  try {
    const res = await fetch("/data/class10/english/first-flight/a-letter-to-god.json");
    currentQuestions = await res.json();
    renderQuestions();
  } catch (error) {
    questionsArea.innerHTML = "<p>Failed to load questions.</p>";
    console.error(error);
  }
}

function renderQuestions() {
  const search = searchInput.value.toLowerCase();

  const filtered = currentQuestions.filter(q =>
    q.question.toLowerCase().includes(search) ||
    q.answer.toLowerCase().includes(search) ||
    String(q.year).includes(search)
  );

  const grouped = {};

  filtered.forEach(q => {
    if (!grouped[q.year]) grouped[q.year] = [];
    grouped[q.year].push(q);
  });

  questionsArea.innerHTML = "";

  Object.keys(grouped).sort((a, b) => b - a).forEach(year => {
    questionsArea.innerHTML += `<h2 class="year-title">📅 Previous Year Questions [${year}]</h2>`;

    grouped[year].forEach((q, index) => {
      const id = `ans-${year}-${index}`;

      questionsArea.innerHTML += `
        <div class="question-card">
          <div class="meta">Class 10 • English • First Flight • ${q.marks} Marks • Source: ${q.source}</div>
          <div class="question"><b>Q.</b> ${q.question}</div>
          <button class="view" onclick="toggleAnswer('${id}', this)">👁 View Answer</button>
          <div class="answer" id="${id}">
            <b>Answer:</b><br>${q.answer}
          </div>
        </div>
      `;
    });
  });

  if (filtered.length === 0) {
    questionsArea.innerHTML = "<p>No question found.</p>";
  }
}

function toggleAnswer(id, btn) {
  const ans = document.getElementById(id);
  ans.classList.toggle("show");
  btn.textContent = ans.classList.contains("show") ? "🙈 Hide Answer" : "👁 View Answer";
}

searchInput.addEventListener("input", renderQuestions);

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