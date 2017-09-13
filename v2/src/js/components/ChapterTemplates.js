export class ChapterTemplates {
    constructor (data) {
        const chapterTemplate = document.getElementById("chapter-template").content;
        const $chapter = s => chapterTemplate.querySelector(s);

        data.forEach(chapter => {
            $chapter(".chapter").id = chapter.chapter;
            $chapter(".hero").style.backgroundImage = `url(${chapter.hero.image || ""})`;   
            $chapter(".hero-title-inner").innerHTML = chapter.hero.title || "";
            $chapter(".hero-subtitle").innerHTML = chapter.hero.subtitle || "";
            $chapter(".hero-image").src = chapter.hero.image || "";
            $chapter(".hero-video").src = chapter.hero.video || "";
            $chapter(".hero-bg").dataset.isFullscreen = chapter.hero.isFullscreen || false;               
            $chapter(".hero-caption").dataset.isWide = chapter.hero.title.length > 28;    
            $chapter(".claims").dataset.isDark = chapter.claims.isDark || false;

            const chaptersClone = document.importNode(chapterTemplate, true);
            const claimTemplate = chaptersClone.getElementById("claim-template").content;   
            const $claims = s => claimTemplate.querySelector(s);

            chapter.claims.items.forEach(claim => {
                $claims(".claim").dataset.isParagraph = claim.isParagraph || false;
                $claims(".claim-link").href = claim.url || "";
                $claims(".claim-text").innerHTML = claim.text || "";
                
                const claimeClone = document.importNode(claimTemplate,true);                      
                chaptersClone.querySelector(".claims-list").appendChild(claimeClone);
            })
        
            document.querySelector(".chapters").appendChild(chaptersClone);
        });
    }
}
