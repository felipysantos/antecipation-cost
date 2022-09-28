import axios from "axios";

const api = axios.create({
  baseURL: "https://frontend-challenge-7bu3nxh76a-uc.a.run.app",
});

export const sendDataForm = ({ data, isDate,setDate }) => {
  api
    .post("", data)
    .then((res) => setDate([...isDate, res.data]))
    .catch((err) => console.log(err.response.data));
};
