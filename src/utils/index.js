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
        return mock({ data: [{ type: 'input',label:"输入框",id:'001' },{ type: 'input',label:"输入框",id:'002' }] });
    }
}