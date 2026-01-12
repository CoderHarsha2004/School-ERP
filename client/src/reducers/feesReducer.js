const initialState = {
  fees: [],
  fee: null,
  loading: false,
  error: null,
};

const feesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_FEES_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_FEES_SUCCESS':
      return { ...state, loading: false, fees: action.payload };
    case 'FETCH_FEES_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'FETCH_FEE_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_FEE_SUCCESS':
      return { ...state, loading: false, fee: action.payload };
    case 'FETCH_FEE_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'CREATE_FEE_REQUEST':
      return { ...state, loading: true, error: null };
    case 'CREATE_FEE_SUCCESS':
      return { ...state, loading: false, fees: [...state.fees, action.payload] };
    case 'CREATE_FEE_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_FEE_REQUEST':
      return { ...state, loading: true, error: null };
    case 'UPDATE_FEE_SUCCESS':
      return {
        ...state,
        loading: false,
        fees: state.fees.map(fee =>
          fee._id === action.payload._id ? action.payload : fee
        ),
      };
    case 'UPDATE_FEE_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'DELETE_FEE_REQUEST':
      return { ...state, loading: true, error: null };
    case 'DELETE_FEE_SUCCESS':
      return {
        ...state,
        loading: false,
        fees: state.fees.filter(fee => fee._id !== action.payload),
      };
    case 'DELETE_FEE_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default feesReducer;
