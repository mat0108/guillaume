  type DrawType = {
      ctx: CanvasRenderingContext2D;
      height:number;
      radius:number
      position:number;
      thickness:number;
      asc:boolean;
  }
  export function draw({ctx,height,radius,position,thickness,asc}:DrawType){
        ctx.clearRect(0,0,window.innerWidth,height)
        ctx.beginPath();
        ctx.strokeStyle = "#BD2D2D";
        ctx.lineWidth = thickness;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        const width = window.innerWidth;
        height-= thickness;
        let dec = thickness / 2
        if(asc){
            ctx.moveTo(0,dec);
            ctx.lineTo(width*position - radius,dec)
            ctx.arcTo(width*position,dec,width*position,radius+dec,radius)
            ctx.lineTo(width*position,height-radius+dec)
            ctx.arcTo(width*position,height+dec,width*position+radius,height+dec,radius)
            ctx.lineTo(width,height+dec)
            ctx.stroke()
        }else{
            ctx.moveTo(0,height + dec);
            ctx.lineTo(width * position - radius , height + dec);
            ctx.arcTo(width * position, height, width*position, height - radius, radius);
            ctx.lineTo(width * position, radius+thickness+ dec);
            ctx.arcTo(width * position, thickness - dec, width*position + radius, thickness - dec, radius);
            ctx.lineTo(width, thickness - dec );        
            ctx.stroke()
        }

    }