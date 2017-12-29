'use strict';
const audioCtx = new AudioContext();
const videoNode = document.querySelector('audio');
const input = audioCtx.createMediaElementSource(videoNode);

input.connect(audioCtx.destination);
const analyser = audioCtx.createAnalyser();
const count = 32;
analyser.fftSize = count;

input.connect(analyser);
const frequencies = new Uint8Array(count / 2);
const docStyle = document.documentElement.style;

const loop = () => {
    requestAnimationFrame(loop);
    analyser.getByteFrequencyData(frequencies);
    frequencies.forEach((singleFreq, index) => {
        if (index < 4) {
            docStyle.setProperty(`--scale${index}`, singleFreq / 170 < 1 ? 1 : singleFreq / 170);
        }
    });
};
loop();
