// let productionUrl = 'http://132.232.142.46:8101';
let productionUrl = 'http://192.168.2.40:8080/jeecg-boot/';
const env = 'production';
const baseURL = {
    // portal系统服务器地址
    portal: env === 'development' ?
        productionUrl : productionUrl,
    cas: env === 'development' ?
        productionUrl : productionUrl,
    // admin服务器地址
    admin: env === 'development' ?
        developmentUrl : productionUrl
};
export default baseURL;