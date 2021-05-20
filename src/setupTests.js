import "@testing-library/jest-dom";
import { server } from "./components/test/testserver";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
