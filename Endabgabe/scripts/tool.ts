namespace GemueseGarten {
    export class Tool {
            private type: ToolType;
    
            constructor(type: ToolType) {
                this.type = type;
                console.log(this.type);
            }
    
            public work(sapling: Sapling, _cell: Sapling): void {
                // erst mal nur Harvest
                _cell = undefined;
                console.log("worked on sapling: " + sapling.getField());
                sapling = undefined;
        }
    }
}