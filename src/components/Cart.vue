<template>
	<div>
<!--         <div class="modal fade" id="cartModal" tabindex="-1" role="dialog" 
            aria-labelledby="exampleModalLabel" aria-hidden="true"> -->
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-primary">
                        <h5 class="modal-title text-white" id="exampleModalLabel">
                            <span>已加入購物車之商品</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="col-lg-12 ml-auto mr-auto" v-for="(item, i) in content" :key="item.id">
                            <hr v-if="i != 0">
                            <ul class="list-inline">
                                <li class="col-sm-1 text-right list-inline-item">
                                    <h5>{{ i+1 }}.</h5>
                                </li>
                                <li class="col-sm-6 list-inline-item">
                                    <h5>{{ item.product.title }}</h5>
                                </li>
                                <li class="col-sm-2 list-inline-item">
                                    <h5>{{ item.product.price * item.qty | currency }}元</h5>
                                </li>
                                <li class="col-sm-2 text-right list-inline-item">
                                    <h5>{{ item.qty }}{{ item.product.unit }}</h5>
                                </li>
                                <li class="list-inline-item">
                                    <h5 v-if="status.itemId != item.id"><a href="" @click.prevent="removeCart(item)"><i class="far fa-trash-alt"></i></a></h5>
                                    <i v-if="status.itemId == item.id" class="fas fa-spinner fa-pulse"></i>
                                </li>
                            </ul> 
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="col-lg-10 ">
                            <ul class="list-inline align-items-end">
                                <li class="list-inline-item">
                                    <h5>原價：{{ contentdata.total }}元</h5>
                                </li>
                                <li class="list-inline-item">
                                    <h5>特價：{{ contentdata.final_total }}元</h5>
                                </li>
                            </ul>
                        </div>
                        <button type="button" class="btn btn-primary">
                            <i class="fas fa-spinner fa-pulse"></i>
                            結帳
                        </button>
                    </div>
                </div>
            </div>
<!--         </div> -->
    </div>
</template>

<script>

export default {
    props:['content', 'contentdata'],
    data() {
        return {
            status: {
                itemId: ""
            }
        };
    },
    methods: {
        removeCart( item ) {
            const id = item.id;
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
            const vm = this;
            vm.status.itemId = item.id;
            this.$http.delete(api).then((response) => {
                console.log(response.data);
                this.$bus.$emit('getCart:push');
                vm.status.itemId = "";
            });
        }
    },
    created() {

    }
}
</script>

<style>

</style>