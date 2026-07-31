/*
================================================

bieudhbswot22-splace21676816

Main Application Controller

================================================
*/



import {

    initStorage

} from "./modules/storage.js";


import {

    initQuotes

} from "./modules/quotes.js";


import {

    initMusic

} from "./modules/music.js";




// 后续添加

// import { initGames } from "./modules/games.js";
// import { initDiary } from "./modules/diary.js";
// import { initGallery } from "./modules/gallery.js";
// import { initAI } from "./modules/ai.js";







/*
================================================

全局对象

================================================
*/


const APP = {


    version:"1.0.0",


    theme:"light",


    user:{


        name:""


    }



};









/*
================================================

工具

================================================
*/


const $ =
selector =>
document.querySelector(
    selector
);









/*
================================================

导航

================================================
*/


function initNavigation(){



    const buttons =
    document.querySelectorAll(
        "[data-page]"
    );



    const pages =
    document.querySelectorAll(
        ".page"
    );



    buttons.forEach(
        button=>{


            button.onclick =
            ()=>{


                const target =
                button.dataset.page;



                pages.forEach(
                    page=>{


                        page.classList.remove(
                            "active"
                        );


                    }
                );



                const page =
                document.getElementById(
                    target+"-page"
                );



                if(page){


                    page.classList.add(
                        "active"
                    );


                }


            };


        }
    );


}









/*
================================================

主题

================================================
*/


function initTheme(){



    const button =
    $("#theme-toggle");



    const saved =
    localStorage.getItem(
        "theme"
    );



    if(saved==="dark"){


        document.body
        .classList
        .add(
            "dark"
        );


        APP.theme="dark";


    }



    button?.addEventListener(
        "click",
        ()=>{


            document.body
            .classList
            .toggle(
                "dark"
            );



            const dark =
            document.body
            .classList
            .contains(
                "dark"
            );



            APP.theme =
            dark?
            "dark":
            "light";



            localStorage.setItem(
                "theme",
                APP.theme
            );


        }
    );


}









/*
================================================

快捷入口

================================================
*/


function initShortcuts(){



    const shortcuts =
    document.querySelectorAll(
        ".shortcut-grid button"
    );



    shortcuts.forEach(
        button=>{


            button.onclick =
            ()=>{


                const page =
                button.dataset.goto;



                const nav =
                document.querySelector(
                    `[data-page="${page}"]`
                );



                nav?.click();



            };


        }
    );



}









/*
================================================

模块启动

================================================
*/


async function initModules(){



    await initStorage();



    await initQuotes();



    initMusic();




    /*
    
    后续开启：


    await initGames();

    await initDiary();

    await initGallery();

    await initAI();


    */



}









/*
================================================

启动

================================================
*/


async function start(){



    console.log(
        "bieudhbswot22-splace21676816 starting..."
    );



    initNavigation();



    initTheme();



    initShortcuts();



    await initModules();



    console.log(
        "System ready."
    );


}









document.addEventListener(
    "DOMContentLoaded",
    start
);





window.APP =
APP;
