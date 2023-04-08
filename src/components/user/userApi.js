import { fetchPublicData } from "../../request/request";

export const create = (values) => fetchPublicData.post('/v1/admin/user/create', values);