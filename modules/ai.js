/*
================================================

bieudhbswot22-splace21676816

AI Assistant

OpenAI Compatible Chat

================================================
*/


let container=null;


let messages=[];




const CONFIG_KEY=
"ai-config";


const HISTORY_KEY=
"ai-history";









function getConfig(){



    const saved =
    localStorage.getItem(
        CONFIG_KEY
    );



    return saved
    ?
    JSON.parse(saved)
    :
    {


        apiKey:"",

        baseURL:
        "https://api.openai.com/v1",

        model:
        "gpt-4.1-mini",


        system:
        "你是一个私人AI助手。"


    };


}









function saveConfig(
config
){



    localStorage.setItem(
        CONFIG_KEY,
        JSON.stringify(
            config
        )
    );


}









function loadHistory(){



    const saved =
    localStorage.getItem(
        HISTORY_KEY
    );



    messages =
    saved
    ?
    JSON.parse(saved)
    :
    [];



}









function saveHistory(){



    localStorage.setItem(
        HISTORY_KEY,
        JSON.stringify(
            messages
        )
    );


}









function addMessage(
role,
content
){



    messages.push({


        role,


        content



    });



    saveHistory();



}









async function sendMessage(){



    const input =
    document.getElementById(
        "ai-input"
    );



    const text =
    input.value.trim();



    if(!text){

        return;

    }



    input.value="";



    addMessage(
        "user",
        text
    );



    renderMessages();




    const config =
    getConfig();




    if(
        !config.apiKey
    ){


        addMessage(
            "assistant",
            "请先设置 API Key。"
        );


        renderMessages();


        return;


    }






    try{


        const response =
        await fetch(

            config.baseURL
            +
            "/chat/completions",

            {


                method:"POST",


                headers:{


                    "Content-Type":
                    "application/json",


                    "Authorization":
                    "Bearer "
                    +
                    config.apiKey


                },


                body:JSON.stringify({


                    model:
                    config.model,


                    messages:[


                        {


                            role:
                            "system",


                            content:
                            config.system


                        },


                        ...messages


                    ]


                })


            }

        );





        const data =
        await response.json();




        const answer =
        data
        ?.choices
        ?.0
        ?.message
        ?.content
        ||
        "没有收到回复。";




        addMessage(
            "assistant",
            answer
        );



        renderMessages();



    }


    catch(error){


        addMessage(

            "assistant",

            "请求失败："
            +
            error.message

        );


        renderMessages();


    }



}









function renderMessages(){



    const box =
    document.getElementById(
        "ai-messages"
    );



    if(!box){

        return;

    }



    box.innerHTML="";



    messages.forEach(
        msg=>{


            const div =
            document.createElement(
                "div"
            );



            div.className =
            "ai-message "
            +
            msg.role;



            div.textContent =
            msg.content;



            box.appendChild(
                div
            );


        }
    );



    box.scrollTop =
    box.scrollHeight;



}









function render(){



    container.innerHTML=`


    <div class="ai-box">


    <h2>

    AI Assistant

    </h2>



    <div id="ai-messages">

    </div>




    <textarea

    id="ai-input"

    placeholder="输入消息..."

    ></textarea>




    <button id="ai-send">

    发送

    </button>




    <details>


    <summary>

    设置

    </summary>



    <input

    id="ai-key"

    placeholder="API Key">


    <input

    id="ai-url"

    placeholder="Base URL">


    <input

    id="ai-model"

    placeholder="模型">


    <textarea

    id="ai-system"

    placeholder="全局提示词">

    </textarea>



    <button id="save-ai">

    保存设置

    </button>



    <button id="clear-ai">

    清空记录

    </button>



    </details>



    </div>



    `;



    const config =
    getConfig();




    document
    .getElementById(
        "ai-key"
    )
    .value =
    config.apiKey;



    document
    .getElementById(
        "ai-url"
    )
    .value =
    config.baseURL;



    document
    .getElementById(
        "ai-model"
    )
    .value =
    config.model;



    document
    .getElementById(
        "ai-system"
    )
    .value =
    config.system;







    document
    .getElementById(
        "ai-send"
    )
    .onclick=
    sendMessage;





    document
    .getElementById(
        "save-ai"
    )
    .onclick=
    ()=>{


        saveConfig({


            apiKey:
            document.getElementById(
                "ai-key"
            ).value,


            baseURL:
            document.getElementById(
                "ai-url"
            ).value,


            model:
            document.getElementById(
                "ai-model"
            ).value,


            system:
            document.getElementById(
                "ai-system"
            ).value


        });



    };






    document
    .getElementById(
        "clear-ai"
    )
    .onclick=
    ()=>{


        messages=[];


        saveHistory();


        renderMessages();



    };





    renderMessages();


}









export function init(){



    container =
    document.getElementById(
        "ai-container"
    );



    if(!container){

        return;

    }



    loadHistory();


    render();



  }
