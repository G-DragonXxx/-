brandTitle()
function brandTitle (){
    let recMain = document.getElementsByClassName('recommen-main-content')[0]
// console.log(recMain);
let result;

let mainLis = document.getElementsByClassName('mainLis')
// console.log(mainLis);

function renderList(result) {
    let html = ''
    result.forEach(item => {
        // console.log(item);
        html += `
        <div class="recMainLis" >
        <li class="listTitle" brandTitleId=${item.brandTitleId}>
          <span>${item.brandTitle}</span>
          <span>▼</span>
        </li>
        <div class="mainLis">

        </div>
      </div>
        `
    })
    recMain.innerHTML = html

    let listTitle = document.getElementsByClassName('listTitle')
    // console.log(listTitle);

    for (let i = 0; i < listTitle.length; i++) {

        let brandTitleId = listTitle[i].getAttribute('brandTitleId')

        mainLis[brandTitleId].innerHTML = ''
        listTitle[i].onclick = function () {
            // console.log(mainLis[brandTitleId].innerHTML);
            if (mainLis[brandTitleId].innerHTML) {
                // console.log(123);
                mainLis[brandTitleId].innerHTML = ''
            } else {

                ajax({
                    url: 'http://chst.vip:1234/api/getbrand',
                    data: {
                        brandtitleid: brandTitleId
                    }
                }).then(res => {
                    res = res.result
                    console.log(res);
                    let htmlLis = ''
                    for (let k = 0; k < res.length; k++) {
                        htmlLis += `
                        <div class="mainLisChild" brandId="${res[k].brandId}"  brandName="${res[k].brandName}">
                        <li>
                          <span>${k}</span>
                          <b>${res[k].brandName}</b>
                        </li>
                        <p>
                       ${res[k].brandInfo}
                        </p>
                        </div>
                        `
                    }
                    // console.log(mainLis[brandTitleId]);
                    mainLis[brandTitleId].innerHTML = htmlLis
                    let mainLisChild = document.getElementsByClassName('mainLisChild')
                    // console.log(mainLisChild);

                    for (let i = 0; i < mainLisChild.length; i++) {
                        mainLisChild[i].onclick = function () {
                            // console.log(123);
                            let brandId = this.getAttribute('brandId')
                            console.log(brandId);
                            let brandName = this.getAttribute('brandName')
                            console.log(brandName);

                            location.href=`brand.html?brandtitleid=${brandId}&brandName=${brandName}`

                        }
                    }
                })
            }
        }
    }
}

ajax({
    url: 'http://chst.vip:1234/api/getbrandtitle'
}).then(res => {
    result = res.result
    console.log(result);
    renderList(result)
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