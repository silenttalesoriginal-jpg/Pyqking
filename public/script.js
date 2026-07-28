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

/* =========================================================
   CHAPTER AND POEM DATA
========================================================= */

const chapterData = {
  letterToGod: {
    title: "A Letter to God",
    base: "a-letter-to-god",
    oral: true,
    exercise: true,
    isPoem: false
  },

  nelsonMandela: {
    title: "Nelson Mandela: Long Walk to Freedom",
    base: "nelson-mandela",
    oral: true,
    exercise: true,
    isPoem: false
  },

  twoStoriesAboutFlying: {
    title: "Two Stories About Flying",
    base: "two-stories-about-flying",
    oral: false,
    exercise: true,
    isPoem: false
  },

  glimpsesOfIndia: {
    title: "Glimpses of India",
    base: "glimpses-of-india",
    oral: true,
    exercise: true,
    isPoem: false
  },

  theBallPoem: {
    title: "The Ball Poem",
    base: "the-ball-poem",
    oral: false,
    exercise: true,
    isPoem: true
  },

  fog: {
    title: "Fog",
    base: "fog",
    oral: false,
    exercise: false,
    isPoem: true
  },

  midnightVisitor: {
    title: "The Midnight Visitor",
    base: "the-midnight-visitor",
    oral: false,
    exercise: false,
    isPoem: false,
    book: "footprints"
  },

  aQuestionOfTrust: {
    title: "A Question of Trust",
    base: "a-question-of-trust",
    oral: false,
    exercise: false,
    isPoem: false,
    book: "footprints"
  }
};

/* =========================================================
   MOUSE GLOW
========================================================= */

document.addEventListener("mousemove", (event) => {
  if (!mouseGlow) return;

  mouseGlow.style.left = `${event.clientX}px`;
  mouseGlow.style.top = `${event.clientY}px`;
});

/* =========================================================
   WEBSITE PAGES
========================================================= */

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
      {
        title: "📖 English",
        desc: "First Flight & Footprints Without Feet",
        action: "english"
      },
      {
        title: "🧪 Science",
        desc: "Coming Soon",
        soon: true
      },
      {
        title: "📐 Maths",
        desc: "Coming Soon",
        soon: true
      },
      {
        title: "🌍 SST",
        desc: "Coming Soon",
        soon: true
      },
      {
        title: "💻 Computer Code 165",
        desc: "Coming Soon",
        soon: true
      },
      {
        title: "📕 Hindi",
        desc: "Coming Soon",
        soon: true
      }
    ]
  },

  english: {
    subtitle: "Class 10 English Books",
    cards: [
      {
        title: "📘 First Flight",
        desc: "Main textbook",
        action: "firstFlight"
      },
      {
        title: "📙 Footprints Without Feet",
        desc: "Supplementary Reader",
        action: "footprints"
      }
    ]
  },

  footprints: {
    subtitle: "Footprints Without Feet",
    cards: [
      {
        title: "Ch-1 A Triumph of Surgery",
        desc: "Coming Soon",
        soon: true
      },
      {
        title: "Ch-2 The Thief's Story",
        desc: "Coming Soon",
        soon: true
      },
      {
        title: "Ch-3 The Midnight Visitor",
        desc: "Coming Soon",
        soon: true
      },
      {
        title: "Ch-4 A Question of Trust",
        desc: "Previous Year Questions",
        action: "menu:aQuestionOfTrust"
      },
      {
        title: "Ch-5 Footprints Without Feet",
        desc: "Coming Soon",
        soon: true
      },
      {
        title: "Ch-6 The Making of a Scientist",
        desc: "Coming Soon",
        soon: true
      },
      {
        title: "Ch-7 The Necklace",
        desc: "Coming Soon",
        soon: true
      },
      {
        title: "Ch-8 Bholi",
        desc: "Coming Soon",
        soon: true
      },
      {
        title: "Ch-9 The Book That Saved the Earth",
        desc: "Coming Soon",
        soon: true
      }
    ]
  },
    firstFlight: {
    subtitle: "First Flight",
    cards: [
      {
        title: "📘 Chapters",
        desc: "All prose chapters from First Flight",
        action: "firstFlightChapters"
      },
      {
        title: "📜 Poems",
        desc: "All poems from First Flight",
        action: "firstFlightPoems"
      }
    ]
  },

  firstFlightChapters: {
    subtitle: "First Flight - Chapters",
    cards: [
      {
        title: "Ch-1 A Letter to God",
        desc: "PYQs, Oral Comprehension & Exercise Questions",
        action: "menu:letterToGod"
      },
      {
        title: "Ch-2 Nelson Mandela",
        desc: "PYQs, Oral Comprehension & Exercise Questions",
        action: "menu:nelsonMandela"
      },
      {
        title: "Ch-3 Two Stories About Flying",
        desc: "PYQs & Exercise Questions",
        action: "menu:twoStoriesAboutFlying"
      },
      {
        title: "Ch-4 From the Diary of Anne Frank",
        desc: "Coming Soon",
        soon: true
      },
      {
        title: "Ch-5 Glimpses of India",
        desc: "Previous Year Questions",
        action: "menu:glimpsesOfIndia"
      },
      {
        title: "Ch-6 Mijbil the Otter",
        desc: "Coming Soon",
        soon: true
      },
      {
        title: "Ch-7 Madam Rides the Bus",
        desc: "Coming Soon",
        soon: true
      },
      {
        title: "Ch-8 The Sermon at Benares",
        desc: "Coming Soon",
        soon: true
      },
      {
        title: "Ch-9 The Proposal",
        desc: "Coming Soon",
        soon: true
      }
    ]
  },

  firstFlightPoems: {
    subtitle: "First Flight - Poems",
    cards: [
      {
        title: "Poem 1 - Dust of Snow",
        desc: "Coming Soon",
        soon: true
      },
      {
        title: "Poem 2 - Fire and Ice",
        desc: "Coming Soon",
        soon: true
      },
      {
        title: "Poem 3 - A Tiger in the Zoo",
        desc: "Coming Soon",
        soon: true
      },
      {
        title: "Poem 4 - How to Tell Wild Animals",
        desc: "Coming Soon",
        soon: true
      },
      {
        title: "Poem 5 - The Ball Poem",
        desc: "PYQs & Exercise Questions",
        action: "menu:theBallPoem"
      },
      {
        title: "Poem 6 - Amanda!",
        desc: "Coming Soon",
        soon: true
      },
      {
        title: "Poem 7 - The Trees",
        desc: "Coming Soon",
        soon: true
      },
      {
        title: "Poem 8 - Fog",
        desc: "Previous Year Questions",
        action: "menu:fog"
      },
      {
        title: "Poem 9 - The Tale of Custard the Dragon",
        desc: "Coming Soon",
        soon: true
      },
      {
        title: "Poem 10 - For Anne Gregory",
        desc: "Coming Soon",
        soon: true
      }
    ]
  }
};

/* =========================================================
   NORMAL PAGE RENDERING
========================================================= */

function renderPage(pageName, push = true) {
  if (push) {
    pageStack.push(pageName);
  }

  pyqArea.classList.add("hidden");
  cardsArea.classList.remove("hidden");

  cardsArea.innerHTML = "";
  questionsArea.innerHTML = "";
  searchInput.value = "";

  const page = pages[pageName];

  if (!page) {
    pageSubtitle.textContent = "Page not found";

    cardsArea.innerHTML = `
      <p style="text-align:center;">
        Page not found.
      </p>
    `;

    return;
  }

  pageSubtitle.textContent = page.subtitle;

  backBtn.classList.toggle(
    "hidden",
    pageStack.length <= 1
  );

  page.cards.forEach((card) => {
    createCard(card);
  });
}

/* =========================================================
   CHAPTER / POEM MENU
========================================================= */

function renderChapterMenu(chapterKey, push = true) {
  const chapter = chapterData[chapterKey];

  if (!chapter) {
    pageSubtitle.textContent = "Chapter not found";
    return;
  }

  if (push) {
    pageStack.push(`menu:${chapterKey}`);
  }

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
    if (!chapter.isPoem && chapter.oral) {
    menuCards.push({
      title: "🎤 Oral Comprehension",
      desc: "NCERT Oral Questions",
      action: `oral:${chapterKey}`
    });
  }

  if (chapter.exercise) {
    menuCards.push({
      title: "📝 Exercise Questions",
      desc: "NCERT Exercise Questions",
      action: `exercise:${chapterKey}`
    });
  }

  menuCards.forEach((card) => {
    createCard(card);
  });
}

/* =========================================================
   CARD CREATION
========================================================= */

function createCard(card) {
  const cardElement = document.createElement("div");

  cardElement.className =
    `card${card.soon ? " soon" : ""}`;

  cardElement.innerHTML = `
    <div class="card-content">
      <h2>${card.title}</h2>

      <p>${card.desc}</p>

      <div class="enter">
        ${
          card.soon
            ? "🚧 Coming Soon"
            : "ENTER →"
        }
      </div>
    </div>
  `;

  if (!card.soon && card.action) {
    cardElement.addEventListener("click", () => {
      handleAction(card.action);
    });
  }

  cardsArea.appendChild(cardElement);
}

/* =========================================================
   CARD ACTIONS
========================================================= */

function handleAction(action) {
  if (!action) return;

  if (action.startsWith("menu:")) {
    const chapterKey = action.split(":")[1];

    renderChapterMenu(chapterKey);
    return;
  }

  if (action.startsWith("pyq:")) {
    const chapterKey = action.split(":")[1];

    openChapterData(chapterKey, "pyq");
    return;
  }

  if (action.startsWith("oral:")) {
    const chapterKey = action.split(":")[1];

    openChapterData(chapterKey, "oral");
    return;
  }

  if (action.startsWith("exercise:")) {
    const chapterKey = action.split(":")[1];

    openChapterData(chapterKey, "exercise");
    return;
  }

  renderPage(action);
}

/* =========================================================
   BACK BUTTON
========================================================= */

backBtn.addEventListener("click", () => {
  if (pageStack.length <= 1) return;

  pageStack.pop();

  const previousPage =
    pageStack[pageStack.length - 1];

  if (!previousPage) {
    pageStack = [];
    renderPage("home", true);
    return;
  }

  if (previousPage.startsWith("menu:")) {
    const chapterKey =
      previousPage.split(":")[1];

    renderChapterMenu(chapterKey, false);
    return;
  }

  if (
    previousPage.startsWith("pyq:") ||
    previousPage.startsWith("oral:") ||
    previousPage.startsWith("exercise:")
  ) {
    const [section, chapterKey] =
      previousPage.split(":");

    openChapterData(
      chapterKey,
      section,
      false
    );

    return;
  }

  renderPage(previousPage, false);
});

/* =========================================================
   LOAD JSON DATA
========================================================= */

async function openChapterData(
  chapterKey,
  section,
  push = true
) {
  const chapter = chapterData[chapterKey];

  if (!chapter) {
    questionsArea.innerHTML =
      "<p>Chapter not found.</p>";

    return;
  }

  if (push) {
    pageStack.push(`${section}:${chapterKey}`);
  }

  cardsArea.classList.add("hidden");
  pyqArea.classList.remove("hidden");
  backBtn.classList.remove("hidden");

  searchInput.value = "";

  let fileName = "";
  let title = "";
  let placeholder = "";

  if (section === "pyq") {
    fileName = `${chapter.base}.json`;

    title =
      `${chapter.title} - Previous Year Questions`;

    placeholder = "Search PYQs...";

    currentTitlePrefix =
      "📅 Previous Year Questions";
  }

  if (section === "oral") {
    fileName =
      `${chapter.base}-oral.json`;

    title =
      `${chapter.title} - Oral Comprehension`;

    placeholder =
      "Search oral comprehension...";

    currentTitlePrefix =
      "🎤 Oral Comprehension";
  }

  if (section === "exercise") {
    fileName =
      `${chapter.base}-exercise.json`;

    title =
      `${chapter.title} - Exercise Questions`;

    placeholder =
      "Search exercise questions...";

    currentTitlePrefix =
      "📝 Exercise Questions";
  }
    pageSubtitle.textContent = title;
  searchInput.placeholder = placeholder;

  questionsArea.innerHTML = `
    <p style="text-align:center;">
      Loading questions...
    </p>
  `;

  try {

    // Select correct folder
    const bookFolder =
      chapter.book === "footprints"
        ? "footprints"
        : "first-flight";

    const response = await fetch(
      `/data/class10/english/${bookFolder}/${fileName}`
    );

    if (!response.ok) {
      throw new Error(
        `Could not load ${fileName}. Status: ${response.status}`
      );
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error(
        `${fileName} must contain a JSON array.`
      );
    }

    if (section === "pyq") {
      currentQuestions = data;
    } else {
      currentQuestions = data.map((item) => ({
        year:
          item.page ||
          item.section ||
          (
            section === "oral"
              ? "Oral Comprehension"
              : "Exercise Questions"
          ),

        marks: item.marks || "NCERT",

        type:
          section === "oral"
            ? "Oral Comprehension"
            : "Exercise",

        question: item.question || "",
        answer: item.answer || "",
        source: item.source || "NCERT"
      }));
    }

    renderQuestions(currentTitlePrefix);

  } catch (error) {

    console.error(error);

    questionsArea.innerHTML = `
      <p style="text-align:center;">
        Failed to load ${chapter.title} questions.
      </p>

      <p style="text-align:center;">
        Check that this file exists:
      </p>

      <p style="text-align:center;">
        <b>${fileName}</b>
      </p>
    `;
  }
}

/* =========================================================
   QUESTION RENDERING
========================================================= */

function renderQuestions(
  titlePrefix = currentTitlePrefix
) {

  const searchText =
    searchInput.value
      .trim()
      .toLowerCase();

  const filteredQuestions =
    currentQuestions.filter((question) => {

      return JSON.stringify(question)
        .toLowerCase()
        .includes(searchText);

    });

  const groupedQuestions = {};

  filteredQuestions.forEach((question) => {

    const groupName =
      question.year || "Questions";

    if (!groupedQuestions[groupName]) {
      groupedQuestions[groupName] = [];
    }

    groupedQuestions[groupName].push(question);

  });

  questionsArea.innerHTML = "";

  const groups =
    Object.keys(groupedQuestions).sort(
      (a, b) => {

        const numberA = Number(a);
        const numberB = Number(b);

        if (
          !Number.isNaN(numberA) &&
          !Number.isNaN(numberB)
        ) {
          return numberB - numberA;
        }

        return String(a).localeCompare(
          String(b),
          undefined,
          {
            numeric: true,
            sensitivity: "base"
          }
        );

      }
    );
      groups.forEach((groupName) => {

    const yearHeading =
      document.createElement("h2");

    yearHeading.className = "year-title";

    yearHeading.textContent =
      `${titlePrefix} [${groupName}]`;

    questionsArea.appendChild(yearHeading);

    groupedQuestions[groupName].forEach(
      (question, questionIndex) => {

        const cleanGroupName =
          String(groupName)
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, "");

        const answerId =
          `answer-${cleanGroupName}-${questionIndex}`;

        if (
          question.type === "Extract Based" &&
          Array.isArray(question.subQuestions)
        ) {

          renderExtractQuestion(
            question,
            answerId
          );

        } else {

          renderNormalQuestion(
            question,
            answerId
          );

        }

      }
    );

  });

  if (filteredQuestions.length === 0) {

    questionsArea.innerHTML = `
      <p style="text-align:center;">
        No questions found.
      </p>
    `;

  }
}

/* =========================================================
   NORMAL QUESTION
========================================================= */

function renderNormalQuestion(
  question,
  answerId
) {

  const card =
    document.createElement("div");

  card.className = "question-card";

  const optionsHtml = question.options
    ? `
      <div class="options">
        ${
          Object.entries(question.options)
            .map(
              ([optionLetter, optionText]) => {
                return `
                  <p>
                    ${optionLetter}. ${optionText}
                  </p>
                `;
              }
            )
            .join("")
        }
      </div>
    `
    : "";

  card.innerHTML = `
    <div class="meta">
      ${question.type || "Question"}
      • ${question.marks || "NCERT"} Marks
      • Source: ${question.source || "CBSE PYQ"}
    </div>

    <div class="question">
      <b>Q.</b>
      ${formatText(question.question || "")}
    </div>

    ${optionsHtml}

    <button
      class="view"
      onclick="toggleAnswer('${answerId}', this)"
    >
      👁 View Answer
    </button>

    <div
      class="answer"
      id="${answerId}"
    >
      ${
        question.correctOption
          ? `
            <b>Correct Option:</b>
            ${question.correctOption}
            <br><br>
          `
          : ""
      }

      <b>Answer:</b>
      <br>

      ${formatText(question.answer || "")}
    </div>
  `;

  questionsArea.appendChild(card);
}

/* =========================================================
   EXTRACT QUESTION
========================================================= */

function renderExtractQuestion(
  question,
  answerId
) {

  const card =
    document.createElement("div");

  card.className = "question-card";
    const subQuestionsHtml =
    question.subQuestions
      .map((subQuestion, index) => {

        const subAnswerId =
          `${answerId}-${index}`;

        const optionsHtml =
          subQuestion.options
            ? `
              <div class="options">
                ${
                  Object.entries(
                    subQuestion.options
                  )
                    .map(
                      ([
                        optionLetter,
                        optionText
                      ]) => {
                        return `
                          <p>
                            ${optionLetter}.
                            ${optionText}
                          </p>
                        `;
                      }
                    )
                    .join("")
                }
              </div>
            `
            : "";

        return `
          <div class="sub-question">

            <div class="question">
              <b>
                ${
                  subQuestion.no ||
                  `(${index + 1})`
                }
              </b>

              ${formatText(
                subQuestion.question || ""
              )}

            </div>

            ${optionsHtml}

            <button
              class="view"
              onclick="toggleAnswer('${subAnswerId}', this)"
            >
              👁 View Answer
            </button>

            <div
              class="answer"
              id="${subAnswerId}"
            >

              ${
                subQuestion.correctOption
                  ? `
                    <b>Correct Option:</b>
                    ${subQuestion.correctOption}
                    <br><br>
                  `
                  : ""
              }

              <b>Answer:</b>
              <br>

              ${formatText(
                subQuestion.answer || ""
              )}

            </div>

          </div>
        `;

      })
      .join("");

  card.innerHTML = `

    <div class="meta">

      ${question.type || "Extract Based"}
      • ${question.marks || 5} Marks
      • Source: ${question.source || "CBSE PYQ"}

    </div>

    <div class="extract-box">

      <b>Read the extract:</b>
      <br><br>

      ${formatText(question.extract || "")}

    </div>

    ${subQuestionsHtml}

  `;

  questionsArea.appendChild(card);
}

/* =========================================================
   ANSWER TOGGLE
========================================================= */

function toggleAnswer(answerId, button) {

  const answerElement =
    document.getElementById(answerId);

  if (!answerElement) return;

  answerElement.classList.toggle("show");

  if (
    answerElement.classList.contains("show")
  ) {

    button.textContent = "🙈 Hide Answer";

  } else {

    button.textContent = "👁 View Answer";

  }

}

window.toggleAnswer = toggleAnswer;

/* =========================================================
   FORMAT TEXT
========================================================= */

function formatText(text) {

  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br>");

}
/* =========================================================
   SEARCH
========================================================= */

searchInput.addEventListener("input", () => {
  renderQuestions(currentTitlePrefix);
});

/* =========================================================
   OPEN HOME PAGE
========================================================= */

renderPage("home", true);

/* =========================================================
   PARTICLE BACKGROUND
========================================================= */

const particlesCanvas =
  document.getElementById("particles");

if (particlesCanvas) {

  const particleContext =
    particlesCanvas.getContext("2d");

  const particles = [];

  function resizeParticlesCanvas() {

    particlesCanvas.width =
      window.innerWidth;

    particlesCanvas.height =
      window.innerHeight;

  }

  resizeParticlesCanvas();

  window.addEventListener(
    "resize",
    resizeParticlesCanvas
  );

  for (let index = 0; index < 90; index++) {

    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 2 + 1,
      speedX:
        (Math.random() - 0.5) * 0.6,
      speedY:
        (Math.random() - 0.5) * 0.6
    });

  }

  function animateParticles() {

    particleContext.clearRect(
      0,
      0,
      particlesCanvas.width,
      particlesCanvas.height
    );

    particles.forEach((particle) => {

      particle.x += particle.speedX;
      particle.y += particle.speedY;

      if (
        particle.x < 0 ||
        particle.x > particlesCanvas.width
      ) {
        particle.speedX *= -1;
      }

      if (
        particle.y < 0 ||
        particle.y > particlesCanvas.height
      ) {
        particle.speedY *= -1;
      }

      particleContext.beginPath();

      particleContext.arc(
        particle.x,
        particle.y,
        particle.radius,
        0,
        Math.PI * 2
      );

      particleContext.fillStyle =
        "rgba(103, 232, 249, 0.8)";

      particleContext.fill();

    });

    requestAnimationFrame(
      animateParticles
    );

  }

  animateParticles();

}
