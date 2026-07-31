/*
================================================

Private Space

Lyrics Reader

================================================
*/



export function parseLRC(text){


    const lines =
    text.split("\n");



    const result=[];



    lines.forEach(
        line=>{


            const match =
            line.match(
                /\[(\d+):(\d+\.\d+)\](.*)/
            );



            if(match){


                const time =

                Number(match[1])*60

                +

                Number(match[2]);



                result.push({

                    time,

                    text:
                    match[3]

                });


            }



        }
    );



    return result.sort(
        (
            a,
            b
        )=>
        a.time-b.time
    );


}









export async function readLyrics(file){



    try{


        if(
            window.musicMetadata
        ){


            const metadata =
            await window.musicMetadata.parseBlob(
                file
            );



            const comment =
            metadata
            .native;



            for(
                const type
                in comment
            ){


                const items =
                comment[type];



                for(
                    const item
                    of items
                ){


                    const value =
                    item.value;



                    if(
                        typeof value==="string"
                        &&
                        (
                        value.includes("[00:")
                        ||
                        value.includes("[0:")
                        )
                    ){


                        return parseLRC(
                            value
                        );


                    }


                }


            }



        }


    }

    catch(error){


        console.warn(
            "lyrics error",
            error
        );


    }



    return [];

}
