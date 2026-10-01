<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="max-w-6xl mx-auto">
      
      <!-- HEADER -->
      <div class="flex justify-between items-center mb-10">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">Staff Management</h1>
          <p class="text-gray-500 font-medium">Personnel infrastructure and departmental organization</p>
        </div>
      </div>

      <!-- NAVIGATION TABS -->
      <div class="bg-white p-1 rounded-2xl shadow-sm border border-gray-100 inline-flex mb-8">
        <router-link
          :to="{ name: 'category-staff' }"
          class="px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2 nav-tab"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
          Manage Category
        </router-link>
        <router-link
          :to="{ name: 'members-staff' }"
          class="px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2 nav-tab"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          Staff Member
        </router-link>
        <router-link
          :to="{ name: 'view-edit-staff' }"
          class="px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2 nav-tab"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          View/Edit Staff
        </router-link>
      </div>

      <!-- DYNAMIC CONTENT -->
      <div class="bg-transparent">
        <router-view v-slot="{ Component }">
          <transition 
            enter-active-class="transform transition ease-out duration-300"
            enter-from-class="opacity-0 translate-y-4"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition ease-in duration-200"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
            mode="out-in"
          >
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nav-tab {
  color: #64748b;
}

.nav-tab:hover {
  color: #0f172a;
  background-color: #f8fafc;
}

.router-link-active {
  background-color: #084D52 !important;
  color: white !important;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}
</style>
