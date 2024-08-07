/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

const SUITS = ["Clubs", "Diamonds", "Hearts", "Spades"];

const suitProperties = {
  Diamonds: {
    color: "danger",
    symbol: "♦"
  },
  Hearts: {
    color: "danger",
    symbol: "♥"
  },
  Spades: {
    color: "black",
    symbol: "♠"
  },
  Clubs: {
    color: "black",
    symbol: "♣"
  }
};

const RANKS = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "Jack",
  "Queen",
  "King",
  "Ace"
];

let timeoutId = null;

// I am following Airbnb JavaScript Style Guide.
// See https://github.com/airbnb/javascript

const replaceColor = function replaceBootstrapColorClass(node, newColor) {
  for (let i = 0; i < node.classList.length; i++) {
    const existingClass = node.classList[i];
    if (existingClass.startsWith("text-")) {
      node.classList.remove(existingClass);
      node.classList.add(`text-${newColor}`);
      break;
    }
  }
};

const getRandomInteger = function getRandomIntegerBetweenLAndRInclusive(l, r) {
  return l + Math.floor(Math.random() * (r - l + 1));
};

const generateCard = function generateAndRenderSuitAndRankRandomly() {
  const randomSuit = SUITS[getRandomInteger(0, SUITS.length - 1)];
  const randomRank = RANKS[getRandomInteger(0, RANKS.length - 1)];

  const randomSuitColor = suitProperties[randomSuit].color;
  const randomSuitSymbol = suitProperties[randomSuit].symbol;

  const cardHeaderText = document.getElementById("card-header-text");
  const cardBodyText = document.getElementById("card-body-text");
  const cardFooterText = document.getElementById("card-footer-text");

  replaceColor(cardHeaderText, randomSuitColor);
  replaceColor(cardBodyText, randomSuitColor);
  replaceColor(cardFooterText, randomSuitColor);

  cardHeaderText.innerHTML = randomSuitSymbol;
  cardBodyText.innerHTML = randomRank.length > 2 ? randomRank[0] : randomRank;
  cardFooterText.innerHTML = randomSuitSymbol;

  if (timeoutId !== null) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(generateCard, 10000);
};

const newCardButton = document.getElementById("new-card-button");
newCardButton.addEventListener("click", event => {
  generateCard();
});

const MIN_WIDTH = 250;
const MAX_WIDTH = 750;
const MIN_HEIGHT = 350;
const MAX_HEIGHT = 1050;

const widthInput = document.getElementById("width-input");
const heightInput = document.getElementById("height-input");

widthInput.addEventListener("change", event => {
  const newWidth = event.target.value;
  if (
    newWidth !== null &&
    MIN_WIDTH <= parseInt(newWidth) &&
    parseInt(newWidth) <= MAX_WIDTH
  ) {
    const card = document.getElementsByClassName("card")[0];
    card.style.setProperty("width", `${newWidth}px`);
  }
});

heightInput.addEventListener("change", event => {
  const newHeight = event.target.value;
  if (
    newHeight !== null &&
    MIN_HEIGHT <= parseInt(newHeight) &&
    parseInt(newHeight) <= MAX_HEIGHT
  ) {
    const card = document.getElementsByClassName("card")[0];
    card.style.setProperty("height", `${newHeight}px`);
  }
});

const resetCardDimensions = document.getElementById("reset-card-dimensions");
resetCardDimensions.addEventListener("click", event => {
  const card = document.getElementsByClassName("card")[0];
  card.style.setProperty("width", `${MIN_WIDTH}px`);
  card.style.setProperty("height", `${MIN_HEIGHT}px`);
  widthInput.value = "";
  heightInput.value = "";
});

window.addEventListener("load", event => {
  generateCard();
});
