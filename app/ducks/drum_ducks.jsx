/* -----------------    ACTIONS     ------------------ */
const SET_TEMPO = 'SET_TEMPO';
const SET_COLUMNS = 'SET_COLUMNS';
const ADD_ROW = 'ADD_ROW';
const SET_TYPE = 'SET_TYPE';


/* ------------   ACTION CREATORS     ----------------- */

export const setTempo = tempo => ({
  type: SET_TEMPO,
  tempo
})

export const setColumns = columns => ({
  type: SET_COLUMNS,
  columns
})

export const addRow = () => ({
  type: ADD_ROW
})

// export const setType = (numColumns,  => ({
//   type: SET_numColumns,
//   SET_TYPE
// })

/* -------------       REDUCER     ------------------- */
const initialState = {
  tempo: 90,
  numColumns: 16,
  rows: 3,
  types: ['hihat', 'snare', 'kick']
}

const drumReducer = (state = initialState, action) => {
  switch (action.type){
    case SET_TEMPO:
        return Object.assign({}, state, {tempo: action.tempo});
    case SET_COLUMNS:
        return Object.assign({}, state, {numColumns: action.columns});
    case ADD_ROW:
        return Object.assign({}, state, state['rows']+=1 );
    default:
        return state;
    }
};

export default drumReducer;

