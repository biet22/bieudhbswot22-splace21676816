/*
================================================

bieudhbswot22-splace21676816

Music Metadata Parser

音乐标签解析模块

================================================
*/


/*

需要：

music-metadata-browser

后续接入

功能：

读取：

- 标题
- 歌手
- 专辑
- 年份
- 封面

*/


let metadataParser = null;








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
