//页面渲染数据
// let res;
let num =0;
function render(num) {
    console.log(num);
    ajax(
        {
            url: "http://chst.vip:1234/api/getmoneyctrl?pageid="+num+"",
            success(res) {
                res = res.result
                console.log(res);
                let html = ""
                res.forEach(item => {
                    // console.log(item.productId);
                    // console.log(1111);
                    // console.log(item.productid)
                    html += `
                    <a href="zhekou.html?productid=${item.productId}">
                    
                            ${item.productImg2}
                            <div>
                                <p>${item.productName}<span>${item.productPinkage}</span></p>
                                <p>${item.productFrom}|${item.productTime}<span class="iconfont icon-pinglun2">${item.productComCount}</span></p>
                            </div>
                        </a>
                    `
                });
                let section = document.querySelector('section')
                section.innerHTML = html

            }
        }
    )
}
render(num)


//返回顶部
backTop();
function backTop() {
    let btn3 = document.getElementById("btn3")
    let rec = document.querySelector("section");
    rec.onscroll = function () {
        btn3.onclick = function () {
            console.log(123);
            animate(rec, 0);
        };
    };
}

//点击切换页面
let section = document.querySelector('section')
let btnRight = document.getElementById("btnRight")
let btnLeft = document.getElementById("btnLeft");
let page = document.getElementById("page");

ajax({
    url: "http://chst.vip:1234/api/getmoneyctrl",
    success(res){
    //    let numRes= res.result    
        console.log(res);
        let pageNum=Math.ceil(res.totalCount/res.pagesize)
        console.log(pageNum);
        let html = ""
        for(let i=0;i<pageNum;i++){
            html+=`
            <option>${i+1}/${pageNum}</option>
            `
        }
        page.innerHTML=html
    }
})

page.onchange=function(){
    btnLeft.disabled=false
    // btnRight.disabled=false
    num=page.selectedIndex
    // if(num===0)
    section.innerHTML =""
    render(num)
    console.log(num);
    if(num===0){
        console.log(num);
    btnLeft.disabled=true;
    }
    if(num!==15){
        btnRight.disabled=false
    }
    if(num===14){
        btnRight.disabled=true
    }
}
//点击右键
btnLeft.disabled = true;
btnRight.onclick = function () {
    btnLeft.disabled = false;
    section.innerHTML = ""
    num++
    console.log(num);
    if (num === 14) {
        btnRight.disabled=true
    } 
     if(num < 15){
        render(num)
        page[num].selected=true
        console.log(num);
    }
}
//点击左键
btnLeft.onclick=function(){
        console.log(num);
    section.innerHTML=""
    num--
    if(num===0){
        btnLeft.disabled=true
    }
    if(num>=0){
        render(num)
        page[num].selected=true; 
        console.log(num);   
    }
    if(num!==15){
        btnRight.disabled=false
    }
}