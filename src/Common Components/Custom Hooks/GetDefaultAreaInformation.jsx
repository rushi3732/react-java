import { mastersApi } from "../../http-common";
import authHeader from "../../authentication/authservices/auth-header";
const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

export const GetDefaultAreaInformation = async () => {
  return await mastersApi
    .get(`/units/getUnitBasedAreaInformation/${loggedUser?.loginUnitId}`, {
      headers: authHeader(),
    })
    .then((response) => response.data)
    .then((res) => {
      return res.result;
    });
};

// useCase :

// React.useEffect(() => {
//     GetDefaultAreaInformation().then((response) => {
//       console.log("The Response is :", response);
//     });
//   }, []);


