/*
================================================

bieudhbswot22-splace21676816

Doodle System

涂鸦模块

================================================
*/


let canvas = null;

let ctx = null;

let drawing = false;

let lastX = 0;

let lastY = 0;

let size = 5;








function position(
event
){



    const rect =
    canvas.getBoundingClientRect();



    if(
        event.touches
    ){


        return {

            x:
            event.touches[0].clientX
            -
            rect.left,


            y:
            event.touches[0].clientY
            -
            rect.top


        };


    }



    return {


        x:
        event.clientX
        -
        rect.left,


        y:
        event.clientY
        -
        rect.top


    };



}









function startDraw(e){



    drawing=true;



    const pos =
    position(e);



    lastX =
    pos.x;


    lastY =
    pos.y;



}









function draw(e){



    if(!drawing){

        return;

    }



    const pos =
    position(e);



    ctx.beginPath();


    ctx.moveTo(
        lastX,
        lastY
    );


    ctx.lineTo(
        pos.x,
        pos.y
    );



    ctx.lineWidth =
    size;



    ctx.lineCap =
    "round";



    ctx.stroke();



    lastX =
    pos.x;


    lastY =
    pos.y;


}









function stopDraw(){


    drawing=false;


}









function clearCanvas(){



    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


}









function saveImage(){



    const link =
    document.createElement(
        "a"
    );


    link.download =
    "doodle.png";


    link.href =
    canvas.toDataURL(
        "image/png"
    );


    link.click();



}









function resizeCanvas(){



    const rect =
    canvas.getBoundingClientRect();



    canvas.width =
    rect.width;



    canvas.height =
    rect.height;



}









function createUI(){



    const container =
    document.getElementById(
        "game-container"
    );



    container.innerHTML = `



    <div class="doodle-box">


    <canvas id="doodle-canvas">

    </canvas>



    <br>


    <input

    id="brush-size"

    type="range"

    min="1"

    max="30"

    value="5">


    <button id="clear-doodle">

    清空

    </button>



    <button id="save-doodle">

    保存

    </button>



    </div>


    `;



}









export function init(){



    createUI();



    canvas =
    document.getElementById(
        "doodle-canvas"
    );



    ctx =
    canvas.getContext(
        "2d"
    );



    resizeCanvas();




    canvas.addEventListener(
        "mousedown",
        startDraw
    );


    canvas.addEventListener(
        "mousemove",
        draw
    );


    canvas.addEventListener(
        "mouseup",
        stopDraw
    );



    canvas.addEventListener(
        "mouseleave",
        stopDraw
    );




    canvas.addEventListener(
        "touchstart",
        startDraw
    );



    canvas.addEventListener(
        "touchmove",
        draw
    );



    canvas.addEventListener(
        "touchend",
        stopDraw
    );




    document
    .getElementById(
        "brush-size"
    )
    .oninput =
    e=>{


        size =
        e.target.value;


    };



    document
    .getElementById(
        "clear-doodle"
    )
    .onclick =
    clearCanvas;



    document
    .getElementById(
        "save-doodle"
    )
    .onclick =
    saveImage;




    return {


        destroy(){


            document
            .getElementById(
                "game-container"
            )
            .innerHTML="";


        }


    };


}
