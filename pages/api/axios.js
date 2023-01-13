import axios from "axios";
import { API_KEY } from "../../config/index";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "a5a1eb270fa002cab6c71bb37180961c",
    language: "ko-KR",
  },
});

export default instance;
