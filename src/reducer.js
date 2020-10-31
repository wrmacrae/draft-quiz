import { SET_DRAFT, MAKE_GUESS, MAKE_PICK } from './actions'

const getPicks = async (id) => {
    const response = await fetch("https://www.17lands.com/data/draft/?draft_id=" + id)
    const json = await response.json()
    return json.picks

}

function isLoading(state = {}, id) {
  console.log("loading");
  return Object.assign({}, state, {
    loading: true
  })
}

function loadDraftSuccess(state = {}, id, json) {
  console.log("loaded");
  if (state.id === id && state.loading) {
    return Object.assign({}, state, {
      loading: false,
      picks: json.picks,
      cards: json.picks[0].available,
      answer: json.picks[0].pick,
      deck: [],
      sidebaord: [],
      score: {
        right: 0,
        total: 0 
      },
      pickNumber: 0,
      guess: "",
      draft: json,
    });
  } else {
    return state;
  }
}

function setDraft(state = {}, id) {
  console.log("setDraft");
  return (dispatch) => {
    const logs = require('./logs');
    const log = logs[id];
    dispatch(isLoading(id));
    if (log.picks === undefined) {
      fetch("https://www.17lands.com/data/draft/?draft_id=" + id)
      .then(res => res.json())
      .then((json) => {
        dispatch(loadDraftSuccess(id, json));
      })
      .catch(err => { throw err });
    } else {
      dispatch(loadDraftSuccess(id, log))
    }
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
  case MAKE_GUESS:
    return guess(state, action.guess);
  case MAKE_PICK:
    return pick(state)
  default:
    return state;
  }
}