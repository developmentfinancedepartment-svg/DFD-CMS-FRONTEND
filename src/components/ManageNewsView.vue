<template>
  <div class="h-screen overflow-hidden flex flex-col p-6 lg:p-8 bg-slate-50/60">
    <div class="max-w-7xl mx-auto space-y-5 flex-1 min-h-0 flex flex-col w-full">

      <!-- 1. HEADER & METRIC STATS -->
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 shrink-0">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200/80 text-cyan-800 text-xs font-bold uppercase tracking-wider mb-2">
            <span class="h-1.5 w-1.5 rounded-full bg-[#008795]"></span>
            DFD Public Broadcast &amp; Ticker
          </div>
          <h1 class="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            News Ticker Headlines
          </h1>
          <p class="text-slate-500 mt-1 text-sm">
            Publish, update, and manage scrolling announcement headlines displayed on the public portal marquee.
          </p>
        </div>

        <!-- Metric Badges & Add Action -->
        <div class="flex flex-wrap items-center gap-3">
          <div class="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-xs font-bold">
            <span class="text-slate-400">Total:</span>
            <span class="text-slate-800 font-extrabold">{{ newsItems.length }}</span>
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
            Publish Headline
          </button>
        </div>
      </div>

      <!-- 2. QUICK PUBLISH & LIVE TICKER PREVIEW BAR (ROUNDED-3XL CARD) -->
      <div class="bg-white rounded-3xl border border-slate-200/80 p-4 lg:p-5 shadow-sm space-y-4 shrink-0">
        <!-- Live Ticker Preview Preview Ribbon -->
        <div class="flex items-center gap-3 overflow-hidden rounded-2xl bg-[#002025] border border-cyan-500/20 px-4 py-2.5 shadow-inner">
          <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-xl bg-[#008795] text-white text-xs font-black tracking-wider uppercase shrink-0">
            <i class="fas fa-bullhorn text-xs"></i>
            <span>LIVE PREVIEW</span>
          </div>
          <div class="flex-1 overflow-hidden relative">
            <div class="ticker-preview-track flex items-center gap-8 whitespace-nowrap text-sm text-cyan-100">
              <span v-if="activeNews.length === 0" class="text-slate-400 italic text-xs">
                No active headlines to display on marquee. Publish a headline below.
              </span>
              <span
                v-for="item in activeNews"
                :key="'preview-' + item.id"
                class="inline-flex items-center gap-2 font-medium"
              >
                <span class="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
                <span>{{ item.title }}</span>
                <span v-if="item.linkUrl" class="text-[11px] text-cyan-400 font-mono underline opacity-80">({{ item.linkUrl }})</span>
              </span>
            </div>
          </div>
        </div>

        <!-- Filter / Search toolbar -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
          <div class="relative flex-1 w-full max-w-md">
            <span class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search news headlines or links..."
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

          <div class="flex items-center gap-3 w-full sm:w-auto justify-end">
            <!-- Filter Status Dropdown -->
            <select
              v-model="statusFilter"
              class="px-3.5 py-2.5 text-sm font-semibold bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-700"
            >
              <option value="all">All Headlines</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>

            <!-- Refresh Button -->
            <button
              @click="fetchNews"
              :disabled="loading"
              class="p-2.5 text-slate-600 hover:text-[#008795] hover:bg-slate-100 rounded-2xl transition border border-slate-200"
              title="Refresh list"
            >
              <svg :class="{ 'animate-spin': loading }" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- 3. TABLE CONTAINER (ROUNDED-3XL CARD) -->
      <div class="bg-white rounded-3xl border border-slate-200/80 shadow-[0_10px_35px_rgba(0,135,149,0.05)] overflow-hidden p-4 lg:p-6 flex-1 min-h-0 flex flex-col">
        <div class="flex-1 min-h-0 overflow-y-auto custom-scrollbar">
          <table class="w-full text-left border-separate border-spacing-y-2.5">
            <thead class="sticky top-0 z-20 bg-slate-100 shadow-sm">
              <tr class="bg-slate-100 text-[11px] font-semibold text-slate-500 tracking-wider uppercase">
                <th class="px-6 py-3.5 first:rounded-l-2xl last:rounded-r-2xl">Headline Title</th>
                <th class="px-6 py-3.5">Target Link</th>
                <th class="px-6 py-3.5">Published Date</th>
                <th class="px-6 py-3.5 text-center">Ticker Status</th>
                <th class="px-6 py-3.5 text-right first:rounded-l-2xl last:rounded-r-2xl">Actions</th>
              </tr>
            </thead>
            <tbody class="text-sm">
              <tr
                v-for="(item, index) in filteredNews"
                :key="item.id"
                :class="[
                  'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md group',
                  index % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'
                ]"
              >
                <!-- Headline Title -->
                <td class="px-6 py-4 border-y first:border-l last:border-r border-slate-200/80 group-hover:border-cyan-500/60 transition-colors first:rounded-l-2xl last:rounded-r-2xl max-w-md">
                  <div class="flex items-start gap-3.5">
                    <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-[#008795] to-[#005a66] text-white flex items-center justify-center shrink-0 shadow-sm shadow-cyan-900/15 mt-0.5">
                      <i class="fas fa-newspaper text-sm"></i>
                    </div>
                    <div>
                      <div class="font-extrabold text-slate-900 group-hover:text-[#007c91] transition-colors leading-snug">
                        {{ item.title }}
                      </div>
                      <div class="text-[11px] text-slate-400 font-mono mt-0.5">
                        ID: #{{ item.id }}
                      </div>
                    </div>
                  </div>
                </td>

                <!-- Target Link -->
                <td class="px-6 py-4 whitespace-nowrap border-y border-slate-200/80 group-hover:border-cyan-500/60 transition-colors">
                  <div v-if="item.linkUrl" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-50 text-cyan-800 border border-cyan-200/80">
                    <svg class="w-3.5 h-3.5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <a :href="item.linkUrl" target="_blank" rel="noopener noreferrer" class="hover:underline max-w-[200px] truncate" :title="item.linkUrl">
                      {{ item.linkUrl }}
                    </a>
                  </div>
                  <span v-else class="text-xs text-slate-400 italic">None</span>
                </td>

                <!-- Published Date -->
                <td class="px-6 py-4 whitespace-nowrap text-xs text-slate-500 border-y border-slate-200/80 group-hover:border-cyan-500/60 transition-colors">
                  {{ formatDate(item.createdAt) }}
                </td>

                <!-- Status Pill -->
                <td class="px-6 py-4 text-center whitespace-nowrap border-y border-slate-200/80 group-hover:border-cyan-500/60 transition-colors">
                  <button
                    @click="toggleActiveStatus(item)"
                    :title="item.active ? 'Click to deactivate' : 'Click to activate'"
                    :class="[
                      'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-200 border',
                      item.active
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 shadow-sm shadow-emerald-500/10'
                        : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100 hover:border-rose-300 shadow-sm shadow-rose-500/10'
                    ]"
                  >
                    <span
                      :class="[
                        'h-2 w-2 rounded-full',
                        item.active ? 'bg-emerald-500 shadow-[0_0_6px_#10b981]' : 'bg-rose-500'
                      ]"
                    ></span>
                    {{ item.active ? 'Active' : 'Inactive' }}
                  </button>
                </td>

                <!-- Actions -->
                <td class="px-6 py-4 text-right whitespace-nowrap border-y first:border-l last:border-r border-slate-200/80 group-hover:border-cyan-500/60 transition-colors first:rounded-l-2xl last:rounded-r-2xl">
                  <div class="inline-flex items-center justify-end gap-1.5">
                    <button
                      @click="openEditModal(item)"
                      class="p-2 text-cyan-700 hover:text-cyan-900 hover:bg-cyan-50 rounded-xl transition-all"
                      title="Edit Headline"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      @click="openDeleteModal(item)"
                      class="p-2 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-xl transition-all"
                      title="Delete Headline"
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
                <td colspan="5" class="px-6 py-16 text-center text-slate-500 rounded-2xl border border-slate-200/80">
                  <div class="inline-flex items-center gap-3">
                    <svg class="animate-spin h-5 w-5 text-[#008795]" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                    <span class="font-bold text-slate-600">Loading news ticker headlines...</span>
                  </div>
                </td>
              </tr>

              <!-- Empty State -->
              <tr v-if="!loading && filteredNews.length === 0" class="bg-white">
                <td colspan="5" class="px-6 py-16 text-center text-slate-500 rounded-2xl border border-slate-200/80">
                  <div class="flex flex-col items-center justify-center max-w-sm mx-auto space-y-3">
                    <div class="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                    <p class="font-bold text-slate-700">No headlines found</p>
                    <p class="text-xs text-slate-400">
                      Submit a new headline or adjust your search filter above.
                    </p>
                    <button
                      @click="openAddModal"
                      class="px-4 py-2 text-xs font-bold text-white bg-[#008795] hover:bg-[#00707c] rounded-xl transition shadow-sm"
                    >
                      Publish First Headline
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination / Summary Footer -->
        <div class="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <div>
            Showing <span class="font-bold text-slate-800">{{ filteredNews.length }}</span> of <span class="font-bold text-slate-800">{{ newsItems.length }}</span> total headlines
          </div>
          <div class="text-[11px] text-slate-400">
            Active items automatically sync with the public portal news ticker.
          </div>
        </div>
      </div>

    </div>

    <!-- ADD / EDIT HEADLINE MODAL -->
    <div
      v-if="showModal"
      @click.self="closeModal"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] px-4 py-6 overflow-y-auto"
    >
      <div class="bg-white rounded-3xl w-full max-w-lg shadow-2xl p-7 sm:p-8 animate-in fade-in zoom-in duration-200">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-2xl font-extrabold text-slate-900">
              {{ isEdit ? 'Edit News Headline' : 'Publish News Headline' }}
            </h2>
            <p class="text-xs text-slate-500 mt-0.5">
              {{ isEdit ? 'Update details for this ticker announcement' : 'Broadcast a new headline across the public web ticker' }}
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

        <form @submit.prevent="submitForm" class="space-y-4">
          <!-- Title / Headline -->
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Headline Title <span class="text-rose-500">*</span>
            </label>
            <textarea
              v-model="form.title"
              rows="3"
              required
              placeholder="e.g. Concessionary financing scheme now open for Green Energy MSMEs..."
              class="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800 resize-none"
            ></textarea>
            <p class="text-[11px] text-slate-400 mt-1">Keep it concise and clear for continuous ticker scrolling.</p>
          </div>

          <!-- Link URL -->
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Target Link URL <span class="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              v-model="form.linkUrl"
              type="text"
              placeholder="e.g. /services/green-energy or https://treasury.gov.lk"
              class="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800"
            />
            <p class="text-[11px] text-slate-400 mt-1">Users can click the headline to open internal routes or external URLs.</p>
          </div>

          <!-- Active Toggle -->
          <div class="flex items-center gap-3 pt-2">
            <input
              id="activeCheckbox"
              v-model="form.active"
              type="checkbox"
              class="w-4 h-4 text-[#008795] bg-slate-100 border-slate-300 rounded focus:ring-[#008795]"
            />
            <label for="activeCheckbox" class="text-sm font-semibold text-slate-700 select-none cursor-pointer">
              Active (show immediately on the public ticker)
            </label>
          </div>

          <!-- Modal Actions -->
          <div class="flex items-center justify-end gap-3 pt-6 border-t border-slate-100 mt-6">
            <button
              type="button"
              @click="closeModal"
              class="px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-2xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="submitting"
              class="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[#008795] to-[#006071] hover:from-[#009fb0] hover:to-[#007c91] text-white text-sm font-bold shadow-lg shadow-cyan-900/15 transition disabled:opacity-50"
            >
              <svg v-if="submitting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              <span>{{ isEdit ? 'Update Headline' : 'Publish Headline' }}</span>
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
        <div class="pointer-events-none absolute -top-16 -right-16 w-36 h-36 rounded-full bg-cyan-400/10 blur-3xl"></div>
        <div class="pointer-events-none absolute -bottom-16 -left-16 w-36 h-36 rounded-full bg-red-500/15 blur-3xl"></div>

        <div class="relative z-10 flex flex-col items-center">
          <div
            class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/15 border border-red-500/30 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.25)]"
          >
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>

          <h3 class="text-xl font-black tracking-tight text-white mb-2">
            Delete News Headline?
          </h3>

          <p class="text-xs leading-relaxed text-cyan-100/70 mb-4 max-w-sm">
            Are you sure you want to delete this headline from the portal marquee?
          </p>

          <div
            v-if="itemToDelete"
            class="w-full mb-6 rounded-2xl bg-[#001c22]/80 border border-cyan-500/15 p-3.5 text-left text-xs"
          >
            <div class="font-extrabold text-white truncate mb-1">
              {{ itemToDelete.title }}
            </div>
            <div class="flex items-center gap-2 text-[11px] text-cyan-300/60 font-mono">
              <span>ID: #{{ itemToDelete.id }}</span>
              <span v-if="itemToDelete.linkUrl">• {{ itemToDelete.linkUrl }}</span>
            </div>
          </div>

          <div class="flex w-full items-center gap-3">
            <button
              type="button"
              :disabled="isDeleting"
              @click="closeDeleteModal"
              class="flex-1 py-3 px-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white text-xs font-extrabold tracking-wide border border-white/10 transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              :disabled="isDeleting"
              @click="confirmDelete"
              class="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white text-xs font-extrabold tracking-wide shadow-[0_0_20px_rgba(239,68,68,0.35)] transition flex items-center justify-center gap-1.5 disabled:opacity-50"
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
import { ref, computed, onMounted } from 'vue';
import axios from '../axiosInstance';

// State
const newsItems = ref([]);
const loading = ref(false);
const submitting = ref(false);
const searchQuery = ref('');
const statusFilter = ref('all');

// Modal States
const showModal = ref(false);
const isEdit = ref(false);
const editingId = ref(null);
const form = ref({
  title: '',
  linkUrl: '',
  active: true
});

// Delete Modal States
const showDeleteModal = ref(false);
const itemToDelete = ref(null);
const isDeleting = ref(false);

// Computed stats
const activeNews = computed(() => {
  return newsItems.value.filter((n) => n.active);
});

const activeCount = computed(() => activeNews.value.length);

const filteredNews = computed(() => {
  return newsItems.value.filter((item) => {
    // Status filter
    if (statusFilter.value === 'active' && !item.active) return false;
    if (statusFilter.value === 'inactive' && item.active) return false;

    // Search query
    if (!searchQuery.value.trim()) return true;
    const q = searchQuery.value.toLowerCase().trim();
    const titleMatch = (item.title || '').toLowerCase().includes(q);
    const linkMatch = (item.linkUrl || '').toLowerCase().includes(q);
    return titleMatch || linkMatch;
  });
});

// API Calls
const fetchNews = async () => {
  loading.value = true;
  try {
    const res = await axios.get('/api/news');
    newsItems.value = Array.isArray(res.data) ? res.data : [];
  } catch (error) {
    console.error('Failed to fetch news headlines:', error);
    // If backend returns 404/403 or empty, fallback gracefully
    if (newsItems.value.length === 0) {
      newsItems.value = [];
    }
  } finally {
    loading.value = false;
  }
};

const openAddModal = () => {
  isEdit.value = false;
  editingId.value = null;
  form.value = {
    title: '',
    linkUrl: '',
    active: true
  };
  showModal.value = true;
};

const openEditModal = (item) => {
  isEdit.value = true;
  editingId.value = item.id;
  form.value = {
    title: item.title,
    linkUrl: item.linkUrl || '',
    active: item.active
  };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const submitForm = async () => {
  if (!form.value.title.trim()) return;

  submitting.value = true;
  try {
    if (isEdit.value && editingId.value) {
      await axios.put(`/api/news/${editingId.value}`, form.value);
    } else {
      await axios.post('/api/news', form.value);
    }
    showModal.value = false;
    await fetchNews();
  } catch (error) {
    console.error('Failed to save news headline:', error);
    alert('Failed to save news headline.');
  } finally {
    submitting.value = false;
  }
};

const toggleActiveStatus = async (item) => {
  try {
    const updatedPayload = {
      ...item,
      active: !item.active
    };
    await axios.put(`/api/news/${item.id}`, updatedPayload);
    await fetchNews();
  } catch (error) {
    console.error('Failed to toggle news status:', error);
    alert('Failed to update status.');
  }
};

const openDeleteModal = (item) => {
  itemToDelete.value = item;
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
  try {
    await axios.delete(`/api/news/${itemToDelete.value.id}`);
    newsItems.value = newsItems.value.filter((n) => n.id !== itemToDelete.value.id);
    showDeleteModal.value = false;
    itemToDelete.value = null;
  } catch (error) {
    console.error('Failed to delete news headline:', error);
    alert('Failed to delete headline.');
  } finally {
    isDeleting.value = false;
  }
};

const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return dateStr;
  }
};

onMounted(fetchNews);
</script>

<style scoped>
/* Subtle slim scrollbar */
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

/* Ticker Preview Marquee Animation */
@keyframes preview-marquee {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.ticker-preview-track {
  animation: preview-marquee 30s linear infinite;
  display: inline-flex;
}

.ticker-preview-track:hover {
  animation-play-state: paused;
}
</style>
