<template>
  <div>
    <div class="theme-inner-banner">
      <div class="opacity">
        <div class="container">
          <h2>Shop</h2>
          <ul>
            <li>
              <router-link class="tran3s" to="/">Home</router-link>
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
        <div class="loader-container">
          <div class="loader" v-show="pm.areCategoriesLoading"></div>
        </div>
        <ul>
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
        <div class="loader-container">
          <div class="loader" v-show="pm.areProductsLoading"></div>
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
              <a href="shop-details.html" class="tran3s cart">ADD TO CART</a>
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

export default Vue.extend({
  name: 'Shop',
  data() {
    return {
      pm: new ShopPM(),
    };
  },
  async created() {
    await this.pm.hydrate(this.$route.params.category);
    console.log(this.$route.params.category);
  },
  methods: {
    async loadProducts(category: string) {
      await this.pm.loadProducts(category);
    },
  },
});
</script>

<style lang="scss">
.shop-page {
  display: flex;
  flex-basis: 0;
  gap: 60px;
  &__side {
    flex-grow: 1;
    max-width: 250px;
    padding: 10px 10px 10px 30px;
    h3 {
      margin-bottom: 20px;
    }
    .loader-container {
      align-items: center;
      justify-content: center;
      display: flex;

      .loader {
        height: 30px;
        width: 30px;
        border: 8px solid #f3f3f3;
        border-top: 8px solid #3498db;
      }
    }
  }
  &__shop-content{
    width: 100%;
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
    .single-item img {
      width: 270px !important;
      height: 255px !important;
    }
  }
}
</style>
