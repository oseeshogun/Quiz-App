/**
 * It creates a div element, adds a class to it, creates a h2 element, adds text to it, creates a p
 * element, adds text to it, creates a form element, adds an event listener to it, creates an input
 * group, creates another input group, adds both input groups to the form, and returns the div element
 * @param {(event: SubmitEvent, name: string, email: string) => null} onSubmit - a callback function that will be called when the form is submitted.
 * @returns {HTMLElement} A function that returns a div element with a form inside.
 */
function welcomeComponent(initial = {}, onSubmit) {
  const container = document.createElement("div");
  container.className = "welcome container";

  const title = document.createElement("h2");
  title.textContent = "JavaScript Quiz";

  container.appendChild(title);

  const sentence = document.createElement("p");
  sentence.textContent = `
        Évaluez vos connaissances en JavaScript en
        répondant aux questions que nous avons
        spécialement sélectionnées pour vous.
        C'est fun et c'est gratuit.
    `;
  container.appendChild(sentence);

  const form = document.createElement("form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const email = event.target.elements.email.value;

    if (!name || !email) {
      if (!name)
        document.getElementById(`alert__name`).classList.remove("hide");
      if (!email)
        document.getElementById(`alert__email`).classList.remove("hide");
      return;
    }
    onSubmit(event, name, email);
  });

  const nameInputGroup = createInputGroup(
    "name",
    "Nom",
    "Votre nom",
    "text",
    initial.name,
    "N’oubliez pas de renseigner votre nom avant de commencer le Quiz."
  );

  const emailInputGroup = createInputGroup(
    "email",
    "Email",
    "Votre email",
    "email",
    initial.email,
    "N’oubliez pas de renseigner votre email avant de commencer le Quiz"
  );

  form.appendChild(nameInputGroup);

  form.appendChild(emailInputGroup);

  const btnInputGroup = document.createElement("div");

  btnInputGroup.classList.add("input-group");

  const submitButton = document.createElement("button");

  submitButton.className = "btn-start bg-green";
  submitButton.type = "submit";
  submitButton.textContent = "Commencer";

  btnInputGroup.appendChild(submitButton);

  form.appendChild(btnInputGroup);

  container.appendChild(form);

  return container;
}

/**
 * Create a div with the class input-group, create a label, create an input, and append the label and
 * input to the div.
 * @param {string} id - The id of the input element.
 * @param {string} labelText - The text of the label.
 * @param {string} placeholder - The placeholder of the input.
 * @param {string} type - The type of the input.
 * @param {boolean} required - Whether the input is required or not.
 * @param {string} initialValue - The initial value of the input.
 * @returns {HTMLElement} - The input-group div.
 */
function createInputGroup(
  id,
  labelText,
  placeholder,
  type,
  initialValue,
  alertMessage
) {
  const container = document.createElement("div");

  container.classList.add("input-group");

  const label = document.createElement("label");

  label.for = id;
  label.textContent = labelText;

  const input = document.createElement("input");

  input.type = type;
  input.placeholder = placeholder;
  input.id = id;

  if (initialValue) input.value = initialValue;

  container.appendChild(label);
  container.appendChild(input);

  const alertErrorContainer = document.createElement("span");
  alertErrorContainer.className = "input-alert hide";
  alertErrorContainer.id = "alert__" + id;
  alertErrorContainer.textContent = alertMessage;
  container.appendChild(alertErrorContainer);

  const hideAlertMessage = (event) => {
    const value = event.target.value;
    if (value) {
      alertErrorContainer.classList.add("hide");
    }
  };

  input.addEventListener("keypress", hideAlertMessage);

  input.addEventListener("change", hideAlertMessage);

  return container;
}
