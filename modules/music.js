/*
================================================

LXY SPACE

Music Player Core

音乐播放器核心模块

================================================
*/


import {

    updateMusicHistory

} from "./storage.js";





/*
================================================

播放器状态

================================================
*/


const player = {


    audio:
    new Audio(),


    playlist:
    [],


    currentIndex:
    -1,


    currentMusic:
    null,


    playing:
    false


};








/*
================================================

支持格式

================================================
*/


const MUSIC_EXTENSIONS = [


    "mp3",

    "flac",

    "wav",

    "m4a",

    "ogg",

    "aac"


];









/*
================================================

工具

================================================
*/


function getExtension(
    filename
){


    return filename
    .split(".")
    .pop()
    .toLowerCase();


}








/*
================================================

选择音乐文件夹

================================================
*/


async function selectMusicFolder(){



    try{


        const directory =
        await window.showDirectoryPicker();



        await scanDirectory(
            directory
        );



        renderPlaylist();



    }



    catch(error){


        console.log(
            "Folder selection cancelled"
        );


    }


}









/*
================================================

扫描文件夹

================================================
*/


async function scanDirectory(
    directory
){



    for await(
        const entry
        of
        directory.values()
    ){



        if(
            entry.kind==="file"
        ){


            const extension =
            getExtension(
                entry.name
            );



            if(
                MUSIC_EXTENSIONS
                .includes(extension)
            ){



                const file =
                await entry.getFile();



                player.playlist.push({

                    name:
                    file.name,


                    file,


                    url:
                    URL.createObjectURL(
                        file
                    ),


                    playCount:
                    0,


                    duration:
                    0


                });


            }


        }




        else if(
            entry.kind==="directory"
        ){


            await scanDirectory(
                entry
            );


        }


    }



}









/*
================================================

渲染播放列表

================================================
*/


function renderPlaylist(){



    const list =
    document.getElementById(
        "music-list"
    );



    if(!list){

        return;

    }



    list.innerHTML="";



    player.playlist
    .forEach(
        (music,index)=>{


            const item =
            document.createElement(
                "div"
            );



            item.className =
            "music-item";



            item.innerHTML = `

            🎵

            ${music.name}

            `;



            item.onclick =
            ()=>playMusic(
                index
            );



            list.appendChild(
                item
            );



        }
    );


}









/*
================================================

播放音乐

================================================
*/


async function playMusic(
    index
){



    if(
        !player.playlist[index]
    ){

        return;

    }




    player.currentIndex =
    index;



    const music =
    player.playlist[index];



    player.currentMusic =
    music;



    player.audio.src =
    music.url;



    await player.audio.play();



    player.playing =
    true;



    updatePlayerUI();



    updateMusicHistory({

        path:
        music.name,


        duration:
        player.audio.duration

    });



}









/*
================================================

暂停/播放

================================================
*/


function togglePlay(){



    if(
        !player.currentMusic
    ){

        if(
            player.playlist.length
        ){

            playMusic(0);

        }


        return;

    }





    if(
        player.audio.paused
    ){


        player.audio.play();



    }


    else{


        player.audio.pause();



    }



}









/*
================================================

下一首

================================================
*/


function nextMusic(){



    let next =
    player.currentIndex + 1;



    if(
        next >= player.playlist.length
    ){

        next=0;

    }



    playMusic(
        next
    );


}









/*
================================================

上一首

================================================
*/


function previousMusic(){



    let previous =
    player.currentIndex - 1;



    if(
        previous < 0
    ){

        previous =
        player.playlist.length-1;

    }



    playMusic(
        previous
    );


}









/*
================================================

进度条

================================================
*/


function initProgress(){



    const progress =
    document.getElementById(
        "progress"
    );



    if(!progress){

        return;

    }



    player.audio
    .addEventListener(
        "timeupdate",
        ()=>{


            if(
                player.audio.duration
            ){


                progress.value =

                player.audio.currentTime
                /
                player.audio.duration
                *
                100;


            }


        }
    );





    progress.oninput =
    ()=>{


        if(
            player.audio.duration
        ){


            player.audio.currentTime =

            progress.value
            /
            100
            *
            player.audio.duration;


        }


    };


}









/*
================================================

UI更新

================================================
*/


function updatePlayerUI(){



    const title =
    document.getElementById(
        "song-title"
    );



    const artist =
    document.getElementById(
        "song-artist"
    );



    if(title){


        title.innerText =
        player.currentMusic.name;


    }



    if(artist){


        artist.innerText =
        "Unknown";


    }



}









/*
================================================

自动播放下一首

无缝切歌接口预留

================================================
*/


player.audio
.addEventListener(
    "ended",
    ()=>{


        nextMusic();


    }
);









/*
================================================

初始化

================================================
*/


export async function initMusic(){



    const folderButton =
    document.getElementById(
        "select-music-folder"
    );



    const playButton =
    document.getElementById(
        "play-button"
    );



    const nextButton =
    document.getElementById(
        "next-song"
    );



    const previousButton =
    document.getElementById(
        "previous-song"
    );




    if(folderButton){


        folderButton.onclick =
        selectMusicFolder;


    }



    if(playButton){


        playButton.onclick =
        togglePlay;


    }



    if(nextButton){


        nextButton.onclick =
        nextMusic;


    }



    if(previousButton){


        previousButton.onclick =
        previousMusic;


    }



    initProgress();



}









/*
================================================

导出

================================================
*/


export {


    player,

    playMusic,

    nextMusic,

    previousMusic


};
