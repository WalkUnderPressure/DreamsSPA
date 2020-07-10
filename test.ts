export default class Box {
    protected w: number = 20;
    protected h: number = 20;

    constructor(w: number, h: number){
        this.w = w;
        this.h = h;
    }

    printValues () {
        const area = this.w * this.h;
        console.log('Area = ', area);
    }
}

const box_0 = new Box(4, 5);
box_0.printValues();