const ShapeDrawer=(e) => {
    var j, path = [
        function (c,ca) {var w=ca.width,h=ca.height;
            c.strokeStyle = '#525252';
            //c.beginPath();
            c.arc(w*0.5, h*0.5, h*0.5-1, 0 * Math.PI, 2 * Math.PI);
            c.fill();
            c.stroke();
        },
        [[0, 0], [1, 0], [1, 1],[0, 1], [0, 0]],
        [[0, 0], [1, 0], [0.5, 1], [0, 0]],
        [[0.5, 0], [1, .5], [.5, 1], [0, .5]],
        [[0.5, 0], [1, 1], [0, 1], [0.5, 0]],
        [[1, 0], [1, 1],[0, 1], [1, 0]],
        [[0, 0], [1, 0],[1, 1], [0, 0]],
        [[0, 0], [1, 0],[0, 1], [0, 0]],
        [[0, 0], [1, 1],[0, 1], [0, 0]],
        function () {

        }
    ];
    const draw=(c,t) => {
        console.log(t.offsetWidth)
        console.log(t)
        c.style.width = t.offsetWidth + 'px';
        c.style.height = t.offsetHeight + 'px';
        //var ww=c.width;
        c.width=t.offsetWidth;
        c.height=t.offsetWidth;
        if (c.getContext) {
            var w = c.width, ctx = c.getContext('2d');
            ctx.fillStyle = t.style.color;
            var sHeight = c.height - 1;
            var p = path[t.dataset.symbol];
            ctx.lineWidth = 1;
            if(typeof p=='function'){
                p(ctx,c);
            }else if(p){
                ctx.moveTo(p[0][0] * w, p[0][1] * sHeight);
                for (j = 1; p.length > j; j++)
                    ctx.lineTo(p[j][0] * w, p[j][1] * sHeight);
                ctx.fill();
                ctx.strokeStyle = '#525252';
                ctx.beginPath();
                ctx.moveTo(p[0][0] * w, p[0][1] * sHeight);
                for (j = 1; p.length > j; j++)
                    ctx.lineTo(p[j][0] * w, p[j][1] * sHeight);
                ctx.stroke();
            }
        }
        return c;
    }
    if(e)
        for (var i = 0; e.length > i; i++) {
            var t = e[i], c = document.createElement('canvas');
            t.appendChild(c);
            t.style.border = 'none';
            t.style.background = 'none';
            draw(c,t);
            t.classList.add("_");
        }
}

export default ShapeDrawer;