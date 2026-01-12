import axios from 'axios';

const API_BASE_URL = 'https://school-erp-1p9x.onrender.com/api';

export const fetchFaculty = () => async (dispatch, getState) => {
  const { auth } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  };
  try {
    dispatch({ type: 'FETCH_FACULTY_REQUEST' });
    const res = await axios.get(`${API_BASE_URL}/faculty`, config);
    dispatch({ type: 'FETCH_FACULTY_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'FETCH_FACULTY_FAILURE', payload: error.response?.data?.message || error.message });
  }
};

export const fetchFacultyById = (id) => async (dispatch, getState) => {
  const { auth } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  };
  try {
    dispatch({ type: 'FETCH_FACULTY_BY_ID_REQUEST' });
    const res = await axios.get(`${API_BASE_URL}/faculty/${id}`, config);
    dispatch({ type: 'FETCH_FACULTY_BY_ID_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'FETCH_FACULTY_BY_ID_FAILURE', payload: error.response?.data?.message || error.message });
  }
};

export const createFaculty = (facultyData) => async (dispatch, getState) => {
  const { auth } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  };
  try {
    dispatch({ type: 'CREATE_FACULTY_REQUEST' });
    const res = await axios.post(`${API_BASE_URL}/faculty`, facultyData, config);
    dispatch({ type: 'ADD_FACULTY_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'CREATE_FACULTY_FAILURE', payload: error.response?.data?.message || error.message });
  }
};

export const updateFaculty = (id, facultyData) => async (dispatch, getState) => {
  const { auth } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  };
  try {
    dispatch({ type: 'UPDATE_FACULTY_REQUEST' });
    const res = await axios.put(`${API_BASE_URL}/faculty/${id}`, facultyData, config);
    dispatch({ type: 'UPDATE_FACULTY_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'UPDATE_FACULTY_FAILURE', payload: error.response?.data?.message || error.message });
  }
};

export const deleteFaculty = (id) => async (dispatch, getState) => {
  const { auth } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  };
  try {
    dispatch({ type: 'DELETE_FACULTY_REQUEST' });
    await axios.delete(`${API_BASE_URL}/faculty/${id}`, config);
    dispatch({ type: 'DELETE_FACULTY_SUCCESS', payload: id });
  } catch (error) {
    dispatch({ type: 'DELETE_FACULTY_FAILURE', payload: error.response?.data?.message || error.message });
  }
};
