import { hc } from "hono/client";

import { AppType } from "@/app/api/[[...route]]/route";
import { APP_URL } from "@/lib/constant";

export const client = hc<AppType>(APP_URL!)