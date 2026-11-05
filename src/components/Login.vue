<template>
  <div class="min-h-screen flex relative bg-[linear-gradient(145deg,#002e35,#004d5a,#008795)] font-sans overflow-x-hidden selection:bg-cyan-500 selection:text-white">
    <!-- Full-screen Background Overlays -->
    <div class="absolute inset-0 bg-login-wallpaper bg-cover bg-center opacity-25 mix-blend-overlay pointer-events-none"></div>
    <div class="absolute inset-0 bg-gradient-to-br from-[#002e35]/95 via-[#004d5a]/85 to-[#002e35]/95 pointer-events-none"></div>

    <!-- Left Side: DFD Branding -->
    <div class="hidden md:flex md:w-1/2 relative z-10 overflow-hidden">
      <!-- Ambient glow on left hero -->
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <!-- Logo and Information -->
      <div class="relative z-10 p-10 lg:p-16 flex flex-col items-center justify-center w-full text-center h-full">
        <!-- Glowing Pill Badge -->
        <div class="mb-8 px-5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white/90 text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center gap-2">
          <i class="fas fa-shield-alt text-cyan-300"></i> OFFICIAL TREASURY PORTAL
        </div>

        <div class="mb-8 relative">
           <!-- Emblem glow effect -->
           <div class="absolute inset-0 bg-white/10 blur-2xl rounded-full scale-150"></div>
           <img src="/emblem.svg" alt="Sri Lanka National Emblem" class="relative z-10 w-36 h-36 object-contain mx-auto drop-shadow-2xl" />
        </div>
        <h1 class="text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight uppercase leading-[1.1]">DEPARTMENT OF DEVELOPMENT FINANCE</h1>
        <p class="text-teal-100 font-bold tracking-[0.25em] uppercase text-xs lg:text-sm opacity-90 leading-relaxed max-w-lg">
          Ministry of Finance, Economic Stabilization & National Policies
        </p>
        <div class="w-16 h-1 bg-cyan-400 rounded-full mt-10 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>

        <!-- 3 Horizontal Security Indicators -->
        <div class="mt-auto pt-16 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-cyan-50/70 text-[10px] font-bold tracking-widest uppercase">
          <div class="flex items-center gap-2"><i class="fas fa-lock text-cyan-400/80 text-sm"></i> 256-Bit TLS Encryption</div>
          <div class="hidden sm:block w-1 h-1 bg-cyan-400/50 rounded-full"></div>
          <div class="flex items-center gap-2"><i class="fas fa-user-shield text-cyan-400/80 text-sm"></i> Authorized Personnel Only</div>
          <div class="hidden sm:block w-1 h-1 bg-cyan-400/50 rounded-full"></div>
          <div class="flex items-center gap-2"><i class="fas fa-university text-cyan-400/80 text-sm"></i> Ministry of Finance</div>
        </div>
      </div>
    </div>

    <!-- Right Side: Login Form -->
    <div class="w-full md:w-1/2 flex flex-col items-center justify-center p-4 sm:p-8 relative z-10">
      <!-- Ambient glow on right form -->
      <div class="absolute top-1/3 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div class="w-full max-w-[28rem] relative z-10">
        <!-- Card -->
        <div class="bg-white rounded-[2rem] shadow-2xl shadow-black/25 border border-gray-100 p-8 sm:p-12 transition-all">
          <div class="mb-10 text-center">
            <div class="md:hidden flex flex-col items-center justify-center mb-8 gap-4">
               <img src="/emblem.svg" alt="Sri Lanka National Emblem" class="w-20 h-20 object-contain drop-shadow-md" />
               <div class="px-4 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-800 text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5 shadow-sm">
                 <i class="fas fa-shield-alt text-teal-600"></i> OFFICIAL TREASURY PORTAL
               </div>
            </div>
            <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight text-center">Welcome</h2>
            <p class="text-gray-500 text-sm mt-2 font-medium text-center">Sign in to DFD Admin Panel</p>
          </div>

          <form @submit.prevent="login" class="space-y-6">
            <!-- Username -->
            <div class="space-y-2">
              <label class="block text-sm font-bold text-gray-700 ml-1">Username</label>
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#008795] transition-colors">
                  <i class="fas fa-user-shield text-sm"></i>
                </div>
                <input
                  v-model="credentials.username"
                  type="text"
                  placeholder="Enter your username"
                  required
                  class="custom-hover-input w-full pl-11 pr-4 py-2.5 text-sm bg-gray-50/70 border border-gray-200 rounded-2xl text-gray-900 font-medium placeholder-gray-400 focus:bg-white focus:border-[#008795] focus:ring-4 focus:ring-[#008795]/10 outline-none transition-all shadow-sm"
                />
              </div>
            </div>

            <!-- Password -->
            <div class="space-y-2">
              <label class="block text-sm font-bold text-gray-700 ml-1">Password</label>
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#008795] transition-colors">
                  <i class="fas fa-lock text-sm"></i>
                </div>
                <input
                  v-model="credentials.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Enter your password"
                  required
                  class="custom-hover-input w-full pl-11 pr-4 py-2.5 text-sm bg-gray-50/70 border border-gray-200 rounded-2xl text-gray-900 font-medium placeholder-gray-400 focus:bg-white focus:border-[#008795] focus:ring-4 focus:ring-[#008795]/10 outline-none transition-all shadow-sm"
                />
                <button 
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-[#008795] hover:bg-gray-100 rounded-xl transition-all"
                >
                  <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
                </button>
              </div>
            </div>

            <!-- Remember Me & Forgot Password -->
            <div class="flex items-center justify-between pt-1">
              <label class="flex items-center gap-2.5 cursor-pointer group">
                <div class="relative flex items-center justify-center w-5 h-5">
                  <input type="checkbox" class="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-md bg-white checked:bg-[#008795] checked:border-[#008795] focus:outline-none focus:ring-4 focus:ring-[#008795]/20 transition-all cursor-pointer" />
                  <i class="fas fa-check absolute text-white text-xs opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"></i>
                </div>
                <span class="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors select-none">Remember device</span>
              </label>
              <a href="#" class="text-sm font-bold text-[#008795] hover:text-[#006f7a] hover:underline transition-all">Forgot credentials?</a>
            </div>

            <!-- Error Message -->
            <div v-if="status === 'error'" class="px-5 py-4 rounded-2xl bg-red-50 text-red-700 text-sm font-bold border border-red-100 flex items-center gap-3 shadow-sm">
              <div class="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <i class="fas fa-exclamation-triangle text-red-600"></i>
              </div>
              Login failed. Please check your credentials.
            </div>

            <!-- Login Button -->
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full bg-[#008795] hover:bg-[#006f7a] text-white font-bold py-2.5 text-sm rounded-xl shadow-[0_8px_20px_rgba(0,135,149,0.3)] hover:shadow-[0_12px_25px_rgba(0,135,149,0.4)] transition-all duration-300 hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:scale-100 flex items-center justify-center gap-3 group mt-4 relative overflow-hidden"
            >
              <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              <span v-if="!isLoading" class="flex items-center gap-2.5 relative z-10 tracking-wide text-lg">
                Sign In 
                <i class="fas fa-arrow-right opacity-90 group-hover:translate-x-1.5 transition-transform duration-300"></i>
              </span>
              <div v-else class="flex items-center gap-3 relative z-10">
                <span class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Authenticating...
              </div>
            </button>
          </form>
        </div>

        <!-- Footer Credit (Under the Card) -->
        <div class="mt-8 flex flex-col items-center justify-center gap-1.5 text-[11px] text-gray-300/80 font-bold tracking-[0.2em] uppercase">
          <div class="flex items-center gap-2">
            <i class="fas fa-lock text-cyan-400/80 text-sm"></i> OFFICIAL DFD CORPORATE PORTAL
          </div>
          <span class="text-[9px] text-gray-400/70 tracking-wider font-medium">V1.2.0 • SECURE SESSION</span>
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
        if (authStore.isAuthenticated) {
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
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

.font-sans {
  font-family: 'Inter', sans-serif;
}

.custom-hover-input:hover {
  border-color: #008795;
  box-shadow: 0 0 0 1px #008795;
}

.custom-hover-input:focus {
  border-color: #008795;
  box-shadow: 0 0 0 4px rgba(0, 135, 149, 0.15);
}
</style>
