import fetch from "fetch-everywhere";
export function error(data) {
    return fetch(`/api/error/add`, {
        method: 'post',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(data)
    })
        .then((res) => res.json())
}

export function flush() {
    return fetch(`/api/flush/all`, {
        method: 'get',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
        .then((res) => res.json())
}
