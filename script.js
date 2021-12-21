let video
class Video {
    constructor(url) {
        this.player = this.init();
        this.focusableElementsCollections = document.querySelectorAll('.popap__control');
        this.focusableElements = Array.prototype.slice.call(this.focusableElementsCollections);
        this.firstTabStop = this.focusableElements[0];
        this.lastTabStop = this.focusableElements[this.focusableElements.length - 1];

        document.addEventListener('keydown', (e) => this.pressKey(e));
        this.addListener();
    }

    init() {
        return new YT.Player('player', {
            width: '720',
            height: '480',
            videoId: 'sg8ui5vEC-o',
            playerVars: {
                autoplay: 1,
                showinfo: 0,
                modestbranding: 0,
                controls: 0
            }
        })
    }
    addListener(){
        this.focusableElementsCollections[0].addEventListener('click',()=>{
           this.player.playVideo();
        })
        this.focusableElementsCollections[1].addEventListener('click',()=>{
            this.player.stopVideo();
         })
         this.focusableElementsCollections[2].addEventListener('click',()=>{
            this.player.pauseVideo();
         })
    }

    pressKey(e) {
        // ESCAPE
        if (e.code === 'Escape') {
            this.player.pauseVideo();
            document.location.href = "#";
        }

        if (e.code === 'Tab') {
            // SHIFT + TAB
            if (e.shiftKey) {
                if (document.activeElement === this.firstTabStop) {
                    e.preventDefault();
                    this.lastTabStop.focus();
                }

                // TAB
            } else {
                if (document.activeElement === this.lastTabStop) {
                    e.preventDefault();
                    this.firstTabStop.focus();
                }
            }
        }
    }

    pause() {
        this.player.pauseVideo();
    }
}

function play() {
    video = new Video('play');
}
function pause() {
    video.pause();
}

