/*
================================================

LXY SPACE

Quote Random System

随机句子系统

================================================
*/


import {

    addData,
    getAllData,
    deleteData,
    STORES

} from "./storage.js";





/*
================================================

变量

================================================
*/


let quoteDatabase = [];

let currentQuote = null;

let favoriteQuotes = [];








/*
================================================

加载句子数据库

来源：

data/quotes.json

================================================
*/


async function loadQuotes(){


    try{


        const response =
        await fetch(
            "./data/quotes.json"
        );


        quoteDatabase =
        await response.json();



        console.log(
            "Quotes loaded:",
            quoteDatabase.length
        );


    }

    catch(error){


        console.error(
            "Quote loading failed:",
            error
        );


        quoteDatabase = [];


    }



}









/*
================================================

真正随机算法

================================================
*/


function randomQuote(){


    if(
        quoteDatabase.length===0
    ){

        return null;

    }



    const index =
    Math.floor(
        Math.random()
        *
        quoteDatabase.length
    );



    return quoteDatabase[index];


}









/*
================================================

生成随机句子

================================================
*/


async function generateQuote(){



    const quote =
    randomQuote();



    if(!quote){

        return;

    }



    currentQuote =
    quote;



    displayQuote(
        quote
    );


}









/*
================================================

显示到页面

================================================
*/


function displayQuote(
    quote
){


    const text =
    document.getElementById(
        "quote-text"
    );



    const info =
    document.getElementById(
        "quote-info"
    );




    if(text){


        text.innerHTML =
        quote.text;


    }




    if(info){


        let result = "";



        if(quote.author){

            result +=
            quote.author;

        }



        if(quote.language){

            result +=
            " · "
            +
            quote.language;

        }



        if(quote.translation){


            result +=
            "<br>"
            +
            quote.translation;


        }



        info.innerHTML =
        result;


    }



}









/*
================================================

收藏系统

================================================
*/


async function favoriteCurrentQuote(){



    if(!currentQuote){

        return;

    }




    await addData(
        STORES.quotes,
        {


            text:
            currentQuote.text,


            language:
            currentQuote.language,


            author:
            currentQuote.author || "",


            translation:
            currentQuote.translation || "",


            time:
            Date.now()


        }
    );



    favoriteQuotes.push(
        currentQuote
    );



    updateFavoriteButton();



}









/*
================================================

取消收藏

================================================
*/


async function removeFavorite(
    id
){



    await deleteData(
        STORES.quotes,
        id
    );



}









/*
================================================

加载收藏

================================================
*/


async function loadFavorites(){



    favoriteQuotes =
    await getAllData(
        STORES.quotes
    );



}









/*
================================================

按钮事件

================================================
*/


function bindEvents(){



    const randomButton =
    document.getElementById(
        "new-quote"
    );



    const favoriteButton =
    document.getElementById(
        "favorite-quote"
    );




    if(randomButton){


        randomButton.addEventListener(
            "click",
            generateQuote
        );


    }




    if(favoriteButton){


        favoriteButton.addEventListener(
            "click",
            favoriteCurrentQuote
        );


    }



}









/*
================================================

收藏按钮状态

================================================
*/


function updateFavoriteButton(){



    const button =
    document.getElementById(
        "favorite-quote"
    );



    if(!button){

        return;

    }



    button.innerHTML =

    `

    <i class="fa-solid fa-heart"></i>

    已收藏

    `;



}









/*
================================================

初始化

================================================
*/


export async function initQuotes(){



    await loadQuotes();



    await loadFavorites();



    bindEvents();



    generateQuote();



}









/*
================================================

外部调用接口

================================================
*/


export {

    generateQuote,

    favoriteCurrentQuote,

    randomQuote


};
