/*
================================================

bieudhbswot22-splace21676816

Audio Engine

音乐核心引擎

================================================
*/


let audio=null;


let context=null;


let source=null;


let gainNode=null;


let analyser=null;


let filters=[];


let currentURL=null;









function initAudio(){



    if(audio){

        return;

    }



    audio =
    new Audio();



    audio.preload =
    "metadata";



    context =
    new AudioContext();



    gainNode =
    context.createGain();



    analyser =
    context.createAnalyser();



    source =
    context.createMediaElementSource(
        audio
    );



    filters =
    createEqualizer();



    let chain =
    source;



    filters.forEach(
        filter=>{


            chain.connect(
                filter
            );


            chain =
            filter;


        }
    );



    chain
    .connect(
        gainNode
    );



    gainNode
    .connect(
        analyser
    );



    analyser
    .connect(
        context.destination
    );



}









function createEqualizer(){



    const frequencies=[


        60,

        170,

        310,

        600,

        1000,

        3000,

        6000,

        12000



    ];



    return frequencies.map(
        frequency=>{


            const filter =
            context
            .createBiquadFilter();



            filter.type =
            "peaking";



            filter.frequency.value =
            frequency;



            filter.gain.value =
            0;



            filter.Q.value =
            1;



            return filter;


        }
    );



}









export function setEQ(
index,
value
){



    if(
        filters[index]
    ){


        filters[index]
        .gain.value =
        value;


    }


}









export function loadMusic(
url
){



    initAudio();



    if(currentURL){


        URL.revokeObjectURL(
            currentURL
        );


    }



    currentURL =
    url;



    audio.src =
    url;



}









export async function play(){



    initAudio();



    if(
        context.state==="suspended"
    ){


        await context.resume();


    }



    await audio.play();



}









export function pause(){



    if(audio){


        audio.pause();


    }



}









export function toggle(){



    if(
        audio.paused
    ){


        play();


    }

    else{


        pause();


    }



}









export function seek(
time
){



    if(audio){


        audio.currentTime =
        time;


    }



}









export function setVolume(
value
){



    if(gainNode){


        gainNode.gain.value =
        value;


    }



}









export function getState(){



    if(!audio){

        return null;

    }



    return {


        currentTime:
        audio.currentTime,


        duration:
        audio.duration,


        paused:
        audio.paused


    };



}









export function getAudio(){



    initAudio();


    return audio;



}









export function fadeOut(
duration=1000
){



    if(!gainNode){

        return;

    }



    gainNode.gain.cancelScheduledValues(
        context.currentTime
    );



    gainNode.gain.linearRampToValueAtTime(

        0,

        context.currentTime
        +
        duration/1000

    );



}









export function fadeIn(
duration=1000
){



    if(!gainNode){

        return;

    }



    gainNode.gain.setValueAtTime(

        0,

        context.currentTime

    );



    gainNode.gain.linearRampToValueAtTime(

        1,

        context.currentTime
        +
        duration/1000

    );



}









export function onEnded(
callback
){



    if(audio){


        audio.onended =
        callback;


    }



}
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
