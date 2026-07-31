/*
================================================

LXY SPACE

Storage System

IndexedDB Data Manager

================================================
*/


const DATABASE_NAME = "LXY_SPACE_DB";

const DATABASE_VERSION = 1;


let database = null;






/*
================================================

数据库结构

================================================
*/


const STORES = {


    settings:"settings",


    quotes:"quotes",


    music:"music",


    diary:"diary",


    todos:"todos",


    countdown:"countdown",


    gallery:"gallery",


    games:"games",


    ai:"ai"


};








/*
================================================

打开数据库

================================================
*/


export function initStorage(){


    return new Promise(
        (resolve,reject)=>{


            const request =
            indexedDB.open(
                DATABASE_NAME,
                DATABASE_VERSION
            );



            request.onerror = ()=>{


                console.error(
                    "Database Error"
                );


                reject(
                    request.error
                );


            };





            request.onupgradeneeded =
            event=>{


                const db =
                event.target.result;



                Object.values(STORES)
                .forEach(store=>{


                    if(!db.objectStoreNames.contains(store)){


                        db.createObjectStore(
                            store,
                            {
                                keyPath:"id",
                                autoIncrement:true
                            }
                        );


                    }


                });



            };







            request.onsuccess =
            event=>{


                database =
                event.target.result;



                console.log(
                    "Storage initialized"
                );


                resolve(database);



            };




        }
    );


}









/*
================================================

获取表

================================================
*/


function getStore(
    storeName,
    mode="readonly"
){


    const transaction =
    database.transaction(
        storeName,
        mode
    );


    return transaction.objectStore(
        storeName
    );


}









/*
================================================

新增数据

================================================
*/


export function addData(
    store,
    data
){


    return new Promise(
        (resolve,reject)=>{


            const request =
            getStore(
                store,
                "readwrite"
            )
            .add(data);



            request.onsuccess =
            ()=>resolve(
                request.result
            );



            request.onerror =
            ()=>reject(
                request.error
            );



        }
    );


}









/*
================================================

获取全部数据

================================================
*/


export function getAllData(
    store
){


    return new Promise(
        (resolve,reject)=>{


            const request =
            getStore(store)
            .getAll();



            request.onsuccess =
            ()=>{


                resolve(
                    request.result
                );


            };



            request.onerror =
            ()=>reject(
                request.error
            );



        }
    );


}









/*
================================================

根据ID获取

================================================
*/


export function getData(
    store,
    id
){


    return new Promise(
        (resolve,reject)=>{


            const request =
            getStore(store)
            .get(id);



            request.onsuccess =
            ()=>resolve(
                request.result
            );



            request.onerror =
            ()=>reject(
                request.error
            );


        }
    );


}









/*
================================================

更新数据

================================================
*/


export function updateData(
    store,
    data
){


    return new Promise(
        (resolve,reject)=>{


            const request =
            getStore(
                store,
                "readwrite"
            )
            .put(data);



            request.onsuccess =
            ()=>resolve(
                request.result
            );



            request.onerror =
            ()=>reject(
                request.error
            );



        }
    );


}









/*
================================================

删除数据

================================================
*/


export function deleteData(
    store,
    id
){


    return new Promise(
        (resolve,reject)=>{


            const request =
            getStore(
                store,
                "readwrite"
            )
            .delete(id);



            request.onsuccess =
            ()=>resolve(true);



            request.onerror =
            ()=>reject(
                request.error
            );



        }
    );


}









/*
================================================

设置管理

================================================
*/


export async function saveSetting(
    key,
    value
){


    return updateData(
        STORES.settings,
        {

            id:key,

            value:value

        }
    );


}






export async function getSetting(
    key
){


    const result =
    await getData(
        STORES.settings,
        key
    );


    return result ?
    result.value :
    null;


}









/*
================================================

音乐统计专用

================================================
*/


export async function updateMusicHistory(
    music
){



    const history =
    await getAllData(
        STORES.music
    );



    const old =
    history.find(
        item=>
        item.path===music.path
    );



    if(old){


        old.playCount +=1;


        old.totalTime +=
        music.duration || 0;



        await updateData(
            STORES.music,
            old
        );


    }
    else{


        await addData(
            STORES.music,
            {


                ...music,


                playCount:1,


                totalTime:
                music.duration || 0



            }
        );


    }



}









/*
================================================

导出表名

================================================
*/


export {

    STORES

};
