/*
================================================

bieudhbswot22-splace21676816

Game Center

游戏中心总入口

================================================
*/


import {

    init as init2048

} from "./game2048.js";


import {

    init as initPet

} from "./pet.js";


import {

    init as initDoodle

} from "./doodle.js";


import {

    init as initRunner

} from "./runner.js";


import {

    init as initCharacters

} from "./characters.js";





let container=null;

let currentDestroy=null;









const games={



    "2048":{

        name:"2048",

        icon:"🔢",

        init:init2048

    },


    "pet":{

        name:"电子宠物",

        icon:"🐾",

        init:initPet

    },


    "doodle":{

        name:"涂鸦",

        icon:"🎨",

        init:initDoodle

    },


    "runner":{

        name:"小跑酷",

        icon:"🏃",

        init:initRunner

    },


    "characters":{

        name:"角色空间",

        icon:"💬",

        init:initCharacters

    }



};









function showMenu(){



    container.innerHTML=`



    <div class="game-home">


    <h2>

    游戏中心

    </h2>



    <div class="game-list">


    </div>


    </div>


    `;




    const list =
    container.querySelector(
        ".game-list"
    );



    Object.keys(games)
    .forEach(
        id=>{


            const game =
            games[id];



            const card =
            document.createElement(
                "div"
            );



            card.className=
            "game-card";



            card.innerHTML=`


            <div>

            ${game.icon}

            </div>


            <h3>

            ${game.name}

            </h3>


            <button>

            开始

            </button>


            `;



            card
            .querySelector(
                "button"
            )
            .onclick=
            ()=>openGame(id);



            list.appendChild(
                card
            );


        }
    );



}









async function openGame(id){



    if(currentDestroy){


        currentDestroy();


        currentDestroy=null;


    }



    container.innerHTML=`


    <button id="back-game">

    ← 返回游戏列表

    </button>


    <div id="active-game">

    </div>


    `;




    document
    .getElementById(
        "back-game"
    )
    .onclick=
    ()=>{


        if(currentDestroy){

            currentDestroy();

        }


        showMenu();


    };




    const active =
    document.getElementById(
        "active-game"
    );



    active.id =
    "game-container";



    currentDestroy =
    await games[id]
    .init();



}









export async function init(){



    container =
    document.getElementById(
        "game-container"
    );



    if(!container){

        return;

    }



    showMenu();



        }
