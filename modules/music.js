/*
================================================

bieudhbswot22-splace21676816

Music Player Core

Integrated Version

================================================
*/


import {

    updateMusicHistory

} from "./storage.js";


import {

    getMetadata

} from "./metadata.js";


import {

    updateLyrics,
    loadEmbeddedLyrics,
    loadLRC

} from "./lyrics.js";


import {

    initEqualizer

} from "./equalizer.js";


import {

    initAudioEngine,
    fadeIn,
    crossfade

} from "./audio-engine.js";







/*
================================================

播放器对象

================================================
*/


const musicPlayer = {


    audio:
    new Audio(),


    playlist:[],


    index:-1,


    current:null,


    historyStart:null


};








/*
================================================

支持格式

================================================
*/


const extensions=[


    "mp3",
    "flac",
    "wav",
    "m4a",
    "ogg",
    "aac"


];








function getExtension(
    name
){


    return name
    .split(".")
    .pop()
    .toLowerCase();


}









/*
================================================

扫描文件夹

================================================
*/


async function scanFolder(
    directory
){



    for await(
        const entry
        of directory.values()
    ){



        if(
            entry.kind==="file"
        ){


            const ext =
            getExtension(
                entry.name
            );



            if(
                extensions.includes(ext)
            ){


                const file =
                await entry.getFile();



                const metadata =
                await getMetadata(
                    file
                );



                musicPlayer.playlist.push({

                    file,


                    url:
                    URL.createObjectURL(
                        file
                    ),


                    metadata,


                    name:
                    metadata.title,


                    played:
                    false


                });


            }



        }



        else if(
            entry.kind==="directory"
        ){


            await scanFolder(
                entry
            );


        }


    }



}









/*
================================================

选择音乐文件夹

================================================
*/


async function chooseFolder(){


    const directory =
    await window.showDirectoryPicker();



    musicPlayer.playlist=[];



    await scanFolder(
        directory
    );



    renderPlaylist();



}









/*
================================================

播放歌曲

================================================
*/


async function play(index){



    const next =
    musicPlayer.playlist[index];



    if(!next){

        return;

    }




    const oldAudio =
    musicPlayer.audio;



    musicPlayer.index =
    index;



    musicPlayer.current =
    next;



    const newAudio =
    new Audio(
        next.url
    );



    newAudio.volume=0;



    musicPlayer.audio =
    newAudio;



    await loadMusicInfo(
        next
    );



    initAudioEngine();



    initEqualizer(
        newAudio
    );



    newAudio.play();



    fadeIn(
        newAudio,
        3
    );



    if(oldAudio.src){


        crossfade(
            oldAudio,
            newAudio
        );


    }



    startTracking();



}









/*
================================================

加载歌曲信息

================================================
*/


async function loadMusicInfo(
    music
){



    const title =
    document.getElementById(
        "song-title"
    );



    const artist =
    document.getElementById(
        "song-artist"
    );



    const cover =
    document.getElementById(
        "album-cover"
    );



    if(title){


        title.innerText =
        music.metadata.title;


    }



    if(artist){


        artist.innerText =
        music.metadata.artist;


    }




    if(
        cover &&
        music.metadata.cover
    ){


        cover.src =
        music.metadata.cover;


    }




}









/*
================================================

播放列表显示

================================================
*/


function renderPlaylist(){



    const box =
    document.getElementById(
        "music-list"
    );



    if(!box){

        return;

    }



    box.innerHTML="";



    musicPlayer.playlist
    .forEach(
        (music,index)=>{


            const item =
            document.createElement(
                "div"
            );



            item.className =
            "music-item";



            item.innerText =
            music.name;



            item.onclick =
            ()=>play(
                index
            );



            box.appendChild(
                item
            );


        }
    );



}









/*
================================================

播放统计

================================================
*/


function startTracking(){



    musicPlayer.historyStart =
    Date.now();



    musicPlayer.audio
    .addEventListener(
        "ended",
        saveHistory
    );


}



async function saveHistory(){



    if(
        !musicPlayer.current
    ){

        return;

    }




    const duration =
    (
        Date.now()
        -
        musicPlayer.historyStart
    )
    /
    1000;



    await updateMusicHistory({

        path:
        musicPlayer.current.file.name,


        duration


    });



    next();


}









/*
================================================

歌词同步

================================================
*/


musicPlayer.audio
.addEventListener(
    "timeupdate",
    ()=>{


        updateLyrics(
            musicPlayer.audio.currentTime
        );


    }
);









/*
================================================

控制

================================================
*/


function toggle(){


    if(
        musicPlayer.audio.paused
    ){

        musicPlayer.audio.play();

    }

    else{

        musicPlayer.audio.pause();

    }


}



function next(){


    let index =
    musicPlayer.index+1;


    if(
        index>=musicPlayer.playlist.length
    ){

        index=0;

    }


    play(index);


}



function previous(){


    let index =
    musicPlayer.index-1;


    if(index<0){

        index =
        musicPlayer.playlist.length-1;

    }


    play(index);


}









/*
================================================

进度

================================================
*/


function initProgress(){



    const bar =
    document.getElementById(
        "progress"
    );



    if(!bar){

        return;

    }



    musicPlayer.audio
    .addEventListener(
        "timeupdate",
        ()=>{


            bar.value =

            musicPlayer.audio.currentTime
            /
            musicPlayer.audio.duration
            *
            100;


        }
    );



    bar.oninput =
    ()=>{


        musicPlayer.audio.currentTime =

        bar.value
        /
        100
        *
        musicPlayer.audio.duration;


    };


}









/*
================================================

初始化

================================================
*/


export function initMusic(){



    document
    .getElementById(
        "select-music-folder"
    )
    ?.addEventListener(
        "click",
        chooseFolder
    );



    document
    .getElementById(
        "play-button"
    )
    ?.addEventListener(
        "click",
        toggle
    );



    document
    .getElementById(
        "next-song"
    )
    ?.addEventListener(
        "click",
        next
    );



    document
    .getElementById(
        "previous-song"
    )
    ?.addEventListener(
        "click",
        previous
    );



    initProgress();


}









export {

    musicPlayer,

    play,

    next,

    previous

};
