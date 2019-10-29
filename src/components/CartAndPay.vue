<template>
    <div>
        <div class="btn-group ml-3" v-if="cartsNum != 0">
            <!--Local Storage-->
            <!--<button type="button" class="btn btn-sm btn-outline-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="getCart"> -->
            <button type="button" class="btn btn-sm btn-outline-danger dropdown-toggle fix-btn-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="getCartFromLS">
            <!--Local Storage-->
                <i v-if="status.loading != 'cart'" class="fas fa-cart-arrow-down"></i>
                <i v-if="status.loading == 'cart'" class="fas fa-spinner fa-pulse"></i>
            </button>  
            <div class="dropdown-menu dropdown-menu-right px-2 dropdown-cart-menu" @click.stop="">
                <div class="dropdown-cart-item px-0 d-flex" v-for="item in cartArrayToLS" :key="item.id">
                    <div class="d-inline col">{{ item.product.title }}</div>
                    <div class="d-inline col-2 text-right">{{ item.qty }} /件</div>
                    <div class="d-inline col-2">{{ item.product.price * item.qty | currency }}</div>
                    <div class="d-inline col-1 text-right mousePointer" @click="removeCartItemToSL(item)">
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
</template>


<script>
import $ from 'jquery' // Import js file

export default {
    props:['content'],
    data() {
        return {
            cartArrayToLS: [],
            carts: {},
            status: {
                itemId: "",
                cartId: "",
                loading: "",
            },
        }
    },
    methods: {
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
        },
    },
    created() {
        const vm = this;
        vm.getCartFromLS();
        vm.$bus.$on('getCartLS:push', () => {
             vm.getCartFromLS();
        });
    },
    mounted() {

    }
}
</script>


<style scoped>
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

.dropdown-divider {
    border-top: 1px solid #4d3126;
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

.mousePointer {
    cursor: pointer;
}

@media (max-width: 991.98px) {
    .red-dots {
    top: -8px;
    left: -8px;
}

}


@media (max-width: 575.98px) {
.red-dots {
    top: 0px;
    left: -8px;
}

.fix-btn-sm{
    height: 31px;
    top: 8px;
}


}


</style>