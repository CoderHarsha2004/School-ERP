import axios from 'axios';

const API_BASE_URL = 'https://school-erp-1p9x.onrender.com/api';

export const fetchFees = () => async (dispatch, getState) => {
  const { auth } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  };
  try {
    dispatch({ type: 'FETCH_FEES_REQUEST' });
    const res = await axios.get(`${API_BASE_URL}/fees`, config);
    dispatch({ type: 'FETCH_FEES_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'FETCH_FEES_FAILURE', payload: error.response?.data?.message || error.message });
  }
};

export const createFee = (feeData) => async (dispatch, getState) => {
  const { auth } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  };
  try {
    dispatch({ type: 'CREATE_FEE_REQUEST' });
    const res = await axios.post(`${API_BASE_URL}/fees`, feeData, config);
    dispatch({ type: 'ADD_FEE_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'CREATE_FEE_FAILURE', payload: error.response?.data?.message || error.message });
  }
};

export const updateFee = (id, feeData) => async (dispatch, getState) => {
  const { auth } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  };
  try {
    dispatch({ type: 'UPDATE_FEE_REQUEST' });
    const res = await axios.put(`${API_BASE_URL}/fees/${id}`, feeData, config);
    dispatch({ type: 'UPDATE_FEE_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'UPDATE_FEE_FAILURE', payload: error.response?.data?.message || error.message });
  }
};

export const deleteFee = (id) => async (dispatch, getState) => {
  const { auth } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  };
  try {
    dispatch({ type: 'DELETE_FEE_REQUEST' });
    await axios.delete(`${API_BASE_URL}/fees/${id}`, config);
    dispatch({ type: 'DELETE_FEE_SUCCESS', payload: id });
  } catch (error) {
    dispatch({ type: 'DELETE_FEE_FAILURE', payload: error.response?.data?.message || error.message });
  }
};
