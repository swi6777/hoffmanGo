const initialState = {
  xp: 0,
  collectedHeads: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'COLLECT_HEAD':
      return {
        ...state,
        xp: Math.min(state.xp + 1, 10),
        collectedHeads: state.collectedHeads + 1,
      };
    default:
      return state;
  }
};

export default reducer;
