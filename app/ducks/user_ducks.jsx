/* -----------------    ACTIONS     ------------------ */

const SET_USER = 'SET_USER';
const CLEAR_USER = 'CLEAR_USER';

/* ------------   ACTION CREATORS     ------------------ */

export const setUser = user => ({
  type: SET_USER,
  user
});

export const clearUser = () => ({
  type: CLEAR_USER
});

/* ------------       REDUCER     ------------------ */

const reducer = (state = {}, action) => {

  switch (action.type) {
    case SET_USER:
      return action.user;
     case CLEAR_USER:
      return {};
    default:
      return state;
  }
};

export default reducer;
