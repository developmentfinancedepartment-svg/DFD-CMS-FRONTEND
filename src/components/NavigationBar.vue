<template>
  <nav class="bg-[#002025]/95 backdrop-blur-md border-b border-cyan-500/20 sticky top-0 z-[100] shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
    <div class="max-w-7xl mx-auto px-6">
      <div class="flex h-20 items-center justify-between">
        
        <!-- BRANDING -->
        <router-link to="/home/view" class="flex items-center gap-3.5 group">
          <div class="w-11 h-11 bg-gradient-to-br from-[#003842] to-[#008795] border border-cyan-400/30 rounded-xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(0,135,149,0.35)] group-hover:scale-105 transition-transform">
            <img src="../assets/emblem.svg" class="h-6 object-contain brightness-110" alt="Logo" />
          </div>
          <div class="flex flex-col">
            <div class="flex items-center gap-2">
              <span class="text-sm font-black text-white uppercase tracking-widest leading-none">DFD CMS</span>
              <span class="px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-400/25">DFD Portal</span>
            </div>
            <span class="text-[11px] font-semibold text-cyan-200/70 uppercase tracking-wider mt-1">Department of Development Finance</span>
          </div>
        </router-link>

        <!-- NAVIGATION LINKS -->
        <div class="hidden lg:flex items-center gap-1.5">
          <router-link :to="{ name: 'view-home' }" class="nav-link">Overview</router-link>
          
          <div class="relative group">
            <button 
              class="nav-link flex items-center gap-1.5 focus:outline-none"
              :class="{ 'router-link-active': isDocumentsActive }"
            >
              {{ documentsDropdownLabel }}
              <svg class="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div class="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
              <div class="w-64 bg-[#003842] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-cyan-500/30 py-2.5 overflow-hidden">
                <router-link :to="{ name: 'admin-publications' }" class="dropdown-link">Action Plans</router-link>
                <router-link to="/admin/gallery" class="dropdown-link">Gallery</router-link>
                <router-link :to="{ name: 'event-home' }" class="dropdown-link">Events</router-link>
                <router-link to="/admin/field-visits" class="dropdown-link">Field Visits</router-link>
              </div>
            </div>
          </div>

          <router-link :to="{ name: 'category-staff' }" class="nav-link">Staff</router-link>
          <router-link :to="{ name: 'news-home' }" class="nav-link">News</router-link>
          <router-link :to="{ name: 'manage-schemes' }" class="nav-link">Schemes</router-link>

          <!-- SUPERADMIN SECTION -->
          <div v-if="authStore.isSuperAdmin" class="flex items-center gap-1.5 ml-3 pl-3 border-l border-cyan-500/20">
            <router-link :to="{ name: 'admin-management' }" class="nav-link-special">Admins</router-link>
            <router-link :to="{ name: 'audit-logs' }" class="nav-link-special">Logs</router-link>
          </div>
        </div>

        <!-- USER SECTION -->
        <div class="flex items-center gap-3.5">
          <div class="hidden sm:flex items-center gap-3 px-3.5 py-1.5 rounded-xl bg-[#003842]/90 border border-cyan-500/25">
            <span class="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
            <div class="flex flex-col items-end">
              <span class="text-[10px] font-extrabold text-cyan-300 uppercase tracking-widest leading-none">
                {{ authStore.isSuperAdmin ? 'Super Administrator' : 'Super Administrator' }}
              </span>
              <span class="text-xs font-bold text-white mt-0.5">{{ authStore.username || 'Administrator' }}</span>
            </div>
          </div>
          <button
            @click="showLogoutModal = true"
            title="Terminate Session"
            class="p-2.5 bg-red-500/15 text-red-300 hover:text-white hover:bg-gradient-to-r hover:from-red-600 hover:to-rose-500 rounded-xl transition-all shadow-[0_0_15px_rgba(239,68,68,0.2)] border border-red-500/30"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          </button>
        </div>

      </div>
    </div>

    <!-- LOGOUT CONFIRMATION MODAL -->
    <div
      v-if="showLogoutModal"
      @click.self="showLogoutModal = false"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
    >
      <div class="relative w-full max-w-md rounded-2xl bg-[#003842] border border-cyan-500/30 p-7 shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_30px_rgba(6,182,212,0.15)] overflow-hidden">
        <!-- Glowing ambient accents -->
        <div class="pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full bg-cyan-400/15 blur-3xl"></div>
        <div class="pointer-events-none absolute -bottom-16 -left-16 w-40 h-40 rounded-full bg-red-500/15 blur-3xl"></div>

        <div class="relative z-10 flex flex-col items-center text-center">
          <!-- Red logout icon badge -->
          <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/15 border border-red-500/30 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.25)]">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>

          <!-- Title & Subtitle -->
          <h3 class="text-xl font-extrabold tracking-tight text-white">
            Terminate Session?
          </h3>
          <p class="mt-2 text-sm text-cyan-100/80 leading-relaxed">
            Are you sure you want to terminate your current administrative session?
          </p>

          <!-- Actions -->
          <div class="mt-7 flex w-full items-center gap-3">
            <button
              type="button"
              @click="showLogoutModal = false"
              class="flex-1 rounded-xl border border-cyan-400/25 bg-white/5 px-4 py-2.5 text-sm font-bold text-cyan-100 hover:bg-white/10 hover:text-white transition-all"
            >
              Cancel
            </button>
            <button
              type="button"
              @click="confirmLogout"
              class="flex-1 rounded-xl bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-600 px-4 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(225,29,72,0.35)] hover:shadow-[0_10px_25px_rgba(225,29,72,0.5)] transition-all"
            >
              Terminate
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "../Stores/authStore";
import router from "@/router";

export default {
  setup() {
    const route = useRoute();
    const authStore = useAuthStore();
    const showLogoutModal = ref(false);

    const documentsDropdownLabel = computed(() => {
      const path = (route.path || "").toLowerCase();
      const name = (route.name || "").toString().toLowerCase();

      // Display 'ACTION PLANS' when on the publications/action-plans route
      if (
        path.includes("publication") ||
        path.includes("action") ||
        name.includes("publication") ||
        name.includes("action")
      ) {
        return "ACTION PLANS";
      }

      // Display 'GALLERY' when on the gallery route
      if (
        path.includes("gallery") ||
        name.includes("gallery") ||
        path.includes("/admin/gallery")
      ) {
        return "GALLERY";
      }

      // Display 'FIELD VISITS' when on field visits route
      if (
        path.includes("field-visit") ||
        name.includes("field-visit") ||
        path.includes("/admin/field-visits")
      ) {
        return "FIELD VISITS";
      }

      // Display 'EVENTS' when on the events route
      if (path.includes("event") || name.includes("event")) {
        return "EVENTS";
      }

      // Revert back to 'DOCUMENTS' on any other route
      return "DOCUMENTS";
    });

    const isDocumentsActive = computed(() => {
      return documentsDropdownLabel.value !== "DOCUMENTS";
    });

    const confirmLogout = async () => {
      showLogoutModal.value = false;
      await authStore.logout();
      router.push("/login");
    };

    return { 
      authStore, 
      showLogoutModal, 
      confirmLogout, 
      documentsDropdownLabel, 
      isDocumentsActive 
    };
  },
};
</script>

<style scoped lang="postcss">
.nav-link {
  @apply px-4 py-2 text-[13px] font-bold uppercase tracking-wider text-cyan-100/80 hover:text-white hover:bg-[#003842] rounded-xl transition-all;
}

.nav-link.router-link-active,
.nav-link-special.router-link-active {
  @apply text-white bg-[#008795]/40 border border-cyan-400/30 shadow-[0_0_15px_rgba(0,135,149,0.3)];
}

.nav-link-special {
  @apply px-4 py-2 text-[13px] font-bold uppercase tracking-wider text-amber-300 hover:text-amber-200 hover:bg-amber-400/10 rounded-xl transition-all;
}

.dropdown-link {
  @apply block px-5 py-3 text-[12px] font-bold uppercase tracking-wider text-cyan-100/90 hover:text-white hover:bg-[#008795]/50 transition-all;
}

.router-link-active.dropdown-link {
  @apply text-white bg-[#008795];
}
</style>

