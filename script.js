  <!-- CONFETTI -->
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>

  <script>
    const startBtn = document.getElementById("start-btn");
    const tutorial = document.getElementById("tutorial");
    const gameContainer = document.getElementById("game-container");

    startBtn.addEventListener("click", () => {
      tutorial.classList.add("hidden");
      gameContainer.classList.remove("hidden");
      showQuestion();
    });

    const tutorQuotes = [
      "Willkommen, Suchender des Wissens! Bereit für eine Herausforderung?",
      "Antworte weise, wie Cicero es tun würde.",
      "Auch Leonardo begann mit einer Frage...",
      "Wissen ist eine Reise, kein Ziel!",
      "Lass deinen Geist so scharf sein wie Machiavellis Feder."
    ];

    const questions = [
      {
        question: "Wer schrieb die 'Göttliche Komödie'?",
        answers: ["Petrarca", "Boccaccio", "Dante Alighieri", "Machiavelli"],
        correct: "Dante Alighieri"
      },
      {
        question: "Wann war die Renaissance?",
        answers: ["11.–13. Jahrhundert", "14.–17. Jahrhundert", "18. Jahrhundert", "19. Jahrhundert"],
        correct: "14.–17. Jahrhundert"
      },
      {
        question: "Was war die Aufklärung?",
        answers: [
          "Eine mittelalterliche Kunstbewegung",
          "Eine Epoche der Vernunft und des Wissens",
          "Eine religiöse Strömung",
          "Eine politische Revolution"
        ],
        correct: "Eine Epoche der Vernunft und des Wissens"
      },
      {
        question: "Wer malte die Sixtinische Kapelle?",
        answers: ["Leonardo da Vinci", "Michelangelo", "Raffael", "Giotto"],
        correct: "Michelangelo"
      },
      {
        question: "Was studierten Philologen im Mittelalter?",
        answers: ["Naturwissenschaften", "Heilige und klassische Texte", "Medizin", "Musik"],
        correct: "Heilige und klassische Texte"
      }
    ];

    const correctSound = document.getElementById("correct-sound");
    const wrongSound = document.getElementById("wrong-sound");

    let score = 0;
    let current = 0;

    function showQuestion() {
      const q = questions[current];
      document.getElementById("question").textContent = q.question;

      const answersDiv = document.getElementById("answers");
      answersDiv.innerHTML = "";

      q.answers.forEach(answer => {
        const btn = document.createElement("button");
        btn.textContent = answer;
        btn.onclick = () => checkAnswer(btn, answer);
        answersDiv.appendChild(btn);
      });

      document.getElementById("tutor-text").textContent = tutorQuotes[Math.floor(Math.random() * tutorQuotes.length)];
      document.getElementById("result").textContent = "";
    }

    function checkAnswer(button, selected) {
      const correct = questions[current].correct;
      const result = document.getElementById("result");
      const buttons = document.querySelectorAll(".answers button");

      buttons.forEach(btn => btn.disabled = true);

      if (selected === correct) {
        result.textContent = "✅ Richtig!";
        button.classList.add("correct");
        correctSound.play();
        score++;
      } else {
        result.textContent = `❌ Falsch! Die richtige Antwort war: ${correct}`;
        button.classList.add("wrong");
        wrongSound.play();
        buttons.forEach(btn => {
          if (btn.textContent === correct) {
            btn.classList.add("correct");
          }
        });
      }

      document.getElementById("score").textContent = `Punktestand: ${score}`;

      current++;
      if (current < questions.length) {
        setTimeout(showQuestion, 2500);
      } else {
        setTimeout(() => {
          document.getElementById("question").textContent = "🎉 Das Abenteuer ist vorbei!";
          document.getElementById("answers").innerHTML = "";
          document.getElementById("result").textContent = `Du hast ${score} von ${questions.length} Fragen richtig beantwortet.`;
          confetti();
        }, 1500);
      }
    }
  </script>
