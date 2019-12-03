import ROM from './modules/rom';
import CPU from './modules/cpu';
import PPU from './modules/ppu';
import RAM from './modules/ram';
import Canvas from './canvas';

/**
 * Emulator class is the big boss of the emulator. It handles
 * the Canvas, CPU, GPU and the Controller. 
 */
export default class Emulator {
    protected cpu: CPU;
    protected ppu: PPU;
    protected ram: RAM;
    protected canvas: Canvas;

    protected currentRom: ROM;

    private readonly CANVAS_SELECTOR  = '#nes';

    public insert(buffer: ArrayBuffer) {
        this.currentRom = new ROM();
        this.currentRom.open(buffer);
    }

    public turnOn() {
        this.ram = new RAM();
        this.ppu = new PPU(this.currentRom);
        this.cpu = new CPU();
    }

    private mainLoop() {
        while(true) {

        }
    }
}

