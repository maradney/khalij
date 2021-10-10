<template>
  <div>
    <div id="banner">
      <div class="rev_slider_wrapper">
        <!-- START REVOLUTION SLIDER 5.0.7 auto mode -->
        <div id="charity-main-banner" class="rev_slider" data-version="5.0.7">
          <ul>
            <li data-index="rs-280"
                data-transition="zoomout"
                data-slotamount="default"
                data-easein="Power4.easeInOut"
                data-easeout="Power4.easeInOut"
                data-masterspeed="2000"
                data-rotate="0"
                data-saveperformance="off"
                data-title="01"
                data-description="">
              <img :src="require('../../public/images/1.jpg')"
                   alt="image" class="rev-slidebg"
                   data-bgparallax="3"
                   data-bgposition="center center"
                   data-duration="20000"
                   data-ease="Linear.easeNone"
                   data-kenburns="on"
                   data-no-retina=""
                   data-offsetend="0 0"
                   data-offsetstart="0 0"
                   data-rotateend="0"
                   data-rotatestart="0"
                   data-scaleend="100"
                   data-scalestart="140">
              <div class="tp-caption text-center"
                   data-x="['left','left','left','center']"
                   data-hoffset="['0','0','0','0']"
                   data-y="['middle','middle','middle','middle']"
                   data-voffset="['-70','-70','-50','-71']"
                   data-width="full"
                   data-height="none"
                   data-whitespace="normal"
                   data-transform_idle="o:1;"
                   data-transform_in="y:[100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;opacity:0;s:2000;e:Power4.easeInOut;"
                   data-transform_out="y:[100%];s:1000;e:Power2.easeInOut;s:1000;e:Power2.easeInOut;"
                   data-mask_in="x:0px;y:[100%];"
                   data-mask_out="x:inherit;y:inherit;"
                   data-start="500"
                   data-splitin="none"
                   data-splitout="none"
                   data-responsive_offset="on"
                   style="z-index: 6; white-space: nowrap;">
                <h1 class="slider-font">Small Effort <br> Make Big Change</h1>
              </div>
            </li>
            <li data-index="rs-18"
                data-transition="zoomin"
                data-slotamount="7"
                data-easein="Power4.easeInOut"
                data-easeout="Power4.easeInOut"
                data-masterspeed="2000"
                :data-thumb="require('../../public/images/2.jpg')"
                data-rotate="0"
                data-saveperformance="off"
                data-title="02" data-description="">
              <img :src="require('../../public/images/2.jpg')"
                   alt=""
                   data-bgposition="center center"
                   data-kenburns="on" data-duration="30000"
                   data-ease="Linear.easeNone"
                   data-scalestart="100"
                   data-scaleend="120"
                   data-rotatestart="0"
                   data-rotateend="0"
                   data-offsetstart="0 0"
                   data-offsetend="0 0"
                   data-bgparallax="10"
                   class="rev-slidebg"
                   data-no-retina>
              <div class="tp-caption text-center"
                   data-x="['left','left','left','center']" data-hoffset="['0','0','0','0']"
                   data-y="['middle','middle','middle','middle']" data-voffset="['-70','-70','-50','-71']"
                   data-width="full"
                   data-height="none"
                   data-whitespace="normal"
                   data-transform_idle="o:1;"
                   data-transform_in="y:[100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;opacity:0;s:2000;e:Power4.easeInOut;"
                   data-transform_out="y:[100%];s:1000;e:Power2.easeInOut;s:1000;e:Power2.easeInOut;"
                   data-mask_in="x:0px;y:[100%];"
                   data-mask_out="x:inherit;y:inherit;"
                   data-start="500"
                   data-splitin="none"
                   data-splitout="none"
                   data-responsive_offset="on"
                   style="z-index: 6; white-space: nowrap;">
                <h1 class="slider-font">Small Effort <br> Make Big Change</h1>
              </div>
            </li>
          </ul>
        </div>
      </div><!-- END REVOLUTION SLIDER -->
    </div> <!--  /#banner -->

    <section class="banner-bottom-section ch-p-bg-color text-center">
      <div class="container">
        <h3>We are non-profit Charity &amp; NGO Oranization</h3>
      </div> <!-- /.container -->
    </section>

    <div class="what-we-do transform-top">
      <div class="container">
        <div class="row">
          <div class="col-sm-4 col-xs-12">
            <div class="single-do text-center hvr-float-shadow">
              <img :src="require('../../public/images/icon/18.png')" alt="icon">
              <h5><a href="" class="tran3s">Collect Donation</a></h5>
              <span>Help us by donating</span>
              <p>There are many variations of passage of Lorem Ipsum available, but the majority have suffered alteration</p>
            </div> <!-- /.single-do -->
          </div> <!-- /.col- -->
          <div class="col-sm-4 col-xs-12">
            <div class="single-do text-center hvr-float-shadow">
              <img :src="require('../../public/images/icon/19.png')" alt="icon">
              <h5><a href="" class="tran3s">Fundrising</a></h5>
              <span>Collect fund over the world</span>
              <p>There are many variations of passage of Lorem Ipsum available, but the majority have suffered alteration</p>
            </div> <!-- /.single-do -->
          </div> <!-- /.col- -->
          <div class="col-sm-4 col-xs-12">
            <div class="single-do text-center hvr-float-shadow">
              <img :src="require('../../public/images/icon/20.png')" alt="icon">
              <h5><a href="" class="tran3s">Volunteer</a></h5>
              <span>Become a volunteer</span>
              <p>There are many variations of passage of Lorem Ipsum available, but the majority have suffered alteration</p>
            </div> <!-- /.single-do -->
          </div> <!-- /.col- -->
        </div> <!-- /.row -->
      </div> <!-- /.container -->
    </div>

    <div class="our-team theme-team-style-one">
      <div class="container">
        <div class="charity-title text-center">
          <h2>Categories</h2>
          <p>Some of our top categories</p>
        </div> <!-- /.charity-title -->

        <div class="home-page__categories">
          <div class="home-page__categories__category"
               v-for="(category, index) in pm.categories" :key="`c${category.name} - ${index}`">
            <div class="single-team-member text-center">
              <div class="img">
                <img class="home-page__categories__category__img" :src="category.image" :alt="category.name">
              </div>
              <div class="title">
                <h6><a href="#" class="tran3s">{{ category.name }}</a></h6>
              </div>
            </div>
          </div> <!-- /.col- -->
        </div> <!-- /.row -->
      </div> <!-- /.container -->
    </div>

    <div class="recent-cause">
      <div class="container">
        <div class="charity-title text-center">
          <h2>Our products</h2>
          <p>Some of our amazing products</p>
        </div>

        <div class="home-page__products">
          <div
            class="single-cause home-page__products__product"
            v-for="(product, index) in pm.products"
            :key="`p${product.name} - ${index}`">
            <div class="img">
              <img class="home-page__products__product__img" :src="product.image" :alt="product.name">
            </div>
            <div class="title text-center">
              <h5 class="home-page__products__product__title"><a href="#" class="tran3s">{{ product.name }}</a></h5>
              <div v-html="product.description.substring(0, 105)"></div>
              <span><strong>QTY :</strong> {{ product.qty }}</span>
              <div class="clearfix">
                <a class="tran3s float-left ch-p-bg-color donate">Add to cart</a>
                <a class="tran3s float-left more">More Details</a>
              </div>
            </div>
          </div>
        </div>

        <a class="button-one all-cause">See all products</a>
      </div> <!-- /.container -->
    </div> <!-- /.recent-cause -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HomePM from '@/presentation-models/HomePM';

declare const window: Window & {
  BannerSliderFour: () => void;
};

export default Vue.extend({
  name: 'Home',
  data() {
    return {
      pm: new HomePM(),
    };
  },
  async created() {
    await this.pm.hydrate();
  },
  mounted() {
    window.BannerSliderFour();
  },
});
</script>

<style lang="scss">
.slider-font {
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}
.recent-cause {
  margin-bottom: 50px;
}
.home-page {
  &__categories {
    display: flex;
    flex-grow: 1;
    flex-basis: 0;
    gap: 30px;
    padding-top: 20px;
    &__category {
      max-width: 270px;
      min-width: 270px;
      width: 270px;
      height: 333px;
      border-radius: 4px;
      margin-bottom: 115px;
      &__img {
        border: black 1px solid;
      }
    }
  }

  &__products {
    display: flex;
    flex-grow: 1;
    flex-basis: 0;
    gap: 30px;
    &__product {
      max-width: 370px;
      min-width: 370px;
      &__img {
        max-width: 370px;
        min-width: 370px;
        width: 370px;
        height: 247px;
      }
      &__title {
        height: 35px;
      }
    }
  }
}
</style>
