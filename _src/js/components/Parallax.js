import {$select} from "./DomHelper";

export class Parallax {
    constructor(container, text, bg) {
        function update() {           
            $select(container).forEach((element, i) => {
                const rect = element.getBoundingClientRect();
                const newPosition = (rect.top / window.innerHeight) * 100;
                const bgPos = newPosition * -1 + 'px';
                const txtPos = newPosition * -1 + 'px';

                if (bg) {
                    [...element.querySelectorAll(bg)]                 
                        .forEach(e => e.style.transform = `translate(-50%, calc(-50% + ${bgPos}))`);                    
                }
                
                if (text) {
                    [...element.querySelectorAll(text)]                   
                        .forEach(e => e.style.top = `${txtPos}`);                    
                }
            });
        }
        
        update();
        document.addEventListener('scroll', update)
    }
}