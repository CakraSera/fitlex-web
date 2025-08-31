import createClient, { type Middleware } from "openapi-fetch";
import type { paths } from "~/generated/schema.d.ts";
import { getSession } from "~/sessions.server";

export const clientOpenApi = createClient<paths>({
  baseUrl: import.meta.env.VITE_BACKEND_API_URL,
});
