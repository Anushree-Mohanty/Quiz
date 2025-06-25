const questions = [
  {
    q: "Q1: What is Shinchan’s dog’s name?",
    options: ["Tama", "Shiro", "Pochi", "Momo"],
    correct: 1,
    img: "images/shiro.jpg"
  },
  {
    q: "Q2: Who is Shinchan’s best friend?",
    options: ["Kazama", "Bo", "Masao", "Nene"],
    correct: 0,
    img: "images/kazama.jpg"
  },
  {
    q: "Q3: What is the name of Shinchan’s favorite superhero?",
    options: ["Ultra Hero", "Buri Buri Zaimon", "Action kamen", "Quantom Robot"],
    correct: 2,
    img: "images/action.jpg"
  },
  {
    q: "Q4: What vegetable does Shinchan hate the most?",
    options: [" Carrot", "Capsicum", "Beans", "Cabbage"],
    correct: 1,
    img: "images/vegetable.jpg"
  },
  {
    q: "Q5: What is the name of Shinchan’s school?",
    options: ["Sakura Gakuen", "Kasukabe Elementary", "Futaba Kindergarten", "Otonokizaka High"],
    correct: 2,
    img: "images/school.jpg"
  },
  {
    q: "Q6: What is the name of Shinchan’s neighbour who failed in entrance exam 3 times?",
    options: ["Aichan ", "Yonro", "Matsuzaka", "Yoshi"],
    correct: 1,
    img: "images/yonro.jpg"
  },
  {
    q: "Q7: What is the name of mysterious girl from the future with a similar appearance to Shin-chan?",
    options: ["Nene ", "Nanaeko", "Shima", "Shinko"],
    correct: 3,
    img: "images/shinko.jpg"
  },
  {
    q: "Q8: What is the name of the weird saleswoman in Shichan?",
    options: ["Tamiko Kaneari ", "Urima Kuriyo", "Uriko Kuruma", "Koriya Tamu"],
    correct: 1,
    img: "images/urima.jpg"
  },
  {
    q: "Q9: What is Shinchan’s favorite snack?",
    options: ["Choco-Chips", "Popsicle", "Choco-balls", "Gummies"],
    correct: 0,
    img: "images/choco.jpg"
  },
  {
    q: "Q10: What is the name of Shinchan’s friend whose nose is always running?",
    options: ["Ichan", "Masao", "Bo", "Nene"],
    correct: 2,
    img: "images/bo.jpg"
  },

];

const startBtn = document.getElementById("start-btn");
const instruction = document.querySelector(".instruction");
const home = document.querySelector(".home");
const quizSection = document.querySelector(".quiz_section");
const resultSection = document.querySelector(".result");
const exitBtn = document.querySelector(".Exit");
const continueBtn = document.querySelector(".Continue");
const submitBtn = document.querySelector(".Submit");
const skipBtn = document.querySelector(".skip");
const nextBtn = document.querySelector(".next");

const questionText = document.querySelector(".question");
const options = [
  document.getElementById("option_1"),
  document.getElementById("option_2"),
  document.getElementById("option_3"),
  document.getElementById("option_4")
];
const radios = document.querySelectorAll(".answer");
const scoreDisplay = document.querySelector(".score");
const image = document.querySelector(".photo");

let currentQ = 0;
let score = 0;
let attempted = 0;
let correct = 0;
let wrong = 0;

function loadQuestion(index) {
  if (index >= questions.length) return;
  const q = questions[index];
  questionText.textContent = q.q;
  options.forEach((opt, i) => opt.textContent = q.options[i]);
  radios.forEach(radio => radio.checked = false);
  image.src = q.img;
}

function updateScoreDisplay() {
  scoreDisplay.textContent = `SCORE : ${score} / ${questions.length * 4}`;
}

function evaluateAnswer() {
  const selected = [...radios].find(r => r.checked);
  if (selected) {
    attempted++;
    const selectedIndex = [...radios].indexOf(selected);
    if (selectedIndex === questions[currentQ].correct) {
      score += 4;
      correct++;
    } else {
      score -= 1;
      wrong++;
    }
  }
}

startBtn.addEventListener("click", () => {
  home.style.display = "none";
  instruction.style.display = "block";
});

exitBtn.addEventListener("click", () => {
  instruction.style.display = "none";
  home.style.display = "block";
});

continueBtn.addEventListener("click", () => {
  instruction.style.display = "none";
  quizSection.style.display = "block";
  loadQuestion(currentQ);
  updateScoreDisplay();
});

nextBtn.addEventListener("click", () => {
  evaluateAnswer();
  currentQ++;
  if (currentQ < questions.length) {
    loadQuestion(currentQ);
    updateScoreDisplay();
  } else {
    showResult();
  }
});

skipBtn.addEventListener("click", () => {
  currentQ++;
  if (currentQ < questions.length) {
    loadQuestion(currentQ);
  } else {
    showResult();
  }
});

submitBtn.addEventListener("click", showResult);

function showResult() {
  quizSection.style.display = "none";
  resultSection.style.display = "block";
  const total = questions.length * 4;
  const unattempted = questions.length - attempted;
  resultSection.querySelector("h3").textContent = `Your score : ${score} / ${total} Points`;
  resultSection.querySelector("p:nth-of-type(1)").textContent = `Correct Answers : ${correct}`;
  resultSection.querySelector("p:nth-of-type(2)").textContent = `Wrong Answers : ${wrong}`;
  resultSection.querySelector("p:nth-of-type(3)").textContent = `Attempted Questions : ${attempted}`;
  resultSection.querySelector("p:nth-of-type(4)").textContent = `Unattempted Questions : ${unattempted}`;
}

document.querySelector(".reload-button").addEventListener("click", () => {
  location.reload();
});

document.querySelector('.hamburger img').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});
