function play() {

    player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: 'M7lc1UVf-VE',
        playerVars: {
            autoplay: 1
        }
    });
}