/**
 * It creates a component that displays the user's name, email, score, and total number of questions,
 * and it also displays a success or failure icon depending on the user's score
 * @param name - The name of the user
 * @param email - the email of the user
 * @param score - the number of correct answers
 * @param total - the total number of questions
 * @param onRestart - a function that will be called when the user clicks on the "Accueil" button.
 * @returns A div element with a class of container.
 */
function endGameComponent(name, email, score, total, onRestart) {
  const container = document.createElement("div");
  container.className = "container";

  const title = document.createElement("h2");
  title.textContent = name;

  container.appendChild(title);

  const br = document.createElement("br");

  container.appendChild(br);

  const emailElement = document.createElement("p");
  emailElement.textContent = email;

  container.appendChild(emailElement);

  const result = document.createElement("div");
  result.className = "result";

  if (score / total > 0.5) {
    const icon = createSuccessIcon();
    result.appendChild(icon);
  } else {
    const icon = createFailedIcon();
    result.appendChild(icon);
  }

  const resultScore = document.createElement("h5");
  resultScore.textContent = `${score}/${total}`;

  result.appendChild(resultScore);

  container.appendChild(result);

  const buttons = document.createElement("div");
  buttons.className = "buttons";

  const homeButton = document.createElement("button");
  homeButton.className = "btn m-auto bg-primary";
  homeButton.textContent = "Accueil";

  homeButton.addEventListener("click", (event) => {
    onRestart(event);
  });

  buttons.appendChild(homeButton);

  container.appendChild(buttons);

  return container;
}

function createSuccessIcon() {
  const iconAnimation = document.createElement("div");
  iconAnimation.className = "icon-animation";

  const icon = document.createElement("div");
  icon.className = "success-checkmark";

  const checkIcon = document.createElement("div");
  checkIcon.className = "check-icon";

  const lineTip = document.createElement("span");
  lineTip.className = "icon-line line-tip";

  const lineLong = document.createElement("span");
  lineLong.className = "icon-line line-long";

  const circle = document.createElement("div");
  circle.className = "icon-circle";

  const fix = document.createElement("div");
  fix.className = "icon-fix";

  checkIcon.appendChild(lineTip);
  checkIcon.appendChild(lineLong);
  checkIcon.appendChild(circle);
  checkIcon.appendChild(fix);

  icon.appendChild(checkIcon);

  iconAnimation.appendChild(icon);

  return iconAnimation;
}

function createFailedIcon() {
  const icon = document.createElement("div");

  icon.className = "failed";

  const image = document.createElement("img");

  image.src = "/icons8-close.png";

  image.setAttribute("alt", "Failed icon");

  icon.appendChild(image);

  return icon;
}
