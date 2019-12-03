
export type Header = {
    nes: string
    prgIn16kb: number
    chrIn8kb: number
    flags6: number
    flags7: number
    prgRamIn8kb: number
    flags9: number
    flags10: number
    zeros: string
}

class HeaderReader {
    constructor(private view: DataView) {
    }

    private getNes(): string {
        return String.fromCharCode(this.view.getUint8(0))
                .concat(String.fromCharCode(this.view.getUint8(1))
                , String.fromCharCode(this.view.getUint8(2))
                , String.fromCharCode(this.view.getUint8(3)));
    }

    private getPrgIn16kb(): number {
        return this.view.getUint8(4);
    }

    private getChrIn8kb(): number {
        return this.view.getUint8(5);
    }

    private getFlags6(): number {
        return this.view.getUint8(6);
    }

    private getFlags7(): number {
        return this.view.getUint8(7);
    }

    private getPrgRamIn8kb(): number {
        return this.view.getUint8(8);
    }

    private getFlags9(): number {
        return this.view.getUint8(7);
    }

    private getFlags10(): number {
        return this.view.getUint8(7);
    }

    private getZeros(): string {
        return String.fromCharCode(this.view.getUint8(8))
                .concat(String.fromCharCode(this.view.getUint8(9))
                , String.fromCharCode(this.view.getUint8(10))
                , String.fromCharCode(this.view.getUint8(11))
                , String.fromCharCode(this.view.getUint8(12)));
    }

    public getHeader(): Header {
        return {
            nes: this.getNes(),
            prgIn16kb: this.getPrgIn16kb(),
            chrIn8kb: this.getChrIn8kb(),
            flags6: this.getFlags6(),
            flags7: this.getFlags7(),
            prgRamIn8kb: this.getPrgRamIn8kb(),
            flags9: this.getFlags9(),
            flags10: this.getFlags10(),
            zeros: this.getZeros()
        };
    }
}

export default class ROM {
    private trainer: Uint8Array = new Uint8Array(512);
    private prgCode: Uint8Array;
    private chrData: Uint8Array;
    private chrRam: Uint8Array = new Uint8Array(8192);

    public header: Header;
    public mirroring;
    
    open(buffer: ArrayBuffer) {
        // position in buffer
        let pos = 0;

        let headerReader = new HeaderReader(new DataView(buffer, pos, 16));
        this.header = headerReader.getHeader();
        pos += 16;

        this.mirroring = this.header.flags6 & 1;
        
        // check if trainer is present
        if((this.header.flags6 >> 2 ) & 1) {
            this.trainer = new Uint8Array(buffer, pos, 512);
            pos += 512;
        }

        let prgSize = this.header.prgIn16kb * 16384;
        this.prgCode = new Uint8Array(buffer, pos, prgSize);
        pos += prgSize;

        if(this.header.prgIn16kb > 0) {
            let chrSize = this.header.chrIn8kb * 8192
            this.chrData = new Uint8Array(buffer, pos, chrSize);
            pos += chrSize;
        }

        this.printHeader();
    }

    printHeader() {
        console.log(`ROM Header
        Signature: ${this.header.nes}
        PRG ROM (program code) size: ${this.header.prgIn16kb} x 16kb
        CHR ROM (graphical data) size: ${this.header.chrIn8kb} x 8kb
        Flags 6: ${this.header.flags6}
        Flags 7: ${this.header.flags7}`);
    }

    read(address: number): number {
        return this.prgCode[(address - 0x8000) % this.prgCode.length];
    }

    ppuread(address: number): number {
        if(this.header.chrIn8kb == 0) {        
            return this.chrRam[address];
        }
        return this.chrData[address];
    }

    ppuwrite(address: number, data: number) {
        if(this.header.chrIn8kb == 0) {        
            this.chrRam[address] = data;
        }
    }
}
