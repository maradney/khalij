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
            <li>
              <router-link to="/shop">
                Shop
              </router-link>
            </li>
            <li>/</li>
            <li>{{ pm.product.name }}</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="product-details">
      <div class="progress" v-show="pm.isProductLoading || !pm.canAddToCart">
        <div class="progress-bar progress-bar-striped active"
             role="progressbar"
             aria-valuenow="45"
             aria-valuemin="0"
             aria-valuemax="100"
             style="width: 100%">
        </div>
      </div>
      <div class="product-details__img-container">
        <img class="product-details__img-container__img" :src="pm.product.image"
             :alt="pm.product.name">
      </div>

      <div class="product-details__cards">
        <div class="product-details__cards__card">
          <div class="product-details__cards__card__key">
            Name
          </div>
          <div class="product-details__cards__card__value">
            {{ pm.product.name }}
          </div>
        </div>
        <div class="product-details__cards__card">
          <div class="product-details__cards__card__key">
            Price
          </div>
          <div class="product-details__cards__card__value">
            {{ pm.product.price }}
          </div>
        </div>
        <div class="product-details__cards__card">
          <div class="product-details__cards__card__key">
            QTY
          </div>
          <div class="product-details__cards__card__value">
            {{ pm.product.qty }}
          </div>
        </div>
      </div>

      <div class="product-details__description">
        <div v-html="pm.product.description"></div>
      </div>

      <div class="product-details__locations">
        <div class="product-details__locations__location"
             v-for="(location, index) in pm.product.location"
             :key="`product-location-${location.name}-${index}`">
          <img class="product-details__locations__location__flag" :src="location.flag"
               :alt="location.name">
          <div class="product-details__locations__location__name">
            {{ location.name }}
          </div>
        </div>
      </div>
    </div>

    <div class="add-to-cart">
      <button class="add-to-cart__button" @click="open">
        Add to cart
      </button>
    </div>

    <vue-bottom-sheet maxWidth="800px" :isOpened="bottomSheetOpened" @closed="close">
      <div class="product-cart">
        <div class="product-cart__title">
          <h1>
            Add To Cart
          </h1>
        </div>
        <div class="product-cart__locations-container">
          <h5 class="product-cart__locations-container__title">
            Choose location
          </h5>
          <div class="product-cart__locations-container__locations" @click="open">
            <div class="product-cart__locations-container__locations__location"
                 v-for="(location, index) in pm.product.location"
                 :key="`cart-location-${location.name}-${index}`">
              <img class="product-cart__locations-container__locations__location__flag"
                   :src="location.flag"
                   :alt="location.name">
              <div class="product-cart__locations-container__locations__location__name">
                {{ location.name }}
                <input type="radio" name="cart-item-location" :value="location.id"
                       v-model.number="pm.cartForm.locationId" required>
              </div>
            </div>
          </div>
        </div>
        <div class="product-cart__input-container">
          <h5 class="product-cart__input-container__title">
            Choose Count
          </h5>
          <input class="form-control product-cart__input-container__input"
                 v-model.number="pm.cartForm.count" type="number" min="0" step="1" required>
        </div>
        <div class="product-cart__input-container" v-if="pm.product.is_custom_price">
          <h5 class="product-cart__input-container__title">
            Choose Price
          </h5>
          <input class="form-control product-cart__input-container__input"
                 v-model.number="pm.cartForm.price" type="number" min="0" step="1" required>
        </div>
        <div class="product-cart__input-container">
          <h5 class="product-cart__input-container__title">
            Notes
          </h5>
          <textarea class="form-control product-cart__input-container__input"
                    v-model.trim="pm.cartForm.notes"></textarea>
        </div>
        <div class="product-cart__actions">
          <button class="product-cart__actions__add" @click="addToShoppingCart">Add</button>
          <button class="product-cart__actions__cancel" @click="close">Cancel</button>
        </div>
      </div>
    </vue-bottom-sheet>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import VueBottomSheet from '@/components/vue-bottom-sheet.vue';
import ProductPM from '@/presentation-models/ProductPM';
import eventBus from '@/eventBus';

export default Vue.extend({
  name: 'Product',
  components: {
    VueBottomSheet,
  },
  data() {
    return {
      pm: new ProductPM({
        productId: parseInt(this.$route.params.productId, 10),
      }),
      bottomSheetOpened: false,
    };
  },
  async created(): Promise<void> {
    await this.pm.hydrate();
  },
  methods: {
    open() {
      this.bottomSheetOpened = true;
    },
    close() {
      this.bottomSheetOpened = false;
    },
    async addToShoppingCart(): Promise<void> {
      if (this.pm.canAddToCart) {
        this.pm.canAddToCart = false;
        await this.cartPM.addToCart({
          id: this.pm.product.id,
          locationId: this.pm.cartForm.locationId,
          count: this.pm.cartForm.count,
          price: this.pm.product.is_custom_price ? this.pm.cartForm.price : this.pm.product.price,
          note: this.pm.cartForm.notes,
        });
        eventBus.$emit('cart-change');
        this.pm.canAddToCart = true;
        this.close();
      }
    },
  },
});
</script>

<style lang="scss">
.product-details {
  padding: 10px 10vw 10px 10vw;

  display: flex;
  flex-direction: column;
  gap: 50px;

  &__img-container {
    width: 100%;

    &__img {
      width: 100%;
      border-radius: 4px;
    }
  }

  &__cards {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    gap: 20px;

    &__card {
      border-radius: 4px;
      border: 1px solid #e96a30;
      display: flex;
      width: 200px;
      justify-content: space-between;
      padding: 10px 10px 10px 10px;

      &__key {
        width: fit-content;
        font-weight: bold;
      }

      &__value {
        width: fit-content;
        color: #e96a30;
      }
    }
  }

  &__description {
    padding: 10px 10px 10px 10px;
  }

  &__locations {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    gap: 20px;

    &__location {
      border: 1px solid #e96a30;
      border-radius: 4px;
      display: flex;
      flex-direction: row;
      height: 100px;

      &__name {
        text-align: center;
        vertical-align: middle;
        line-height: 65px;
        width: fit-content;
        padding: 20px 20px 20px 20px;
      }
    }
  }
}

.product-cart {
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 20px 20px 20px 20px;
  width: 100%;

  &__title {
    text-align: center;
  }

  &__locations-container {
    &__title {
      color: #e96a30 !important;
    }

    &__locations {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      overflow-x: scroll;
      width: 100%;
      gap: 20px;

      &__location {
        border: 1px solid #e96a30;
        border-radius: 4px;
        display: flex;
        flex-direction: row;
        height: 100px;
        flex-shrink: 0;

        &__name {
          text-align: center;
          vertical-align: middle;
          line-height: 65px;
          width: fit-content;
          padding: 20px 20px 20px 20px;
        }
      }
    }
  }

  &__input-container {
    &__title {
      color: #e96a30 !important;
    }

    &__input:focus {
      border-color: #e96a30;
      -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(234, 117, 63, .6);
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(234, 117, 63, .6);
    }
  }

  &__actions {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 20px;

    &__add {
      width: 200px;
      padding: 5px 5px 5px 5px;
      color: white;
      background-color: #e96a30;
      border-radius: 4px;
    }

    &__add:active {
      background-color: #a1451a;
    }

    &__cancel {
      width: 200px;
      padding: 5px 5px 5px 5px;
      background-color: white;
      color: #e96a30;
      border: 1px solid #e96a30;
      border-radius: 4px;
    }

    &__cancel:active {
      background-color: #b2b2b2;
    }
  }
}

.add-to-cart {
  display: flex;
  justify-content: center;
  padding: 20px 20px 20px 20px;

  &__button {
    width: 220px;
    height: 50px;
    padding: 5px 5px 5px 5px;
    color: white;
    background-color: #e96a30;
    border-radius: 4px;
  }

  &__button:active {
    background-color: #a1451a;
  }
}
</style>
