/*
================================================

bieudhbswot22-splace21676816

Equalizer System

Web Audio API

================================================
*/


let audioContext = null;

let sourceNode = null;

let filters = [];

let initialized = false;









/*
================================================

频段设置

================================================
*/


const BANDS = [

    60,

    250,

    1000,

    4000,

    8000,

    16000

];









/*
================================================

初始化均衡器

================================================
*/


export function initEqualizer(
    audioElement
){



    if(initialized){

        return;

    }



    audioContext =
    new AudioContext();



    sourceNode =
    audioContext
    .createMediaElementSource(
        audioElement
    );



    BANDS.forEach(
        frequency=>{


            const filter =
            audioContext
            .createBiquadFilter();



            filter.type =
            "peaking";



            filter.frequency.value =
            frequency;



            filter.gain.value =
            0;



            filter.Q.value =
            1;



            filters.push(
                filter
            );


        }
    );



    let current =
    sourceNode;



    filters.forEach(
        filter=>{


            current.connect(
                filter
            );


            current =
            filter;


        }
    );



    current.connect(
        audioContext.destination
    );



    initialized=true;



}









/*
================================================

调整单个频段

index:

0 60Hz

1 250Hz

...

================================================
*/


export function setBandGain(
    index,
    value
){



    if(
        !filters[index]
    ){

        return;

    }



    filters[index]
    .gain.value =
    value;


}









/*
================================================

获取当前EQ状态

================================================
*/


export function getEqualizerState(){



    return filters.map(
        filter=>({

            frequency:
            filter.frequency.value,


            gain:
            filter.gain.value


        })
    );


}









/*
================================================

重置EQ

================================================
*/


export function resetEqualizer(){



    filters.forEach(
        filter=>{


            filter.gain.value =
            0;


        }
    );


}









/*
================================================

预设音效

================================================
*/


export function applyPreset(
    preset
){



    const presets = {


        flat:
        [
            0,
            0,
            0,
            0,
            0,
            0
        ],



        bass:
        [
            8,
            5,
            0,
            -2,
            0,
            2
        ],



        vocal:
        [
            -2,
            0,
            5,
            6,
            2,
            0
        ],



        treble:
        [
            0,
            0,
            2,
            5,
            7,
            8
        ]

    };



    const values =
    presets[preset];



    if(!values){

        return;

    }



    values.forEach(
        (value,index)=>{


            setBandGain(
                index,
                value
            );


        }
    );



          }
