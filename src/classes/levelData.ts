export class LevelData extends Object {
    public levels!: string[];
    public count!: integer;
    
    constructor() {
        super();
        this.levels = ["01", "02", "03", "04", "05"]//, "06", "07", "08", "09", "10"];
        this.count = 0;
    }
}