import axios from "axios";

const api = axios.create({
  baseURL: "https://frontend-challenge-7bu3nxh76a-uc.a.run.app",
});
const apiTimeOut = axios.create({
  baseURL: "https://frontend-challenge-7bu3nxh76a-uc.a.run.app?timeout",
});

const timeoutExceeded = ({ toast, data, setDate }) => {
  apiTimeOut
    .post("", data)
    .then((res) => res.data)
    .catch(
      (err) =>
        toast({
          title: err.response.data.message,
          status: "error",
        }),
      setDate([])
    );
};

export const sendDataForm = ({ data, toast, setDate, setLoading }) => {
  api
    .post("", data)
    .then((res) => setDate([res.data], setLoading(false)))
    .catch((err) =>
      toast({
        title: err.response.data.message,
        status: "error",
      })
    );
  // setTimeout(() => timeoutExceeded({ data, toast, setDate }), 5000);
};
