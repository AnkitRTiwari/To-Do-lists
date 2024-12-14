const checkBoxList = document.querySelectorAll(".custom-checkbox");
const inputFields = document.querySelectorAll(".goal-input");
const errorLabel = document.querySelector(".error-label");
const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");
const progressLabel = document.querySelector(".progress-label");
const quote = document.querySelector(".quote");

const quoteList = [
  "Move One Step Ahead, Today!",
  "Keep it Up..You can do it!",
  "'Buck Up..' you can do it!",
  "Thanks For using this App...",
];

const allQuotes = [
  "Raise the bar by completing your goals!",
  "well begun is half done!",
  "just a step away, keep going!",
  "Whoa! You just completed all the Goals, time for chill 😎!",
];

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {
  first: {
    name: "",
    completed: false,
  },
  second: {
    name: "",
    completed: false,
  },
  third: {
    name: "",
    completed: false,
  },
};
let completedGoals = Object.values(allGoals).filter(
  (goal) => goal.completed
).length;
progressValue.firstElementChild.innerText = `${completedGoals}/3 completed`;
progressValue.style.width = `${(completedGoals / 3) * 100}%`;
progressLabel.innerText = allQuotes[`${completedGoals}`];
quote.innerText = quoteList[`${completedGoals}`];

checkBoxList.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    const allGoalsAdded = [...inputFields].every((input) => {
      return input.value;
    });

    if (allGoalsAdded) {
      checkbox.parentElement.classList.toggle("completed");
      const inputId = checkbox.nextElementSibling.id;
      allGoals[inputId].completed = !allGoals[inputId].completed;
      completedGoals = Object.values(allGoals).filter(
        (goal) => goal.completed
      ).length;
      progressValue.style.width = `${(completedGoals / 3) * 100}%`;
      localStorage.setItem("allGoals", JSON.stringify(allGoals));
      progressValue.firstElementChild.innerText = `${completedGoals}/3 completed`;
      progressLabel.innerText = allQuotes[`${completedGoals}`];
      quote.innerText = quoteList[`${completedGoals}`];
    } else {
      errorLabel.classList.add("Show");
    }
  });
});

inputFields.forEach((input) => {
  input.value = allGoals[input.id].name;

  if (allGoals[input.id].completed) {
    input.parentElement.classList.add("completed");
  }
  input.addEventListener("focus", () => {
    errorLabel.classList.remove("Show");
  });

  input.addEventListener("input", (e) => {
    if (allGoals[input.id].completed) {
      input.value = allGoals[input.id].name;
      return;
    }

    allGoals[input.id].name = input.value;
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});
