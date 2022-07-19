//Zusammenarbeit mit Dino Mujic & Notizen beim Praktikum

namespace A02_Eventinspector {

    window.addEventListener("load", handleLoad);
    function handleLoad(_event: Event): void {
       document.addEventListener("mousemove", setInfoBox);
       document.addEventListener("click", logInfo);
       document.addEventListener("keyup", logInfo);
       document.getElementsByTagName("body")[0].addEventListener("click", logInfo);
       document.getElementsByTagName("body")[0].addEventListener("keyup", logInfo);
       let divs: NodeListOf<HTMLDivElement> = document.querySelectorAll("div");
        
       for (let i: number = 0; i < dispatchEvent.length; i++) {
            divs[i].addEventListener("keyup", logInfo);
            divs[i].addEventListener("click", logInfo);

        }

    }

    function setInfoBox(_event: MouseEvent): void {

  
        let x: number = _event.pageX + 10;
        let y: number = _event.pageY + 10;

      
        let mouseCursorSpan: HTMLSpanElement = <HTMLElement>document.querySelector("span");

    
        mouseCursorSpan.style.left = x + "px";
        mouseCursorSpan.style.top = y + "px";

    }
    function logInfo(_event: Event): void {
        console.log("Event started: " + _event.type);
        console.log("Target: " + _event.target);
        console.log("CurrentTarget: " + _event.currentTarget);
        console.log("Event-Phase = " + _event.eventPhase);
        console.log("Path: " + _event.composedPath());
        console.log(_event);
        
    }
}