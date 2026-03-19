// State Variables
let power = false;
let isBankOne = true;
let volume = 0.5;

const bankOne = {
    'Q': { id: 'Heater-1', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
    'W': { id: 'Heater-2', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
    'E': { id: 'Heater-3', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
    'A': { id: 'Heater-4', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
    'S': { id: 'Clap', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
    'D': { id: 'Open-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
    'Z': { id: 'Kick-n-Hat', url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
    'X': { id: 'Kick', url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
    'C': { id: 'Closed-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' }
};

const bankTwo = {
    'Q': { id: 'Chord-1', url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3' },
    'W': { id: 'Chord-2', url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3' },
    'E': { id: 'Chord-3', url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3' },
    'A': { id: 'Shaker', url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3' },
    'S': { id: 'Open-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3' },
    'D': { id: 'Closed-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3' },
    'Z': { id: 'Punchy-Kick', url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3' },
    'X': { id: 'Side-Stick', url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3' },
    'C': { id: 'Snare', url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3' }
};

function togglePower() {
    power = !power;
    const handle = document.getElementById('power-handle');
    const display = document.getElementById('display');
    
    if(power) {
        handle.style.left = '27px';
        handle.style.backgroundColor = 'var(--gold)';
        display.innerText = "HEATER KIT";
    } else {
        handle.style.left = '3px';
        handle.style.backgroundColor = '#444';
        display.innerText = "POWER OFF";
    }
}

function toggleBank() {
    if (!power) return;
    isBankOne = !isBankOne;
    const handle = document.getElementById('bank-handle');
    handle.style.left = isBankOne ? '3px' : '27px';
    document.getElementById('display').innerText = isBankOne ? "HEATER KIT" : "PIANO KIT";
}

function adjustVolume(val) {
    if (!power) return;
    volume = val;
    document.getElementById('display').innerText = "Volume: " + Math.round(val * 100);
}

function triggerPad(key) {
    if (!power) return;
    const soundSet = isBankOne ? bankOne : bankTwo;
    const audio = document.getElementById(key);
    
    audio.src = soundSet[key].url;
    audio.volume = volume;
    audio.currentTime = 0;
    audio.play();

    document.getElementById('display').innerText = soundSet[key].id.replace(/-/g, ' ');
    
    const pad = audio.parentElement;
    pad.classList.add('active');
    setTimeout(() => pad.classList.remove('active'), 100);
}

// Global Key Listeners
document.addEventListener('keydown', (e) => {
    const key = e.key.toUpperCase();
    if (bankOne.hasOwnProperty(key)) triggerPad(key);
});