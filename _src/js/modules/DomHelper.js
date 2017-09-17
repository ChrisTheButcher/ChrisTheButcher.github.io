export const $select = selector => [...document.querySelectorAll(selector)]

export function fetchJson(url) {
    return new Promise((resolve, reject) => {
        const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);        
        const callbackName = "cb_" + s4();
        const script = document.createElement('script');    
        window[callbackName] = data => {
            delete window[callbackName];
            resolve(data)
        };
        script.src = `${url}&callback=${callbackName}`;  
        document.body.appendChild(script);
        script.onload = script.remove();
    })
}