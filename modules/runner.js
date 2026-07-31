/*
================================================

bieudhbswot22-splace21676816

Runner Game

小跑酷

================================================
*/


let canvas;

let ctx;

let player;

let obstacles=[];

let score=0;

let running=false;

let animation;

let speed=5;








function reset(){



    player={


        x:60,


        y:200,


        width:40,


        height:40,


        velocity:0,


        jumping:false


    };



    obstacles=[];


    score=0;


    speed=5;


}









function createObstacle(){



    obstacles.push({


        x:
        canvas.width,


        y:
        220,


        width:
        30,


        height:
        40


    });



}









function update(){



    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );



    /*
    地面
    */


    ctx.fillRect(
        0,
        260,
        canvas.width,
        5
    );



    /*
    玩家

    */


    player.velocity +=0.8;


    player.y +=
    player.velocity;



    if(
        player.y>220
    ){


        player.y=220;


        player.velocity=0;


        player.jumping=false;


    }




    ctx.fillRect(

        player.x,

        player.y,

        player.width,

        player.height

    );








    obstacles.forEach(
        obstacle=>{


            obstacle.x -=
            speed;



            ctx.fillRect(

                obstacle.x,

                obstacle.y,

                obstacle.width,

                obstacle.height

            );



        }
    );






    obstacles =
    obstacles.filter(
        o=>
        o.x>-50
    );






    if(
        Math.random()<0.015
    ){


        createObstacle();


    }





    checkCollision();



    score++;


    speed+=0.001;



    animation =
    requestAnimationFrame(
        update
    );



}









function jump(){



    if(
        player.jumping
    ){

        return;

    }



    player.velocity=-12;


    player.jumping=true;


}









function checkCollision(){



    obstacles.forEach(
        o=>{


            if(

                player.x <
                o.x+o.width

                &&

                player.x+player.width
                >
                o.x

                &&

                player.y
                <
                o.y+o.height

                &&

                player.y+player.height
                >
                o.y

            ){



                stop();



            }



        }
    );


}









function stop(){



    running=false;



    cancelAnimationFrame(
        animation
    );



    alert(
        "游戏结束 分数："+score
    );



}









function start(){



    if(running){

        return;

    }



    running=true;


    update();



}









function createUI(){



    const container =
    document.getElementById(
        "game-container"
    );



    container.innerHTML = `



    <div class="runner-box">


    <canvas
    id="runner-canvas">

    </canvas>


    <p>

    点击屏幕跳跃

    </p>


    <button id="start-runner">

    开始

    </button>


    </div>


    `;



}









export function init(){



    createUI();



    canvas =
    document.getElementById(
        "runner-canvas"
    );



    ctx =
    canvas.getContext(
        "2d"
    );



    canvas.width=350;

    canvas.height=300;



    reset();



    canvas.onclick =
    jump;



    canvas.ontouchstart =
    jump;



    document
    .getElementById(
        "start-runner"
    )
    .onclick =
    ()=>{


        reset();

        start();


    };




    return {


        destroy(){


            cancelAnimationFrame(
                animation
            );


            document
            .getElementById(
                "game-container"
            )
            .innerHTML="";


        }


    };



}
