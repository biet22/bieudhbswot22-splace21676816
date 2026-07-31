/*
================================================

bieudhbswot22-splace21676816

Countdown System

倒计时模块

================================================
*/


import {

    saveGameData,
    getGameData

} from "./storage.js";





let countdowns=[];

let container=null;

let timer=null;









async function load(){



    const saved =
    await getGameData(
        "countdown"
    );



    countdowns =
    saved
    ||
    [];



}









async function save(){



    await saveGameData(
        "countdown",
        countdowns
    );


}









function addCountdown(){



    const title =
    document.getElementById(
        "countdown-title"
    );



    const date =
    document.getElementById(
        "countdown-date"
    );



    if(
        !title.value
        ||
        !date.value
    ){

        return;

    }



    countdowns.push({


        id:
        Date.now(),


        title:
        title.value,


        target:
        new Date(
            date.value
        )
        .getTime()


    });



    title.value="";


    save();


    render();


}









function removeCountdown(id){



    countdowns =
    countdowns.filter(
        item=>
        item.id!==id
    );



    save();


    render();



}









function formatTime(ms){



    if(ms<=0){


        return "已到达";


    }



    const second =
    Math.floor(
        ms/1000
    );



    const day =
    Math.floor(
        second/86400
    );



    const hour =
    Math.floor(
        second%86400/3600
    );



    const minute =
    Math.floor(
        second%3600/60
    );



    const sec =
    second%60;



    return `

    ${day}天

    ${hour}小时

    ${minute}分钟

    ${sec}秒

    `;


}









function render(){



    container.innerHTML=`


    <div class="countdown-box">


    <h2>

    倒计时

    </h2>



    <input

    id="countdown-title"

    placeholder="目标名称">


    <input

    id="countdown-date"

    type="datetime-local">



    <button id="add-countdown">

    添加

    </button>



    <div id="countdown-list">

    </div>



    </div>


    `;



    document
    .getElementById(
        "add-countdown"
    )
    .onclick=
    addCountdown;




    const list =
    document.getElementById(
        "countdown-list"
    );



    countdowns.forEach(
        item=>{


            const div =
            document.createElement(
                "div"
            );



            div.className=
            "countdown-item";



            div.dataset.id =
            item.id;



            div.innerHTML=`


            <h3>

            ${item.title}

            </h3>


            <p class="time">

            </p>


            <button>

            删除

            </button>


            `;



            div
            .querySelector(
                "button"
            )
            .onclick=
            ()=>removeCountdown(
                item.id
            );



            list.appendChild(
                div
            );


        }
    );



    update();



}









function update(){



    document
    .querySelectorAll(
        ".countdown-item"
    )
    .forEach(
        element=>{


            const id =
            Number(
                element.dataset.id
            );



            const item =
            countdowns.find(
                c=>c.id===id
            );



            if(item){


                element
                .querySelector(
                    ".time"
                )
                .innerText=
                formatTime(

                    item.target
                    -
                    Date.now()

                );


            }


        }
    );



}









export async function init(){



    container =
    document.getElementById(
        "countdown-container"
    );



    if(!container){

        return;

    }



    await load();



    render();



    timer =
    setInterval(
        update,
        1000
    );



    return {


        destroy(){


            clearInterval(
                timer
            );


        }


    };



}
