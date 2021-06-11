import { rest } from "msw";
import {
  mockDescription,
  mockIndicators,
  mockMedicalFields,
  mockRegisterNames,
  mockUnitNames,
  mockRest,
} from "./responseresolvers";

const API_HOST = process.env.REACT_APP_API_HOST ?? "http://localhost:4000";

export const handlers = [
  rest.get(`${API_HOST}/data/:register/indicators`, mockIndicators),
  rest.get(`${API_HOST}/data/:register/descriptions`, mockDescription),
  rest.get(`${API_HOST}/info/names`, mockRegisterNames),
  rest.get(`${API_HOST}/info/medicalfields`, mockMedicalFields),
  rest.get(`${API_HOST}/data/:register/unitnames`, mockUnitNames),
  rest.get("*", mockRest),
];
