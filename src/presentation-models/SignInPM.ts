import axios from 'axios';
import { FormValidators, isFormValid } from '@/utils/form-validators';
import { SignInResponse } from '@/types/SignInResponse';
import store from '@/store';

export default class SignInPM {
  signInForm = {
    phoneNumber: { value: '', rules: [FormValidators.required, FormValidators.maxChar(15)] },
  };

  isFormValid(): boolean {
    return isFormValid(this.signInForm);
  }

  async signIn(): Promise<boolean> {
    try {
      const response = await axios.post<SignInResponse>('http://khair-elkhalij.com/api/check_phone', {
        phone: this.signInForm.phoneNumber.value,
      });

      if (response) {
        const user = response.data.data;
        const { token } = response.data.data;
        localStorage.setItem('token', `Bearer ${token}`);
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        store.commit('auth_success', { token: `Bearer ${token}`, user });
      }

      return true;
    } catch (error) {
      localStorage.removeItem('token');
    }
    return false;
  }
}
