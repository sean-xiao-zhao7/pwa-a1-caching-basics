var box = document.querySelector(".box");
var button = document.querySelector("button");
let addHomePromptEvent;

button.addEventListener("click", function (event) {
    if (box.classList.contains("visible")) {
        box.classList.remove("visible");
    } else {
        box.classList.add("visible");
    }
});

if (!window.Promise) {
    window.Promise = Promise;
}

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js").then(() => {
        // console.log("Service worker registered.");
    });
}

window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    addHomePromptEvent = event;
    return false;
});
