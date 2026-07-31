/*
================================================

bieudhbswot22-splace21676816

Diary System

日记/碎碎念系统

================================================
*/


import {

    saveGameData,
    getGameData

} from "./storage.js";





let entries=[];

let container=null;








async function load(){



    const saved =
    await getGameData(
        "diary"
    );



    entries =
    saved
    ||
    [];



}








async function save(){



    await saveGameData(
        "diary",
        entries
    );



}









function createEntry(){



    const textarea =
    document.getElementById(
        "diary-input"
    );



    if(
        !textarea.value.trim()
    ){

        return;

    }



    const item={


        id:
        Date.now(),


        date:
        new Date()
        .toLocaleString(),


        content:
        textarea.value


    };



    entries.unshift(
        item
    );



    textarea.value="";



    save();



    render();



}









function removeEntry(id){



    entries =
    entries.filter(
        item=>
        item.id!==id
    );



    save();


    render();



}









function render(){



    container.innerHTML=`



    <div class="diary-box">


    <h2>

    日记 / 碎碎念

    </h2>



    <textarea

    id="diary-input"

    placeholder="记录今天发生的事情..."

    ></textarea>



    <button id="save-diary">

    保存

    </button>



    <div id="diary-list">

    </div>



    </div>


    `;




    document
    .getElementById(
        "save-diary"
    )
    .onclick=
    createEntry;




    const list =
    document.getElementById(
        "diary-list"
    );



    entries.forEach(
        item=>{


            const div =
            document.createElement(
                "div"
            );


            div.className=
            "diary-item";



            div.innerHTML=`

            <small>

            ${item.date}

            </small>


            <p>

            ${escapeHTML(
                item.content
            )}

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
            ()=>removeEntry(
                item.id
            );



            list.appendChild(
                div
            );


        }
    );


}









function escapeHTML(text){



    return text
    .replace(
        /</g,
        "&lt;"
    )
    .replace(
        />/g,
        "&gt;"
    );



}









export async function init(){



    container =
    document.getElementById(
        "diary-container"
    );



    if(!container){

        return;

    }



    await load();



    render();



}
