import IBus from './bus';

const RAM_MAX_SIZE = 2048;

/**
 * Emulates the internal NES Ram. Total amount 256 * 8 = 2048
 */
export default class RAM implements IBus {
    private data: Uint8Array = new Uint8Array(RAM_MAX_SIZE);

    read(address: number): number {
        return this.data[address % RAM_MAX_SIZE];
    }
    write(address: number, data: number) {
        this.data[address % RAM_MAX_SIZE] = data;
    }
}
