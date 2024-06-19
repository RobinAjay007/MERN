import axios from "axios";
import {
  clearError,
  forgotPasswordFail,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  loadUserFail,
  loadUserRequest,
  loadUserSuccess,
  loginFail,
  loginRequest,
  loginSuccess,
  logoutFail,
  logoutSuccess,
  registerFail,
  registerRequest,
  registerSuccess,
  resetPasswordRequest,
  resetPasswordSuccess,
  updatePasswordFail,
  updatePasswordRequest,
  updatePasswordSuccess,
  updateProfileFail,
  updateProfileRequest,
  updateProfileSuccess,
} from "../slices/authSlice";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Include credentials (cookies) in the request
    };
    const { data } = await axios.post("http://localhost:4898/api/v1/login", {
      email,
      password,
    },config);
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFail(error.response.data.message));
  }
};

export const clearAuthError = (dispatch) => {
  dispatch(clearError());
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch(registerRequest());
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };
    const { data } = await axios.post(
      "http://localhost:4898/api/v1/register",
      userData,
      config
    );
    console.log(data);
    dispatch(registerSuccess(data));
  } catch (error) {
    dispatch(registerFail(error.response.data.message));
  }
};




export const loadUser =  async (dispatch) => {

  try {
      dispatch(loadUserRequest())
      const config = {
        withCredentials: true, // Include credentials (cookies) in the request
      };
      const { data }  = await axios.get("http://localhost:4898/api/v1/myprofile",config);
      dispatch(loadUserSuccess(data))
  } catch (error) {
      dispatch(loadUserFail(error.response.data.message))
  }

}

export const logout =  async (dispatch) => {

  try {
      const config = {
        withCredentials: true, // Include credentials (cookies) in the request
      };
       await axios.get("http://localhost:4898/api/v1/logout",config);
      dispatch(logoutSuccess())
  } catch (error) {
      dispatch(logoutFail(error.response.data.message))
  }

};


export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch(updateProfileRequest());
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
      withCredentials: true,
    };
    const { data } = await axios.put(
      "http://localhost:4898/api/v1/update",
      userData,
      config
    );
    console.log(data);
    dispatch(updateProfileSuccess(data));
  } catch (error) {
    dispatch(updateProfileFail(error.response.data.message));
  }
};


export const updatePasswordAction = (formData) => async (dispatch) => {
  try {
    dispatch(updatePasswordRequest());
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Include credentials (cookies) in the request
    };
     await axios.put("http://localhost:4898/api/v1/password/change",formData,config);
    dispatch(updatePasswordSuccess());
  } catch (error) {
    dispatch(updatePasswordFail(error.response.data.message));
  }
};

export const forgotPassword = (formData) => async (dispatch) => {
  try {
    dispatch(forgotPasswordRequest());
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Include credentials (cookies) in the request
    };
    const {data}= await axios.post("http://localhost:4898/api/v1/password/forgot",formData,config);
    dispatch(forgotPasswordSuccess(data));
  } catch (error) {
    dispatch(forgotPasswordFail(error.response.data.message));
  }
};

export const resetPassword = (formData, token) => async (dispatch) => {
  try {
    dispatch(resetPasswordRequest());
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Include credentials (cookies) in the request
    };
    const {data}= await axios.post(`http://localhost:4898/api/v1/password/reset/${token}`,formData,config);
    dispatch(resetPasswordSuccess(data));
  } catch (error) {
    dispatch(forgotPasswordFail(error.response.data.message));
  }
};
