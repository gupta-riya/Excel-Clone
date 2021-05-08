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



// new sheet

workSheetDB = [];
function initCurrentSheetDb()
{
    
    // 2-d array -> styling property array
    // cel set
    let sheetDB = [];

    for(let i = 0 ; i < 100 ; i++)
    {
        let row = [];
        for(let j = 0 ; j < 26 ; j++){
        
            let cell = {
                bold:false,
                underline:false,
                italic:false,
                fontFamily: "Arial",
                fontSize:"16",
                fontColor:"#000000",
                bgColor:"#ffffff",
                halign:"left",
                value:""

            }
            row.push(cell);
        }
        sheetDB.push(row);
    }
    workSheetDB.push(sheetDB);

}

//call initially
initCurrentSheetDb();