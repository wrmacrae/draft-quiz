/*
 * action types
 */

export const MAKE_PICK = 'MAKE_PICK'
export const SET_DRAFT = 'SET_DRAFT'

/*
 * action creators
 */

export function makePick(guess) {
  return { type: MAKE_PICK, guess }
}

export function setDraft(id) {
  return { type: SET_DRAFT, id }
}