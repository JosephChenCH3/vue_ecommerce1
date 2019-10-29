<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <div class="text-right my-3">
            <button class="btn btn-primary" @click="openModal(true)">新增優惠碼</button>
        </div>
<!--         <hr>
        <div >
            分類：
            <div class="d-inline">
            <button  type="button" @click.prevent="seletedCategory = 'all'"
                class="btn btn-outline-primary btn-sm ml-1 my-1 mb-3" :class="{'active': seletedCategory == 'all'}">全部
            </button>
            <button v-for="item in filterCategoryItem" type="button" @click.prevent="seletedCategory = item.category"
                class="btn btn-outline-primary btn-sm ml-1 my-1 mb-3" 
                :class="{'active': seletedCategory == item.category}">{{ item.category }}
            </button>
            </div>
        </div>  --> 
        <table class="table mt4">
            <thead>      
                <td>分類</td>
                <td>名稱</td>
                <td>折扣</td>
                <td>到期日</td>
                <td>優惠碼</td> 
                <td>啟用</td> 
                <td>編輯</td>        
            </thead>
            <tbody>
                <tr v-for="item in coupons">
                    <td>{{ item.category }}</td>
                    <td>{{ item.title }}</td>
                    <td>{{ item.percent }}</td>
                    <td>{{ item.due_date }}</td>
                    <td>{{ item.code }}</td>
                    <td v-if="item.is_enabled" class="text-success">已啟用</td>
                    <td v-else class="text-warning">未啟用</td>           
                    <td>
                        <div class="btn-group" role="group" aria-label="Third group">
                            <button class="btn btn-success btn-sm" @click.prevent="openModal(false, item)">編輯</button>
                            <button class="btn btn-outline-warning btn-sm" @click.prevent="openDelModal(item)">刪除</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
		<Pagecomponent :content="pagenation" @getPagenationOut="getCoupons"></Pagecomponent>      
        <!-- Modal -->
        <div class="modal fade" id="couponModal" tabindex="-1" role="dialog" 
                aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-dark text-white">
                        <h5 class="modal-title" id="exampleModalLabel">
                            <span>新增優惠碼</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">               
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="category">分類</label>
                                <input type="unit" class="form-control" id="category" placeholder="請選擇分類" v-model="tempCoupon.category">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="title">名稱</label>
                                <input type="text" class="form-control" id="title" placeholder="請輸入名稱" v-model="tempCoupon.title">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6 mr-auto">
                                <label for="percent" class="d-block">折扣</label>
                                <input type="text" class="form-control d-inline col-md-9" id="percent" placeholder="請輸入0~100" v-model="tempCoupon.percent">
                                <div class="align-middle d-inline col-md-1" style="line-height: 24px">％</div>
                            </div>

                            <div class="form-group col-md-6 ">
                                <label for="due_date">到期日</label>
                                <input type="text" class="form-control" id="due_date" placeholder="請輸入到期日" v-model="tempCoupon.due_date">
                            </div>
                        </div>
                        <div class="form-row">
<!--                             <div class="form-group col-md-6 mr-auto">
                                <label for="code">優惠碼</label>
                                <input type="text" class="form-control" id="code" placeholder="優惠代碼" v-model="tempCoupon.code">
                            </div> -->
                            <div class="form-group col-md-6 mr-auto">
                                <label for="code">優惠碼</label>
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" id="code" placeholder="優惠代碼" aria-label="優惠代碼" aria-describedby="basic-addon2" v-model="tempCoupon.code">
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-secondary" @click.prevent="createCouponCode" type="button">
                                            <i class="fas fa-sync-alt"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row col-6  align-middle">
                            <div class="align-middle" style="line-height: 24px">是否啟用：</div>
                            <div class="custom-control custom-switch">
                                <input class="custom-control-input align-middle" type="checkbox" id="is_enabled" :true-value="true"    :false-value="false" v-model="tempCoupon.is_enabled">
                                <label class="custom-control-label" for="is_enabled"></label>
                            </div>
                        </div>
                    </div>   
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click.prevent="updateCoupon">確認</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="delCouponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-danger text-white">
                        <h5 class="modal-title" id="exampleModalLabel">
                            <span>刪除產品</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        是否刪除 <strong class="text-danger">
                            {{  }}</strong> 商品(刪除後將無法恢復)。
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-danger" @click="removeCoupon">確認刪除</button>
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
            coupons: [],
            tempCoupon: {},
            pagenation: {},
            // pagenation: {
            //     current_page: 1,
            //     has_next: true,
            //     has_pre: false,
            //     total_pages: ""              
            // },
            isNew: false,
            delId: "",
            isLoading: false,
            status: {
                loading: false,
            },
            categoryItem: [],
            seletedCategory: "all"
        };
    },
    methods: {
        getCoupons(page = 1) {
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`;
            const vm = this;
            vm.isLoading = true;
            this.$http.get(api).then((response) => {
                console.log("getCoupons", response.data);
                vm.isLoading = false;
                vm.coupons = response.data.coupons;
                vm.pagenation = response.data.pagination;
            });
        },
        // getCoupons(page = 1) {
        //     const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`;
        //     const vm = this;
        //     vm.isLoading = true;
        //     this.$http.get(api).then((response) => {
        //         console.log("getCoupons", response.data);
        //         for (let i = 0; i < response.data.pagination.total_pages; i++) {
        //             const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${i+1}`;
        //             this.$http.get(api).then((response) => {
        //                 vm.coupons = vm.coupons.concat(response.data.coupons);
        //                 console.log("vm.categoryItem", vm.categoryItem);
        //                 vm.isLoading = false;
        //             });
        //         }
        //         console.log("vm.categoryItem222", vm.categoryItem);
        //     });
        // },
        selectCategory(categoryName) {
            console.log(categoryName);
            const vm = this;
            return vm.coupons.filter( (element) => { return element.category == categoryName });
        },
        openModal(isNew, item) {
            if (isNew) {
                this.tempCoupon = { code: "" };
                this.isNew = true;
                this.createCouponCode();
            } else {
                this.tempCoupon = Object.assign({}, item);
                this.isNew = false;
            }
            $("#couponModal").modal('show');
        },
        createCouponCode() {
            this.tempCoupon.code = Math.random().toString(36).substring(7);
        },
        updateCoupon() {
            let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`;
            let httpMethod = "post";
            const vm = this;
            const coupon = {
                category: vm.tempCoupon.category,
                title: vm.tempCoupon.title,
                is_enabled: vm.tempCoupon.is_enabled,
                percent: vm.tempCoupon.percent,
                due_date: vm.tempCoupon.due_date,
                code: vm.tempCoupon.code,
            };
            if (!vm.isNew) {
                api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`
                httpMethod = "put";
            }
            vm.isLoading = true;
            this.$http[httpMethod](api, { data: coupon }).then((response) => {
                console.log("updateCoupon", response.data);
                vm.isLoading = false;
                if (response.data.success) {
                    vm.coupons = response.data.coupons;
                    vm.$bus.$emit('message:push', response.data.message, 'success');
                    $("#couponModal").modal('hide');
                } else {
                    vm.$bus.$emit('message:push', response.data.message, 'danger');
                }
                vm.getCoupons(vm.pagenation.current_page);
            });
        },
        openDelModal(item) {
            this.tempCoupon = Object.assign({}, item);
            this.delId = item.id;
            $("#delCouponModal").modal('show');
        },
        removeCoupon() {
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${this.delId}`;
            const vm = this;
            this.$http.delete(api).then((response) => {
                console.log("removeCoupon", response.data);
                $("#delCouponModal").modal('hide');
                vm.getCoupons();
            });
        },
        // getCategoryItem() {
        //     const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=1`;
        //     const vm = this;         
        //     // vm.isLoading = true;
        //     this.$http.get(api).then((response) => {
        //         for (let i = 0; i < response.data.pagination.total_pages; i++) {
        //             const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${i+1}`;
        //             this.$http.get(api).then((response) => {
        //                 vm.categoryItem = vm.categoryItem.concat(response.data.coupons);
        //                 // vm.categoryItem = [vm.categoryItem, ...response.data.coupons];
        //                 console.log("vm.categoryItem", vm.categoryItem);
        //                 // vm.isLoading = false;
        //             });
        //         }
        //     });
        // },
        // filterSeletedCategory() {
        //     const vm = this;
        //     if (vm.seletedCategory === "all") {
        //         return vm.coupons;
        //     } else {
        //         const array = vm.coupons.filter((element) => {
        //             return vm.seletedCategory === element.category;
        //         }); 
        //         return array;
        //     }
        // },
        // setPegenation(item) {
        //     this.pagenation.current_page = item;     
        // }
    },
    computed: {
        // filterCategoryItem() {
        //     const vm = this;
        //     const set = new Set();
        //     return vm.categoryItem.filter( (element) => { return !set.has(element.category) ? set.add(element.category) : false;});
        // },
        // couponsWithCategory() {
        //     const vm = this;
        //     const couponArray = this.filterSeletedCategory();
        //     const current_page = vm.pagenation.current_page;
        //     // console.log(couponAarray.length);
        //     vm.pagenation.total_pages = Math.ceil(couponArray.length / 10);
        //     // // console.log("total_pages", vm.pagenation.total_pages);
        //     // current_page

        //     const couponArray2 = couponArray.splice(0, 10);
        //     console.log("couponArray2", couponArray2);
        //     return couponArray2;
        // },
        // pagenationWithCategory() {
        //     pagination: {
        //         current_page: 1
        //         has_next: true
        //         has_pre: false
        //         total_pages: 2               
        //     }
        //     const vm = this;
        //     const array = vm.filterSeletedCategory();
        //     console.log(array.length);
        //     return this.pagenation;
        // }
    },
    created() {
        this.getCoupons();
        // this.getCategoryItem();
    },
    mounted() {

    }
}
</script>