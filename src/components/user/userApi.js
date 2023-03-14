import axios from "axios";

export const create = (values) => axios.post(process.env.API_BASE_URL+'/v1/admin/user/create', values);