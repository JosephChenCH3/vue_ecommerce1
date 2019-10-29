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
                <!-- <SearchInput class="hideobj-md showobj" @searchProductOut="searchProduct"></SearchInput> -->
                <SearchInput class="hideobj-md showobj"></SearchInput>
                <CartAndPay class="hideobj-md showobj"></CartAndPay>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">                
                    <ul class="navbar-nav mr-auto ml-3 justify-content-around">
                        <li class="nav-item px-3" @click="getCategoryToShow" :class="{'selected': btnStatus == 'women'}">
                            <!-- <router-link class="nav-link h6" to="/women">WOMEN</router-link> -->
                            <router-link class="nav-link h6" to="/category/women">
                                WOMEN
                            </router-link>
                        </li>
                        <li class="nav-item px-3" @click="getCategoryToShow" :class="{'selected': btnStatus == 'men'}">
                            <router-link class="nav-link h6" to="/category/men">
                                MEN
                            </router-link>
                        </li>
                        <li class="nav-item px-3" @click="getCategoryToShow" :class="{'selected': btnStatus == 'kids'}">
                            <router-link class="nav-link h6" to="/category/kids">
                                KIDS
                            </router-link>
                        </li>
                        <li class="nav-item px-3" @click="getCategoryToShow" :class="{'selected': btnStatus == 'baby'}">
                            <router-link class="nav-link h6" to="/category/baby">
                                BABY
                            </router-link>
                        </li>
                        <li class="nav-item px-3" @click="getCategoryToShow" :class="{'selected': btnStatus == 'sports'}">
                            <router-link class="nav-link h6" to="/category/sports">
                                SPORTS
                            </router-link>
                        </li>
                    </ul>
                </div>          
                <!-- <SearchInput class="hideobj" @searchProductOut="searchProduct"></SearchInput> -->
                <SearchInput class="hideobj"></SearchInput>
                <CartAndPay class="hideobj"></CartAndPay>
            </div>
        </nav>
    </div>
</template>




<script>
import $ from 'jquery' // Import js file
import SearchInput from './SearchInput'
import CartAndPay from './CartAndPay'

export default {
    components: {
        SearchInput,
        CartAndPay
    },
    data() {
        return {
            btnStatus: "",
        };
    },
    methods: {
        getCategoryToShow() {
            const str1 = event.target.childNodes[0].textContent;
            console.log(event)
            const str2 = str1.toString();
            const str3 = str2.trim();
            const str4 = str3.toLowerCase();
            const vm = this;
            vm.btnStatus = `${str4}`;
            $('#navbarSupportedContent').collapse('hide');
            console.log("str4",str4)
        }
    },
    computed: {

    },
    created() {
        const vm = this;
        const value = this.$router.history.current.path;
        this.btnStatus = value.split("/category/").join("");
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
/*    border-bottom: 5px #FAD0D0 solid;*/
}

.hideobj-md {
    display:none;
}

.mousePointer {
    cursor: pointer;
}

/*-----media max-width: 1199.98-----*/
@media (max-width: 1199.98px) {
.nav-item {
    margin: 0;
    padding: 0;
}

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

.hideobj {
    display:none;
}

.showobj {
    display:block;
}

}
/*-----media max-width: 991.98-----*/


/*-----media min-width: 991.98-----*/
@media (min-width: 991.98px) {
.nav-item {

    border-radius: 25% / 50%;
}

.nav-item:hover {
    border-bottom: 5px #FAD0D0 solid;
    border-top: 5px #FAD0D0 solid;
}

.navbar-expand-lg .navbar-nav .nav-link {
    padding-right: 0rem;
    padding-left: 0rem;
}

}
/*-----media min-width: 991.98-----*/


/*-----media max-width: 575.98-----*/
@media (max-width: 575.98px) {


}
/*-----media max-width: 575.98-----*/


/*-----media max-width: 499.98-----*/
@media (max-width: 499.98px) {
.navbar-brand {
    display: none;
}



}
/*-----media max-width: 575.98-----*/

</style>
