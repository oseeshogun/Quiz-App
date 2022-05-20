document.addEventListener("DOMContentLoaded", function () {
  // Questions collections
  const questionsCollection = [
    createQuestion(
      "Quel est l'équivalent de pouet.coin ?",
      [
        "pouet[coin]",
        'pouet["coin"]',
        "pouet.getCoin()",
        "Aucune des solutions précédentes.",
      ],
      2
    ),
    createQuestion(
      "Laquelle de ces expressions est évaluée à false ?",
      [
        '"Infinity" == Infinity',
        "NaN == NaN",
        '"0xa" == 10',
        '{"valueOf": function() {return 2;}} == 2',
      ],
      2
    ),
    createQuestion(
      "Quelle est la méthode spécifiée dans le DOM-2 pour l'ajout des gestionnaires d'événements ?",
      ["addEventListener", "attachEvent", "attachEventListener", "listen"],
      1
    ),
    createQuestion(
      'Quel est le résultat de parseInt("010",8) ?',
      ["1", "2", "8", "10"],
      3
    ),
    createQuestion(
      "window.i = 0; var i = 2; alert(window.i); : que va afficher ce code ?",
      ["0", "2", "Game over", "undefined"],
      2
    ),
    createQuestion(
      "Quelle chaîne de caractères ne correspond pas à l'expression régulière /\\ba/ ?",
      ['"abcd"', "_a", "-a", "d c b a"],
      2
    ),
    createQuestion(
      "Lorsqu'on presse brièvement un caractère du clavier, quelle séquence d'événements est générée ?",
      [
        "keypress / keydown / keyup",
        "keyup / keydown / keypress",
        "keydown / keypress / keyup",
        "keydown / keyup / keypress",
      ],
      3
    ),
    createQuestion(
      "Si on presse brièvement une touche autre qu'un caractère, est-ce la même séquence d'événements ?",
      [
        "non, la séquence est alors keydown / keyup",
        "oui, c'est identique",
        "non, la séquence est alors keypress / keydown / keyup",
        "non, seul l'événement keypress est généré",
      ],
      1
    ),
    createQuestion(
      "Depuis quand sont disponibles les arrow functions ?",
      ["JavaScript 1.7", "ECMAScript 6", "ECMAScript 7", "ECMAScript 2018"],
      2
    ),
    createQuestion(
      "Quel est l'équivalent pour un noeud de l'arbre DOM de node.childNodes[1] (en supposant que le noeud demandé existe) ?",
      [
        "node.firstChild",
        "node.firstChild.nextSibling",
        " node.previousSibling.parentNode",
        "node.lastChild.previousSibling",
      ],
      2
    ),
    createQuestion(
      "Quelle syntaxe est correcte pour que la fonction init soit appelée au chargement de la page ?",
      [
        "window.onload = init;",
        "window.onload = init();",
        " window.onload() = init;",
        "window.onload() = init();",
      ],
      1
    ),
    createQuestion(
      `Quand l'événement "load" se déclenche-t-il pour une page ?`,
      [
        "Dès que le navigateur commence à recevoir le code HTML.",
        " Quand le code HTML a fini d'être chargé.",
        "Quand l'arbre DOM a été construit.",
        "Quand l'arbre DOM a été construit et toutes les ressources chargées (images, ...).",
      ],
      4
    ),
    createQuestion(
      "Que signifie l'acronyme AJAX ?",

      [
        "Advanced JavaScript with XMLHttpRequest.",
        "Asynchronous JavaScript and XML.",
        "JavaScript extensible.",
        "Rien, c’est juste une suite de lettres sans aucune signification.",
      ],
      2
    ),
    createQuestion(
      "Peut-on accéder aux commentaires d'un document HTML ?",
      [
        "Non, ce n'est pas possible",
        "Oui, avec document.body.commentaries",
        " Oui, avec node.nodeType évalué à 7",
        "Oui, avec Node.COMMENT_NODE",
      ],
      4
    ),
    createQuestion(
      "for(; ; ) { ... } Que se passe-t-il avec cette instruction ?",
      [
        "C'est une boucle infinie qu'on peut arrêter avec une condition.",
        "On obtient la valeur undefined",
        "On obtient la valeur null",
        "Il ne se passe rien ! Mais j'ai triché pour répondre : J'ai essayé de le faire !",
      ],
      1
    ),
    createQuestion(
      "Lequel de ces codes n’affichera pas 3 ?",
      [
        "alert(Math.max(-4, 3));",
        "var i = 3; alert(i++);",
        'alert(parseInt("3"));',
        "alert(Math.floor(2.9));",
      ],
      4
    ),
    createQuestion(
      "for(; iI < iJ; iI++, iJ--) { ... } Est-il possible d'écrire une boucle de cette forme ?",
      [
        " Non, la boucle n'est pas initialisée",
        " Oui, sans problème",
        "Non, on ne peut pas se servir de deux compteurs à la fois",
        "Oui, à condition d'avoir initialisé les variables en amont",
      ],
      4
    ),
  ];
  // main variables
  const questionNumber = Math.min(questionsCollection.length, 15);
  let name, email;
  let userAnswers = {};

  /**
   * It takes a component as an argument and overwrites the main element with the component.
   * @param {HTMLElement} component - The component to be rendered.
   */
  const overwriteMain = (component) => {
    const main = document.getElementById("main");
    main.innerHTML = "";
    main.appendChild(component);
  };

  /**
   * Start the quiz game function
   * Responsible to shuffle the questions and set the
   * questions for this turn and render the first component (welcomeComponent).
   */
  const startGame = () => {
    userAnswers = {};

    // Shuffle the questions
    let questions = [...questionsCollection.sort(() => 0.5 - Math.random())];
    // Get the first elements
    questions.slice(0, questionNumber);

    const welcome = welcomeComponent(
      { name, email },
      (event, _name, _email) => {
        name = _name;
        email = _email;

        const endGame = () => {
          const score = Object.values(userAnswers).filter((x) => x).length;
          overwriteMain(
            endGameComponent(name, email, score, questionNumber, () =>
              startGame()
            )
          );
        };

        const createQuestionComponent = (count = 1) => {
          if (count > questionNumber) {
            // End of the series of questions.
            endGame();
            return;
          }

          const index = Math.floor(Math.random() * questions.length);
          const question = questions[index];
          // remove the question from the list
          questions.splice(index, 1);
          overwriteMain(
            questionComponent(
              question,
              count,
              questionNumber,
              (questionId, isCorrect) => {
                userAnswers[questionId] = isCorrect;
              },
              (prevCount) => createQuestionComponent(prevCount + 1),
              () => endGame()
            )
          );
        };

        // First question created
        createQuestionComponent();
      }
    );

    overwriteMain(welcome);
  };

  startGame();
});

/**
 * It takes a question and an array of answers and returns an object with an id, the question, and
 * an array of answers with ids
 * @param {string} question - The question that will be displayed to the user.
 * @param {Array} answers - an array of objects with the following properties.
 * @param {number} correct - index of the correct answer.
 * @returns {object} - An object with the following properties:
 * * id - The id of the question.
 * * question - The question that will be displayed to the user.
 * * answers - an array of objects with the following properties:
 */
const createQuestion = (question, answers, correct) => {
  // create id
  const id = "id" + Math.random().toString(36).substring(2, 15);
  return {
    id,
    question,
    answers: answers.map((answer, index) => {
      return {
        id: "id" + Math.random().toString(36).substring(2, 15),
        answer,
        isCorrect: index + 1 == correct,
      };
    }),
  };
};
