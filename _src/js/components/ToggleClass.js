import {$select} from "./DomHelper";

function toggleClass() {
    const toggleData = JSON.parse(this.getAttribute('data-toggle-class'));
    for (const key of Object.keys(toggleData)) {
        $select(key).forEach(el=> el.classList.toggle(toggleData[key]))
    }
}

export class ToggleClass {
    constructor() {
        $select('[data-toggle-class]').forEach(el=> el.addEventListener('click', toggleClass))
    }
}