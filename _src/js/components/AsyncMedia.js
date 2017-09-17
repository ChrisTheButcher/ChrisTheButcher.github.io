import {$select} from "./DomHelper";

export class AsyncMedia {
    constructor(selector) {
        $select(selector).forEach(e => {
            let saved, img;
            let listerer = e.tagName === "VIDEO" ? "loadeddata" : "load";

            if (e.matches("[style*='background-image']")) {
                saved = e.style.backgroundImage;
                e.style.backgroundImage = "";
                img = document.createElement("img");
                img.src = saved.slice(4, -1).replace(/"/g, "");
                setTimeout(() => { e.style.backgroundImage = saved }, 30)
            }
            else {
                saved = e.src;
                e.src = "";
                img = e;
                e.tagName === "VIDEO" ? setTimeout(() => e.src = saved) : setTimeout(() => e.src = saved, 3000);
            }

            img.addEventListener(listerer, () => e.classList.add("loaded"))
        })
    }
}