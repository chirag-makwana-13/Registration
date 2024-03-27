function myfun() {
    // document.getElementById("b1").scrollIntoView();
    window.scroll(0,800);
}
function myfun1(){ 
   var a= document.getElementsByClassName("row3")[0];
   console.log(a);
   a.scrollLeft+=100;
  }
  function myfun2(){
    var a= document.getElementsByClassName("row3")[0];
   console.log(a);
   a.scrollLeft-=100;
  }
  function ff1(){
    document.getElementById("wordpress").style.display="";
    document.getElementById("magneto").style.display="none";
    document.getElementById("laravel").style.display="none";
    document.getElementById("php").style.display="none";
  }
  function ff2(){
    document.getElementById("wordpress").style.display="none";
    document.getElementById("magneto").style.display="";
    document.getElementById("laravel").style.display="none";
    document.getElementById("php").style.display="none";
  }
  function ff3(){
    document.getElementById("wordpress").style.display="none";
    document.getElementById("magneto").style.display="none";
    document.getElementById("laravel").style.display="";
    document.getElementById("php").style.display="none";
  }
  function ff4(){
    document.getElementById("wordpress").style.display="none";
    document.getElementById("magneto").style.display="none";
    document.getElementById("laravel").style.display="none";
    document.getElementById("php").style.display="";
  }