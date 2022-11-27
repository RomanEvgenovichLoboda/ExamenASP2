function Show() {
    let container = $('.cont').addClass('w-100 ');
    container.children().remove();
    $.get("/api/Knife/getall")
        .done((data) => {
            for (const iterator of data) {
                let imUrl = $("<img></img>").addClass('card-img-top').attr('src', iterator['imageUrl']);
                let name = $("<b></b>").text(`${iterator['name']}`);
                let mSteel = $("<h></h>").text(`MarkOfSteel: ${iterator['markOfSteel']}`);
                let lMat = $("<h></h>").text(`liningMaterial: ${iterator['liningMaterial']}`);
                let price = $("<p></p>").text(`Price - ${iterator['price']}`);
                let butt = $("<button></buton>").addClass('btn btn-warning mt-auto').text('Buy');
                let pr = $("<div></div>").addClass('card p-3 m-4 text-black').css('width', '18rem').append(imUrl).append(name).append(mSteel).append(lMat).append(price).append(butt);
                container.append(pr);
            }
        }
        );
};
var tokenKey = "accessToken";
document.addEventListener('DOMContentLoaded', () => { 
    Show();
    $(".bt1").click(() => {
        let login = $("#lg").val();
        let password = $("#ps").val();
        if (login != "" && password != "") {
            $.post("/api/Authentication/login", {
                userName: login,
                password: password,
            })
                .done(function (response) {
                    $(".login").css('display', 'none');
                    $(".admin").css('display', 'block');
                    sessionStorage.setItem(tokenKey, response.token);
                })
                .fail((response) => {
                    alert(response.status);
                });
        }
    });
    $(".bt2").click(async() => {
        const token = sessionStorage.getItem(tokenKey);
         await $.ajax({
            url: '/api/MyProduct/AddProduct',
            type: 'POST',
            data: {
                productId: 0,
                productName: $(".nm").val(),
                productDescription: $(".dsn").val(),
                productCost: $(".cst").val(),
                productStock: $(".stk").val(),
            },
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + token
            },
            success: function (data) {
                Show();
            },
            error: function (data) {
                console.error(data);
            }
        });
    });
    $(".bt3").click(() => {
        const token = sessionStorage.getItem(tokenKey);
        let id = $(".delId").val();
        $.ajax({
            url: "/api/MyProduct/RemoveProductById?id=" + id,
            type: "DELETE",
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + token
            },
            success: function (data) {
                Show();
            },
            error: function (data) {
                console.error(data);
            }
        });
    });
});