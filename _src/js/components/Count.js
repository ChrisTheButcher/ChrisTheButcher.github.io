import {$select} from "./DomHelper";

const defaults = {
    time: 3000,
    framerate: 60
}

export class Count {
    constructor(selector, options = defaults) {
        $select(selector).forEach(element => {
            const number = parseFloat(element.textContent.split(".").join(""));
            const steps = options.time / options.framerate;
            element.innerHTML = 0;
        
            function handler() {
                if (element.classList.contains('started')) return;
                element.classList.add('started');     

                for (let i = 0; i <= steps; i++) {
                    const delay = i * options.framerate;
                    const factor = delay / options.time;
                    const formatedNumber = parseInt(factor * number).toLocaleString().split(",").join(".");
                    setTimeout(()=> element.innerHTML = formatedNumber, delay)
                }
            }
            new Waypoint({ offset: "80%", element, handler })
        })
    }
}