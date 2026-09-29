const checkBoxList = document.querySelectorAll(".custom-checkbox");
const inputFields = document.querySelectorAll(".goal-input");
const errorLabel = document.querySelector(".error-label");
const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");
const progressLabel = document.querySelector(".progress-label");
const quote = document.querySelector(".quote");
const todayDate = document.querySelector(".today-date");

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

todayDate.innerText = new Date().toLocaleDateString(undefined, {
  weekday: "long",
  month: "long",
  day: "numeric",
});

const updateProgress = () => {
  const completedGoals = Object.values(allGoals).filter(
    (goal) => goal.completed
  ).length;
  progressValue.style.width = `${(completedGoals / 3) * 100}%`;
  progressValue.firstElementChild.innerText = `${completedGoals}/3 completed`;
  progressBar.dataset.count = completedGoals;
  progressLabel.innerText = allQuotes[completedGoals];
  quote.innerText = quoteList[completedGoals];
};

const showError = () => {
  errorLabel.classList.remove("Show");
  // Force reflow so the shake animation replays on repeated clicks
  void errorLabel.offsetWidth;
  errorLabel.classList.add("Show");
};

updateProgress();

checkBoxList.forEach((checkbox) => {
  const toggleGoal = () => {
    const allGoalsAdded = [...inputFields].every((input) => {
      return input.value.trim();
    });

    if (allGoalsAdded) {
      const inputId = checkbox.nextElementSibling.id;
      allGoals[inputId].completed = !allGoals[inputId].completed;
      checkbox.parentElement.classList.toggle(
        "completed",
        allGoals[inputId].completed
      );
      checkbox.setAttribute("aria-checked", allGoals[inputId].completed);
      // Completed goals are locked from editing until unchecked
      checkbox.nextElementSibling.readOnly = allGoals[inputId].completed;
      localStorage.setItem("allGoals", JSON.stringify(allGoals));
      updateProgress();
    } else {
      showError();
    }
  };

  checkbox.addEventListener("click", toggleGoal);
  checkbox.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleGoal();
    }
  });
});

inputFields.forEach((input) => {
  input.value = allGoals[input.id].name;

  if (allGoals[input.id].completed) {
    input.parentElement.classList.add("completed");
    input.previousElementSibling.setAttribute("aria-checked", "true");
    input.readOnly = true;
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
