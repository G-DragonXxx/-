baicaijia()
function baicaijia (){
    // 菜单
menu();
function menu() {

    let menuMain = document.getElementsByClassName("menu-main")[0];

    let resMore;
    let more;
    let resFin;
    let flag = true

    function renderMain(arr) {
        console.log(arr);
        let html = "";
        for (let i = 0; i < arr.length; i++) {
            let imgSrc = arr[i].img.substring(10)
            html += ` 
       <div>
         <a href=${arr[i].titlehref}>
           <img src="../${imgSrc}
         </a>
         <p>${arr[i].name}</p>
       </div>
       `;
        }

        menuMain.innerHTML = html;
        more = menuMain.children;

        for (let i = 0; i < menuMain.children.length; i++) {
            menuMain.children[i].onclick = function () {
                if (i == 7) {
                    if (flag) {
                        renderMain(resMore);
                        flag = false;
                    } else {
                        flag = true;
                        renderMain(resFin);
                    }
                }
            }
        }
    }

    ajax({
        url: "http://chst.vip:1234/api/getindexmenu",
        success(res) {
            resMore = res.result
            res = res.result.slice(0, 8)
            resFin = [...res]
            renderMain(res)
        },
    });
}

// 推荐商品
recommon();
function recommon() {
    let recMainContent = document.getElementsByClassName(
        "recommen-main-content"
    )[0];

    function renderRec(res) {
        let html = "";
        for (let i = 0; i < res.length; i++) {
            html += `
            <a href="./zhekou.html"  style="color: pink;">
     <div class="content-shop">
     
           <div>
             ${res[i].productImg2}
           </div>
           <div>
             <p>
               ${res[i].productName} 
               <span>${res[i].productPinkage}</span>
             </p>
             <p>
               <span> ${res[i].productFrom}
                 |  ${res[i].productTime}</span>
               <span> ${res[i].productComCount}</span>
             </p>
           </div>
           
         </div>
         </a>
     `;
        }
        return html;
    }

    ajax({
        url: "http://chst.vip:1234/api/getmoneyctrl",
        success(res) {
            res = res.result;

            let html = renderRec(res);
            recMainContent.innerHTML = html;
        },
    });
}

// 返回顶部
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