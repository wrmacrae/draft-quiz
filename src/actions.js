/*
 * action types
 */

export const SET_DRAFT = 'SET_DRAFT';
export const SET_DRAFT_WITH_DATA = 'SET_DRAFT_WITH_DATA';
export const MAKE_GUESS = 'MAKE_GUESS';
export const MAKE_PICK = 'MAKE_PICK';

/*
 * action creators
 */

export function setDraft(id) {
  return { type: SET_DRAFT, id };
}

export function setDraftWithData(id, data) {
  return { type: SET_DRAFT_WITH_DATA, id, data };
}

export function makeGuess(guess) {
  return { type: MAKE_GUESS, guess };
}

export function makePick(guess) {
  return { type: MAKE_PICK, guess };
}
