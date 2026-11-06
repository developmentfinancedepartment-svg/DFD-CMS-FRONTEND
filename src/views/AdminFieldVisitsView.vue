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
            Record on-ground monitoring missions, upload photo albums, and track district progress.
          </p>
        </div>

        <!-- Metric KPI Cards (District-based) -->
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

          <!-- Kurunegala -->
          <div class="flex items-center gap-3 px-4 py-3 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
            <div class="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
              <i class="fas fa-map-marker-alt text-sm"></i>
            </div>
            <div>
              <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Kurunegala</p>
              <span class="text-lg font-extrabold text-slate-900">{{ countDistrict('Kurunegala') }}</span>
            </div>
          </div>

          <!-- Galle -->
          <div class="flex items-center gap-3 px-4 py-3 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
            <div class="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
              <i class="fas fa-map-marker-alt text-sm"></i>
            </div>
            <div>
              <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Galle</p>
              <span class="text-lg font-extrabold text-slate-900">{{ countDistrict('Galle') }}</span>
            </div>
          </div>

          <!-- Batticaloa & Kandy -->
          <div class="flex items-center gap-3 px-4 py-3 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
            <div class="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
              <i class="fas fa-map-marker-alt text-sm"></i>
            </div>
            <div>
              <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Batticaloa / Kandy</p>
              <span class="text-lg font-extrabold text-slate-900">{{ countDistrict('Batticaloa') + countDistrict('Kandy') }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Alerts -->
      <div v-if="showSuccessAlert && successMessage" class="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center justify-between shadow-sm animate-in fade-in duration-200">
        <div class="flex items-center gap-2.5">
          <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{{ successMessage }}</span>
        </div>
        <button @click="dismissSuccessAlert" class="text-emerald-500 hover:text-emerald-700" title="Dismiss">
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
        
        <!-- 2. CREATE FORM (Left: 5 cols) - Stationary Sticky -->
        <div class="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 p-6 lg:p-7 shadow-sm sticky top-24">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-[#008795]">
              <i class="fas fa-plus-circle text-base"></i>
            </div>
            <div>
              <h2 class="text-lg font-bold text-slate-800">Add Field Visit</h2>
              <p class="text-xs text-slate-400">Record on-ground mission &amp; attach photo album</p>
            </div>
          </div>

          <form @submit.prevent="handleSave" class="space-y-4">
            <!-- Title -->
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Visit Title <span class="text-rose-500">*</span>
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <i class="fas fa-heading text-xs"></i>
                </div>
                <input
                  v-model="form.title"
                  type="text"
                  required
                  placeholder="e.g. Dairy Farming Cooperative Inspection"
                  class="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800"
                />
              </div>
            </div>

            <!-- District & Scheme Type Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- District Dropdown -->
              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  District <span class="text-rose-500">*</span>
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#008795]">
                    <i class="fas fa-map-marker-alt text-xs"></i>
                  </div>
                  <select
                    v-model="form.district"
                    required
                    class="w-full appearance-none pl-10 pr-9 py-2.5 text-sm font-semibold bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] focus:bg-white focus:border-[#008795] focus:ring-2 focus:ring-[#008795]/20 outline-none transition text-slate-800 cursor-pointer"
                  >
                    <option value="" disabled>Select District</option>
                    <option v-for="d in districtOptions" :key="d" :value="d">{{ d }}</option>
                  </select>
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>

              <!-- Scheme Type Input -->
              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Scheme Type <span class="text-rose-500">*</span>
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <i class="fas fa-tags text-xs"></i>
                  </div>
                  <input
                    v-model="form.schemeType"
                    type="text"
                    required
                    placeholder="e.g. SME Loan"
                    class="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800"
                  />
                </div>
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

            <!-- Multiple Image Upload Dropzone (Replaces Key Takeaways) -->
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Photo Album (Carousel Modal)
                </label>
                <span v-if="form.images.length > 0" class="text-xs font-bold text-[#008795]">
                  {{ form.images.length }} photo{{ form.images.length === 1 ? '' : 's' }} attached
                </span>
              </div>

              <!-- Dropzone Box -->
              <div
                @dragover.prevent="isDragging = true"
                @dragleave.prevent="isDragging = false"
                @drop.prevent="handleFileDrop"
                :class="[
                  'relative border-2 border-dashed rounded-2xl p-4 text-center transition-all cursor-pointer group',
                  isDragging ? 'border-[#008795] bg-cyan-50/50' : 'border-slate-200 hover:border-[#008795] bg-slate-50/50 hover:bg-cyan-50/30'
                ]"
                @click="$refs.fileInput.click()"
              >
                <input
                  ref="fileInput"
                  type="file"
                  multiple
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  @change="handleFileChange"
                  class="hidden"
                />

                <div class="space-y-1.5 py-1">
                  <div class="w-10 h-10 mx-auto rounded-xl bg-cyan-50 flex items-center justify-center text-[#008795] group-hover:scale-110 transition-transform">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <span class="text-xs font-bold text-[#008795]">Click to upload photos</span>
                    <span class="text-xs text-slate-500"> or drag &amp; drop</span>
                  </div>
                  <p class="text-[11px] text-slate-400">Attach multiple photos for the 1/2 carousel modal on public portal</p>
                </div>
              </div>

              <!-- Thumbnails Preview Strip -->
              <div v-if="form.images.length > 0" class="mt-3 grid grid-cols-4 gap-2">
                <div
                  v-for="(img, idx) in form.images"
                  :key="idx"
                  class="relative h-18 rounded-xl overflow-hidden border-2 group transition-all"
                  :class="idx === formCoverIndex ? 'border-[#008795] ring-2 ring-[#008795]/20' : 'border-slate-200'"
                >
                  <img :src="resolveImageUrl(img, form.title)" class="w-full h-full object-cover" alt="Uploaded photo" />

                  <!-- Cover Badge -->
                  <span
                    v-if="idx === formCoverIndex"
                    class="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-[#008795] text-white text-[9px] font-extrabold uppercase shadow-sm"
                  >
                    Cover
                  </span>

                  <!-- Overlay Buttons -->
                  <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                    <button
                      v-if="idx !== formCoverIndex"
                      type="button"
                      @click.stop="formCoverIndex = idx"
                      class="p-1 rounded bg-white text-[#008795] hover:bg-cyan-50 text-[10px] font-bold shadow-sm"
                      title="Set as Primary Cover"
                    >
                      <i class="fas fa-star text-[9px]"></i>
                    </button>
                    <button
                      type="button"
                      @click.stop="removeFormImage(idx)"
                      class="p-1 rounded bg-rose-600 text-white hover:bg-rose-700 shadow-sm"
                      title="Remove image"
                    >
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                </div>
              </div>
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
        <div class="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-6 lg:p-7 shadow-sm flex flex-col">
          
          <!-- Filter & Search Bar (Static at top) -->
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-100 shrink-0">
            <!-- Search -->
            <div class="relative flex-1 max-w-xs">
              <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </span>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search visits by title, district..."
                class="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-[#008795] outline-none transition text-slate-800"
              />
            </div>

            <!-- District Filter Pills -->
            <div class="flex flex-wrap items-center gap-1.5">
              <button
                v-for="dist in filterDistricts"
                :key="dist"
                @click="selectedDistrict = dist"
                :class="[
                  'px-3 py-1 rounded-xl text-xs font-bold transition',
                  selectedDistrict === dist
                    ? 'bg-[#008795] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                ]"
              >
                {{ dist }}
              </button>
            </div>
          </div>

          <!-- Scrollable Gallery Content -->
          <div class="max-h-[660px] overflow-y-auto pr-2 pt-4 custom-scrollbar">
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
              <p class="text-sm font-bold text-slate-700">No field visits found</p>
              <p class="text-xs text-slate-400 mt-1">Add inspections using the form on the left or try another filter.</p>
            </div>

            <!-- Cards Grid: Public UI Matching Cards -->
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-2">
              <div
                v-for="visit in filteredVisits"
                :key="visit.id"
                class="group bg-slate-50/70 hover:bg-white rounded-2xl border border-slate-200/80 hover:border-cyan-500/50 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <!-- Cover Image Box (Overlaid with District, Scheme & Action buttons) -->
                <div class="relative h-44 bg-slate-200 overflow-hidden cursor-pointer" @click="openCarouselModal(visit)">
                  <img
                    :src="resolveImageUrl(getCoverImage(visit), visit.title)"
                    :alt="visit.title"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    @error="handleImgError($event, visit.title)"
                  />

                  <!-- Floating Badges (Left) -->
                  <div class="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10 pointer-events-none">
                    <!-- District Badge -->
                    <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#008795] text-white shadow-sm backdrop-blur-md">
                      <svg class="w-3 h-3 text-cyan-200" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                      </svg>
                      <span>{{ visit.district || visit.region || 'District' }}</span>
                    </span>

                    <!-- Scheme Badge -->
                    <span class="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-slate-900/80 text-white shadow-sm backdrop-blur-md">
                      {{ visit.schemeType || 'Scheme' }}
                    </span>
                  </div>

                  <!-- Action buttons: Edit & Delete (Right) -->
                  <div class="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                    <button
                      type="button"
                      @click.stop="openEditModal(visit)"
                      class="w-8 h-8 rounded-lg bg-white/95 hover:bg-[#008795] text-slate-600 hover:text-white transition-colors flex items-center justify-center shadow-sm cursor-pointer"
                      title="Edit Field Visit"
                    >
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>

                    <button
                      type="button"
                      @click.stop="openDeleteModal(visit)"
                      class="w-8 h-8 rounded-lg bg-white/95 hover:bg-rose-600 text-slate-600 hover:text-white transition-colors flex items-center justify-center shadow-sm cursor-pointer"
                      title="Delete Field Visit"
                    >
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Body Info -->
                <div class="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 class="text-sm font-extrabold text-slate-800 line-clamp-1 group-hover:text-[#008795] transition-colors" :title="visit.title">
                      {{ visit.title }}
                    </h3>
                    <p class="text-xs text-slate-500 line-clamp-2 leading-relaxed mt-1.5">
                      {{ visit.description || visit.overview }}
                    </p>
                  </div>

                  <!-- Footer Row (Photo Count & Carousel Button) -->
                  <div class="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-xs">
                    <div class="flex items-center gap-1.5 text-slate-500 font-bold">
                      <i class="fas fa-images text-[#008795] text-[11px]"></i>
                      <span>{{ getPhotoCount(visit) }} Photos</span>
                    </div>

                    <button
                      type="button"
                      @click="openCarouselModal(visit)"
                      class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-50 hover:bg-[#008795] text-[#008795] hover:text-white text-[11px] font-bold transition shadow-2xs"
                    >
                      <span>Preview Album</span>
                      <i class="fas fa-arrow-right text-[9px]"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      <!-- 4. EDIT FIELD VISIT MODAL -->
      <div
        v-if="isEditModalOpen"
        @click.self="!isUpdating && closeEditModal()"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto"
      >
        <div class="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-slate-100 my-8 transform transition-all animate-in fade-in zoom-in-95 duration-150">
          <!-- Header -->
          <div class="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-[#008795]">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-bold text-slate-800">Edit Field Visit</h3>
                <p class="text-xs text-slate-400">Update district, scheme, description and photo album</p>
              </div>
            </div>
            <button
              type="button"
              :disabled="isUpdating"
              @click="closeEditModal"
              class="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors disabled:opacity-50"
              title="Close"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Error Alert -->
          <div v-if="editErrorMessage" class="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center justify-between shadow-xs">
            <span>{{ editErrorMessage }}</span>
            <button type="button" @click="editErrorMessage = ''" class="text-rose-500 hover:text-rose-700">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <form @submit.prevent="handleUpdate" class="space-y-4">
            <!-- Title -->
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Visit Title <span class="text-rose-500">*</span>
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <i class="fas fa-heading text-xs"></i>
                </div>
                <input
                  v-model="editForm.title"
                  type="text"
                  required
                  class="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800"
                />
              </div>
            </div>

            <!-- District & Scheme Type -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  District <span class="text-rose-500">*</span>
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#008795]">
                    <i class="fas fa-map-marker-alt text-xs"></i>
                  </div>
                  <select
                    v-model="editForm.district"
                    required
                    class="w-full appearance-none pl-10 pr-9 py-2.5 text-sm font-semibold bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] focus:bg-white focus:border-[#008795] focus:ring-2 focus:ring-[#008795]/20 outline-none transition text-slate-800 cursor-pointer"
                  >
                    <option v-for="d in districtOptions" :key="d" :value="d">{{ d }}</option>
                  </select>
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Scheme Type <span class="text-rose-500">*</span>
                </label>
                <input
                  v-model="editForm.schemeType"
                  type="text"
                  required
                  class="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800"
                />
              </div>
            </div>

            <!-- Description -->
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Description / Overview <span class="text-rose-500">*</span>
              </label>
              <textarea
                v-model="editForm.description"
                rows="3"
                required
                class="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800"
              ></textarea>
            </div>

            <!-- Photos Manager inside Edit Modal -->
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Photo Album
                </label>
                <label class="text-xs font-bold text-[#008795] hover:underline cursor-pointer">
                  + Add More Photos
                  <input
                    type="file"
                    multiple
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    @change="handleEditFileChange"
                    class="hidden"
                  />
                </label>
              </div>

              <div v-if="editForm.images.length > 0" class="grid grid-cols-4 gap-2">
                <div
                  v-for="(img, idx) in editForm.images"
                  :key="idx"
                  class="relative h-18 rounded-xl overflow-hidden border-2 group transition-all"
                  :class="idx === editCoverIndex ? 'border-[#008795] ring-2 ring-[#008795]/20' : 'border-slate-200'"
                >
                  <img :src="resolveImageUrl(img, editForm.title)" class="w-full h-full object-cover" alt="Photo" />
                  <span
                    v-if="idx === editCoverIndex"
                    class="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-[#008795] text-white text-[9px] font-extrabold uppercase shadow-sm"
                  >
                    Cover
                  </span>
                  <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                    <button
                      v-if="idx !== editCoverIndex"
                      type="button"
                      @click.stop="editCoverIndex = idx"
                      class="p-1 rounded bg-white text-[#008795] hover:bg-cyan-50 text-[10px] font-bold"
                      title="Set as Cover"
                    >
                      <i class="fas fa-star text-[9px]"></i>
                    </button>
                    <button
                      type="button"
                      @click.stop="removeEditImage(idx)"
                      class="p-1 rounded bg-rose-600 text-white hover:bg-rose-700"
                      title="Remove"
                    >
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                </div>
              </div>
              <p v-else class="text-xs text-slate-400 italic">No photos attached yet.</p>
            </div>

            <!-- Footer Buttons -->
            <div class="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                :disabled="isUpdating"
                @click="closeEditModal"
                class="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="isUpdating"
                class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#008795] to-[#006071] hover:from-[#009fb0] hover:to-[#007c91] text-white text-sm font-bold shadow-md shadow-cyan-900/15 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg v-if="isUpdating" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                <i v-else class="fas fa-check"></i>
                <span>{{ isUpdating ? 'Saving Changes...' : 'Save Changes' }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- 5. 1/2 CAROUSEL LIGHTBOX MODAL PREVIEW (Matching Public Portal) -->
      <div
        v-if="carouselVisit"
        @click.self="closeCarouselModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto"
      >
        <div class="relative w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 my-8 transform transition-all animate-in fade-in zoom-in-95 duration-200 flex flex-col">
          <!-- Modal Top Badges & Close Button -->
          <div class="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div class="flex items-center gap-2">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#008795] text-white shadow-sm">
                <svg class="w-3.5 h-3.5 text-cyan-200" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>
                <span>{{ carouselVisit.district || carouselVisit.region || 'District' }}</span>
              </span>
              <span class="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                {{ carouselVisit.schemeType || 'Scheme' }}
              </span>
            </div>

            <button
              type="button"
              @click="closeCarouselModal"
              class="w-8 h-8 rounded-full bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition flex items-center justify-center"
              title="Close (Esc)"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <!-- Title & Description Header -->
          <div class="mb-4">
            <h3 class="text-lg font-extrabold text-slate-900 leading-snug">
              {{ carouselVisit.title }}
            </h3>
            <p class="text-xs text-slate-500 mt-1 leading-relaxed">
              {{ carouselVisit.description || carouselVisit.overview }}
            </p>
          </div>

          <!-- Main Carousel Image Viewport -->
          <div class="relative w-full h-80 rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center">
            <img
              :src="resolveImageUrl(currentCarouselImage, carouselVisit.title)"
              :alt="carouselVisit.title"
              class="w-full h-full object-contain"
              @error="handleImgError($event, carouselVisit.title)"
            />

            <!-- Prev Navigation Arrow -->
            <button
              v-if="carouselImagesList.length > 1"
              type="button"
              @click="prevCarouselImage"
              class="absolute left-3 p-2.5 rounded-full bg-black/60 hover:bg-[#008795] text-white backdrop-blur-md transition-all shadow-md"
              title="Previous Photo (Left Arrow)"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" /></svg>
            </button>

            <!-- Next Navigation Arrow -->
            <button
              v-if="carouselImagesList.length > 1"
              type="button"
              @click="nextCarouselImage"
              class="absolute right-3 p-2.5 rounded-full bg-black/60 hover:bg-[#008795] text-white backdrop-blur-md transition-all shadow-md"
              title="Next Photo (Right Arrow)"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" /></svg>
            </button>

            <!-- 1/2 Slide Indicator Counter -->
            <div v-if="carouselImagesList.length > 1" class="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-extrabold tracking-wider shadow-sm">
              {{ activeCarouselIndex + 1 }} / {{ carouselImagesList.length }}
            </div>
          </div>

          <!-- Bottom Thumbnail Gallery Strip -->
          <div v-if="carouselImagesList.length > 1" class="mt-3.5 flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
            <button
              v-for="(img, idx) in carouselImagesList"
              :key="idx"
              type="button"
              @click="activeCarouselIndex = idx"
              class="relative w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer"
              :class="activeCarouselIndex === idx ? 'border-[#008795] ring-2 ring-[#008795]/30' : 'border-slate-200 opacity-60 hover:opacity-100'"
            >
              <img :src="resolveImageUrl(img, carouselVisit.title)" class="w-full h-full object-cover" alt="Thumb" />
            </button>
          </div>
        </div>
      </div>

      <!-- 6. DELETE CONFIRMATION MODAL -->
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
              Are you sure you want to permanently delete this field visit inspection and its associated photo album?
            </p>

            <div v-if="visitToDelete" class="mt-4 w-full p-3.5 rounded-2xl bg-[#001f24] border border-cyan-500/20 flex items-center gap-3 text-left">
              <img
                :src="resolveImageUrl(getCoverImage(visitToDelete), visitToDelete.title)"
                class="w-12 h-12 rounded-xl object-cover border border-cyan-500/30 shrink-0"
              />
              <div class="min-w-0 flex-1">
                <p class="text-sm font-bold text-white truncate">{{ visitToDelete.title }}</p>
                <p class="text-xs text-cyan-300">{{ visitToDelete.district || visitToDelete.region }} • {{ visitToDelete.schemeType }}</p>
              </div>
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
import { ref, computed, onMounted, onUnmounted } from 'vue';
import axios from '../axiosInstance';

// District options supporting national districts
const districtOptions = [
  'Kurunegala',
  'Galle',
  'Batticaloa',
  'Colombo',
  'Kandy',
  'Anuradhapura',
  'Matara',
  'Gampaha',
  'Kalutara',
  'Matale',
  'Nuwara Eliya',
  'Jaffna',
  'Kilinochchi',
  'Mannar',
  'Vavuniya',
  'Mullaitivu',
  'Ampara',
  'Trincomalee',
  'Polonnaruwa',
  'Badulla',
  'Monaragala',
  'Ratnapura',
  'Kegalle',
  'Puttalam',
  'Hambantota'
];

// Top filter districts
const filterDistricts = ['All', 'Kurunegala', 'Galle', 'Batticaloa', 'Colombo', 'Kandy'];

// State
const visits = ref([]);
const loading = ref(false);
const saving = ref(false);
const isDeleting = ref(false);
const isDragging = ref(false);

const selectedDistrict = ref('All');
const searchQuery = ref('');

const successMessage = ref('');
const showSuccessAlert = ref(false);
let successTimeout = null;

const showSuccess = (message) => {
  if (successTimeout) {
    clearTimeout(successTimeout);
    successTimeout = null;
  }
  successMessage.value = message;
  showSuccessAlert.value = true;
  successTimeout = setTimeout(() => {
    showSuccessAlert.value = false;
    successMessage.value = '';
    successTimeout = null;
  }, 3500);
};

const dismissSuccessAlert = () => {
  if (successTimeout) {
    clearTimeout(successTimeout);
    successTimeout = null;
  }
  showSuccessAlert.value = false;
  successMessage.value = '';
};

onUnmounted(() => {
  if (successTimeout) {
    clearTimeout(successTimeout);
    successTimeout = null;
  }
  window.removeEventListener('keydown', handleGlobalKeydown);
});

const errorMessage = ref('');

// Add Form State
const form = ref({
  title: '',
  district: 'Kurunegala',
  region: 'Kurunegala',
  schemeType: 'SME Loan',
  description: '',
  coverImage: '',
  images: []
});
const formCoverIndex = ref(0);

// Edit Modal State
const isEditModalOpen = ref(false);
const isUpdating = ref(false);
const editErrorMessage = ref('');
const editForm = ref({
  id: null,
  title: '',
  district: 'Kurunegala',
  region: 'Kurunegala',
  schemeType: 'SME Loan',
  description: '',
  coverImage: '',
  images: []
});
const editCoverIndex = ref(0);

// Delete Modal State
const showDeleteModal = ref(false);
const visitToDelete = ref(null);

// 1/2 Carousel Lightbox Modal State
const carouselVisit = ref(null);
const activeCarouselIndex = ref(0);

const countDistrict = (districtName) => {
  return visits.value.filter(v => {
    const d = v.district || v.region || '';
    return d.toLowerCase() === districtName.toLowerCase();
  }).length;
};

// Safe image normalization
const getVisitImages = (visit) => {
  if (!visit) return [];
  if (Array.isArray(visit.images) && visit.images.length > 0) return visit.images;
  if (typeof visit.images === 'string' && visit.images.trim()) {
    try {
      const parsed = JSON.parse(visit.images);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch (e) {
      const split = visit.images.split(',').map(s => s.trim()).filter(Boolean);
      if (split.length > 0) return split;
    }
  }
  if (visit.coverImage) return [visit.coverImage];
  if (visit.imageUrl) return [visit.imageUrl];
  return [];
};

const getCoverImage = (visit) => {
  if (!visit) return '';
  if (visit.coverImage) return visit.coverImage;
  const imgs = getVisitImages(visit);
  if (imgs.length > 0) return imgs[0];
  if (visit.imageUrl) return visit.imageUrl;
  return '';
};

const getPhotoCount = (visit) => {
  return getVisitImages(visit).length;
};

// High quality fallback SVG
const getPlaceholderSvg = (title = 'Field Visit') => {
  const safeTitle = (title || 'Field Inspection').replace(/[<>&"']/g, '');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#00353e"/>
        <stop offset="55%" stop-color="#00606e"/>
        <stop offset="100%" stop-color="#008795"/>
      </linearGradient>
      <linearGradient id="overlay" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.08"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0.4"/>
      </linearGradient>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" stroke-width="0.75" stroke-opacity="0.07"/>
      </pattern>
    </defs>
    <rect width="600" height="400" fill="url(#bgGrad)"/>
    <rect width="600" height="400" fill="url(#grid)"/>
    <rect width="600" height="400" fill="url(#overlay)"/>
    <circle cx="300" cy="155" r="95" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-opacity="0.12"/>
    <circle cx="300" cy="155" r="65" fill="none" stroke="#2dd4bf" stroke-width="1.5" stroke-opacity="0.25"/>
    <g transform="translate(280, 135)" fill="#ffffff" opacity="0.92">
      <path d="M38 6H31.8L28.6 2.8C27.8 2 26.7 1.5 25.5 1.5H12.5C11.3 1.5 10.2 2 9.4 2.8L6.2 6H0C-1.1 6 -2 6.9 -2 8V34C-2 35.1 -1.1 36 0 36H38C39.1 36 40 35.1 40 34V8C40 6.9 39.1 6 38 6ZM19 30C13.5 30 9 25.5 9 20C9 14.5 13.5 10 19 10C24.5 10 29 14.5 29 20C29 25.5 24.5 30 19 30ZM19 13C15.1 13 12 16.1 12 20C12 23.9 15.1 27 19 27C22.9 27 26 23.9 26 20C26 16.1 22.9 13 19 13Z"/>
    </g>
    <g text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif">
      <rect x="170" y="222" width="260" height="22" rx="11" fill="#000000" fill-opacity="0.32"/>
      <text x="300" y="237" fill="#5eead4" font-size="10.5" font-weight="700" letter-spacing="1.5">DEVELOPMENT FINANCE DEPARTMENT</text>
      <text x="300" y="274" fill="#ffffff" font-size="17" font-weight="700" letter-spacing="0.3">${safeTitle.slice(0, 38)}</text>
      <text x="300" y="297" fill="#ffffff" fill-opacity="0.75" font-size="11.5" letter-spacing="0.5">Field Inspection &amp; Progress Monitoring</text>
    </g>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const resolveImageUrl = (path, title = 'Inspection') => {
  if (!path) return getPlaceholderSvg(title);
  if (typeof path !== 'string') return getPlaceholderSvg(title);
  if (path.startsWith('data:') || path.startsWith('blob:')) return path;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;

  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  if (cleanPath.startsWith('uploads/')) {
    const apiBase = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8096').replace(/\/$/, '');
    return `${apiBase}/${cleanPath}`;
  }

  const baseUrl = import.meta.env.BASE_URL || '/';
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  return `${cleanBase}${cleanPath}`;
};

const handleImgError = (event, title = 'Inspection') => {
  if (event && event.target) {
    event.target.onerror = null;
    event.target.src = getPlaceholderSvg(title);
  }
};

// File Upload Handlers (Reading multiple files into Data URLs)
const handleFileChange = (e) => {
  const files = Array.from(e.target.files || []);
  processFiles(files, form.value);
};

const handleFileDrop = (e) => {
  isDragging.value = false;
  const files = Array.from(e.dataTransfer.files || []).filter(f => f.type.startsWith('image/'));
  processFiles(files, form.value);
};

const processFiles = (files, targetForm) => {
  if (!files.length) return;
  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = (event) => {
      targetForm.images.push(event.target.result);
      if (!targetForm.coverImage && targetForm.images.length === 1) {
        targetForm.coverImage = event.target.result;
      }
    };
    reader.readAsDataURL(file);
  });
};

const removeFormImage = (index) => {
  form.value.images.splice(index, 1);
  if (formCoverIndex.value >= form.value.images.length) {
    formCoverIndex.value = Math.max(0, form.value.images.length - 1);
  }
};

const handleEditFileChange = (e) => {
  const files = Array.from(e.target.files || []);
  processFiles(files, editForm.value);
};

const removeEditImage = (index) => {
  editForm.value.images.splice(index, 1);
  if (editCoverIndex.value >= editForm.value.images.length) {
    editCoverIndex.value = Math.max(0, editForm.value.images.length - 1);
  }
};

// Filtering
const filteredVisits = computed(() => {
  return visits.value.filter(visit => {
    const vDistrict = (visit.district || visit.region || '').toLowerCase();
    const matchesDistrict =
      selectedDistrict.value === 'All' ||
      vDistrict === selectedDistrict.value.toLowerCase();

    if (!matchesDistrict) return false;

    if (!searchQuery.value.trim()) return true;
    const q = searchQuery.value.toLowerCase().trim();
    return (
      (visit.title || '').toLowerCase().includes(q) ||
      (visit.district || '').toLowerCase().includes(q) ||
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
    let loaded = [];
    if (response.data && Array.isArray(response.data.visits)) {
      loaded = response.data.visits;
    } else if (Array.isArray(response.data)) {
      loaded = response.data;
    }

    // Default sample fallback mapping if visits empty
    if (!loaded.length) {
      loaded = [
        {
          id: 1,
          title: 'Dairy Farming Cooperative Inspection',
          district: 'Kandy',
          region: 'Kandy',
          schemeType: 'SME Loan',
          description: 'Site visit evaluating structural improvements made to dairy storage facilities using recently disbursed SME loan funds.',
          coverImage: 'gal/11.JPG',
          images: ['gal/11.JPG', 'gal/12.JPG', 'gal/13.JPG']
        },
        {
          id: 2,
          title: 'Women Entrepreneurs Handloom Project',
          district: 'Batticaloa',
          region: 'Batticaloa',
          schemeType: 'Microfinance',
          description: 'Monitoring the utilization of micro-credit grants by a women\'s cooperative in Batticaloa specializing in traditional handloom exports.',
          coverImage: 'gal/14.JPG',
          images: ['gal/14.JPG', 'gal/15.JPG', 'gal/16.jpg']
        },
        {
          id: 3,
          title: 'Fisheries Equipment Upgrade Review',
          district: 'Galle',
          region: 'Galle',
          schemeType: 'Commercial Agriculture',
          description: 'Evaluating a commercial agriculture loan utilized by a fishing fleet in Galle to upgrade navigation and deep-sea fishing equipment.',
          coverImage: 'gal/17.jpg',
          images: ['gal/17.jpg', 'gal/18.JPG', 'gal/19.JPG']
        },
        {
          id: 4,
          title: 'Organic Fertilizer Plant Assessment',
          district: 'Kurunegala',
          region: 'Kurunegala',
          schemeType: 'Green Finance',
          description: 'Routine progress check at a new organic fertilizer manufacturing plant in Kurunegala supported under the national Green Finance initiative.',
          coverImage: 'gal/3.jpg',
          images: ['gal/3.jpg', 'gal/4.jpg', 'gal/5.jpg']
        }
      ];
    }

    visits.value = loaded;
  } catch (error) {
    console.error('Failed to load field visits:', error);
    errorMessage.value = 'Failed to load field visits.';
  } finally {
    loading.value = false;
  }
};

// Create visit
const handleSave = async () => {
  if (!form.value.title.trim()) {
    errorMessage.value = 'Please provide a visit title.';
    return;
  }
  if (!form.value.district) {
    errorMessage.value = 'Please select a district.';
    return;
  }

  saving.value = true;
  errorMessage.value = '';
  dismissSuccessAlert();

  try {
    const chosenCover = form.value.images[formCoverIndex.value] || form.value.images[0] || '';
    const payload = {
      title: form.value.title.trim(),
      district: form.value.district,
      region: form.value.district, // backward compatibility
      schemeType: form.value.schemeType.trim(),
      description: form.value.description.trim(),
      coverImage: chosenCover,
      images: JSON.stringify(form.value.images)
    };

    await axios.post('/api/v1/field-visits', payload);
    showSuccess('Field visit record saved successfully!');
    form.value = {
      title: '',
      district: 'Kurunegala',
      region: 'Kurunegala',
      schemeType: 'SME Loan',
      description: '',
      coverImage: '',
      images: []
    };
    formCoverIndex.value = 0;
    await fetchVisits();
  } catch (error) {
    console.error('Failed to save field visit:', error);
    errorMessage.value = error.response?.data?.message || 'Failed to save field visit.';
  } finally {
    saving.value = false;
  }
};

// Edit Handlers
const openEditModal = (visit) => {
  editErrorMessage.value = '';
  const currentImages = [...getVisitImages(visit)];
  editForm.value = {
    id: visit.id,
    title: visit.title || '',
    district: visit.district || visit.region || 'Kurunegala',
    region: visit.district || visit.region || 'Kurunegala',
    schemeType: visit.schemeType || '',
    description: visit.description || visit.overview || '',
    coverImage: visit.coverImage || '',
    images: currentImages
  };
  editCoverIndex.value = 0;
  isEditModalOpen.value = true;
};

const closeEditModal = () => {
  if (isUpdating.value) return;
  isEditModalOpen.value = false;
  editErrorMessage.value = '';
};

const handleUpdate = async () => {
  if (!editForm.value.title.trim()) {
    editErrorMessage.value = 'Please provide a visit title.';
    return;
  }

  isUpdating.value = true;
  editErrorMessage.value = '';

  try {
    const chosenCover = editForm.value.images[editCoverIndex.value] || editForm.value.images[0] || '';
    const payload = {
      title: editForm.value.title.trim(),
      district: editForm.value.district,
      region: editForm.value.district,
      schemeType: editForm.value.schemeType.trim(),
      description: editForm.value.description.trim(),
      coverImage: chosenCover,
      images: JSON.stringify(editForm.value.images)
    };

    await axios.put(`/api/v1/field-visits/${editForm.value.id}`, payload);
    isEditModalOpen.value = false;
    showSuccess('Field visit record updated successfully!');
    closeEditModal();
    await fetchVisits();
  } catch (error) {
    console.error('Failed to update field visit:', error);
    editErrorMessage.value = error.response?.data?.message || 'Failed to update field visit.';
  } finally {
    isUpdating.value = false;
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
    showSuccess('Field visit record deleted successfully.');
    showDeleteModal.value = false;
    visitToDelete.value = null;
    await fetchVisits();
  } catch (error) {
    console.error('Failed to delete field visit:', error);
    errorMessage.value = 'Failed to delete field visit.';
  } finally {
    isDeleting.value = false;
  }
};

// 1/2 Carousel Lightbox Handlers
const carouselImagesList = computed(() => {
  if (!carouselVisit.value) return [];
  const list = getVisitImages(carouselVisit.value);
  return list.length ? list : ['gal/11.JPG'];
});

const currentCarouselImage = computed(() => {
  if (!carouselImagesList.value.length) return '';
  return carouselImagesList.value[activeCarouselIndex.value] || carouselImagesList.value[0];
});

const openCarouselModal = (visit) => {
  carouselVisit.value = visit;
  activeCarouselIndex.value = 0;
};

const closeCarouselModal = () => {
  carouselVisit.value = null;
  activeCarouselIndex.value = 0;
};

const nextCarouselImage = () => {
  if (carouselImagesList.value.length > 1) {
    activeCarouselIndex.value = (activeCarouselIndex.value + 1) % carouselImagesList.value.length;
  }
};

const prevCarouselImage = () => {
  if (carouselImagesList.value.length > 1) {
    activeCarouselIndex.value =
      (activeCarouselIndex.value - 1 + carouselImagesList.value.length) % carouselImagesList.value.length;
  }
};

const handleGlobalKeydown = (e) => {
  if (carouselVisit.value) {
    if (e.key === 'ArrowRight') nextCarouselImage();
    if (e.key === 'ArrowLeft') prevCarouselImage();
    if (e.key === 'Escape') closeCarouselModal();
  } else if (isEditModalOpen.value && e.key === 'Escape') {
    closeEditModal();
  } else if (showDeleteModal.value && e.key === 'Escape') {
    closeDeleteModal();
  }
};

onMounted(() => {
  fetchVisits();
  window.addEventListener('keydown', handleGlobalKeydown);
});
</script>

<style scoped>
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
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #94a3b8;
}
</style>
