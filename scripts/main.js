// let digits = [];
// let digitDivs = [];
// init2048();

// function init2048() {
//     let div2048 = document.createElement("div");
//     div2048.className = "gamezone gamezone-2048";
//     div2048.id = "gamezone-2048"
//     document.body.appendChild(div2048);

//     let divControl = document.createElement("div");
//     divControl.className = "gamezone gamezone-control";
//     divControl.id = "gamezone-control"
//     document.body.appendChild(divControl);

//     div2048.addEventListener("mousedown", onMouseDown);
//     div2048.addEventListener("mouseup", onMouseUp);
//     div2048.addEventListener("mouseleave", onMouseLeave);

//     for (let i = 1; i <= 16; i++) {
//         let divDigit = document.createElement("div");
//         div2048.appendChild(divDigit);

//         digitDivs.push(divDigit);
//         digits.push(0);
//     }

//     showDigit(digits);
// }

// let mousedownEvent = null;

// function onMouseLeave(e) {
//     mousedownEvent = null;
// }

// function onMouseDown(e) {
//     e.preventDefault();
//     mousedownEvent = e;
// }

// function onMouseUp(e) {
//     if (mousedownEvent) {
//         e.preventDefault();

//         let xDiff = e.clientX - mousedownEvent.clientX;
//         let yDiff = e.clientY - mousedownEvent.clientY;

//         let absXDiff = Math.abs(xDiff);
//         let absYDiff = Math.abs(yDiff);

//         if (absXDiff > absYDiff) {
//             if (absXDiff > e.currentTarget.clientWidth / 3) {
//                 if (xDiff > 0) {
//                     console.log("右划");
//                     toRight(values);
//                 } else {
//                     console.log("左划");
//                     toLeft(values);
//                 }
//             }
//             else {
//                 console.log("划动幅度不够");
//             }
//         }
//         else {
//             if (absYDiff > e.currentTarget.clientHeight / 3) {
//                 if (yDiff > 0) {
//                     console.log("下划");
//                     toDwon(values);
//                 } else {
//                     console.log("上划");
//                     toUp(values);
//                 }
//             }
//             else {
//                 console.log("划动幅度不够");
//             }
//         }
//     }
// }

// function showDigit(values) {
//     for (let i = 0; i < 16; ++i) {
//         digitDivs[i].textContent = values[i] > 0 ? values[i] : "";
//         digitDivs[i].className = `digit digit-${values[i]}`;
//     }
// }

// function addRandom(values) {
//     let pos0 = [];
//     for (let i = 0; i < 16; ++i) {
//         if (values[i] == 0) {
//             pos0.push(i);
//         }
//     }
//     if (pos0.length > 0) {
//         values[pos0[random(pos0.length)]] = 2;
//     }
// }

// function random(max = 1) {
//     return Math.floor(Math.random() * max);
// }

// function toLeft(values) {

// }

// function toRight(values) {

// }

// function toUp(values) {

// }

// function toDwon(values) {

// }