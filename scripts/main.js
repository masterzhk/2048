const digits = new Array(16);
const gameZone2048Items = new Array(16);
const gameZone2048 = document.querySelector("#game-zone-2048");
const gameZoneControlNewGameBtn = document.querySelector("#game-zone-control-new-game");

let step = 0;
const gameZonePanelValueStep = document.querySelector("#game-zone-panel-value-step");

let winDigit = 0;

let mousedownEvent = null;

init2048();

function init2048() {
    setWinDigit(parseInt(localStorage.getItem("winDigit")));
    setStep(parseInt(localStorage.getItem("step")));

    for (let index = 0; index < 16; ++index) {
        gameZone2048Items[index] = document.querySelector(`#game-zone-2048-item-${index}`);
        setDigit(index, parseInt(localStorage.getItem(`digits.${index}`)));
    }

    gameZone2048.addEventListener("mousedown", onMouseDown);
    gameZone2048.addEventListener("mouseup", onMouseUp);
    gameZone2048.addEventListener("mouseleave", onMouseLeave);

    window.addEventListener("resize", onWindowResize);
    onWindowResize();

    gameZoneControlNewGameBtn.addEventListener("click", onGameZoneControlNewGameBtnClick);
}


function newGame() {
    setWinDigit(2048);
    setStep(0);

    for (let index = 0; index < 16; ++index) {
        setDigit(index, NaN);
    }

    addNewDigit();
}

function addNewDigit() {
    const nanCount = digits.filter(i => isNaN(i)).length;
    if (nanCount > 0) {
        let newDigitIndex = floorRandom(0, nanCount);
        for (let index = 0; index < 16; ++index) {
            if (isNaN(digits[index])) {
                if (newDigitIndex-- <= 0) {
                    setDigit(index, 2);
                    break;
                }
            }
        }
    }
    else {
        alert("输了呀？怎么回事？出Bug了？");
    }
}

function detectWinningOrLosing() {
    if (digits.some(i => i === winDigit)) {
        setTimeout(() => {
            confirm(`恭喜！用了${step}步合成${winDigit}！`);
            setWinDigit(doubleDigit(winDigit));
            if (winDigit === 0) {
                confirm("祝君好运！");
                setWinDigit(1);// 再也赢不了啦！
            }
        }, 0);
    }
    else if (digits.every(i => !isNaN(i))) {

    }
}

function doubleDigit(digit) {
    let result = digit * 2;
    if (result > 8192) {
        result = 0;
    }
    return result;
}

function setWinDigit(value) {
    winDigit = value;
    localStorage.setItem("winDigit", winDigit);
}

function setStep(value) {
    step = value;

    gameZonePanelValueStep.textContent = step;

    localStorage.setItem("step", step);
}

function setDigit(index, value) {
    digits[index] = value;

    gameZone2048Items[index].textContent = isNaN(digits[index]) ? "" : digits[index];
    gameZone2048Items[index].parentNode.className = `game-zone-2048-item game-zone-2048-item-${digits[index]}`;

    localStorage.setItem(`digits.${index}`, digits[index]);
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
            if (absXDiff > e.currentTarget.clientWidth / 5) {
                if (xDiff > 0) {
                    toRight();
                } else {
                    toLeft();
                }
            }
        }
        else {
            if (absYDiff > e.currentTarget.clientHeight / 5) {
                if (yDiff > 0) {
                    toDwon();
                } else {
                    toUp();
                }
            }
        }
    }
}

function onWindowResize() {
    // 延时调整字体大小，不然会偶尔计算出错误的大小
    setTimeout(() => {
        const width = window.getComputedStyle(document.querySelector(".game-zone-2048-item")).width;
        const result = /^(.+?)([A-Za-z]*)$/.exec(width);
        if (result.length === 3) {
            gameZone2048.style.fontSize = `${Math.floor(0.4 * Number(result[1]))}${result[2]}`;
        }
    }, 0);
}

function onGameZoneControlNewGameBtnClick(e) {
    if (isNaN(step) || step <= 10 || confirm("确定重头再来吗？")) {
        newGame();
    }
}

function floorRandom(min = 0, max = 16) {
    return Math.floor(min + Math.random() * (max - min));
}

function merge(indexBase, step) {
    let merged = false;

    let indexFirst = indexBase;
    for (let index = 1; index < 4; ++index) {
        const indexSecond = indexBase + index * step;
        if (isNaN(digits[indexSecond])) {
            continue;
        } else {
            if (isNaN(digits[indexFirst])) {
                setDigit(indexFirst, digits[indexSecond]);
                setDigit(indexSecond, NaN);
                merged = true;
            } else if (digits[indexFirst] === digits[indexSecond]) {
                setDigit(indexFirst, doubleDigit(digits[indexFirst]));
                setDigit(indexSecond, NaN);
                indexFirst += step;
                merged = true;
            } else {
                indexFirst += step;
                setDigit(indexFirst, digits[indexSecond]);
                if (indexFirst !== indexSecond) {
                    setDigit(indexSecond, NaN);
                    merged = true;
                }
            }
        }
    }
    return merged;
}

function afterMerge() {
    setStep(++step);
    addNewDigit();
    detectWinningOrLosing();
}

function toLeft() {
    let merged = false;
    for (let row = 0; row < 4; ++row) {
        merged = merge(row * 4, 1) || merged;
    }

    if (merged) {
        afterMerge();
    }
}

function toRight() {
    let merged = false;
    for (let row = 0; row < 4; ++row) {
        merged = merge(row * 4 + 3, -1) || merged;
    }

    if (merged) {
        afterMerge();
    }
}

function toUp() {
    let merged = false;
    for (let col = 0; col < 4; ++col) {
        merged = merge(col, 4) || merged;
    }

    if (merged) {
        afterMerge();
    }
}

function toDwon() {
    let merged = false;
    for (let col = 0; col < 4; ++col) {
        merged = merge(12 + col, -4) || merged;
    }

    if (merged) {
        afterMerge();
    }
}