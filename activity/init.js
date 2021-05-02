let topRow = document.querySelector(".top-row");
let str1 = "";
for (let i = 0; i < 26; i++) {
    str1 += ` <div class="col">${String.fromCharCode(65 + i)}</div>`;
}
topRow.innerHTML = str1;

let leftCol = document.querySelector(".left-col");
let str2 = "";
for (let i = 0; i < 100; i++) {
    str2 += `<div class="left-col-box">${i + 1}</div>`;
}
leftCol.innerHTML = str2;




//2d array
// we are adding attribute rid and cid to keep note of row and col number of every cell
let grid = document.querySelector(".grid");
let str3 = "";
for (let i = 0; i < 100; i++) {
    str3 += `<div class = "row">`
    for (let j = 0; j < 26; j++) {
        str3 += `<div class="col" rid = ${i} cid = ${j} contenteditable = "true"></div>`;
    }
    str3 += `</div>`;
}
grid.innerHTML = str3;