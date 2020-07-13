import {saveFormByCreateProcess,getFromForStart} from "@/service/getData.js"


export function LoadingControl({ call, params, change }) {
    change({
        status: 'loading',
        loading: true
    })
    return call(params)
        .then((res) => {
            change({
                status: 'success',
                loading: false,
                data: res
            })
            return res
        })
        .catch((e) => {
            change({
                status: 'error',
                loading: false
            })
            return Promise.reject(e)
        })
}
export function mock({ timeout = 1000, data, success = true }) {
    return new Promise((resolve, reject) => {
        setTimeout(success ? resolve : reject, timeout, data)
    })
}
export const dataInject = {
    getCanvas() {
        let data = localStorage.getItem('dataInject');
        return mock({
            data: data ? JSON.parse(data)
                : []
        });
    }
}
function parse(v) {
    const result = {...v};
    for (const k in v) {
        try{
            result[k] = JSON.parse(v[k])
        }catch(e){
            //
        }
    }
    return result
}
export const datasource = {
    getCanvas(id) {
        return getFromForStart(id,{
            headers: {
              "Content-Type": "application/json"
            }
          }).then(res=>res.result)
       
    }
}