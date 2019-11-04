<template>
    <div>
        <footer class="page-footer font-small bg-lativbg pt-3 mt-5">
            <div class="container ">
<!--                 <div class="row">
                    <div class="col-md-5 my-3 text-white ml-auto mr-auto text-center">
                        <a class="fb-ic" id="FB" @click="clicker">
                            <i class="fab fa-facebook-f mr-md-5 fa-2x"> </i>
                        </a>
                        <a class="tw-ic">
                            <i class="fab fa-twitter mr-md-5 fa-2x"> </i>
                        </a>
                        <a class="gplus-ic">
                            <i class="fab fa-google-plus-g mr-md-5 fa-2x"> </i>
                        </a>
                        <a class="li-ic">
                            <i class="fab fa-linkedin-in mr-md-5 fa-2x"> </i>
                        </a>
                        <a class="ins-ic">
                            <i class="fab fa-instagram mr-md-5 fa-2x"> </i>
                        </a>
                        <a class="pin-ic">
                            <i class="fab fa-pinterest fa-2x"> </i>
                        </a>
                    </div>
                </div> -->
                <router-link class="foot-item d-inline" to="/page/package">運送方式</router-link>
                <span class="px-2">|</span>
                <router-link class="foot-item d-inline" to="/page/terms">使用條款</router-link>
                <span class="px-2">|</span>
                <router-link class="foot-item d-inline" to="/page/policy">隱私政策</router-link>
                <span class="px-2">|</span>
                <router-link class="foot-item d-inline" to="/page/disclaimer">免責聲明</router-link>
            </div>
            <div class="footer-copyright text-center text-light800 mt-3">© 2019 Copyright</div>
            <div class="footer-copyright text-center text-light800 pb-3">
                本站為單純的作品練習，資料、圖片來源皆出各衣飾網站，不使用於任何商業或營利行為
            </div>
        </footer>
    </div>
</template>

<script>
// import $ from 'jquery' // Import js file

export default {
  data () {
    return {

    }
  },
  methods: {
    // clicker() {
    //     $(function(){
    //         $("#FB").click(function(){
    //             window.open('http://www.facebook.com/share.php?u='.concat(encodeURIComponent(location.href)))
    //         })
    //     })
    // }
  },
  created () {

  }
}
</script>

<style scoped src="../assets/css/UserFooter.css">

</style>
