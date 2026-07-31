/*
================================================

LXY SPACE

Main Application Controller

================================================
*/


/*
-----------------------------------------------
模块导入

后续文件创建后会启用

目前保留结构
-----------------------------------------------
*/


// import { initStorage } from "./modules/storage.js";
// import { initQuotes } from "./modules/quotes.js";
// import { initMusic } from "./modules/music.js";
// import { initGames } from "./modules/games.js";
// import { initDiary } from "./modules/diary.js";
// import { initGallery } from "./modules/gallery.js";
// import { initAI } from "./modules/ai.js";







/*
================================================

全局应用对象

所有模块共享

================================================
*/


const LXY_APP = {


    version:"1.0.0",


    settings:{


        theme:"light"


    },


    user:{


        name:"LXY"


    },


    modules:{}


};






/*
================================================

工具函数

================================================
*/


function $(selector){

    return document.querySelector(selector);

}



function $all(selector){

    return document.querySelectorAll(selector);

}







/*
================================================

页面系统

================================================
*/


function initNavigation(){


    const buttons =
    $all(".navigation button");



    const pages =
    $all(".page");



    buttons.forEach(button=>{


        button.addEventListener(
            "click",
            ()=>{


                const target =
                button.dataset.page;



                pages.forEach(page=>{


                    page.classList.remove(
                        "active"
                    );


                });



                const targetPage =
                document.getElementById(
                    target+"-page"
                );



                if(targetPage){


                    targetPage.classList.add(
                        "active"
                    );


                }


            }
        );


    });



}








/*
================================================

主题系统

================================================
*/


function initTheme(){



    const toggle =
    $("#theme-toggle");



    const saved =
    localStorage.getItem(
        "lxy-theme"
    );



    if(saved==="dark"){


        document.body.classList.add(
            "dark"
        );


        LXY_APP.settings.theme =
        "dark";


    }





    toggle.addEventListener(
        "click",
        ()=>{


            document.body.classList.toggle(
                "dark"
            );



            const dark =
            document.body.classList.contains(
                "dark"
            );



            LXY_APP.settings.theme =
            dark ?
            "dark":
            "light";



            localStorage.setItem(
                "lxy-theme",
                LXY_APP.settings.theme
            );



        }
    );



}









/*
================================================

基础事件

================================================
*/


function initBasicEvents(){



    /*
    快捷入口按钮

    后续连接页面
    */


    const shortcuts =
    document.querySelectorAll(
        ".shortcut-grid button"
    );



    shortcuts.forEach(
        (item,index)=>{


            item.addEventListener(
                "click",
                ()=>{


                    const pages=[
                        "music",
                        "games",
                        "diary",
                        "gallery",
                        "ai"
                    ];



                    const target =
                    pages[index];



                    const button =
                    document.querySelector(
                    `[data-page="${target}"]`
                    );



                    if(button){

                        button.click();

                    }


                }
            );


        }
    );



}










/*
================================================

模块初始化

================================================
*/


async function initModules(){



    /*
    
    后续开启：

    
    await initStorage();

    await initQuotes();

    await initMusic();

    await initGames();

    await initDiary();

    await initGallery();

    await initAI();


    */



}









/*
================================================

启动应用

================================================
*/


async function startApp(){



    console.log(
        "LXY Space Starting..."
    );



    initNavigation();



    initTheme();



    initBasicEvents();



    await initModules();




    console.log(
        "LXY Space Ready."
    );



}






/*
启动
*/


document.addEventListener(
    "DOMContentLoaded",
    startApp
);






/*
暴露全局

方便调试

*/


window.LXY_APP =
LXY_APP;
