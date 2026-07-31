/*
================================================

bieudhbswot22-splace21676816

Character Room

互动角色系统

================================================
*/


import {

    saveGameData,
    getGameData

} from "./storage.js";





let container=null;

let data=null;







const characters={



    luna:{


        name:"Luna",

        icon:"🌙",


        type:"少女",


        personality:
        "安静、喜欢夜晚和星空",


        lines:[


            "今晚的天空很漂亮。",

            "有时候安静也是一种陪伴。",

            "希望你今天有一点开心。"

        ]

    },





    leo:{


        name:"Leo",

        icon:"🦁",


        type:"小狮子",


        personality:
        "勇敢、热情",


        lines:[


            "今天也要勇敢一点！",

            "困难不会永远存在。",

            "我们一起向前走吧！"

        ]


    },





    momo:{


        name:"Momo",

        icon:"🐼",


        type:"熊猫",


        personality:
        "慵懒、喜欢美食",


        lines:[


            "今天吃了什么好吃的？",

            "休息一下也是很重要的。",

            "慢慢来，不着急。"

        ]

    },






    kai:{


        name:"Kai",

        icon:"🧙",

        type:"魔法师",


        personality:
        "神秘、喜欢研究未知",


        lines:[


            "世界还有很多秘密。",

            "保持好奇心。",

            "知识是一种魔法。"

        ]


    }

};









async function load(){



    const saved =
    await getGameData(
        "characters"
    );



    data =
    saved
    ||
    {


        favor:{}


    };



}









function save(){



    saveGameData(
        "characters",
        data
    );


}









function interact(id){



    const character =
    characters[id];



    if(
        !data.favor[id]
    ){


        data.favor[id]=0;


    }



    data.favor[id]+=1;



    save();



    const text =
    character.lines[
        Math.floor(
            Math.random()
            *
            character.lines.length
        )
    ];



    const message =
    document.getElementById(
        "character-message"
    );



    if(message){


        message.innerText=text;


    }



    const favor =
    document.getElementById(
        "character-favor"
    );



    if(favor){


        favor.innerText=

        "好感度："
        +
        data.favor[id];


    }



}









function render(){



    container.innerHTML="";



    const title =
    document.createElement(
        "h2"
    );


    title.innerText=
    "角色空间";



    container.appendChild(
        title
    );





    Object.keys(characters)
    .forEach(
        id=>{


            const c =
            characters[id];



            const card =
            document.createElement(
                "div"
            );


            card.className=
            "character-card";



            card.innerHTML=`


            <div class="character-icon">

            ${c.icon}

            </div>


            <h3>

            ${c.name}

            </h3>


            <p>

            ${c.type}

            </p>


            <small>

            ${c.personality}

            </small>


            <br><br>


            <button>

            点击互动

            </button>


            `;



            card
            .querySelector(
                "button"
            )
            .onclick=
            ()=>interact(id);



            container.appendChild(
                card
            );


        }
    );




    const message =
    document.createElement(
        "p"
    );


    message.id=
    "character-message";


    message.innerText=
    "点击角色和他们聊天";


    container.appendChild(
        message
    );




    const favor =
    document.createElement(
        "p"
    );


    favor.id=
    "character-favor";


    container.appendChild(
        favor
    );



}









export async function init(){



    container =
    document.getElementById(
        "game-container"
    );



    if(!container){

        return;

    }



    await load();



    render();



    return {


        destroy(){


            container.innerHTML="";


        }


    };



}
