import { setupServer } from "msw/node";

import { handlers } from "./requesthandlers";

export * from "./requesthandlers";
export * from "./responseresolvers";

export const server = setupServer(...handlers);
