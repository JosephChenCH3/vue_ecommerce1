<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <div class="row">
            <div class="sidebar-sticky col-md-2 col-sm-12 col-xs-12 make-me-sticky accordion mousePointer" id="sidebar">
                <div class="col-md-12 col-sm-4 col-xs-4 mb-2 hideobj" v-for="(itemt,it) in getTypeItem" :key="itemt.id">   
                    <div class="collapsed" 
                        data-toggle="collapse" :data-target="`#${itemt.id}`" aria-expanded="true" :aria-controls="itemt.id">
                        <i class="fas fa-tshirt text-light300 px-1"></i>
                        <span class="text-muted">{{ itemt.type }}</span>
                    </div>
                    <ul class="nav flex-column collapse" :id="itemt.id" aria-labelledby="headingOne" data-parent="#sidebar">
                        <li class="nav-item col-lg-12 seriesStyle" v-for="(items,is) in getSeriesItem" :key="items.id">
                            <a class="ml-3" href="#" @click="getSeries(items.series)" v-if="items.type == itemt.type">
                                {{ items.series }}
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="container mb-3 hideobj-md showobj">
                    <select class="custom-select" id="inputGroupSelect01">
                        <optgroup value="${itemt.id}-sm" v-for="(itemt,it) in getTypeItem" :key="`${itemt.id}-sm`">
                            <option disabled>{{ itemt.type }}</option>
                            <option value="items" v-for="(items,is) in getSeriesItem" :key="`${items.id}-sm`" v-if="items.type == itemt.type">
                                
                                <a href="#">{{ items.series }}</a>

                            </option>
                        </optgroup>
                    </select>
                </div>
            </div>
            <div class="col-md-10 col-sm-12 px-3 ml-auto">
                <div class="card mr-auto" style="margin-bottom: 30px;">
                    <img :src="require(`@/assets/categorypic${productCategoryImage}.jpg`)" class="card-img-top" alt="...">
                </div>
                <div class="h4" style="margin-bottom: 30px;" v-if="productCategoryImage == '/search'">
                    搜尋結果：
                    <span v-if="productShowArrayLength ==0">無此商品</span>
                </div>
                <div class="row">
                    <div class="col-lg-3 col-md-6 col-sm-6" v-for="item in products" style="margin-bottom: 30px;">
                        <div class="card shadow-sm border-2">
                            <div class="image-rwd mousePointer" :style="{ backgroundImage: `url(${ item.imageUrl })` }" @click="goProductDetail(item)">
                            </div> 
                            <div class="card-body">
                                <div class="text-dark text-center mousePointer" style="height: 42px" @click="goProductDetail(item)">
                                    <span class="badge badge-pill ml-2 text-white bg-danger" v-if="item.stock < 5">熱銷</span>
                                    {{ item.title }}</div>
                                <div class="text-center mb-2"><!--justify-content-between align-items-baseline -->
                                    <div class="d-inline" v-if="!item.price">{{ item.origin_price | currency }}</div>
                                    <del class="d-inline" v-if="item.price">{{ item.origin_price | currency}}</del>
                                    <div class="d-inline ml-2" :class="{ 'text-danger': item.origin_price }" v-if="item.price">NT{{ item.price | currency}}</div>
                                </div>      
                                <div class="text-center">
                                    <!--Local Storage-->
                                    <!-- <button type="button" class="btn btn-outline-danger btn-sm col-6" @click.stop="addCart(item.id)"> -->
                                    <button type="button" class="btn btn-outline-danger btn-sm col-6" 
                                        v-if="item.stock != 0" @click.prevent="addCartToLS(item)">
                                    <!--Local Storage-->
                                        <i class="fas fa-spinner fa-pulse" v-if="status.cartId == item.id"></i>
                                        <i class="fas fa-cart-plus" v-if="status.cartId != item.id"></i>
                                    </button>
                                    <button type="button" class="btn btn-outline-danger btn-sm col-6" v-if="item.stock == 0">
                                        已售完
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 text-center text-lativbg" v-if="productShow.status">
                        <i class="fas fa-chevron-down fa-2x arrow-animate"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import $ from 'jquery' // Import js file

export default {
    components: {

    },
    data() {
        return {
            products: [],
            productsOriginal: [],
            productCategory: "",
            productSeries: {status: "", value:""},
            productCategoryImage: "",
            productShow: {count: 4, status: true},
            productShowArrayLength: "",
            categoryName: "women,men,kids,baby,sports",
            isLoading: false,
            status: {
                loading: false,
                cartId: ""
            },
            cartArrayToLS: [],
        };
    },
    methods: {
        getProducts(value, valueS) {
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
            // const api = `${process.env.VUE_APP_APIPATH}/api/casper/products/all`;
            const vm = this;
            let array = [];
            let arrayScroll = [];
            vm.isLoading = true;
            this.$http.get(api).then((response) => {
                console.log("getProducts", response.data);
                vm.isLoading = false;
                array =  response.data.products; 
                if ( vm.categoryName.indexOf(value) != -1) {
                    let arraySeries = array.filter( (element) => { return (element.category == value) && (element.is_enabled === 1) });
                    vm.productsOriginal = Object.assign([], arraySeries);
                    console.log("AAA", vm.productsOriginal.length);
                    if (vm.productSeries.status == "series") {
                        arrayScroll = arraySeries.filter( (element) => { return (element.series == valueS) });
                    } else {
                        arrayScroll = arraySeries;
                    }
                } else {
                    arrayScroll = array.filter( (element) => { return ((element.title.indexOf(value)!= -1) || (element.type.indexOf(value)!= -1) || (element.series.indexOf(value)!= -1)) && (element.is_enabled === 1) });
                }   
                vm.productShowArrayLength = arrayScroll.length
                if(vm.productShowArrayLength <= vm.productShow.count) {
                    vm.productShow.status = false;
                }
                // vm.products = arrayScroll;
                vm.products = arrayScroll.splice(0, vm.productShow.count);
            });
        },
        async goProductDetail(item) {
            const vm = this;
            this.loading = true;
            vm.$router.push(`/product-detail/${item.id}`);
            this.loading = false;
        },
        getSeries(item) {
            this.productSeries.status = "series";
            this.productSeries.value = item;
            this.productShow.count = 4;
            this.productShow.status = true;
            const value = this.productCategory.split("/category/").join("");  
            this.getProducts(value, item);
            console.log(value, item);
        },
        //Local Storage
        // addCart(id, qty = 1) {
        //     const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
        //     const vm = this;
        //     const cart = {
        //         product_id: id,
        //         qty,
        //     };
        //     console.log("id", id, "qty", qty)
        //     vm.status.cartId = id;
        //     this.$http.post(api, { data: cart }).then((response) => {
        //         console.log("addCart", response.data);
        //         vm.$bus.$emit('message:push', response.data.message, 'success');
        //         vm.$bus.$emit('getCart:push');
        //         vm.status.cartId = "";
        //     });
        // },
        addCartToLS(item, qty = 1) {
            const vm = this;
            // vm.status.cartId = item.id;
            if (localStorage.getItem("Cart")) {
                vm.cartArrayToLS = JSON.parse(localStorage.getItem('Cart'));
            }
            let hadProduct = true;
            const timestamp = Math.floor(Date.now());
            const cart = {
                product: item ,
                qty,
                timestamp,
            };
            vm.cartArrayToLS.filter( (element)=> {
                console.log("element", element, "element.id", element.product.id, "item", item.id);
                if(element.product.id == item.id) {
                    return hadProduct = false;
                }
            }); 
            console.log("hadProduct", hadProduct);   
            if ( hadProduct) {
                vm.cartArrayToLS.push(cart);
                localStorage.setItem("Cart", JSON.stringify(vm.cartArrayToLS));
                vm.$bus.$emit('getCartLS:push');
                vm.$bus.$emit('message:push', `已加入購物車`, 'success');
                hadProduct = false;
                vm.status.cartId = "";
            } else {
                vm.$bus.$emit('message:push', `購物車內已有此商品`, 'warning');
                vm.status.cartId = "";
            }
        },
        //Local Storage
        scrollToLoading() {
            const vm = this;
            const scrollTop = $(window).scrollTop();
            // console.log("scrollTop", scrollTop);
            const bodyHeight = $('body').height();
            //console.log("bodyHeight", bodyHeight); 
            const windowHeight = $(window).height();
            //console.log("windowHeight", windowHeight);
            const height = $('body').height() - $(window).height();
            //console.log(height);
            if(vm.productShowArrayLength < vm.productShow.count) {
                console.log("stop add count")
                return;
            } else {
                if ((scrollTop + 50) > height) {
                    vm.productShow.count = vm.productShow.count + 4;
                    let value = "";
                    if (vm.productCategory.indexOf('/search') != -1) {
                        console.log("scrollToLoadingValue",value, vm.productCategory)
                        value = vm.productCategory.split("/search/").join("");
                    } else {
                        value = vm.productCategory.split("/category/").join("");  
                    }

                    if (vm.productSeries.status == "series") {
                        vm.getProducts(value, vm.productSeries.value);
                    } else {
                        vm.getProducts(value);
                    }
                } 
            }
        },
        debounce(func, delay) {
            var timer = null;
            return function () {
                var context = this;
                var args = arguments;
                clearTimeout(timer);
                timer = setTimeout(function () {
                    func.apply(context, args)
                }, delay);
            }
        },
        // throttle(func, threshhold) {
        //   var last, timer;
        //   if (threshhold) threshhold = 250;
        //   return function () {
        //     var context = this
        //     var args = arguments
        //     var now = +new Date()
        //     if (last && now < last + threshhold) {
        //       clearTimeout(timer)
        //       timer = setTimeout(function () {
        //         last = now
        //         func.apply(context, args)
        //       }, threshhold)
        //     } else {
        //       last = now
        //       func.apply(context, args)
        //     }
        //   }
        // }
    },
    watch: {

    },
    computed: {
        getTypeItem() {
            const vm = this;
            const set = new Set();
            let array = vm.productsOriginal.filter( (element) => { 
                if (element.type) {
                   return !set.has(element.type) ? set.add(element.type) : false; 
                }
            });
            return array;
        },
        getSeriesItem() {
            const vm = this;
            const set = new Set();
            let array = vm.productsOriginal.filter( (element) => {
                if (element.series) {
                   return !set.has(element.series) ? set.add(element.series) : false; 
                }
            });
            return array;
        },
    },
    created() {
        const vm = this;
        let product = ""; 
        let currentPath = vm.$router.history.current.path;
        if (currentPath.indexOf('/search') != -1) {
            vm.productCategory = currentPath;
            vm.productCategoryImage = "/search";
            product = currentPath.split("/search/").join("");
        } else {
            vm.productCategory = currentPath;
            vm.productCategoryImage = currentPath.split("/category").join("");
            product = currentPath.split("/category/").join("");
        }
        vm.getProducts(product);
        console.log("created-getProducts", product);
        // window.addEventListener('scroll', vm.scrollToLoading);
        window.addEventListener('scroll', vm.debounce(vm.scrollToLoading, 300));
        // window.addEventListener('scroll', vm.throttle(vm.scrollToLoading, 100));
    },
    mounted() {
        const vm = this;
        $("#inputGroupSelect01").change(function(){
            let value = $('select option:selected').children('a').contents()[0].nodeValue;     
            vm.getSeries(value);
        });
    },
    beforeDestroy () {

    },
}
</script>
<style scoped>
.sidebar-sticky {
    padding: 0;
    height: 100%;
    top: 100px;
}
.nav-link {
    padding: 0 0 0 24px;
}

.make-me-sticky {
    position: -webkit-sticky;
    position: sticky;

}

.seriesStyle a {
    text-decoration: none;
    color: #6c757d;
    -webkit-transition: all .3s ease-in-out;
    -moz-transition: all .3s ease-in-out;
    -o-transition: all .3s ease-in-out;
    transition: all .3s ease-in-out;
}

.seriesStyle a:hover {
    color: #FAD0D0;
}

.image-rwd {
    height: 246px;
    background-size: cover;
    background-position: center;
}


.arrow-animate {
    color: #999;
    position: relative;
    top: 5px;
    transition: all 3s cubic-bezier(1, 0.08, 0, 1);
    -webkit-animation: arrowef 0.5s infinite alternate;
    -moz-animation:arrowef 0.5s infinite alternate;
    -o-animation: arrowef 0.5s infinite alternate;
    animation: arrowef 0.5s infinite alternate;
}

.hideobj-md {
    display:none;
}

.mousePointer {
    cursor: pointer;
}

@-webkit-keyframes arrowef {
    0%   {top: 5px;}
    100% {top: 0px;}
}
@-moz-keyframes arrowef {
    0%   {top: 5px;}
    100% {top: 0px;}
}
@-o-keyframes arrowef {
    0%   {top: 5px;}
    100% {top: 0px;}
}
@keyframes arrowef {
    0%   {top: 5px;}
    100% {top: 0px;}
}



@media (max-width: 1199.98px) {.image-rwd {height: 200px;}}
@media (max-width: 991.98px) {.image-rwd {height: 320px;}}
@media (max-width: 767.98px) {
.image-rwd {
    height: 285px;
}

.hideobj {
    display:none;
}

.showobj {
    display:block;
}

}


@media (max-width: 575.98px) {.image-rwd {height: 625px;}}

</style>