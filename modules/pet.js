/*
================================================

bieudhbswot22-splace21676816

Pet System

宠物养成模块

================================================
*/


import {

    saveGameData,
    getGameData

} from "./storage.js";






let pet = null;

let container = null;







const PETS = {


    cat:{


        name:"猫咪",

        emoji:"🐱",


        personality:
        "傲娇但温柔",



        phrases:[


            "哼……才不是特意陪你的。",

            "今天也要记得开心。",

            "这里好舒服，再待一会吧。"

        ]


    },



    dog:{


        name:"小狗",

        emoji:"🐶",


        personality:
        "热情忠诚",



        phrases:[


            "你回来啦！",

            "今天也一起玩吧！",

            "我最喜欢你啦！"

        ]

    },



    rabbit:{


        name:"兔兔",

        emoji:"🐰",


        personality:
        "安静胆小",



        phrases:[


            "今天的天气很好呢。",

            "谢谢你的陪伴。",

            "我会慢慢靠近你的。"

        ]

    },



    fox:{


        name:"狐狸",

        emoji:"🦊",


        personality:
        "聪明神秘",



        phrases:[


            "我发现了一个秘密。",

            "你今天看起来不错。",

            "夜晚很适合思考。"

        ]

    }


};









async function loadPet(){



    const saved =
    await getGameData(
        "pet"
    );



    if(saved){


        pet=saved;


    }

    else{


        pet={


            type:"cat",


            hunger:80,


            mood:80,


            love:0,


            name:"小伙伴"


        };


    }



}









function save(){



    saveGameData(
        "pet",
        pet
    );


}









function randomPhrase(){



    const data =
    PETS[
        pet.type
    ];



    const list =
    data.phrases;



    return list[
        Math.floor(
            Math.random()
            *
            list.length
        )
    ];



}









function changeValue(
    key,
    value
){



    pet[key]=
    Math.max(
        0,
        Math.min(
            100,
            pet[key]+value
        )
    );



    save();



    render();


}









function render(){



    if(!container){

        return;

    }



    const data =
    PETS[
        pet.type
    ];



    container.innerHTML = `



    <div class="pet-box">


        <div class="pet-avatar">

        ${data.emoji}

        </div>


        <h2>

        ${pet.name}

        </h2>


        <p>

        性格：
        ${data.personality}

        </p>



        <p id="pet-message">

        ${randomPhrase()}

        </p>



        <div>

        饱食度：
        ${pet.hunger}

        %

        </div>


        <div>

        心情：
        ${pet.mood}

        %

        </div>



        <div>

        亲密度：
        ${pet.love}

        %

        </div>



        <br>



        <button id="feed-pet">

        🍎 喂食

        </button>



        <button id="play-pet">

        🎾 玩耍

        </button>



        <button id="touch-pet">

        ✋ 摸摸

        </button>



    </div>


    `;



    document
    .getElementById(
        "feed-pet"
    )
    ?.addEventListener(
        "click",
        ()=>{


            changeValue(
                "hunger",
                10
            );


        }
    );



    document
    .getElementById(
        "play-pet"
    )
    ?.addEventListener(
        "click",
        ()=>{


            changeValue(
                "mood",
                10
            );


            changeValue(
                "love",
                3
            );


        }
    );



    document
    .getElementById(
        "touch-pet"
    )
    ?.addEventListener(
        "click",
        ()=>{


            changeValue(
                "love",
                5
            );


        }
    );



}









export async function init(){



    container =
    document.getElementById(
        "game-container"
    );



    await loadPet();



    render();



    return {


        destroy(){


            container.innerHTML="";


        }


    };


}
