import authHeader from "../../../Authorization/auth";
import { reviewsApi } from "../../../http-common";

export const getDepartmentWise = (id) => {
  return reviewsApi.get(`/getDepartmentWiseAvgRating/${id}`, {});
};
