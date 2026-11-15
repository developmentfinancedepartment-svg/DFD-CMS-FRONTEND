<template>
  <div class="h-screen overflow-hidden flex flex-col p-6 lg:p-8 bg-slate-50/60">
    <div class="max-w-7xl mx-auto space-y-6 flex-1 min-h-0 flex flex-col w-full">
      
      <!-- 1. HEADER & METRIC STATS -->
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 shrink-0">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200/80 text-cyan-800 text-xs font-bold uppercase tracking-wider mb-2">
            <span class="h-1.5 w-1.5 rounded-full bg-[#008795]"></span>
            DFD Credit Facilities &amp; Institutional Services
          </div>
          <h1 class="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Schemes &amp; Institutional Services
          </h1>
          <p class="text-slate-500 mt-1 text-sm">
            Configure ministry credit lines, concessional rates, and public-facing institutional programs.
          </p>
        </div>

        <!-- Metric Badges & Primary Action -->
        <div class="flex flex-wrap items-center gap-3">
          <div class="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-xs font-bold">
            <span class="text-slate-400">Total:</span>
            <span class="text-slate-800 font-extrabold">{{ schemes.length }}</span>
            <span class="text-slate-300">•</span>
            <span class="text-emerald-600 font-extrabold">{{ activeCount }} Active</span>
            <span class="text-slate-300">•</span>
            <span class="text-amber-600 font-extrabold">{{ comingSoonCount }} Coming Soon</span>
            <span class="text-slate-300">•</span>
            <span class="text-slate-500 font-extrabold">{{ draftCount }} Draft</span>
          </div>

          <button
            @click="openAddModal"
            class="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#008795] to-[#006071] hover:from-[#009fb0] hover:to-[#007c91] text-white text-sm font-bold shadow-lg shadow-cyan-900/15 transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Scheme / Service
          </button>
        </div>
      </div>

      <!-- 2. SEARCH & FILTER TOOLBAR (ROUNDED-3XL CARD) -->
      <div class="bg-white rounded-3xl border border-slate-200/80 p-4 lg:p-5 shadow-sm space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:gap-4 shrink-0">
        <!-- Search Input -->
        <div class="relative flex-1 max-w-md">
          <span class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search schemes or services by title, category, description..."
            class="w-full pl-10 pr-9 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800 placeholder-slate-400"
          />
          <button
            v-if="searchQuery"
            @click="searchQuery = ''"
            type="button"
            class="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
            title="Clear search"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Filters & Page Size -->
        <div class="flex flex-wrap items-center gap-3">
          <!-- Type Filter -->
          <div class="flex items-center gap-2">
            <label class="text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:inline">Type:</label>
            <select
              v-model="selectedTypeFilter"
              class="px-3.5 py-2.5 text-sm font-semibold bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-700"
            >
              <option value="ALL">All Types</option>
              <option value="LOAN">Loan Schemes (LOAN)</option>
              <option value="SERVICE">Non-Loan Facilities (OTHER)</option>
            </select>
          </div>

          <!-- Category Dropdown -->
          <div class="flex items-center gap-2">
            <label class="text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:inline">Category:</label>
            <select
              v-model="selectedCategoryFilter"
              class="px-3.5 py-2.5 text-sm font-semibold bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-700"
            >
              <option value="All Categories">All Categories</option>
              <option value="Interest Subsidy Loan Schemes">Interest Subsidy Loan Schemes</option>
              <option value="MSME Revitalization">MSME Revitalization</option>
              <option value="Agriculture & Livestock">Agriculture &amp; Livestock</option>
              <option value="Green Energy">Green Energy</option>
              <option value="Preservation & Storage">Preservation &amp; Storage</option>
              <option
                v-for="cat in customCategories"
                :key="cat"
                :value="cat"
              >
                {{ cat }}
              </option>
            </select>
          </div>

          <!-- Page Size Dropdown -->
          <div class="flex items-center gap-2">
            <label class="text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:inline">Show:</label>
            <select
              v-model.number="pageSize"
              class="px-3 py-2.5 text-sm font-semibold bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-700"
            >
              <option :value="5">5 per page</option>
              <option :value="10">10 per page</option>
              <option :value="20">20 per page</option>
            </select>
          </div>
        </div>
      </div>

      <!-- 3. BALANCED 6-COLUMN TABLE CONTAINER -->
      <div class="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden p-4 lg:p-5 flex-1 min-h-0 flex flex-col">
        <div class="flex-1 min-h-0 overflow-y-auto overflow-x-auto sm:overflow-x-visible custom-scrollbar">
          <table class="w-full text-left border-collapse">
            <thead class="sticky top-0 z-10 bg-slate-50/95 backdrop-blur-sm border-b border-slate-200">
              <tr class="text-[11px] font-bold text-slate-500 tracking-wider uppercase">
                <th class="py-3 px-4 min-w-[240px]">Scheme / Program</th>
                <th class="py-3 px-4 whitespace-nowrap">Category</th>
                <th class="py-3 px-4 whitespace-nowrap">Facility / Scope</th>
                <th class="py-3 px-4 whitespace-nowrap">Interest / Terms</th>
                <th class="py-3 px-4 text-center whitespace-nowrap">Status</th>
                <th class="py-3 px-4 text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-sm">
              <tr
                v-for="scheme in paginatedSchemes"
                :key="scheme.id"
                class="hover:bg-slate-50/80 transition-colors group"
              >
                <!-- 1. Scheme / Program (Icon + Title + Type Pill) -->
                <td class="py-3.5 px-4 min-w-[240px]">
                  <div class="flex items-center gap-3 min-w-0">
                    <div
                      :class="[
                        'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm text-white',
                        isOtherFacility(scheme)
                          ? 'bg-gradient-to-br from-amber-500 to-amber-700'
                          : 'bg-gradient-to-br from-[#008795] to-[#006071]'
                      ]"
                    >
                      <i :class="scheme.icon || (isOtherFacility(scheme) ? 'fas fa-warehouse' : 'fas fa-hand-holding-usd')" class="text-sm"></i>
                    </div>
                    <div class="min-w-0 flex-1">
                      <div class="font-bold text-slate-800 text-sm truncate" :title="scheme.title">
                        {{ scheme.title }}
                      </div>
                      <div class="mt-0.5">
                        <span
                          v-if="isOtherFacility(scheme)"
                          class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200/80 uppercase tracking-wider whitespace-nowrap"
                        >
                          OTHER
                        </span>
                        <span
                          v-else
                          class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200/80 uppercase tracking-wider whitespace-nowrap"
                        >
                          LOAN
                        </span>
                      </div>
                    </div>
                  </div>
                </td>

                <!-- 2. Category Badge -->
                <td class="py-3.5 px-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200/70 whitespace-nowrap">
                    {{ scheme.category }}
                  </span>
                </td>

                <!-- 3. Facility / Scope -->
                <td class="py-3.5 px-4 whitespace-nowrap">
                  <template v-if="scheme.schemeType === 'SERVICE'">
                    <span class="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 whitespace-nowrap">
                      <svg class="w-3.5 h-3.5 text-indigo-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {{ getLocationsDisplay(scheme) }}
                    </span>
                  </template>
                  <template v-else>
                    <span class="font-semibold text-slate-800 text-sm whitespace-nowrap">
                      {{ scheme.maxAmount || '—' }}
                    </span>
                  </template>
                </td>

                <!-- 4. Interest / Terms -->
                <td class="py-3.5 px-4 whitespace-nowrap">
                  <template v-if="scheme.schemeType === 'SERVICE'">
                    <span class="text-xs text-slate-400 font-medium whitespace-nowrap">Non-Financial Facility</span>
                  </template>
                  <template v-else>
                    <div class="font-bold text-[#007c91] text-sm whitespace-nowrap">
                      {{ scheme.interestRate || '—' }}
                    </div>
                    <div v-if="scheme.subsidyDetails" class="text-[10px] text-teal-600 font-medium whitespace-nowrap truncate max-w-[160px]" :title="scheme.subsidyDetails">
                      + {{ scheme.subsidyDetails }}
                    </div>
                  </template>
                </td>

                <!-- 5. Status Pill with 3 States -->
                <td class="py-3.5 px-4 text-center whitespace-nowrap">
                  <button
                    type="button"
                    @click="cycleStatus(scheme)"
                    :title="`Current: ${getSchemeStatus(scheme)}. Click to toggle status.`"
                    :class="[
                      'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all border shadow-2xs',
                      getSchemeStatus(scheme) === 'ACTIVE'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                        : getSchemeStatus(scheme) === 'COMING_SOON'
                        ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                        : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                    ]"
                  >
                    <span v-if="getSchemeStatus(scheme) === 'ACTIVE'">🟢 Active</span>
                    <span v-else-if="getSchemeStatus(scheme) === 'COMING_SOON'">🟡 Coming Soon</span>
                    <span v-else>⚪ Draft</span>
                  </button>
                </td>

                <!-- 6. Actions -->
                <td class="py-3.5 px-4 text-right whitespace-nowrap">
                  <div class="inline-flex items-center justify-end gap-1">
                    <button
                      @click="openEditModal(scheme)"
                      class="p-1.5 text-slate-500 hover:text-[#008795] hover:bg-cyan-50 rounded-lg transition"
                      title="Edit Scheme / Service"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      @click="openDeleteModal(scheme)"
                      class="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                      title="Delete Scheme / Service"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>

              <!-- Loading State -->
              <tr v-if="loading" class="bg-white">
                <td colspan="6" class="py-12 px-4 text-center text-slate-500">
                  <div class="inline-flex items-center gap-3">
                    <svg class="animate-spin h-5 w-5 text-[#008795]" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                    <span class="font-bold text-slate-600">Loading financing schemes &amp; services...</span>
                  </div>
                </td>
              </tr>

              <!-- No Results State -->
              <tr v-if="!loading && filteredSchemes.length === 0" class="bg-white">
                <td colspan="6" class="py-12 px-4 text-center text-slate-500">
                  <div class="flex flex-col items-center justify-center max-w-sm mx-auto space-y-3">
                    <div class="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p class="font-bold text-slate-700">No matching schemes or services found</p>
                    <p class="text-xs text-slate-400">
                      Try clearing or adjusting your search query, type or category filter.
                    </p>
                    <button
                      v-if="searchQuery || selectedCategoryFilter !== 'All Categories' || selectedTypeFilter !== 'ALL'"
                      @click="resetFilters"
                      class="px-4 py-2 text-xs font-bold text-[#008795] bg-cyan-50 hover:bg-cyan-100 rounded-xl transition"
                    >
                      Reset Filters
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 4. DYNAMIC PAGINATION CONTROLS -->
        <div
          v-if="!loading && filteredSchemes.length > 0"
          class="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0"
        >
          <!-- Showing count -->
          <div class="text-xs font-semibold text-slate-500">
            Showing
            <span class="font-bold text-slate-800">{{ paginationStart }}</span>
            to
            <span class="font-bold text-slate-800">{{ paginationEnd }}</span>
            of
            <span class="font-bold text-slate-800">{{ filteredSchemes.length }}</span>
            records
            <span v-if="filteredSchemes.length !== schemes.length" class="text-slate-400 font-normal">
              (filtered from {{ schemes.length }} total)
            </span>
          </div>

          <!-- Page Navigation Buttons -->
          <div class="inline-flex items-center gap-1.5">
            <!-- Previous Button -->
            <button
              :disabled="currentPage === 1"
              @click="currentPage--"
              class="px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1 border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
              </svg>
              <span>Prev</span>
            </button>

            <!-- Numbered Page Pills -->
            <button
              v-for="page in totalPages"
              :key="page"
              @click="currentPage = page"
              :class="[
                'min-w-[36px] h-9 px-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center',
                currentPage === page
                  ? 'bg-[#008795] text-white shadow-md shadow-cyan-900/20'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              ]"
            >
              {{ page }}
            </button>

            <!-- Next Button -->
            <button
              :disabled="currentPage >= totalPages"
              @click="currentPage++"
              class="px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1 border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white"
            >
              <span>Next</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

    </div>

    <!-- MODAL FOR ADD / EDIT SCHEME -->
    <div
      v-if="showModal"
      @click.self="closeModal"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] px-4 py-6 overflow-y-auto"
    >
      <div class="bg-white rounded-3xl w-full max-w-3xl max-h-[88vh] overflow-y-auto shadow-2xl p-7 sm:p-8 animate-in fade-in zoom-in duration-200 custom-scrollbar">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-2xl font-extrabold text-slate-900">
              {{ isEdit ? (form.schemeType === 'SERVICE' ? 'Edit Institutional Service' : 'Edit Financing Scheme') : 'Add New Scheme / Service' }}
            </h2>
            <p class="text-xs text-slate-500 mt-0.5">
              {{ isEdit ? 'Update details for this public program' : 'Configure and publish a development loan scheme or institutional service' }}
            </p>
          </div>
          <button
            type="button"
            @click="closeModal"
            class="text-slate-400 hover:text-slate-600 p-2 rounded-xl hover:bg-slate-100 transition"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form @submit.prevent="saveScheme" class="space-y-6">
          <!-- 1. SCHEME TYPE SELECTOR (SEGMENTED CARDS) -->
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Scheme / Program Type *
            </label>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                @click="setSchemeType('LOAN')"
                :class="[
                  'flex items-start gap-3 p-3.5 rounded-2xl border text-left transition-all',
                  form.schemeType === 'LOAN'
                    ? 'bg-cyan-50/70 border-[#008795] ring-2 ring-[#008795]/20 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                ]"
              >
                <div
                  :class="[
                    'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-colors',
                    form.schemeType === 'LOAN' ? 'bg-[#008795] text-white shadow-sm' : 'bg-slate-100 text-slate-600'
                  ]"
                >
                  <i class="fas fa-hand-holding-usd text-base"></i>
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <span class="text-sm font-bold" :class="form.schemeType === 'LOAN' ? 'text-[#007c91]' : 'text-slate-800'">
                      Concessionary Loan Scheme
                    </span>
                    <span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-teal-100 text-teal-800 border border-teal-200 uppercase tracking-wider">
                      LOAN
                    </span>
                  </div>
                  <div class="text-xs text-slate-500 mt-0.5">
                    Borrower financing, interest subsidies, refinancing &amp; credit lines
                  </div>
                </div>
              </button>

              <button
                type="button"
                @click="setSchemeType('SERVICE')"
                :class="[
                  'flex items-start gap-3 p-3.5 rounded-2xl border text-left transition-all',
                  isOtherFacility(form)
                    ? 'bg-amber-50/70 border-amber-500 ring-2 ring-amber-500/20 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                ]"
              >
                <div
                  :class="[
                    'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-colors',
                    isOtherFacility(form) ? 'bg-amber-500 text-white shadow-sm' : 'bg-slate-100 text-slate-600'
                  ]"
                >
                  <i class="fas fa-warehouse text-base"></i>
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <span class="text-sm font-bold" :class="isOtherFacility(form) ? 'text-amber-800' : 'text-slate-800'">
                      Institutional Service / Program
                    </span>
                    <span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-200 uppercase tracking-wider">
                      OTHER
                    </span>
                  </div>
                  <div class="text-xs text-slate-500 mt-0.5">
                    Grain preservation centers, silos &amp; non-loan development services
                  </div>
                </div>
              </button>
            </div>
          </div>

          <!-- 2. BASIC INFORMATION (SHARED) -->
          <div class="bg-slate-50/70 rounded-2xl p-4 border border-slate-200/80 space-y-4">
            <h3 class="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-[#008795]"></span>
              Basic Information
            </h3>

            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {{ form.schemeType === 'SERVICE' ? 'Service / Program Title *' : 'Scheme Title *' }}
              </label>
              <input
                v-model="form.title"
                type="text"
                required
                :placeholder="form.schemeType === 'SERVICE' ? 'e.g. Government Grain Preservation & Silo Centers' : 'e.g. Re-MSME Plus Loan Scheme'"
                class="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800"
              />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Category *</label>
                <select
                  v-model="form.category"
                  required
                  class="w-full px-4 py-2.5 text-sm font-semibold bg-white border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800"
                >
                  <option value="" disabled>Select a category</option>
                  <option value="Interest Subsidy Loan Schemes">Interest Subsidy Loan Schemes</option>
                  <option value="MSME Revitalization">MSME Revitalization</option>
                  <option value="Agriculture & Livestock">Agriculture &amp; Livestock</option>
                  <option value="Green Energy">Green Energy</option>
                  <option value="Preservation & Storage">Preservation &amp; Storage</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">FontAwesome Icon Class *</label>
                <div class="flex items-center gap-3">
                  <div
                    :class="[
                      'w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-sm text-white',
                      form.schemeType === 'SERVICE' ? 'bg-amber-500' : 'bg-gradient-to-br from-[#008795] to-[#005a66]'
                    ]"
                  >
                    <i :class="form.icon || (form.schemeType === 'SERVICE' ? 'fas fa-warehouse' : 'fas fa-hand-holding-usd')" class="text-base"></i>
                  </div>
                  <input
                    v-model="form.icon"
                    type="text"
                    required
                    :placeholder="form.schemeType === 'SERVICE' ? 'fas fa-warehouse' : 'fas fa-hand-holding-usd'"
                    class="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800 font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- 3. LOAN-SPECIFIC FINANCIAL FIELDS (SHOWN ONLY IF SCHEME TYPE IS 'LOAN') -->
          <div v-if="form.schemeType === 'LOAN'" class="bg-cyan-50/40 rounded-2xl p-4 border border-cyan-100 space-y-4">
            <h3 class="text-xs font-bold text-[#007c91] uppercase tracking-wider flex items-center gap-2">
              <i class="fas fa-coins text-sm"></i>
              Loan Financing Terms &amp; Limits
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Max Loan Facility *</label>
                <input
                  v-model="form.maxAmount"
                  type="text"
                  :required="form.schemeType === 'LOAN'"
                  placeholder="e.g. Up to Rs. 25M"
                  class="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800"
                />
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Customer Interest Rate *</label>
                <input
                  v-model="form.interestRate"
                  type="text"
                  :required="form.schemeType === 'LOAN'"
                  placeholder="e.g. 5% p.a. or Concessional"
                  class="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Nature of Loan</label>
                <input
                  v-model="form.natureOfLoan"
                  type="text"
                  placeholder="e.g. Working Capital or Investment & Machinery"
                  class="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800"
                />
                <p class="text-[11px] text-slate-400 mt-1">Displays in Metric Box 4 if Grace Period is not applicable</p>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Government Subsidy Details</label>
                <input
                  v-model="form.subsidyDetails"
                  type="text"
                  placeholder="e.g. 4% Govt. Subsidy (12% Total Rate)"
                  class="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800"
                />
                <p class="text-[11px] text-slate-400 mt-1">Displays as a subtle badge under the interest rate</p>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Repayment Period</label>
                <input
                  v-model="form.repaymentPeriod"
                  type="text"
                  placeholder="e.g. Up to 60 Months"
                  class="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800"
                />
              </div>

              <div>
                <div class="flex items-center justify-between mb-1.5">
                  <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider">Grace Period</label>
                  <span class="text-[11px] text-slate-400 font-medium">Optional</span>
                </div>
                <input
                  v-model="form.gracePeriod"
                  type="text"
                  placeholder="e.g. Up to 6 Months (leave blank if none)"
                  class="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800"
                />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Participating Banks (PFIs)</label>
              <input
                v-model="form.participatingBanks"
                type="text"
                placeholder="e.g. Bank of Ceylon, People's Bank, Commercial Bank, HNB"
                class="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800"
              />
              <p class="text-[11px] text-slate-400 mt-1">Separate multiple banks with commas</p>
            </div>
          </div>

          <!-- 4. SERVICE-SPECIFIC PROGRAM FIELDS (SHOWN ONLY IF SCHEME TYPE IS 'SERVICE') -->
          <div v-if="form.schemeType === 'SERVICE'" class="bg-amber-50/50 rounded-2xl p-4 border border-amber-200/80 space-y-4">
            <h3 class="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-2">
              <i class="fas fa-warehouse text-sm"></i>
              Institutional Facility &amp; Operational Scope
            </h3>

            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Center / Operational Locations (Districts or Centers)
              </label>
              <input
                v-model="form.locations"
                type="text"
                placeholder="e.g. Polonnaruwa, Anuradhapura, Monaragala, Kilinochchi, Mannar"
                class="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition text-slate-800"
              />
              <p class="text-[11px] text-slate-400 mt-1">Separate districts or center names with commas</p>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Services &amp; Facilities Provided
              </label>
              <input
                v-model="form.servicesProvided"
                type="text"
                placeholder="e.g. Commercial Grain Drying, Mechanical Cleaning, Moisture Testing, Scientific Storage"
                class="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition text-slate-800"
              />
              <p class="text-[11px] text-slate-400 mt-1">Separate services with commas (rendered as rich feature tags on public portal)</p>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Managing Partner &amp; Supervision
              </label>
              <input
                v-model="form.implementationArrangements"
                type="text"
                placeholder="e.g. Managed by Regional Development Bank (RDB) under supervision of District Secretaries"
                class="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition text-slate-800"
              />
            </div>
          </div>

          <!-- 5. DETAILED SPECIFICATIONS (SHARED) -->
          <div class="bg-slate-50/70 rounded-2xl p-4 border border-slate-200/80 space-y-5">
            <div class="flex items-center justify-between">
              <h3 class="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-slate-400"></span>
                Guidelines &amp; Program Specifications
              </h3>
              <span class="text-[11px] text-slate-400 font-medium">Multiple points render as verified bullet lists on public portal</span>
            </div>

            <!-- 1. Target Beneficiaries -->
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Target Beneficiaries
                  <span class="text-slate-400 font-normal ml-1">
                    ({{ isBeneficiariesListMode ? `${beneficiariesPoints.filter(p => p.trim()).length} criteria` : 'Multi-line text' }})
                  </span>
                </label>
                <button
                  type="button"
                  @click="toggleFieldMode('beneficiaries')"
                  class="text-[11px] font-semibold text-[#008795] hover:text-[#006071] transition flex items-center gap-1"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  {{ isBeneficiariesListMode ? 'Switch to Multi-line Text' : 'Switch to Points Builder' }}
                </button>
              </div>

              <!-- List Builder Mode -->
              <div v-if="isBeneficiariesListMode" class="space-y-2">
                <div
                  v-for="(point, idx) in beneficiariesPoints"
                  :key="idx"
                  class="flex items-center gap-2"
                >
                  <span class="w-6 h-6 rounded-full bg-cyan-50 border border-cyan-200 text-[#008795] text-xs font-bold flex items-center justify-center shrink-0">
                    {{ idx + 1 }}
                  </span>
                  <input
                    v-model="beneficiariesPoints[idx]"
                    @paste="handlePointPaste($event, beneficiariesPoints, idx)"
                    type="text"
                    placeholder="e.g. Registered MSMEs, Farmers, Women Entrepreneurs, Small Rice Millers"
                    class="flex-1 px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800"
                  />
                  <button
                    v-if="beneficiariesPoints.length > 1"
                    @click="removePoint(beneficiariesPoints, idx)"
                    type="button"
                    class="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
                    title="Remove criterion"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                <div class="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    @click="addPoint(beneficiariesPoints)"
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#008795] hover:text-[#006071] bg-cyan-50/80 hover:bg-cyan-100 rounded-xl border border-cyan-200/70 transition"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
                    </svg>
                    + Add Beneficiary Point
                  </button>
                  <span class="text-[11px] text-slate-400">Paste multiple lines to automatically split points</span>
                </div>
              </div>

              <!-- Multi-line Textarea Mode -->
              <div v-else>
                <textarea
                  v-model="form.beneficiaries"
                  rows="3"
                  placeholder="Enter target beneficiaries (each line renders as a verified bullet point on the public portal)..."
                  class="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800"
                ></textarea>
                <p class="text-[11px] text-slate-400 mt-1">Each line renders as a bullet item on the public portal.</p>
              </div>
            </div>

            <!-- 2. Program Purpose & Objectives -->
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Scheme Purpose &amp; Objectives
                  <span class="text-slate-400 font-normal ml-1">
                    ({{ isPurposeListMode ? `${purposePoints.filter(p => p.trim()).length} objectives` : 'Multi-line text' }})
                  </span>
                </label>
                <button
                  type="button"
                  @click="toggleFieldMode('purpose')"
                  class="text-[11px] font-semibold text-[#008795] hover:text-[#006071] transition flex items-center gap-1"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  {{ isPurposeListMode ? 'Switch to Multi-line Text' : 'Switch to Points Builder' }}
                </button>
              </div>

              <!-- List Builder Mode -->
              <div v-if="isPurposeListMode" class="space-y-2">
                <div
                  v-for="(point, idx) in purposePoints"
                  :key="idx"
                  class="flex items-center gap-2"
                >
                  <span class="w-6 h-6 rounded-full bg-cyan-50 border border-cyan-200 text-[#008795] text-xs font-bold flex items-center justify-center shrink-0">
                    {{ idx + 1 }}
                  </span>
                  <input
                    v-model="purposePoints[idx]"
                    @paste="handlePointPaste($event, purposePoints, idx)"
                    type="text"
                    placeholder="e.g. Provide working capital facilities to revitalize MSMEs..."
                    class="flex-1 px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800"
                  />
                  <button
                    v-if="purposePoints.length > 1"
                    @click="removePoint(purposePoints, idx)"
                    type="button"
                    class="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
                    title="Remove objective"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                <div class="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    @click="addPoint(purposePoints)"
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#008795] hover:text-[#006071] bg-cyan-50/80 hover:bg-cyan-100 rounded-xl border border-cyan-200/70 transition"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
                    </svg>
                    + Add Objective
                  </button>
                  <span class="text-[11px] text-slate-400">Paste multiple lines to automatically split points</span>
                </div>
              </div>

              <!-- Multi-line Textarea Mode -->
              <div v-else>
                <textarea
                  v-model="form.purpose"
                  rows="3"
                  placeholder="Describe the scheme's main purpose and policy objectives (each line renders as a verified point on public portal)..."
                  class="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800"
                ></textarea>
                <p class="text-[11px] text-slate-400 mt-1">Each line renders as a bullet item on the public portal.</p>
              </div>
            </div>

            <!-- 3. Eligibility & Document Requirements -->
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Eligibility &amp; Document Requirements
                  <span class="text-slate-400 font-normal ml-1">
                    ({{ isRequirementsListMode ? `${requirementsPoints.filter(p => p.trim()).length} requirements` : 'Multi-line text' }})
                  </span>
                </label>
                <button
                  type="button"
                  @click="toggleFieldMode('requirements')"
                  class="text-[11px] font-semibold text-[#008795] hover:text-[#006071] transition flex items-center gap-1"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  {{ isRequirementsListMode ? 'Switch to Multi-line Text' : 'Switch to Points Builder' }}
                </button>
              </div>

              <!-- List Builder Mode -->
              <div v-if="isRequirementsListMode" class="space-y-2">
                <div
                  v-for="(point, idx) in requirementsPoints"
                  :key="idx"
                  class="flex items-center gap-2"
                >
                  <span class="w-6 h-6 rounded-full bg-cyan-50 border border-cyan-200 text-[#008795] text-xs font-bold flex items-center justify-center shrink-0">
                    {{ idx + 1 }}
                  </span>
                  <input
                    v-model="requirementsPoints[idx]"
                    @paste="handlePointPaste($event, requirementsPoints, idx)"
                    type="text"
                    placeholder="e.g. Valid Business Registration (BR) copy..."
                    class="flex-1 px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800"
                  />
                  <button
                    v-if="requirementsPoints.length > 1"
                    @click="removePoint(requirementsPoints, idx)"
                    type="button"
                    class="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
                    title="Remove requirement"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                <div class="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    @click="addPoint(requirementsPoints)"
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#008795] hover:text-[#006071] bg-cyan-50/80 hover:bg-cyan-100 rounded-xl border border-cyan-200/70 transition"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
                    </svg>
                    + Add Requirement
                  </button>
                  <span class="text-[11px] text-slate-400">Paste multiple lines to automatically split points</span>
                </div>
              </div>

              <!-- Multi-line Textarea Mode -->
              <div v-else>
                <textarea
                  v-model="form.eligibility"
                  rows="3"
                  placeholder="List eligibility criteria and documentation requirements (each line renders as a verified requirement on public portal)..."
                  class="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800"
                ></textarea>
                <p class="text-[11px] text-slate-400 mt-1">Each line renders as a verified requirement on public portal.</p>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Related Initiatives / Programs
                </label>
                <input
                  v-model="form.otherInitiatives"
                  type="text"
                  placeholder="e.g. Accelerated Paddy Purchasing Program - Yala Season 2026"
                  class="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800"
                />
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Contact Information / Helpdesk
                </label>
                <input
                  v-model="form.contactInfo"
                  type="text"
                  placeholder="e.g. Department of Development Finance or RDB District Desks"
                  class="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800"
                />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Brief Summary Description *
              </label>
              <textarea
                v-model="form.description"
                rows="3"
                required
                placeholder="Enter a concise description shown on catalog cards..."
                class="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800"
              ></textarea>
            </div>
          </div>

          <!-- 6. PUBLISH / 3-STATE STATUS SELECTOR -->
          <div class="space-y-2 pt-1">
            <div class="flex items-center justify-between">
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Publication Status *
              </label>
              <span class="text-[11px] text-slate-400 font-medium">Controls public portal visibility &amp; action state</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <!-- ACTIVE -->
              <label
                :class="[
                  'relative flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all',
                  form.status === 'ACTIVE'
                    ? 'bg-emerald-50/70 border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                ]"
              >
                <input
                  type="radio"
                  name="scheme-status"
                  v-model="form.status"
                  value="ACTIVE"
                  class="sr-only"
                />
                <span class="text-lg leading-none mt-0.5 select-none">🟢</span>
                <div class="min-w-0 flex-1">
                  <div class="text-xs font-bold" :class="form.status === 'ACTIVE' ? 'text-emerald-800' : 'text-slate-800'">
                    Active
                  </div>
                  <div class="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    Published &amp; clickable on public portal
                  </div>
                </div>
              </label>

              <!-- COMING_SOON -->
              <label
                :class="[
                  'relative flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all',
                  form.status === 'COMING_SOON'
                    ? 'bg-amber-50/70 border-amber-500 ring-2 ring-amber-500/20 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                ]"
              >
                <input
                  type="radio"
                  name="scheme-status"
                  v-model="form.status"
                  value="COMING_SOON"
                  class="sr-only"
                />
                <span class="text-lg leading-none mt-0.5 select-none">🟡</span>
                <div class="min-w-0 flex-1">
                  <div class="text-xs font-bold" :class="form.status === 'COMING_SOON' ? 'text-amber-800' : 'text-slate-800'">
                    Coming Soon
                  </div>
                  <div class="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    Upcoming teaser &amp; non-clickable details
                  </div>
                </div>
              </label>

              <!-- DRAFT -->
              <label
                :class="[
                  'relative flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all',
                  form.status === 'DRAFT'
                    ? 'bg-slate-100/90 border-slate-400 ring-2 ring-slate-400/20 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                ]"
              >
                <input
                  type="radio"
                  name="scheme-status"
                  v-model="form.status"
                  value="DRAFT"
                  class="sr-only"
                />
                <span class="text-lg leading-none mt-0.5 select-none">⚪</span>
                <div class="min-w-0 flex-1">
                  <div class="text-xs font-bold" :class="form.status === 'DRAFT' ? 'text-slate-800' : 'text-slate-700'">
                    Draft
                  </div>
                  <div class="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    Hidden from public portal
                  </div>
                </div>
              </label>
            </div>
          </div>

          <!-- ACTIONS -->
          <div class="flex gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              @click="closeModal"
              class="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#008795] to-[#006071] hover:from-[#009fb0] hover:to-[#007c91] text-white rounded-2xl font-bold transition shadow-md shadow-cyan-900/15"
            >
              {{ isEdit ? 'Save Changes' : (form.schemeType === 'SERVICE' ? 'Create Institutional Service' : 'Create Loan Scheme') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- CUSTOM DELETE CONFIRMATION MODAL (DFD DARK TEAL PALETTE) -->
    <div
      v-if="showDeleteModal"
      @click.self="!isDeleting && closeDeleteModal()"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
    >
      <div
        class="relative w-full max-w-md rounded-3xl bg-[#002b33] border border-cyan-500/20 p-7 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_30px_rgba(6,182,212,0.15)] overflow-hidden text-center animate-in fade-in zoom-in duration-200"
      >
        <!-- Ambient Background Glows -->
        <div class="pointer-events-none absolute -top-16 -right-16 w-36 h-36 rounded-full bg-cyan-400/10 blur-3xl"></div>
        <div class="pointer-events-none absolute -bottom-16 -left-16 w-36 h-36 rounded-full bg-red-500/15 blur-3xl"></div>

        <div class="relative z-10 flex flex-col items-center">
          <!-- Soft Red Trash Badge -->
          <div
            class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/15 border border-red-500/30 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.25)]"
          >
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>

          <!-- Title & Warning Description -->
          <h3 class="text-xl font-extrabold tracking-tight text-white">
            Delete {{ schemeToDelete?.schemeType === 'SERVICE' ? 'Service' : 'Financing Scheme' }}?
          </h3>
          <p class="mt-2 text-sm text-cyan-100/70 leading-relaxed">
            Are you sure you want to permanently delete this {{ schemeToDelete?.schemeType === 'SERVICE' ? 'institutional service' : 'development financing scheme' }}? This action cannot be undone.
          </p>

          <!-- Selected Scheme Preview Card -->
          <div
            v-if="schemeToDelete"
            class="mt-4 w-full p-3.5 rounded-2xl bg-[#001f24] border border-cyan-500/20 flex items-center gap-3 text-left"
          >
            <div
              class="w-10 h-10 rounded-xl bg-[#008795]/20 text-cyan-300 flex items-center justify-center shrink-0 border border-cyan-400/25 shadow-sm"
            >
              <i :class="schemeToDelete.icon || (schemeToDelete.schemeType === 'SERVICE' ? 'fas fa-warehouse' : 'fas fa-hand-holding-usd')"></i>
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-sm font-bold text-white truncate">{{ schemeToDelete.title }}</p>
              <div class="flex items-center gap-2 mt-0.5">
                <span class="text-[11px] text-cyan-300 font-semibold">{{ schemeToDelete.category }}</span>
                <span class="text-cyan-500/40 text-[10px]">•</span>
                <span class="text-[11px] text-gray-300 font-medium">
                  {{ schemeToDelete.schemeType === 'SERVICE' ? 'Institutional Service' : schemeToDelete.maxAmount }}
                </span>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="mt-7 flex w-full items-center gap-3">
            <button
              type="button"
              :disabled="isDeleting"
              @click="closeDeleteModal"
              class="flex-1 rounded-xl border border-cyan-400/25 bg-white/5 hover:bg-white/10 px-4 py-2.5 text-sm font-bold text-cyan-100 hover:text-white transition-all disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              :disabled="isDeleting"
              @click="confirmDeleteScheme"
              class="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-600 px-4 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(225,29,72,0.35)] hover:shadow-[0_10px_25px_rgba(225,29,72,0.5)] transition-all disabled:opacity-60"
            >
              <svg
                v-if="isDeleting"
                class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
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
import { ref, computed, watch, onMounted } from 'vue';
import axios from '../axiosInstance';

// Main Reactive State
const schemes = ref([]);
const loading = ref(false);
const showModal = ref(false);
const isEdit = ref(false);
const editingId = ref(null);

// Search & Filtering State
const searchQuery = ref('');
const selectedTypeFilter = ref('ALL');
const selectedCategoryFilter = ref('All Categories');
const pageSize = ref(5);
const currentPage = ref(1);

// Delete Modal Reactive States
const showDeleteModal = ref(false);
const schemeToDelete = ref(null);
const isDeleting = ref(false);

const defaultForm = () => ({
  schemeType: 'LOAN',
  title: '',
  category: 'MSME Revitalization',
  maxAmount: '',
  interestRate: '',
  subsidyDetails: '',
  natureOfLoan: '',
  repaymentPeriod: '',
  gracePeriod: '',
  beneficiaries: '',
  requirements: '',
  locations: '',
  servicesProvided: '',
  implementationArrangements: '',
  otherInitiatives: '',
  contactInfo: '',
  purpose: '',
  eligibility: '',
  participatingBanks: '',
  description: '',
  icon: 'fas fa-hand-holding-usd',
  status: 'ACTIVE',
  active: true
});

const form = ref(defaultForm());

// Helper to determine normalized 3-state status with backward compatibility
const getSchemeStatus = (scheme) => {
  if (!scheme) return 'ACTIVE';
  if (scheme.status && typeof scheme.status === 'string') {
    const s = scheme.status.trim().toUpperCase();
    if (['ACTIVE', 'COMING_SOON', 'DRAFT'].includes(s)) return s;
  }
  return scheme.active !== false ? 'ACTIVE' : 'DRAFT';
};

// Helper to determine if an entry is a non-loan institutional facility (OTHER)
const isOtherFacility = (scheme) => {
  if (!scheme) return false;
  const t = (scheme.schemeType || '').toUpperCase();
  return t === 'SERVICE' || t === 'OTHER';
};

const setSchemeType = (type) => {
  form.value.schemeType = type;
  if (type === 'SERVICE' || type === 'OTHER') {
    if (form.value.icon === 'fas fa-hand-holding-usd') {
      form.value.icon = 'fas fa-warehouse';
    }
    if (form.value.category === 'MSME Revitalization') {
      form.value.category = 'Agriculture & Livestock';
    }
  } else {
    if (form.value.icon === 'fas fa-warehouse') {
      form.value.icon = 'fas fa-hand-holding-usd';
    }
  }
};

// Computed Stats
const activeCount = computed(() => schemes.value.filter(s => getSchemeStatus(s) === 'ACTIVE').length);
const comingSoonCount = computed(() => schemes.value.filter(s => getSchemeStatus(s) === 'COMING_SOON').length);
const draftCount = computed(() => schemes.value.filter(s => getSchemeStatus(s) === 'DRAFT').length);

const customCategories = computed(() => {
  const standard = [
    'Interest Subsidy Loan Schemes',
    'MSME Revitalization',
    'Agriculture & Livestock',
    'Green Energy',
    'Preservation & Storage'
  ];
  const found = schemes.value.map(s => s.category).filter(c => c && !standard.includes(c));
  return [...new Set(found)];
});

const getLocationsDisplay = (scheme) => {
  if (scheme.locations) {
    if (Array.isArray(scheme.locations) && scheme.locations.length > 0) {
      return `${scheme.locations.length} Districts`;
    }
    if (typeof scheme.locations === 'string') {
      try {
        const parsed = JSON.parse(scheme.locations);
        if (Array.isArray(parsed) && parsed.length > 0) return `${parsed.length} Districts`;
      } catch (e) {
        const parts = scheme.locations.split(',').map(s => s.trim()).filter(Boolean);
        if (parts.length > 0) return `${parts.length} Districts`;
      }
    }
  }
  return 'Island-wide';
};

// Real-Time Filtering Logic
const filteredSchemes = computed(() => {
  return schemes.value.filter(scheme => {
    // 1. Type match
    if (selectedTypeFilter.value !== 'ALL') {
      const isOther = isOtherFacility(scheme);
      if (selectedTypeFilter.value === 'SERVICE' || selectedTypeFilter.value === 'OTHER') {
        if (!isOther) return false;
      } else if (selectedTypeFilter.value === 'LOAN') {
        if (isOther) return false;
      }
    }

    // 2. Category match
    const matchesCategory =
      selectedCategoryFilter.value === 'All Categories' ||
      scheme.category === selectedCategoryFilter.value;

    if (!matchesCategory) return false;

    // 3. Search query match (title, category, and description)
    if (!searchQuery.value.trim()) return true;

    const query = searchQuery.value.toLowerCase().trim();
    const titleMatch = (scheme.title || '').toLowerCase().includes(query);
    const descMatch = (scheme.description || '').toLowerCase().includes(query);
    const catMatch = (scheme.category || '').toLowerCase().includes(query);

    return titleMatch || descMatch || catMatch;
  });
});

// Dynamic Pagination Computation
const totalPages = computed(() => {
  return Math.ceil(filteredSchemes.value.length / pageSize.value) || 1;
});

const paginatedSchemes = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return filteredSchemes.value.slice(start, start + pageSize.value);
});

const paginationStart = computed(() => {
  if (filteredSchemes.value.length === 0) return 0;
  return (currentPage.value - 1) * pageSize.value + 1;
});

const paginationEnd = computed(() => {
  return Math.min(currentPage.value * pageSize.value, filteredSchemes.value.length);
});

// Reset to page 1 whenever search, filter, or page size changes
watch([searchQuery, selectedTypeFilter, selectedCategoryFilter, pageSize], () => {
  currentPage.value = 1;
});

// If current page exceeds total pages, clamp it
watch(totalPages, (newTotal) => {
  if (currentPage.value > newTotal) {
    currentPage.value = newTotal;
  }
});

const resetFilters = () => {
  searchQuery.value = '';
  selectedTypeFilter.value = 'ALL';
  selectedCategoryFilter.value = 'All Categories';
  currentPage.value = 1;
};

// Data Fetching
const fetchSchemes = async () => {
  loading.value = true;
  try {
    const response = await axios.get('/api/v1/services');
    schemes.value = response.data || [];
  } catch (error) {
    console.error('Failed to fetch schemes:', error);
    alert('Failed to load schemes.');
  } finally {
    loading.value = false;
  }
};

// Helper to stringify arrays for form inputs
const formatArrayField = (raw) => {
  if (!raw) return '';
  if (Array.isArray(raw)) return raw.join(', ');
  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed.join(', ');
    } catch (e) {
      // not json, return as-is
    }
    return raw;
  }
  return String(raw);
};

// Modal Actions
// Dynamic Multi-Point Builder States
const beneficiariesPoints = ref(['']);
const purposePoints = ref(['']);
const requirementsPoints = ref(['']);

const isBeneficiariesListMode = ref(true);
const isPurposeListMode = ref(true);
const isRequirementsListMode = ref(true);

const parseRawToList = (raw, allowComma = false) => {
  if (!raw || typeof raw !== 'string' || !raw.trim()) return [''];
  const trimmed = raw.trim();
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(s => String(s).trim()).filter(Boolean);
      }
    } catch {}
  }
  if (trimmed.includes('\n') || trimmed.includes('\r')) {
    const lines = trimmed
      .split(/\r?\n+/)
      .map(l => l.trim().replace(/^[-•*?✓✔\u2022\u25E6\u25AA\u25CF]\s*/, '').replace(/^\d+[\.\)]\s*/, ''))
      .filter(Boolean);
    if (lines.length > 0) return lines;
  }
  if (/[\u2022\u25CF\u25E6•]/.test(trimmed)) {
    const parts = trimmed
      .split(/[\u2022\u25CF\u25E6•]/)
      .map(p => p.trim().replace(/^[-*?✓✔]\s*/, ''))
      .filter(Boolean);
    if (parts.length > 1) return parts;
  }
  if (trimmed.includes(';')) {
    const parts = trimmed.split(';').map(p => p.trim()).filter(Boolean);
    if (parts.length > 1) return parts;
  }
  if (allowComma && trimmed.includes(',')) {
    const strippedDot = trimmed.replace(/\.\s*$/, '');
    if (!strippedDot.includes('.') && strippedDot.length < 240) {
      const parts = strippedDot.split(',').map(p => p.trim().replace(/^and\s+/i, '')).filter(Boolean);
      if (parts.length > 1) return parts;
    }
  }
  return [trimmed.replace(/^[-•*?✓✔\u2022\u25E6\u25AA\u25CF]\s*/, '')];
};

const listToRaw = (list) => {
  if (!Array.isArray(list)) return '';
  return list.map(s => (s || '').trim()).filter(Boolean).join('\n');
};

const addPoint = (targetList) => {
  targetList.push('');
};

const removePoint = (targetList, index) => {
  if (targetList.length > 1) {
    targetList.splice(index, 1);
  } else {
    targetList[0] = '';
  }
};

const handlePointPaste = (event, targetList, currentIndex) => {
  const pasteText = (event.clipboardData || window.clipboardData)?.getData('text') || '';
  if (pasteText.includes('\n') || /[\u2022\u25CF\u25E6•;]/.test(pasteText)) {
    event.preventDefault();
    const parsed = parseRawToList(pasteText);
    if (parsed.length > 0) {
      targetList.splice(currentIndex, 1, ...parsed);
    }
  }
};

const toggleFieldMode = (field) => {
  if (field === 'beneficiaries') {
    isBeneficiariesListMode.value = !isBeneficiariesListMode.value;
    if (isBeneficiariesListMode.value) {
      beneficiariesPoints.value = parseRawToList(form.value.beneficiaries);
    } else {
      form.value.beneficiaries = listToRaw(beneficiariesPoints.value);
    }
  } else if (field === 'purpose') {
    isPurposeListMode.value = !isPurposeListMode.value;
    if (isPurposeListMode.value) {
      purposePoints.value = parseRawToList(form.value.purpose);
    } else {
      form.value.purpose = listToRaw(purposePoints.value);
    }
  } else if (field === 'requirements') {
    isRequirementsListMode.value = !isRequirementsListMode.value;
    if (isRequirementsListMode.value) {
      requirementsPoints.value = parseRawToList(form.value.eligibility || form.value.requirements);
    } else {
      form.value.eligibility = listToRaw(requirementsPoints.value);
      form.value.requirements = form.value.eligibility;
    }
  }
};

const openAddModal = () => {
  isEdit.value = false;
  editingId.value = null;
  form.value = defaultForm();
  beneficiariesPoints.value = [''];
  purposePoints.value = [''];
  requirementsPoints.value = [''];
  isBeneficiariesListMode.value = true;
  isPurposeListMode.value = true;
  isRequirementsListMode.value = true;
  showModal.value = true;
};

const openEditModal = (scheme) => {
  isEdit.value = true;
  editingId.value = scheme.id;
  const rawBeneficiaries = scheme.beneficiaries || '';
  const rawPurpose = scheme.purpose || '';
  const rawRequirements = scheme.eligibility || scheme.requirements || '';

  beneficiariesPoints.value = parseRawToList(rawBeneficiaries, true);
  purposePoints.value = parseRawToList(rawPurpose, false);
  requirementsPoints.value = parseRawToList(rawRequirements, false);
  isBeneficiariesListMode.value = true;
  isPurposeListMode.value = true;
  isRequirementsListMode.value = true;

  form.value = {
    schemeType: scheme.schemeType || 'LOAN',
    title: scheme.title || '',
    category: scheme.category || 'MSME Revitalization',
    maxAmount: scheme.maxAmount || '',
    interestRate: scheme.interestRate || '',
    subsidyDetails: scheme.subsidyDetails || '',
    natureOfLoan: scheme.natureOfLoan || '',
    repaymentPeriod: scheme.repaymentPeriod || '',
    gracePeriod: scheme.gracePeriod || '',
    beneficiaries: rawBeneficiaries,
    requirements: rawRequirements,
    locations: formatArrayField(scheme.locations),
    servicesProvided: formatArrayField(scheme.servicesProvided),
    implementationArrangements: scheme.implementationArrangements || '',
    otherInitiatives: scheme.otherInitiatives || '',
    contactInfo: scheme.contactInfo || '',
    purpose: rawPurpose,
    eligibility: rawRequirements,
    participatingBanks: scheme.participatingBanks || '',
    description: scheme.description || '',
    icon: scheme.icon || (scheme.schemeType === 'SERVICE' ? 'fas fa-warehouse' : 'fas fa-hand-holding-usd'),
    status: getSchemeStatus(scheme),
    active: getSchemeStatus(scheme) !== 'DRAFT'
  };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const saveScheme = async () => {
  try {
    // Synchronize dynamic list builders to form properties
    if (isBeneficiariesListMode.value) {
      form.value.beneficiaries = listToRaw(beneficiariesPoints.value);
    }
    if (isPurposeListMode.value) {
      form.value.purpose = listToRaw(purposePoints.value);
    }
    if (isRequirementsListMode.value) {
      form.value.eligibility = listToRaw(requirementsPoints.value);
      form.value.requirements = form.value.eligibility;
    } else {
      if (!form.value.requirements && form.value.eligibility) {
        form.value.requirements = form.value.eligibility;
      }
      if (!form.value.eligibility && form.value.requirements) {
        form.value.eligibility = form.value.requirements;
      }
    }

    const payload = { ...form.value };

    // Format locations as JSON array string
    if (payload.locations && typeof payload.locations === 'string') {
      const locArray = payload.locations.split(',').map(s => s.trim()).filter(Boolean);
      payload.locations = locArray.length > 0 ? JSON.stringify(locArray) : null;
    }

    // Format servicesProvided as JSON array string
    if (payload.servicesProvided && typeof payload.servicesProvided === 'string') {
      const srvArray = payload.servicesProvided.split(',').map(s => s.trim()).filter(Boolean);
      payload.servicesProvided = srvArray.length > 0 ? JSON.stringify(srvArray) : null;
    }

    // Default financial terms for non-loan institutional services
    if (isOtherFacility(payload)) {
      if (!payload.maxAmount) payload.maxAmount = 'N/A';
      if (!payload.interestRate) payload.interestRate = 'N/A';
    }

    // Ensure status and active synchronization
    payload.status = form.value.status || (form.value.active !== false ? 'ACTIVE' : 'DRAFT');
    payload.active = payload.status !== 'DRAFT';

    if (isEdit.value && editingId.value !== null) {
      await axios.put(`/api/v1/services/${editingId.value}`, payload);
    } else {
      await axios.post('/api/v1/services', payload);
    }
    showModal.value = false;
    await fetchSchemes();
  } catch (error) {
    console.error('Failed to save scheme:', error);
    alert('Failed to save scheme.');
  }
};

const cycleStatus = async (scheme) => {
  const current = getSchemeStatus(scheme);
  const next = current === 'ACTIVE' ? 'COMING_SOON' : current === 'COMING_SOON' ? 'DRAFT' : 'ACTIVE';
  try {
    const updatedPayload = {
      ...scheme,
      status: next,
      active: next !== 'DRAFT'
    };
    await axios.put(`/api/v1/services/${scheme.id}`, updatedPayload);
    await fetchSchemes();
  } catch (error) {
    console.error('Failed to cycle scheme status:', error);
    alert('Failed to update scheme status.');
  }
};

const toggleActiveStatus = async (scheme) => {
  await cycleStatus(scheme);
};

// Delete Modal Handlers
const openDeleteModal = (scheme) => {
  schemeToDelete.value = scheme;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  if (isDeleting.value) return;
  showDeleteModal.value = false;
  schemeToDelete.value = null;
};

const confirmDeleteScheme = async () => {
  if (!schemeToDelete.value) return;
  isDeleting.value = true;
  try {
    await axios.delete(`/api/v1/services/${schemeToDelete.value.id}`);
    schemes.value = schemes.value.filter((s) => s.id !== schemeToDelete.value.id);
    showDeleteModal.value = false;
    schemeToDelete.value = null;
  } catch (error) {
    console.error('Failed to delete scheme:', error);
    alert('Failed to delete scheme.');
  } finally {
    isDeleting.value = false;
  }
};

onMounted(fetchSchemes);
</script>

<style scoped>
/* Subtle, slim custom scrollbar matching the UI */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 9999px;
  transition: background-color 0.2s ease;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #008795;
}

/* Ensure sticky header background stays opaque across browsers */
thead.sticky th {
  background-color: #f1f5f9;
}
</style>
