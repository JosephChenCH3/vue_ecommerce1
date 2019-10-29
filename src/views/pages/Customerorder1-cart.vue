<template>
	<div>
        <loading :active.sync="isLoading"></loading>
        <div class="row mt-4">
        <div class="col-md-4 mb-4" v-for="item in products">
            <div class="card border-0 shadow-sm">
                <div style="height: 150px; background-size: cover; background-position: center"
                :style="{ backgroundImage: `url(${ item.imageUrl })` }">
                </div>
                <div class="card-body">
                    <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
                    <h5 class="card-title">
                        <a href="#" class="text-dark">{{ item.title }}</a>
                    </h5>
                    <p class="card-text">{{ item.content }}</p>
                    <div class="d-flex justify-content-between align-items-baseline">
                        <!-- <div class="h5">2,800 元</div> -->
                        <del class="h6" v-if="!item.price">原價 {{ item.origin_price | currency}} 元</del>
                        <del class="h6" v-if="item.price">原價 {{ item.origin_price | currency}} 元</del>
                        <div class="h5" v-if="item.price">現在只要 {{ item.price | currency}} 元</div>
                    </div>
                </div>
                <div class="card-footer d-flex">
                    <button type="button" class="btn btn-outline-secondary btn-sm"
                        @click.prevent="getProduct(item.id)">
                        <i class="fas fa-spinner fa-pulse" v-if="item.id===status.itemId"></i>
                        查看更多
                    </button>
                    <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click.prevent="addCart(item.id)">
                        <i class="fas fa-spinner fa-pulse" v-if="item.id===status.cartId"></i>
                        加到購物車
                    </button>
                </div>
            </div>
        </div>
        </div>
        <Pagecomponent :content="pagenation" @getProductsOut="getProducts"></Pagecomponent>
        <div class="modal fade" id="productModal" tabindex="-1" role="dialog" 
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                            <span>{{ product.title }}</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="col-sm-12 ml-auto mr-auto">
                            <img alt="" class="img-fluid" src="" :src="product.imageUrl">
                            <blockquote class="blockquote mt-3">
                                <p class="mb-0">{{ product.content }}</p>
                                <footer class="blockquote-footer text-right">{{ product.description }}</footer>
                            </blockquote>
                            <div class="d-flex justify-content-between align-items-baseline">
                                <div class="h4" v-if="!product.price">{{ product.origin_price | currency }}元</div>
                                <div class="h6" v-if="product.price">原價{{ product.origin_price | currency }}元</div>
                                <div class="h4" v-if="product.price">特價{{ product.price | currency }}元</div>
                            </div>
                            <select name="" class="form-control mt-3" v-model="product.num">
                                <option v-for="num in 10" :value="num">
                                    選購 {{num}} {{ product.unit }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="text-muted text-nowrap mr-3">
                            小計 <strong>{{ product.num * product.price | currency }}</strong> 元
                        </div>
                        <button type="button" class="btn btn-primary" @click.prevent="addCart(product.id, product.num)">
                            <i class="fas fa-spinner fa-pulse" v-if="product.id===status.cartId"></i>
                            加入購物車
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<script>
import $ from 'jquery' // Import js file
import Pagecomponent from '@/components/PageComponent'

export default {
    components: {
        Pagecomponent
    },
    data() {
        return {
            products: [],
            product:{},
            pagenation: {},
            isLoading: false,
            status: {
                itemId: "",
                cartId: ""
            }
        };
    },
    methods: {
        getProducts( page = 1) {
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`;
            const vm = this;
            vm.isLoading = true;
            vm.status.fileUploading = true;
            this.$http.get(api).then((response) => {
                console.log("getProducts", response.data);
                vm.isLoading = false; 
                vm.products = response.data.products;
                vm.pagenation = response.data.pagination;
            });
        },
        getProduct( id ) {
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
            const vm = this;
            vm.status.itemId = id;
            this.$http.get(api).then((response) => {
                console.log("getProduct", response.data);
                vm.product = response.data.product;
                $("#productModal").modal('show');
                vm.status.itemId = "";
            });    
        },
        addCart( id, qty = 1 ) {
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
            const vm = this;
            const cart = {
                product_id: id,
                qty, };
                console.log("id",id,"qty",qty)
            vm.status.cartId = id;
            this.$http.post(api, { data: cart}).then((response) => {
                console.log("addCart", response.data);
                // vm.getCart();
                $("#productModal").modal('hide');
                vm.$bus.$emit('message:push', response.data.message, 'success');
                vm.status.cartId = "";
            }); 
        },
        getCart() {
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
            const vm = this;
            this.$http.get(api).then((response) => {
                console.log("getCart", response.data);
                vm.$bus.$emit('cart:data', response.data);
            });
        }
    },
    created() {
        this.getProducts();
        // this.getCart();
        const vm = this;
        this.$bus.$on('getCart:push', () => {
            vm.getCart();
        });
    }
}
</script>