<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light navbar-scroll fixed-top shadow-sm">
            <div class="container">
                <router-link class="navbar-brand" to="/">
                        <img height="50" class="" src="@/assets/logo2.png" @click="btnStatus = '/main'">
                </router-link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" @click="navCollapseShadow">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">                
                    <ul class="navbar-nav mr-auto ml-3 justify-content-around">
                        <li class="nav-item px-3" @click="getCategoryToShow" :class="{'selected': btnStatus == 'women'}">
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
                <SearchInput class="set-position-si top35"></SearchInput>
                <CartAndPay class="set-position-cp top35"></CartAndPay>
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
            navCollapseShadowStatus: false,
            cartStatus: [],
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
        },
        navCollapseShadow() {
            this.navCollapseShadowStatus = !this.navCollapseShadowStatus;
            if(this.navCollapseShadowStatus) {
                $(".navbar-collapse").addClass("shadow-sm");
            } else {
                $(".navbar-collapse").removeClass("shadow-sm");
            }
            
        },
        setPpositionSI() {
            if (this.cartStatus.length != 0) {
                $(".set-position-si").removeClass("right100");
            } else {
                $(".set-position-si").addClass("right100");
            }
        }
    },
    computed: {

    },
    watch: {
        cartStatus() {
            this.setPpositionSI();
        }
    },
    created() {
        const vm = this;
        const value = this.$router.history.current.path;
        this.btnStatus = value.split("/category/").join("");
        console.log("btnStatus",this.btnStatus)
        this.cartStatus = JSON.parse(localStorage.getItem('Cart'));//
        vm.$bus.$on('cartStatus:push', (data) => {
             this.cartStatus = data;
        });
        $(window).bind('scroll resize', function() {
            var $this = $(this);
            var $this_Top = $this.scrollTop();
            if ($this_Top > 150) {
                // $('.navbar-scroll').stop().animate({ top: "0px" });
                $(".navbar-scroll").addClass("navbar-addStyle");
                $(".set-position-si").removeClass("top35");
                $(".set-position-cp").removeClass("top35");
                $(".set-position-si").addClass("top20");
                $(".set-position-cp").addClass("top20");
            } else {
                // $('.navbar-scroll').stop().animate({ top: "0px" });
                $(".navbar-scroll").removeClass("navbar-addStyle");
                $(".set-position-si").removeClass("top20");
                $(".set-position-cp").removeClass("top20");
                $(".set-position-si").addClass("top35");
                $(".set-position-cp").addClass("top35");
            }
        }).scroll();
        // $('.carousel').carousel();
    },
    mounted() {
        this.setPpositionSI();
    }
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


.set-position-si,.set-position-cp {
    position: fixed;
    -webkit-transition: all .5s ease-in-out;
    -moz-transition: all .5s ease-in-out;
    -o-transition: all .5s ease-in-out;
    transition: all .5s ease-in-out;
}

.set-position-si {
    left: calc(50% + 200px);
}

.set-position-cp {
    left: calc(50% + 440px);
}

.top20 {
    top: 20px;
}

.top35 {
    top: 35px;
}

.right100 {
    transform: translate(108px, 0)
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

.set-position-si {
    left: calc(50% + 110px);
}

.set-position-cp {
    left: calc(50% + 350px);
}

}


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

.navbar-collapse {
    padding-top: 40px;
}

.set-position-si {
    left: calc(50% - 190px);
}

.set-position-cp {
    left: calc(50% + 100px);
}

.hideobj {
    display:none;
}

.showobj {
    display:block;
}

}


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


/*-----media max-width: 767.98-----*/
@media (max-width: 767.98px) {
.set-position-si {
    left: calc(50% - 170px);
}

.set-position-cp {
    left: calc(50% + 80px);
}

}


/*-----media max-width: 575.98-----*/
@media (max-width: 575.98px) {
.set-position-si {
    left: calc(50% - 130px);
}

.set-position-cp {
    left: calc(50% + 50px);
}

}


/*-----media max-width: 499.98-----*/
@media (max-width: 499.98px) {
.navbar-brand {
    display: none;
}

}
</style>
