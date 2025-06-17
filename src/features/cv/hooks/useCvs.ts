import { useSuspenseQuery } from "@tanstack/react-query";
import { cvsQuery } from "./query";

export const useCvs = () => useSuspenseQuery(cvsQuery());
