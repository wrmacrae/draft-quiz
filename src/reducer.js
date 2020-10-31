function draft(state = {}, id) {
  const logs = require('./logs');
  const log = logs[id];
  if (log.picks === undefined) {
    return isLoading(state, id);
  } else {
    return setDraftWithData(state, id, log)
  }
}

function isLoading(state = {}, id) {
  return Object.assign({}, state, {
    loading: true,
    "score": {
      "right": 0,
      "total": 0 
    },
    "deck": [],
    "sideboard": [],
    id: id,
  })  
}

function fetchDataSuccess(state = {}, id, json) {
  if (state.id === id && state.loading) {
    return Object.assign({}, state, {
      loading: false,
      picks: json.picks,
      cards: json.picks[0].available,
      answer: json.picks[0].pick,
      pickNumber: 0,
      guess: "",
      draft: json,
    });
  } else {
    return state;
  }
}

function setDraftWithData(state = {}, id, log) {
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
/*
 * action types
 */

export const SET_DRAFT = 'SET_DRAFT';
export const MAKE_GUESS = 'MAKE_GUESS';
export const MAKE_PICK = 'MAKE_PICK';

/*
 * action creators
 */

export function setDraft(id) {
  return (dispatch, getState) => {
    return draft(getState(), id);
  };
}

export function makeGuess(guess) {
  return { type: MAKE_GUESS, guess };
}

export function makePick(guess) {
  return { type: MAKE_PICK, guess };
}

export default function(state = {}, action) {
  switch(action.type) {    
  case SET_DRAFT:
    return draft(state, action.id);
  case MAKE_GUESS:
    return guess(state, action.guess);
  case MAKE_PICK:
    return pick(state)
  default:
    return state;
  }
}