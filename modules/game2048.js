/*
================================================

bieudhbswot22-splace21676816

2048 Game

================================================
*/


let board = [];

let score = 0;

let best = 0;

let container = null;






const SIZE = 4;








function createBoard(){


    board =
    Array.from(
        {
            length:SIZE
        },
        ()=>Array(SIZE).fill(0)
    );


    addNumber();

    addNumber();


}








function addNumber(){


    const empty=[];


    for(
        let r=0;
        r<SIZE;
        r++
    ){

        for(
            let c=0;
            c<SIZE;
            c++
        ){

            if(
                board[r][c]===0
            ){

                empty.push({
                    r,
                    c
                });

            }

        }

    }



    if(
        empty.length===0
    ){

        return;

    }



    const position =
    empty[
        Math.floor(
            Math.random()
            *
            empty.length
        )
    ];



    board[position.r][position.c] =
    Math.random()<0.9
    ?
    2
    :
    4;


}








function draw(){



    if(!container){

        return;

    }



    container.innerHTML="";



    const grid =
    document.createElement(
        "div"
    );


    grid.className =
    "game2048-grid";



    board.forEach(
        row=>{


            row.forEach(
                value=>{


                    const cell =
                    document.createElement(
                        "div"
                    );


                    cell.className =
                    "game2048-cell";


                    cell.textContent =
                    value===0
                    ?
                    ""
                    :
                    value;



                    grid.appendChild(
                        cell
                    );


                }
            );


        }
    );



    container.appendChild(
        grid
    );



    const info =
    document.createElement(
        "div"
    );


    info.innerHTML = `

    分数：
    ${score}

    <br>

    最高：
    ${best}

    <br><br>

    <button id="restart-2048">
    重新开始
    </button>

    `;



    container.appendChild(
        info
    );



    document
    .getElementById(
        "restart-2048"
    )
    ?.addEventListener(
        "click",
        restart
    );



}









function slide(row){



    let arr =
    row.filter(
        n=>n!==0
    );



    for(
        let i=0;
        i<arr.length-1;
        i++
    ){


        if(
            arr[i]===arr[i+1]
        ){


            arr[i]*=2;


            score+=arr[i];


            arr.splice(
                i+1,
                1
            );


        }


    }



    while(
        arr.length<SIZE
    ){

        arr.push(0);

    }



    return arr;


}








function moveLeft(){


    let changed=false;


    for(
        let r=0;
        r<SIZE;
        r++
    ){


        const old =
        [...board[r]];



        board[r]=
        slide(
            board[r]
        );



        if(
            old.join()
            !==
            board[r].join()
        ){

            changed=true;

        }


    }



    return changed;

}








function rotate(){


    board =
    board[0].map(
        (_,i)=>
        board.map(
            row=>row[i]
        ).reverse()
    );


}








function move(direction){



    let changed=false;



    if(direction==="left"){

        changed=
        moveLeft();

    }


    else if(direction==="right"){


        rotate();
        rotate();

        changed=
        moveLeft();

        rotate();
        rotate();


    }


    else if(direction==="up"){


        rotate();
        rotate();
        rotate();


        changed=
        moveLeft();


        rotate();


    }


    else if(direction==="down"){


        rotate();


        changed=
        moveLeft();


        rotate();
        rotate();
        rotate();


    }




    if(changed){

        addNumber();

        draw();

    }



}









function keyControl(e){


    const keys={


        ArrowLeft:"left",

        ArrowRight:"right",

        ArrowUp:"up",

        ArrowDown:"down"


    };



    if(
        keys[e.key]
    ){


        move(
            keys[e.key]
        );


    }



}









function restart(){


    score=0;


    createBoard();


    draw();


}









export function init(){



    container =
    document.getElementById(
        "game-container"
    );



    if(!container){


        console.warn(
            "Missing game-container"
        );


        return;


    }



    best =
    Number(
        localStorage.getItem(
            "2048-best"
        )
    )
    ||
    0;



    createBoard();



    draw();



    document.addEventListener(
        "keydown",
        keyControl
    );



    return {


        destroy(){


            document.removeEventListener(
                "keydown",
                keyControl
            );


            container.innerHTML="";


        }


    };


      }
