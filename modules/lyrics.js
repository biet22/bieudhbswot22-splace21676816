/*
================================================

bieudhbswot22-splace21676816

Lyrics System

歌词解析与同步模块

================================================
*/


let lyrics = [];

let currentLine = -1;








/*
================================================

歌词容器

================================================
*/


let lyricsContainer = null;








/*
================================================

初始化

================================================
*/


export function initLyrics(){



    lyricsContainer =
    document.getElementById(
        "lyrics-container"
    );



    if(!lyricsContainer){


        console.warn(
            "Lyrics container missing"
        );


    }



}









/*
================================================

解析 LRC

格式：

[00:12.50]hello world

================================================
*/


export function parseLRC(
    lrcText
){



    const lines =
    lrcText.split(
        "\n"
    );



    const result = [];




    lines.forEach(
        line=>{


            const match =
            line.match(
                /\[(\d+):(\d+\.\d+)\](.*)/
            );



            if(match){


                const minutes =
                parseInt(
                    match[1]
                );



                const seconds =
                parseFloat(
                    match[2]
                );



                const time =
                minutes * 60
                +
                seconds;



                result.push({

                    time,

                    text:
                    match[3].trim()

                });



            }



        }
    );



    return result.sort(
        (a,b)=>
        a.time-b.time
    );


}









/*
================================================

加载LRC文件

================================================
*/


export async function loadLRC(
    file
){



    const text =
    await file.text();



    lyrics =
    parseLRC(
        text
    );



    renderLyrics();



}









/*
================================================

加载内嵌歌词

================================================
*/


export function loadEmbeddedLyrics(
    text
){



    if(!text){


        lyrics=[];


        renderLyrics();


        return;


    }



    lyrics =
    parseLRC(
        text
    );



    renderLyrics();



}









/*
================================================

显示歌词

================================================
*/


function renderLyrics(){



    if(!lyricsContainer){

        return;

    }



    lyricsContainer.innerHTML="";



    lyrics.forEach(
        (line,index)=>{


            const div =
            document.createElement(
                "div"
            );



            div.className =
            "lyric-line";



            div.dataset.index =
            index;



            div.innerText =
            line.text;



            lyricsContainer.appendChild(
                div
            );



        }
    );



}









/*
================================================

同步歌词

================================================
*/


export function updateLyrics(
    currentTime
){



    if(
        lyrics.length===0
    ){

        return;

    }




    let index = 0;




    for(
        let i=0;
        i<lyrics.length;
        i++
    ){



        if(
            currentTime >=
            lyrics[i].time
        ){

            index=i;

        }


    }




    if(
        index!==currentLine
    ){


        currentLine=index;



        highlightLine(
            index
        );


    }



}









/*
================================================

高亮当前歌词

================================================
*/


function highlightLine(
    index
){



    const lines =
    document.querySelectorAll(
        ".lyric-line"
    );



    lines.forEach(
        (line,i)=>{


            line.classList.toggle(
                "active",
                i===index
            );


        }
    );



    const active =
    lines[index];



    if(active){


        active.scrollIntoView({

            behavior:
            "smooth",

            block:
            "center"

        });


    }



}









/*
================================================

获取当前歌词

================================================
*/


export function getCurrentLyrics(){



    return lyrics;


              }
