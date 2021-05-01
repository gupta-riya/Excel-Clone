
let addbtnContainer = document.querySelector(".add_sheet_container");
let sheetList = document.querySelector(".sheets_list");
let firstSheet = document.querySelector(".sheet");

// first default sheet will always be there so explicitly add an event listener to the first sheet
sheetActiveEventHandler(firstSheet);


// clicking on + button will create a new sheet
addbtnContainer.addEventListener("click", function () {
    let sheetsArr = document.querySelectorAll(".sheet");
    let lastSheetElem = sheetsArr[sheetsArr.length - 1];
    let idx = lastSheetElem.getAttribute("sheetIdx");
    idx = Number(idx);
    let newSheet = document.createElement("div");
    newSheet.setAttribute("class", "sheet");
    newSheet.setAttribute("sheetIdx", idx + 1);
    newSheet.innerText = `Sheet ${idx + 2}`;
    sheetList.appendChild(newSheet);

    // add event listener corresponding to the new sheet created
    sheetActiveEventHandler(newSheet);


})

// this function removes and add active class event to the calling sheet
function sheetActiveEventHandler(sheet) {
    sheet.addEventListener("click", function () {
        let sheetsArr = document.querySelectorAll(".sheet");
        sheetsArr.forEach(function (sheet) {
            sheet.classList.remove("active_sheet");
        })
        if (!sheet.classList[1]) {
            sheet.classList.add("active_sheet");
        }
    })
}