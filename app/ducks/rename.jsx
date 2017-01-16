/* -----------------    ACTIONS     ------------------ */
const UPDATE = 'UPDATE'
const CLEAR = 'CLEAR'

/* ------------   ACTION CREATORS     ----------------- */

export const exampleUpdate = () => ({
  type: UPDATE
})

/* -------------       REDUCER     ------------------- */

const reducer = (state = 'You have not updated.', action) => {
  switch (action.type){
    case UPDATE:
        return 'You clicked update!'
    default:
        return state;
    }
};

export default reducer;
