function gbr_titik(imageDataTemp, x, y, r, g, b){
    var index;
    index = 4 * (x + (y * myCanvas.width));
    imageDataTemp.data[index] = r;
    imageDataTemp.data[index + 1] = g;
    imageDataTemp.data[index + 2] = b;
    imageDataTemp.data[index + 3] = 255;
}

function dda_line(imageData, x1, y1, x2, y2, r,g,b){
    var dx = x2-x1;
    var dy = y2-y1;

    if(Math.abs(dx) > Math.abs(dy)){
        //jalan di x
        if (x2 > x1){
            //jalan ke kanan
            var y = y1;
            for (var x = x1; x<x2; x++){
                y = y + dy/Math.abs(dx); // 1/m
                gbr_titik(imageData, x, y, r,g,b);
            }
        }
        else { // x2 < x1
            //jalan ke kiri
            var y = y1;
            for (var x = x1; x>=x2; x--){
                y = y + dy/Math.abs(dx); // 1/m
                gbr_titik(imageData, x, y, r,g,b);
            }
        }
    }
    else{
        // jalan di y
        if (y2 > y1){
            //jalan ke kanan
            var x = x1;
            for (var y = y1; y<y2; y++){
                x = x + dx/Math.abs(dy); // m
                gbr_titik(imageData, x, y, r,g,b);
            }
        }
        else { // x2 < x1
            //jalan ke kiri
            var x = x1;
            for (var y = y1; y>y2; y--){
                x = x + dx/Math.abs(dy); // m
                gbr_titik(imageData, x, y, r,g,b);
            }
        }
    }
}

function floodFillStack(imageData, canvas, x0, y0, toFlood, color){
   
    var index;
    index = 4 * (x0 + y0 * canvas.width);

    var tumpukan = [];
    tumpukan.push({x: x0, y: y0});

    while (tumpukan.length > 0) {
        var titik_skrg = tumpukan.pop();
        var index_skrg = 4 * (titik_skrg.x + titik_skrg.y * canvas.width);

        var r1 = imageData.data[index_skrg];
        var g1 = imageData.data[index_skrg + 1];
        var b1 = imageData.data[index_skrg + 2];

        if (( r1 == toFlood.r) && (g1 == toFlood.g) && ( b1 == toFlood.b)){
            imageData.data[index_skrg] = color.r;
            imageData.data[index_skrg + 1] = color.g;
            imageData.data[index_skrg + 2] = color.b;
            imageData.data[index_skrg + 3] = 255;
    
            tumpukan.push({x: titik_skrg.x+1, y: titik_skrg.y});
            tumpukan.push({x: titik_skrg.x-1, y: titik_skrg.y});
            tumpukan.push({x: titik_skrg.x, y: titik_skrg.y+1});
            tumpukan.push({x: titik_skrg.x, y: titik_skrg.y-1});
        }

    }   
}

function polygon(imageData, point_array, r, g, b){
    var point = point_array[0];

    for (var i = 1; i < point_array.length; i++) {
        var point_2 = point_array[i];

        dda_line(imageData, point.x, point.y, point_2.x, point_2.y, r,g,b);
        point = point_2;  
    }
    dda_line(imageData, point.x, point.y, point_array[0].x, point_array[0].y, r,g,b     );
}