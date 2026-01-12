import axios from 'axios';

const API_BASE_URL = 'https://school-erp-1p9x.onrender.com/api';

export const fetchStudents = () => async (dispatch, getState) => {
  const { auth } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  };
  try {
    dispatch({ type: 'FETCH_STUDENTS_REQUEST' });
    const res = await axios.get(`${API_BASE_URL}/students`, config);
    dispatch({ type: 'FETCH_STUDENTS_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'FETCH_STUDENTS_FAILURE', payload: error.response?.data?.message || error.message });
  }
};

export const fetchStudentById = (id) => async (dispatch, getState) => {
  const { auth } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  };
  try {
    dispatch({ type: 'FETCH_STUDENT_BY_ID_REQUEST' });
    const res = await axios.get(`${API_BASE_URL}/students/${id}`, config);
    dispatch({ type: 'FETCH_STUDENT_BY_ID_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'FETCH_STUDENT_BY_ID_FAILURE', payload: error.response?.data?.message || error.message });
  }
};

export const createStudent = (studentData) => async (dispatch) => {
  try {
    dispatch({ type: 'CREATE_STUDENT_REQUEST' });
    const res = await axios.post(`${API_BASE_URL}/students`, studentData);
    dispatch({ type: 'ADD_STUDENT_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'CREATE_STUDENT_FAILURE', payload: error.response.data.message });
  }
};

export const updateStudent = (id, studentData) => async (dispatch, getState) => {
  const { auth } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  };
  try {
    dispatch({ type: 'UPDATE_STUDENT_REQUEST' });
    const res = await axios.put(`${API_BASE_URL}/students/${id}`, studentData, config);
    dispatch({ type: 'UPDATE_STUDENT_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'UPDATE_STUDENT_FAILURE', payload: error.response?.data?.message || error.message });
  }
};

export const deleteStudent = (id) => async (dispatch, getState) => {
  const { auth } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  };
  try {
    dispatch({ type: 'DELETE_STUDENT_REQUEST' });
    await axios.delete(`${API_BASE_URL}/students/${id}`, config);
    dispatch({ type: 'DELETE_STUDENT_SUCCESS', payload: id });
  } catch (error) {
    dispatch({ type: 'DELETE_STUDENT_FAILURE', payload: error.response?.data?.message || error.message });
  }
};


