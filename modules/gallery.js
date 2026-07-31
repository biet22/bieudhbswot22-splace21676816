/*
================================================

bieudhbswot22-splace21676816

Gallery System

个人展览系统

================================================
*/


import {

    saveGameData,
    getGameData

} from "./storage.js";





let works=[];

let container=null;









async function load(){



    const saved =
    await getGameData(
        "gallery"
    );



    works =
    saved
    ||
    [];



}









async function save(){



    await saveGameData(
        "gallery",
        works
    );



}









function addWork(){



    const title =
    document.getElementById(
        "gallery-title"
    );



    const text =
    document.getElementById(
        "gallery-text"
    );



    const type =
    document.getElementById(
        "gallery-type"
    );



    const file =
    document.getElementById(
        "gallery-file"
    );





    if(
        !title.value
    ){

        return;

    }




    let url="";



    if(
        file.files[0]
    ){


        url =
        URL.createObjectURL(
            file.files[0]
        );


    }




    works.unshift({


        id:
        Date.now(),


        title:
        title.value,


        description:
        text.value,


        type:
        type.value,


        url,


        date:
        new Date()
        .toLocaleString()



    });





    save();



    render();


}









function removeWork(id){



    works =
    works.filter(
        w=>w.id!==id
    );



    save();



    render();



}









function render(){



    container.innerHTML=`


    <div class="gallery-box">


    <h2>

    我的展览

    </h2>



    <input

    id="gallery-title"

    placeholder="作品名称">



    <textarea

    id="gallery-text"

    placeholder="作品说明">

    </textarea>




    <select id="gallery-type">


    <option value="image">

    图片

    </option>


    <option value="video">

    视频

    </option>


    <option value="audio">

    音乐

    </option>


    <option value="text">

    文字

    </option>


    </select>




    <input

    id="gallery-file"

    type="file">


    <button id="add-gallery">

    添加作品

    </button>



    <div id="gallery-list">

    </div>


    </div>



    `;




    document
    .getElementById(
        "add-gallery"
    )
    .onclick=
    addWork;






    const list =
    document.getElementById(
        "gallery-list"
    );



    works.forEach(
        work=>{


            const card =
            document.createElement(
                "div"
            );



            card.className=
            "gallery-card";



            let media="";



            if(
                work.type==="image"
                &&
                work.url
            ){


                media=`


                <img src="${work.url}">


                `;


            }



            else if(
                work.type==="video"
                &&
                work.url
            ){


                media=`


                <video controls>

                <source src="${work.url}">

                </video>


                `;


            }



            else if(
                work.type==="audio"
                &&
                work.url
            ){


                media=`


                <audio controls>

                <source src="${work.url}">

                </audio>


                `;


            }




            card.innerHTML=`


            <h3>

            ${work.title}

            </h3>


            ${media}



            <p>

            ${work.description}

            </p>



            <small>

            ${work.date}

            </small>


            <br>


            <button>

            删除

            </button>


            `;



            card
            .querySelector(
                "button"
            )
            .onclick=
            ()=>removeWork(
                work.id
            );



            list.appendChild(
                card
            );



        }
    );



}









export async function init(){



    container =
    document.getElementById(
        "gallery-container"
    );



    if(!container){

        return;

    }



    await load();



    render();



}
