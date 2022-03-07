let mousedownEvent = null;
let digits = [];
let digitDivs = [];
init2048();

function init2048() {
    let div2048 = document.createElement("div");
    div2048.className = "gamezone";
    div2048.id = "gamezone-2048"
    document.body.appendChild(div2048);

    div2048.addEventListener("mousedown", onMouseDown);
    div2048.addEventListener("mouseup", onMouseUp);
    div2048.addEventListener("mouseleave", onMouseLeave);

    for (let i = 1; i <= 16; i++) {
        let divDigit = document.createElement("div");
        divDigit.className = "digit";
        divDigit.id = `digit-${i}`;
        div2048.appendChild(divDigit);

        digitDivs.push(divDigit);
        digits.push(0);
    }

    updateDigit(digits);
}

function onMouseLeave(e) {
    mousedownEvent = null;
}

function onMouseDown(e) {
    e.preventDefault();
    mousedownEvent = e;
}

function onMouseUp(e) {
    if (mousedownEvent) {
        e.preventDefault();

        let xDiff = e.clientX - mousedownEvent.clientX;
        let yDiff = e.clientY - mousedownEvent.clientY;

        let absXDiff = Math.abs(xDiff);
        let absYDiff = Math.abs(yDiff);

        if (absXDiff > absYDiff) {
            if (absXDiff > e.currentTarget.clientWidth / 3) {
                if (xDiff > 0) {
                    console.log("右划");
                } else {
                    console.log("左划");
                }
            }
            else {
                console.log("划动幅度不够");
            }
        }
        else {
            if (absYDiff > e.currentTarget.clientHeight / 3) {
                if (yDiff > 0) {
                    console.log("下划");
                } else {
                    console.log("上划");
                }
            }
            else {
                console.log("划动幅度不够");
            }
        }
    }
}

function updateDigit(values) {
    for (let i = 0; i < 16; ++i) {
        if (values[i] > 0) {
            digitDivs[i].textContent = values[i];
        }
        else {
            digitDivs[i].textContent = "";
        }
    }
}

function toLeft(values) { 
    
}