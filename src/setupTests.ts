import "@testing-library/jest-dom";
import { act } from "@testing-library/react";
import { server } from "./components/test/testserver";

// real times is a good default to start, individual tests can
// enable fake timers if they need, and if they have, then we should
// run all the pending timers (in `act` because this can trigger state updates)
// then we'll switch back to realTimers.
// it's important this comes last here because jest runs afterEach callbacks
// in reverse order and we want this to be run first so we get back to real timers
// before any other cleanup
afterEach(() => {
  if (jest.isMockFunction(setTimeout)) {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  }
});

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
