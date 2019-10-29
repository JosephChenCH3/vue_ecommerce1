<template>
	<div>
        <loading :active.sync="isLoading"></loading>
        <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
    	    <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Company name</a>
    	    <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">	    
            <ul class="navbar-nav px-3">
                <li class="nav-item text-nowrap">
                    <a href="#" class="h4"  @click="oprnCartModal">
                        <i class="fas fa-cart-arrow-down"></i>
                    </a>
                </li>
            </ul>
            <ul class="navbar-nav px-3">
    	        <li class="nav-item text-nowrap">
    	            <a class="nav-link" href="#"  @click.prevent="signout">登出</a>
    	        </li>
    	    </ul>
    	</nav>
        <div class="modal fade" id="cartModal" tabindex="-1" role="dialog" 
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <cart :content="cartDataCarts" :contentdata="cartData"></cart>
        </div>
<!--         <div class="modal fade" id="cartModal" tabindex="-1" role="dialog" 
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                            <span></span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="col-sm-12 ml-auto mr-auto">
                            <blockquote class="blockquote mt-3">
                                <p class="mb-0"></p>
                                <footer class="blockquote-footer text-right"></footer>
                            </blockquote>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary">
                            <i class="fas fa-spinner fa-pulse"></i>
                            加入購物車
                        </button>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script>
import $ from 'jquery' // Import js file
import Cart from './Cart'

export default {//<i class="fas fa-cart-plus"></i>
    components: {
        Cart
    },
    data() {
        return {
            isLoading: false,
            cartData: {},
            cartDataCarts: []
        };
    },
    methods: {
        signout() {
            const api = `${process.env.VUE_APP_APIPATH}/logout`;
            //'https://vue-course-api.hexschool.io/api/joseph/products';
            // const api = 'https://vue-course-api.hexschool.io/logout';
            const vm = this;
            this.$http.post(api).then((response) => {
                console.log(response);
                if (response.data.success) {
                    vm.$router.push('/login');
                }
            });
        },
        oprnCartModal() {
            const vm = this;
            this.isLoading = true;
            this.$bus.$emit('getCart:push');
            vm.$bus.$on('cart:data', (data) => {
                vm.cartData = data.data;
                vm.cartDataCarts = data.data.carts;
                console.log("vm.cartData", vm.cartData);
                console.log("vm.cartDataCarts", vm.cartDataCarts);
                $("#cartModal").modal('show');
                this.isLoading = false;
            });        
        },
        // getCart() {
        //     const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
        //     const vm = this;
        //     this.$http.get(api).then((response) => {
        //         console.log(response.data);
        //         vm.cartData = response.data;
        //     });
        // }
    },
    created() {
        // const vm = this;
        // vm.$bus.$on('cart:data', (cartData) => {
        //     // console.log("message" , message.data.carts);
        //     vm.cartData = cartData;
        //     console.log("message" , vm.cartData);
        // });
        // this.getCart();
    }
}
</script>

<style>
.h4 {
    color: #ccc;
}
.h4:hover {
    color: pink;
}
</style>