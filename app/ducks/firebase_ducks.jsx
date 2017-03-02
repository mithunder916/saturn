/* -----------------    ACTIONS     ------------------ */
const SET_FIREBASE = 'SET_FIREBASE'
/* ------------   ACTION CREATORS     ------------------ */
export const setFirebase = firebase => ({
  type: SET_FIREBASE,
  firebase
})
/* ------------       REDUCER     ------------------ */
const reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_FIREBASE:
      return action.firebase
    default:
      return state;
  }
}

export default reducer;
