
export default interface IBus {
    read(address: number): number;
    write(address: number, data: number);
}
