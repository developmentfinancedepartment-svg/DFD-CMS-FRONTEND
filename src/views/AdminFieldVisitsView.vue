<template>
  <div class="p-6 lg:p-8 bg-slate-50/60 min-h-screen">
    <div class="max-w-7xl mx-auto space-y-6">
      
      <!-- 1. TOP HEADER & METRIC STATS -->
      <div class="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 pb-2">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200/80 text-cyan-800 text-xs font-bold uppercase tracking-wider mb-2">
            <span class="h-1.5 w-1.5 rounded-full bg-[#008795]"></span>
            DFD Progress Monitoring &amp; Inspection
          </div>
          <h1 class="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Manage Field Visits
          </h1>
          <p class="text-slate-500 mt-1 text-sm">
            Record on-ground monitoring missions, track regional beneficiaries, and document key findings.
          </p>
        </div>

        <!-- Metric KPI Cards -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3.5 w-full xl:w-auto">
          <!-- Total Visits -->
          <div class="flex items-center gap-3 px-4 py-3 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
            <div class="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-[#008795] shrink-0">
              <i class="fas fa-clipboard-check text-sm"></i>
            </div>
            <div>
              <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Visits</p>
              <span class="text-lg font-extrabold text-slate-900">{{ visits.length }}</span>
            </div>
          </div>

          <!-- Central -->
          <div class="flex items-center gap-3 px-4 py-3 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
            <div class="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
              <i class="fas fa-map-marker-alt text-sm"></i>
            </div>
            <div>
              <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Central</p>
              <span class="text-lg font-extrabold text-slate-900">{{ countRegion('Central') }}</span>
            </div>
          </div>

          <!-- North Western -->
          <div class="flex items-center gap-3 px-4 py-3 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
            <div class="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
              <i class="fas fa-map-marker-alt text-sm"></i>
            </div>
            <div>
              <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">North Western</p>
              <span class="text-lg font-extrabold text-slate-900">{{ countRegion('North Western') }}</span>
            </div>
          </div>

          <!-- Eastern & Southern -->
          <div class="flex items-center gap-3 px-4 py-3 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
            <div class="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
              <i class="fas fa-map-marker-alt text-sm"></i>
            </div>
            <div>
              <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">East &amp; South</p>
              <span class="text-lg font-extrabold text-slate-900">{{ countRegion('Eastern') + countRegion('Southern') }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Alerts -->
      <div v-if="successMessage" class="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center justify-between shadow-sm animate-in fade-in duration-200">
        <div class="flex items-center gap-2.5">
          <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{{ successMessage }}</span>
        </div>
        <button @click="successMessage = ''" class="text-emerald-500 hover:text-emerald-700">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <div v-if="errorMessage" class="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm font-semibold flex items-center justify-between shadow-sm animate-in fade-in duration-200">
        <div class="flex items-center gap-2.5">
          <svg class="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <span>{{ errorMessage }}</span>
        </div>
        <button @click="errorMessage = ''" class="text-rose-500 hover:text-rose-700">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <!-- MAIN SPLIT GRID -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        <!-- 2. CREATE FORM (Left: 5 cols) -->
        <div class="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 p-6 lg:p-7 shadow-sm sticky top-24">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-[#008795]">
              <i class="fas fa-plus-circle text-base"></i>
            </div>
            <div>
              <h2 class="text-lg font-bold text-slate-800">Add Field Visit</h2>
              <p class="text-xs text-slate-400">Record a new regional inspection to POST /api/v1/field-visits</p>
            </div>
          </div>

          <form @submit.prevent="handleSave" class="space-y-4">
            <!-- Title -->
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Visit Title <span class="text-rose-500">*</span>
              </label>
              <input
                v-model="form.title"
                type="text"
                required
                placeholder="e.g. Dairy Farming Cooperative Inspection"
                class="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800"
              />
            </div>

            <!-- Region & Scheme Type Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Region Dropdown -->
              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Region <span class="text-rose-500">*</span>
                </label>
                <select
                  v-model="form.region"
                  required
                  class="w-full px-4 py-2.5 text-sm font-semibold bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800"
                >
                  <option value="" disabled>Select Region</option>
                  <option value="Central">Central</option>
                  <option value="North Western">North Western</option>
                  <option value="Eastern">Eastern</option>
                  <option value="Southern">Southern</option>
                  <option value="Western">Western</option>
                  <option value="Northern">Northern</option>
                  <option value="North Central">North Central</option>
                  <option value="Uva">Uva</option>
                  <option value="Sabaragamuwa">Sabaragamuwa</option>
                </select>
              </div>

              <!-- Scheme Type Input -->
              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Scheme Type <span class="text-rose-500">*</span>
                </label>
                <input
                  v-model="form.schemeType"
                  type="text"
                  required
                  placeholder="e.g. SME Loan"
                  class="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800"
                />
              </div>
            </div>

            <!-- Description Textarea -->
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Description / Overview <span class="text-rose-500">*</span>
              </label>
              <textarea
                v-model="form.description"
                rows="3"
                required
                placeholder="Brief summary of the visit objective, site location, and beneficiary context..."
                class="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800"
              ></textarea>
            </div>

            <!-- Key Takeaways Textarea -->
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Key Takeaways (one point per line)
              </label>
              <textarea
                v-model="form.keyTakeaways"
                rows="4"
                placeholder="Enter key findings, one bullet point per line:&#10;Facility expanded by 30%&#10;Milk production increased by 500L/day&#10;Successfully onboarded 12 new farmers"
                class="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800 font-mono text-xs"
              ></textarea>
              <p class="text-[11px] text-slate-400 mt-1">Each line will be rendered as a bullet point with a green checkmark.</p>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="saving"
              class="w-full mt-2 inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#008795] to-[#006071] hover:from-[#009fb0] hover:to-[#007c91] text-white text-sm font-bold shadow-lg shadow-cyan-900/15 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg v-if="saving" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              <i v-else class="fas fa-save"></i>
              <span>{{ saving ? 'Saving Field Visit...' : 'Save Field Visit' }}</span>
            </button>
          </form>
        </div>

        <!-- 3. VISITS LIST (Right: 7 cols) -->
        <div class="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-6 lg:p-7 shadow-sm space-y-5">
          
          <!-- Filter & Search Bar -->
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-slate-100">
            <!-- Search -->
            <div class="relative flex-1 max-w-xs">
              <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </span>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search visits..."
                class="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-[#008795] outline-none transition text-slate-800"
              />
            </div>

            <!-- Region Filter Pills -->
            <div class="flex flex-wrap items-center gap-1.5">
              <button
                v-for="reg in ['All', 'Central', 'North Western', 'Eastern', 'Southern']"
                :key="reg"
                @click="selectedRegion = reg"
                :class="[
                  'px-3 py-1 rounded-xl text-xs font-bold transition',
                  selectedRegion === reg
                    ? 'bg-[#008795] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                ]"
              >
                {{ reg }}
              </button>
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="loading" class="py-16 text-center text-slate-500">
            <svg class="animate-spin h-6 w-6 text-[#008795] mx-auto mb-2" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            <p class="text-xs font-bold text-slate-600">Loading field visits...</p>
          </div>

          <!-- Empty State -->
          <div v-else-if="filteredVisits.length === 0" class="py-16 text-center text-slate-400">
            <div class="w-14 h-14 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
              <i class="fas fa-map-marked-alt text-2xl"></i>
            </div>
            <p class="text-sm font-bold text-slate-700">No field visits recorded</p>
            <p class="text-xs text-slate-400 mt-1">Use the form on the left to add inspection records.</p>
          </div>

          <!-- Visits List Cards -->
          <div v-else class="space-y-4">
            <div
              v-for="visit in filteredVisits"
              :key="visit.id"
              class="group bg-slate-50/70 hover:bg-white rounded-2xl border border-slate-200/80 hover:border-cyan-500/50 p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <!-- Top Badges & Delete Button -->
                <div class="flex items-center justify-between gap-3 mb-3">
                  <div class="flex flex-wrap items-center gap-2">
                    <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-50 text-cyan-800 border border-cyan-200/80">
                      <i class="fas fa-map-marker-alt text-[10px] text-[#008795]"></i>
                      {{ visit.region }}
                    </span>
                    <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-slate-200 text-slate-700">
                      {{ visit.schemeType }}
                    </span>
                  </div>

                  <button
                    @click="openDeleteModal(visit)"
                    class="p-2 text-rose-600 hover:text-white hover:bg-rose-600 rounded-xl transition"
                    title="Delete Field Visit"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                <!-- Title & Description -->
                <h3 class="text-base font-extrabold text-slate-900 group-hover:text-[#008795] transition-colors mb-2">
                  {{ visit.title }}
                </h3>
                <p class="text-xs text-slate-600 leading-relaxed mb-3">
                  {{ visit.description }}
                </p>

                <!-- Key Takeaways Preview -->
                <div v-if="getTakeawaysList(visit).length > 0" class="bg-white/80 rounded-xl p-3 border border-slate-200/60 mt-2">
                  <h4 class="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">Key Takeaways</h4>
                  <ul class="space-y-1.5">
                    <li
                      v-for="(point, idx) in getTakeawaysList(visit)"
                      :key="idx"
                      class="text-xs text-slate-700 flex items-start gap-2"
                    >
                      <i class="fas fa-check-circle text-emerald-500 mt-0.5 text-[11px] shrink-0"></i>
                      <span>{{ point }}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Footer details -->
              <div class="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-400">
                <span>Record ID: #{{ visit.id }}</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      <!-- DELETE CONFIRMATION MODAL -->
      <div
        v-if="showDeleteModal"
        @click.self="!isDeleting && closeDeleteModal()"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      >
        <div class="relative w-full max-w-md rounded-3xl bg-[#002b33] border border-cyan-500/20 p-7 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_30px_rgba(6,182,212,0.15)] overflow-hidden text-center animate-in fade-in zoom-in duration-200">
          <div class="pointer-events-none absolute -top-16 -right-16 w-36 h-36 rounded-full bg-cyan-400/10 blur-3xl"></div>
          <div class="pointer-events-none absolute -bottom-16 -left-16 w-36 h-36 rounded-full bg-red-500/15 blur-3xl"></div>

          <div class="relative z-10 flex flex-col items-center">
            <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/15 border border-red-500/30 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.25)]">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>

            <h3 class="text-xl font-extrabold tracking-tight text-white">
              Delete Field Visit?
            </h3>
            <p class="mt-2 text-sm text-cyan-100/70 leading-relaxed">
              Are you sure you want to permanently delete this field visit record? This action cannot be undone.
            </p>

            <div v-if="visitToDelete" class="mt-4 w-full p-3.5 rounded-2xl bg-[#001f24] border border-cyan-500/20 flex flex-col text-left">
              <p class="text-sm font-bold text-white truncate">{{ visitToDelete.title }}</p>
              <p class="text-xs text-cyan-300 mt-1">{{ visitToDelete.region }} • {{ visitToDelete.schemeType }}</p>
            </div>

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
                @click="confirmDelete"
                class="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-600 px-4 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(225,29,72,0.35)] hover:shadow-[0_10px_25px_rgba(225,29,72,0.5)] transition-all disabled:opacity-60"
              >
                <svg v-if="isDeleting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from '../axiosInstance';

// State
const visits = ref([]);
const loading = ref(false);
const saving = ref(false);
const isDeleting = ref(false);

const selectedRegion = ref('All');
const searchQuery = ref('');

const successMessage = ref('');
const errorMessage = ref('');

const form = ref({
  title: '',
  region: 'Central',
  schemeType: 'SME Loan',
  description: '',
  keyTakeaways: ''
});

const showDeleteModal = ref(false);
const visitToDelete = ref(null);

const countRegion = (reg) => {
  return visits.value.filter(v => v.region === reg).length;
};

const getTakeawaysList = (visit) => {
  if (Array.isArray(visit.takeaways)) return visit.takeaways;
  if (!visit.keyTakeaways) return [];
  return visit.keyTakeaways
    .split('\n')
    .map(line => line.replace(/^[-•*]\s*/, '').trim())
    .filter(Boolean);
};

// Filtering
const filteredVisits = computed(() => {
  return visits.value.filter(visit => {
    const matchesRegion =
      selectedRegion.value === 'All' ||
      visit.region === selectedRegion.value;

    if (!matchesRegion) return false;

    if (!searchQuery.value.trim()) return true;
    const q = searchQuery.value.toLowerCase().trim();
    return (
      (visit.title || '').toLowerCase().includes(q) ||
      (visit.region || '').toLowerCase().includes(q) ||
      (visit.schemeType || '').toLowerCase().includes(q) ||
      (visit.description || '').toLowerCase().includes(q)
    );
  });
});

// Fetch visits
const fetchVisits = async () => {
  loading.value = true;
  try {
    const response = await axios.get('/api/v1/field-visits');
    if (response.data && Array.isArray(response.data.visits)) {
      visits.value = response.data.visits;
    } else if (Array.isArray(response.data)) {
      visits.value = response.data;
    } else {
      visits.value = [];
    }
  } catch (error) {
    console.error('Failed to load field visits:', error);
    errorMessage.value = 'Failed to load field visits.';
  } finally {
    loading.value = false;
  }
};

// Create visit
const handleSave = async () => {
  saving.value = true;
  errorMessage.value = '';
  successMessage.value = '';

  try {
    await axios.post('/api/v1/field-visits', form.value);
    successMessage.value = 'Field visit record saved successfully!';
    form.value = {
      title: '',
      region: 'Central',
      schemeType: 'SME Loan',
      description: '',
      keyTakeaways: ''
    };
    await fetchVisits();
  } catch (error) {
    console.error('Failed to save field visit:', error);
    errorMessage.value = 'Failed to save field visit.';
  } finally {
    saving.value = false;
  }
};

// Delete Handlers
const openDeleteModal = (visit) => {
  visitToDelete.value = visit;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  if (isDeleting.value) return;
  showDeleteModal.value = false;
  visitToDelete.value = null;
};

const confirmDelete = async () => {
  if (!visitToDelete.value) return;
  isDeleting.value = true;
  errorMessage.value = '';

  try {
    await axios.delete(`/api/v1/field-visits/${visitToDelete.value.id}`);
    visits.value = visits.value.filter(v => v.id !== visitToDelete.value.id);
    successMessage.value = 'Field visit record deleted successfully.';
    showDeleteModal.value = false;
    visitToDelete.value = null;
  } catch (error) {
    console.error('Failed to delete field visit:', error);
    errorMessage.value = 'Failed to delete field visit.';
  } finally {
    isDeleting.value = false;
  }
};

onMounted(fetchVisits);
</script>
