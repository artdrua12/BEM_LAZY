
class Video {
    constructor(url) {
        this.player = this.init();

        document.addEventListener('keydown', (e) => {
            if (e.which === 27) {
                this.player.pauseVideo();
                document.location.href = "#";
            }
        })
    }
    init() {
        return new YT.Player('player', {
            width: '720',
            height: '480',
            videoId: 'M7lc1UVf-VE',
            playerVars: {
                autoplay: 1,
            }
        })
    }

    pause() {
        this.player.pauseVideo();
    }
}

function play() {
    video = new Video('play');
}

