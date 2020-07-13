import {
  IPadmin,
  IPcas,
  IPportal,
  fetch,
  post,
  put,
  postConfig,
  deletes,
  fetchlogout
} from "./http.js";
import qs from "qs";
export const BASICURL = IPadmin;
// export const uploadPic = data => post('', data);
//仓库统计详情
export const saveFormByCreateProcess = (data, Config) => postConfig("/formCon/saveFormByCreateProcess", data,Config);

export const getFromForStart = (data, Config) => postConfig("/formCon/getFromForStart", data,Config);
