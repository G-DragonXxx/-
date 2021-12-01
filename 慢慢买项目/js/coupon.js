coupon()
function coupon (){
    let recMain = document.getElementsByClassName('recommen-main')[0]

function renderNav(res) {
    let html = ''
    for (let i = 0; i < res.length; i++) {
        html += `
        <div couponId=${res[i].couponId}>
        <img src="${res[i].couponImg}" alt="">
        <p>${res[i].couponTitle}</p>
        </div>
        `
    }
    recMain.innerHTML = html
    let recMainChild =recMain.children
    console.log(recMainChild);

    for(let k =0 ;k<recMainChild.length;k++){
        recMainChild[k].onclick=function(){
            let couponId =this.getAttribute('couponId')
            console.log(couponId);
            location.href = `couponproduct.html?couponid=${couponId}`
        }

    }

}


ajax({
    url: 'http://chst.vip:1234/api/getcoupon',
    success(res) {
        res = res.result
        console.log(res);
        renderNav(res)

    }
})



}