function rightArrow(id){
    console.log("right");
    if(id=="row1"){
        document.getElementById("row1").style.display="none";
        document.getElementById("row2").style.display="";
        document.getElementById("row3").style.display="none";
    }
    
    else if(id=="row2"){
        document.getElementById("row1").style.display="none";
        document.getElementById("row2").style.display="none";
        document.getElementById("row3").style.display="";
    }
    else{
        document.getElementById("row1").style.display="";
        document.getElementById("row2").style.display="none";
        document.getElementById("row3").style.display="none";
    }
}

function leftArrow(id){
    console.log("left");
    if(id=="row1"){
        document.getElementById("row1").style.display="none";
        document.getElementById("row2").style.display="none";
        document.getElementById("row3").style.display="";
    }
    
    else if(id=="row2"){
        document.getElementById("row1").style.display="";
        document.getElementById("row2").style.display="none";
        document.getElementById("row3").style.display="none";
    }
    else{
        document.getElementById("row1").style.display="none";
        document.getElementById("row2").style.display="";
        document.getElementById("row3").style.display="none";
    }
}