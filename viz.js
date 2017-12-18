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

const titleNode = document.querySelector('.viz .bar');

const loop = () => {
    requestAnimationFrame(loop);
    analyser.getByteFrequencyData(frequencies);
    const summ = frequencies.reduce((newValue, singleItem) => {
        return (newValue += singleItem);
    }, 0);
    // titleNode.className = `viz amount-${summ % 10}`;
    titleNode.style.width = (summ/ 20) + 'px';
};
loop();
