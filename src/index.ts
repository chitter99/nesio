import Emulator from './emulator';

const emulator = new Emulator();

document.body.ondragover = (event) => {
    event.preventDefault();
};

document.body.ondrop = (event) => {
    event.preventDefault();
    if(event.dataTransfer.files) {
        const reader = new FileReader();
        reader.onload = (e) => {
            emulator.insert(<ArrayBuffer> e.target.result);
            emulator.turnOn();
        };
        reader.readAsArrayBuffer(event.dataTransfer.files[0]);
    } else {
        alert('Try droping a nes rom');
    }
};
