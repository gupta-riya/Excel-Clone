  
// ------------ new file ----------------------
let newFile = document.querySelector(".new");
newFile.addEventListener("click",function(){

    let confirmReq = confirm("Do you want to create a new workspace ?");
    if(confirmReq == true)
    {
        clearAllExistingDataAndTabs();
    }
})



// let openFile = document.querySelector(".open");
// openFile.addEventListener("click",function(){
//     document.getElementById('files').addEventListener('change', function(evt){
//         var reader = new FileReader();
//         reader.readAsText(evt.target.file);
//         reader.onload = function(theFile)
//         {
//             json = JSON.parse(e.target.result);
// 			alert('json global var has been set to parsed json of this file here it is unevaled = \n' + JSON.stringify(json));
//         }
//         json = JSON.parse(e.target.result);
//     });
// })

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


        
    }
    
    document.getElementById('files').addEventListener('change', onChange);

}


function clearAllExistingDataAndTabs()
{
    workSheetDB = [];
    initCurrentSheetDb();
    sheetDB = workSheetDB[0];
    firstSheet.click();
    for(let i = 1 ; i < sheetsArr.length ; i++)
    {
        sheetsArr[i].remove();
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