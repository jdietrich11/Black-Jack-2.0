// From HTML Objects
const gameBoard = document.querySelector(".gameBoard");
const title = document.querySelector(".title");
const newGame = document.querySelector(".newGame");
const dealBtn = document.querySelector(".deal");
const bank = document.querySelector(".bank");
const bankNum = document.querySelector(".bankNum");
const bid = document.querySelector(".bid");
const dealerTotal = document.querySelector(".dealerTot");
const nextHandBtn = document.querySelector(".nextHand");
const playerTotal = document.querySelector(".playerTot");
const dealerHandCards = document.querySelector(".dealerHand");
const card1 = document.querySelector(".card-1");
const card2 = document.querySelector(".card-2");
const card3 = document.querySelector(".card-3");
const card4 = document.querySelector(".card-4");
const card5 = document.querySelector(".card-5");
const card6 = document.querySelector(".card-6");
const card7 = document.querySelector(".card-7");
const card8 = document.querySelector(".card-8");
const card9 = document.querySelector(".card-9");
const card10 = document.querySelector(".card-10");
const deck = document.querySelector(".deck");
const playerHandCards = document.querySelector(".playerHand");
const dealerNum = document.querySelector(`.dealerNumber`);
const playerNum = document.querySelector(`.playerNumber`);
const hitMeBtn = document.querySelector(".hitBtn");
const standBtn = document.querySelector(".standBtn");
const input = document.querySelector(".input");
const subBtn = document.querySelector(".subBtn");
const overlay = document.querySelector(".overlay");
const firstName = document.querySelector(".firstName");

// Reuse Functions
function clearCards() {
  card1.classList.add("hidden");
  card2.classList.add("hidden");
  card3.classList.add("hidden");
  card4.classList.add("hidden");
  card5.classList.add("hidden");
  card6.classList.add("hidden");
  card7.classList.add("hidden");
  card8.classList.add("hidden");
  card9.classList.add("hidden");
  card10.classList.add("hidden");
}

// Variables
let test = [];
let dealerVals = [];
let newDeck = [];
let tempDeck = [];
drawnCards = [];
bankAmount = 100;
bidAmount = Number(0);
let dealerHand = [];
let playerHand = [];
let dealerValues = [];
let playerValues = [];
let dealerTotals = 0;

function refresh() {
  vals = [];
  dealerVals = [];
  playerNum.textContent = playerTotals;
  dealerNum.textContent = dealerTotals;
}

// // Deck
// Create Deck
const fetchDeck = (
  url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6"
) => {
  return axios.get(url);
};
tempDeck = fetchDeck();

const printDeck = ({ data }) => {
  for (let deck of data.deck_id) {
    newDeck = data.deck_id;
  }
};

const drawCard = (
  url = "https://deckofcardsapi.com/api/deck/" + `${newDeck}` + "/draw/?count=1"
) => {
  return axios.get(url);
};
const printCard = ({ data }) => {
  newCard = data.cards[0].code;
  cardVal = data.cards[0].value;
  test.push(newCard);
  vals.push(cardVal);
  playerHand.push(test.slice(-1));
  playerValues.push(vals.slice(-1));
  getPlayerTotal();
};
const updDealer = ({ data }) => {
  newCard = data.cards[0].code;
  cardVal = data.cards[0].value;
  test.push(newCard);
  dealerVals.push(cardVal);
  dealerHand.push(test.slice(-1));
  dealerValues.push(dealerVals.slice(-1));
};

function cardSrc(upd) {
  card6.src = `https://deckofcardsapi.com/static/img/${playerHand[0]}.png`;
  card7.src = `https://deckofcardsapi.com/static/img/${playerHand[1]}.png`;
}
function dealerCardSrc() {
  card1.src = `/deck.jpg`;
  card2.src = `https://deckofcardsapi.com/static/img/${dealerHand[1]}.png`;
}

fetchDeck()
  .then(printDeck)
  .catch((err) => {
    console.log(err);
  });
// // Play
// Bid

bid.oninput = function () {};

// Deal cards
dealBtn.addEventListener("click", function () {
  bidAmount += Number(bid.value);
  bankAmount -= bidAmount;
  if (bidAmount > 0 && bankAmount >= 0) {
    bankNum.textContent = bankAmount;
    card1.classList.remove("hidden");
    card2.classList.remove("hidden");
    card6.classList.remove("hidden");
    card7.classList.remove("hidden");
    dealBtn.classList.add("hidden");
    hitMeBtn.classList.remove("hidden");
    standBtn.classList.remove("hidden");
    dealerTotal.classList.remove("hidden");
    playerTotal.classList.remove("hidden");
    drawCard().then(printCard).then(cardSrc);
    drawCard().then(printCard).then(cardSrc);
    drawCard().then(updDealer).then(dealerCardSrc);
    drawCard().then(updDealer).then(dealerCardSrc);
    getPlayerTotal();
  } else if (bankAmount < 0 && bidAmount < 0) {
    alert("Game OVER!");
    newGame.classList.remove("hidden");
    hitMeBtn.classList.add("hidden");
    standBtn.classList.add("hidden");
  } else if (bidAmount === 0) {
    alert("Invalid Bid");
  }
});

// Hit or Stand
standBtn.addEventListener("click", function () {
  card1.src = `https://deckofcardsapi.com/static/img/${dealerHand[0]}.png`;

  standBtn.classList.add("hidden");
  hitMeBtn.classList.add("hidden");
  nextHandBtn.classList.remove("hidden");
  getDealerTotal();
  dealerTurn();
});

function updPlayerCard() {
  if (playerHand.length === 3) {
    card8.classList.remove("hidden");
    card8.src = `https://deckofcardsapi.com/static/img/${playerHand[2]}.png`;
  } else if (playerHand.length === 4) {
    card9.classList.remove("hidden");
    card9.src = `https://deckofcardsapi.com/static/img/${playerHand[3]}.png`;
  } else if (playerHand.length === 5) {
    card10.classList.remove("hidden");
    card10.src = `https://deckofcardsapi.com/static/img/${playerHand[4]}.png`;
  } else {
  }
}
function updDealerCard() {
  if (dealerHand.length === 3) {
    card3.classList.remove("hidden");
    card3.src = `https://deckofcardsapi.com/static/img/${dealerHand[2]}.png`;
    getDealerTotal();
  } else if (dealerHand.length === 4) {
    card4.classList.remove("hidden");
    card4.src = `https://deckofcardsapi.com/static/img/${dealerHand[3]}.png`;
    getDealerTotal();
  } else if (dealerHand.length === 5) {
    card5.classList.remove("hidden");
    card5.src = `https://deckofcardsapi.com/static/img/${dealerHand[4]}.png`;
    getDealerTotal();
  } else {
    getDealerTotal();
  }
}

hitMeBtn.addEventListener("click", function () {
  drawCard().then(printCard).then(cardSrc).then(updPlayerCard);
  getPlayerTotal();
});
// New Hand
nextHandBtn.addEventListener("click", function () {
  if (bankAmount === 0) {
    newGame.classList.remove("hidden");
    nextHandBtn.classList.add("hidden");
    nameCheck();
  } else {
    nextHandBtn.classList.add("hidden");
    dealBtn.classList.remove("hidden");
    clearCards();
    bid.value = "";
    bidAmount = 0;
    playerHand = [];
    dealerHand = [];
    delaerTotals = 0;
    playerTotals = 0;
    refresh();
    shuffle();
  }
});

// Adding Totals
let vals = [];
let playerTotals = 0;
function getPlayerTotal() {
  playerTotals = [];
  for (let i = 0; i < vals.length; i++) {
    if (vals[i] === "KING" || vals[i] === "QUEEN" || vals[i] === "JACK") {
      playerTotals = Number(playerTotals) + 10;
    } else if (vals[i] === "ACE") {
      playerTotals = Number(playerTotals) + 1;
      if (playerTotals < 12) {
        playerTotals = Number(playerTotals) + 10;
      }
    } else {
      playerTotals = Number(playerTotals) + Number(vals[i]);
    }
  }
  updPlayerTot();
}
function getDealerTotal() {
  dealerTotals = [];
  for (let i = 0; i < dealerVals.length; i++) {
    if (
      dealerVals[i] === "KING" ||
      dealerVals[i] === "QUEEN" ||
      dealerVals[i] === "JACK"
    ) {
      dealerTotals = Number(dealerTotals) + 10;
    } else if (dealerVals[i] === "ACE") {
      dealerTotals = Number(dealerTotals) + 1;
      if (dealerTotals < 12) {
        dealerTotals = Number(dealerTotals) + 10;
      }
    } else {
      dealerTotals = Number(dealerTotals) + Number(dealerVals[i]);
    }
  }
  updDealerTot();
}
function updPlayerTot() {
  playerNum.textContent = playerTotals;
}
function updDealerTot() {
  dealerNum.textContent = dealerTotals;
}

// Dealer turn
function dealerTurn() {
  if (playerTotals > 21) {
    checkVictor();
  } else if (dealerTotals < playerTotals && Number(dealerTotals) < 21) {
    drawCard()
      .then(updDealer)
      .then(dealerCardSrc)
      .then(updDealerCard)
      .then(dealerTurn);
  } else if (dealerTotals > 21) {
    checkVictor();
  } else {
    checkVictor();
  }
}

// check victor
function checkVictor() {
  if (playerTotals < 22 && dealerTotals < 22) {
    if (playerTotals > dealerTotals) {
      console.log(`Player Win`);
    } else if (dealerTotals > playerTotals) {
      refresh();
    } else if ((dealertotals = playerTotals)) {
      bankAmount += bidAmount;
      bankNum.textContent = bankAmount;
    }
  } else if (playerTotals < 22 && dealerTotals > 21) {
    bankAmount = bankAmount + 2 * bidAmount;
    bankNum.textContent = bankAmount;
  } else if (dealerTotals < 22 && playerTotals > 21) {
    refresh();
  } else {
    refresh();
  }
}
// update bank

// Shuffle
function shuffle() {
  fetch(`https://deckofcardsapi.com/api/deck/${newDeck}/shuffle/`);
}

// START OVER

newGame.addEventListener("click", function () {
  newGame.classList.add("hidden");
  clearCards();
  bankAmount = 100;
  bidAmount = 0;
  bankNum.textContent = bankAmount;
  bid.value = "";
  dealBtn.classList.remove("hidden");
});

// Info Page
subBtn.addEventListener("click", function () {
  overlay.classList.add("hidden");
  dealBtn.classList.remove("hidden");
  bank.classList.remove("hidden");
  bid.classList.remove("hidden");
  dealerTotal.classList.remove("hidden");
  playerTotal.classList.remove("hidden");
  bankNum.classList.remove("hidden");
});

function nameCheck() {
  if (firstName.value !== "Josh") {
    window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  }
}

// /// /// / // TODO
