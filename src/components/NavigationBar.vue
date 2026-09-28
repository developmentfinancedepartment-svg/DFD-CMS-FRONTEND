<template>
  <nav class="bg-[#001a3d] border-b border-blue-800 sticky top-0 z-[100] shadow-2xl">
    <div class="max-w-7xl mx-auto px-6">
      <div class="flex h-20 items-center justify-between">
        
        <!-- BRANDING -->
        <router-link to="/home/view" class="flex items-center gap-3 group">
          <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-900 shadow-lg group-hover:scale-110 transition-transform">
            <img src="../assets/logonew.png" class="h-6" alt="Logo" />
          </div>
          <div class="flex flex-col">
            <span class="text-sm font-black text-white uppercase tracking-widest leading-none">ITMD CMS</span>
            <span class="text-[11px] font-bold text-blue-300 uppercase tracking-tighter mt-1">Content Management System</span>
          </div>
        </router-link>

        <!-- NAVIGATION LINKS -->
        <div class="hidden lg:flex items-center gap-1">
          <router-link :to="{ name: 'view-home' }" class="nav-link">Home</router-link>
          
          <div class="relative group">
            <button class="nav-link flex items-center gap-1.5 focus:outline-none">
              Document Upload
              <svg class="w-3.5 h-3.5 text-blue-400 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div class="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
              <div class="w-64 bg-[#002a5c] rounded-2xl shadow-2xl border border-blue-800 py-3">
                <router-link :to="{ name: 'action-home' }" class="dropdown-link">Action Plan </router-link>
                <router-link :to="{ name: 'performance-home' }" class="dropdown-link">Performance Reports</router-link>
                <router-link :to="{ name: 'hardware-specification' }" class="dropdown-link">Hardware Specification</router-link>
                <router-link :to="{ name: 'event-home' }" class="dropdown-link">Events</router-link>
              </div>
            </div>
          </div>

          <router-link :to="{ name: 'category-staff' }" class="nav-link">staff</router-link>
          <router-link :to="{ name: 'news-home' }" class="nav-link">News</router-link>

          <!-- SUPERADMIN SECTION -->
          <div v-if="authStore.isSuperAdmin" class="flex items-center gap-1 ml-4 pl-4 border-l border-blue-800">
            <router-link :to="{ name: 'admin-management' }" class="nav-link-special">Admins</router-link>
            <router-link :to="{ name: 'audit-logs' }" class="nav-link-special">Logs</router-link>
          </div>
        </div>

        <!-- USER SECTION -->
        <div class="flex items-center gap-4">
          <div class="flex flex-col items-end hidden sm:flex">
            <span class="text-[12px] font-black text-red-400 uppercase tracking-widest line-none ">LogOut</span>
            <span class="text-sm font-bold text-white">{{ authStore.username || 'System Admin' }}</span>
          </div>
          <button @click="logout" class="p-2.5 bg-blue-800/50 text-blue-300 hover:text-white hover:bg-red-600 rounded-xl transition-all shadow-inner border border-blue-700">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          </button>
        </div>

      </div>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from "../Stores/authStore";
import router from "@/router";

export default {
  setup() {
    const authStore = useAuthStore();

    const logout = () => {
      if (confirm("Terminate current administrative session?")) {
        authStore.logout();
        router.push("/login");
      }
    };

    return { authStore, logout };
  },
};
</script>

<style scoped lang="postcss">
.nav-link {
  @apply px-4 py-2 text-[13px] font-bold uppercase tracking-wider text-blue-100 hover:text-white hover:bg-white/10 rounded-xl transition-all;
}

.nav-link.router-link-active,
.nav-link-special.router-link-active {
  @apply text-white bg-blue-700/50 shadow-inner;
}

.nav-link-special {
  @apply px-4 py-2 text-[13px] font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 hover:bg-amber-400/10 rounded-xl transition-all;
}

.dropdown-link {
  @apply block px-6 py-3 text-[12px] font-black uppercase tracking-widest text-white hover:text-white hover:bg-blue-600 transition-all;
}

.router-link-active.dropdown-link {
  @apply text-white bg-blue-600;
}
</style>

