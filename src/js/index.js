//npm run build
import '../scss/styles.scss';

let c = console;
const cartbox = document.querySelector(".cart-box");
const cart = document.querySelector('.fa-shopping-cart');
const AddCart = document.querySelectorAll("#Add-Cart");
const CheckOut_btn = document.querySelectorAll("#CheckOut");
let qty = 1;

class item {
    constructor(id, name, img, desc, price, qty) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.desc = desc;
        this.price = price;
        this.qty = qty;
    }

}


class Map_Item {
    static cartMap = new Map();

    static getCartMap() {
        let cartMap = Map_Item.cartMap;
        return cartMap;
    }

    static StoreItem(id, item) {
        let Session_Item = JSON.parse(sessionStorage.getItem(id));
        let itm = item;
        if (Session_Item) {
            let qty = Session_Item.qty;
            qty += 1;
            itm.qty = qty;
            sessionStorage.setItem(id, JSON.stringify(itm));

        } else {
            sessionStorage.setItem(id, JSON.stringify(itm));
        }

    }

    static RemoveItem(id) {
        let Session_Item = JSON.parse(sessionStorage.getItem(id));
        if (Session_Item) {
            let itm = Session_Item;
            if (itm.qty > 1) {
                let qty = itm.qty;
                qty -= 1;
                itm.qty = qty;
                sessionStorage.setItem(id, JSON.stringify(itm));
            }
            else {
                sessionStorage.removeItem(id);
            }
        } else {
            c.log("Item Not Found");
        }

    }

}






//Cart's Item Loaded
$(document).ready(function () {
    UpdateCounter();
    Cal_Total();
    for (var i = 0; i <= 3; i++) {
        if (sessionStorage.getItem(i)) {
            UpdateCart(i);
            document.querySelectorAll("#Cart-Item-Close").forEach(button => {
                button.addEventListener("click", RemoveItem)
            })
        }
    }
});


//AddToCart
function AddToCart(e) {
    const id = e.target.parentElement.parentElement.parentElement.getAttribute("data-id");
    let name = e.target.parentElement.children[0].textContent;
    const img = e.target.parentElement.previousElementSibling.src;
    let price = e.target.parentElement.children[0].textContent;
    const desc = e.target.parentElement.children[1].textContent;
    price = price.replace("Red - ", "");
    price = price.replace("Yellow - ", "");
    price = price.replace("Blue - ", "");
    name = name.replace(" - " + price, "");
    const itm = new item(id, name, img, desc, price, qty);
    let Session_item = JSON.parse(sessionStorage.getItem(id));
    Map_Item.StoreItem(id, itm);
    UpdateCounter();
    UpdateQty(id);
    Cal_Total();
    if (!Session_item) {
        UpdateCart(id);
    }

}




//RemoveItem
function RemoveItem(e) {
    const id = e.target.parentElement.parentElement.parentElement.getAttribute("id");
    let Session_Item = JSON.parse(sessionStorage.getItem(id));
    Map_Item.RemoveItem(id);
    if (Session_Item.qty <= 1) {
        document.getElementById(id).remove();
    }
    UpdateCounter();
    UpdateQty(id)
    Cal_Total();


}






function UpdateQty(id) {
    let item = JSON.parse(sessionStorage.getItem(id));
    if (item) {
        $("#" + id + "").find(".fw-light").text("x" + item.qty);
    }
}


function UpdateCounter() {
    let Counter = 0;
    for (var i = 0; i <= 3; i++) {
        let item = JSON.parse(sessionStorage.getItem(i));
        if (item) {
            Counter += item.qty;
        }
    }
    $(".Cart-Item-Count").text(Counter);
}


function UpdateCart(id) {
    let item = JSON.parse(sessionStorage.getItem(id));
    $("#Cart-Item").append('<div class="col" id="' + item.id + '" name="cart_item"><div style="position:relative;"><img src="' + item.img + '" class="card-img-top" ' +
        'alt="..." style="height: 120px;width:120px;"><div style="position:absolute;left:105px;bottom:100px;">' +
        '<i class="fa fa-times" id="Cart-Item-Close"></i></div></div><div> <b>'
        + item.name + '</b> <span class="fw-light" id="">x' + item.qty + '</span>' +
        ' <span class="Cart-Item-Price">' + item.price + '</span> </div></div>');
}


function Cal_Total() {
    let Total = 0;
    for (var i = 0; i <= 3; i++) {
        let item = JSON.parse(sessionStorage.getItem(i));
        if (item) {
            let price = item.price;
            price = price.replace("$", "");
            Total += parseInt(item.qty * price);
        }
    }
    $("#Cart-Item-Total").text(Total);
    setCookie("total", 0, 0);
    setCookie("total", Total, 10);

}




cart.addEventListener("click", () => {
    if (cartbox.classList.contains('hide')) {
        cartbox.classList.remove('hide')
    } else {
        cartbox.classList.add('hide')
    }
})

function SetCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setDate(date.getTime + (days * 1000 * 60 * 60 * 24));
        expires = "expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function DeleteCookie(cname) {
    const d = new Date();
    d.setTime(d.getTime() + (0));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=;" + expires + ";path=/";
}




function sendData(total) {
    var data = {
        total: total,
    };

    var xhr = new XMLHttpRequest();

    //👇 set the PHP page you want to send data to
    xhr.open("POST", "stripe.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");


    //👇 send the data
    xhr.send(JSON.stringify(data));
}


AddCart.forEach(button => {
    button.addEventListener("click", AddToCart)
})






