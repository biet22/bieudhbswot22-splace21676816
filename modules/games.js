/*
================================================

bieudhbswot22-splace21676816

Game Center

游戏中心管理模块

================================================
*/


import {

    saveGameData,
    getGameData

} from "./storage.js";





/*
================================================

游戏列表

================================================
*/


const games = {


    "2048":{

        name:
        "2048",

        description:
        "经典数字合并游戏",

        module:
        "./game2048.js"


    },



    "pet":{

        name:
        "宠物",

        description:
        "养一只属于你的伙伴",

        module:
        "./pet.js"


    },



    "doodle":{

        name:
        "涂鸦",

        description:
        "自由绘画",

        module:
        "./doodle.js"


    },



    "runner":{

        name:
        "小跑酷",

        description:
        "跳跃并躲避障碍",

        module:
        "./runner.js"


    }


};









let currentGame=null;









/*
================================================

加载游戏模块

================================================
*/


async function loadGame(
    id
){



    const game =
    games[id];



    if(!game){

        return;

    }



    try{


        const module =
        await import(
            game.module
        );



        if(
            module.init
        ){


            currentGame =
            await module.init();


        }



    }



    catch(error){


        console.error(
            "Game load error:",
            error
        );


    }


}









/*
================================================

显示游戏菜单

================================================
*/


function renderGameMenu(){



    const container =
    document.getElementById(
        "game-list"
    );



    if(!container){

        return;

    }



    container.innerHTML="";




    Object.keys(games)
    .forEach(
        id=>{


            const button =
            document.createElement(
                "button"
            );



            button.className =
            "game-card";



            button.innerHTML = `

            <h3>
            ${games[id].name}
            </h3>

            <p>
            ${games[id].description}
            </p>

            `;



            button.onclick =
            ()=>loadGame(
                id
            );



            container.appendChild(
                button
            );


        }
    );


}









/*
================================================

退出游戏

================================================
*/


function closeGame(){



    if(
        currentGame
        &&
        currentGame.destroy
    ){


        currentGame.destroy();


    }



    currentGame=null;



}









/*
================================================

初始化

================================================
*/


export async function initGames(){



    renderGameMenu();



}









export {


    games,

    loadGame,

    closeGame


};
