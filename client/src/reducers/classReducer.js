const initialState = {
  classes: [],
  loading: false,
  error: null,
};

const classReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CLASSES_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_CLASSES_SUCCESS':
      return { ...state, loading: false, classes: action.payload };
    case 'FETCH_CLASSES_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'CREATE_CLASS_SUCCESS':
      return { ...state, classes: [...state.classes, action.payload] };
    case 'UPDATE_CLASS_SUCCESS':
      return {
        ...state,
        classes: state.classes.map(c => c._id === action.payload._id ? action.payload : c),
      };
    case 'DELETE_CLASS_SUCCESS':
      return {
        ...state,
        classes: state.classes.filter(c => c._id !== action.payload),
      };
    default:
      return state;
  }
};

export default classReducer;
