import Axios from "axios";

const BASE_URL: string =
  import.meta.env.MODE === "production"
    ? `${import.meta.env.VITE_API_URL}/api/`
    : "//localhost:3030/api/";

const axios = Axios.create({
  withCredentials: true,
});

const httpService = {
  get(endpoint: string, data: any = null): Promise<any> {
    return ajax(endpoint, "GET", data);
  },
  post(endpoint: string, data: any = null): Promise<any> {
    return ajax(endpoint, "POST", data);
  },
  put(endpoint: string, data: any = null): Promise<any> {
    return ajax(endpoint, "PUT", data);
  },
  delete(endpoint: string, data: any = null): Promise<any> {
    return ajax(endpoint, "DELETE", data);
  },
};

const ajax = async (
  endpoint: string,
  method = "GET",
  data = null
): Promise<any> => {
  try {
    const res = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      data,
      params: method === "GET" ? data : null,
    });
    console.log(BASE_URL);
    return res.data;
  } catch (err) {
    console.log(
      `Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data:`,
      data
    );
    console.dir(err);
    throw err;
  }
};

export default httpService;
