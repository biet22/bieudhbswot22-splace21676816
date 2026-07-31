/*
================================================

bieudhbswot22-splace21676816

Todo System

待办事项系统

================================================
*/


import {

    saveGameData,
    getGameData

} from "./storage.js";





let todos=[];

let container=null;








async function load(){



    const saved =
    await getGameData(
        "todo"
    );



    todos =
    saved
    ||
    [];



}









async function save(){



    await saveGameData(
        "todo",
        todos
    );


}









function addTodo(){



    const title =
    document.getElementById(
        "todo-title"
    );



    const priority =
    document.getElementById(
        "todo-priority"
    );



    const deadline =
    document.getElementById(
        "todo-deadline"
    );



    if(
        !title.value.trim()
    ){

        return;

    }




    todos.unshift({



        id:
        Date.now(),



        title:
        title.value,



        priority:
        priority.value,



        deadline:
        deadline.value,



        completed:false



    });





    title.value="";



    save();



    render();



}









function toggleTodo(id){



    const item =
    todos.find(
        t=>t.id===id
    );



    if(item){


        item.completed =
        !item.completed;


    }



    save();



    render();



}









function deleteTodo(id){



    todos =
    todos.filter(
        t=>
        t.id!==id
    );



    save();



    render();



}









function render(){



    container.innerHTML=`


    <div class="todo-box">


    <h2>

    待办事项

    </h2>




    <input

    id="todo-title"

    placeholder="任务内容">


    <select id="todo-priority">


    <option value="高">

    高优先级

    </option>


    <option value="中">

    普通

    </option>


    <option value="低">

    低优先级

    </option>


    </select>




    <input

    id="todo-deadline"

    type="datetime-local">



    <button id="add-todo">

    添加

    </button>



    <div id="todo-list">

    </div>



    </div>


    `;



    document
    .getElementById(
        "add-todo"
    )
    .onclick=
    addTodo;






    const list =
    document.getElementById(
        "todo-list"
    );



    todos.forEach(
        item=>{


            const div =
            document.createElement(
                "div"
            );


            div.className=
            "todo-item";



            div.innerHTML=`


            <h3>

            ${item.title}

            </h3>


            <p>

            优先级：

            ${item.priority}

            </p>



            <p>

            截止：

            ${item.deadline || "无"}

            </p>



            <button>

            ${
                item.completed
                ?
                "已完成"
                :
                "未完成"
            }

            </button>



            <button>

            删除

            </button>


            `;




            const buttons =
            div.querySelectorAll(
                "button"
            );



            buttons[0]
            .onclick=
            ()=>toggleTodo(
                item.id
            );



            buttons[1]
            .onclick=
            ()=>deleteTodo(
                item.id
            );



            if(
                item.completed
            ){

                div.style.opacity=
                "0.5";

            }



            list.appendChild(
                div
            );


        }
    );



}









export async function init(){



    container =
    document.getElementById(
        "todo-container"
    );



    if(!container){

        return;

    }



    await load();



    render();



      }
