function Show() {
    let container = $('.cont').addClass('w-100 p-auto');
    container.children().remove();
    $.get("/api/Knife/GetAll")
        .done((data) => {
            for (const iterator of data) {
                let imUrl = $("<img></img>").addClass('card-img-top').attr('src', iterator['imageUrl']);
                let name = $("<b></b>").text(`${iterator['name']}`);
                let mSteel = $("<li></li>").text(`MarkOfSteel: ${iterator['markOfSteel']}`);
                let lMat = $("<li></li>").text(`liningMaterial: ${iterator['liningMaterial']}`);
                let price = $("<b></b>").text(`Price - ${iterator['price']}`);
                let butt = $("<button></buton>").addClass('btn btn-warning mt-auto').text('Buy')
                    .mouseenter(function () {
                        butt.animate({
                            
                        }, 500, function () {
                            butt.addClass("btn-danger");
                        });
                })
                    .mouseleave(function () {
                        pr.animate({
                           
                        }, 100, function () {
                            butt.removeClass("btn-danger");
                        });
                });
                let pr = $("<div></div>").addClass('card p-3 m-4 text-black shadow').css('width', '15rem').append(imUrl).append(name).append(mSteel).append(lMat).append(price).append(butt)
                    .mouseenter(function () {
                        pr.animate({
                            width: '20rem'
                        }, 500, function () {
                            pr.addClass("shadow");
                        });
                    })
                    .mouseleave(function () {
                        pr.animate({
                            width: '15rem'

                        }, 100, function () {
                            pr.removeClass("shadow");
                        });
                    });
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
            $.post("/api/Authentication/Login", {
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
             url: '/api/Knife/AddKnife',
            type: 'POST',
            data: {
                id: 0,
                imageUrl: $(".url").val(),
                name: $(".nm").val(),
                
                markOfSteel: $(".mst").val(),
                liningMaterial: $(".lmt").val(),
                price: $(".prc").val(),
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