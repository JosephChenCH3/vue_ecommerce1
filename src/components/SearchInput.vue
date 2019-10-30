<template>
    <div>
        <div class="input-group" style="width: auto;">
            <input type="search" class="form-control-sm input-width d-inline" placeholder="Search" aria-label="Search" v-model="searchValue" @keyup.enter="searchProduct">
            <div class="input-group-append  d-inline" >
                <button type="button" class="btn btn-sm btn-outline-secondary"  style="width: 36px;"
                    v-if="searchStatus == 'product'" @click="searchProduct">
                    <i class="fas fa-search fa-lg"></i>
                </button>
                <button type="button" class="btn btn-sm btn-outline-secondary" style="width: 36px;" 
                     v-if="searchStatus == 'orderNum'" @click="searchProduct">
                    <i class="fas fa-list-ul"></i>
                </button>
                <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="sr-only">Toggle Dropdown</span>
                </button>
                <div class="dropdown-menu dropdown-menu-right dropdown-search-menu">
                    <a class="dropdown-item dropdown-search-item" href="#" @click.prevent="searchStatus='product'">搜尋產品</a>
                    <a class="dropdown-item dropdown-search-item" href="#" @click.prevent="searchStatus='orderNum'">搜尋訂單</a>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                searchValue: "",
                searchStatus: "product",
            }
        },
        methods: {
            searchProduct() {
                if (this.searchStatus === "product") {
                    this.$router.push(`/search/${this.searchValue}`);
                } else if (this.searchStatus === "orderNum") {
                    this.$router.push(`/order-check/${this.searchValue}`);
                }
                console.log("searchValue", this.searchValue, this.searchStatus);
                this.searchValue = "";
            }
        }
    }
</script>


<style scoped>
.dropdown-search-menu {
    min-width: 100px;
    right: 0;
}

.dropdown-search-item:active {
    color: #212529;
    background-color: #FFF;
}

@media (max-width: 1199.98px) {
.input-width {
    /*width: 100px;*/
}
}

@media (max-width: 991.98px) {
.input-width {
    width: 190px;
}
}

@media (max-width: 575.98px) {
.input-width {
    width: 120px;
}
}

@media (max-width: 499.98px) {
.input-width {
    width: 90px;
}
}

@media (max-width: 349.98px) {
.input-width {
    width: 60px;
}
}

</style>