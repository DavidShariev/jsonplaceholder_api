import axios from "axios";

const Axios = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  timeout: 10000
})

export default Axios