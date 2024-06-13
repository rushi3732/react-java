import authHeader from "../../authentication/authservices/auth-header";
import apiClient from "../../http-common";

export const useGetUserActions = async (menuId) => {
  return await apiClient
    .get(`/user-service/auth/getUserActions/${menuId}`, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data.result;
    })
    .catch((err) => {
      return [];
    });
};
