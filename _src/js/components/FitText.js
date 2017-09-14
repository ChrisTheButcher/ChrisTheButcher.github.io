import {$select} from "./DomHelper";

function fit (element, compressor) {
    const options = {
        minFontSize: -1/0,
        maxFontSize: 1/0
    }
    function resizer () {
        element.style.fontSize = Math.max(Math.min(element.clientWidth / (compressor*10), parseFloat(options.maxFontSize)), parseFloat(options.minFontSize)) + 'px';
    };
    resizer();
    ['resize', 'orientationchange'].forEach(e => window.addEventListener(e, resizer));
};

export class FitText {
    constructor (selector, compressor = 1) {
        $select(selector).forEach(element => fit(element, compressor))
    }
};

