<template>
  <div>
    <div class="theme-inner-banner">
      <div class="opacity">
        <div class="container">
          <h2>Shop</h2>
          <ul>
            <li>
              <a class="tran3s" href="http://khair-elkhalij.com">
                Home
              </a>
            </li>
            <li>/</li>
            <li>Shop</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="shop-page">
      <div class="shop-sidebar-list shop-page__side">
        <h3>Categories</h3>
        <div class="progress" v-show="pm.areCategoriesLoading">
          <div class="progress-bar progress-bar-striped active"
               role="progressbar"
               aria-valuenow="45"
               aria-valuemin="0"
               aria-valuemax="100"
               style="width: 100%">
          </div>
        </div>
        <ul>
          <li>
            <a class="tran3s"
               v-bind:class="{ active: pm.selectedCategory === 'all' }"
               @click.prevent="loadProducts('all')">
              All
            </a>
          </li>
          <li v-for="(category, index) in pm.categories" :key="`c${category.name} - ${index}`">
            <a class="tran3s"
               v-bind:class="{ active: pm.selectedCategory === category.slug }"
               @click.prevent="loadProducts(category.slug)">
              {{ category.name }}
            </a>
          </li>
        </ul>
      </div>
      <div class="shop-page__shop-content">
        <div class="progress" v-show="pm.areProductsLoading || !this.canAddToCart">
          <div class="progress-bar progress-bar-striped active"
               role="progressbar"
               aria-valuenow="45"
               aria-valuemin="0"
               aria-valuemax="100"
               style="width: 100%">
          </div>
        </div>
        <div class="all-product-wrapper shop-page__products">
          <div class="shop-page__products__product"
               v-for="(product, index) in pm.products"
               :key="`p${product.name} - ${index}`">
            <div class="single-item">
              <img :src="product.image" alt="">
              <h5><a href="#" class="tran3s">{{ product.name }}</a></h5>
              <div class="clearfix">
                <strong class="float-left">${{ product.price }}</strong>
              </div>
              <a href="#" class="tran3s cart cart-btn"
                 :class="{ disabled: !canAddToCart }"
                 @click.prevent="addToShoppingCart({
                 id: product.id, count: 1, locationId: product.location[0].id, price: 1, note: ''
                 })">ADD TO CART</a>
            </div> <!-- /.single-item -->
          </div>
        </div>
      </div>
    </div> <!-- /.shop-page -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ShopPM from '@/presentation-models/ShopPM';
import eventBus from '@/eventBus';

export default Vue.extend({
  name: 'Shop',
  data() {
    return {
      pm: new ShopPM(),
      canAddToCart: true,
    };
  },
  async created(): Promise<void> {
    await this.pm.hydrate(this.$route.params.category);
  },
  methods: {
    async loadProducts(category: string): Promise<void> {
      await this.pm.loadProducts(category);
    },
    async addToShoppingCart(
      product: { id: number; count: number; locationId: number; price: number; note?: string; },
    ): Promise<void> {
      if (this.canAddToCart) {
        this.canAddToCart = false;
        await this.cartPM.addToCart(product);
        eventBus.$emit('cart-change');
        this.canAddToCart = true;
      }
    },
  },
});
</script>

<style lang="scss">
.theme-inner-banner {
  background: url(../../public/images/3.jpg) no-repeat center center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  margin-bottom: 60px;
}
.shop-page {
  display: flex;
  flex-basis: 0;
  gap: 60px;
  padding-inline-start: 10vw;
  padding-inline-end: 10vw;
  &__side {
    flex-grow: 1;
    max-width: 270px;
    padding: 10px 10px 10px 10px;
    width: 270px;
    h3 {
      margin-bottom: 20px;
    }
  }
  &__shop-content{
    width: 100%;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 4px;
    .loader-container {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  &__products {
    flex-grow: 4;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 40px;
    .single-item > img {
      width: 270px !important;
      height: 255px !important;
    }
    .single-item > a.disabled {
      background-color: gainsboro !important;
    }
  }
}
</style>
