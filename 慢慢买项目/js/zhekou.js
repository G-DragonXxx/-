//页面渲染数据
let res;
console.log(location.href.split("="));
let  pageNum=location.href.split("=")[1]
//  console.log(pageNum);
function zhekouRender(pageNum=20) {
    ajax(
        {
            url: "http://chst.vip:1234/api/getmoneyctrlproduct?productid="+pageNum+"",

            // data: {productid: pageNum },
            success(res) {
                res = res.result
                let html = ""
                res.forEach((item) => {

                    console.log(item);
                    html += `
                    <h1>${item.productName}</h1>
                    <main>
                        <p>${item.productFrom}|${item.productTime} ${item.productTips}</p>
                        ${item.productImg2}
                        <p>
                            ${item.productInfo}
                        </p>
                    </main>
                    ${item.productImg2}
                    <ul>
                        ${item.productCity}
                    </ul>
                    <div id="goshop">
                    <a href="#">前往购买</a>
                </div>
                <img src="../images/mmbweixin2.png" alt="" id="weixin">
                <div id="tijiao">
                   
                </div>
                <div id="pinglun">
                   ${item.productComment}
                   
                </div>
                <hr> 
                    `
                });
                let section = document.querySelector('section')
                section.innerHTML = html

            }
        }
    )
}
zhekouRender(pageNum)


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