import { Vue as ParentVue } from 'vue';

declare module 'vue/types/vue' {
  import CartPM from '@/presentation-models/CartPM';

  interface Vue extends ParentVue{
    cartPM: CartPM;
  }
}
