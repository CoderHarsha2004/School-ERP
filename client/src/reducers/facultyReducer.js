const initialState = {
  faculty: [],
  loading: false,
  error: null,
};

const facultyReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_FACULTY_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_FACULTY_SUCCESS':
      return { ...state, loading: false, faculty: action.payload };
    case 'FETCH_FACULTY_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'ADD_FACULTY_SUCCESS':
      return { ...state, faculty: [...state.faculty, action.payload] };
    case 'UPDATE_FACULTY_SUCCESS':
      return {
        ...state,
        faculty: state.faculty.map(f => f._id === action.payload._id ? action.payload : f),
      };
    case 'DELETE_FACULTY_SUCCESS':
      return {
        ...state,
        faculty: state.faculty.filter(f => f._id !== action.payload),
      };
    default:
      return state;
  }
};

export default facultyReducer;
