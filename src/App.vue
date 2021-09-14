<template>
  <div id="app">

    <div class="main-page-wrapper">
      <div id="loader-wrapper">
        <div id="loader"></div>
      </div>

      <header class="charity-header">
        <div class="theme-main-menu">
          <div class="container">
            <div class="main-container clearfix">
              <div class="logo float-left">
                <a href="/">
                  <img class="logo" src="logo.png" alt="Logo">
                </a>
              </div>

              <div class="right-content float-right">
                <div class="language-select">
                  <select class="selectpicker">
                    <option>En</option>
                  </select>
                </div> <!-- /.language-select -->
                <button class="search ch-p-bg-color round-border tran3s" id="search-button">
                  <i class="fa fa-search" aria-hidden="true"></i>
                </button>
                <div class="search-box tran5s" id="searchWrapper">
                  <button id="close-button" class="ch-p-color">
                    <i class="flaticon-cross"></i>
                  </button>
                  <div class="container">

                    <form action="#">
                      <input type="text" placeholder="Search....">
                      <button class="ch-p-bg-color">
                        <i class="fa fa-search" aria-hidden="true"></i>
                      </button>
                    </form>
                  </div>
                </div> <!-- /.search-box -->
              </div> <!-- /.right-content -->

              <!-- ============== Menu Warpper ================ -->
              <div class="menu-wrapper float-right">
                <nav id="mega-menu-holder" class="clearfix">
                  <ul class="clearfix">
                    <li class="active">
                      <router-link to="/">Home</router-link>
                    </li>
<!--                    <li>-->
<!--                      <router-link to="/about">About us</router-link>-->
<!--                    </li>-->
<!--                    <li><a href="#">Page</a>-->
<!--                      <ul class="dropdown">-->
<!--                        <li><a href="#">Recent Cause List</a></li>-->
<!--                        <li><a href="#">Recent Cause Grid</a></li>-->
<!--                        <li><a href="#">Cause Details</a></li>-->
<!--                      </ul>-->
<!--                    </li>-->
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>

      <router-view></router-view>

      <div class="bottom-footer-banner ch-p-bg-color">
        <div class="container">
          <h3 class="float-left">Want to participate as a volunteer?</h3>
          <a href="#" class="float-right button-five">Contact Now!!</a>
        </div>
      </div>

      <footer class="default-footer charity-footer">
        <div class="container">
          <div class="top-footer row">
            <div class="col-md-3 col-sm-6 footer-logo">
              <a href="#"><img src="logo.png" alt="Logo"></a>
              <p>
                Lorem ipsum dolor  amet natum latine copiosa at quo,
                suas labore saperet  has there any quote for write lorem percit latineu suas dummy.
              </p>
            </div> <!-- /.footer-logo -->

            <div class="col-md-2 col-sm-6 footer-list">
              <h6>Information</h6>
              <ul>
                <li><a href="/" class="tran3s">Home</a></li>
              </ul>
            </div> <!-- /.footer-list -->
            <div class="col-md-3 col-sm-6 footer-latest-news">
              <h6>Latest News</h6>
              <div class="single-news">
                <h5><a href="#" class="tran3s">How can be successfull in market place..</a></h5>
                <span>13 Feb, 2016  /  Business</span>
              </div> <!-- /.single-news -->
              <div class="single-news">
                <h5><a href="#" class="tran3s">How can be successfull in market place..</a></h5>
                <span>13 Feb, 2016  /  Business</span>
              </div> <!-- /.single-news -->
            </div> <!-- /.footer-latest-news -->

            <div class="col-md-4 col-sm-6 footer-subscribe">
              <h6>Subscribe Us</h6>
              <p>This sounded a very good reason, and Alice was quite pleased to know it.</p>
              <form action="#">
                <input type="text" placeholder="Enter your e-mail">
                <button class="tran3s ch-p-bg-color"><i class="fa fa-angle-right" aria-hidden="true"></i></button>
              </form>
            </div> <!-- /.footer-subscribe -->
          </div> <!-- /.top-footer -->
        </div> <!-- /.container -->

        <div class="bottom-footer">
          <div class="container">
            <div class="wrapper clearfix">
              <p class="float-left">
                Copyright &copy; 2018 Consulting Theme. All rights reserved
                <a href="https://themeforest.net/user/unifytheme" class="tran3s p-color" target="_blank">
                  Unifytheme
                </a>
              </p>
              <ul class="float-right">
                <li><a href="" class="tran3s round-border"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
                <li><a href="" class="tran3s round-border"><i class="fa fa-dribbble" aria-hidden="true"></i></a></li>
                <li><a href="" class="tran3s round-border"><i class="fa fa-linkedin" aria-hidden="true"></i></a></li>
                <li><a href="" class="tran3s round-border"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
                <li><a href="" class="tran3s round-border"><i class="fa fa-vimeo" aria-hidden="true"></i></a></li>
              </ul>
            </div> <!-- /.wrapper -->
          </div> <!-- /.container -->
        </div> <!-- /.bottom-footer -->
      </footer>

      <button class="scroll-top tran3s hvr-shutter-out-horizontal">
        <i class="fa fa-angle-up" aria-hidden="true"></i>
      </button>

    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import RootPM from '@/presentation-models/RootPM';

export default Vue.extend({
  data() {
    return {
      pm: new RootPM(),
    };
  },
  metaInfo: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
  },
});
</script>

<style lang="scss" scoped>
.logo {
  height: 100px;
}
</style>
