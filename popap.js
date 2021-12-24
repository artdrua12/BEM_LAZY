let video = null;
class Video {
    constructor() {
        this.create();
        this.popap = document.querySelector('.popap');
        this.player = this.init();
        this.focusableElementsCollections = document.querySelectorAll('.popap__control');
        this.focusableElements = Array.prototype.slice.call(this.focusableElementsCollections);
        this.firstTabStop = this.focusableElements[0];
        this.lastTabStop = this.focusableElements[this.focusableElements.length - 1];

        document.addEventListener('keydown', (e) => this.pressKey(e));
        this.addListener();
    }
    createButton(text) {
        let button = document.createElement('button');
        button.className = "popap__control";
        button.innerHTML = text;
        return button
    }
    createDiv(className) {
        let div = document.createElement('div');
        div.className = className;
        return div
    }
    createSelect(arrayOption) {
        let select = document.createElement('select');
        select.className = 'popap__control';

        for (let i = 0; i < arrayOption.length; i++) {
            const option = document.createElement("option");
            option.text = arrayOption[i].text;
            option.value = arrayOption[i].val;
            option.selected = arrayOption[i].sel;
            select.add(option);
        }
        return select
    }

    create() {
        let popap = this.createDiv('popap');
        let popapBody = this.createDiv('popap__body');

        let player = document.createElement('div');
        player.id = 'player';

        let popapControls = this.createDiv('popap__controls');
        popapControls.append(this.createButton("Play"));
        popapControls.append(this.createButton("Stop"));
        popapControls.append(this.createButton("Pause"));
        popapControls.append(this.createSelect([{ text: 'sound 0%', val: 0, sel: false }, { text: 'sound 50%', val: 50, sel: false },
        { text: 'sound 100%', val: 100, sel: true }]));
        popapControls.append(this.createSelect([{ text: '480x360', val: '480 360', sel: false },
        { text: '720x480', val: '740 480', sel: true }, { text: '920x560', val: '920 560', sel: false }, { text: '1080x724', val: '1080 724', sel: false }]));
        popapControls.append(this.createButton("Close"));

        popapBody.append(player);
        popapBody.append(popapControls);
        popap.append(popapBody);

        let body = document.querySelector('.content');
        body.append(popap);
    }

    init() {
        return new YT.Player('player', {
            width: '740',
            height: '480',
            videoId: 'RrwTa7gN12Q',
            playerVars: {
                autoplay: 1,
                showinfo: 0,
                modestbranding: 0,
                controls: 0
            }
        })
    }
    destroy() {
        setTimeout(() => {
            this.player.destroy();
            this.popap.remove();
            video = null;
        }, 500)
    }
    addListener() {
        this.focusableElements[0].addEventListener('click', () => this.play())
        this.focusableElements[1].addEventListener('click', () => this.stop())
        this.focusableElements[2].addEventListener('click', () => this.pause())
        this.focusableElements[3].addEventListener('change', (event) => {
            this.player.setVolume(event.target.value);
        })
        this.focusableElements[4].addEventListener('change', (event) => {
            let arraySize = event?.target?.value?.split(" ") || [740, 480];
            this.player.setSize(arraySize[0], arraySize[1]);
        })
        this.focusableElements[5].addEventListener('click', () => {
            this.pause();
            this.close();
            this.destroy();
        })
    }
    pressKey(e) {
        if (e.code === 'Escape') {
            this.pause();
            this.close();
            this.destroy();
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
        console.log('open', video);
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
    video = new Video('play');
    video.open();
}


