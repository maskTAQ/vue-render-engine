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
     let data =  localStorage.getItem('dataInject');
        return mock({
            data: data?JSON.parse(data)
            : [
                {
                    type: 'input',
                    label: "输入框",
                    id: '001',
                    size: {
                        height: 44,
                    },
                    props: {
                        "placeholder": "请输入",
                        "label": "单行输入框",
                        'required':false,
                        'value':""
                    }
                }
            ]
        });
    }
}
export const datasource = {
    getCanvas() {
        let data=  localStorage.getItem('dataInject');
        return mock({
            data:JSON.parse(data)
        });
    }
}