/*
================================================

Private Space

Music Metadata Reader

================================================
*/


export async function readMetadata(file){


    const result={


        title:
        file.name
        .replace(
            /\.[^/.]+$/,
            ""
        ),


        artist:
        "Unknown",


        album:
        "Unknown",


        cover:null,


        lyrics:null


    };



    try{


        if(
            window.musicMetadata
        ){


            const metadata =
            await window.musicMetadata.parseBlob(
                file
            );


            const common =
            metadata.common;



            result.title =
            common.title
            ||
            result.title;



            result.artist =
            common.artist
            ||
            "Unknown";



            result.album =
            common.album
            ||
            "Unknown";



            if(
                common.picture
                &&
                common.picture.length
            ){


                const picture =
                common.picture[0];



                const blob =
                new Blob(

                    [
                        picture.data

                    ],

                    {
                        type:
                        picture.format
                    }

                );



                result.cover =
                URL.createObjectURL(
                    blob
                );


            }



        }


    }

    catch(error){


        console.warn(
            "metadata error",
            error
        );


    }



    return result;


}






/*
================================================

初始化解析库

================================================
*/


async function loadParser(){


    if(metadataParser){

        return;

    }



    /*
    
    后续这里接入：

    music-metadata-browser

    */


}









/*
================================================

读取音乐信息

================================================
*/


export async function getMetadata(
    file
){



    await loadParser();



    try{


        /*
        
        未来：

        const metadata =
        await parseBlob(file)


        */


        const result = {


            title:
            file.name
            .replace(
                /\.[^/.]+$/,
                ""
            ),



            artist:
            "Unknown",



            album:
            "Unknown",



            year:
            null,



            cover:
            null


        };



        return result;



    }



    catch(error){



        console.error(
            "Metadata error:",
            error
        );



        return {


            title:
            file.name,


            artist:
            "Unknown",


            album:
            "Unknown",


            cover:
            null


        };


    }



}









/*
================================================

提取封面图片

================================================
*/


export function extractCover(
    metadata
){



    if(
        !metadata.picture
    ){

        return null;

    }



    const picture =
    metadata.picture[0];



    const blob =
    new Blob(
        [
            picture.data
        ],
        {

            type:
            picture.format

        }
    );



    return URL.createObjectURL(
        blob
    );



}
