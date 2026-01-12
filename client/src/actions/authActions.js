import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'https://school-erp-1p9x.onrender.com/api';

export const login = (credentials) => async (dispatch) => {
  try {
    dispatch({ type: 'LOGIN_REQUEST' });
    const res = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data.message });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: 'LOGOUT' });
};
