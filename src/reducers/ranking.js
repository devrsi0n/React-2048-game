const initState = {
  list: []
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case "SET_RANKING_LIST":
      return { ...state, list: action.data };
    default:
      return state;
  }
}
