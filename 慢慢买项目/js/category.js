let main = document.getElementById("main")
console.log(main);
ajax({
    url: "http://chst.vip:1234/api/getcategorytitle",
    success(res) {
        let cateData = res.result
        let html = ""
        cateData.forEach(item => {
            html += `
                <div id="category">
                    <span style="color: green;">${item.title}</span>
                    <span>▼</span>
                </div>
                <div id="ranking">
                </div>`
        });
        main.innerHTML = html;
        let cates = document.querySelectorAll("#category")
        let ranks = document.querySelectorAll("#ranking")
        console.log(cates);
        console.log(ranks);
        
        for (let i = 0; i < cates.length; i++) {
            requestRank(cateData[i].titleId, ranks[i])
            let flag = true
            cates[i].onclick = function() {
                console.log(cates[i]);
                if (flag) {
                    ranks[i].style.display = "flex"
                    flag = !flag
                } else {
                    ranks[i].style.display = "none"
                    flag = !flag

                }
            }
        }
    }

})

function requestRank(titleId, rank) {
    ajax({
        url: "http://chst.vip:1234/api/getcategory",
        data: {
            titleid: titleId
        },
        success(res) {
            let html = ""
            let rankData = res.result
            console.log(rankData,66666);
            
            rankData.forEach(item => {
                html += `
                <div class="col-s">
                <a href="../index/bijialist.html?categoryId=${item.categoryId}">${item.category}</a>
                </div>
               
                `
            })
            rank.innerHTML = html

        } 
    })
}
