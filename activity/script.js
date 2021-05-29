
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
let formulaInput = document.querySelector(".formula-box");
let gridContainer = document.querySelector(".grid_container");
let topLeftBlock = document.querySelector(".top-left-block");


// ***************************sheets**************************

// call to first sheet
let sheetDB = workSheetDB[0];


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
    newSheet.innerText = `Sheet ${idx + 1}`;
    sheetList.appendChild(newSheet);


    //active sheet
    sheetsArr.forEach(function (sheet) {
        sheet.classList.remove("active_sheet");
    })

    sheetsArr = document.querySelectorAll(".sheet");
    sheetsArr[sheetsArr.length - 1].classList.add("active_sheet");
    initCurrentSheetDb();
    sheetDB = workSheetDB[idx];

    //empty cells
    initUI();

    // add event listener corresponding to the new sheet created
    sheetActiveEventHandler(newSheet);


})

// this function removes and add active class event to the calling sheet
function sheetActiveEventHandler(curSheet) {
    curSheet.addEventListener("click", function (e) {
        let MySheet = e.currentTarget;
        let sheetsArr = document.querySelectorAll(".sheet");
        sheetsArr.forEach(function (sheet) {
            sheet.classList.remove("active_sheet");
        })
        if (!MySheet.classList.contains("active_sheet")) {
            MySheet.classList.add("active_sheet");
        }

        let sheetIdx = MySheet.getAttribute("sheetIdx");


        sheetDB = workSheetDB[sheetIdx - 1];



        setUI(sheetDB);
    })
}

// empty all the cells for the new sheet
function initUI() {
    for (let i = 0; i < AllCells.length; i++) {
        AllCells[i].style.fontFamily = "arial";
        AllCells[i].style.fontSize = "16px";
        AllCells[i].style.fontWeight = "normal";
        AllCells[i].style.textDecoration = "none";
        AllCells[i].style.fontStyle = "normal";
        AllCells[i].style.color = "#000000";
        AllCells[i].style.backgroundColor = "#ffffff";
        AllCells[i].style.textAlign = "left";
        AllCells[i].innerText = "";



    }

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
            BUIBtn[2].classList.add("active-btn");
        }
        else if (cellObj.italic == true) {
            BUIBtn[1].classList.add("active-btn");
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
    cellObj.fontFamily = fontFamily;
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

            if (i == 2) {
                cell.style.textDecoration = "underline";
                cellObj.underline = true;
            }
            if (i == 1) {
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


// when we stop typing or move away from a specific cell then its data get stored in object
for (let i = 0; i < AllCells.length; i++) {
    // update formula evaluation on blur
    AllCells[i].addEventListener("blur", function () {
        let address = addressBar.value;
        let { rid, cid } = getRidCidFromAddress(address);
        let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
        let cellObj = sheetDB[rid][cid];
        if(cellObj.value==cell.innerText)
        {
            return;
        }
        if(cellObj.formula){
            removeFormula(cellObj,address);
        }
        cellObj.value = cell.innerText;
        changeChildren(cellObj);


    })

    // if height of cell increase , increase the height of row also

    AllCells[i].addEventListener("keydown",function(){

        //getBoundingClientRect gives variours attribute related to a specific element eg - length, height, etc

        let obj = AllCells[i].getBoundingClientRect();
        let heightObj = obj.height;     //this gives number
        let address = addressBar.value;
        let {rid,cid} = getRidCidFromAddress(address);
        let leftCol = document.querySelectorAll(".left-col .left-col-box")[rid];
        let heightLeftCol = leftCol.style.height;   // this gives number along with unit
       
        heightLeftCol = heightLeftCol.split("px")[0];
        let height = Math.max(heightLeftCol,heightObj);
        leftCol.style.height = height+"px";

    })




}


gridContainer.addEventListener("scroll",function(e){
    

    // let topRow = document.querySelector(".top-row");
    // let leftCol = document.querySelector(".left-col");
    // both topRow and leftCol is defined in init.js
    let top = gridContainer.scrollTop;
    let left = gridContainer.scrollLeft;
    topLeftBlock.style.top = top + "px";
     topRow.style.top = top + "px";
    leftCol.style.left = left + "px";
    topLeftBlock.style.left = left + "px";
})



//every time we switch sheets it will reload its data
function setUI(sheetDB) {
    for (let i = 0; i < sheetDB.length; i++) {
        for (let j = 0; j < sheetDB[i].length; j++) {
            let cell = document.querySelector(`.col[rid="${i}"][cid="${j}"]`);

            let { bold, underline, italic, fontFamily, fontSize, fontColor, bgColor, halign, value } = sheetDB[i][j];

            cell.style.fontFamily = fontFamily;
            cell.style.fontSize = fontSize;
            cell.style.fontWeight = bold == true ? "bold" : "normal";
            cell.style.textDecoration = underline == true ? "underline" : "none";
            cell.style.fontStyle = italic == true ? "italic" : "normal";
            cell.style.color = fontColor;
            cell.style.backgroundColor = bgColor;
            cell.style.textAlign = halign;
            cell.innerText = value;
        }
    }
}



//**************************** handle formula bar *************** */

// Steps:
// 1.Identify formula
// 2.Evaluate formula -> value
// 3.UI print
// 4.DB-> current cell -> value    
//                     -> formula
// 5. Parent -> children arr -> add 

formulaInput.addEventListener("keydown",function(e){

    if(e.key=="Enter" && formulaInput.value != ""){
        let newFormula = formulaInput.value;
        //resultant cell address
        let address = addressBar.value;
        let {rid,cid} = getRidCidFromAddress(address);
        let cellObject = sheetDB[rid][cid];

        // if there is any previous formula associated with cel object
        let previousFormula = cellObject.formula;
        if(previousFormula==newFormula)
        {
            return;
        }
        if(previousFormula!="" && previousFormula!=newFormula)
        {
            // if formulas are not equal then remove the existing one first
            removeFormula(cellObject,address);
        }

        // check if any cycle of formula is formed. eg: A1 -> ( 2 * B1), B1 -> ( 2 * C1), C1 -> ( 2 * A1)
        let hasCycle = checkCycleFormation(newFormula,address);

        if(hasCycle)
        {
            alert("Forming cycle, cannot apply formula");
            return;
        }
       
        let evaluatedValue = evaluateFormula(newFormula);
        //UI change
        setUIByFormula(evaluatedValue , rid , cid);
        //db->works
        setFormula(evaluatedValue,newFormula,rid,cid,address);
        changeChildren(cellObject); // change the children associated with the resultant cell
    }

})

// evalue function
function evaluateFormula(formula)
{
    // "( A1 + A2 )"
    let formulaTokens = formula.split(" ");
    //split
    // [(, A1, +, A2,)]
    for(let i = 0 ; i < formulaTokens.length ; i++)
    {
        
        let firstCharOfToken = formulaTokens[i].charCodeAt(0);
        if(firstCharOfToken >= 65 && firstCharOfToken <= 90)
        {
            // console.log(formulaTokens[i]);
            let {rid,cid} = getRidCidFromAddress(formulaTokens[i]);
            let cellObject= sheetDB[rid][cid];
            let {value} = cellObject;
            formula = formula.replace(formulaTokens[i],value);
           
        }
    }

    // infix evaluation
    let ans = eval(formula);
    return ans;
    // DB -> A1,A2 -> 10,20
    // [(,10 +,20 )]
    // ( 10 + 20 )
}


function checkCycleFormation(Formula,address)
{
    if(Formula=="")
    return false;
    
    let formulaTokens = Formula.split(" ");
   
    for(let i = 0 ; i < formulaTokens.length ; i++)
    {
        
        let firstCharOfToken = formulaTokens[i].charCodeAt(0);
        if(firstCharOfToken >= 65 && firstCharOfToken <= 90)
        {

            if(formulaTokens[i]==address)
            return true;

            let parentRCid = getRidCidFromAddress(formulaTokens[i]);
            let parentObject= sheetDB[parentRCid.rid][parentRCid.cid];
            let hasCycle = checkCycleFormation(parentObject.formula,address);
            if(hasCycle)
            return true;

            
        }
    }

    return false;

}


function setUIByFormula(value, rid, cid)
{
    // display result in the resultant cell
   document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`).innerText = value;
   
}


function setContentInDB(value,formula,rid,cid,address)
{
    let cellObj = sheetDB[rid][cid];
    cellObj.value = value;
    cellObj.formula = formula;

    let formulaTokens = formula.split(" ");
   
    for(let i = 0 ; i < formulaTokens.length ; i++)
    {
        
        let firstCharOfToken = formulaTokens[i].charCodeAt(0);
        if(firstCharOfToken >= 65 && firstCharOfToken <= 90)
        {
            // console.log(formulaTokens[i]);
            let parentRCid = getRidCidFromAddress(formulaTokens[i]);
            let cellObject= sheetDB[parentRCid.rid][parentRCid.cid];
            
            cellObject.children.push(address);
           
        }
    }


}


function setFormula(value,formula,rid,cid,address)
{
    let cellObject = sheetDB[rid][cid];
    cellObject.value = value;
    cellObject.formula = formula;
    let formulaTokens = formula.split(" ");
    for(let i = 0 ; i < formulaTokens.length; i++)
    {
        let firstCharOfToken = formulaTokens[i].charCodeAt(0);
        if(firstCharOfToken >= 65 && firstCharOfToken <= 90)
        {
            let parentRCid = getRidCidFromAddress(formulaTokens[i]);
            let cellObject = sheetDB[parentRCid.rid][parentRCid.cid];
            // like for ( A1 + A2 ) -> B1 => push B1 in A1 object and also in A2 object
            cellObject.children.push(address);
        }
    }
}


function changeChildren(cellObject)
{

    let children = cellObject.children;
    for(let i = 0 ; i < children.length ; i++)
    {
        let chAddress = children[i];
        let chRICIObj = getRidCidFromAddress(chAddress);
        let chObj = sheetDB[chRICIObj.rid][chRICIObj.cid];
        let formula = chObj.formula;
        let evaluatedValue = evaluateFormula(formula);
        setUIByFormula(evaluatedValue,chRICIObj.rid,chRICIObj.cid);
        chObj.value = evaluatedValue;
        changeChildren(chObj);
    }

}

function removeFormula(cellObject,address)
{
    let formula = cellObject.formula;
    let formulaTokens = formula.split(" ");
    for(let i = 0 ; i < formulaTokens.length ; i++)
    {
        let firstCharOfToken = formulaTokens[i].charCodeAt(0);
        if(firstCharOfToken >= 65 && firstCharOfToken <= 90)
        {
            // console.log(formulaTokens[i]);
            let parentRCid = getRidCidFromAddress(formulaTokens[i]);
            let parentCellObject= sheetDB[parentRCid.rid][parentRCid.cid];
            
            let children = parentCellObject.children;
            let idx = children.indexOf(address);
            children.splice(idx,1);
           
        }
    }

    cellObject.formula="";
}