//初始化
let shopNum = 0;
let areaNum = 0;

//页面渲染
function ajaxRender(shopNum,areaNum){

    ajax(
        {
            url: "http://chst.vip:1234/api/getgsproduct?shopid=" + shopNum + "&areaid=" + areaNum + "",
            success(res) {
                let productRes = res.result
                console.log(productRes);
                let html=""
                productRes.forEach(item=>{
                    html +=`
                    <div class="content">
                        <img src=${item.productImg} alt="">
                        <p>${item.productName}</p>
                        <span>${item.productPrice}</span>
                    </div>
                    `
                })
                let content=document.querySelector("#content")
                content.innerHTML=html

            }
        }
    )
}
ajaxRender(0,0)

//shop数据渲染
let shopRes;
ajax(
    {
        url: "http://chst.vip:1234/api/getgsshop?shopid=" + shopNum + "",
        success(res) {

            shopRes = res.result
            console.log(shopRes);
            let html = ""
            shopRes.forEach(item => {
                html += `
                <p>${item.shopName}</p>
                `
            });
            let shops = document.querySelector('#shops')
            shops.innerHTML = html
            console.log(shops);
            let shopChild = shops.children
            for (let i = 0; i < shopChild.length; i++) {
                shopChild[i].onclick = function () {
                    console.log(shopChild[i]);
                    console.log(shopRes[i].shopId);
                    let shopNum = shopRes[i].shopId
                    ajaxRender(shopNum, areaNum)
                }
            }
        }
    }
)

//shoparea数据渲染
let areaRes;
ajax(
    {
        url: "http://chst.vip:1234/api/getgsshoparea?areaid=" + areaNum + "",
        success(res) {

            areaRes = res.result
            console.log(areaRes);
            let html = ""
            areaRes.forEach(item => {
                html += `
                <p>${item.areaName}</p>
                `
            });
            let places = document.querySelector('#places')
            places.innerHTML = html
            let areaChild = places.children
            for (let i = 0; i < areaChild.length; i++) {
                areaChild[i].onclick = function () {
                    console.log(areaChild[i]);
                    console.log(areaRes[i].areaId);
                    let areaNum = areaRes[i].areaId
                    ajaxRender(shopNum, areaNum)
                }
            }
        }
    }
)
//点击下拉菜单
let shop = document.querySelector(".shop")
let shops = document.querySelector('#shops')
let place = document.querySelector(".place")
let placess = document.querySelector('#places')
let flag = true
shop.onclick = function () {
    places.style.display = "none"
    // shops.style.display="block"
    console.log("1")
    if (flag) {
        shops.style.display = "block"
        flag = !flag
    } else {
        shops.style.display = "none"
        flag = !flag
    }
}

place.onclick=function(){
    shops.style.display = "none"
    console.log("1")
    if (flag) {
        places.style.display = "block"
        flag = !flag
    } else {
        places.style.display = "none"
        flag = !flag
    }
}

