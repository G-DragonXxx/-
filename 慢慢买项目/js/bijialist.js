
    let categoryid=location.search.slice(1).split("=")[1];
   $.ajax({
        url: "http://chst.vip:1234/api/getproductlist",
        data: {
            
            categoryid
        },
        
        success(res) {
            // console.log(titleId);
            let html = ""
            let rankData = res.result
            console.log(rankData)

            rankData.forEach(item => {
              html +=`
              
            <li>
                <a href="../index/bijiadate.html?productId=${item.productId}">
                    <div>
                      <div id="left"> ${item.productImg}</div>
                       <h4 id="nameg">${item.productName}</h4>
                       <p id="price">${item.productPrice}</p>
                       <span class="scx">${item.productQuote}</span>
                       <i class="scx">${item.productCom}</i>
                    </div>
                     
                </a>
            </li>
        
              `
                    
                           
             
            })
           $("#section").html(html)

        } 
    })
