class Road{
    constructor(x, width, laneCount=3){
        this.x = x;
        this.width = width;
        this.laneCount = laneCount;

        this.left = x-width/2;
        this.right = x+width/2;

        // for road to be infinitely long
        const infinity=10000000;
        this.top = -infinity;
        this.bottom = infinity;

        const topLeft = {x:this.left, y:this.top};
        const topRight = {x:this.right, y:this.top};
        const bottomLeft = {x:this.left, y:this.bottom};
        const bottomRight = {x:this.right, y:this.bottom};
        // for knowing where are the borders on road
        this.borders = [
            [topLeft, bottomLeft],
            [topRight, bottomRight]
        ]
    }

    getLaneCenter(laneIndex){
        const laneWidth = this.width/this.laneCount;
        return (
            this.left + laneWidth/2 + 
            Math.min(laneIndex, this.laneCount-1) //move car to rightmost lane when (car position > no. of lanes)
            * laneWidth
        )
    }

    draw(ctx){
        ctx.lineWidth=5;
        ctx.strokeStyle="White";

        // Draw Road Lanes
        for(let i=1; i<=this.laneCount-1;i++){
            // Linear Interpolation for dividing road in n lanes
            const x=lerp(
                this.left,
                this.right,
                i/this.laneCount
            );
            // Making Dashes for lanes
            ctx.setLineDash([20,20]); // [Length of dash, Length of break]  
            ctx.beginPath();
            ctx.moveTo(x,this.top);
            ctx.lineTo(x,this.bottom);
            ctx.stroke();
        }

        // Draw Road Borders
        // Not making dashes for border lanes
        ctx.setLineDash([]);
        this.borders.forEach(border => {
            ctx.beginPath();
            ctx.moveTo(border[0].x, border[0].y);
            ctx.lineTo(border[1].x, border[1].y);
            ctx.stroke();
        });
    }
}
