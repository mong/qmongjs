import { rest } from "msw";
import { API_HOST } from "../../RegisterPage";
import {
  mockDescription,
  mockIndicators,
  mockMedicalFields,
  mockRegisterNames,
  mockUnitNames,
  mockRest,
} from "./responseresolvers";

export const handlers = [
  rest.get(
    `${API_HOST}/kvalitetsregistre/:register/indicators`,
    mockIndicators
  ),
  rest.get(
    `${API_HOST}/kvalitetsregistre/:register/descriptions`,
    mockDescription
  ),
  rest.get(`${API_HOST}/registerInfo/names`, mockRegisterNames),
  rest.get(`${API_HOST}/registerInfo/medicalfields`, mockMedicalFields),
  rest.get(`${API_HOST}/kvalitetsregistre/:register/unitnames`, mockUnitNames),
  rest.get("*", mockRest),
];
