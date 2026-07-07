import { apiFetch } from "../apiClient";

export const dashboardApi = {
  summary: () => apiFetch("/admin/dashboard/summary", { cache: "no-store" }),
};
