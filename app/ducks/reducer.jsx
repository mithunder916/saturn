/* -----------------    ACTIONS     ------------------ */
const UPDATE = 'UPDATE'
const CLEAR = 'CLEAR'

/* ------------   ACTION CREATORS     ----------------- */

export const exampleUpdate = () => ({
  type: UPDATE
})

/* -------------       REDUCER     ------------------- */

const reducer = (state = '', action) => {
  switch (action.type){
    case UPDATE:
        return "you updated!"
    default:
        return state;
    }
};

export default reducer;