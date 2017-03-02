/* -----------------    ACTIONS     ------------------ */
const SET_TEMPO = 'SET_TEMPO';

/* ------------   ACTION CREATORS     ----------------- */

export const setTempo = tempo => ({
  type: SET_TEMPO,
  tempo
})

/* -------------       REDUCER     ------------------- */
// add patterns? columns? rows?
const initialState = {
  tempo: 90
}

const drumReducer = (state = initialState, action) => {
  switch (action.type){
    case SET_TEMPO:
        return Object.assign({}, state, {tempo: action.tempo})
    default:
        return state;
    }
};

export default drumReducer;

