let cart = [];
let windowKey = 0;
let windowQT;

const s = (element) => document.querySelector(element);
const sA = (element) => document.querySelectorAll(element);

addRemoveActive('.one','.two','.three');
window.onresize = automaticSlider();

//MENU EVENTS
// home
s('.menuHome').addEventListener('click',()=>s('#background').scrollIntoView({behavior:'smooth'}));
// pizzas area
s('.menuPizzas').addEventListener('click',()=>s('#pizzas').scrollIntoView({behavior:'smooth'}));
// menuMobile
s('#mobileMenu-button').addEventListener('click',()=>{
    if (s('#mobileMenu').style.top == '123px') {
        s('#mobileMenu').style.top = '-1000px';
    } else {
        s('#mobileMenu').style.top = '123px'; 
    };
});

// function to create an interval for the slider to work by itself and in a responsive way 
function automaticSlider() {
    setInterval(()=>{
        if (window.innerWidth <= 1440 && window.innerWidth > 910) {
            if(s('#slider-area').style.marginLeft == '0px') {
                s('#slider-area').style.marginLeft = '-900px';
                addRemoveActive('.two','.one','.three');
            } else {
                s('#slider-area').style.marginLeft = '0px';
                addRemoveActive('.one','.two','.three');
            };
        } else if (window.innerWidth <= 910) {
            s('.dot.three').style.display = 'inline-block';
            if(s('#slider-area').style.marginLeft == '0px') {
                s('#slider-area').style.marginLeft = '-100%';
                addRemoveActive('.two','.one','.three');
            } else if (s('#slider-area').style.marginLeft == '-100%') {
                s('#slider-area').style.marginLeft = '-200%';
                addRemoveActive('.three','.two','.one');
            } else {
                s('#slider-area').style.marginLeft = '0px';
                addRemoveActive('.one','.three','.two');
            };
        } else {
            if(s('#slider-area').style.marginLeft == '0px') {
                s('#slider-area').style.marginLeft = '-1140px';
                addRemoveActive('.two','.one','.three');
            }  
            else {
                s('#slider-area').style.marginLeft = '0px';
                addRemoveActive('.one','.two','.three');
            };
    };
    },4000);
};

// function to change what button is active
function addRemoveActive(add,rmv1,rmv2) {
    s(rmv1).classList.remove('active');
    s(rmv2).classList.remove('active');
    s(add).classList.add('active');
};
// function identifying the button and then changing the slider based on it
function currentSlide(index) {
    if (window.innerWidth <= 1440 && window.innerWidth > 910) {
        if (index == 1) {
            s('#slider-area').style.marginLeft = '0px';
            addRemoveActive('.one','.two','.three');
        } else {
            s('#slider-area').style.marginLeft = '-900px';
            addRemoveActive('.two','.one','.three');
        }; 
    } else if (window.innerWidth <= 910) {
        s('.dot.three').style.display = 'inline-block';
        if(index == 2) {
            s('#slider-area').style.marginLeft = '-100%';
            addRemoveActive('.two','.one','.three');
        } else if (index == 3) {
            s('#slider-area').style.marginLeft = '-200%';
            addRemoveActive('.three','.two','.one');
        } else {
            s('#slider-area').style.marginLeft = '0px';
            addRemoveActive('.one','.three','.two');
        };
    } else {
        if (index == 1) {
            s('#slider-area').style.marginLeft = '0px';
            addRemoveActive('.one','.two','.three');
        } else {
            s('#slider-area').style.marginLeft = '-1140px';
            addRemoveActive('.two','.one','.three');
        }; 
    };
    
};
// adding each pizza in the slider
for (let i in pizzaJson) {
    let pizzaSlide = s('.models .slide').cloneNode(true);

    pizzaSlide.querySelector('.slide-img img').src = pizzaJson[i].img;
    pizzaSlide.querySelector('.slide-name').innerHTML = pizzaJson[i].name;

    s('#slider-area').append(pizzaSlide);
};

// Process of adding each pizza from the JSON to the pizza area and pizza window    
for (let i in pizzaJson) {
    let pizzaItem = s('.models .pizza').cloneNode(true);
    pizzaItem.setAttribute('data-key', i);
    pizzaItem.querySelector('.pizza-name').innerHTML = pizzaJson[i].name;
    pizzaItem.querySelector('.pizza-img img').src = pizzaJson[i].img;
    pizzaItem.querySelector('.pizza-desc').innerHTML = pizzaJson[i].description;
    pizzaItem.querySelector('.pizza-price').innerHTML = 'R$' + pizzaJson[i].price.toFixed(2);
    s('#pizzas-area').append(pizzaItem);

    pizzaItem.querySelector('.pizza-img a').addEventListener('click', (e)=>{
        e.preventDefault(); // stop the page from reloading
        let key = e.target.closest('.pizza').getAttribute('data-key');
        windowQT = 1;
        windowKey = key;
        windowSizeIndex = 2;
        // relocating JSON info to the Modal Window
        s('.window-img img').src = pizzaJson[key].img;
        s('.window-name').innerHTML = pizzaJson[key].name;
        s('.window-desc').innerHTML = pizzaJson[key].description;
        s('.prices').innerHTML = 'R$' + pizzaJson[key].price.toFixed(2);
        s('.size-select.selected').classList.remove('selected');
        // selecting the Large size by default
        sA('.size-select').forEach((size, sizeIndex) => {
            if (sizeIndex == 2) {
                size.classList.add('selected');
                s('.prices').innerHTML = 'R$' + Number(pizzaJson[key].price * windowQT).toFixed(2);
            };
            size.querySelector('.size').innerHTML = pizzaJson[key].sizes[sizeIndex];
        });
        // pizza size being selected
        sA('.size-select').forEach((size,sizeIndex)=>{
            size.addEventListener('click',()=>{
                s('.size-select.selected').classList.remove('selected');
                size.classList.add('selected');
                windowSizeIndex = sizeIndex;
                if (sizeIndex == 0) {
                    s('.prices').innerHTML = 'R$' + Number((pizzaJson[key].price - 10) * windowQT).toFixed(2);
                } else if(sizeIndex == 1) {
                    s('.prices').innerHTML = 'R$' + Number((pizzaJson[key].price - 5) * windowQT).toFixed(2);
                } else {
                    s('.prices').innerHTML = 'R$' + Number(pizzaJson[key].price * windowQT).toFixed(2);
                };    
            }); 
        });
        // adding to the quantity of pizzas
        s('.window-qt').innerHTML = Number(windowQT);
        //making the window appear with an animation
        s('.pizza-window').style.opacity = '0';
        s('.pizza-window').style.display = 'flex';
        setTimeout(()=>{
            s('.pizza-window').style.opacity = '1';
        },100);
    });
};

// MODAL WINDOW EVENTS
// event to close the Modal window when clicking on 'cancelar' or 'voltar'
function closeWindow() {
    s('.pizza-window').style.opacity = '0';
    setTimeout(()=> {
        s('.pizza-window').style.display = 'none';
    },100);
};
// events to add or subtract from the window quantity
s('.window-qtminus').addEventListener('click',()=>{ 
        windowQT--;
        s('.window-qt').innerHTML = Number(windowQT);
        if (windowQT < 1) {
            closeWindow();
        };
        priceWindowUpdate();
});
s('.window-qtplus').addEventListener('click',()=>{
        windowQT++;
        s('.window-qt').innerHTML = Number(windowQT);
        priceWindowUpdate();
});
// function to update the Modal window price based on the quantity
function priceWindowUpdate() {
    if (windowSizeIndex == 0) {
        s('.prices').innerHTML = 'R$' + Number((pizzaJson[windowKey].price - 10) * windowQT).toFixed(2);
    } else if(windowSizeIndex == 1) {
        s('.prices').innerHTML = 'R$' + Number((pizzaJson[windowKey].price - 5) * windowQT).toFixed(2);
    } else {
        s('.prices').innerHTML = 'R$' + Number(pizzaJson[windowKey].price * windowQT).toFixed(2);
    };    
};
// CART EVENTS
// getting the pizzas info to sent to the cart when clicking
s('.confirm-btn').addEventListener('click', ()=>{
    closeWindow();
    let size = Number(s('.size-select.selected').getAttribute('data-key'));
    let identifier = pizzaJson[windowKey].id+'@'+size;
    let key = cart.findIndex(item => item.identifier == identifier);

    if (key > -1) {
        cart[key].qt += windowQT;
    }else {
        cart.push({
            identifier,
            id:pizzaJson[windowKey].id,
            size,
            qt:windowQT
        });
    };
    updateCart();
});
// adding the event of opening and closing the cart when clicking on the 'Cart' menu button
s('.menuCart').addEventListener('click',()=>{
    if(cart.length == 0 && s('#cart').style.display == 'none') {
        s('#cart').style.opacity = '0';
        s('#cart').style.display = 'block';
        setTimeout(()=>{
            s('#cart').style.opacity = '1';
        },100);
        s('.cart-area').innerHTML = '';
        s('#pizzas-area').style.width = '60%';
        s('#pizzas-area').style.margin = '0';
    } else if(cart.length > 0 && s('#cart').style.display == 'none') {
        updateCart();
    } else {
        s('#cart').style.display = 'none';
        s('#pizzas-area').style.width = '80%';
        s('#pizzas-area').style.margin = 'auto';
    }
});
// getting the JSON pizza info to the cart
function updateCart() {

    if (cart.length > 0) {
        s('#cart').style.opacity = '0';
        s('#cart').style.display = 'block';
        setTimeout(()=>{
            s('#cart').style.opacity = '1';
        },100);
        s('.cart-area').innerHTML = '';
        s('#pizzas-area').style.width = '60%';
        s('#pizzas-area').style.margin = '0';

        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for (let i in cart) {
            let pizzaCart = pizzaJson.find(item => item.id == cart[i].id);

            subtotal += pizzaCart.price * cart[i].qt;

            let cartItem = s('.models .cart').cloneNode(true);
            let pizzaSizeName;
            switch(cart[i].size) {
                case 0:
                    pizzaSizeName = '(P)';
                    break;
                case 1:
                    pizzaSizeName = '(M)';
                    break;
                case 2:
                    pizzaSizeName = '(G)';
                    break;  
            };
            let pizzaName = `${pizzaCart.name} ${pizzaSizeName}`;

            cartItem.querySelector('.cart-img img').src = pizzaCart.img;
            cartItem.querySelector('.cart-name').innerHTML = pizzaName;
            cartItem.querySelector('.cart-qt').innerHTML = cart[i].qt;
            cartItem.querySelector('.cart-qtplus').addEventListener('click',()=>{
                cart[i].qt++;
                updateCart();
            });
            cartItem.querySelector('.cart-qtminus').addEventListener('click',()=>{
                if (cart[i].qt > 1) {
                   cart[i].qt--; 
                } else {
                    cart.splice(i,1);
                };
                updateCart();
            });
            s('.cart-area').append(cartItem);
        };
        desconto = subtotal * 0.10;
        total = subtotal - desconto;

        s('.cart-sub span').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        s('.cart-disc span').innerHTML = `R$ ${desconto.toFixed(2)}`;
        s('.cart-total span').innerHTML = `R$ ${total.toFixed(2)}`;
    } else {
        // close the cart window as well as cleaning all the information that was previously stored on it
        s('#cart').style.display = 'none';
        s('#pizzas-area').style.width = '80%';
        s('#pizzas-area').style.margin = 'auto';
        s('.cart-sub span').innerHTML = `R$ --`;
        s('.cart-disc span').innerHTML = `R$ --`;
        s('.cart-total span').innerHTML = `R$ --`;
    };

};
// editint the 'Cancelar' button with an event
s('#cart-cancel').addEventListener('click', ()=>{
    s('#cart').style.display = 'none';
    cart.splice(0,cart.length);
    s('#pizzas-area').style.width = '80%';
    s('#pizzas-area').style.margin = 'auto';
    s('.cart-sub span').innerHTML = `R$ --`;
    s('.cart-disc span').innerHTML = `R$ --`;
    s('.cart-total span').innerHTML = `R$ --`;
});


        
    
