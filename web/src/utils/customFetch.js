import axios from "axios";

const customFetch = axios.create({
  baseURL: "/api/v",
});

export default customFetch;
