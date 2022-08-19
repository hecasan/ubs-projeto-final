import axios from "axios";
import { Env } from "../../../../env";

export const Api = axios.create({
  baseURL: Env.URL_BASE,
});
