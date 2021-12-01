productList()
function productList (){
    function getUrlParams() {
        let href = location.href;//获取浏览器的地址
        let regExp = /.+\?(.+)/
    
        let param = regExp.exec(href)//匹配?后面的参数
        if (!param) {
            // console.log('没有query参数');
            return
        }
    
        param = param[1]
        // console.log(param);
        // console.log(decodeURI(param));解码URI的参数编码
        let paramArr = param.split("&");//多个参数以"&"切割 ?name=李雷&age=30
        // console.log(paramArr);//["name=李雷","age=30"]
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
    console.log(query);
    
    let recImg = document.getElementsByClassName('recImg')[0]
    // console.log(recImg);
    let recMainContent = document.getElementsByClassName('recommen-main-content')[0]
    console.log(recMainContent);
    
    let shopTitle =document.getElementById('shopNavTitle')
    shopTitle.innerText=query.brandName
    
    ajax({
        url: 'http://chst.vip:1234/api/getproduct',
        data: {
            productid: query.productId
        }
    }).then(res => {
        res = res.result[0]
        // console.log(res.bjShop);
        renderRecImg(res)
    })
    
    ajax({
        url: 'http://chst.vip:1234/api/getproductcom',
        data: {
            productid: query.productId
        }
    }).then(res => {
        res = res.result
        console.log(res);
        renderComment(res)
    })
    
    function renderRecImg(res) {
        let html = `
        
        <ul class="recImg">
        <li>${res.productImg}</li>
        <li>${res.productName}</li>
        <li>
            <span>当前最低&nbsp;￥7777</span>
            <span>优选评论&nbsp;9999条</span>
        </li>
        <li>
        ${res.bjShop}
        </li>
        </ul>
        `
        recImg.innerHTML = html
    }
    
    function renderComment(res) {
        let html = ''
        for (let i = 0; i < res.length; i++) {
            html += `
    
            <ul class="commentList">
            <li>
                <span>${res[i].comName}</span>
                <span>${res[i].comTime}</span>
            </li>
            <li>
            ${res[i].comContent}
            </li>
            <li>${res[i].comFrom}</li>
           </ul>
    
            `
        }
        recMainContent.innerHTML = html
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