/*
================================================

bieudhbswot22-splace21676816

Random Quote System

随机句子系统

================================================
*/


import {

    saveGameData,
    getGameData

} from "./storage.js";




let container=null;


let favorites=[];


let history=[];









async function loadData(){



    favorites =
    await getGameData(
        "quote-favorites"
    )
    ||
    [];



    history =
    await getGameData(
        "quote-history"
    )
    ||
    [];



}









async function saveData(){



    await saveGameData(

        "quote-favorites",

        favorites

    );



    await saveGameData(

        "quote-history",

        history

    );



}









async function getRandomQuote(){



    const sources=[



        async()=>{


            const res =
            await fetch(

                "https://api.quotable.io/random"

            );


            const data =
            await res.json();



            return {


                text:
                data.content,


                author:
                data.author,


                language:
                "English"


            };


        },




        async()=>{


            const res =
            await fetch(

                "https://v1.hitokoto.cn/"

            );



            const data =
            await res.json();



            return {


                text:
                data.hitokoto,


                author:
                data.from
                ||
                "未知",


                language:
                "中文"


            };


        }



    ];





    const random =
    sources[
        Math.floor(
            Math.random()
            *
            sources.length
        )
    ];



    try{


        return await random();


    }


    catch{


        return {


            text:
            "Every moment is a new beginning.",


            author:
            "Unknown",


            language:
            "English"


        };


    }



}









async function translate(text){



    try{


        const response =
        await fetch(

            "https://api.mymemory.translated.net/get?q="
            +
            encodeURIComponent(text)
            +
            "&langpair=en|zh"

        );



        const data =
        await response.json();



        return data
        .responseData
        .translatedText;



    }


    catch{


        return "翻译失败";


    }



}









async function generate(){



    const quote =
    await getRandomQuote();




    if(
        quote.language==="English"
    ){


        quote.translation =
        await translate(
            quote.text
        );


    }



    history.unshift(
        {

            ...quote,

            time:
            new Date()
            .toLocaleString()

        }
    );



    history =
    history.slice(
        0,
        50
    );



    await saveData();



    renderQuote(
        quote
    );


}









function favorite(){



    const current =
    history[0];



    if(!current){

        return;

    }



    favorites.unshift(
        current
    );



    saveData();



}









function renderQuote(
quote
){



    const box =
    document.getElementById(
        "quote-content"
    );



    if(!box){

        return;

    }



    box.innerHTML=`


    <div class="quote-card">


    <p class="quote-text">


    ${quote.text}


    </p>



    <p>


    ${quote.author}


    </p>




    ${
        quote.translation
        ?
        `
        <hr>

        <p>

        ${quote.translation}

        </p>

        `
        :
        ""

    }



    </div>


    `;



}









function render(){



    container.innerHTML=`



    <div class="quote-box">


    <h2>

    今日句子

    </h2>



    <div id="quote-content">

    </div>



    <button id="new-quote">

    换一句

    </button>



    <button id="save-quote">

    收藏

    </button>



    </div>



    `;



    document
    .getElementById(
        "new-quote"
    )
    .onclick=
    generate;



    document
    .getElementById(
        "save-quote"
    )
    .onclick=
    favorite;



    generate();



}









export async function init(){



    container =
    document.getElementById(
        "quote-container"
    );



    if(!container){

        return;

    }



    await loadData();


    render();



}
