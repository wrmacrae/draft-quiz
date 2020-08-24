function pick(state, guess) {
  const correct = state.draft.picks[state.pickNumber].pick === guess;
  const nextPickNumber = state.pickNumber + 1;
  const cards = nextPickNumber >= state.draft.picks.length ? [] : state.draft.picks[nextPickNumber].available;
  const deck = nextPickNumber >= state.draft.picks.length ? state.deck : state.draft.picks[nextPickNumber].possible_maindeck;
  const sideboard = nextPickNumber >= state.draft.picks.length ? state.sideboard : state.draft.picks[nextPickNumber].probable_sideboard;;
  return Object.assign({}, state, {
    pickNumber: nextPickNumber,
    lastGuess: guess,
    cards: cards,
    deck: deck,
    sideboard: sideboard,
    score: {
      right: state.score.right + correct,
      total: state.score.total + 1,
    },
  })
}

function setDraft(state = {}, id) {
  const logUrl = "https://www.17lands.com/draft/" + id;
  const log = require('./' + id);
  const cards = log.picks[0].available;
  return {
    "pickNumber": 0,
    "lastGuess": "",
    "cards": cards,
    "deck": [],
    "sideboard": [],
    "score": {
      "right": 0,
      "total": 0 
    },
    "draft": log,
    "logUrl": logUrl
  };
}

export default function(state = {}, action) {
  switch(action.type) {
  case 'MAKE_PICK':
    return pick(state, action.guess)
  case 'SET_DRAFT':
    return setDraft(state, action.id);
  default:
    return state;
  }
}