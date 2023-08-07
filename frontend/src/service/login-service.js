import { axiosInstance } from "src/utils/network-utils";

const login = async (data) => {
  return await axiosInstance
    .post(`http://localhost:8080/user/login`, data)
    .then((response) => response.data);
};

const signUp = async (data) => {
    return await axiosInstance
      .post(`http://localhost:8080/user/signup`, data)
      .then((response) => response.data);
  };

const loginService = {
  login,
  signUp
};

export default loginService;
