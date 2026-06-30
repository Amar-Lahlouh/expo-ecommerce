import { serve } from "inngest/express";
import { inngest, functions } from "../src/config/inngest.js";

export default serve({
  client: inngest,
  functions,
});
