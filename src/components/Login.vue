<template>
  <div class="min-h-screen flex bg-gray-50 font-sans">
    <!-- Left Side: ITMD Branding -->
    <div class="hidden md:flex md:w-1/2 relative bg-[#032b5f] overflow-hidden">
      <!-- Background Image with Overlay -->
      <div class="absolute inset-0 bg-login-wallpaper bg-cover bg-center opacity-50"></div>
      <div class="absolute inset-0 bg-gradient-to-br from-[#032b5f] via-[#032b5f]/80 to-transparent"></div>
      
      <!-- Logo and Information -->
      <div class="relative z-10 p-12 flex flex-col items-center justify-center w-full text-center h-full">
        <div class="mb-8">
           <img src="@/assets/logonew.png" alt="ITMD Logo" class="w-32 h-32 object-contain mx-auto drop-shadow-2xl" />
        </div>
        <h1 class="text-4xl font-black text-white mb-2 tracking-tight uppercase"></h1>
        <p class="text-blue-100 font-bold tracking-[0.2em] uppercase text-xs opacity-80 leading-relaxed">
          Information Technology<br/>Management Division
        </p>
        <div class="w-16 h-1 bg-blue-500 rounded-full mt-8"></div>
      </div>
    </div>

    <!-- Right Side: Login Form -->
    <div class="w-full md:w-1/2 flex items-center justify-center p-6">
      <div class="w-full max-w-md">
        <!-- Card -->
        <div class="bg-white rounded-3xl shadow-xl shadow-blue-900/5 border border-gray-100 p-10 lg:p-12">
          <div class="mb-10 text-center md:text-left">
            <div class="md:hidden flex justify-center mb-6">
               <img src="@/assets/logonew.png" alt="ITMD Logo" class="w-20 h-20 object-contain" />
            </div>
            <h2 class="text-3xl font-bold text-gray-800">Welcome</h2>
            <p class="text-gray-400 text-sm mt-1">Sign in to ITMD Admin Panel</p>
          </div>

          <form @submit.prevent="login" class="space-y-6">
            <!-- Username -->
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2 ml-1">Username</label>
              <input
                v-model="credentials.username"
                type="text"
                placeholder="Enter your username"
                required
                class="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-gray-800 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
              />
            </div>

            <!-- Password -->
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2 ml-1">Password</label>
              <div class="relative">
                <input
                  v-model="credentials.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Enter your password"
                  required
                  class="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-gray-800 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                />
                <button 
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
                </button>
              </div>
            </div>

            <!-- Error Message -->
            <div v-if="status === 'error'" class="px-4 py-3 rounded-xl bg-red-50 text-red-600 text-sm font-medium border border-red-100 flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              Login failed. check credentials.
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              class="w-full bg-[#032b5f] hover:bg-[#043d87] text-white font-bold py-4 rounded-2xl shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <span v-if="!isLoading">Login</span>
              <div v-else class="flex items-center gap-2">
                <span class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Authenticating...
              </div>
            </button>
          </form>

          <p class="mt-10 text-center text-xs text-gray-400 font-medium tracking-widest uppercase">
            Official ITMD Corporate Portal
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "../Stores/authStore";
import { computed, reactive, ref } from "vue";
import router from "../router/index.js";

export default {
  setup() {
    const authStore = useAuthStore();
    const showPassword = ref(false);
    const isLoading = ref(false);

    const credentials = reactive({
      username: "",
      password: "",
    });

    const status = computed(() => authStore.status);

    const login = async () => {
      isLoading.value = true;
      try {
        await authStore.login(credentials);
        if (authStore.accessToken) {
          router.push("/home/view");
        }
      } catch (error) {
        console.error("Login error:", error);
      } finally {
        isLoading.value = false;
      }
    };

    return { credentials, login, status, showPassword, isLoading };
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap');

.font-sans {
  font-family: 'Inter', sans-serif;
}
</style>
