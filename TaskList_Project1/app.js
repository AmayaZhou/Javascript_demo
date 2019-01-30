// Define UI vars
const form = document.querySelector('#task-form');
const ulTaskList = document.querySelector('ul.collection');
const aClearBtn = document.querySelector('a.clear-tasks');
const inputFilter = document.querySelector('input#filter');
const taskInput = document.querySelector('input#task');

// load all event listeners
loadEventListeners();

function loadEventListeners(){
    // dom load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // add tast event
    form.addEventListener('submit', addTask);
    // remove tasks event.因为li>a标签是动态的，所以要给ul用到delegation
    ulTaskList.addEventListener('click', removeTasks);
    // add clear Tasks
    aClearBtn.addEventListener('click', clearTasks);
    // filter tasks event
    filter.addEventListener('keyup', filterTasks); 
}

// 1. get tasks from localStorage
function getTasks(){
    // 先检查localStorage是否有内容
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    // foreach循环一遍，把内容从local
    tasks.forEach(function(task){
        // create li element
        const li = document.createElement('li');
        // add class
        li.className = 'collection-item';
        // create text node and append to li
        li.appendChild(document.createTextNode(task));
        // create new link element
        const link = document.createElement('a');
        // add class
        link.className = 'delete-item secondary-content';
        // add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // append the link to li
        li.appendChild(link);
        // append li to ul
        ulTaskList.appendChild(li);
    });
}


// 2. add task event
function addTask(e){
    // 如果没有输入，提示请添加一个task；如果有输入，则添加到ul中
    if(taskInput.value === ''){
        alert('Add a task');
    } else{
        // 添加到ul中有以下步骤：
        // 1. 新建一个li标签，给li标签加class（美观）
        const li = document.createElement('li');
        li.className = 'collection-item';
        // 2. 新建一个text node在append to li
        li.appendChild(document.createTextNode(taskInput.value));
        // 3. 新建删除按钮，create new link element
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        // 4. a里面有个i的图标
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // 5. 把link挂到li上面
        li.appendChild(link);
        // 6. 把li挂到ul上
        ulTaskList.appendChild(li);

        // 把input的value存储到local storage
        storeTaskInLocalStorage(taskInput.value);
        // 7. clear 之前的input
        taskInput.value = '';
    }

    e.preventDefault();  // 防止跳转
}

// 3. 存储到localStorage
function storeTaskInLocalStorage(task){
    let tasks;
    // 如果本地存储为空，设置为[]；如果有内容，先转为对象，再加上新的存储内容，重新存入存储中
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));  //JSON.parse()是转为对象
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// 4. 定义删除功能
function removeTasks(e){
    // e.target定位是i标签，i.parentElement是a标签，i.parentElement.parementElement是li标签
    // 如果a标签的classList中包含delete-item，那么这个li标签要remove掉
    if(e.target.parentElement.classList.contains('delete-item')){
        // 加一个confirm 页面
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();
        }

        // remove from LS
        removeTasksFromLocalStorage(e.target.parentElement.parentElement);
        
    }
}

// 5. remove from LS
function removeTasksFromLocalStorage(taskItem){
    // 检查LS是否为空
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    // tasks内遍历，是否有单项跟taskItem的文字内容重复，如有，从tasks中删除掉；再重新存入LS中
    // splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。
    // splice(index 规定添加/删除项目的位置, howmany 要删除的项目数量。如果设置为 0，则不会删除项目, item 可选 向数组添加的新项目 )
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    // 重新存入LS
    localStorage.setItem('tasks', JSON.stringify(tasks));


}

// 6. 一键删除功能
function clearTasks(){
    // 方法一： ul.innerHTML设置为空
    // ulTaskList.innerHTML = '';
    
    // 方法二：faster
    // removeChild比innerHTML速度要快，推荐
    while(ulTaskList.firstChild){
        ulTaskList.removeChild(ulTaskList.firstChild);
    }

    // clear from LS
    clearTasksFromLocalStorage();

}

// clear from LS
function clearTasksFromLocalStorage(){
    localStorage.clear();
}


// 定义filter event
function filterTasks(e){
    const text = e.target.value.toLowerCase();
    // li内部loop, 如果li的第一个孩子的文本（即li里的文字）找不到子串（输入的值），则返回-1；找到了就返回数字
    // 都转成小写后再进行比较
    // indexOf(子串)，表明子串在父串中首次出现的位置，如果没有，则返回-1；如果有，则返回整数，从0开始
    document.querySelectorAll('.collection-item').forEach(function(li){
        const liContent = li.firstChild.textContent;
        if(liContent.toLowerCase().indexOf(text) != -1) {
            li.style.display = 'block';
        } else{
            li.style.display = 'none';
        }
    })

    console.log(text);
}
