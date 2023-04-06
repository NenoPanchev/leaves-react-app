import axios from "axios";
import { FC_WITH_STRING_AUTH_HEADER } from '../constants/GlobalConstants';
const controller = new AbortController();
export default axios.create({
  baseURL: "http://localhost:8080/api",
  headers: FC_WITH_STRING_AUTH_HEADER(),
  responseType: "json",
  data: {},
  signal:controller.signal
});