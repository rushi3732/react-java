import axios from "axios";

export const baseUrl = "http://192.168.0.221:8090";
// export const baseUrl = "http://192.168.0.132:8095";
// export const baseUrl = "http://192.168.0.156:8095";

export default axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-type": "application/json",
  },
});

export const mastersApi = axios.create({
  baseURL: baseUrl + "/masters",
  headers: {
    "Content-type": "application/json",
  },
});

export const opdApi = axios.create({
  baseURL: baseUrl + "/opd",
  headers: {
    "Content-type": "application/json",
  },
});

export const billingApi = axios.create({
  baseURL: baseUrl + "/billing",
  headers: {
    "Content-type": "application/json",
  },
});

export const ipdApi = axios.create({
  baseURL: baseUrl + "/ipd",
  headers: {
    "Content-type": "application/json",
  },
});

// Check
export const viewReport = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-type": "application/json",
  },
});

export const emergencyApi = axios.create({
  baseURL: "http://192.168.0.123:8095" + "/emergency",
  headers: {
    "Content-type": "application/json",
  },
});

export const userServiceApi = axios.create({
  baseURL: baseUrl + "/user-service",
  headers: {
    "Content-type": "application/json",
  },
});

export const reportsApi = axios.create({
  baseURL: baseUrl + "/reports",
  headers: {
    "Content-type": "application/json",
  },
});
export const reviewsApi = axios.create({
  baseURL: "192.168.0.153:2121" + "/reviews",
  headers: {
    "Content-type": "application/json",
  },
});
export const uApi = axios.create({
  baseURL: "192.168.0.131:5002" + "/api",
  headers: {
    "Content-type": "application/json",
  },
});

export const limsApi = axios.create({
  baseURL: "http://192.168.0.130:8098" + "/lims",
  headers: {
    "Content-type": "application/json",
  },
});
