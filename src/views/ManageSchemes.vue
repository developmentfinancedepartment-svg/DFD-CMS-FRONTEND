<template>
  <div class="h-screen overflow-hidden flex flex-col p-6 lg:p-8 bg-slate-50/60">
    <div class="max-w-7xl mx-auto space-y-6 flex-1 min-h-0 flex flex-col w-full">
      
      <!-- 1. HEADER & METRIC STATS -->
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 shrink-0">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200/80 text-cyan-800 text-xs font-bold uppercase tracking-wider mb-2">
            <span class="h-1.5 w-1.5 rounded-full bg-[#008795]"></span>
            DFD Credit Facilities &amp; Subsidies
          </div>
          <h1 class="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Development Financing Schemes
          </h1>
          <p class="text-slate-500 mt-1 text-sm">
            Configure ministry credit lines, concessional rates, and public-facing financial assistance.
          </p>
        </div>

        <!-- Metric Badges & Primary Action -->
        <div class="flex flex-wrap items-center gap-3">
          <div class="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-xs font-bold">
            <span class="text-slate-400">Total:</span>
            <span class="text-slate-800 font-extrabold">{{ schemes.length }}</span>
            <span class="text-slate-300">•</span>
            <span class="text-emerald-600 font-extrabold">{{ activeCount }} Active</span>
          </div>

          <button
            @click="openAddModal"
            class="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#008795] to-[#006071] hover:from-[#009fb0] hover:to-[#007c91] text-white text-sm font-bold shadow-lg shadow-cyan-900/15 transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Scheme
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
            placeholder="Search schemes by title or description..."
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
          <!-- Category Dropdown -->
          <div class="flex items-center gap-2">
            <label class="text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:inline">Category:</label>
            <select
              v-model="selectedCategoryFilter"
              class="px-3.5 py-2.5 text-sm font-semibold bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-700"
            >
              <option value="All Categories">All Categories</option>
              <option value="MSME Revitalization">MSME Revitalization</option>
              <option value="Agriculture & Livestock">Agriculture &amp; Livestock</option>
              <option value="Green Energy">Green Energy</option>
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

      <!-- 3. MODERN TABLE CONTAINER (ROUNDED-3XL CARD WITH BORDER-SEPARATE ROW SPACING) -->
      <div class="bg-white rounded-3xl border border-slate-200/80 shadow-[0_10px_35px_rgba(0,135,149,0.05)] overflow-hidden p-4 lg:p-6 flex-1 min-h-0 flex flex-col">
        <div class="flex-1 min-h-0 overflow-y-auto custom-scrollbar">
          <table class="w-full text-left border-separate border-spacing-y-2.5">
            <thead class="sticky top-0 z-20 bg-slate-100 shadow-sm">
              <tr class="bg-slate-100 text-[11px] font-semibold text-slate-500 tracking-wider uppercase">
                <th class="px-6 py-3.5 first:rounded-l-2xl last:rounded-r-2xl">Scheme Details</th>
                <th class="px-6 py-3.5">Category</th>
                <th class="px-6 py-3.5">Max Amount</th>
                <th class="px-6 py-3.5">Interest Rate</th>
                <th class="px-6 py-3.5">Description</th>
                <th class="px-6 py-3.5 text-center">Status</th>
                <th class="px-6 py-3.5 text-right first:rounded-l-2xl last:rounded-r-2xl">Actions</th>
              </tr>
            </thead>
            <tbody class="text-sm">
              <tr
                v-for="(scheme, index) in paginatedSchemes"
                :key="scheme.id"
                :class="[
                  'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md group',
                  index % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'
                ]"
              >
                <!-- Scheme Details (Icon, Title, Icon Code) -->
                <td class="px-6 py-5 border-y first:border-l last:border-r border-slate-200/80 group-hover:border-cyan-500/60 transition-colors first:rounded-l-2xl last:rounded-r-2xl">
                  <div class="flex items-center gap-3.5">
                    <div class="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#008795] to-[#005a66] text-white flex items-center justify-center shrink-0 shadow-md shadow-cyan-900/15 group-hover:scale-105 transition-transform">
                      <i :class="scheme.icon || 'fas fa-hand-holding-usd'" class="text-base"></i>
                    </div>
                    <div>
                      <div class="font-extrabold text-slate-900 group-hover:text-[#007c91] transition-colors leading-snug">
                        {{ scheme.title }}
                      </div>
                      <div class="text-[11px] text-slate-400 font-mono mt-0.5">
                        {{ scheme.icon }}
                      </div>
                    </div>
                  </div>
                </td>

                <!-- Category Badge -->
                <td class="px-6 py-5 whitespace-nowrap border-y border-slate-200/80 group-hover:border-cyan-500/60 transition-colors">
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-50 text-cyan-800 border border-cyan-200/80">
                    {{ scheme.category }}
                  </span>
                </td>

                <!-- Max Amount -->
                <td class="px-6 py-5 font-bold text-slate-700 whitespace-nowrap border-y border-slate-200/80 group-hover:border-cyan-500/60 transition-colors">
                  {{ scheme.maxAmount }}
                </td>

                <!-- Interest Rate (Bold Teal) -->
                <td class="px-6 py-5 whitespace-nowrap border-y border-slate-200/80 group-hover:border-cyan-500/60 transition-colors">
                  <span class="font-extrabold text-[#007c91]">
                    {{ scheme.interestRate }}
                  </span>
                </td>

                <!-- Description -->
                <td class="px-6 py-5 text-slate-500 max-w-xs text-xs leading-relaxed border-y border-slate-200/80 group-hover:border-cyan-500/60 transition-colors">
                  <p class="line-clamp-2" :title="scheme.description">
                    {{ scheme.description }}
                  </p>
                </td>

                <!-- Status Pill with Dot -->
                <td class="px-6 py-5 text-center whitespace-nowrap border-y border-slate-200/80 group-hover:border-cyan-500/60 transition-colors">
                  <button
                    @click="toggleActiveStatus(scheme)"
                    :title="scheme.active ? 'Click to deactivate' : 'Click to activate'"
                    :class="[
                      'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-200 border',
                      scheme.active
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 shadow-sm shadow-emerald-500/10'
                        : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100 hover:border-rose-300 shadow-sm shadow-rose-500/10'
                    ]"
                  >
                    <span
                      :class="[
                        'h-2 w-2 rounded-full',
                        scheme.active ? 'bg-emerald-500 shadow-[0_0_6px_#10b981]' : 'bg-rose-500'
                      ]"
                    ></span>
                    {{ scheme.active ? 'Active' : 'Inactive' }}
                  </button>
                </td>

                <!-- Actions -->
                <td class="px-6 py-5 text-right whitespace-nowrap border-y first:border-l last:border-r border-slate-200/80 group-hover:border-cyan-500/60 transition-colors first:rounded-l-2xl last:rounded-r-2xl">
                  <div class="inline-flex items-center justify-end gap-1.5">
                    <button
                      @click="openEditModal(scheme)"
                      class="p-2 text-cyan-700 hover:text-cyan-900 hover:bg-cyan-50 rounded-xl transition-all"
                      title="Edit Scheme"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      @click="openDeleteModal(scheme)"
                      class="p-2 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-xl transition-all"
                      title="Delete Scheme"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>

              <!-- Loading State -->
              <tr v-if="loading" class="bg-white">
                <td colspan="7" class="px-6 py-16 text-center text-slate-500 rounded-2xl border border-slate-200/80">
                  <div class="inline-flex items-center gap-3">
                    <svg class="animate-spin h-5 w-5 text-[#008795]" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                    <span class="font-bold text-slate-600">Loading financing schemes...</span>
                  </div>
                </td>
              </tr>

              <!-- No Results State -->
              <tr v-if="!loading && filteredSchemes.length === 0" class="bg-white">
                <td colspan="7" class="px-6 py-16 text-center text-slate-500 rounded-2xl border border-slate-200/80">
                  <div class="flex flex-col items-center justify-center max-w-sm mx-auto space-y-3">
                    <div class="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p class="font-bold text-slate-700">No matching schemes found</p>
                    <p class="text-xs text-slate-400">
                      Try clearing or adjusting your search query or category filter.
                    </p>
                    <button
                      v-if="searchQuery || selectedCategoryFilter !== 'All Categories'"
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
            schemes
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
      <div class="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-7 sm:p-8 animate-in fade-in zoom-in duration-200 custom-scrollbar">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-2xl font-extrabold text-slate-900">
              {{ isEdit ? 'Edit Financing Scheme' : 'Add New Financing Scheme' }}
            </h2>
            <p class="text-xs text-slate-500 mt-0.5">
              {{ isEdit ? 'Update details for this credit line' : 'Publish a new development loan scheme to the portal' }}
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

        <form @submit.prevent="saveScheme" class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Scheme Title</label>
            <input
              v-model="form.title"
              type="text"
              required
              placeholder="e.g. Re-MSME Plus Loan Scheme"
              class="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Category</label>
            <select
              v-model="form.category"
              required
              class="w-full px-4 py-2.5 text-sm font-semibold bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800"
            >
              <option value="" disabled>Select a category</option>
              <option value="MSME Revitalization">MSME Revitalization</option>
              <option value="Agriculture & Livestock">Agriculture &amp; Livestock</option>
              <option value="Green Energy">Green Energy</option>
            </select>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Max Amount</label>
              <input
                v-model="form.maxAmount"
                type="text"
                required
                placeholder="e.g. Up to Rs. 25M"
                class="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800"
              />
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Interest Rate</label>
              <input
                v-model="form.interestRate"
                type="text"
                required
                placeholder="e.g. 5% p.a."
                class="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Repayment Period</label>
              <input
                v-model="form.repaymentPeriod"
                type="text"
                placeholder="e.g. Up to 60 Months"
                class="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800"
              />
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Grace Period</label>
              <input
                v-model="form.gracePeriod"
                type="text"
                placeholder="e.g. Up to 6 Months"
                class="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Scheme Purpose & Objective</label>
            <textarea
              v-model="form.purpose"
              rows="3"
              placeholder="Describe the scheme's main purpose and objective..."
              class="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800"
            ></textarea>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Eligibility</label>
            <textarea
              v-model="form.eligibility"
              rows="3"
              placeholder="List borrower eligibility requirements and criteria..."
              class="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800"
            ></textarea>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Participating Banks (Comma-separated)</label>
            <input
              v-model="form.participatingBanks"
              type="text"
              placeholder="e.g. Bank of Ceylon, People's Bank, Commercial Bank"
              class="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800"
            />
            <p class="text-[11px] text-slate-400 mt-1">Separate multiple banks with commas</p>
          </div>

          

          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">FontAwesome Icon Class</label>
            <div class="flex items-center gap-3">
              <div class="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#008795] to-[#005a66] text-white flex items-center justify-center shrink-0 shadow-sm">
                <i :class="form.icon || 'fas fa-hand-holding-usd'" class="text-base"></i>
              </div>
              <input
                v-model="form.icon"
                type="text"
                required
                placeholder="e.g. fas fa-store"
                class="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800 font-mono"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Description</label>
            <textarea
              v-model="form.description"
              rows="3"
              required
              placeholder="Enter scheme description..."
              class="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800"
            ></textarea>
          </div>

          <div class="flex items-center gap-2 pt-1">
            <input
              id="scheme-active-check"
              v-model="form.active"
              type="checkbox"
              class="w-4 h-4 text-[#008795] rounded border-slate-300 focus:ring-[#008795]"
            />
            <label for="scheme-active-check" class="text-sm font-semibold text-slate-700">
              Active (Visible immediately on Public Services page)
            </label>
          </div>

          <div class="flex gap-3 pt-5">
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
              {{ isEdit ? 'Update Scheme' : 'Create Scheme' }}
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
            Delete Financing Scheme?
          </h3>
          <p class="mt-2 text-sm text-cyan-100/70 leading-relaxed">
            Are you sure you want to permanently delete this development financing scheme? This action cannot be undone.
          </p>

          <!-- Selected Scheme Preview Card -->
          <div
            v-if="schemeToDelete"
            class="mt-4 w-full p-3.5 rounded-2xl bg-[#001f24] border border-cyan-500/20 flex items-center gap-3 text-left"
          >
            <div
              class="w-10 h-10 rounded-xl bg-[#008795]/20 text-cyan-300 flex items-center justify-center shrink-0 border border-cyan-400/25 shadow-sm"
            >
              <i :class="schemeToDelete.icon || 'fas fa-hand-holding-usd'"></i>
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-sm font-bold text-white truncate">{{ schemeToDelete.title }}</p>
              <div class="flex items-center gap-2 mt-0.5">
                <span class="text-[11px] text-cyan-300 font-semibold">{{ schemeToDelete.category }}</span>
                <span class="text-cyan-500/40 text-[10px]">•</span>
                <span class="text-[11px] text-gray-300 font-medium">{{ schemeToDelete.maxAmount }}</span>
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
const selectedCategoryFilter = ref('All Categories');
const pageSize = ref(5);
const currentPage = ref(1);

// Delete Modal Reactive States
const showDeleteModal = ref(false);
const schemeToDelete = ref(null);
const isDeleting = ref(false);

const defaultForm = () => ({
  title: '',
  category: 'MSME Revitalization',
  maxAmount: '',
  interestRate: '',
  repaymentPeriod: '',
  gracePeriod: '',
  purpose: '',
  eligibility: '',
  participatingBanks: '',
  description: '',
  icon: 'fas fa-hand-holding-usd',
  active: true
});

const form = ref(defaultForm());

// Computed Stats
const activeCount = computed(() => schemes.value.filter(s => s.active).length);

const customCategories = computed(() => {
  const standard = ['MSME Revitalization', 'Agriculture & Livestock', 'Green Energy'];
  const found = schemes.value.map(s => s.category).filter(c => c && !standard.includes(c));
  return [...new Set(found)];
});

// Real-Time Filtering Logic
const filteredSchemes = computed(() => {
  return schemes.value.filter(scheme => {
    // 1. Category match
    const matchesCategory =
      selectedCategoryFilter.value === 'All Categories' ||
      scheme.category === selectedCategoryFilter.value;

    if (!matchesCategory) return false;

    // 2. Search query match (title and description)
    if (!searchQuery.value.trim()) return true;

    const query = searchQuery.value.toLowerCase().trim();
    const titleMatch = (scheme.title || '').toLowerCase().includes(query);
    const descMatch = (scheme.description || '').toLowerCase().includes(query);

    return titleMatch || descMatch;
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
watch([searchQuery, selectedCategoryFilter, pageSize], () => {
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

// Modal Actions
const openAddModal = () => {
  isEdit.value = false;
  editingId.value = null;
  form.value = defaultForm();
  showModal.value = true;
};

const openEditModal = (scheme) => {
  isEdit.value = true;
  editingId.value = scheme.id;
  form.value = {
    title: scheme.title || '',
    category: scheme.category || 'MSME Revitalization',
    maxAmount: scheme.maxAmount || '',
    interestRate: scheme.interestRate || '',
    repaymentPeriod: scheme.repaymentPeriod || '',
    gracePeriod: scheme.gracePeriod || '',
    purpose: scheme.purpose || '',
    eligibility: scheme.eligibility || '',
    participatingBanks: scheme.participatingBanks || '',
    description: scheme.description || '',
    icon: scheme.icon || 'fas fa-hand-holding-usd',
    active: Boolean(scheme.active)
  };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const saveScheme = async () => {
  try {
    const payload = { ...form.value };
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

const toggleActiveStatus = async (scheme) => {
  try {
    const updatedPayload = {
      ...scheme,
      active: !scheme.active
    };
    await axios.put(`/api/v1/services/${scheme.id}`, updatedPayload);
    await fetchSchemes();
  } catch (error) {
    console.error('Failed to toggle scheme status:', error);
    alert('Failed to update scheme status.');
  }
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
