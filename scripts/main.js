var title,
    text,
    btn,
    list, TASKS;

var savedData = localStorage.getItem("tasks");
if (savedData) {
    try {
        TASKS = JSON.parse(savedData);
    } catch (err) {
        TASKS = [{
            title: "Hozircha Bo'sh... :(",
            mustbedeleted: true
        }];
        save(TASKS);
    }
} else {
    TASKS = [{
        title: "Hozircha Bo'sh... :(",
        mustbedeleted: true
    }];
    save(TASKS);
}


function select(_name = "") {
    return document.querySelector(_name);
}

title = select("#sarlavha");
text = select("#matn");
btn = select("#btn");
list = select("#list");

manipulate();

function addTask(_title, _text) {
    const obj = {
        title: _title,
        text: _text
    };
    TASKS.push(obj);
    save(TASKS);
}


function manipulate() {
    list.innerHTML = "";
    if (TASKS.length == 0) {
        TASKS[1] = {
            title: "Hozircha Bo'sh... :(",
            mustbedeleted: true
        };
    }

    TASKS.forEach((task, ind) => {

        var tel = document.createElement("div");
        tel.dataset.id = ind;
        tel.classList.add("task");
        var tname = document.createElement("div");
        tname.classList.add("taskname");
        var btns = document.createElement("div");
        btns.classList.add("buttons");
        var btnedit = document.createElement("div");
        btnedit.classList.add("taskedit");
        var btndelete = document.createElement("div");
        btndelete.classList.add("taskdelete");
        tname.textContent = task.title;
        btndelete.textContent = "❌";
        btnedit.textContent = "✏️";
        btns.appendChild(btnedit);
        btns.appendChild(btndelete);
        tel.appendChild(tname);
        tel.appendChild(btns);
        list.appendChild(tel);
        tname.addEventListener("click", function () {
            duDialog(task.title, task.text).show();
        }, false);
        btndelete.addEventListener("click", function (ev) {
            TASKS.splice(ev.target.parentElement.parentElement.dataset.id, 1);
            save(TASKS);
            manipulate();
        });
        btnedit.addEventListener("click", function (ev) {
            var tc = TASKS[ev.target.parentElement.parentElement.dataset.id];
            if (tc) {
                btn.textContent = "O'zgartirish";
                title.value = tc.title;
                text.value = tc.text;
                btn.onclick = function () {
                    if (title.value.length > 2 && text.value.length > 2) {
                        design(".sub-title", "color", "#555");
                        design(["#sarlavha", "#matn"], {
                            "box-shadow": "rgba(50, 150, 93, 0.25) 0px 50px 100px -20px, rgba(0, 50, 0, 0.3) 0px 30px 60px -30px, rgba(10, 127, 64, 0.35) 0px -2px 6px 0px inset"
                        });
                        TASKS[ev.target.parentElement.parentElement.dataset.id].title = title.value;
                        TASKS[ev.target.parentElement.parentElement.dataset.id].text = text.value;
                        manipulate();
                        save(TASKS);
                        title.value = "";
                        text.value = "";
                        title.focus();
                        btn.textContent = "Qo'shish";
                        btn.onclick = function () {
                            if (title.value.length > 2 && text.value.length > 2) {
                                design(".sub-title", "color", "#555");
                                design(["#sarlavha", "#matn"], {
                                    "box-shadow": "rgba(50, 150, 93, 0.25) 0px 50px 100px -20px, rgba(0, 50, 0, 0.3) 0px 30px 60px -30px, rgba(10, 127, 64, 0.35) 0px -2px 6px 0px inset"
                                });
                                addTask(title.value, text.value);
                                manipulate();
                                title.value = "";
                                text.value = "";
                                title.focus();
                            } else {
                                design(["#sarlavha", "#matn"], {
                                    "box-shadow": "rgba(250, 50, 93, 0.25) 0px 50px 100px -20px, rgba(120, 0, 0, 0.3) 0px 30px 60px -30px, rgba(230, 37, 24, 0.35) 0px -2px 6px 0px inset"
                                });
                                design(".sub-title", "color", "#e33");
                            }
                        };
                    } else {
                        design(["#sarlavha", "#matn"], {
                            "box-shadow": "rgba(250, 50, 93, 0.25) 0px 50px 100px -20px, rgba(120, 0, 0, 0.3) 0px 30px 60px -30px, rgba(230, 37, 24, 0.35) 0px -2px 6px 0px inset"
                        });
                        design(".sub-title", "color", "#e33");
                    }
                }
            }
            save(TASKS);
            manipulate();
        });
    });

}

function save(_data) {
    localStorage.setItem("tasks", JSON.stringify(_data));
}

btn.onclick = function () {

    if (title.value.length > 2 && text.value.length > 2) {
        design(".sub-title", "color", "#555");
        design(["#sarlavha", "#matn"], {
            "box-shadow": "rgba(50, 150, 93, 0.25) 0px 50px 100px -20px, rgba(0, 50, 0, 0.3) 0px 30px 60px -30px, rgba(10, 127, 64, 0.35) 0px -2px 6px 0px inset"
        });
        addTask(title.value, text.value);
        manipulate();
        title.value = "";
        text.value = "";
        title.focus();
    } else {
        design(["#sarlavha", "#matn"], {
            "box-shadow": "rgba(250, 50, 93, 0.25) 0px 50px 100px -20px, rgba(120, 0, 0, 0.3) 0px 30px 60px -30px, rgba(230, 37, 24, 0.35) 0px -2px 6px 0px inset"
        });
        design(".sub-title", "color", "#e33");
    }
};

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('./sw.js').then(function (registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

var deferredPrompt = null;
var addBtn = select("#install");

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    addBtn.style.display = 'block';

    addBtn.addEventListener('click', (e) => {
        addBtn.style.display = 'none';
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            deferredPrompt = null;
        });
    });
});
