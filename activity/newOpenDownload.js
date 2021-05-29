  
// ------------ new file ----------------------
let newFile = document.querySelector(".new");
newFile.addEventListener("click",function(){

    let confirmReq = confirm("Do you want to create a new workspace ?");
    if(confirmReq == true)
    {
        clearAllExistingDataAndTabs();
    }
})


// -------------- open file --------------------

let openFile = document.querySelector(".open");
openFile.addEventListener("click",uploadJsonFile);
  
function uploadJsonFile()
{
    function onChange(event) {
        var reader = new FileReader();
        reader.onload = onReaderLoad;
        reader.readAsText(event.target.files[0]);
    }

    function onReaderLoad(event){

        var obj = JSON.parse(event.target.result);
        // sheet num // row num // col num
        console.log(obj[0][0][0].value);

        // worksheet clear
        // data wipe out
        // sheetDb clear
        // sheets list - remove tabs
        // place active on sheet list 1
        clearAllExistingDataAndTabs();

        renderDataOfOpenedFile(obj);



    }
    
    document.getElementById('files').addEventListener('change', onChange);

}


function clearAllExistingDataAndTabs()
{
    workSheetDB = [];
    initCurrentSheetDb();
    sheetDB = workSheetDB[0];
    for(let i = 1 ; i < sheetsArr.length ; i++)
    {
        sheetsArr[i].remove();
    }
    firstSheet.click();
}

function renderDataOfOpenedFile(obj){

    // sheet nums
    let numOfSheets = obj.length;

    sheetDB = [];

    for(let i = 0 ; i < 100 ; i++)
    {
        let row = [];
        for(let j = 0 ; j < 26 ; j++){
        
            let cell = {
                bold:obj[0][i][j].bold,
                underline:obj[0][i][j].underline,
                italic:obj[0][i][j].italic,
                fontFamily: obj[0][i][j].fontFamily,
                fontSize:obj[0][i][j].fontSize,
                fontColor:obj[0][i][j].fontColor,
                bgColor:obj[0][i][j].bgColor,
                halign:obj[0][i][j].halign,
                value:obj[0][i][j].value,
                children:obj[0][i][j].children,
                formula:obj[0][i][j].formula,

            }
            row.push(cell);
        }
        sheetDB.push(row);
        let leftCol = document.querySelectorAll(".left-col .left-col-box")[i];
        leftCol.style.height = 30+"px";
    }

    // render it on screen and save it in worksheetDB

    workSheetDB = [];
    workSheetDB.push(sheetDB);
    setUI(sheetDB);

    console.log("completed");

    for(let k = 1 ; k < numOfSheets ; k++)
    {
        addbtnContainer.click();
        sheetDB = [];

        for(let i = 0 ; i < 100 ; i++)
        {
            let row = [];
            for(let j = 0 ; j < 26 ; j++){
            
                let cell = {
                    bold:obj[k][i][j].bold,
                    underline:obj[k][i][j].underline,
                    italic:obj[k][i][j].italic,
                    fontFamily: obj[k][i][j].fontFamily,
                    fontSize:obj[k][i][j].fontSize,
                    fontColor:obj[k][i][j].fontColor,
                    bgColor:obj[k][i][j].bgColor,
                    halign:obj[k][i][j].halign,
                    value:obj[k][i][j].value,
                    children:obj[k][i][j].children,
                    formula:obj[k][i][j].formula,

                }
                row.push(cell);
            }
            sheetDB.push(row);
            let leftCol = document.querySelectorAll(".left-col .left-col-box")[i];
            leftCol.style.height = 30+"px";
        }

        workSheetDB.pop();
        workSheetDB.push(sheetDB);
        setUI(sheetDB);
        console.log("completed");

    }
    



}



let download = document.querySelector(".download");
download.addEventListener("click", function () {
    const data = JSON.stringify(workSheetDB);
    // blob
    // excel -> npm xlsx
    const blob = new Blob([data], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    // download btn
    let a = document.createElement("a");
    // /download
    a.download = "file.json";
    a.href = url;
    a.click();
})