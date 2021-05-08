
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


// when we click on any cell its address will appear in address bar
for(let i = 0 ; i < AllCells.length ; i++)
{
    AllCells[i].addEventListener("click",function(){
        let rid = Number(AllCells[i].getAttribute("rid"));
        let cid = Number(AllCells[i].getAttribute("cid"));
        let rowAdd = rid  + 1;
        let colAdd = String.fromCharCode(cid + 65);
        let address = colAdd + rowAdd;
        addressBar.value = address;

    });
}

//change the font family of selected cell
fontfamilyBtn.addEventListener("change",function(){
    let fontFamily = fontfamilyBtn.value;
    let address = addressBar.value;
    let {rid , cid} = getRidCidFromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.fontFamily = fontFamily;
})

// BUI formatting
for(let i = 0 ; i < BUIBtn.length ; i++)
{
    BUIBtn[i].addEventListener("click",function(){

        let address = addressBar.value;
        let {rid , cid} = getRidCidFromAddress(address);
        let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
        
        if(i==0)
        cell.style.fontWeight = "bold";
        
        if(i==1)
        cell.style.textDecoration = "underline";

        if(i==2)
        cell.style.fontStyle = "italic";
    })
}



// change font size of selected cell
fontsizeBtn.addEventListener("change",function(){
    let fontSize = fontsizeBtn.value;
    let address = addressBar.value;
    let {rid , cid} = getRidCidFromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.fontSize = fontSize+"px";

})


// text Color

textColorBtn.addEventListener("change", function(e)
{
    let address = addressBar.value;
    let {rid , cid} = getRidCidFromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.color = e.target.value;
});


//background color of cell
bgColorBtn.addEventListener("change", function(e)
{
    let address = addressBar.value;
    let {rid , cid} = getRidCidFromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.backgroundColor = e.target.value;
});


// add event listener for alignment
for(let i = 0 ; i < alignBtn.length ; i++)
{
    alignBtn[i].addEventListener("click",function(){

        let address = addressBar.value;
        let {rid , cid} = getRidCidFromAddress(address);
        let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
        
        if(i==0)
        cell.style.textAlign = "left";
        
        else if(i==1)
        cell.style.textAlign = "center";

        else if(i==2)
        cell.style.textAlign = "right";
    })
}



// get row id and col id from the address bar
function getRidCidFromAddress(address){

    let cellColAdd = address.charCodeAt(0);
    let cellRowAdd = address.slice(1);
    let cid = cellColAdd -  65;
    let rid = Number(cellRowAdd) - 1;
    return {rid,  cid};


}

// by default it will click on first cell so that our address box is not empty
AllCells[0].click();
