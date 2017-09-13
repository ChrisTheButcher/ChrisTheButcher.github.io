import {$select} from "./DomHelper";

export class Spanify {
    constructor(selector) {
        $select(selector).forEach(element => {
            element.innerHTML = [...element.textContent].map(letter => `<span class="spanified">${letter}</span>`).join("");
        })
    }
}