renderCouponProduct()
function renderCouponProduct() {

    //获取浏览器的query参数
    function getUrlParams() {
        let href = location.href;
        let regExp = /.+\?(.+)/
        let param = regExp.exec(href)[1]
        // console.log(param);
        // console.log(decodeURI(param));解码URI的参数编码

        let paramArr = param.split("&");
        // console.log(paramArr);
        let query = {}
        paramArr.forEach(item => {
            itemArr = item.split("=");
            // console.log(itemArr);
            query[itemArr[0]] = decodeURI(itemArr[1])
        })
        return query
    }

    let query = getUrlParams() //获取浏览器query参数
    // console.log(query);

    let recommenMain = document.getElementsByClassName('recommen-main-content')[0]
    // console.log(recommenMain);
    let info = document.getElementsByClassName('info')[0]
    //获取UL
    let carousel = document.getElementsByClassName('carousel')[0]
    // console.log(carousel);
    let X = document.getElementsByTagName('i')[0]
    // console.log(X);
    let arrLeft = document.getElementsByClassName('arrLeft')[0]
    let arrRight = document.getElementsByClassName('arrRight')[0]

    function renderProduct(res) {
        let html = '';
        let htmlImg = ''
        for (let i = 0; i < res.length; i++) {
            html += `
        <a href="#" class="shop-jump" couponProductId="${res[i].couponProductId}">
        <div>
            
            ${res[i].couponProductImg}
            
          </div>
          <div>
            <p>
            ${res[i].couponProductName}
            </p>
  
            <p>
            ${res[i].couponProductPrice}
            </p>
  
            <p>
            ${res[i].couponProductTime}
            </p>
          </div>
      </a>
        `

            htmlImg += `
        <li>${res[i].couponProductImg}</li>
        `
        }
        recommenMain.innerHTML = html
        info.innerHTML = htmlImg

        let recMainChild = recommenMain.children
        // console.log(recMainChild);
        let imgWidth = info.children[0].children[0].offsetWidth
        // console.log(imgWidth);
        let childLength = recMainChild.length
        // console.log(childLength);

        let index;
        for (let k = 0; k < recMainChild.length; k++) {
            recMainChild[k].onclick = function () {
                // console.log(123);
                carousel.style.transition = 'transform .7s ease-in-out'
                carousel.style.transform = 'translateY(0)'
                index = recMainChild[k].getAttribute('couponProductId')
                info.style.left = -index * imgWidth + 'px'
            }

        }

        arrLeft.onclick = function () {
            index--
            if (index <= 0) {
                info.style.left = 0
                alert('这是第一张')
                index = 0
            } else {
                info.style.left = -index * imgWidth + 'px'
            }
        }
        arrRight.onclick = function () {
            index++

            if (index >= childLength) {
                alert('这是在最后一张了亲')
                index = childLength
            } else {
                info.style.left = -index * imgWidth + 'px'
            }
        }

        X.onclick = function () {
            carousel.style.transition = 'transform .7s ease-in-out'
            carousel.style.transform = 'translateY(-26.666667rem)'
        }
    }

    ajax({
        url: 'http://chst.vip:1234/api/getcouponproduct',
        data: query,
        success(res) {
            res = res.result
            console.log(res);
            renderProduct(res)
        }
    })


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