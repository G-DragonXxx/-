
ajax({
    url:"http://chst.vip:1234/api/getsitenav",
    success(res){
        res=res.result
        console.log(res);
       let html=""
       res.forEach(item=>{
           html+=`
           <a href=${item.navHref}><img src=${item.navImg} alt=""><span>${item.navTitle}</span></a>
           `
       })
       let nav =document.getElementById("nav")
       nav.innerHTML=html
    }
})

//返回顶部
backTop();
function backTop() {
    let btn3=document.getElementById("btn3")
    let rec = document.querySelector("section");
    rec.onscroll = function () {
        btn3.onclick = function () {
            console.log(123);
            animate(rec, 0);
        };
    };
}