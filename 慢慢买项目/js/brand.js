brand()
function brand (){

function getUrlParams() {
    let href = location.href;//获取浏览器的地址
    let regExp = /.+\?(.+)/
    
    let param = regExp.exec(href)//匹配?后面的参数
    if(!param){
        // console.log('没有query参数');
        return
    }
    
    param = param[1]
        // console.log(param);
        // console.log(decodeURI(param));解码URI的参数编码
    let paramArr = param.split("&");//多个参数以"&"切割 ?name=李雷&age=30
    console.log(paramArr);//["name=李雷","age=30"]
    let query = {}//声明一个对象
    paramArr.forEach(item => {
        //['name','李雷']
        itemArr = item.split("=");
        // console.log(itemArr);
        query[itemArr[0]] = decodeURI(itemArr[1])
    })

    return query
}

let query = getUrlParams() //获取浏览器query参数 {product:10}
// console.log(query);
// console.log(query.brandName);

let recMain =document.getElementsByClassName('recommen-main-content')[0]
console.log(recMain);
let shopNavTitle =document.getElementById('shopNavTitle')
// console.log(shopNavTitle);
shopNavTitle.innerText=query.brandName

ajax({
    url:'http://chst.vip:1234/api/getbrandproductlist',
    data:{
        brandtitleid:query.brandtitleid
    }
}).then(res=>{
    res =res.result
    console.log(res);
    renderBrand(res)
})

function renderBrand (res){

    let html =''
    for(let i=0;i<res.length;i++){
        html += `
        <div class="shop-jump" productId="${res[i].productId}" brandName=${res[i].brandName}>
          <div>
            ${res[i].productImg}
          </div>
          <div>

            <p>
            ${res[i].productName}
            </p>
  
            <p>
              ${res[i].productPrice}
            </p>
  
            <p>
              <span>${res[i].productQuote}</span>
              &nbsp;&nbsp;&nbsp;
              <span>${res[i].productCom}</span>
           </p>
          </div>
      </div>
        `
    }
    recMain.innerHTML=html
    let recMainChild =recMain.children
    console.log(recMainChild);
    for(let k =0;k<recMainChild.length;k++){
        recMainChild[k].onclick=function(){
        let productId =recMainChild[k].getAttribute('productId')
            console.log(productId);
        let brandName=recMainChild[k].getAttribute('brandName')
        console.log(brandName);

            location.href=`productlist.html?productId=${productId}&brandName=${brandName}`
        }
    }


}

backTop();
function backTop() {
    let buttonTop = document.getElementById("button-top");
    let rec = document.getElementById("recommen");
    rec.onscroll = function () {
        buttonTop.onclick = function () {
            animate(rec, 0);
        };
    };
}

}
