function toggleClass() {
    const toggleData = JSON.parse(this.getAttribute('data-toggle-class'));
    for (const key of Object.keys(toggleData)) {
        $select(key).forEach(el=> el.classList.toggle(toggleData[key]))
    }
}

export const $select = selector => [...document.querySelectorAll(selector)]

export function json(url) {
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

export class ToggleClass {
    constructor() {
        $select('[data-toggle-class]').forEach(el=> el.addEventListener('click', toggleClass))
    }
}

export function inView(element, offset = 0) {
    const section = element.getBoundingClientRect();
    return (section.top < 0 + offset) && !(section.bottom < 0 + offset);
};