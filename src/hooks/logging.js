import axios from "axios";

const loginUrl = "https://api.oyaanow.com/staff/signin";

export const logging = async (data) => {
  // return new Promise(async (resolve, reject) => {
  //   const response = await axios.post(loginUrl, data);
  //   resolve(response.data);
  //   localStorage.setItem("token", JSON.stringify(response.data.token));
  // });
  try {
    const response = await axios.post(loginUrl, data);
    localStorage.setItem("token", JSON.stringify(response.data.token));
    return response.data;
  } catch (err) {
    alert(err.message);
  }
};
