import {$select} from "./DomHelper";

export class Parallax {
    constructor(container, text, background) {
        console.log(container)
        function update() {           
            $select(container).forEach((element, i) => {
                const backgroundElements = [...element.querySelectorAll(background)];
                const textElements = [...element.querySelectorAll(text)];
                const rect = element.getBoundingClientRect();
                const newPosition = rect.top * -1;

                const bgPos = newPosition * .3 + 'px';
                const txtPos = newPosition * .15 + 'px';

                
                backgroundElements.forEach(e => e.style.transform = `translateY(${bgPos})`);
                textElements.forEach(e => e.style.top = `${txtPos}`);
            });
        }
        
        update();
        document.addEventListener('scroll', update)
    }
}