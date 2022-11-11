//유저가 값을 입력한다
//플러스를 클릭하면 할일이 추가된다
//딜리트 버튼을 누르면 할일이 삭제된다
//체크를 누르면 할일이 끝나면서 취소선이 생긴다
//1 체크응 누르면 true
//2 트루이면 취소선 생기기 
//3 폴스이면 그대로 
//진행중 끝남 탭을 누르면 언더바 이동
//끝남탭은 끝난거만, 진행중인건 진행중만 나온다
//전체탭을 누르면 다시 전체 아이템으로 돌아옴


let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div")
let taskList=[]
let mode = ""
let filterList=[]
addButton.addEventListener("click", addTask)
console.log(tabs)
for (let i = 1; i<tabs.length;i++){
    tabs[i].addEventListener("click",function(event){filter(event)})
}
function addTask(){
    let task = {
        id:randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete:false
    }
    taskList.push(task)
    console.log(taskList)
    render()
}

function render(){
        let list=[]
        if(mode == "all"){
            list = taskList
        }else if (mode == "ongoing" ||mode == "done"){
            list = filterList
        }
   let resultHTML = " ";
   for(let i = 0; i < list.length;i++){

     if(list[i].isComplete==true){
        resultHTML+=`<div class="task">
        <div class = "task-done">${list[i].taskContent}</div>
        <div>
            <button onclick="toggleComplete('${list[i].id}')">체크</button>
            <button onclick="deleteTask('${list[i].id}')">지우기</button>
        </div>
        </div>`
     } else  {resultHTML+=`<div class="task">
     <div>${list[i].taskContent}</div>
     <div>
         <button onclick="toggleComplete('${list[i].id}')">체크</button>
         <button onclick="deleteTask('${list[i].id}')">지우기</button>
     </div>
     </div>`
        

     }
      
   }

   document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
    
    for(let i = 0 ; i <taskList.length;i++){
        if(taskList[i].id == id){
            taskList[i].isComplete= !taskList[i].isComplete
            break;
        }
    }
    render()
console.log(taskList)
}

function deleteTask(id){
    for(let i = 0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i,1)
            break
        }
   } 
   render()
}

function filter(event){
    mode=event.target.id
    filterList = []
    if(mode =="all"){
        render()
    }else if(mode == "ongoing"){
        for(let i = 0; i<taskList.length;i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i])
                
            }
        }
        render()
    }

   
    console.log(filterList)
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);

}

