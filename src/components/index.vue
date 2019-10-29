<template>
    <div>
    	<UserNavbar></UserNavbar>
        <Alert></Alert>
        <div class="container">
            <div style="height: 150px"></div>
            <div id="v-content" v-bind:style="{minHeight: Height+'px'}">
                <router-view :key="$route.path"></router-view>
            </div>
            <div class="top mousePointer" @click="goToTop">
                <img width="31" height="49" src="@/assets/icon_top.png" alt=""/>
            </div>
            <div class="coupon mousePointer btn_shake" @click="openCouponModal">
                <img width="100" height="100" src="@/assets/Coupon-High-Quality-PNG.png" alt=""/>
            </div>
        </div>
        <div class="modal fade" id="promoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <CouponModal></CouponModal>
        </div>
		<UserFooter></UserFooter>
    </div>
</template>


<script>
import $ from 'jquery' // Import js file
import UserNavbar from './UserNavbar'
import UserFooter from './UserFooter'
import Alert from './AlertMessage'
import CouponModal from './CouponModal'

export default {
    components: {
    	UserNavbar,
    	UserFooter,
        CouponModal,
        Alert
    },
    data() {
        return {
            Height: 0
        };
    },
    methods: {
        goToTop() {
            // window.scrollTo(0,0);
            $("html, body").animate({scrollTop: 0}, 400);
        },
        openCouponModal() {
            $("#promoModal").modal('show');
        }
    },
    created() {

    },
    mounted(){
        $(window).bind('scroll resize', function() {
            var $this = $(this);
            var $this_Top = $this.scrollTop();
            if ($this_Top > 150) {
                $(".top").addClass("top_show");
                $(".coupon").addClass("top_show");            
            } else {
                $(".top").removeClass("top_show");
                $(".coupon").removeClass("top_show");
            }
        }).scroll();
        $('.carousel').carousel();//?
        //动态设置内容高度 让footer始终居底   header+footer的高度是190
        this.Height = document.documentElement.clientHeight - 300;  
        //监听浏览器窗口变化　
        window.onresize = ()=> { this.Height = document.documentElement.clientHeight - 300 };
    }
}
</script>


<style scoped>
.top {
    position: fixed;
    bottom: 0px;
    right: calc(50% - 590px);
    -webkit-transition: all 1s ease-in-out;
    -moz-transition: all 1s ease-in-out;
    -o-transition: all 1s ease-in-out;
    transition: all 1s ease-in-out;
    opacity: 0;
    filter:alpha(opacity=0);
}

.coupon {
    position: fixed;
    bottom: 0px;
    z-index: 15;
/*    left: calc(50% - 630px);*/
    -webkit-transition: all 1s ease-in-out;
    -moz-transition: all 1s ease-in-out;
    -o-transition: all 1s ease-in-out;
    transition: all 1s ease-in-out;
}

.top_show {
    bottom: 150px;
    opacity: 1.0;
    filter:alpha(opacity=100);
}

.btn_shake {
    -webkit-animation: shake 0.5s infinite alternate;
    -moz-animation: shake 0.5s infinite alternate;
    -o-animation: shake 0.5s infinite alternate;
    animation: shake 0.5s infinite alternate;
}

@-webkit-keyframes shake {
    0% {left: calc(50% - 590px);} 
    100% {left: calc(50% - 600px);}
}
@-moz-keyframes shake {
    0% {left: calc(50% - 590px);} 
    100% {left: calc(50% - 600px);}
}
@-o-keyframes shake {
    0% {left: calc(50% - 590px);} 
    100% {left: calc(50% - 600px);}
}
@keyframes shake {
    0% {left: calc(50% - 590px);} 
    100% {left: calc(50% - 600px);}
}

.coupon:hover>.btn_shake {
    -webkit-animation: none;
    -moz-animation: none;
    -o-animation: none;
    animation: none;
}





.mousePointer {
    cursor: pointer;
}

/*-----media max-width: 1199.98-----*/
@media (max-width: 1199.98px) {
.top {
    right: 15px;
}


@-webkit-keyframes shake {
    0% {left: calc(50% - 490px);} 
    100% {left: calc(50% - 500px);}
}
@-moz-keyframes shake {
    0% {left: calc(50% - 490px);} 
    100% {left: calc(50% - 500px);}
}
@-o-keyframes shake {
    0% {left: calc(50% - 490px);} 
    100% {left: calc(50% - 500px);}
}
@keyframes shake {
    0% {left: calc(50% - 490px);} 
    100% {left: calc(50% - 500px);}
}


}

</style>