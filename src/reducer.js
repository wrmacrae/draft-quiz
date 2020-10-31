import { SET_DRAFT, SET_DRAFT_WITH_DATA, MAKE_GUESS, MAKE_PICK } from './actions'

function setDraft(state = {}, id) {
  const logs = require('./logs');
  const log = logs[id];
  return setDraftWithData(state, id, log);
}

function setDraftWithData(state = {}, id, data) {
  const cards = data.picks[0].available;
  const answer = data.picks[0].pick;
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
    "draft": data,
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
  var deck = nextPickNumber >= state.draft.picks.length ? state.deck : state.draft.picks[nextPickNumber].possible_maindeck;
  const sideboard = nextPickNumber >= state.draft.picks.length ? [] : state.draft.picks[nextPickNumber].probable_sideboard;
  if (nextPickNumber >= state.draft.picks.length && state.draft.deck !== undefined) {
    deck = state.draft.deck;
  }
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
  case SET_DRAFT_WITH_DATA:
    return setDraftWithData(state, action.id, action.data);
  case MAKE_GUESS:
    return guess(state, action.guess);
  case MAKE_PICK:
    return pick(state)
  default:
    return state;
  }
}