import { useLocation } from "react-router-dom";

export function useSearchQuery() {
  return new URLSearchParams(useLocation().search);
}
