"use strict";
var A02_Eventinspector;
(function (A02_Eventinspector) {
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        document.addEventListener("mousemove", setInfoBox);
        document.addEventListener("click", logInfo);
        document.addEventListener("keyup", logInfo);
        document.getElementsByTagName("body")[0].addEventListener("click", logInfo);
        document.getElementsByTagName("body")[0].addEventListener("keyup", logInfo);
        let divs = document.querySelectorAll("div");
        for (let i = 0; i < dispatchEvent.length; i++) {
            divs[i].addEventListener("keyup", logInfo);
            divs[i].addEventListener("click", logInfo);
        }
    }
    // Funktion die beim Bewegen der Maus aufgerufen wird.
    function setInfoBox(_event) {
        // Cursorwert der auf das span-Element übergeben wird, damit es immer aktuell ist.
        let x = _event.pageX + 10;
        let y = _event.pageY + 10;
        // <HTMLElement> kann auch Null sein, aber wenn wir wissen, dass es vorhanden ist - passt es!
        let mouseCursorSpan = document.querySelector("span");
        // Positionierung des Span-Elements
        mouseCursorSpan.style.left = x + "px";
        mouseCursorSpan.style.top = y + "px";
    }
    // Funktion, die beim Klicken der Maus und der Tastatur aufgerufen wird.
    function logInfo(_event) {
        console.log("Event started: " + _event.type);
        console.log("Target: " + _event.target);
        console.log("CurrentTarget: " + _event.currentTarget);
        console.log("Event-Phase = " + _event.eventPhase);
        console.log("Path: " + _event.composedPath());
        console.log(_event);
    }
})(A02_Eventinspector || (A02_Eventinspector = {}));
//# sourceMappingURL=eventinspector1.js.map