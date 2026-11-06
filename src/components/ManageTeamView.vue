<template>
  <div class="p-6 lg:p-8 bg-slate-50/60 min-h-screen">
    <div class="max-w-7xl mx-auto space-y-6">

      <!-- 1. TOP HEADER & METRIC KPI STATS -->
      <div class="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 pb-2">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200/80 text-cyan-800 text-xs font-bold uppercase tracking-wider mb-2">
            <span class="h-1.5 w-1.5 rounded-full bg-[#008795]"></span>
            DFD Department Directory &amp; Administration
          </div>
          <h1 class="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Manage Our Team
          </h1>
          <p class="text-slate-500 mt-1 text-sm">
            Maintain leadership records, divisional hierarchy, room allocations, intercom extensions, and contact channels.
          </p>
        </div>

        <!-- Metric KPI Cards -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3.5 w-full xl:w-auto">
          <!-- Total Officials -->
          <div class="flex items-center gap-3 px-4 py-3 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
            <div class="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#008795] shrink-0">
              <i class="fas fa-users text-sm"></i>
            </div>
            <div>
              <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Officials</p>
              <span class="text-lg font-extrabold text-slate-900">{{ teamMembers.length }}</span>
            </div>
          </div>

          <!-- Divisions -->
          <div class="flex items-center gap-3 px-4 py-3 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
            <div class="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
              <i class="fas fa-sitemap text-sm"></i>
            </div>
            <div>
              <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Divisions</p>
              <span class="text-lg font-extrabold text-slate-900">{{ distinctDivisionsCount }}</span>
            </div>
          </div>

          <!-- Leadership -->
          <div class="flex items-center gap-3 px-4 py-3 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
            <div class="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
              <i class="fas fa-user-tie text-sm"></i>
            </div>
            <div>
              <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Leadership</p>
              <span class="text-lg font-extrabold text-slate-900">{{ leadershipCount }}</span>
            </div>
          </div>

          <!-- Extensions -->
          <div class="flex items-center gap-3 px-4 py-3 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
            <div class="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
              <i class="fas fa-phone-alt text-sm"></i>
            </div>
            <div>
              <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Extensions</p>
              <span class="text-lg font-extrabold text-slate-900">{{ extensionsCount }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Alerts -->
      <div v-if="showSuccessAlert && successMessage" class="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center justify-between shadow-sm animate-in fade-in duration-200">
        <div class="flex items-center gap-2.5">
          <i class="fas fa-check-circle text-emerald-600 text-base"></i>
          <span>{{ successMessage }}</span>
        </div>
        <button type="button" @click="dismissSuccessAlert" class="text-emerald-600 hover:text-emerald-800 p-1">
          <i class="fas fa-times text-xs"></i>
        </button>
      </div>

      <div v-if="errorMessage" class="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm font-semibold flex items-center justify-between shadow-sm animate-in fade-in duration-200">
        <div class="flex items-center gap-2.5">
          <i class="fas fa-exclamation-triangle text-rose-600 text-base"></i>
          <span>{{ errorMessage }}</span>
        </div>
        <button type="button" @click="errorMessage = ''" class="text-rose-600 hover:text-rose-800 p-1">
          <i class="fas fa-times text-xs"></i>
        </button>
      </div>

      <!-- 2. MAIN SPLIT GRID -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        <!-- LEFT COLUMN: ADD OFFICIAL FORM -->
        <div class="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm sticky top-6">
          <div class="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#008795]">
                <i class="fas fa-user-plus text-sm"></i>
              </div>
              <div>
                <h2 class="text-lg font-bold text-slate-800">Add Official</h2>
                <p class="text-xs text-slate-400">Add a new official to the department directory</p>
              </div>
            </div>
          </div>

          <form @submit.prevent="handleCreate" class="space-y-4">
            <!-- Full Name -->
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name <span class="text-rose-500">*</span>
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <i class="fas fa-user text-xs"></i>
                </div>
                <input
                  v-model="form.name"
                  type="text"
                  required
                  placeholder="e.g. Mr. P.M.K. Hettiarachchi"
                  class="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] focus:bg-white focus:ring-2 focus:ring-[#008795]/20 focus:border-[#008795] outline-none transition text-slate-800 font-medium"
                />
              </div>
            </div>

            <!-- Designation -->
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Designation / Role Title <span class="text-rose-500">*</span>
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <i class="fas fa-id-badge text-xs"></i>
                </div>
                <input
                  v-model="form.designation"
                  type="text"
                  required
                  placeholder="e.g. Director General of Development Finance"
                  class="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] focus:bg-white focus:ring-2 focus:ring-[#008795]/20 focus:border-[#008795] outline-none transition text-slate-800 font-medium"
                />
              </div>
            </div>

            <!-- Division & Hierarchy Level (2 Columns) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <!-- Division -->
              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Division <span class="text-rose-500">*</span>
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <i class="fas fa-sitemap text-xs"></i>
                  </div>
                  <select
                    v-model="form.division"
                    required
                    class="w-full pl-10 pr-8 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] focus:bg-white focus:ring-2 focus:ring-[#008795]/20 focus:border-[#008795] outline-none transition text-slate-800 font-medium appearance-none cursor-pointer"
                  >
                    <option v-for="div in divisionOptions" :key="div" :value="div">{{ div }}</option>
                  </select>
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                    <i class="fas fa-chevron-down text-[10px]"></i>
                  </div>
                </div>
              </div>

              <!-- Hierarchy Level -->
              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Hierarchy Level <span class="text-rose-500">*</span>
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <i class="fas fa-layer-group text-xs"></i>
                  </div>
                  <select
                    v-model="form.hierarchyLevel"
                    required
                    class="w-full pl-10 pr-8 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] focus:bg-white focus:ring-2 focus:ring-[#008795]/20 focus:border-[#008795] outline-none transition text-slate-800 font-medium appearance-none cursor-pointer"
                  >
                    <option value="HEAD">Head of Department (HEAD)</option>
                    <option value="ADG">Additional Director General (ADG)</option>
                    <option value="DIRECTOR">Director (DIRECTOR)</option>
                    <option value="DEPUTY_DIRECTOR">Deputy Director (DEPUTY)</option>
                    <option value="ASSISTANT_DIRECTOR">Assistant Director &amp; Officer</option>
                  </select>
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                    <i class="fas fa-chevron-down text-[10px]"></i>
                  </div>
                </div>
              </div>
            </div>

            <!-- Room / Location & Display Order (2 Columns) -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div class="sm:col-span-2">
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Room / Office Location
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <i class="fas fa-map-marker-alt text-xs"></i>
                  </div>
                  <input
                    v-model="form.room"
                    type="text"
                    placeholder="e.g. Room 140, 1st Floor"
                    class="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] focus:bg-white focus:ring-2 focus:ring-[#008795]/20 focus:border-[#008795] outline-none transition text-slate-800 font-medium"
                  />
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Display Order
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <i class="fas fa-sort-numeric-down text-xs"></i>
                  </div>
                  <input
                    v-model.number="form.displayOrder"
                    type="number"
                    min="1"
                    placeholder="1"
                    class="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] focus:bg-white focus:ring-2 focus:ring-[#008795]/20 focus:border-[#008795] outline-none transition text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>

            <!-- Contact Numbers (Office & Intercom Ext) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Office Phone
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <i class="fas fa-phone text-xs"></i>
                  </div>
                  <input
                    v-model="form.officePhone"
                    type="text"
                    placeholder="+94 11 248 4511"
                    class="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] focus:bg-white focus:ring-2 focus:ring-[#008795]/20 focus:border-[#008795] outline-none transition text-slate-800 font-medium"
                  />
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Extension (Intercom)
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <i class="fas fa-phone-volume text-xs"></i>
                  </div>
                  <input
                    v-model="form.extension"
                    type="text"
                    placeholder="1400"
                    class="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] focus:bg-white focus:ring-2 focus:ring-[#008795]/20 focus:border-[#008795] outline-none transition text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>

            <!-- Mobile & Residence / Fax -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Mobile Phone
                </label>
                <input
                  v-model="form.mobilePhone"
                  type="text"
                  placeholder="+94 71 845 2100"
                  class="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] focus:bg-white focus:ring-2 focus:ring-[#008795]/20 focus:border-[#008795] outline-none transition text-slate-800 font-medium"
                />
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Residence Phone
                </label>
                <input
                  v-model="form.resPhone"
                  type="text"
                  placeholder="+94 11 287 1420"
                  class="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] focus:bg-white focus:ring-2 focus:ring-[#008795]/20 focus:border-[#008795] outline-none transition text-slate-800 font-medium"
                />
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Fax Number
                </label>
                <input
                  v-model="form.fax"
                  type="text"
                  placeholder="+94 11 248 4512"
                  class="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] focus:bg-white focus:ring-2 focus:ring-[#008795]/20 focus:border-[#008795] outline-none transition text-slate-800 font-medium"
                />
              </div>
            </div>

            <!-- Emails (Primary & Secondary) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Primary Email
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <i class="fas fa-envelope text-xs"></i>
                  </div>
                  <input
                    v-model="form.primaryEmail"
                    type="email"
                    placeholder="dgdf@dfd.treasury.gov.lk"
                    class="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] focus:bg-white focus:ring-2 focus:ring-[#008795]/20 focus:border-[#008795] outline-none transition text-slate-800 font-medium"
                  />
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Secondary / Alt Email
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <i class="fas fa-at text-xs"></i>
                  </div>
                  <input
                    v-model="form.secondaryEmail"
                    type="email"
                    placeholder="hettiarachchi.pmk@treasury.gov.lk"
                    class="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] focus:bg-white focus:ring-2 focus:ring-[#008795]/20 focus:border-[#008795] outline-none transition text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>

            <!-- Description / Mandate -->
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Role Description / Mandate
              </label>
              <textarea
                v-model="form.description"
                rows="2"
                placeholder="Brief summary of official responsibilities or executive mandate..."
                class="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] focus:bg-white focus:ring-2 focus:ring-[#008795]/20 focus:border-[#008795] outline-none transition text-slate-800 font-medium resize-none"
              ></textarea>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full py-3 px-4 bg-gradient-to-r from-[#008795] to-[#003842] hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg v-if="isSubmitting" class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              <span>{{ isSubmitting ? 'Saving Official...' : 'Save Official to Directory' }}</span>
            </button>
          </form>
        </div>

        <!-- RIGHT COLUMN: OFFICIALS DIRECTORY LIST -->
        <div class="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-5">
          <!-- Search & Filter Bar -->
          <div class="space-y-3.5">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-lg font-bold text-slate-800">Department Officials</h2>
                <p class="text-xs text-slate-400">Search and manage officials across all DFD divisions</p>
              </div>
              <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                {{ filteredOfficials.length }} of {{ teamMembers.length }}
              </span>
            </div>

            <!-- Smart Search Input -->
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <i class="fas fa-search text-xs"></i>
              </div>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search by name, designation, division, room, extension, or email..."
                class="w-full pl-10 pr-9 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] focus:bg-white focus:ring-2 focus:ring-[#008795]/20 focus:border-[#008795] outline-none transition text-slate-800"
              />
              <button
                v-if="searchQuery"
                @click="searchQuery = ''"
                type="button"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              >
                <i class="fas fa-times text-xs"></i>
              </button>
            </div>

            <!-- Quick Division Filter Pills -->
            <div class="flex flex-wrap items-center gap-1.5 pt-1">
              <button
                type="button"
                @click="selectedDivisionFilter = 'ALL'"
                :class="[
                  'px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer',
                  selectedDivisionFilter === 'ALL'
                    ? 'bg-[#008795] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                ]"
              >
                All Divisions
              </button>
              <button
                v-for="div in divisionOptions"
                :key="div"
                type="button"
                @click="selectedDivisionFilter = div"
                :class="[
                  'px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer',
                  selectedDivisionFilter === div
                    ? 'bg-[#008795] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                ]"
              >
                {{ div }}
              </button>
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="loading" class="py-16 text-center">
            <div class="w-10 h-10 border-3 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p class="text-xs font-semibold text-slate-500">Loading department officials...</p>
          </div>

          <!-- Empty State -->
          <div v-else-if="filteredOfficials.length === 0" class="py-16 text-center bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
            <div class="w-12 h-12 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
              <i class="fas fa-user-slash text-base"></i>
            </div>
            <h3 class="text-sm font-bold text-slate-700">No Officials Found</h3>
            <p class="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
              No official matches your search query or filter. Adjust your filter or add a new official.
            </p>
          </div>

          <!-- Officials Cards Scroll Container -->
          <div v-else class="max-h-[calc(100vh-320px)] overflow-y-auto pr-1.5 space-y-3.5 custom-scrollbar">
            <div
              v-for="member in filteredOfficials"
              :key="member.id"
              class="p-4 rounded-2xl border border-slate-200/90 hover:border-[#008795]/50 bg-white hover:shadow-md transition-all group"
            >
              <div class="flex items-start justify-between gap-3">
                <div class="space-y-1.5 min-w-0 flex-1">
                  <!-- Badges: Hierarchy & Division -->
                  <div class="flex flex-wrap items-center gap-1.5">
                    <span
                      class="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider"
                      :class="hierarchyBadgeClass(member.hierarchyLevel)"
                    >
                      {{ formatHierarchyLevel(member.hierarchyLevel) }}
                    </span>
                    <span class="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                      {{ member.division }}
                    </span>
                    <span v-if="member.displayOrder" class="px-1.5 py-0.5 rounded-md text-[10px] font-mono text-slate-400 bg-slate-50">
                      #{{ member.displayOrder }}
                    </span>
                  </div>

                  <!-- Name & Designation -->
                  <h3 class="text-sm font-bold text-slate-900 group-hover:text-[#008795] transition-colors truncate">
                    {{ member.name }}
                  </h3>
                  <p class="text-xs text-slate-600 font-medium">
                    {{ member.designation }}
                  </p>

                  <!-- Location & Contacts Tags -->
                  <div class="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-500">
                    <span v-if="member.room" class="inline-flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                      <i class="fas fa-map-marker-alt text-teal-600 text-[10px]"></i>
                      <span>{{ member.room }}</span>
                    </span>

                    <span v-if="member.extension" class="inline-flex items-center gap-1 bg-cyan-50 text-cyan-800 px-2 py-0.5 rounded-md border border-cyan-100 font-semibold">
                      <i class="fas fa-phone-volume text-[10px]"></i>
                      <span>Ext: {{ member.extension }}</span>
                    </span>

                    <span v-if="member.officePhone" class="inline-flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                      <i class="fas fa-phone text-slate-400 text-[10px]"></i>
                      <span>{{ member.officePhone }}</span>
                    </span>

                    <span v-if="member.mobilePhone" class="inline-flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                      <i class="fas fa-mobile-alt text-slate-400 text-[10px]"></i>
                      <span>{{ member.mobilePhone }}</span>
                    </span>

                    <span v-if="member.primaryEmail" class="inline-flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100 truncate max-w-xs">
                      <i class="fas fa-envelope text-slate-400 text-[10px]"></i>
                      <span class="truncate">{{ member.primaryEmail }}</span>
                    </span>
                  </div>
                </div>

                <!-- Action Buttons: Edit & Delete -->
                <div class="flex items-center gap-1.5 shrink-0 pt-0.5">
                  <button
                    type="button"
                    @click="openEditModal(member)"
                    class="p-2 rounded-xl text-slate-400 hover:text-[#008795] hover:bg-teal-50 transition cursor-pointer"
                    title="Edit Official"
                  >
                    <i class="fas fa-edit text-xs"></i>
                  </button>
                  <button
                    type="button"
                    @click="openDeleteModal(member)"
                    class="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                    title="Delete Official"
                  >
                    <i class="fas fa-trash-alt text-xs"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- 3. EDIT OFFICIAL MODAL -->
      <div
        v-if="isEditModalOpen"
        @click.self="closeEditModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
      >
        <div class="relative w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-slate-100 my-8 transform transition-all animate-in fade-in zoom-in-95 duration-150">
          <div class="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#008795]">
                <i class="fas fa-user-edit text-sm"></i>
              </div>
              <div>
                <h3 class="text-lg font-bold text-slate-800">Edit Official</h3>
                <p class="text-xs text-slate-400">Update official credentials, contacts, and assignment</p>
              </div>
            </div>
            <button
              type="button"
              :disabled="isUpdating"
              @click="closeEditModal"
              class="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition disabled:opacity-50"
            >
              <i class="fas fa-times text-sm"></i>
            </button>
          </div>

          <!-- Modal Error Alert -->
          <div v-if="editErrorMessage" class="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center justify-between">
            <div class="flex items-center gap-2">
              <i class="fas fa-exclamation-circle text-rose-600"></i>
              <span>{{ editErrorMessage }}</span>
            </div>
            <button type="button" @click="editErrorMessage = ''" class="text-rose-500 hover:text-rose-700">
              <i class="fas fa-times text-xs"></i>
            </button>
          </div>

          <form @submit.prevent="handleUpdate" class="space-y-4">
            <!-- Full Name -->
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name <span class="text-rose-500">*</span>
              </label>
              <input
                v-model="editForm.name"
                type="text"
                required
                class="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] focus:bg-white focus:ring-2 focus:ring-[#008795]/20 focus:border-[#008795] outline-none transition text-slate-800 font-medium"
              />
            </div>

            <!-- Designation -->
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Designation / Role Title <span class="text-rose-500">*</span>
              </label>
              <input
                v-model="editForm.designation"
                type="text"
                required
                class="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] focus:bg-white focus:ring-2 focus:ring-[#008795]/20 focus:border-[#008795] outline-none transition text-slate-800 font-medium"
              />
            </div>

            <!-- Division & Hierarchy Level -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Division <span class="text-rose-500">*</span>
                </label>
                <select
                  v-model="editForm.division"
                  required
                  class="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] focus:bg-white focus:ring-2 focus:ring-[#008795]/20 focus:border-[#008795] outline-none transition text-slate-800 font-medium"
                >
                  <option v-for="div in divisionOptions" :key="div" :value="div">{{ div }}</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Hierarchy Level <span class="text-rose-500">*</span>
                </label>
                <select
                  v-model="editForm.hierarchyLevel"
                  required
                  class="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] focus:bg-white focus:ring-2 focus:ring-[#008795]/20 focus:border-[#008795] outline-none transition text-slate-800 font-medium"
                >
                  <option value="HEAD">Head of Department (HEAD)</option>
                  <option value="ADG">Additional Director General (ADG)</option>
                  <option value="DIRECTOR">Director (DIRECTOR)</option>
                  <option value="DEPUTY_DIRECTOR">Deputy Director (DEPUTY)</option>
                  <option value="ASSISTANT_DIRECTOR">Assistant Director &amp; Officer</option>
                </select>
              </div>
            </div>

            <!-- Room & Display Order -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div class="sm:col-span-2">
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Room / Office Location
                </label>
                <input
                  v-model="editForm.room"
                  type="text"
                  class="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] focus:bg-white focus:ring-2 focus:ring-[#008795]/20 focus:border-[#008795] outline-none transition text-slate-800 font-medium"
                />
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Display Order
                </label>
                <input
                  v-model.number="editForm.displayOrder"
                  type="number"
                  min="1"
                  class="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] focus:bg-white focus:ring-2 focus:ring-[#008795]/20 focus:border-[#008795] outline-none transition text-slate-800 font-medium"
                />
              </div>
            </div>

            <!-- Contact Numbers -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Office Phone
                </label>
                <input
                  v-model="editForm.officePhone"
                  type="text"
                  class="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] focus:bg-white focus:ring-2 focus:ring-[#008795]/20 focus:border-[#008795] outline-none transition text-slate-800 font-medium"
                />
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Extension (Intercom)
                </label>
                <input
                  v-model="editForm.extension"
                  type="text"
                  class="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] focus:bg-white focus:ring-2 focus:ring-[#008795]/20 focus:border-[#008795] outline-none transition text-slate-800 font-medium"
                />
              </div>
            </div>

            <!-- Mobile, Res, Fax -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Mobile Phone
                </label>
                <input
                  v-model="editForm.mobilePhone"
                  type="text"
                  class="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] focus:bg-white focus:ring-2 focus:ring-[#008795]/20 focus:border-[#008795] outline-none transition text-slate-800 font-medium"
                />
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Residence Phone
                </label>
                <input
                  v-model="editForm.resPhone"
                  type="text"
                  class="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] focus:bg-white focus:ring-2 focus:ring-[#008795]/20 focus:border-[#008795] outline-none transition text-slate-800 font-medium"
                />
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Fax
                </label>
                <input
                  v-model="editForm.fax"
                  type="text"
                  class="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] focus:bg-white focus:ring-2 focus:ring-[#008795]/20 focus:border-[#008795] outline-none transition text-slate-800 font-medium"
                />
              </div>
            </div>

            <!-- Emails -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Primary Email
                </label>
                <input
                  v-model="editForm.primaryEmail"
                  type="email"
                  class="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] focus:bg-white focus:ring-2 focus:ring-[#008795]/20 focus:border-[#008795] outline-none transition text-slate-800 font-medium"
                />
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Secondary / Alt Email
                </label>
                <input
                  v-model="editForm.secondaryEmail"
                  type="email"
                  class="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] focus:bg-white focus:ring-2 focus:ring-[#008795]/20 focus:border-[#008795] outline-none transition text-slate-800 font-medium"
                />
              </div>
            </div>

            <!-- Description -->
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Role Description / Mandate
              </label>
              <textarea
                v-model="editForm.description"
                rows="2"
                class="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] focus:bg-white focus:ring-2 focus:ring-[#008795]/20 focus:border-[#008795] outline-none transition text-slate-800 font-medium resize-none"
              ></textarea>
            </div>

            <!-- Modal Action Buttons -->
            <div class="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                :disabled="isUpdating"
                @click="closeEditModal"
                class="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="isUpdating"
                class="px-6 py-2.5 bg-gradient-to-r from-[#008795] to-[#003842] hover:opacity-95 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition disabled:opacity-50 flex items-center gap-2"
              >
                <svg v-if="isUpdating" class="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                <span>{{ isUpdating ? 'Saving Changes...' : 'Save Changes' }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- 4. DELETE CONFIRMATION MODAL -->
      <div
        v-if="showDeleteModal"
        @click.self="closeDeleteModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      >
        <div class="relative w-full max-w-md rounded-3xl bg-[#002b32] border border-cyan-500/30 p-6 shadow-2xl text-center">
          <div class="w-12 h-12 mx-auto rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4">
            <i class="fas fa-trash-alt text-lg"></i>
          </div>

          <h3 class="text-lg font-bold text-white">Delete Official?</h3>
          <p class="text-xs text-cyan-100/70 mt-1 leading-relaxed">
            Are you sure you want to remove this official from the directory? This action cannot be undone.
          </p>

          <div v-if="itemToDelete" class="my-4 p-3 rounded-2xl bg-[#001f24] border border-cyan-500/20 text-left">
            <p class="text-xs font-bold text-white truncate">{{ itemToDelete.name }}</p>
            <p class="text-[11px] text-cyan-300 truncate">{{ itemToDelete.designation }}</p>
            <p class="text-[10px] text-slate-400 mt-0.5">{{ itemToDelete.division }}</p>
          </div>

          <div class="flex items-center gap-3 pt-2">
            <button
              type="button"
              :disabled="isDeleting"
              @click="closeDeleteModal"
              class="flex-1 py-2.5 rounded-xl border border-cyan-400/25 bg-white/5 text-xs font-bold text-cyan-100 hover:bg-white/10 transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              :disabled="isDeleting"
              @click="confirmDelete"
              class="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-500 text-xs font-bold text-white shadow-lg transition hover:from-red-500 hover:to-rose-600 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <svg v-if="isDeleting" class="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              <span>{{ isDeleting ? 'Deleting...' : 'Yes, Delete' }}</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from '../axiosInstance';

// State
const teamMembers = ref([]);
const loading = ref(false);
const isSubmitting = ref(false);
const isUpdating = ref(false);
const isDeleting = ref(false);

const searchQuery = ref('');
const selectedDivisionFilter = ref('ALL');

const successMessage = ref('');
const showSuccessAlert = ref(false);
let successTimeout = null;

const errorMessage = ref('');
const editErrorMessage = ref('');

const showDeleteModal = ref(false);
const itemToDelete = ref(null);

const isEditModalOpen = ref(false);

const divisionOptions = [
  'Executive Directorate',
  'Financial Solution',
  'Market Access & Development',
  'Admin and Accounts'
];

// Form state
const initialForm = () => ({
  name: '',
  designation: '',
  division: 'Financial Solution',
  hierarchyLevel: 'DIRECTOR',
  room: '',
  description: '',
  officePhone: '',
  extension: '',
  mobilePhone: '',
  resPhone: '',
  fax: '',
  primaryEmail: '',
  secondaryEmail: '',
  displayOrder: 10
});

const form = ref(initialForm());

const editForm = ref({
  id: null,
  name: '',
  designation: '',
  division: 'Financial Solution',
  hierarchyLevel: 'DIRECTOR',
  room: '',
  description: '',
  officePhone: '',
  extension: '',
  mobilePhone: '',
  resPhone: '',
  fax: '',
  primaryEmail: '',
  secondaryEmail: '',
  displayOrder: 10
});

// Notifications
const showSuccess = (msg) => {
  if (successTimeout) clearTimeout(successTimeout);
  successMessage.value = msg;
  showSuccessAlert.value = true;
  successTimeout = setTimeout(() => {
    showSuccessAlert.value = false;
    successMessage.value = '';
    successTimeout = null;
  }, 4000);
};

const dismissSuccessAlert = () => {
  if (successTimeout) clearTimeout(successTimeout);
  showSuccessAlert.value = false;
  successMessage.value = '';
};

// Hierarchy level badge styling
const hierarchyBadgeClass = (level) => {
  switch (level) {
    case 'HEAD':
      return 'bg-teal-600 text-white shadow-xs';
    case 'ADG':
      return 'bg-indigo-600 text-white';
    case 'DIRECTOR':
      return 'bg-cyan-700 text-white';
    case 'DEPUTY_DIRECTOR':
      return 'bg-emerald-700 text-white';
    case 'ASSISTANT_DIRECTOR':
      return 'bg-slate-700 text-white';
    default:
      return 'bg-slate-500 text-white';
  }
};

const formatHierarchyLevel = (level) => {
  switch (level) {
    case 'HEAD':
      return 'Head of Dept';
    case 'ADG':
      return 'ADG';
    case 'DIRECTOR':
      return 'Director';
    case 'DEPUTY_DIRECTOR':
      return 'Deputy Director';
    case 'ASSISTANT_DIRECTOR':
      return 'Asst. Director / Officer';
    default:
      return level;
  }
};

// Computed Stats
const distinctDivisionsCount = computed(() => {
  const set = new Set(teamMembers.value.map(m => m.division).filter(Boolean));
  return set.size;
});

const leadershipCount = computed(() => {
  return teamMembers.value.filter(m => ['HEAD', 'ADG', 'DIRECTOR'].includes(m.hierarchyLevel)).length;
});

const extensionsCount = computed(() => {
  return teamMembers.value.filter(m => m.extension && m.extension.trim().length > 0).length;
});

// Filtered List
const filteredOfficials = computed(() => {
  let list = teamMembers.value;

  if (selectedDivisionFilter.value !== 'ALL') {
    list = list.filter(m => m.division === selectedDivisionFilter.value);
  }

  const query = searchQuery.value.trim().toLowerCase();
  if (query) {
    list = list.filter(m => {
      const matchName = m.name && m.name.toLowerCase().includes(query);
      const matchDesig = m.designation && m.designation.toLowerCase().includes(query);
      const matchDiv = m.division && m.division.toLowerCase().includes(query);
      const matchRoom = m.room && m.room.toLowerCase().includes(query);
      const matchExt = m.extension && m.extension.toLowerCase().includes(query);
      const matchOffice = m.officePhone && m.officePhone.toLowerCase().includes(query);
      const matchMobile = m.mobilePhone && m.mobilePhone.toLowerCase().includes(query);
      const matchEmail1 = m.primaryEmail && m.primaryEmail.toLowerCase().includes(query);
      const matchEmail2 = m.secondaryEmail && m.secondaryEmail.toLowerCase().includes(query);

      return matchName || matchDesig || matchDiv || matchRoom || matchExt || matchOffice || matchMobile || matchEmail1 || matchEmail2;
    });
  }

  return list;
});

// API Calls
const fetchTeamMembers = async () => {
  loading.value = true;
  errorMessage.value = '';
  try {
    const res = await axios.get('/api/v1/team-members');
    if (Array.isArray(res.data)) {
      teamMembers.value = res.data;
    } else if (res.data && Array.isArray(res.data.members)) {
      teamMembers.value = res.data.members;
    }
  } catch (error) {
    console.error('Failed to fetch team members:', error);
    errorMessage.value = 'Failed to load team directory. Please check backend connection.';
  } finally {
    loading.value = false;
  }
};

const handleCreate = async () => {
  if (!form.value.name?.trim() || !form.value.designation?.trim()) {
    errorMessage.value = 'Please provide official full name and designation.';
    return;
  }

  isSubmitting.value = true;
  errorMessage.value = '';

  try {
    const payload = {
      name: form.value.name.trim(),
      designation: form.value.designation.trim(),
      division: form.value.division,
      hierarchyLevel: form.value.hierarchyLevel,
      room: form.value.room ? form.value.room.trim() : null,
      description: form.value.description ? form.value.description.trim() : null,
      officePhone: form.value.officePhone ? form.value.officePhone.trim() : null,
      extension: form.value.extension ? form.value.extension.trim() : null,
      mobilePhone: form.value.mobilePhone ? form.value.mobilePhone.trim() : null,
      resPhone: form.value.resPhone ? form.value.resPhone.trim() : null,
      fax: form.value.fax ? form.value.fax.trim() : null,
      primaryEmail: form.value.primaryEmail ? form.value.primaryEmail.trim() : null,
      secondaryEmail: form.value.secondaryEmail ? form.value.secondaryEmail.trim() : null,
      displayOrder: form.value.displayOrder || 10
    };

    const res = await axios.post('/api/v1/team-members', payload);
    if (res.data) {
      teamMembers.value.push(res.data);
      // Resort by displayOrder
      teamMembers.value.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
    }
    showSuccess(`Official "${payload.name}" added successfully.`);
    form.value = initialForm();
    await fetchTeamMembers();
  } catch (error) {
    console.error('Failed to create team member:', error);
    errorMessage.value = error.response?.data?.message || 'Failed to save official to directory.';
  } finally {
    isSubmitting.value = false;
  }
};

const openEditModal = (member) => {
  editErrorMessage.value = '';
  editForm.value = {
    id: member.id,
    name: member.name || '',
    designation: member.designation || '',
    division: member.division || 'Financial Solution',
    hierarchyLevel: member.hierarchyLevel || 'DIRECTOR',
    room: member.room || '',
    description: member.description || '',
    officePhone: member.officePhone || '',
    extension: member.extension || '',
    mobilePhone: member.mobilePhone || '',
    resPhone: member.resPhone || '',
    fax: member.fax || '',
    primaryEmail: member.primaryEmail || '',
    secondaryEmail: member.secondaryEmail || '',
    displayOrder: member.displayOrder || 10
  };
  isEditModalOpen.value = true;
};

const closeEditModal = () => {
  if (isUpdating.value) return;
  isEditModalOpen.value = false;
  editErrorMessage.value = '';
};

const handleUpdate = async () => {
  if (!editForm.value.name?.trim() || !editForm.value.designation?.trim()) {
    editErrorMessage.value = 'Please provide official full name and designation.';
    return;
  }

  isUpdating.value = true;
  editErrorMessage.value = '';

  try {
    const payload = {
      name: editForm.value.name.trim(),
      designation: editForm.value.designation.trim(),
      division: editForm.value.division,
      hierarchyLevel: editForm.value.hierarchyLevel,
      room: editForm.value.room ? editForm.value.room.trim() : null,
      description: editForm.value.description ? editForm.value.description.trim() : null,
      officePhone: editForm.value.officePhone ? editForm.value.officePhone.trim() : null,
      extension: editForm.value.extension ? editForm.value.extension.trim() : null,
      mobilePhone: editForm.value.mobilePhone ? editForm.value.mobilePhone.trim() : null,
      resPhone: editForm.value.resPhone ? editForm.value.resPhone.trim() : null,
      fax: editForm.value.fax ? editForm.value.fax.trim() : null,
      primaryEmail: editForm.value.primaryEmail ? editForm.value.primaryEmail.trim() : null,
      secondaryEmail: editForm.value.secondaryEmail ? editForm.value.secondaryEmail.trim() : null,
      displayOrder: editForm.value.displayOrder || 10
    };

    await axios.put(`/api/v1/team-members/${editForm.value.id}`, payload);
    showSuccess(`Official "${payload.name}" updated successfully.`);
    closeEditModal();
    await fetchTeamMembers();
  } catch (error) {
    console.error('Failed to update team member:', error);
    editErrorMessage.value = error.response?.data?.message || 'Failed to update official record.';
  } finally {
    isUpdating.value = false;
  }
};

const openDeleteModal = (member) => {
  itemToDelete.value = member;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  if (isDeleting.value) return;
  showDeleteModal.value = false;
  itemToDelete.value = null;
};

const confirmDelete = async () => {
  if (!itemToDelete.value) return;
  isDeleting.value = true;
  errorMessage.value = '';

  try {
    await axios.delete(`/api/v1/team-members/${itemToDelete.value.id}`);
    showSuccess(`Official "${itemToDelete.value.name}" removed from directory.`);
    showDeleteModal.value = false;
    itemToDelete.value = null;
    await fetchTeamMembers();
  } catch (error) {
    console.error('Failed to delete team member:', error);
    errorMessage.value = 'Failed to delete official. Please try again.';
  } finally {
    isDeleting.value = false;
  }
};

onMounted(() => {
  fetchTeamMembers();
});
</script>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;
}
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 9999px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #94a3b8;
}
</style>
