import { error } from "./core/utils/error";

export const AppConfig = {
  // HOST: "http://raspberry:5400/api"
  HOST:
    process.env.REACT_APP_BACKEND_HOST ??
    error(`Error while getting host information from environment variables`),
};
