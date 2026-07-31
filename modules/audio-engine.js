/*
================================================

bieudhbswot22-splace21676816

Audio Engine

高级音频控制系统

================================================
*/


let audioContext = null;


let masterGain = null;


let crossfadeTime = 5;


let currentSource = null;


let nextSource = null;








/*
================================================

初始化音频引擎

================================================
*/


export function initAudioEngine(){



    if(audioContext){

        return;

    }



    audioContext =
    new AudioContext();



    masterGain =
    audioContext
    .createGain();



    masterGain.gain.value =
    1;



    masterGain.connect(
        audioContext.destination
    );


}









/*
================================================

连接 Audio 元素

================================================
*/


export function connectAudio(
    audioElement
){



    if(
        !audioContext
    ){

        initAudioEngine();

    }




    const source =
    audioContext
    .createMediaElementSource(
        audioElement
    );



    source.connect(
        masterGain
    );



    return source;



}









/*
================================================

设置总音量

================================================
*/


export function setVolume(
    value
){



    if(!masterGain){

        return;

    }



    masterGain.gain.value =
    value;


}









/*
================================================

获取音量

================================================
*/


export function getVolume(){


    return masterGain
    ?
    masterGain.gain.value
    :
    1;


}









/*
================================================

淡入

================================================
*/


export function fadeIn(
    audio,
    duration=3
){



    audio.volume=0;



    const step =
    0.05;



    const interval =
    duration*1000
    /
    (1/step);



    const timer =
    setInterval(
        ()=>{


            audio.volume +=
            step;



            if(
                audio.volume>=1
            ){


                audio.volume=1;


                clearInterval(
                    timer
                );


            }


        },
        interval
    );


}









/*
================================================

淡出

================================================
*/


export function fadeOut(
    audio,
    duration=3
){



    const step =
    0.05;



    const interval =
    duration*1000
    /
    (1/step);



    const timer =
    setInterval(
        ()=>{


            audio.volume -=
            step;



            if(
                audio.volume<=0
            ){


                audio.volume=0;


                audio.pause();



                clearInterval(
                    timer
                );


            }


        },
        interval
    );


}









/*
================================================

Crossfade

无缝切歌

================================================
*/


export function crossfade(
    oldAudio,
    newAudio
){



    if(
        !oldAudio ||
        !newAudio
    ){

        return;

    }




    newAudio.volume=0;



    newAudio.play();




    const step =
    0.05;



    const interval =
    crossfadeTime*1000
    /
    (1/step);



    const timer =
    setInterval(
        ()=>{


            oldAudio.volume -=
            step;



            newAudio.volume +=
            step;




            if(
                newAudio.volume>=1
            ){



                newAudio.volume=1;



                oldAudio.pause();



                oldAudio.volume=1;



                clearInterval(
                    timer
                );


            }



        },
        interval
    );



}









/*
================================================

设置混音时间

================================================
*/


export function setCrossfadeTime(
    seconds
){



    crossfadeTime =
    Math.max(
        0,
        seconds
    );


}









/*
================================================

获取设置

================================================
*/


export function getAudioSettings(){



    return {

        crossfadeTime,

        volume:
        getVolume()

    };


}









/*
================================================

播放速度

================================================
*/


export function setPlaybackRate(
    audio,
    rate
){



    audio.playbackRate =
    rate;


}
