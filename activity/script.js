
let addbtnContainer = document.querySelector(".add_sheet_container");
let sheetList = document.querySelector(".sheets_list");
let firstSheet = document.querySelector(".sheet");
let AllCells = document.querySelectorAll(".grid .col");
let addressBar = document.querySelector(".address-box");
let fontfamilyBtn = document.querySelector(".font-family-container");
let BUIBtn = document.querySelectorAll(".buiBtn");
let fontsizeBtn = document.querySelector(".font-size-container");
let textColorBtn = document.querySelector(".text-color");
let bgColorBtn = document.querySelector(".bg-color");
let alignBtn = document.querySelectorAll(".alignBtn");


// ***************************sheets**************************

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




// *************************address bar **********************************

// when we click on any cell its address will appear in address bar
for (let i = 0; i < AllCells.length; i++) {
    AllCells[i].addEventListener("click", function () {
        let rid = Number(AllCells[i].getAttribute("rid"));
        let cid = Number(AllCells[i].getAttribute("cid"));
        let rowAdd = rid + 1;
        let colAdd = String.fromCharCode(cid + 65);
        let address = colAdd + rowAdd;
        addressBar.value = address;
        let cellObj = sheetDB[rid][cid];



         //**********************retrieve font family*************** */

       // fontfamilyBtn.value =  cellObj[rid][cid].fontFamily;

        //**********************retrieve BUI *************** */
        for (let i = 0; i < BUIBtn.length; i++) {
            BUIBtn[i].classList.remove("active-btn");
        }
        if (cellObj.bold == true) {
            BUIBtn[0].classList.add("active-btn");
        }
        if (cellObj.underline == true) {
            BUIBtn[1].classList.add("active-btn");
        }
        else if (cellObj.italic == true) {
            BUIBtn[2].classList.add("active-btn");
        }

        //**********************retrieve font size *************** */

        textColorBtn.value = cellObj.fontColor;

        //**********************retrieve background size *************** */

        bgColorBtn.value = cellObj.bgColor;


        //**********************retrieve alignment *************** */
        for (let i = 0; i < alignBtn.length; i++) {
            alignBtn[i].classList.remove("active-btn");
        }
        if (cellObj.halign == "left") {
            alignBtn[0].classList.add("active-btn");
        }
        else if (cellObj.halign == "center") {
            alignBtn[1].classList.add("active-btn");
        }
        else if (cellObj.halign == "right") {
            alignBtn[2].classList.add("active-btn");
        }

    });
}


// get row id and col id from the address bar
function getRidCidFromAddress(address) {

    let cellColAdd = address.charCodeAt(0);
    let cellRowAdd = address.slice(1);
    let cid = cellColAdd - 65;
    let rid = Number(cellRowAdd) - 1;
    return { rid, cid };


}


// by default it will click on first cell so that our address box is not empty
AllCells[0].click();



// ************************ formatting *************************

//change the font family of selected cell
fontfamilyBtn.addEventListener("change", function () {
    let fontFamily = fontfamilyBtn.value;
    let address = addressBar.value;
    let { rid, cid } = getRidCidFromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.fontFamily = fontFamily;
    let cellObj = sheetDB[rid][cid];
    cellObj.fontSize = fontFamily;
})

// BUI formatting
for (let i = 0; i < BUIBtn.length; i++) {
    BUIBtn[i].addEventListener("click", function () {

        let address = addressBar.value;
        let { rid, cid } = getRidCidFromAddress(address);
        let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
        let cellObj = sheetDB[rid][cid];

        //if not active then add a class and change formatting
        if (!BUIBtn[i].classList.contains("active-btn")) {
            if (i == 0) {
                cell.style.fontWeight = "bold";
                cellObj.bold = true;
            }

            if (i == 1) {
                cell.style.textDecoration = "underline";
                cellObj.underline = true;
            }
            if (i == 2) {
                cell.style.fontStyle = "italic";
                cellObj.italic = true;
            }

            BUIBtn[i].classList.add("active-btn");
        }
        //if active then do everything back to normal
        else {
            if (i == 0) {
                cell.style.fontWeight = "normal";
                cellObj.bold = false;
            }


            if (i == 1) {
                cell.style.textDecoration = "none";
                cellObj.underline = false;
            }


            if (i == 2) {
                cell.style.fontStyle = "normal";
                cellObj.italic = false;
            }


            BUIBtn[i].classList.remove("active-btn");
        }

    })
}



// change font size of selected cell
fontsizeBtn.addEventListener("change", function () {
    let fontSize = fontsizeBtn.value;
    let address = addressBar.value;
    let { rid, cid } = getRidCidFromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.fontSize = fontSize + "px";
    let cellObj = sheetDB[rid][cid];
    cellObj.fontSize = fontSize;

})


// text Color

textColorBtn.addEventListener("change", function (e) {
    let address = addressBar.value;
    let { rid, cid } = getRidCidFromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.color = e.target.value;
    let cellObj = sheetDB[rid][cid];
    cellObj.fontColor = e.target.value;
});


//background color of cell
bgColorBtn.addEventListener("change", function (e) {
    let address = addressBar.value;
    let { rid, cid } = getRidCidFromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.backgroundColor = e.target.value;
    let cellObj = sheetDB[rid][cid];
    cellObj.bgColor = e.target.value;
});


// add event listener for alignment
for (let i = 0; i < alignBtn.length; i++) {
    alignBtn[i].addEventListener("click", function () {

        let address = addressBar.value;
        let { rid, cid } = getRidCidFromAddress(address);
        let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
        let cellObj = sheetDB[rid][cid];

        for (let j = 0; j < alignBtn.length; j++)
            alignBtn[j].classList.remove("active-btn");

        alignBtn[i].classList.add("active-btn");

        if (i == 0) {
            cell.style.textAlign = "left";
            cellObj.halign = "left";

        }

        else if (i == 1) {
            cell.style.textAlign = "center";
            cellObj.halign = "center";

        }

        else if (i == 2) {
            cell.style.textAlign = "right";
            cellObj.halign = "right";

        }

    })
}



