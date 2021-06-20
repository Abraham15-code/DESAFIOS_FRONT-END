const btnSend=document.getElementById("btn-send");
const share=document.getElementById("share");
btnSend.addEventListener("click",function(e){
    var claseShare=share.className;
    var claseBtn=this.className;
    var x=this.clientTop;

    if(claseShare.includes("share-active")){
        share.classList.remove("share-active");
    }else{
        share.classList.add("share-active");
    }

    if(claseBtn.includes("btn-active")){
        this.classList.remove("btn-active");
    }else{
        this.classList.add("btn-active");
    }

});