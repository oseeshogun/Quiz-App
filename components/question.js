/**
 * It creates a DOM element that represents a question
 * @param question - the question object
 * @param count - the current question number
 * @param total - the total number of questions
 * @param onAnswerSelected - a callback function that will be called when the user selects an answer.
 * @param onNext - a function that will be called when the user clicks on the next button
 * @param onQuit - a function that will be called when the user clicks on the "Quit" button.
 * @returns A function that returns a div with a question, choices, and buttons.
 */
function questionComponent(
  question,
  count,
  total,
  onAnswerSelected,
  onNext,
  onQuit
) {
  // create div with class container
  const container = document.createElement("div");
  container.className = "container";

  const questionSentence = document.createElement("p");
  questionSentence.textContent = question.question;

  container.appendChild(questionSentence);

  // Progress bar
  const progressContainer = document.createElement("div");
  progressContainer.className = "progress-container";

  // State
  const state = document.createElement("div");
  state.className = "state";

  const questionCount = document.createElement("span");
  questionCount.className = "count";
  questionCount.textContent = `Question ${count}/${total}`;

  state.appendChild(questionCount);

  const timeCounting = document.createElement("span");
  timeCounting.className = "time";
  timeCounting.textContent = "60";

  state.appendChild(timeCounting);

  progressContainer.appendChild(state);

  const progress = document.createElement("progress");

  progress.max = 100;
  progress.value = 100;

  progressContainer.appendChild(progress);

  container.appendChild(progressContainer);

  const choicesContainer = document.createElement("div");
  choicesContainer.className = "choices";

  // Bottom buttons
  const buttonsContainer = document.createElement("div");
  buttonsContainer.className = "buttons";

  const quitButton = document.createElement("button");
  quitButton.className = "btn bg-quit";
  quitButton.textContent = "Quitter";

  // Set Timer
  /* A timer that counts down from 60 seconds. */
  const timer = setInterval(() => {
    const time = timeCounting.textContent;
    const seconds = parseInt(time, 10);

    if (seconds > 0) {
      timeCounting.textContent = `${seconds - 1}`;
      progress.value = Math.floor(((seconds - 1) * 100) / 60);
    } else {
      clearInterval(timer);
      // Terminé
      onAnswerSelected(question.id, false);
      onNext(count);
    }
  }, 1000);

  quitButton.addEventListener("click", (event) => {
    onQuit(event);
    clearInterval(timer);
  });

  const nextButton = document.createElement("button");
  nextButton.className = "btn bg-green";
  nextButton.textContent = "Suivant";
  nextButton.disabled = true;

  nextButton.addEventListener("click", (event) => {
    if (nextButton.disabled) return;

    onNext(count);
    clearInterval(timer);
  });

  /**
   * When the user clicks on an answer, the next button is enabled and the onAnswerSelected function is
   * called
   * @param event - The event object that was triggered.
   * @param isCorrect - a boolean value that indicates whether the answer is correct or not.
   */
  const onSelected = (event, isCorrect) => {
    nextButton.disabled = false;
    onAnswerSelected(question.id, isCorrect);
  };

  // Loop through choices
  question.answers.forEach((answer, index) => {
    /* It creates a radio button with a label */
    const answerElement = createChoice(
      answer.id,
      question.id,
      answer.answer,
      answer.isCorrect,
      onSelected
    );
    choicesContainer.appendChild(answerElement);
  });

  container.appendChild(choicesContainer);

  buttonsContainer.appendChild(quitButton);
  buttonsContainer.appendChild(nextButton);

  container.appendChild(buttonsContainer);

  return container;
}

/**
 * It creates a radio button with a label
 * @param id - The id of the input element.
 * @param name - The name of the radio button group.
 * @param value - The text of the choice
 * @param isCorrect - A boolean value that indicates whether the choice is correct or not.
 * @param onCheckedChange - A callback function that will be called when the user selects a choice.
 * @returns A div with an input and a label
 */
function createChoice(id, name, value, isCorrect, onCheckedChange) {
  const container = document.createElement("div");
  container.classList.add("choice");

  const input = document.createElement("input");
  input.type = "radio";
  input.name = name;
  input.id = id;

  input.addEventListener("change", (event) => {
    const checked = event.target.checked;
    if (checked) {
      onCheckedChange(event, isCorrect);
    }
  });

  const label = document.createElement("label");
  label.textContent = value;
  label.setAttribute("for", id);

  container.appendChild(input);
  container.appendChild(label);

  return container;
}
