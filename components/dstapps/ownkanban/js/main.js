

BX.ajax.runComponentAction('dstapps:ownkanban', 'greet', {
  mode: 'class', //это означает, что мы хотим вызывать действие из class.php
  data: {
      person: 'Akim!' //данные будут автоматически замаплены на параметры метода 
  },
  analyticsLabel: {
      viewMode: 'grid',
      filterState: 'closed'	
  }	
}).then(function (response) {
  console.log(response);
  /**
  {
      "status": "success", 
      "data": "Hi Hero!", 
      "errors": []
  }
  **/			
}, function (response) {
  //сюда будут приходить все ответы, у которых status !== 'success'
  console.log(response);
  /**
  {
      "status": "error", 
      "errors": [...]
  }
  **/				
});




function application() { };
app = new application();


class Calculate {

  static getKeyByValue(object, value) {

    let stageKey = Object.keys(object).find(key => object[key].TITLE === value);
    // const index = object.map(e => e.name).indexOf(stageKey);
    let stageIndex = Object.keys(object).indexOf(stageKey); //Индекс стадии сделки в основном наборе

    return stageIndex;
  }
}

class Click {
  static optionsButtonClick = function (optionsButton) {
    BX.SidePanel.Instance.open("https://dstural24.ru/local/apps/kanban/options.php", {
      requestMethod: "post",
      requestParams: { // post-параметры
        action: "load",
        ids: [1, 2, 3],
        dictionary: {
          one: 1,
          two: 2
        }
      }
    });
  }

  static additionalInfoClick = function (optionsButton) {
    BX.SidePanel.Instance.open("https://dstural24.ru/local/apps/kanban/options.php", {
      requestMethod: "post",
      requestParams: { // post-параметры
        action: "load",
        ids: [1, 2, 3],
        dictionary: {
          one: 1,
          two: 2
        }
      }
    });
  }

  static addButtonClick = function (groups) {
    let that = this;
    console.log(this);

    Logic.view = 'top';

    var connectedGroupsCheckboxes = document.getElementsByClassName('groups-el'), checkedBoxes = []

    Elements.checkedIds = [];
    for (var i = 0; i < connectedGroupsCheckboxes.length; i++) {
      if (connectedGroupsCheckboxes[i].checked === true) {
        Elements.checkedIds.push(connectedGroupsCheckboxes[i].getAttribute('data-group-id'))
      }
    }

    Logic.finalConnected = Elements.checkedIds;

    console.log(Elements.checkedIds, "ssss");

    if (Logic.finalConnected.length) {
      Draw.draw();

    } else {
      alert("Выберите проекты для подключения")
    }


    groups.style.display = "none";

    Elements.main.classList.remove('black');

    let s = "";
    for (let i = 0; i < Elements.checkedIds.length; i++) {
      s += Elements.checkedIds[i];
      if (i != Elements.checkedIds.length - 1) s += ",";
    }

    //записываем в базу отмеченные группы 
    let ref = "https://192.168.210.12/php-mvc-master/public/?/user/&userId=" + User.id + "&usersConnectedGroupsIds=" + s;
    let d = app.localHook(ref);
  }

  static myTasksButtonClick = function (myTasksButton) {
    Logic.view = 'myTasks';
    Draw.draw();

    let listTypeAll = document.getElementById("list-type-all");


    if (listTypeAll.classList.contains("list-type-active")) {
      listTypeAll.classList.remove("list-type-active");
    } else {

    }

    myTasksButton.classList.add("list-type-active");

  }

  static tasksSelectorClick = function (tasksSelector, tasksSelectorText) {

    let listTypeAll = document.getElementById("list-type-all");


    if (tasksSelector.classList.contains("on")) {
      Logic.view = 'othersTasks';
      Draw.draw();
      tasksSelectorText.textContent = "Все задачи";
      tasksSelector.classList.remove("on");
    } else {

      Logic.view = 'myTasks';
      Draw.draw();
      tasksSelectorText.textContent = "Мои задачи";

      tasksSelector.classList.add("on");
    }

    // if (listTypeAll.classList.contains("list-type-active")) {
    //   listTypeAll.classList.remove("list-type-active");
    // } else {

    // }


  }

  static viewTypeSelectorClick = function (viewTypeSelector, viewTypeSelectorText) {

    let listTypeAll = document.getElementById("list-type-all");


    if (viewTypeSelector.classList.contains("on")) {
      Logic.viewType = 'departmentsViewType';
      Draw.draw();
      viewTypeSelectorText.textContent = "Отделы в проектах";

      viewTypeSelector.classList.remove("on");
    } else {

      Logic.viewType = 'projectsViewType';
      Draw.draw();
      viewTypeSelectorText.textContent = "Проекты в отделах";

      viewTypeSelector.classList.add("on");
    }

    // if (listTypeAll.classList.contains("list-type-active")) {
    //   listTypeAll.classList.remove("list-type-active");
    // } else {

    // }


  }



  static othersTasksButtonClick = function (othersTasksButton) {
    Logic.view = 'othersTasks';
    Draw.draw();

    let listTypeMy = document.getElementById("list-type-my");


    if (listTypeMy.classList.contains("list-type-active")) {
      listTypeMy.classList.remove("list-type-active");
    } else {

    }

    othersTasksButton.classList.add("list-type-active");
  }


  static departmentsViewTypeClick = function (departmentsViewTypeButton) {
    Logic.viewType = 'departmentsViewType';
    Draw.draw();

    let viewTypeProjects = document.getElementById("view-type-projects");


    if (viewTypeProjects.classList.contains("view-type-active")) {
      viewTypeProjects.classList.remove("view-type-active");
    } else {

    }

    departmentsViewTypeButton.classList.add("view-type-active");


  }

  static projectsViewTypeClick = function (projectsViewTypeButton) {
    Logic.viewType = 'projectsViewType';
    Draw.draw();


    let viewTypeDepartments = document.getElementById("view-type-departments");

    if (viewTypeDepartments.classList.contains("view-type-active")) {
      viewTypeDepartments.classList.remove("view-type-active");
      projectsViewTypeButton.classList.add("view-type-active");
    } else {

    }

    projectsViewTypeButton.classList.add("view-type-active");


  }


}

class Elements {

  static divStopper = '<svg id="stopper-svg" xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Задача приостановлена или не начата</title><path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" fill="indianred" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path d="M310.4 336H201.6a25.62 25.62 0 01-25.6-25.6V201.6a25.62 25.62 0 0125.6-25.6h108.8a25.62 25.62 0 0125.6 25.6v108.8a25.62 25.62 0 01-25.6 25.6z"/></svg>'
  static stopper = document.getElementById('stopper-svg');
  static uiToolbar = document.getElementsByClassName('ui-toolbar-right-buttons')[0]
  static optionsButton = document.getElementsByClassName('set-connected-groups-button')[0]
  static checkedIds = []; //+
  static stageTaskLists = document.getElementsByClassName('stageTaskList');
  static main = document.getElementById('main');
  static top = document.getElementById('top');
  static workarea = document.getElementsByClassName('workarea-content-paddings')[0];

  static async redesignBitrixDOM() {
    let additionalBody = document.createElement('div');
    additionalBody.setAttribute("id", "additional-body")
    Elements.additionalBody = additionalBody;
    Elements.workarea.insertBefore(additionalBody, Elements.main);


    //Кнопки после тайтла не справа, а слева
    Elements.uiToolbar.classList.remove("ui-toolbar-right-buttons");
    Elements.uiToolbar.classList.add("ui-toolbar-left-buttons");

    //Селекторы

    let top = document.createElement('div');
    top.setAttribute("id", "top");

    // Elements.optionsButton.onclick = Click.optionsButtonClick.bind(this, this.optionsButton)




    let tasksSelector = document.createElement('div');
    let tasksSelectorText = document.createElement('span');
    tasksSelectorText.textContent = "Все задачи";
    tasksSelector.append(tasksSelectorText);
    tasksSelector.classList.add('selector');
    tasksSelector.classList.add('task-selector');
    tasksSelectorText.classList.add('selector-text');

    tasksSelector.onclick = Click.tasksSelectorClick.bind(this, tasksSelector, tasksSelectorText);


    let tasksSelectorHandle = document.createElement('div');
    tasksSelectorHandle.classList.add('selector-handle');
    tasksSelectorHandle.classList.add('task-selector-handle');


    tasksSelector.append(tasksSelectorHandle);
    let viewTypeSelector = document.createElement('div');
    viewTypeSelector.classList.add('selector');
    viewTypeSelector.classList.add('view-type-selector');

    let viewTypeSelectorText = document.createElement('span');

    viewTypeSelectorText.classList.add('selector-text');


    viewTypeSelectorText.textContent = "Отделы в проектах";
    viewTypeSelector.onclick = Click.viewTypeSelectorClick.bind(this, viewTypeSelector, viewTypeSelectorText);
    viewTypeSelector.append(viewTypeSelectorText);

    let viewTypeSelectorHandle = document.createElement('div');
    viewTypeSelectorHandle.classList.add('selector-handle');
    viewTypeSelectorHandle.classList.add('view-type-selector-handle');



    viewTypeSelector.append(viewTypeSelectorHandle);

    top.append(tasksSelector);
    top.append(viewTypeSelector);







    let toolbar = document.getElementById("uiToolbarContainer");
    toolbar.append(top);
  }



  constructor() {
    this.projSigns = document.getElementById('project-signs');

    this.depSigns = document.getElementById('department-signs');
  }


}



//Модель ajax получения и отправки
application.prototype.bitrixHook = async function (params, hook) {
  var str = jQuery.param(params);
  // console.log(str);


  let response = await fetch(hook + "?" + str)
  response = await response.json();

  console.log(response);

  return response.result;
}

application.prototype.localHook = async function (hook) {
  //var str = jQuery.param(params);
  // console.log(str);


  let response = await fetch(hook);

  //console.log(hook + "?" + str);
  response = await response.json();

  return response.result;
}



application.prototype.sortObjectByName = function (o) {
  var sorted = {},
    key, a = [];

  for (key in o) {
    if (o.hasOwnProperty(key)) {
      a.push(key);
    }
  }

  a.sort();

  for (key = 0; key < a.length; key++) {
    sorted[a[key]] = o[a[key]];
  }
  return sorted;
}


class UpView {
  constructor(logic) {
    this.allStagess = [];
    this.main = document.getElementById('main');
    this.top = document.getElementById('top');
    this.logic = logic;

  }









}




application.prototype.animate = function () {

  const animateCSS = (element, animation, prefix = 'animate__') =>
    // We create a Promise and return it
    new Promise((resolve, reject) => {
      const animationName = `${prefix}${animation}`;
      const node = document.querySelector(element);

      node.style.setProperty('--animate-duration', '0.5s');

      node.classList.add(`${prefix}animated`, animationName);

      // When the animation ends, we clean the classes and resolve the Promise
      function handleAnimationEnd(event) {
        event.stopPropagation();
        node.classList.remove(`${prefix}animated`, animationName);
        resolve('Animation ended');
      }

      node.addEventListener('animationend', handleAnimationEnd, { once: true });
    });

  // animateCSS('.task', 'fadeInUp');

}



class User {
  static id = userIDauth;

  static userInfo = async function () {
    let ref = "https://192.168.210.12/php-mvc-master/public/?/user/&userId=" + User.id;
    let user = await app.localHook(ref);
    User.info = user[0];
    console.log(User.info);

    return user[0];
  };

}

class Logic {
  static allStages = {};

  static loading = false;

  constructor() {

  }

  static async getAddiotionalTaskInfo() {
    Logic.taskList.forEach(() => {

    })

    let tasklistIds = Logic.taskList.map(task => { return task.id; });
    // tasklistIds = tasklistIds.toString();
    tasklistIds = tasklistIds.join("','");



    Logic.tasklistIds = "'" + tasklistIds + "'";

    console.log(Logic.taskList, Logic.tasklistIds)


    let ref = "https://192.168.210.12/php-mvc-master/public/?/getTasks/&taskIds=" + tasklistIds;
    let d = await app.localHook(ref);
    console.log(ref, d, Logic.taskList)

    Logic.taskList.forEach((task, i) => {
      let dbArr = d.filter((dbTask, i) => {
        return task.id == dbTask.id;
      })

      task.dbPriority = dbArr[0].priority;

      console.log(dbArr)


    })


  }

  static async renewSize(evtTo, evtFrom, elHeight, department, project, stageIndex) {

    let divDepSign;
    //В зависимости от отображения берем разные элементы
    if (Logic.viewType == "defaultViewType" || Logic.viewType == "departmentsViewType") {
      divDepSign = document.getElementById('dep-' + department.id + '-proj' + project.id + 'sign');
    } else {
      divDepSign = document.getElementById('dep-' + project.id + '-proj' + department.id + 'sign');
    }

    console.log(Logic.viewType)
    console.log(divDepSign, 'dep-' + department.id + '-proj' + project.id + 'sign');
    let divTargetDep = evtTo;
    elHeight = +elHeight.slice(0, -2);

    let targetListHeight = +divTargetDep.style.height.slice(0, -2);
    console.log(targetListHeight, divTargetDep.childNodes.length);

    let divFromDep = evtFrom;
    let FromDepListHeight = +divFromDep.style.height.slice(0, -2);

    // alert(FromDepListHeight);
    // alert(targetListHeight);
    // if(targetListHeight)

    if ((FromDepListHeight != targetListHeight)) {
      //Если добавили в столбец в котором мало места
      // alert(123);
      // if ((targetListHeight / (120+8+4) < divTargetDep.childNodes.length + 1) && !divTargetDep.isEqualNode(divFromDep)) { //(120+8+4) размер блока задачи
      //   alert(333)
      //   divTargetDep.style.height = targetListHeight + (120+8+4) + 'px';
      //   divDepSign.style.height = targetListHeight + (120+8+4) + 'px';

      //   let depsDivs = document.getElementsByClassName('stage-department-tasks-dep-' + department.id + '-project-' + project.id);
      //   //   console.log(depsDiv);
      //   //   console.log(divDepSign, evtTo);

      //   for (let i = 0; i < depsDivs.length; i++) {
      //     depsDivs[i].style.height = targetListHeight + (120+8+4) + 'px';
      //   }

      //   let projectSign = document.getElementById('project-sign-' + project.id);
      //   console.log(projectSign)
      //   let projectSignHeight = +projectSign.style.height.slice(0, -2);
      //   projectSign.style.height = projectSignHeight + (120+8+4) + 'px';

      //   let projectDivs = document.getElementsByClassName('project' + project.id);
      //   console.log(projectDivs);
      //   for (let i = 0; i < projectDivs.length; i++) {
      //     projectDivs[i].style.height = projectSignHeight + (120+8+4) + 'px';
      //   }


      // }

      // // alert( divFromDep.childNodes.length )

      //Если удалили из столбца в котором много места
      // if (targetListHeight / (120+8+4) > divTargetDep.childNodes.length) { 

      if ((FromDepListHeight / (120 + 8 + 4) > divFromDep.childNodes.length && (divFromDep.childNodes.length != 0 && divFromDep.childNodes.length != 1) && !divTargetDep.isEqualNode(divFromDep))) { //(120+8+4) размер блока задачи
        divTargetDep.style.height = FromDepListHeight - (120 + 8 + 4) + 'px';
        divDepSign.style.height = FromDepListHeight - (120 + 8 + 4) + 'px';

        let depsDivs = document.getElementsByClassName('stage-department-tasks-dep-' + department.id + '-project-' + project.id);
        console.log(depsDivs);
        //   console.log(divDepSign, evtTo);

        for (let i = 0; i < depsDivs.length; i++) {
          // depsDivs[i].style.height = FromDepListHeight - (120+8+4) + 'px';
        }

        let projectSign = document.getElementById('project-sign-' + project.id);
        // console.log(projectSign)
        let projectSignHeight = +projectSign.style.height.slice(0, -2);
        projectSign.style.height = projectSignHeight - (120 + 8 + 4) + 'px';

        let projectDivs = document.getElementsByClassName('project' + project.id);
        console.log(projectDivs);
        for (let i = 0; i < projectDivs.length; i++) {
          projectDivs[i].style.height = projectSignHeight - (120 + 8 + 4) + 'px';
        }


      }

    } else if (FromDepListHeight == targetListHeight) {
      if ((targetListHeight / (120 + 8 + 4) < divTargetDep.childNodes.length + 1) && !divTargetDep.isEqualNode(divFromDep)) { //(120+8+4) размер блока задачи
        divTargetDep.style.height = targetListHeight + (120 + 8 + 4) + 'px';
        divDepSign.style.height = targetListHeight + (120 + 8 + 4) + 'px';

        let depsDivs = document.getElementsByClassName('stage-department-tasks-dep-' + department.id + '-project-' + project.id);
        //   console.log(depsDiv);
        //   console.log(divDepSign, evtTo);

        for (let i = 0; i < depsDivs.length; i++) {
          depsDivs[i].style.height = targetListHeight + (120 + 8 + 4) + 'px';
        }

        let projectSign = document.getElementById('project-sign-' + project.id);
        console.log(projectSign)
        let projectSignHeight = +projectSign.style.height.slice(0, -2);
        projectSign.style.height = projectSignHeight + (120 + 8 + 4) + 'px';

        let projectDivs = document.getElementsByClassName('project' + project.id);
        console.log(projectDivs);
        for (let i = 0; i < projectDivs.length; i++) {
          projectDivs[i].style.height = projectSignHeight + (120 + 8 + 4) + 'px';
        }


      }


    }


  }


  static async updateMovedTask(project, evtTo, evtItem) {
    let stageIndex = evtTo.parentNode.getAttribute("id");
    console.log(stageIndex, project, evtTo, Logic.viewType);
    stageIndex = stageIndex[stageIndex.length - 1];

    let projectId;

    if (Logic.viewType == "projectsViewType") {
      projectId = evtTo.getAttribute("data-project-id").replace(/[^\d;]/g, '');
    } else {
      projectId = project.id;
    }
    console.log(projectId, Logic.viewType)


    let projectStageArrays = Object.values(Logic.allStages).filter(stage => stage.ENTITY_ID == projectId); //Выборка Стадий проекта из всех стадий

    console.log(stageIndex, projectStageArrays)

    let taskId = evtItem.getAttribute('id').replace(/[^\d;]/g, '');
    let newStageId = projectStageArrays[stageIndex].ID;

    let params = { taskId: taskId, fields: { STAGE_ID: newStageId } }



    //Если перемещаем в последний колодец, то "завершаем задачу", если в любой другой колодец, то возобновляем
    if (stageIndex == 4) {
      await app.bitrixHook(params, "https://dstural24.ru/rest/830/l7bann8u7zjtvy8v/tasks.task.complete.json");
    } else {
      await app.bitrixHook(params, "https://dstural24.ru/rest/830/l7bann8u7zjtvy8v/tasks.task.renew.json");

    }

    //Если не пытаются вернуть в бэклог, то есть stageIndex != 1 тогда обновляем сделку
    if (stageIndex != 1) {
      await app.bitrixHook(params, "https://dstural24.ru/rest/830/l7bann8u7zjtvy8v/tasks.task.update.json");
    } else {
      alert("Возвращать задачу в бэклог нельзя. Задача будет возвращена на своё место после перезагрузки")
      Draw.draw();
    }


    console.log(stageIndex);
    // if(newStageId)

  }


  static colorPickerInput(event) {

    let color = event.target.value;
    event.target.colorBlock.style.background = color;
    // event.target.colorBlock.style.opacity = "0.9";
    // event.target.colorBlock.style.boxShadow = "3px 1px 1px 1px rgb(34 60 80 / 20%)"
    let taskId = event.target.parentNode.getAttribute("id").split('-')[1];


    let ref = `https://192.168.210.12/php-mvc-master/public/?/setTasksColors/&taskId=${taskId}&color=${color.slice(1)}`;
    let d = app.localHook(ref);

    console.log(taskId, color, ref);



  }

  static async setFinalConnected(params) {
   


    // Если у юзера в бд нет данных о подключенных проектах, то обращаемся к базе к перечню проектов по-дефолту
    if (User.info.connected_groups_ids == null || User.info.connected_groups_ids == '') {

      let ref = "https://192.168.210.12/php-mvc-master/public/?/getConnectedGroupsIds/";
      let d = await app.localHook(ref);

      Logic.finalConnected = d.connected_groups_ids.split(',');
    } else {
      Logic.finalConnected = User.info.connected_groups_ids.split(',');
    }

    // Logic.finalConnected = GIds;

    console.log(Logic.finalConnected);
  }



  static divTaskPriorityOnChange = async function (divTaskPriority) {
    console.log(divTaskPriority);
    // alert(divTaskPriority.value);
    let d = await app.localHook("https://192.168.210.12/php-mvc-master/public/?/setTasksPriority/&taskId=" + divTaskPriority.getAttribute("id") + "&taskPriority=" + divTaskPriority.value);
    // console.log(d,d[0].priority);
  }

  static getTaskPriority = async function (task, divTaskPriority, divTaskColorBlock) {
    let ref = "https://192.168.210.12/php-mvc-master/public/?/setTasksPriority/&taskId=" + divTaskPriority.getAttribute("id") + "&taskPriority=" + divTaskPriority.value;
    let d = await app.localHook(ref);
    console.log(ref);
    // console.log(d,divTaskPriority);

    let priority = d[0].priority;
    // task.dbPriority = priority;
    console.log(priority, task.dbPriority)
    let color = d[0].color;
    console.log(color, divTaskColorBlock);

    if (task.dbPriority == 610) { divTaskColorBlock.style.background = "red" } else {
      divTaskColorBlock.style.background = color;
    }


    let values = [1, 2, 3, 5, 8, 13, 21, 34, 55, 144, 233, 377, 610];
    divTaskPriority.innerHTML = "";
    let selected = "";

    values.forEach((el, i) => {
      if (el == task.dbPriority) { selected = "selected"; } else { selected = "" }
      divTaskPriority.innerHTML += "<option " + selected + ">" + el + "</option>";
    })


    // return d[0].priority;


  }

  static divTaskPriorityGet = async function (divTaskPriority) {
    let taskDB = await app.localHook("https://192.168.210.12/php-mvc-master/public/?/setTasksPriority/&taskId=" + divTaskPriority.getAttribute("id"));

    console.log("https://192.168.210.12/php-mvc-master/public/?/setTasksPriority/&taskId=" + divTaskPriority.getAttribute("id"));
    console.log(taskDB)
    let b = taskDB;
    return b;


  }


  static async drawProjects(project) {


    for (let i = 0; i < Elements.stageTaskLists.length; i++) {
      //Это дублируется внизу
      var divStageProjectDepartments = document.createElement('div'); //Див проекта
      // divStageProjectDepartments.classList.add('stage-project-departments');
      // divStageProjectDepartments.classList.add('stage-project-'+project.id);
      // divStageProjectDepartments.setAttribute('id','project' + project.id+'-st-' + i);
      divStageProjectDepartments.classList.add('stage' + i + '-project' + project.id);
      divStageProjectDepartments.classList.add('project' + project.id);
      Elements.stageTaskLists[i].appendChild(divStageProjectDepartments);

      let h = String((120 + 8 + 4)) * project.maxC + "px";

      divStageProjectDepartments.style.height = h;
      // alert(23);
    }
  }

  static async drawProjectSigns(project) {
    console.log(project, "22222", project.maxProjectTasksCount < 3, project.title.length < 40);
    let projSigns = document.getElementById('project-signs');
    let depSigns = document.getElementById('department-signs');

    let formattedTitle = (project.title.length > 12 && project.maxProjectTasksCount <= 3) ? project.title.substr(0, 12) + "..." : project.title;

    let titleLengthPx = formattedTitle.split('').length * 8 + 'px';
    console.log(project.title,)

    let elHeight = String((120 + 8 + 4)) * project.maxC + 'px'; //project.maxProjectTasksCount


    let divProjectSigns = document.createElement('div'); //Див Ярлык проекта
    divProjectSigns.classList.add('project-sign');
    divProjectSigns.setAttribute('id', 'project-sign-' + project.id)
    divProjectSigns.style.height = elHeight;
    projSigns.appendChild(divProjectSigns);

    let ProjNameSignTitle = document.createElement('div'); //Ярлык проекта
    ProjNameSignTitle.classList.add('project-sign-title');
    ProjNameSignTitle.textContent = formattedTitle;
    ProjNameSignTitle.setAttribute("data-tooltip", project.title);
    ProjNameSignTitle.style.width = titleLengthPx;

    divProjectSigns.appendChild(ProjNameSignTitle);


    let divProjHr = document.createElement('div'); //Разделительная черта проектов
    divProjHr.classList.add('project-hr');
    divProjHr.style.width = 1800 + 'px';
    projSigns.appendChild(divProjHr);

  }

  static async drawDownProjectSigns(department) {

    let projSigns = document.getElementById('project-signs');
    let depSigns = document.getElementById('department-signs');

    let formattedTitle = (department.title.length > 12 && department.maxDepartmentTasksCount <= 3) ? department.title.substr(0, 12) + "..." : department.title;


    let elHeight = String((120 + 8 + 4)) * department.sumOfProjectsLengths + 'px'; //project.maxProjectTasksCount
    let titleLengthPx = formattedTitle.split('').length * 8 + 'px';


    let divProjectSigns = document.createElement('div'); //Див Ярлык проекта
    divProjectSigns.classList.add('project-sign');
    divProjectSigns.setAttribute('id', 'project-sign-' + department.id)
    divProjectSigns.style.height = elHeight;
    projSigns.appendChild(divProjectSigns);

    let ProjNameSignTitle = document.createElement('div'); //Ярлык проекта
    ProjNameSignTitle.classList.add('project-sign-title');
    ProjNameSignTitle.textContent = formattedTitle;
    ProjNameSignTitle.setAttribute("data-tooltip", department.title)
    ProjNameSignTitle.style.width = titleLengthPx;
    divProjectSigns.appendChild(ProjNameSignTitle);


    let divProjHr = document.createElement('div'); //Разделительная черта проектов
    divProjHr.classList.add('project-hr');
    divProjHr.style.width = 1800 + 'px';
    projSigns.appendChild(divProjHr);

  }

  static async drawDepartmentSigns(department, project) {
    let depSigns = document.getElementById('department-signs');

    let elHeight = String((120 + 8 + 4)) * department.maxDepartmentTasksCount + "px";

    let divDepNameSign = document.createElement('div'); //Ярлык отдела
    divDepNameSign.classList.add('department-sign');
    divDepNameSign.setAttribute('id', 'dep-' + department.id + '-proj' + project.id + 'sign');
    divDepNameSign.style.height = elHeight;
    let divDepNameSignTitle = document.createElement('div'); //Ярлык отдела
    divDepNameSignTitle.classList.add('department-sign-title');
    divDepNameSignTitle.setAttribute('data-dep-id', 'dep' + department.id);
    divDepNameSignTitle.textContent = (department.title.length > 21 && department.maxDepartmentTasksCount <= 3) ? department.title.substring(0, 21) + "..." : department.title;
    divDepNameSignTitle.setAttribute('data-tooltip', department.title);

    divDepNameSign.appendChild(divDepNameSignTitle);
    depSigns.appendChild(divDepNameSign);

    let divDepHr = document.createElement('div'); //Разделительная черта отдела
    divDepHr.classList.add('department-hr');
    divDepHr.style.width = 1800 + 'px';
    depSigns.appendChild(divDepNameSign);
    depSigns.appendChild(divDepHr);
  }

  static async drawDepartmentSignsDownView(project, department) {
    let depSigns = document.getElementById('department-signs');

    console.log(department, project);


    let elHeight = String((120 + 8 + 4)) * project.maxProjectsStageTasksCount + "px";

    console.log("sist", department.title, project.title, project.maxProjectsStageTasksCount, elHeight);


    let divDepNameSign = document.createElement('div'); //Ярлык отдела
    divDepNameSign.classList.add('department-sign');
    divDepNameSign.setAttribute('id', 'dep-' + department.id + '-proj' + project.id + 'sign');
    divDepNameSign.style.height = elHeight;
    let divDepNameSignTitle = document.createElement('div'); //Ярлык отдела
    divDepNameSignTitle.classList.add('department-sign-title');
    divDepNameSignTitle.setAttribute('data-dep-id', 'dep' + department.id);
    divDepNameSignTitle.textContent = (project.title.length > 30) ? project.title.substring(0, 30) + "..." : project.title;
    divDepNameSignTitle.setAttribute('data-tooltip', project.title);

    divDepNameSign.appendChild(divDepNameSignTitle);
    depSigns.appendChild(divDepNameSign);

    let divDepHr = document.createElement('div'); //Разделительная черта отдела
    divDepHr.classList.add('department-hr');
    divDepHr.style.width = 1800 + 'px';
    depSigns.appendChild(divDepNameSign);
    depSigns.appendChild(divDepHr);
  }

  static async addProjectDepartments(stageIndex, project) {
    let elHeight = String((120 + 8 + 4)) * project.maxC + "px"; //8*project.maxC+"px"
    let stageProj = document.getElementsByClassName('stage' + stageIndex + '-project' + project.id);

    console.log(stageProj, stageIndex);

    Elements.stageTaskList = document.getElementById('stage-tasklist' + stageIndex); //список заданий колонки
    Elements.divStageProjectDepartments = stageProj[0];
    Elements.divStageProjectDepartments.classList.add('stage-project-departments');
    Elements.divStageProjectDepartments.setAttribute('id', 'project' + project.id + '-st' + stageIndex);
    Elements.divStageProjectDepartments.classList.add('stage' + stageIndex + '-project' + project.id);
    Elements.stageTaskList.appendChild(Elements.divStageProjectDepartments);

    Elements.divStageProjectDepartments.style.height = elHeight;

    console.log(Elements.divStageProjectDepartments)
  }

  static async addDepartmentsProjects(stageIndex, department) {
    let elHeight = String((120 + 8 + 4)) * department.sumOfProjectsLengths + "px"; //8*project.maxC+"px"
    let stageProj = document.getElementsByClassName('stage' + stageIndex + '-project' + department.id);

    Elements.stageTaskList = document.getElementById('stage-tasklist' + stageIndex); //список заданий колонки
    Elements.divStageProjectDepartments = stageProj[0];
    Elements.divStageProjectDepartments.classList.add('stage-departments-project');
    Elements.divStageProjectDepartments.setAttribute('id', 'project' + department.id + '-st' + stageIndex);
    Elements.divStageProjectDepartments.classList.add('stage' + stageIndex + '-project' + department.id);
    Elements.stageTaskList.appendChild(Elements.divStageProjectDepartments);
    Elements.divStageProjectDepartments.style.height = elHeight;
  }


  static async addProjectTasksDivs(stageIndex, department, project) {
    let elHeight = String((120 + 8 + 4)) * department.maxProjectsStageTasksCount + "px";
    console.log(Elements.divStageProjectDepartments);
    console.log(project, elHeight, department, app);
    // alert(elHeight)
    Elements.divDepartmentTasks = document.createElement('div'); //Набор задач по отделу в колодце
    Elements.divDepartmentTasks.classList.add('stage-department-tasks');
    Elements.divDepartmentTasks.classList.add('stage-department-tasks-st' + stageIndex + '-dep-' + department.id);
    Elements.divDepartmentTasks.classList.add('stage-department-tasks-dep-' + department.id + '-project-' + project.id);
    Elements.divDepartmentTasks.setAttribute('data-stage', 'st' + stageIndex);



    Elements.divDepartmentTasks.style.height = elHeight;
    Elements.divStageProjectDepartments.appendChild(Elements.divDepartmentTasks);

    Elements.divDepartmentTasks.setAttribute('data-project-id', 'project' + department.id); //ОШИБКА ИМЕНОВАНИЯ
    Elements.divDepartmentTasks.setAttribute('data-dep-id', 'dep' + project.id);

    // elements.getUser();
    // var dropdown_content_ths = document.querySelectorAll('.dropdown__content[data-content="'+data_id+'"]');
    let d = document.getElementById('task-80043');
    new Sortable(Elements.divDepartmentTasks, {
      // group: 'shared' + '-dep-' + department.id,
      group: 'stage-department-tasks-dep-' + department.id + '-project-' + project.id,
      animation: 150,
      filter: '.t',

      onStart: function (/**Event*/evt) {
        evt.oldIndex;  // element index within parent
        // evt.item.style.transform = 'rotate(' + 10 + 'deg)'
        console.log(evt.item);
        // alert(123)
      },
      onMove: function (/**Event*/evt, /**Event*/originalEvent) {
        // Example: https://jsbin.com/nawahef/edit?js,output
        evt.dragged; // dragged HTMLElement
        evt.draggedRect; // DOMRect {left, top, right, bottom}
        evt.related; // HTMLElement on which have guided
        evt.relatedRect; // DOMRect
        evt.willInsertAfter; // Boolean that is true if Sortable will insert drag element after target by default
        originalEvent.clientY; // mouse position
        console.log(evt.related.getAttribute("data-id"));
        //Запрет на перетягивание в бэклог
        if (evt.related.parentNode.getAttribute("data-stage") == 'st1' || evt.related.parentNode.getAttribute("data-stage") == 'st0') {
          return false;
        }
        // return false; — for cancel
        // return -1; — insert before target
        // return 1; — insert after target
        // return true; — keep default insertion point based on the direction
        // return void; — keep default insertion point based on the direction
      },
      onEnd: function (/**Event*/evt) {
        var itemEl = evt.item;  // dragged HTMLElement
        evt.to;    // target list
        evt.from;  // previous list
        evt.oldIndex;  // element's old index within old parent
        evt.newIndex;  // element's new index within new parent
        evt.oldDraggableIndex; // element's old index within old parent, only counting draggable elements
        evt.newDraggableIndex; // element's new index within new parent, only counting draggable elements
        evt.clone // the clone element
        evt.pullMode;  // when item is in another sortable: `"clone"` if cloning, `true` if moving
        console.log(this, itemEl, app)
        Logic.renewSize(evt.to, evt.from, elHeight, department, project, stageIndex); //Держим сетку под контролем после передвижения задачи
        Logic.updateMovedTask(project, evt.to, evt.item);
      },
      onRemove: function (/**Event*/evt) {
        // alert('удалили')
      },
      ghostClass: "sortable-ghost",
      dragClass: "sortable-drag",
    }, Elements);

  }

  static async addDepartmentTasksDivs(stageIndex, department, project) {
    let elHeight = String((120 + 8 + 4)) * department.maxDepartmentTasksCount + "px";
    // alert(elHeight)
    // console.log(divStageProjectDepartments)
    // alert(stageIndex)
    Elements.divDepartmentTasks = document.createElement('div'); //Набор задач по отделу в колодце
    Elements.divDepartmentTasks.classList.add('stage-department-tasks');
    Elements.divDepartmentTasks.classList.add('stage-department-tasks-st' + stageIndex + '-dep-' + department.id);
    Elements.divDepartmentTasks.classList.add('stage-department-tasks-dep-' + department.id + '-project-' + project.id);
    Elements.divDepartmentTasks.setAttribute('data-stage', 'st' + stageIndex);


    Elements.divDepartmentTasks.style.height = elHeight;
    Elements.divStageProjectDepartments.appendChild(Elements.divDepartmentTasks);

    Elements.divDepartmentTasks.setAttribute('data-dep-id', 'dep' + department.id);
    Elements.divDepartmentTasks.setAttribute('data-project-id', 'project' + project.id);


    // var dropdown_content_ths = document.querySelectorAll('.dropdown__content[data-content="'+data_id+'"]');
    let d = document.getElementById('task-80043');
    new Sortable(Elements.divDepartmentTasks, {
      // group: 'shared' + '-dep-' + department.id,
      group: 'stage-department-tasks-dep-' + department.id + '-project-' + project.id,
      animation: 150,
      filter: '.t',

      onStart: function (/**Event*/evt) {
        evt.oldIndex;  // element index within parent
        // evt.item.style.transform = 'rotate(' + 10 + 'deg)'
        console.log(evt.item);
        // alert(123)
      },
      onMove: function (/**Event*/evt, /**Event*/originalEvent) {
        // Example: https://jsbin.com/nawahef/edit?js,output
        evt.dragged; // dragged HTMLElement
        evt.draggedRect; // DOMRect {left, top, right, bottom}
        evt.related; // HTMLElement on which have guided
        evt.relatedRect; // DOMRect
        evt.willInsertAfter; // Boolean that is true if Sortable will insert drag element after target by default
        originalEvent.clientY; // mouse position
        console.log(evt.related.getAttribute("data-id"));
        //Запрет на перетягивание в бэклог
        if (evt.related.parentNode.getAttribute("data-stage") == 'st1' || evt.related.parentNode.getAttribute("data-stage") == 'st0') {
          return false;
        }
        // return false; — for cancel
        // return -1; — insert before target
        // return 1; — insert after target
        // return true; — keep default insertion point based on the direction
        // return void; — keep default insertion point based on the direction
      },
      onEnd: function (/**Event*/evt) {
        var itemEl = evt.item;  // dragged HTMLElement
        evt.to;    // target list
        evt.from;  // previous list
        evt.oldIndex;  // element's old index within old parent
        evt.newIndex;  // element's new index within new parent
        evt.oldDraggableIndex; // element's old index within old parent, only counting draggable elements
        evt.newDraggableIndex; // element's new index within new parent, only counting draggable elements
        evt.clone // the clone element
        evt.pullMode;  // when item is in another sortable: `"clone"` if cloning, `true` if moving
        console.log(this, itemEl, app)
        Logic.renewSize(evt.to, evt.from, elHeight, department, project, stageIndex); //Держим сетку под контролем после передвижения задачи
        Logic.updateMovedTask(project, evt.to, evt.item);
      },
      onRemove: function (/**Event*/evt) {
        // alert('удалили')
      },
      ghostClass: "sortable-ghost",
      dragClass: "sortable-drag",
    }, Elements);

  }

  static async addTasks(tasks, department) {
    let divTaskCollection = [];



    tasks.forEach((task, i) => { //Для каждой задачи каждой колонки каждого подразделения



      let divTask = document.createElement('div'); //карточка задачи
      divTask.classList.add('task');
      divTask.classList.add('list-group-item');
      divTask.setAttribute('id', 'task-' + task.id);
      divTask.setAttribute('data-id', task.responsible.id);

      //Если юзер не является постановщиком задачи или ответсвенным, тогда запрещаем перетаскивать задачу //на бэк!!!!
      // alert(elements.user.ID)

      //userIDAuth беру с php
      if ((User.id != task.responsible.id) && (User.id != task.createdBy)) {
        divTask.classList.add('t');
      }

      let inputTaskColorPickerHidden = document.createElement('input'); //Цветовой блок карточки
      inputTaskColorPickerHidden.setAttribute("type", "color");
      inputTaskColorPickerHidden.classList.add('color-block-hidden');
      // divTaskColorBlockHidden.style.display = "none";


      let divTaskColorBlock = document.createElement('div'); //Цветовой блок карточки
      divTaskColorBlock.classList.add('color-block');
      divTaskColorBlock.setAttribute("id", "cb" + task.id)
      console.log(task.dbPriority)


      inputTaskColorPickerHidden.colorBlock = divTaskColorBlock;
      divTaskColorBlock.onclick = function () {
        inputTaskColorPickerHidden.click();

        // let coords = target.getBoundingClientRect();

        // let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
        // if (left < 0) left = 0; // не заезжать за левый край окна

        // let top = coords.top - tooltipElem.offsetHeight - 5;
        // // top += 50;
        // if (top < 0) { // если подсказка не помещается сверху, то отображать её снизу
        //   top = coords.top + target.offsetHeight + 5;
        //   // top -= 50;
        // }

        // tooltipElem.style.left = left + 'px';
        // tooltipElem.style.top = top + 'px';
      };

      inputTaskColorPickerHidden.addEventListener("change", Logic.colorPickerInput, false);



      divTask.appendChild(divTaskColorBlock);
      divTask.appendChild(inputTaskColorPickerHidden);

      //Блок задач 
      let divTaskPriorityWrap = document.createElement('div');
      divTaskPriorityWrap.classList.add('task-priority-wrap');





      //Берем значения приоритетов 

      let divTaskPriority = document.createElement('select');
      divTaskPriority.classList.add('task-priority');
      divTaskPriority.setAttribute('id', task.id);

      // let taskDB = await this.divTaskPriorityGet(divTaskPriority);

      // console.log(taskDB);

      //Получаю значение приоритета из базы и вывожу
      Logic.getTaskPriority(task, divTaskPriority, divTaskColorBlock)
      // console.log(priority, );

      //  let s = await Logic.getAllStage();
      //  console.log(s);



      // divTaskPriority.innerHTML = "<option>1</option>" +
      //   "<option>2</option>" +
      //   "<option>3</option>" +
      //   "<option>5</option>" +
      //   "<option>8</option>" +
      //   "<option>13</option>" +
      //   "<option>21</option>" +
      //   "<option>34</option>" +
      //   "<option>55</option>" +
      //   "<option>144</option>" +
      //   "<option>233</option>" +
      //   "<option>377</option>" +
      //   "<option>610</option>";

      divTaskPriority.onchange = Logic.divTaskPriorityOnChange.bind(Logic, divTaskPriority);




      divTaskPriorityWrap.appendChild(divTaskPriority, divTaskColorBlock);






      let divTaskInfoWrap = document.createElement('div');
      divTaskInfoWrap.classList.add('task-info-wrap');


      let divTaskName = document.createElement('a'); //Название карточки
      divTaskName.setAttribute('href', 'https://dstural24.ru/workgroups/group/' + task.groupId + '/tasks/task/view/' + task.id + '/')
      divTaskName.classList.add('task-title');
      divTaskName.textContent = (task.title.length > 40) ? task.title.substring(0, 35) + "..." : task.title;
      divTaskInfoWrap.appendChild(divTaskName);

      var months = { 1: 'января', 2: 'февраля', 3: 'марта', 4: 'апреля', 5: 'мая', 6: 'июня', 7: 'июля', 8: 'августа', 9: 'сентября', 10: 'октября', 11: 'ноября', 12: 'декабря' };


      if (task.startDatePlan != null) {
        var dateStartArr = task.startDatePlan.split("-");
        var month = dateStartArr[1].replace(/^0+/, '');
        // month = months[month - 1];
        month = months[month];
      }




      let divTaskDateStart = document.createElement('div'); //Название карточки
      divTaskDateStart.classList.add('task-datestart');

      let divTaskDeadline = document.createElement('div'); //
      divTaskDeadline.classList.add('task-deadline');

      divTaskDateStart.textContent = (task.startDatePlan == null) ? 'Дата начала не указана' : dateStartArr[2].substring(0, 2).replace(/^0+/, '') + ' ' + month + ' ' + dateStartArr[0];
      // divTask.appendChild(divTaskDateStart);


      if (task.deadline != null) {
        var dateDeadlineArr = task.deadline.split("-");

        console.log(dateDeadlineArr);

        month = dateDeadlineArr[1].replace(/^0+/, '');
        month = months[month];

      }




      divTaskDeadline.textContent = (task.deadline == null) ? 'Дедлайн не указан' : dateDeadlineArr[2].substring(0, 2).replace(/^0+/, '') + ' ' + month + ' ' + dateDeadlineArr[0];

      if ((new Date() > new Date(task.deadline)) && (task.closedBy == null)) divTaskDeadline.style.color = "red"; //Если истё дедлайн и дата не указана

      console.log(dateDeadlineArr)




      let divTaskDates = document.createElement('div'); //контейнер дат
      divTaskDates.classList.add('task-dates');

      divTaskDates.appendChild(divTaskDateStart);
      divTaskDates.appendChild(divTaskDeadline);

      divTaskInfoWrap.appendChild(divTaskPriorityWrap); //фибонначи
      divTaskInfoWrap.appendChild(divTaskDates);

      divTask.appendChild(divTaskInfoWrap); //Даты






      let divCreator = document.createElement('a'); //Постановщик
      divCreator.setAttribute('style', "background-image: url('" + task.creator.icon + "')");
      divCreator.setAttribute('title', task.creator.name);
      divCreator.setAttribute('href', 'https://dstural24.ru/company/personal/user/' + task.creator.id + '/');


      divCreator.style.backgroundSize = "23px 23px";
      divCreator.style.backgroundPosition = "0 0";
      divCreator.style.width = "23px";
      divCreator.style.height = "23px";
      divCreator.style.borderRadius = "50px";
      divCreator.style.margin = "-35px 0px 0px 20px";
      divCreator.classList.add('creator-ph');



      divTask.appendChild(divCreator);


      let divCreatorArrow = document.createElement('div'); //Постановщик
      divCreatorArrow.setAttribute('style', "background-image: url('" + 'data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%206%209%22%3E%0A%20%20%3Cpath%20fill%3D%22%23B9BDC3%22%20fill-rule%3D%22evenodd%22%20d%3D%22M40.7331259%2C101.722718%20L40.7331259%2C97.2383297%20L39.2383297%2C97.2383297%20L39.2383297%2C102.470116%20L39.2383297%2C103.217514%20L45.2175144%2C103.217514%20L45.2175144%2C101.722718%20L40.7331259%2C101.722718%20Z%22%20transform%3D%22rotate%28-135%201.846%2060.72%29%22%20opacity%3D%22.69%22/%3E%0A%3C/svg%3E%0A' + "')");

      // divCreatorArrow.style.backgroundImage='url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%206%209%22%3E%0A%20%20%3Cpath%20fill%3D%22%23B9BDC3%22%20fill-rule%3D%22evenodd%22%20d%3D%22M40.7331259%2C101.722718%20L40.7331259%2C97.2383297%20L39.2383297%2C97.2383297%20L39.2383297%2C102.470116%20L39.2383297%2C103.217514%20L45.2175144%2C103.217514%20L45.2175144%2C101.722718%20L40.7331259%2C101.722718%20Z%22%20transform%3D%22rotate%28-135%201.846%2060.72%29%22%20opacity%3D%22.69%22/%3E%0A%3C/svg%3E%0A") center center no-repeat';
      divCreatorArrow.style.backgroundSize = "11px 11px";
      divCreatorArrow.style.backgroundPosition = "0 0";
      divCreatorArrow.style.width = "11px";
      divCreatorArrow.style.height = "11px";
      divCreatorArrow.style.margin = "-28px 0px 0px 50px";


      divTask.appendChild(divCreatorArrow);

      let divResponsible = document.createElement('a'); //Ответственный
      divResponsible.setAttribute('style', "background-image: url('" + task.responsible.icon + "')");
      divResponsible.setAttribute('title', task.responsible.name);
      divResponsible.setAttribute('href', 'https://dstural24.ru/company/personal/user/' + task.responsible.id + '/');

      // divCreatorArrow.style.backgroundImage='url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%206%209%22%3E%0A%20%20%3Cpath%20fill%3D%22%23B9BDC3%22%20fill-rule%3D%22evenodd%22%20d%3D%22M40.7331259%2C101.722718%20L40.7331259%2C97.2383297%20L39.2383297%2C97.2383297%20L39.2383297%2C102.470116%20L39.2383297%2C103.217514%20L45.2175144%2C103.217514%20L45.2175144%2C101.722718%20L40.7331259%2C101.722718%20Z%22%20transform%3D%22rotate%28-135%201.846%2060.72%29%22%20opacity%3D%22.69%22/%3E%0A%3C/svg%3E%0A") center center no-repeat';
      divResponsible.style.backgroundSize = "23px 23px";
      divResponsible.style.backgroundPosition = "0 0";
      divResponsible.style.width = "23px";
      divResponsible.style.height = "23px";
      divResponsible.style.borderRadius = "50px";
      divResponsible.style.margin = "-18px 0px 0px 65px";
      divResponsible.style.cursor = "pointer";
      divResponsible.classList.add('resp-ph');

      divTask.appendChild(divResponsible);



      let divResponsibleName = document.createElement('a'); //Ответственный
      let responsibleNameArr = task.responsible.name.split(' ');

      divResponsibleName.textContent = responsibleNameArr[0] + ' ' + responsibleNameArr[1][0] + '.' + responsibleNameArr[2][0] + '.';
      divResponsibleName.classList.add('responsible-name');
      divTask.appendChild(divResponsibleName);

      if (task.status == 2) {

        let divStopper = document.createElement('div'); //Ответственный
        divStopper.classList.add('task-stopper');
        divStopper.setAttribute('title', "Задача не начата или приостановлена");

        divStopper.innerHTML = Elements.divStopper;
        console.log(Elements.stopper);
        divTask.appendChild(divStopper);
        // Elements.stopper.setAttribute("fill","red");

      }

      let divAdditionalInfo = document.createElement('div'); //Ответственный
      divAdditionalInfo.classList.add('task-additional-info');
      divAdditionalInfo.setAttribute('title', "Дополнительная информация по задаче");
      divAdditionalInfo.onclick = Click.additionalInfoClick;


      divTask.appendChild(divAdditionalInfo);





      divTaskCollection.push(divTask);


      let h = String((120 + 8 + 4)) * department.maxDepartmentTasksCount + "px";

      if (i == tasks.length - 1) {

        for (var i = 0; i < divTaskCollection.length; ++i) {
          Elements.divDepartmentTasks.appendChild(divTaskCollection[i]);
        }


        // Elements.divDepartmentTasks.setAttribute('id', 'dep' + department.id); //удалить
        Elements.divDepartmentTasks.style.height = h;

        Elements.divStageProjectDepartments.appendChild(Elements.divDepartmentTasks);

      }


    });
  }

  async addTasksDownView(tasks, elements, department) {
    let divTaskCollection = [];

    let that = this;


    tasks.forEach((task, i) => { //Для каждой задачи каждой колонки каждого подразделения



      let divTask = document.createElement('div'); //карточка задачи
      divTask.classList.add('task');
      divTask.classList.add('list-group-item');
      divTask.setAttribute('id', 'task-' + task.id);
      divTask.setAttribute('data-id', task.responsible.id);

      //Если юзер не является постановщиком задачи или ответсвенным, тогда запрещаем перетаскивать задачу //на бэк!!!!
      // alert(elements.user.ID)
      // if ((elements.user.ID != task.responsible.id) || (elements.user.ID != task.createdBy)) {
      //   // alert(123);
      //   divTask.classList.add('t');
      // }

      //userIDAuth беру с php
      if ((User.id != task.responsible.id) && (User.id != task.createdBy)) {
        // alert(123);
        console.log(task.responsible.id, task.createdBy);
        console.log(task);
        divTask.classList.add('t');
      }

      let divTaskColorBlock = document.createElement('div'); //Цветовой блок карточки
      divTaskColorBlock.classList.add('color-block');
      divTaskColorBlock.setAttribute('id', 'cb' + task.id);
      divTask.appendChild(divTaskColorBlock);

      //Блок задач 
      let divTaskPriorityWrap = document.createElement('div');
      divTaskPriorityWrap.classList.add('task-priority-wrap');





      //Берем значения приоритетов 

      let divTaskPriority = document.createElement('select');
      divTaskPriority.classList.add('task-priority');
      divTaskPriority.setAttribute('id', task.id);

      // let taskDB = await this.divTaskPriorityGet(divTaskPriority);

      // console.log(taskDB);

      that.getTaskPriority(divTaskPriority)
      // console.log(priority, );



      // divTaskPriority.innerHTML = "<option>1</option>" +
      //   "<option>2</option>" +
      //   "<option>3</option>" +
      //   "<option>5</option>" +
      //   "<option>8</option>" +
      //   "<option>13</option>" +
      //   "<option>21</option>" +
      //   "<option>34</option>" +
      //   "<option>55</option>" +
      //   "<option>144</option>" +
      //   "<option>233</option>" +
      //   "<option>377</option>" +
      //   "<option>610</option>";

      divTaskPriority.onchange = this.divTaskPriorityOnChange.bind(this, divTaskPriority);




      divTaskPriorityWrap.appendChild(divTaskPriority);






      let divTaskInfoWrap = document.createElement('div');
      divTaskInfoWrap.classList.add('task-info-wrap');


      let divTaskName = document.createElement('a'); //Название карточки
      divTaskName.setAttribute('href', 'https://dstural24.ru/workgroups/group/' + task.groupId + '/tasks/task/view/' + task.id + '/')
      divTaskName.classList.add('task-title');
      divTaskName.textContent = (task.title.length > 40) ? task.title.substring(0, 35) + "..." : task.title;
      divTaskInfoWrap.appendChild(divTaskName);

      var months = { 1: 'января', 2: 'февраля', 3: 'марта', 4: 'апреля', 5: 'мая', 6: 'июня', 7: 'июля', 8: 'августа', 9: 'сентября', 10: 'октября', 11: 'ноября', 12: 'декабря' };


      if (task.dateStart != null) {
        var dateStartArr = task.dateStart.split("-");
        var month = dateStartArr[1].replace(/^0+/, '');
        // month = months[month - 1];
        month = months[month];
      }




      let divTaskDateStart = document.createElement('div'); //Название карточки
      divTaskDateStart.classList.add('task-datestart');

      let divTaskDeadline = document.createElement('div'); //
      divTaskDeadline.classList.add('task-deadline');

      divTaskDateStart.textContent = (task.dateStart == null) ? 'Дата начала не указана' : dateStartArr[2].substring(0, 2).replace(/^0+/, '') + ' ' + month + ' ' + dateStartArr[0];
      // divTask.appendChild(divTaskDateStart);


      if (task.deadline != null) {
        var dateDeadlineArr = task.deadline.split("-");

        console.log(dateDeadlineArr);

        month = dateDeadlineArr[1].replace(/^0+/, '');
        month = months[month];

      }




      divTaskDeadline.textContent = (task.deadline == null) ? 'Дедлайн не указан' : dateDeadlineArr[2].substring(0, 2).replace(/^0+/, '') + ' ' + month + ' ' + dateDeadlineArr[0];

      if (new Date() > task.deadline) divTaskDeadline.style.color = "#9f1b1b"; //Если истё дедлайн и дата не указана

      console.log(dateDeadlineArr)




      let divTaskDates = document.createElement('div'); //контейнер дат
      divTaskDates.classList.add('task-dates');

      divTaskDates.appendChild(divTaskDateStart);
      divTaskDates.appendChild(divTaskDeadline);

      divTaskInfoWrap.appendChild(divTaskPriorityWrap); //фибонначи
      divTaskInfoWrap.appendChild(divTaskDates);

      divTask.appendChild(divTaskInfoWrap); //Даты






      let divCreator = document.createElement('a'); //Постановщик
      divCreator.setAttribute('style', "background-image: url('" + task.creator.icon + "')");
      divCreator.setAttribute('title', task.creator.name);
      divCreator.setAttribute('href', 'https://dstural24.ru/company/personal/user/' + task.creator.id + '/');


      divCreator.style.backgroundSize = "23px 23px";
      divCreator.style.backgroundPosition = "0 0";
      divCreator.style.width = "23px";
      divCreator.style.height = "23px";
      divCreator.style.borderRadius = "50px";
      divCreator.style.margin = "-35px 0px 0px 20px";
      divCreator.classList.add('creator-ph');



      divTask.appendChild(divCreator);


      let divCreatorArrow = document.createElement('div'); //Постановщик
      divCreatorArrow.setAttribute('style', "background-image: url('" + 'data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%206%209%22%3E%0A%20%20%3Cpath%20fill%3D%22%23B9BDC3%22%20fill-rule%3D%22evenodd%22%20d%3D%22M40.7331259%2C101.722718%20L40.7331259%2C97.2383297%20L39.2383297%2C97.2383297%20L39.2383297%2C102.470116%20L39.2383297%2C103.217514%20L45.2175144%2C103.217514%20L45.2175144%2C101.722718%20L40.7331259%2C101.722718%20Z%22%20transform%3D%22rotate%28-135%201.846%2060.72%29%22%20opacity%3D%22.69%22/%3E%0A%3C/svg%3E%0A' + "')");

      // divCreatorArrow.style.backgroundImage='url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%206%209%22%3E%0A%20%20%3Cpath%20fill%3D%22%23B9BDC3%22%20fill-rule%3D%22evenodd%22%20d%3D%22M40.7331259%2C101.722718%20L40.7331259%2C97.2383297%20L39.2383297%2C97.2383297%20L39.2383297%2C102.470116%20L39.2383297%2C103.217514%20L45.2175144%2C103.217514%20L45.2175144%2C101.722718%20L40.7331259%2C101.722718%20Z%22%20transform%3D%22rotate%28-135%201.846%2060.72%29%22%20opacity%3D%22.69%22/%3E%0A%3C/svg%3E%0A") center center no-repeat';
      divCreatorArrow.style.backgroundSize = "11px 11px";
      divCreatorArrow.style.backgroundPosition = "0 0";
      divCreatorArrow.style.width = "11px";
      divCreatorArrow.style.height = "11px";
      divCreatorArrow.style.margin = "-28px 0px 0px 50px";


      divTask.appendChild(divCreatorArrow);

      let divResponsible = document.createElement('a'); //Ответственный
      divResponsible.setAttribute('style', "background-image: url('" + task.responsible.icon + "')");
      divResponsible.setAttribute('title', task.responsible.name);
      divResponsible.setAttribute('href', 'https://dstural24.ru/company/personal/user/' + task.responsible.id + '/');

      // divCreatorArrow.style.backgroundImage='url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%206%209%22%3E%0A%20%20%3Cpath%20fill%3D%22%23B9BDC3%22%20fill-rule%3D%22evenodd%22%20d%3D%22M40.7331259%2C101.722718%20L40.7331259%2C97.2383297%20L39.2383297%2C97.2383297%20L39.2383297%2C102.470116%20L39.2383297%2C103.217514%20L45.2175144%2C103.217514%20L45.2175144%2C101.722718%20L40.7331259%2C101.722718%20Z%22%20transform%3D%22rotate%28-135%201.846%2060.72%29%22%20opacity%3D%22.69%22/%3E%0A%3C/svg%3E%0A") center center no-repeat';
      divResponsible.style.backgroundSize = "23px 23px";
      divResponsible.style.backgroundPosition = "0 0";
      divResponsible.style.width = "23px";
      divResponsible.style.height = "23px";
      divResponsible.style.borderRadius = "50px";
      divResponsible.style.margin = "-18px 0px 0px 65px";
      divResponsible.style.cursor = "pointer";
      divResponsible.classList.add('resp-ph');

      divTask.appendChild(divResponsible);



      let divResponsibleName = document.createElement('a'); //Ответственный
      let responsibleNameArr = task.responsible.name.split(' ');

      divResponsibleName.textContent = responsibleNameArr[0] + ' ' + responsibleNameArr[1][0] + '.' + responsibleNameArr[2][0] + '.';
      divResponsibleName.classList.add('responsible-name');
      divTask.appendChild(divResponsibleName);



      divTaskCollection.push(divTask);


      let h = String((120 + 8 + 4)) * department.maxDepartmentTasksCount + "px";

      if (i == tasks.length - 1) {

        for (var i = 0; i < divTaskCollection.length; ++i) {
          elements.divDepartmentTasks.appendChild(divTaskCollection[i]);
        }


        elements.divDepartmentTasks.setAttribute('id', 'dep' + department.id);
        elements.divDepartmentTasks.style.height = h;

        elements.divStageProjectDepartments.appendChild(elements.divDepartmentTasks);

      }


    });
  }



  static async drawUpViewKanban(app) {
    console.log(Logic.stageTaskLists);

    Object.values(Logic.projects).forEach((project, i) => {  //Для Всех проектов

      //console.log(upView)

      Logic.drawProjects(project); //Для всех колодцев заполняю наличие проектов с определенной высотой
      Logic.drawProjectSigns(project); //Для всех проектов рисую ярлыки с названиями

      for (const [depID, department] of Object.entries(project.departments)) { //Для каждого подразделения

        // console.log(depID, department);
        Logic.drawDepartmentSigns(department, project)

        let filteredStages = department.filteredStages;

        //Для каждой колонки подразделения
        for (const [stageTitle, tasks] of Object.entries(filteredStages)) {
          let taskss = tasks;

          taskss = taskss.sort((a, b) => Number(a.dbPriority) < Number(b.dbPriority) ? 1 : -1);

          console.log(tasks, taskss);

          let stageIndex = Calculate.getKeyByValue(Elements.stages, stageTitle);
          console.log(stageIndex,Elements.stages,stageTitle)
          Logic.addProjectDepartments(stageIndex, project);
          Logic.addDepartmentTasksDivs(stageIndex, department, project, app);
          Logic.addTasks(tasks, department)

          let a = document.createElement('a'); //Ответственный
          a.setAttribute('href', "https://dstural24.ru/local/apps/kanban/title.php");
          a.textContent = "11111";

          // elements.main.appendChild(a)

        }

      }

    });
  }

  static async drawDownViewKanban(app) {


    Object.values(Logic.departments).forEach((department, i) => {  //Для Всех проектов

      //console.log(upView)

      Logic.drawProjects(department); //Для всех колодцев заполняю наличие проектов с определенной высотой
      Logic.drawDownProjectSigns(department); //Для всех проектов рисую ярлыки с названиями

      for (const [projectID, project] of Object.entries(department.projects)) { //Для каждого подразделения

        // console.log(depID, department);
        Logic.drawDepartmentSignsDownView(project, department)

        let filteredStages = project.filteredStages;

        //Для каждой колонки подразделения
        for (const [stageTitle, tasks] of Object.entries(filteredStages)) {
          let stageIndex = Calculate.getKeyByValue(Elements.stages, stageTitle);

          Logic.addDepartmentsProjects(stageIndex, department);
          Logic.addProjectTasksDivs(stageIndex, project, department, app);
          Logic.addTasks(tasks, project)

          let a = document.createElement('a'); //Ответственный
          a.setAttribute('href', "https://dstural24.ru/local/apps/kanban/title.php");
          a.textContent = "11111";

          // elements.main.appendChild(a)

        }

      }

    });
  }

  static async upViewProjectFilter() {
    const filteredTasks = Logic.taskList.reduce((acc, task, i) => {
      // Group initialization
      // if (!acc[task.group.name]) {
      //   acc[task.group.name] = [];
      // }

      // Grouping

      let departmentName = task.user.department.NAME;
      let departmentID = task.user.department.ID;

      if (!acc[task.groupId]) {
        acc[task.groupId] = {};
      }

      if (!acc[task.groupId].departments) {
        acc[task.groupId].departments = {};

      }

      if (!acc[task.groupId].departments[departmentID]) {
        acc[task.groupId].departments[departmentID] = {};
      }

      if (!acc[task.groupId].departments[departmentID].creatorsAndResps) {
        acc[task.groupId].departments[departmentID].creatorsAndResps = { creator: [], responsible: [] };
      }


      if (!acc[task.groupId].departments[departmentID].tasks) {
        acc[task.groupId].departments[departmentID].tasks = [];
      }




      // if (!acc[task.groupId][task.user.department.NAME]) {
      //   acc[task.groupId].departmentName = [];
      // }


      acc[task.groupId].departments[departmentID].tasks.push(task);
      acc[task.groupId].departments[departmentID].title = departmentName;

      // let creatorsAndResps = {task: task.id, creator: task.createdBy, responsible: task.responsible.id }
      if (!acc[task.groupId].departments[departmentID].creatorsAndResps.creator.includes(task.createdBy) && !acc[task.groupId].departments[departmentID].creatorsAndResps.responsible.includes(task.responsible.id)) {
        acc[task.groupId].departments[departmentID].creatorsAndResps.creator.push(task.createdBy);
        acc[task.groupId].departments[departmentID].creatorsAndResps.responsible.push(task.responsible.id);
      }
      // acc[task.groupId][departmentID].index = departmentName;
      acc[task.groupId].title = task.group.name;
      acc[task.groupId].id = task.groupId;
      // acc[task.group.name].push(task);


      return acc;
    }, {});

    Logic.projects = Object.values(filteredTasks);

    //console.log(Object.values(filteredTasks));

  }

  static async downViewProjectFilter() {
    const filteredTasks = Logic.taskList.reduce((acc, task, i) => {
      // Group initialization
      // if (!acc[task.group.name]) {
      //   acc[task.group.name] = [];
      // }

      // Grouping

      let departmentName = task.user.department.NAME;
      let departmentID = task.user.department.ID;

      console.log(task);

      if (!acc[departmentID]) {
        acc[departmentID] = {};
      }


      if (!acc[departmentID].projects) {
        acc[departmentID].projects = {};
      }


      if (!acc[departmentID].projects[task.groupId]) {
        acc[departmentID].projects[task.groupId] = {};
      }

      if (!acc[departmentID].projects[task.groupId].creatorsAndResps) {
        acc[departmentID].projects[task.groupId].creatorsAndResps = { creator: [], responsible: [] };
      }

      if (!acc[departmentID].projects[task.groupId].tasks) {
        acc[departmentID].projects[task.groupId].tasks = [];
      }

      acc[departmentID].projects[task.groupId].tasks.push(task);
      acc[departmentID].projects[task.groupId].title = task.group.name;

      // if (!acc[task.groupId].departments[departmentID].creatorsAndResps.creator.includes(task.createdBy) && !acc[task.groupId].departments[departmentID].creatorsAndResps.responsible.includes(task.responsible.id)) {
      //   acc[task.groupId].departments[departmentID].creatorsAndResps.creator.push(task.createdBy);
      //   acc[task.groupId].departments[departmentID].creatorsAndResps.responsible.push(task.responsible.id);
      // }

      acc[departmentID].title = task.user.department.NAME;
      acc[departmentID].id = task.user.department.ID;

      if (!acc[departmentID].sumOfProjectsLengths) {
        acc[departmentID].sumOfProjectsLengths = 0;
      }



      // if (!acc[task.groupId]) {
      //   acc[task.groupId] = {};
      // }

      // if (!acc[task.groupId].departments) {
      //   acc[task.groupId].departments = {};
      // }

      // if (!acc[task.groupId].departments[departmentID]) {
      //   acc[task.groupId].departments[departmentID] = {};
      // }

      // if (!acc[task.groupId].departments[departmentID].creatorsAndResps) {
      //   acc[task.groupId].departments[departmentID].creatorsAndResps = { creator: [], responsible: [] };
      // }


      // if (!acc[task.groupId].departments[departmentID].tasks) {
      //   acc[task.groupId].departments[departmentID].tasks = [];
      // }




      // // if (!acc[task.groupId][task.user.department.NAME]) {
      // //   acc[task.groupId].departmentName = [];
      // // }


      // acc[task.groupId].departments[departmentID].tasks.push(task);
      // acc[task.groupId].departments[departmentID].title = departmentName;

      // // let creatorsAndResps = {task: task.id, creator: task.createdBy, responsible: task.responsible.id }
      // if (!acc[task.groupId].departments[departmentID].creatorsAndResps.creator.includes(task.createdBy) && !acc[task.groupId].departments[departmentID].creatorsAndResps.responsible.includes(task.responsible.id)) {
      //   acc[task.groupId].departments[departmentID].creatorsAndResps.creator.push(task.createdBy);
      //   acc[task.groupId].departments[departmentID].creatorsAndResps.responsible.push(task.responsible.id);
      // }
      // // acc[task.groupId][departmentID].index = departmentName;
      // acc[task.groupId].title = task.group.name;
      // acc[task.groupId].id = task.groupId;
      // // acc[task.group.name].push(task);


      return acc;
    }, {});

    Logic.departments = Object.values(filteredTasks);

    //console.log(Object.values(filteredTasks));

  }

  static async updateNullStage(task) {
    let projectArrays = Object.values(Logic.allStages).filter(stage => stage.ENTITY_ID == task.groupId); //Фильтрую общий список всех стадий, беру стадии равные Стадиям проекта задачи
    console.log(Logic.allStages, projectArrays, task)

    let initialStageId;
    if (task.parentId != null) { //Если задача является подзадачей
      initialStageId = projectArrays[1].ID //Id второй стадии проекта задачи (вторая стадия -- бэклог). Все подзадачи в бэклог попадают по умолчанию

    } else {

      initialStageId = projectArrays[0].ID //Любая новая задача, которая не является подзадачей попададает в первый колодец
    }


    task.stageId = initialStageId;

    let params = {
      "taskId": task.id,
      'fields': { STAGE_ID: initialStageId }
    }

    let tasks = await app.bitrixHook(params, "https://dstural24.ru/rest/830/l7bann8u7zjtvy8v/tasks.task.update.json");
  }

  // static async updateNullStage(task) {
  //   let projectArrays = Object.values(Logic.allStages).filter(stage => stage.ENTITY_ID == task.groupId); //Фильтрую общий список всех стадий, беру стадии равные Стадиям проекта задачи
  //   console.log(Logic.allStages, projectArrays)
  //   let secondStageId = projectArrays[1].ID //Id первой стадии проекта задачи

  //   task.stageId = secondStageId;




  //   let params = {
  //     "taskId": task.id,
  //     'fields': { STAGE_ID: secondStageId }
  //   }

  //   // let tasks = await app.bitrixHook(params, "https://dstural24.ru/rest/830/l7bann8u7zjtvy8v/tasks.task.update.json");
  // }


  static async updateFinishedStage(task, upView) {

    let projectArrays = Object.values(Logic.allStages).filter(stage => stage.ENTITY_ID == task.groupId); //Стадии проекта
    let lastStageId = projectArrays[projectArrays.length - 1].ID //Id последней стадии проекта
    let params = {
      "taskId": task.id,
      'fields': { STAGE_ID: lastStageId }
    }

    task.stageId = lastStageId;

    let tasks = await app.bitrixHook(params, "https://dstural24.ru/rest/830/l7bann8u7zjtvy8v/tasks.task.update.json");
  }

  static async downViewStagesFilter() {

    let stages = Object.values(Elements.stages);

    Object.values(Logic.departments).forEach(department => {
      department.m = [];

      department.maxStageLength = []; //Максимальная длина стадии проекта


      Object.values(department.projects).forEach(project => {
        department.maxStageLength.push(project.tasks.length);
      });

      const reducer = (previousValue, currentValue) => previousValue + currentValue;

      const maxDepartmentTasksCount = department.maxStageLength.reduce(reducer);
      department.maxDepartmentTasksCount = maxDepartmentTasksCount;

      Object.values(department.projects).forEach(project => {

        project.tasks.forEach(task => {


          if (task.stageId == '0') {
            // console.log('TASK', 'task', task); task.stageId = '3112';
            this.updateNullStage(task);
          }//Ошибка Stage0

          if (task.closedBy != null) {
            // console.log('TASK', 'task', task); task.stageId = '3143';
            this.updateFinishedStage(task, Logic.upView);
          }
          //Ошибка Stage0


          let stageTitle = this.allStages[task.stageId].TITLE;
          task.stageTitle = stageTitle;


          if (!project.id) {
            project.id = task.groupId;
          }

          if (!project.filteredStages) {
            project.filteredStages = [];
          }



          if (!project.filteredStages[task.stageTitle]) {
            stages.forEach((stage) => {

              if (!project.filteredStages[stage.TITLE]) {
                project.filteredStages[stage.TITLE] = [];
                // department.filteredStages[stage.TITLE].title = stage.TITLE
              }
            })
            project.filteredStages[task.stageTitle] = [];

          }


          project.filteredStages[task.stageTitle].push(task);

          // console.log(department);
        });



        project.maxStageLength = []; //Максимальная длина стадии проекта

        console.log(project.filteredStages);


        Object.values(project.filteredStages).forEach(stageTasks => {

          project.maxStageLength.push(stageTasks.length);
        });

        const maxProjectTasksCount = Math.max.apply(null, department.maxStageLength);
        const minProjectTasksCount = Math.min.apply(null, department.maxStageLength);
        const maxProjectStageTasksCount = Math.max.apply(null, project.maxStageLength);

        department.maxProjectTasksCount = maxProjectTasksCount;
        department.m.push(maxProjectTasksCount);

        project.maxProjectsStageTasksCount = maxProjectStageTasksCount;
        department.sumOfProjectsLengths += maxProjectStageTasksCount;



        department.maxDepartmentTasksCount = maxProjectTasksCount;
        department.minDepartmentTasksCount = minProjectTasksCount;


      })

      const m = department.m.reduce(reducer);
      department.maxC = m;

      // let t = app.sortObjectByName(project.departments);
      let newValues = Object.values(department.projects).sort((a, b) => {
        var nameA = a.title.toLowerCase(), nameB = b.title.toLowerCase()
        if (nameA < nameB) //сортируем строки по возрастанию
          return -1
        if (nameA > nameB)
          return 1
        return 0 // Никакой сортировки
      });

      department.projects = newValues;

      console.log(newValues);

      // console.log(project.departments);


      // let result = 

    });

    // Math.max.apply(null, [1,3,5,-1,8,0])

  }



  static async upViewStagesFilter() {

    console.log(Elements.stages);
    let stages = Object.values(Elements.stages);

    Object.values(Logic.projects).forEach(project => {
      project.m = [];

      project.maxStageLength = []; //Максимальная длина стадии проекта


      Object.values(project.departments).forEach(department => {
        project.maxStageLength.push(department.tasks.length);
      });

      const reducer = (previousValue, currentValue) => previousValue + currentValue;

      const maxProjectTasksCount = project.maxStageLength.reduce(reducer);
      project.maxProjectTasksCount = maxProjectTasksCount;

      Object.values(project.departments).forEach(department => {

        department.tasks.forEach(task => {


          if (task.stageId == '0' || task.stageId == '1') {
            // console.log('TASK', 'task', task); task.stageId = '3112';
            Logic.updateNullStage(task);
          }//Ошибка Stage0

          if (task.closedBy != null) {
            // console.log('TASK', 'task', task); task.stageId = '3143';
            Logic.updateFinishedStage(task, Logic.upView);
          }
          //Ошибка Stage0

          console.log(Logic.allStages[task.stageId], task.stageId)
          let stageTitle = Logic.allStages[task.stageId].TITLE;
          task.stageTitle = stageTitle;


          if (!department.id) {
            department.id = task.user.department.ID;
          }

          if (!department.filteredStages) {
            department.filteredStages = [];
          }



          if (!department.filteredStages[task.stageTitle]) {
            stages.forEach((stage) => {

              if (!department.filteredStages[stage.TITLE]) {
                department.filteredStages[stage.TITLE] = [];
                // department.filteredStages[stage.TITLE].title = stage.TITLE
              }
            })
            department.filteredStages[task.stageTitle] = [];



          }


          department.filteredStages[task.stageTitle].push(task);

          // console.log(department);
        });



        department.maxStageLength = []; //Максимальная длина стадии проекта

        console.log(department.filteredStages);


        Object.values(department.filteredStages).forEach(stageTasks => {

          department.maxStageLength.push(stageTasks.length);
        });

        const maxDepartmentTasksCount = Math.max.apply(null, department.maxStageLength);
        department.maxDepartmentTasksCount = maxDepartmentTasksCount;
        project.m.push(maxDepartmentTasksCount);

      })

      const m = project.m.reduce(reducer);
      project.maxC = m;



      // let t = app.sortObjectByName(project.departments);
      let newValues = Object.values(project.departments).sort((a, b) => {
        var nameA = a.title.toLowerCase(), nameB = b.title.toLowerCase()
        if (nameA < nameB) //сортируем строки по возрастанию
          return -1
        if (nameA > nameB)
          return 1
        return 0 // Никакой сортировки
      });

      project.departments = newValues;

      console.log(newValues);

      // console.log(project.departments);


      // let result = 

    });

    // Math.max.apply(null, [1,3,5,-1,8,0])

  }

  static async downViewFilter() {
    const filteredTasks = Logic.taskList.reduce((acc, task) => {
      // Group initialization
      if (!acc[task.user.department[0].NAME]) {
        acc[task.user.department[0].NAME] = [];
      }

      // Grouping
      acc[task.user.department[0].NAME].push(task);

      return acc;
    }, {});

    Logic.filteredTasks = filteredTasks;
  }



  static async filterByStages() {
    const filteredTasks = Logic.taskList.reduce((acc, task) => {
      // Group initialization
      console.log(this.stages, task.stageId);

      let stageTitle = this.stages[task.stageId].TITLE;
      task.stageTitle = [];
      task.stageTitle.push(stageTitle);


      if (!acc[task.stageTitle[0]]) {
        acc[task.stageTitle[0]] = [];
      }

      acc[task.stageTitle[0]].push(task);

      //  console.log(this.stages[task.stageId].TITLE);

      // Grouping
      // acc[task.stageTitle].push(stageTitle);

      return acc;
    }, {});

    Logic.final = filteredTasks;
    console.log(filteredTasks);
  }



  static async addDepSigns() {
    let divConnectedProjectCheckbox = document.createElement('div'); //Блок отделов
    divConnectedProjectCheckbox.classList.add('department-signs');
    // divStage.style.height(this.main.style.height+'40px');
    divConnectedProjectCheckbox.setAttribute('id', 'department-signs');
    Elements.main.appendChild(divConnectedProjectCheckbox);
  }

  static async addProjectSigns() {
    let divProjectSigns = document.createElement('div'); //Блок проектов
    divProjectSigns.classList.add('project-signs');
    // divStage.style.height(this.main.style.height+'40px');
    divProjectSigns.setAttribute('id', 'project-signs');
    Elements.main.appendChild(divProjectSigns);
  }

  static async printAllStages() { //Отрисовка вёрстки канбана: колонки и названия колодцев

    // this.main.style.height();

    let divStages = document.createElement('div'); //Название колодца
    divStages.classList.add('stages');
    divStages.setAttribute('id', 'stages');
    Elements.main.appendChild(divStages);


    let i = 0;
    for (const [key, stage] of Object.entries(Elements.stages)) {
      // console.log(key, stage);


      let svgStageTriangle = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="32" viewBox="0 0 13 32"><path fill="#${stage.COLOR}" fill-opacity="1" d="M0 0h3c2.8 0 4 3 4 3l6 13-6 13s-1.06 3-4 3H0V0z"/></svg>`
      let divSvgStageTriangle = document.createElement('div'); //Колонка
      divSvgStageTriangle.classList.add('svgStageTriangle');
      divSvgStageTriangle.innerHTML += svgStageTriangle;

      let divStage = document.createElement('div'); //Колонка
      divStage.classList.add('stage');
      // divStage.style.height(this.main.style.height+'40px');
      divStage.setAttribute('id', 'stage' + i);
      divStages.appendChild(divStage);


      let divStageName = document.createElement('div'); //Название колодца
      divStageName.classList.add('stageName');
      divStageName.setAttribute('id', 'stage-name' + i);
      divStageName.style.background = '#' + stage.COLOR;
      divStageName.textContent = stage.TITLE;



      let divStageSign = document.createElement('div'); //Название колодца
      divStageSign.classList.add('stageSign');

      divStage.appendChild(divStageSign);
      divStageSign.appendChild(divStageName);

      divStageSign.appendChild(divSvgStageTriangle);

      // divStage.appendChild(divStageTriangle);

      let divTaskList = document.createElement('div'); //Название колодца
      divTaskList.classList.add('stageTaskList');
      divTaskList.setAttribute('id', 'stage-tasklist' + i);
      divStage.appendChild(divTaskList);

      i++;
    }



  }


  static async putStagesTitles(params) {
    console.log(params)
    let stageColumn = await app.bitrixHook(params, "https://dstural24.ru/rest/830/l7bann8u7zjtvy8v/task.stages.get");
    console.log(stageColumn);
    Logic.allStages = Object.assign(Logic.allStages, stageColumn);
    // Logic.allStagess.push(depName);
    // console.log(Logic.allStages);
  }



  static async setStagesTitles() {
    await Promise.all(Logic.taskList.map(function (task, i) { //Для всех задач
      return new Promise(function (resolve) {
        let params = { "entityId": task.groupId, "isAdmin": true };

        resolve(Logic.putStagesTitles(params));

      }.bind(Logic))
    }.bind(Logic)));
  }


  static async putUsers(params, task) {
    let user = await app.bitrixHook(params, "https://dstural24.ru/rest/830/l7bann8u7zjtvy8v/user.get.json");
    task.user = {};
    task.user.info = user[0]; //Подробная информация по пользователю записывается в задачу
    // console.log(user);
    return user;
  }


  static async setUsers() {
    // params = {"id": arr.tasks[0].responsible.id };
    console.log(Logic.taskList);

    await Promise.all(Logic.taskList.map(function (task, i) { //Для всех задач
      return new Promise(function (resolve) {
        let params = { "id": task.responsible.id };
        resolve(Logic.putUsers(params, task));

      }.bind(Logic))
    }.bind(Logic)));


    // this.arr = [].concat.apply([], this.arr)

  }


  static async putDeps(params, task) {
    let depName = await app.bitrixHook(params, "https://dstural24.ru/rest/830/l7bann8u7zjtvy8v/department.get.json");
    task.user.department = depName[0];
    // task.user.dep = '123';
    // console.log(depName);
  }

  static async setDeps() {

    await Promise.all(Logic.taskList.map(function (task, i) { //Для всех задач
      return new Promise(function (resolve) {
        let params = { "id": task.user.info.UF_DEPARTMENT[0] };

        resolve(Logic.putDeps(params, task));

      }.bind(Logic))
    }.bind(Logic)));

  }





  router() {
    window.onclick = function (event) {
      event = event || window.event;
      var target = event.target || event.srcElement;

      console.log(target);
    }

    this.router();
  }

  static async getAllMyTasks() {



    // console.log(GIds);
    let params = {
      filter: {
        "GROUP_ID": Logic.finalConnected,
        "RESPONSIBLE_ID": User.id
      }, //Массив групп
    }


    let tasks = await app.bitrixHook(params, "https://dstural24.ru/rest/830/l7bann8u7zjtvy8v/tasks.task.list.json");
    console.log(tasks);
    console.log(tasks.total);


    tasks = tasks.tasks;//


    Logic.taskList = tasks;
  }

  static async getAllUpViewTasks() {


    // console.log(GIds);
    let params = {
      filter: {
        "GROUP_ID": Logic.finalConnected,
      }, //Массив групп
    }

    let tasks = await app.bitrixHook(params, "https://dstural24.ru/rest/830/l7bann8u7zjtvy8v/tasks.task.list.json");
    console.log(tasks);
    console.log(tasks.total);


    tasks = tasks.tasks;//


    Logic.taskList = tasks;
  }


  static async getAllDefaultTasks() {

    // alert(Logic.finalConnected)
    console.log(Logic.finalConnected)

    // GIds.pop();
    let params = {
      filter: {
        "GROUP_ID": Logic.finalConnected,
      }, //Массив групп
      start:1
    }

    let tasks = await app.bitrixHook(params, "https://dstural24.ru/rest/830/l7bann8u7zjtvy8v/tasks.task.list.json");
    console.log(tasks);
    console.log(tasks.total);

    tasks = tasks.tasks;//

    Logic.taskList = tasks;
  }

  static async loadDefaultTasks() {
    this.view = 'defaultTasks';
    this.viewType = 'defaultViewType';

    let myTasksButton = document.getElementById("list-type-my");
    let othersTasksButton = document.getElementById("list-type-all");
    let viewTypeDepartments = document.getElementById("view-type-departments");
    let viewTypeProjects = document.getElementById("view-type-projects");


    // othersTasksButton.classList.add("list-type-active");
    // viewTypeDepartments.classList.add("view-type-active");


    Draw.draw();

    console.log(document.getElementById('list-type-all'));

  }



  static async addConnectedGroups() {
    console.log(this);

    let that = this;
    let top = document.getElementById('top');
    let main = document.getElementById('main');

    let groups = document.createElement('ul'); //
    groups.classList.add('groups');

    let cross = document.createElement('a'); //
    cross.innerHTML = "&#10006;";
    cross.onclick = function () {
      // let groups = document.getElementsByClassName('groups')[0];
      groups.style.display = "none";
      main.classList.remove('black');
    }

    cross.classList.add('groups-cross');
    // let GIds = JSON.parse(localStorage.test);

    let addButton = document.createElement('a'); //
    addButton.innerHTML = "Подключить выбранные";
    addButton.classList.add('add-chosen-groups');
    addButton.onclick = Click.addButtonClick.bind(this, groups);

    groups.appendChild(cross);
    groups.appendChild(addButton);

    console.log(Elements.additionalBody);

    Elements.additionalBody.append(groups);

    let params = {
      "FILTER": {
        '%NAME': 'Канбан',
        // 'opened': 'true',
      }
    }

    let group = await app.bitrixHook(params, "https://dstural24.ru/rest/830/a31yf1u7rzxrr5jz/sonet_group.get.json");
    console.log(group);


    // group.forEach(element => {
    for (const element of group) {
      console.log(element, User.userInfo())
      let divConnectedProjectCheckboxWrap = document.createElement('div');
      divConnectedProjectCheckboxWrap.classList.add('group-id-wrap');

      // let usersGroupsArr = await User.userInfo();//.connected_groups_ids.split(',');

      let usersGroupsArr = Logic.finalConnected;


      let divConnectedProjectCheckbox = document.createElement('input'); //Чекбокс
      divConnectedProjectCheckbox.classList.add('groups-el');
      divConnectedProjectCheckbox.setAttribute("data-group-id", element.ID)
      divConnectedProjectCheckbox.setAttribute("id", 'group' + element.ID)
      divConnectedProjectCheckbox.setAttribute("type", 'checkbox')

      // divConnectedProjectCheckbox.setAttribute("onclick", '')
      if (usersGroupsArr.includes(element.ID)) divConnectedProjectCheckbox.checked = true;

      let divConnectedProjectCheckboxLabel = document.createElement('label'); //Колонка

      divConnectedProjectCheckboxLabel.textContent = element.NAME;
      divConnectedProjectCheckboxLabel.setAttribute('for', 'group' + element.ID);
      divConnectedProjectCheckboxWrap.append(divConnectedProjectCheckbox);

      divConnectedProjectCheckboxWrap.append(divConnectedProjectCheckboxLabel);
      groups.append(divConnectedProjectCheckboxWrap);

    };

    let groupsButton = document.getElementsByClassName('set-connected-groups-button')[0];




    groupsButton.onclick = function () {
      let groups = document.getElementsByClassName('groups')[0];
      groups.style.display = "block";
      main.classList.add('black');
    };


    // let addTaskButton = document.createElement('a'); //кнопка добавления задачи
    // addTaskButton.textContent = 'Добавить задачу';
    // addTaskButton.classList.add('groups-button');
    // addTaskButton.classList.add('top-menu-button');
    // addTaskButton.classList.add('top-a-button');

    // // addTaskButton.setAttribute("onclick","return location.href = '/company/personal/user/830/tasks/task/edit/0/' ");
    // addTaskButton.setAttribute('href', "/company/personal/user/830/tasks/task/edit/0/") //!!!




    // let myTasksButton = document.createElement('button');
    // myTasksButton.textContent = "Мои задачи";
    // myTasksButton.classList.add('groups-button');
    // myTasksButton.classList.add('top-menu-button');
    // myTasksButton.classList.add('list-type');
    // myTasksButton.setAttribute("id", 'list-type-my');

    // if(this.view == 'myTasks') {
    //   myTasksButton.classList.add("");
    // }

    // myTasksButton.setAttribute("id",'top-menu-button');
    // myTasksButton.onclick = Click.myTasksButtonClick.bind(this, myTasksButton);



    // let othersTasksButton = document.createElement('button');
    // othersTasksButton.textContent = "Все задачи";
    // othersTasksButton.classList.add('groups-button');
    // othersTasksButton.classList.add('top-menu-button');
    // othersTasksButton.classList.add('list-type'); //подсветка  при нажатии
    // othersTasksButton.setAttribute("id", 'list-type-all');


    // // myTasksButton.setAttribute("id",'top-menu-button');
    // othersTasksButton.onclick = Click.othersTasksButtonClick.bind(this, othersTasksButton);

    let departmentsViewTypeButton = document.createElement('button');
    departmentsViewTypeButton.textContent = "Отделы в проектах";
    departmentsViewTypeButton.classList.add('groups-button');
    departmentsViewTypeButton.classList.add('top-menu-button');
    departmentsViewTypeButton.classList.add('view-type'); //подсветка  при нажатии
    departmentsViewTypeButton.setAttribute("id", 'view-type-departments');

    // myTasksButton.setAttribute("id",'top-menu-button');
    departmentsViewTypeButton.onclick = Click.departmentsViewTypeClick.bind(this, departmentsViewTypeButton);

    let tasksSelector = document.createElement('div');
    let tasksSelectorText = document.createElement('span');
    tasksSelectorText.textContent = "Все задачи";
    tasksSelector.append(tasksSelectorText);
    tasksSelector.classList.add('selector');
    tasksSelector.classList.add('task-selector');
    tasksSelectorText.classList.add('selector-text');

    tasksSelector.onclick = Click.tasksSelectorClick.bind(this, tasksSelector, tasksSelectorText);


    let tasksSelectorHandle = document.createElement('div');
    tasksSelectorHandle.classList.add('selector-handle');
    tasksSelectorHandle.classList.add('task-selector-handle');


    tasksSelector.append(tasksSelectorHandle);

    let projectsViewTypeButton = document.createElement('button');
    projectsViewTypeButton.textContent = "Проекты в отделах";
    projectsViewTypeButton.classList.add('groups-button');
    projectsViewTypeButton.classList.add('top-menu-button');
    projectsViewTypeButton.classList.add('view-type'); //подсветка  при нажатии
    projectsViewTypeButton.setAttribute("id", 'view-type-projects');

    let viewTypeSelector = document.createElement('div');
    viewTypeSelector.classList.add('selector');
    viewTypeSelector.classList.add('view-type-selector');

    let viewTypeSelectorText = document.createElement('span');

    viewTypeSelectorText.classList.add('selector-text');


    viewTypeSelectorText.textContent = "Отделы в проектах";
    viewTypeSelector.append(viewTypeSelectorText);

    let viewTypeSelectorHandle = document.createElement('div');
    viewTypeSelectorHandle.classList.add('selector-handle');
    viewTypeSelectorHandle.classList.add('view-type-selector-handle');

    viewTypeSelector.append(viewTypeSelectorHandle);


    viewTypeSelector.onclick = Click.viewTypeSelectorClick.bind(this, viewTypeSelector, viewTypeSelectorText);

    projectsViewTypeButton.classList.add('top-menu-button');
    projectsViewTypeButton.classList.add('view-type'); //подсветка  при нажатии
    projectsViewTypeButton.setAttribute("id", 'view-type-projects');



    // myTasksButton.setAttribute("id",'top-menu-button');
    projectsViewTypeButton.onclick = Click.projectsViewTypeClick.bind(this, projectsViewTypeButton);

    // top.


    // top.append(groupsButton);
    // top.append(addTaskButton);
    // top.append(tasksSelector);
    // top.append(viewTypeSelector);
    // top.append(othersTasksButton);
    // top.append(myTasksButton);
    // top.append(departmentsViewTypeButton);
    // top.append(projectsViewTypeButton);

  }

  static async getAllStages() {
    let params = {
      "entityId": 209,
      "isAdmin": true //Типовая группа с колонками
    }

    Elements.stages = await app.bitrixHook(params, "https://dstural24.ru/rest/830/l7bann8u7zjtvy8v/task.stages.get.json");
  }




}

class Draw {

  static list = {
    "defaultTasks": Logic.getAllDefaultTasks,
    "top": Logic.getAllDefaultTasks,
  }

  static async draw() {

    Logic.loading = true;


    // document.getElementById("view-type-projects").click(e=> {
    //   alert(111)
    //   e.preventDefault();
    // }) 

    //upView.main.innerHTML = "";
    Elements.main.innerHTML = "";
    Elements.main.innerHTML = `

    <div id="loader" class="loader">

  <div class="lds-grid">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>

  <div style="display: inline-block; vertical-align: middle;" class="loader-titles">
    <div class="row"><i> Идёт загрузка задач</i></div>
    <div class="row">
     
    </div>
  </div>
</div>`;

    Elements.stageTaskLists.innerHTML = "";
    console.log(Elements.stageTaskLists);

    console.log(Logic.UpView);

    if (Logic.view == "defaultTasks" || Logic.view == "top") {
      // await Logic.getAllDefaultTasks(); //Получаем список всех задач по всем подключенным группам
      await Draw.list[Logic.view]();
      console.log();
    }

    if (Logic.view == "othersTasks") {


      await Logic.getAllUpViewTasks(); //Все задачи
    }

    if (Logic.view == "myTasks") {
      await Logic.getAllMyTasks(); //Мои задачи
    }

    Logic.getAddiotionalTaskInfo();


    await Logic.setUsers();//Чтобы получить подразделение(отедл) по каждой задаче, необходимо для начала получить пользователей
    await Logic.setDeps(); //Записываем подразделение в задачу
    await Logic.setStagesTitles(); //Все айдишники колонок со всех групп
    await Logic.getAllStages(); //Получаем набор названий колонок с типовой группы
    await Logic.addProjectSigns(); //контейнер проектов
    await Logic.addDepSigns(); //Ярлыки подразделений
    await Logic.printAllStages(); //Отрисовываем полученные колонки

    if (Logic.viewType == "defaultViewType" || Logic.viewType == "departmentsViewType") {
      await Logic.upViewProjectFilter();
      await Logic.upViewStagesFilter();
      await Logic.drawUpViewKanban(app);

    }

    if (Logic.viewType == "projectsViewType") {
      await Logic.downViewProjectFilter();
      await Logic.downViewStagesFilter();
      await Logic.drawDownViewKanban();
    }

    document.getElementById("loader").style.display = "none";




    //Дальше рисуем в зависимости от вида

  }

  constructor() {
    this.main = document.getElementById('main');
  }






}

application.prototype.run = async function () {















  let tooltipElem;

  document.onmouseover = function (event) {
    let target = event.target;

    // если у нас есть подсказка...
    let tooltipHtml = target.dataset.tooltip;
    if (!tooltipHtml) return;

    // ...создадим элемент для подсказки

    tooltipElem = document.createElement('div');
    tooltipElem.className = 'tooltip';
    tooltipElem.innerHTML = tooltipHtml;
    document.body.append(tooltipElem);

    // спозиционируем его сверху от аннотируемого элемента (top-center)
    let coords = target.getBoundingClientRect();

    let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
    if (left < 0) left = 0; // не заезжать за левый край окна

    let top = coords.top - tooltipElem.offsetHeight - 5;
    top += 50;
    if (top < 0) { // если подсказка не помещается сверху, то отображать её снизу
      top = coords.top + target.offsetHeight + 5;
      top -= 50;
    }

    tooltipElem.style.left = left + 'px';
    tooltipElem.style.top = top + 'px';
  };

  document.onmouseout = function (e) {

    if (tooltipElem) {
      tooltipElem.remove();
      tooltipElem = null;
    }

  };

  //Объявление классов
  let logic = new Logic; //Основная логика приложения

  // BX.addCustomEvent("SidePanel.Slider:OnTaskAdd", function (event) { //Обновление страницы по событию закрытия слайдера(модального окна выезжающего влево)
  //   // if (event.getSlider().getUrl() === "calendar:settings") //для глобальных обработчиков проверяем свой слайдер
  //   // {
  //   //    event.denyAction();
  //   // }
  //   Draw.draw();

  // });

  // console.log(await User.);
  await Elements.redesignBitrixDOM();
  //Записываем впервые зашедшего пользователя
  await User.userInfo(); //Получаем данные о пользователе из базы
  await Logic.setFinalConnected();


  await Logic.addConnectedGroups(); //Для подключения проекта список проектов, верхнее меню кнопок
  await Logic.loadDefaultTasks(); //Загрузка последнего сохраненного списка проектов


  // if (BX.SidePanel.Instance.isOpen()) {
  //   alert("слайдер открыт");
  // } else {
  //   alert("слайдер закрыт");

  // }




  // await app.getMyTasks(); //Получить все мои группы

  console.log(logic);

  //   document.body.innerHTML +=
  //   `
  // <div class='selector'>
  //   <div class='selector-handle'>
  //   </div>
  //   </div>
  // </div>

  // `;

  // (function () {
  //   $(function () {
  //     return $('.selector').on('click', function () {
  //       if ($(this).hasClass('on')) {
  //         return $(this).removeClass('on');
  //       } else {
  //         return $(this).addClass('on');
  //       }
  //     });
  //   });

  // }).call(this);



  //app.animate();

  // await upView.filterByStages();

  // await upView.drawKanban();

  // await upView.downViewFilter();






}

