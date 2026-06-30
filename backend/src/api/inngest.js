import { serve } from "inngest/express";
import { inngest, functions } from "../config/inngest.js";

export default serve({
  client: inngest,
  functions,
});
