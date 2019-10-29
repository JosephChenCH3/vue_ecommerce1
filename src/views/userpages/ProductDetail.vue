<template>
    <div>
    	<loading :active.sync="isLoading"></loading>
        <div class="row">
            <div class="col-md-8 col-sm-12" style="height: 910px; background-size: cover; background-position: center" 
                :style="{ backgroundImage: `url(${ product.imageUrl })` }">
            </div>

            <div class="col-md-4 col-sm-12 ml-auto">
                <div class="h4">{{ product.title }}</div>
                <span class="badge badge-pill ml-2" style="background-color: #C1EFFF;">{{ product.category }}</span>
                <span class="badge badge-pill ml-2" style="background-color: #C1FFE9;">{{ product.type }}</span>
                <span class="badge badge-pill ml-2" style="background-color: #FFF8C1;">{{ product.series }}</span>
                <div class="h5 text-right" v-if="product.origin_price">
                    <del>{{ product.origin_price * quantity }} 元</del>
                </div>
                <div class="h2 text-danger text-right">{{ product.price * quantity | currency}} 元</div>
                <hr>
                <div class="text-left text-l">購買數量</div>
                <div class="h6 text-right" v-if="product.stock > 5">庫存：{{ product.stock }} 件</div>
                <div class="h6 text-right text-danger" v-if="product.stock < 5">只剩最後 {{ product.stock }} 件</div>
                <div class="h6 text-right text-danger" v-if="product.stock == 0">補貨中</div>
                <select name="" class="form-control mt-3" v-model="quantity" v-if="product.stock != 0">
                    <option v-for="num in Number(product.stock)" :value="num">
                        {{num}}
                    </option>
                </select>
                <hr>
                <!--Local Storage-->
                <!-- <button type="button" class="btn btn-danger btn-sm col-12" @click="addCart(product.id, quantity)"> -->
                <button type="button" class="btn btn-danger btn-sm col-12" v-if="product.stock != 0"
                     @click.stop="addCartToLS(product, quantity)">
                <!--Local Storage-->
                    <i class="fas fa-spinner fa-pulse" v-if="status.cartId == product.id"></i>
                    <i class="fas fa-cart-plus" v-if="status.cartId != product.id"></i>
                </button>
                <div class="mt-2 text-right mousePointer" v-if="product.stock != 0" @click="goBack(product)">返回前頁</div>
                <button type="button" class="btn btn-danger btn-sm col-12" v-if="product.stock == 0" @click="goBack(product)">
                <!--Local Storage-->
                    <i class="fas fa-spinner fa-pulse" v-if="status.cartId == product.id"></i>
                    <i class="fas fa-backspace" v-if="status.cartId != product.id"></i>
                    返回前頁
                </button>          
            </div>
        </div>      
    </div>
</template>


<script>
export default {
    data() {
        return {
        	productId: "",
            product: {
                stock: "",
            },
            quantity: 1,
            isLoading: false,
            status: {
                loading: false,
                cartId: ""
            },
            cartArrayToLS: [],
        }
    },
    methods: {
        getProduct() {
            const id = this.productId;
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
            const vm = this;
            vm.isLoading = true;
            this.$http.get(api).then((response) => {
                console.log("getProduct", response.data);
                vm.isLoading = false;
                vm.product =  response.data.product;
            });
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
            vm.status.cartId = item.id;
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
        goBack(item) {
            this.status.cartId = item.id;
            this.$router.go(-1);
            this.status.cartId = "";
        }
    },
    created() {
    	this.productId = this.$route.params.productId;
        this.getProduct();
    },
    beforeCreate() {
        console.log("beforeCreate",this.$route.params.productCategory);
    }
}
</script>

<style scoped>
.mousePointer {
    cursor: pointer;
}
</style>