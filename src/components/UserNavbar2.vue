<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light navbar-scroll fixed-top shadow-sm">
            <div class="container">
                <router-link class="navbar-brand" to="/">
                        <img height="50" class="" src="@/assets/logo2.png" @click="btnStatus = '/main'">
                </router-link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>                              
                <SearchInput class="hideobj-md showobj" @searchProductOut="searchProduct"></SearchInput>
                

<!--                 <div class="btn-group hideobj-md showobj" v-if="cartArrayToLS !=0">
                    <button type="button" class="btn btn-sm btn-outline-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="getCartFromLS">
                        <i v-if="status.loading != 'cart'" class="fas fa-cart-arrow-down fa-lg"></i>
                        <i v-if="status.loading == 'cart'" class="fas fa-spinner fa-pulse"></i>
                    </button>  
                    <div class="dropdown-menu dropdown-menu-right px-2" @click.stop="">
                        <div class="dropdown-item px-0 d-flex" v-for="item in cartArrayToLS" :key="item.id">
                            <div class="d-inline col" style="overflow-x: hidden;">{{ item.product.title }}...</div>
                            <div class="d-inline col-2 text-right">{{ item.qty }} /件</div>
                            <div class="d-inline col-2">{{ item.product.price * item.qty | currency }}</div>
                            <div class="d-inline col-2 text-right mousePointer" @click="removeCartItemToSL(item)">
                                <i v-if="status.itemId !== item.id" class="far fa-trash-alt"></i>
                                <i v-if="status.itemId === item.id" class="fas fa-spinner fa-pulse"></i>
                            </div>
                        </div>
                        <div class="dropdown-divider"></div>
                        <div class="dropdown-item h6 text-right" href="#">合計：{{ carts.total | currency }}元</div>
                    </div>
                    <div class="red-dots" v-if="cartsNum != 0">{{ cartsNum }}</div>
                    <button class="btn btn-sm btn-danger my-2 my-sm-0" type="submit" @click="goToOrder">
                        <i class="fas fa-dollar-sign"></i>結帳
                    </button>
                </div> -->
                

                <div class="collapse navbar-collapse" id="navbarSupportedContent">                
                    <ul class="navbar-nav mr-auto ml-3 justify-content-around">
                        <li class="nav-item px-3" @click="getCategoryToShow" :class="{'selected': btnStatus == '/women'}">
                            <!-- <router-link class="nav-link h6" to="/women">WOMEN</router-link> -->
                            <router-link class="nav-link h6" to="/women">
                                WOMEN
                            </router-link>
                        </li>
                        <li class="nav-item px-3" @click="getCategoryToShow" :class="{'selected': btnStatus == '/men'}">
                            <router-link class="nav-link h6" to="/men">
                                MEN
                            </router-link>
                        </li>
                        <li class="nav-item px-3" @click="getCategoryToShow" :class="{'selected': btnStatus == '/kids'}">
                            <router-link class="nav-link h6" to="/kids">
                                KIDS
                            </router-link>
                        </li>
                        <li class="nav-item px-3" @click="getCategoryToShow" :class="{'selected': btnStatus == '/baby'}">
                            <router-link class="nav-link h6" to="/baby">
                                BABY
                            </router-link>
                        </li>
                        <li class="nav-item px-3" @click="getCategoryToShow" :class="{'selected': btnStatus == '/sports'}">
                            <router-link class="nav-link h6" to="/sports">
                                SPORTS
                            </router-link>
                        </li>
                    </ul>
                </div>          
                <SearchInput class="hideobj" @searchProductOut="searchProduct"></SearchInput>
                



                <div class="btn-group hideobj ml-3" v-if="cartArrayToLS !=0">
                    <!--Local Storage-->
                    <!--<button type="button" class="btn btn-sm btn-outline-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="getCart"> -->
                    <button type="button" class="btn btn-sm btn-outline-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="getCartFromLS">
                    <!--Local Storage-->
                        <i v-if="status.loading != 'cart'" class="fas fa-cart-arrow-down fa-lg"></i>
                        <i v-if="status.loading == 'cart'" class="fas fa-spinner fa-pulse"></i>
                    </button>  
                    <div class="dropdown-menu dropdown-menu-right px-2 dropdown-cart-menu" @click.stop="">
                        <div class="dropdown-cart-item px-0 d-flex" v-for="item in cartArrayToLS" :key="item.id">
                            <div class="d-inline col" style="overflow-x: hidden;">{{ item.product.title }}...</div>
                            <div class="d-inline col-2 text-right">{{ item.qty }} /件</div>
                            <div class="d-inline col-2">{{ item.product.price * item.qty | currency }}</div>
                            <div class="d-inline col-2 text-right mousePointer" @click="removeCartItemToSL(item)">
                                <i v-if="status.itemId !== item.id" class="far fa-trash-alt"></i>
                                <i v-if="status.itemId === item.id" class="fas fa-spinner fa-pulse"></i>
                            </div>
                        </div>
                        <div class="dropdown-divider"></div>
                        <div class="dropdown-cart-item h6 text-right" href="#">合計：{{ carts.total | currency }}元</div>
                    </div>
                    <div class="red-dots" v-if="cartsNum != 0">{{ cartsNum }}</div>
                    <button class="btn btn-sm btn-danger my-2 my-sm-0" v-if="cartsNum != 0" type="submit" @click="goToOrder">
                        <i class="fas fa-dollar-sign"></i>結帳
                    </button>
                </div>

                
            </div>
        </nav>
    </div>
</template>


<script>
import $ from 'jquery' // Import js file
import SearchInput from './SearchInput'

export default {
    components: {
        SearchInput,
    },
    data() {
        return {
            btnStatus: "",
            carts: {},
            status: {
                itemId: "",
                cartId: "",
                loading: "",
            },
            cartArrayToLS: [],
            // searchValue: "",
            // searchStatus: "product",
        };
    },
    methods: {
        //Local Storage
        // getCart() {
        //     const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
        //     const vm = this;
        //     vm.status.loading = "cart";
        //     this.$http.get(api).then((response) => {
        //         console.log("getCart", response.data.data);
        //         vm.carts = response.data.data;
        //         vm.status.loading = "";
        //     });
        // },
        getCartFromLS() {
            const vm = this;
            if (JSON.parse(localStorage.getItem('Cart'))) {
                vm.cartArrayToLS = JSON.parse(localStorage.getItem('Cart'));
                const total = vm.cartArrayToLS.reduce( (prev, item, index) => {
                    // console.log(prev, item.product.price, item.qty, index);
                    return prev + (item.product.price * item.qty);
                }, 0)
                vm.carts.total = total;
            }
            console.log("vm.cartArrayToLS",vm.cartArrayToLS)
        },
        //Local Storage
        //Local Storage
        // removeCartItem(item) {
        //     const id = item.id;
        //     const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
        //     const vm = this;
        //     vm.status.itemId = item.id;
        //     this.$http.delete(api).then((response) => {
        //         vm.$bus.$emit('message:push', response.data.message, 'success');
        //         // this.getCart();
        //         vm.status.itemId = "";
        //     });
        // },
        removeCartItemToSL (item) {
            const vm = this;
            vm.status.itemId = item.product.id;
            console.log("item",item)
            const newIndex = vm.cartArrayToLS.indexOf(item);
            vm.cartArrayToLS.splice(newIndex, 1);
            localStorage.setItem("Cart", JSON.stringify(vm.cartArrayToLS));
            vm.$bus.$emit('message:push', `已移除 ${item.product.title} 商品`, 'success');
            vm.getCartFromLS();
            vm.status.itemId = "";
        },
        //Local Storage
        getCategoryToShow() {
            const str1 = event.target.childNodes[0].textContent;
            console.log(event)
            const str2 = str1.toString();
            const str3 = str2.trim();
            const str4 = str3.toLowerCase();
            const vm = this;
            vm.btnStatus = `/${str4}`;
            console.log("str4",str4)
            // vm.$bus.$emit('getNavCategory', str4);
        },
        goToOrder() {
            $('.dropdown-menu').dropdown('hide');
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
            const vm = this;
            const timestamp = Math.floor(Date.now());
            let count = 0;
            vm.cartArrayToLS.forEach((element) => {
                let cart = {
                    product_id: element.product.id,
                    qty: element.qty
                }; 
                this.$http.post(api, { data: cart }).then((response) => {
                    console.log(response.data)
                    if (response.data.success) {
                        count++;
                    }
                    if (vm.cartArrayToLS.length === count) {
                        vm.cartArrayToLS = [];
                        localStorage.setItem("Cart", JSON.stringify(vm.cartArrayToLS));
                        vm.getCartFromLS();
                        vm.btnStatus = "";
                        // vm.$router.push(`/`);
                        vm.$router.push(`/order/${timestamp}`);
                    }
                    vm.status.cartId = "";
                });
            });
        },
        searchProduct(value1, value2) {
            if (value2=== "product") {
                this.$router.push(`/search/${value1}`);
            } else if (value2 === "orderNum") {
                this.$router.push(`/order-check/${value1}`);
            }
        }
    },
    computed: {
        cartsNum() {
            //Local Storage
            if (this.cartArrayToLS) {
                return this.cartArrayToLS.length;
            } else {
                return 0;
            }
            //Local Storage
        }
    },
    created() {
        const vm = this;
        //Local Storage
        // vm.getCart();
        // vm.$bus.$on('getCart:push', () => {
        //     vm.getCart();
        // });
        vm.getCartFromLS();
        vm.$bus.$on('getCartLS:push', () => {
             vm.getCartFromLS();
        });
        //Local Storage
        this.btnStatus = this.$router.history.current.path;
        console.log("btnStatus",this.btnStatus)
        $(window).bind('scroll resize', function() {
            var $this = $(this);
            var $this_Top = $this.scrollTop();
            if ($this_Top > 150) {
                // $('.navbar-scroll').stop().animate({ top: "0px" });
                $(".navbar-scroll").addClass("navbar-addStyle");
            } else {
                // $('.navbar-scroll').stop().animate({ top: "0px" });
                $(".navbar-scroll").removeClass("navbar-addStyle");
            }
        }).scroll();
        $('.carousel').carousel();
    },
    beforeDestroy () {

    },
}
</script>

<style scoped>
.navbar {
    height: 100px;
    background: white \9;
    filter: alpha(opacity=80) \9;
    background-color: rgba(255, 255, 255, .8);
    -webkit-transition: all .5s ease-in-out;
    -moz-transition: all .5s ease-in-out;
    -o-transition: all .5s ease-in-out;
    transition: all .5s ease-in-out;
}

.navbar-addStyle {
    height: 70px;
    background: white \9;
    filter: alpha(opacity=100) \9;
    background-color: rgba(255, 255, 255, 1);
}

.navbar-brand {
    padding-top: 0rem;
    padding-bottom: 0rem;
    padding-right: 15px;
    background: white \9;
    filter: alpha(opacity=0) \9;
    background-color: rgba(255, 255, 255, 0);
}

.nav-item {
    box-sizing: border-box;
    margin: 0 5px;
    transition: all 0.5s;
    position: relative;
    border: solid #fff 5px;
    padding: 0;
}

.nav-item:hover {
    border-bottom: 5px #FAD0D0 solid;
}

.nav-item .nav-link {
    margin: 0;
}

.selected {
    background: #FFEEEA;
    border-bottom: 5px #FAD0D0 solid;
}

.dropdown-cart-menu {
    background-color: #EFEBE6;
    opacity: 0.85 !important;
    width: 450px !important;
    min-height: 10px !important;
}

.dropdown-cart-item:hover {
    background-color: #FFF;
}

.dropdown-cart-item:active {
    color: #212529;
    background-color: #EFEBE6;
}

.dropdown-search-menu {
    min-width: 100px;
    right: 0;
}

.dropdown-search-item:active {
    color: #212529;
    background-color: #FFF;
}

.dropdown-divider {
    border-top: 1px solid #4d3126;
}

.hideobj-md {
    display:none;
}

.red-dots {
    height: 18px;
    width: 18px;
    background: #fff;
    text-align: center;
    border-radius: 50%;
    border: #fff 1px solid;
    background: #dc3545;
    color: #fff;
    line-height: 16px;
    /*position: relative;*/
    position:absolute;
    top: -8px;
    left: -8px;
    z-index: 1500;
    transition: all .5s ease-in-out;
}

.btn-group:hover>.red-dots {
    border: #dc3545 1px solid;
    background: #fff;
    color: #dc3545;
}

/*-----media max-width: 1199.98-----*/
@media (max-width: 1250px) {
.nav-item {
    margin: 0;
    padding: 0;
}

/*.input-width {
    width: 100px;
}*/

}

/*-----media max-width: 1199.98-----*/

/*-----media max-width: 991.98-----*/
@media (max-width: 991.98px) {
.navbar-collapse {
    background: white \9;
    filter: alpha(opacity=100) \9;
    background-color: rgba(255, 255, 255, 1);
    padding-bottom:30px;  
}

.nav-item {
    box-sizing: border-box;
    margin: 0;
    border: none;
}

.nav-item:hover {
    border-bottom: none;
}

.navbar-expand-lg .navbar-nav .nav-link {
    padding-right: 0;
    padding-left: 0;
}

/*.input-width {
    width: 190px;
}*/

.red-dots {
    top: -8px;
    left: -8px;
}

.hideobj {
    display:none;
}

.showobj {
    display:block;
}

}
/*-----media max-width: 991.98-----*/

/*-----media max-width: 575.98-----*/
@media (max-width: 575.98px) {
/*.input-width {
    width: 130px;
}*/

.red-dots {
    top: 0px;
    left: -8px;
}
}
/*-----media max-width: 575.98-----*/


.mousePointer {
    cursor: pointer;
}
</style>