import { DYNAMIC, ROOT } from "@/config/config";
import { SmartError } from "./error";

export const ErrorComponent = new SmartError({ rootNode: ROOT });