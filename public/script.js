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
      { title: "Ch-1 A Letter to God", desc: "PYQs, Oral Comprehension & Exercises", action: "letterToGodMenu" },
      { title: "Ch-2 Nelson Mandela", desc: "Coming Soon", soon: true },
      { title: "Ch-3 Two Stories About Flying", desc: "Coming Soon", soon: true },
      { title: "Ch-4 From the Diary of Anne Frank", desc: "Coming Soon", soon: true },
      { title: "Ch-5 Glimpses of India", desc: "Coming Soon", soon: true },
      { title: "Ch-6 Mijbil the Otter", desc: "Coming Soon", soon: true },
      { title: "Ch-7 Madam Rides the Bus", desc: "Coming Soon", soon: true },
      { title: "Ch-8 The Sermon at Benares", desc: "Coming Soon", soon: true },
      { title: "Ch-9 The Proposal", desc: "Coming Soon", soon: true }
    ]
  },

  letterToGodMenu: {
    subtitle: "A Letter to God",
    cards: [
      { title: "📅 PYQs", desc: "Previous Year Questions", action: "letterToGod" },
      { title: "🎤 Oral Comprehension", desc: "NCERT Oral Questions", action: "oralComprehension" },
      { title: "📝 Exercise Questions", desc: "Coming Soon", soon: true }
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
    cardsArea.innerHTML = `<p>Page not found.</p>`;
    return;
  }

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
        } else if (card.action === "oralComprehension") {
          openOralComprehension();
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
  searchInput.placeholder = "Search PYQs...";
  searchInput.value = "";
  currentTitlePrefix = "📅 Previous Year Questions";

  try {
    const res = await fetch("/data/class10/english/first-flight/a-letter-to-god.json");
    currentQuestions = await res.json();
    renderQuestions(currentTitlePrefix);
  } catch (error) {
    questionsArea.innerHTML = "<p>Failed to load questions.</p>";
    console.error(error);
  }
}

async function openOralComprehension() {
  pageStack.push("oralComprehension");

  cardsArea.classList.add("hidden");
  pyqArea.classList.remove("hidden");
  backBtn.classList.remove("hidden");

  pageSubtitle.textContent = "A Letter to God - Oral Comprehension";
  searchInput.placeholder = "Search oral comprehension...";
  searchInput.value = "";
  currentTitlePrefix = "🎤 Oral Comprehension";

  try {
    const res = await fetch("/data/class10/english/first-flight/a-letter-to-god-oral.json");
    const data = await res.json();

    currentQuestions = data.map(item => ({
      year: item.page,
      marks: "NCERT",
      type: "Oral Comprehension",
      question: item.question,
      answer: item.answer,
      source: item.page,
      verified: true
    }));

    renderQuestions(currentTitlePrefix);
  } catch (error) {
    questionsArea.innerHTML = "<p>Failed to load oral comprehension.</p>";
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
    if (!grouped[q.year]) grouped[q.year] = [];
    grouped[q.year].push(q);
  });

  questionsArea.innerHTML = "";

  Object.keys(grouped)
    .sort((a, b) => {
      const numA = Number(a);
      const numB = Number(b);

      if (!isNaN(numA) && !isNaN(numB)) return numB - numA;

      return String(a).localeCompare(String(b), undefined, {
        numeric: true,
        sensitivity: "base"
      });
    })
    .forEach(year => {
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