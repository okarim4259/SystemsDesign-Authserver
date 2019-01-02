import { HttpStatus } from "./HttpStatus";

export const CorsOptions = {
  origin: process.env.WEBCLIENT_REQUEST_ORIGIN,
  optionsSuccessStatus: HttpStatus.OK
};
