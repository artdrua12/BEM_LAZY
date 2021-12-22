let video = null;
class Video {
    constructor(url) {
        this.popap = document.querySelector('.popap');
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
    addListener() {
        this.focusableElements[0].addEventListener('click', () => this.play())
        this.focusableElements[1].addEventListener('click', () => this.stop())
        this.focusableElements[2].addEventListener('click', () => this.pause())
        this.focusableElements[3].addEventListener('change', (event) => {
            this.player.setVolume(event.target.value);
        })
        this.focusableElements[4].addEventListener('change', (event) => {
            let arraySize = event?.target?.value?.split(" ") || [720, 480];
            this.player.setSize(arraySize[0], arraySize[1]);
        })
        this.focusableElements[5].addEventListener('click', () => {
            this.pause();
            this.close();
        })
    }
    pressKey(e) {
        // ESCAPE
        if (e.code === 'Escape') {
            this.pause();
            this.close();
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
    open() {
        this.popap.classList.add('popap_open');
    }
    play() {
        this.player.playVideo();
    }
    stop() {
        this.player.stopVideo();
    }
    pause() {
        this.player.pauseVideo();
    }
    close() {
        this.popap.classList.remove('popap_open');
    }
}

function play() {
    if (video) {
        video.open();
        video.play();
    } else {
        video = new Video('play');
        video.open();
    }
}


