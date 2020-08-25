import { SET_DRAFT, MAKE_GUESS, MAKE_PICK } from './actions'

function setDraft(state = {}, id) {
  const log = require('./' + id);
  const cards = log.picks[0].available;
  const answer = log.picks[0].pick;
  return {
    "pickNumber": 0,
    "guess": "",
    "answer": answer,
    "cards": cards,
    "deck": [],
    "sideboard": [],
    "score": {
      "right": 0,
      "total": 0 
    },
    "draft": log,
    "id": id
  };
}

function guess(state, guess) {
  return Object.assign({}, state, {
    guess: guess
  })
}

function pick(state) {
  const correct = state.answer === state.guess;
  const nextPickNumber = state.pickNumber + 1;
  const answer = nextPickNumber >= state.draft.picks.length ? "" : state.draft.picks[nextPickNumber].pick;
  const cards = nextPickNumber >= state.draft.picks.length ? [] : state.draft.picks[nextPickNumber].available;
  const deck = nextPickNumber >= state.draft.picks.length ? state.deck : state.draft.picks[nextPickNumber].possible_maindeck;
  const sideboard = nextPickNumber >= state.draft.picks.length ? state.sideboard : state.draft.picks[nextPickNumber].probable_sideboard;;
  return Object.assign({}, state, {
    pickNumber: nextPickNumber,
    guess: "",
    answer: answer,
    cards: cards,
    deck: deck,
    sideboard: sideboard,
    score: {
      right: state.score.right + correct,
      total: state.score.total + 1,
    },
  })
}

export default function(state = {}, action) {
  switch(action.type) {    
  case SET_DRAFT:
    return setDraft(state, action.id);
  case MAKE_GUESS:
    return guess(state, action.guess);
  case MAKE_PICK:
    return pick(state)
  default:
    return state;
  }
}