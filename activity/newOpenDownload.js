  
// ------------ new file ----------------------
let newFile = document.querySelector(".new");
newFile.addEventListener("click",function(){

    let confirmReq = confirm("Do you want to create a new workspace ?");
    if(confirmReq == true)
    {
        location.reload();
        
    }



})











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