baiCaiJia()
function baiCaiJia (){
    const getTitle = () => ajax({
        url: 'http://chst.vip:1234/api/getbaicaijiatitle'
    })
    
    let menu = document.getElementById('menu')
    // console.log(menu);
    let mainShop = document.getElementsByClassName('recommen-main-content')[0]
    // console.log(mainShop);
    let titleNum = 0;
    
    function renderTitle(res) {
        // console.log(res);
        let html = ''
        for (let i = 0; i < res.length; i++) {
            html += `
            <p>${res[i].title}</p>
            `
        }
    
        menu.innerHTML = html
        let title = menu.children
        // console.log(title);
    
        function delateClass() {
            for (let i = 0; i < title.length; i++) {
                title[i].className = ''
            }
        }
    
        for (let k = 0; k < title.length; k++) {
            title[k].onclick = function () {
                delateClass()
                title[k].className = 'active'
                titleNum = res[k].titleId
                // console.log(titleNum);
                ajax({
                    url: 'http://chst.vip:1234/api/getbaicaijiaproduct',
                    data: {
                        titleid: titleNum
                    },
                    success(resShop) {
                        resShop = resShop.result
                        // console.log(resShop);
                        renderShop(resShop)
                    },
                })
            }
        }
    
    }
    
    getTitle()
        .then(res => {
            res = res.result
            // console.log(res);
            renderTitle(res)
    
            // return getShop()
        })
    
    ajax({
        url: 'http://chst.vip:1234/api/getbaicaijiaproduct',
        data: {
            titleid: 0
        },
        success(resShop) {
            resShop = resShop.result
            // console.log(resShop);
            renderShop(resShop)
        },
    })
    
    function renderShop(resShop) {
        var num1 = 0
        var num2 = 100
    
        var bartimer = setInterval(function () {
            num1++
            num2--
            setProcess();
            // console.log(num1,num2);
        }, 1);
        let html = ''
        for (let k = 0; k < resShop.length; k++) {
            // clearInterval(bartimer);
    
            html += `
            <div class="content-shop">
            <div>
              <a href="#">
              ${resShop[k].productImg}
              </a>
            </div>
            <div>
              <p>
                ${resShop[k].productName}
              </p>
              <span>
                ${resShop[k].productPrice} 
              </span>
    
              <p class="processbar">
                 <span>
                  <span style="width: 0%">11111</span>
                 </span>
                 <span>已领<b>0</b>张/剩余<b>127</b>张</span>
              </p>
    
              <p>
                  <a href="#">点击领取优惠卷</a>
                  <a href="#">下单链接</a>
              </p>
            </div>
          </div>
            `
        }
        mainShop.innerHTML = html
    
        let processbar = document.getElementsByClassName('processbar')
        // console.log(processbar);
    
        function setProcess() {
    
            for (let i = 0; i < processbar.length; i++) {
                // console.log(processbar[i]);
                var span0 = processbar[i].children[0]
                // console.log(span0);整体
                var span1 = processbar[i].children[1]
                // console.log(span1);
                var span1b1 = span1.children[0]
                // console.log(span1b1);
                var span1b2 = span1.children[1]
                // console.log(span1b2);
                span1b1.innerHTML =num1
                span1b2.innerHTML =num2
    
                var span01 = span0.children[0]
                // console.log(span01);单个
                span01.style.width = parseInt(span01.style.width) + 1 + "%";
                span01.innerHTML = span01.style.width;
    
                if (span01.style.width == '100%') {
                    // console.log(123);
                    clearInterval(bartimer);
                }
            }
        }
        // var num1 = 0
        // var num2 = 100
    
        // var bartimer = setInterval(function () {
        //     num1++
        //     num2--
        //     setProcess();
        //     // console.log(num1,num2);
        // }, 50);
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