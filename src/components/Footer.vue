<template>
  <footer class="bg-[#084D52] border-t border-blue-900/50 py-12">
    <div class="px-6 mx-auto max-w-7xl">
      <div class="flex flex-col items-center justify-between gap-8 md:flex-row">
        <!-- BRANDING -->
        <div class="flex flex-col items-center md:items-start">
          <div class="flex items-center gap-3 mb-2">
            <div class="p-1.5 bg-white/10 rounded-lg">
              <img src="../assets/logonew.png" class="h-6 opacity-80" alt="Logo" />
            </div>
            <span class="text-sm font-black tracking-widest text-white uppercase">ITMD CMS</span>
          </div>
          <p class="text-[10px] text-blue-400 font-bold uppercase tracking-[0.2em]">Strategic Management Platform</p>
        </div>

        <!-- LEGAL LINKS -->
        <ul class="flex flex-wrap justify-center gap-x-10 gap-y-4">
          <li v-for="link in ['Archive', 'Security', 'Protocols', 'Support']" :key="link">
            <a
              href="#"
              class="text-[11px] font-black text-blue-200 hover:text-white uppercase tracking-widest transition-all duration-300">
              {{ link }}
            </a>
          </li>
        </ul>

        <!-- COPYRIGHT -->
        <div class="flex flex-col items-center md:items-end">
          <span class="text-[10px] text-blue-500 font-bold uppercase tracking-widest leading-loose">
            {{ Version }} ALL RIGHTS RESERVED
          </span>
          <span class="text-[9px] text-gray-500 font-medium">Authorized Personnel Access Only</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  props: {},

  data() {
    return {
      Version: import.meta.env.VITE_Version, // get from env files
    };
  },

  computed: {},

  methods: {},
};
</script>
