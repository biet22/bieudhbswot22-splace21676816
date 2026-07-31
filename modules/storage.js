/*
================================================

bieudhbswot22-splace21676816

Storage System

本地数据管理

================================================
*/


const DB_NAME =
"PrivateSpaceDB";


const DB_VERSION =
1;


const STORE_NAME =
"data";



let db=null;









function openDB(){



    return new Promise(
        (
            resolve,
            reject
        )=>{


            const request =
            indexedDB.open(
                DB_NAME,
                DB_VERSION
            );



            request.onupgradeneeded =
            event=>{


                const database =
                event.target.result;



                if(
                    !database.objectStoreNames.contains(
                        STORE_NAME
                    )
                ){


                    database
                    .createObjectStore(
                        STORE_NAME
                    );


                }



            };





            request.onsuccess =
            event=>{


                db =
                event.target.result;


                resolve(db);


            };





            request.onerror =
            error=>{


                reject(error);


            };



        }
    );



}









async function getDB(){



    if(db){

        return db;

    }



    return await openDB();


}









export async function saveGameData(
key,
value
){



    try{


        const database =
        await getDB();



        return new Promise(
            (
                resolve,
                reject
            )=>{


                const transaction =
                database.transaction(
                    STORE_NAME,
                    "readwrite"
                );



                const store =
                transaction.objectStore(
                    STORE_NAME
                );



                const request =
                store.put(
                    value,
                    key
                );



                request.onsuccess =
                ()=>resolve(true);



                request.onerror =
                error=>reject(error);



            }
        );



    }

    catch(error){


        console.error(
            "Storage save error:",
            error
        );



        localStorage.setItem(
            key,
            JSON.stringify(value)
        );


    }



}









export async function getGameData(
key
){



    try{


        const database =
        await getDB();



        return new Promise(
            (
                resolve,
                reject
            )=>{


                const transaction =
                database.transaction(
                    STORE_NAME,
                    "readonly"
                );



                const store =
                transaction.objectStore(
                    STORE_NAME
                );



                const request =
                store.get(
                    key
                );



                request.onsuccess =
                ()=>{


                    resolve(
                        request.result
                    );


                };



                request.onerror =
                error=>reject(error);



            }
        );



    }


    catch(error){



        const saved =
        localStorage.getItem(
            key
        );



        return saved
        ?
        JSON.parse(saved)
        :
        null;



    }



}









export async function deleteGameData(
key
){



    const database =
    await getDB();



    const transaction =
    database.transaction(
        STORE_NAME,
        "readwrite"
    );



    transaction
    .objectStore(
        STORE_NAME
    )
    .delete(
        key
    );



}









export async function clearAllData(){



    const database =
    await getDB();



    const transaction =
    database.transaction(
        STORE_NAME,
        "readwrite"
    );



    transaction
    .objectStore(
        STORE_NAME
    )
    .clear();



    localStorage.clear();



}









export async function exportData(){



    const keys=[


        "pet",

        "characters",

        "diary",

        "todo",

        "countdown",

        "gallery"


    ];



    const result={};



    for(
        const key of keys
    ){


        result[key]=
        await getGameData(
            key
        );


    }



    return result;



}









export async function importData(
data
){



    for(
        const key
        in data
    ){



        await saveGameData(
            key,
            data[key]
        );



    }



}
