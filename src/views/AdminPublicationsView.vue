<template>
  <div class="p-6 lg:p-8 bg-slate-50/60 min-h-screen">
    <div class="max-w-7xl mx-auto space-y-6">
      
      <!-- 1. TOP STATISTICS HEADER -->
      <div class="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 pb-2">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200/80 text-cyan-800 text-xs font-bold uppercase tracking-wider mb-2">
            <span class="h-1.5 w-1.5 rounded-full bg-[#008795]"></span>
            Action Plans &amp; Strategic Publications
          </div>
          <h1 class="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Manage Action Plans
          </h1>
          <p class="text-slate-500 mt-1 text-sm">
            Deploy institutional action plans, policy frameworks, and official reports to the public database.
          </p>
        </div>

        <!-- 3 Compact KPI Metric Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full xl:w-auto">
          <!-- KPI 1: Total Documents -->
          <div class="flex items-center gap-3.5 px-4 py-3 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow transition-shadow">
            <div class="w-11 h-11 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-[#008795] shrink-0">
              <i class="fas fa-file-contract text-base"></i>
            </div>
            <div>
              <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Documents</p>
              <div class="flex items-baseline gap-1.5 mt-0.5">
                <span class="text-xl font-extrabold text-slate-900">{{ publications.length }}</span>
                <span class="text-[11px] font-bold text-emerald-600">({{ activeCount }} Active)</span>
              </div>
            </div>
          </div>

          <!-- KPI 2: Active Years Coverage -->
          <div class="flex items-center gap-3.5 px-4 py-3 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow transition-shadow">
            <div class="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <i class="fas fa-calendar-alt text-base"></i>
            </div>
            <div>
              <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Years Coverage</p>
              <div class="flex items-baseline gap-1.5 mt-0.5">
                <span class="text-xl font-extrabold text-slate-900">{{ yearsCoverage }}</span>
              </div>
            </div>
          </div>

          <!-- KPI 3: Total Storage -->
          <div class="flex items-center gap-3.5 px-4 py-3 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow transition-shadow">
            <div class="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
              <i class="fas fa-database text-base"></i>
            </div>
            <div>
              <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Storage</p>
              <div class="flex items-baseline gap-1.5 mt-0.5">
                <span class="text-xl font-extrabold text-slate-900">{{ totalStorage }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Alerts -->
      <div v-if="successMessage" class="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center justify-between shadow-sm">
        <div class="flex items-center gap-2.5">
          <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{{ successMessage }}</span>
        </div>
        <button @click="successMessage = ''" class="text-emerald-500 hover:text-emerald-700">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <div v-if="errorMessage" class="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm font-semibold flex items-center justify-between shadow-sm">
        <div class="flex items-center gap-2.5">
          <svg class="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <span>{{ errorMessage }}</span>
        </div>
        <button @click="errorMessage = ''" class="text-rose-500 hover:text-rose-700">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <!-- 2. UPLOAD FORM CARD (5 cols) -->
        <div class="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 p-6 lg:p-7 shadow-sm">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-[#008795]">
              <i class="fas fa-cloud-upload-alt text-lg"></i>
            </div>
            <div>
              <h2 class="text-lg font-bold text-slate-800">Upload Action Plan</h2>
              <p class="text-xs text-slate-400">Deploy institutional frameworks to POST /api/v1/publications</p>
            </div>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-4">
            <!-- Title with Leading Icon -->
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Action Plan Title <span class="text-rose-500">*</span>
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <i class="fas fa-heading text-xs"></i>
                </div>
                <input
                  v-model="form.title"
                  type="text"
                  required
                  placeholder="e.g. Annual Action Plan 2026"
                  class="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] hover:bg-teal-50/20 focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition-all duration-200 text-slate-800"
                />
              </div>
            </div>

            <!-- Year & Release Date with Leading Icons -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Fiscal Year <span class="text-rose-500">*</span>
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <i class="fas fa-calendar text-xs"></i>
                  </div>
                  <input
                    v-model="form.year"
                    type="text"
                    required
                    placeholder="e.g. 2026"
                    class="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] hover:bg-teal-50/20 focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800"
                  />
                </div>
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Release Date <span class="text-rose-500">*</span>
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <i class="fas fa-calendar-day text-xs"></i>
                  </div>
                  <input
                    v-model="form.releaseDate"
                    type="date"
                    required
                    class="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] hover:bg-teal-50/20 focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800"
                  />
                </div>
              </div>
            </div>

            <!-- Description -->
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Description <span class="text-rose-500">*</span>
              </label>
              <textarea
                v-model="form.description"
                rows="4"
                required
                placeholder="Strategic action plan overview, departmental targets, and national development priorities..."
                class="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] hover:bg-teal-50/20 focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition-all duration-200 text-slate-800 leading-relaxed"
              ></textarea>
            </div>

            <!-- PDF Upload Dropzone with Smooth Dashed Teal Border -->
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                PDF Document <span class="text-rose-500">*</span>
              </label>
              <div
                class="border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 group"
                :class="isDragging 
                  ? 'border-[#008795] bg-cyan-50/70 scale-[1.01] shadow-inner' 
                  : selectedFile 
                    ? 'border-emerald-300 bg-emerald-50/20' 
                    : 'border-[#008795]/30 hover:border-[#008795] bg-[#008795]/[0.02] hover:bg-[#008795]/[0.05]'"
                @dragover.prevent="isDragging = true"
                @dragleave.prevent="isDragging = false"
                @drop.prevent="handleFileDrop"
                @click="$refs.fileInput.click()"
              >
                <input
                  ref="fileInput"
                  type="file"
                  accept=".pdf,application/pdf"
                  class="hidden"
                  @change="handleFileSelect"
                />

                <div v-if="!selectedFile" class="py-2">
                  <div class="w-13 h-13 mx-auto rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center mb-3 text-[#008795] group-hover:scale-110 transition-transform shadow-xs">
                    <i class="fas fa-cloud-upload-alt text-2xl"></i>
                  </div>
                  <p class="text-sm font-bold text-slate-800">
                    <span class="text-[#008795] underline underline-offset-2">Click to upload</span> or drag and drop
                  </p>
                  <p class="text-xs text-slate-400 mt-1">Official publication PDF document (Up to 25MB)</p>
                </div>

                <div v-else class="flex items-center justify-between bg-white p-3.5 rounded-xl border border-teal-200/90 shadow-sm text-left">
                  <div class="flex items-center gap-3 overflow-hidden">
                    <div class="w-11 h-11 rounded-xl bg-teal-50 border border-teal-100 text-[#008795] flex items-center justify-center shrink-0">
                      <i class="fas fa-file-pdf text-xl"></i>
                    </div>
                    <div class="truncate">
                      <p class="text-xs font-bold text-slate-900 truncate" :title="selectedFile.name">
                        {{ selectedFile.name }}
                      </p>
                      <p class="text-[11px] text-teal-700 font-semibold flex items-center gap-1.5 mt-0.5">
                        <i class="fas fa-check-circle text-emerald-500"></i>
                        <span>{{ formatBytes(selectedFile.size) }}</span>
                        <span class="text-slate-300">•</span>
                        <span class="text-emerald-700 font-medium">Ready to deploy</span>
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    @click.stop="selectedFile = null"
                    class="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors shrink-0 ml-2"
                    title="Remove selected file"
                  >
                    <i class="fas fa-times text-xs"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- Submit Button: Publish Action Plan with Hover Elevation -->
            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#008795] to-[#006071] hover:from-[#009fb0] hover:to-[#007487] text-white text-sm font-bold shadow-md shadow-cyan-900/15 hover:shadow-xl hover:shadow-cyan-900/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-md cursor-pointer"
            >
              <i v-if="isSubmitting" class="fas fa-circle-notch fa-spin text-sm"></i>
              <i v-else class="fas fa-cloud-upload-alt text-sm"></i>
              <span>{{ isSubmitting ? 'Publishing to Database...' : 'Publish Action Plan' }}</span>
            </button>
          </form>
        </div>

        <!-- 3. DATABASE LEDGER (7 cols) -->
        <div class="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-6 lg:p-7 shadow-sm">
          <div class="flex items-center justify-between mb-5">
            <div>
              <h2 class="text-lg font-bold text-slate-800">Database Ledger</h2>
              <!-- <p class="text-xs text-slate-400">Synchronized records from /api/v1/publications</p> -->
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                {{ filteredPublications.length }} / {{ publications.length }}
              </span>
              <button
                @click="fetchPublications"
                class="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
                title="Refresh ledger"
              >
                <i class="fas fa-sync-alt text-xs" :class="{ 'fa-spin': isLoadingList }"></i>
              </button>
            </div>
          </div>

          <!-- Instant Search & Year Pills -->
          <div class="space-y-3 mb-5">
            <!-- Search Bar -->
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <i class="fas fa-search text-xs"></i>
              </div>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search action plans by title, year, or summary..."
                class="w-full pl-9 pr-9 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] hover:bg-teal-50/20 focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800 placeholder-slate-400"
              />
              <button
                v-if="searchQuery"
                type="button"
                @click="searchQuery = ''"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                title="Clear search"
              >
                <i class="fas fa-times-circle text-xs"></i>
              </button>
            </div>

            <!-- Year Filter Pills -->
            <div class="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 shrink-0">Filter Year:</span>
              <button
                v-for="yr in availableYears"
                :key="yr"
                type="button"
                @click="selectedYearFilter = yr"
                class="px-3 py-1 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer"
                :class="selectedYearFilter === yr
                  ? 'bg-[#008795] text-white shadow-sm shadow-[#008795]/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'"
              >
                {{ yr }}
              </button>
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="isLoadingList" class="py-16 text-center text-slate-400">
            <i class="fas fa-circle-notch fa-spin text-2xl text-[#008795] mb-2"></i>
            <p class="text-xs font-medium">Synchronizing publications...</p>
          </div>

          <!-- Empty Database State -->
          <div v-else-if="publications.length === 0" class="py-16 text-center text-slate-400">
            <div class="w-16 h-16 mx-auto rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300 mb-3">
              <i class="fas fa-folder-open text-2xl"></i>
            </div>
            <p class="text-sm font-semibold text-slate-700">No action plans in database</p>
            <p class="text-xs text-slate-400 mt-1">Use the upload form on the left to deploy your first document.</p>
          </div>

          <!-- No Filter Results State -->
          <div v-else-if="filteredPublications.length === 0" class="py-12 text-center text-slate-400">
            <div class="w-12 h-12 mx-auto rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 mb-2">
              <i class="fas fa-search text-base"></i>
            </div>
            <p class="text-xs font-semibold text-slate-600">No matching action plans found</p>
            <p class="text-[11px] text-slate-400 mt-0.5">Try altering your search keywords or year filter.</p>
            <button
              @click="searchQuery = ''; selectedYearFilter = 'All'"
              class="mt-3 px-3 py-1 rounded-lg text-xs font-semibold text-[#008795] hover:bg-cyan-50 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>

          <!-- Publication Cards List with Left Teal Border Accents & Circular Buttons -->
          <div v-else class="space-y-3">
            <div
              v-for="pub in filteredPublications"
              :key="pub.id"
              class="group p-4 rounded-2xl border border-slate-200/80 border-l-4 border-l-[#008795] bg-white hover:bg-slate-50/60 shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 space-y-2.5"
            >
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0 flex-1">
                  <h3 class="text-sm font-bold text-slate-800 group-hover:text-[#008795] transition-colors truncate" :title="pub.title">
                    {{ pub.title }}
                  </h3>
                  <div class="flex flex-wrap items-center gap-2 mt-1.5">
                    <span class="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-cyan-50 text-cyan-800 border border-cyan-200/70">
                      {{ pub.year }}
                    </span>
                    <span class="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                      <i class="far fa-calendar-alt text-[10px] text-slate-400"></i>
                      {{ pub.releaseDate || 'N/A' }}
                    </span>
                    <span class="text-slate-300">•</span>
                    <span class="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                      <i class="fas fa-hdd text-[10px] text-slate-400"></i>
                      {{ pub.fileSize || 'PDF' }}
                    </span>
                  </div>
                </div>

                <!-- Dedicated Action Buttons: Active Pill + Circular View, Edit, Delete -->
                <div class="flex items-center gap-1.5 shrink-0">
                  <button
                    @click="toggleActive(pub.id)"
                    class="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider transition-colors cursor-pointer"
                    :class="pub.active ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'"
                    :title="pub.active ? 'Click to deactivate' : 'Click to activate'"
                  >
                    {{ pub.active ? 'Active' : 'Inactive' }}
                  </button>

                  <a
                    v-if="pub.url && pub.url !== '#'"
                    :href="getPdfUrl(pub)"
                    target="_blank"
                    class="w-8 h-8 rounded-full bg-slate-100 hover:bg-cyan-50 text-slate-500 hover:text-[#008795] border border-slate-200/80 flex items-center justify-center transition-all shadow-xs cursor-pointer"
                    title="View PDF"
                  >
                    <i class="fas fa-eye text-xs"></i>
                  </a>

                  <button
                    @click="openEditModal(pub)"
                    class="w-8 h-8 rounded-full bg-slate-100 hover:bg-cyan-50 text-slate-500 hover:text-[#008795] border border-slate-200/80 flex items-center justify-center transition-all shadow-xs cursor-pointer"
                    title="Edit action plan"
                  >
                    <i class="fas fa-pen text-xs"></i>
                  </button>

                  <button
                    @click="openDeleteModal(pub)"
                    class="w-8 h-8 rounded-full bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 border border-slate-200/80 flex items-center justify-center transition-all shadow-xs cursor-pointer"
                    title="Delete publication"
                  >
                    <i class="fas fa-trash-alt text-xs"></i>
                  </button>
                </div>
              </div>

              <p class="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {{ pub.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 4. DELETE CONFIRMATION MODAL -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity"
      @click.self="closeDeleteModal"
    >
      <div class="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 transform transition-all animate-in fade-in zoom-in-95 duration-150">
        <div class="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-500 mb-4 mx-auto">
          <i class="fas fa-exclamation-triangle text-2xl"></i>
        </div>

        <h3 class="text-lg font-bold text-slate-900 text-center">
          Delete Action Plan?
        </h3>
        <p class="text-sm text-slate-500 text-center mt-2 leading-relaxed">
          Are you sure you want to delete <span class="font-bold text-slate-800 break-words">"{{ itemToDelete?.title }}"</span>? This publication will be permanently removed from the public portal.
        </p>

        <div class="flex items-center gap-3 mt-6">
          <button
            type="button"
            @click="closeDeleteModal"
            class="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-sm transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            @click="executeDelete"
            :disabled="isDeleting"
            class="flex-1 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm shadow-md shadow-rose-600/20 transition-all flex items-center justify-center gap-2"
          >
            <i v-if="isDeleting" class="fas fa-spinner fa-spin text-sm"></i>
            <span>{{ isDeleting ? 'Deleting...' : 'Delete Plan' }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 5. EDIT ACTION PLAN MODAL -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto"
      @click.self="closeEditModal"
    >
      <div class="bg-white rounded-3xl max-w-xl w-full p-6 lg:p-7 shadow-2xl border border-slate-100 my-8 transform transition-all animate-in fade-in zoom-in-95 duration-150">
        <div class="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-[#008795]">
              <i class="fas fa-edit text-base"></i>
            </div>
            <div>
              <h3 class="text-lg font-bold text-slate-800">Edit Action Plan</h3>
              <p class="text-xs text-slate-400">Update metadata or upload a replacement PDF document</p>
            </div>
          </div>
          <button
            type="button"
            @click="closeEditModal"
            class="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div v-if="editErrorMessage" class="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center justify-between">
          <span>{{ editErrorMessage }}</span>
          <button @click="editErrorMessage = ''" class="text-rose-500 hover:text-rose-700">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <form @submit.prevent="handleUpdate" class="space-y-4">
          <!-- Title with Leading Icon -->
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Action Plan Title <span class="text-rose-500">*</span></label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <i class="fas fa-heading text-xs"></i>
              </div>
              <input
                v-model="editForm.title"
                type="text"
                required
                class="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800"
              />
            </div>
          </div>

          <!-- Year & Release Date with Leading Icons -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Fiscal Year <span class="text-rose-500">*</span></label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <i class="fas fa-calendar text-xs"></i>
                </div>
                <input
                  v-model="editForm.year"
                  type="text"
                  required
                  class="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800"
                />
              </div>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Release Date <span class="text-rose-500">*</span></label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <i class="fas fa-calendar-day text-xs"></i>
                </div>
                <input
                  v-model="editForm.releaseDate"
                  type="date"
                  required
                  class="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800"
                />
              </div>
            </div>
          </div>

          <!-- Description -->
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Description <span class="text-rose-500">*</span></label>
            <textarea
              v-model="editForm.description"
              rows="3"
              required
              class="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800 leading-relaxed"
            ></textarea>
          </div>

          <!-- Current File Info & Replace PDF -->
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">PDF Document</label>
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 mb-2.5 flex items-center justify-between">
              <div class="flex items-center gap-2 overflow-hidden">
                <i class="fas fa-file-pdf text-rose-500 text-base shrink-0"></i>
                <span class="truncate font-medium text-slate-700">Current: {{ editForm.currentFileName || 'Existing Document' }} ({{ editForm.currentFileSize || 'PDF' }})</span>
              </div>
              <a
                v-if="editForm.currentUrl"
                :href="getPdfUrl({ url: editForm.currentUrl })"
                target="_blank"
                class="text-[#008795] font-bold hover:underline shrink-0 text-[11px] ml-2"
              >
                View
              </a>
            </div>

            <!-- Optional File Picker -->
            <div
              class="border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all"
              :class="isEditDragging ? 'border-[#008795] bg-cyan-50/50' : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'"
              @dragover.prevent="isEditDragging = true"
              @dragleave.prevent="isEditDragging = false"
              @drop.prevent="handleEditFileDrop"
              @click="$refs.editFileInput.click()"
            >
              <input
                ref="editFileInput"
                type="file"
                accept=".pdf,application/pdf"
                class="hidden"
                @change="handleEditFileSelect"
              />

              <div v-if="!editFile" class="py-1">
                <p class="text-xs font-bold text-slate-700">Replace PDF (Optional)</p>
                <p class="text-[11px] text-slate-400 mt-0.5">Click or drag &amp; drop a new PDF to overwrite</p>
              </div>

              <div v-else class="flex items-center justify-between bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm text-left">
                <div class="flex items-center gap-2.5 overflow-hidden">
                  <div class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <i class="fas fa-file-pdf"></i>
                  </div>
                  <div class="truncate">
                    <p class="text-xs font-bold text-slate-800 truncate">{{ editFile.name }}</p>
                    <p class="text-[10px] text-emerald-600 font-semibold">{{ formatBytes(editFile.size) }} (Ready to replace)</p>
                  </div>
                </div>
                <button
                  type="button"
                  @click.stop="editFile = null"
                  class="p-1 text-slate-400 hover:text-rose-600 rounded-lg"
                  title="Remove replacement file"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Buttons -->
          <div class="flex items-center gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              @click="closeEditModal"
              class="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-sm transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="isUpdating"
              class="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#008795] to-[#006071] hover:from-[#009fb0] hover:to-[#007c91] text-white font-semibold text-sm shadow-md shadow-cyan-950/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <i v-if="isUpdating" class="fas fa-spinner fa-spin text-sm"></i>
              <span>{{ isUpdating ? 'Saving Changes...' : 'Save Changes' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import instance from '@/axiosInstance';

const form = ref({
  title: '',
  year: new Date().getFullYear().toString(),
  releaseDate: new Date().toISOString().split('T')[0],
  description: ''
});

const selectedFile = ref(null);
const isDragging = ref(false);
const isSubmitting = ref(false);
const isLoadingList = ref(false);
const successMessage = ref('');
const errorMessage = ref('');
const publications = ref([]);

// Search and Filter State
const searchQuery = ref('');
const selectedYearFilter = ref('All');

// Delete Modal State
const showDeleteModal = ref(false);
const itemToDelete = ref(null);
const isDeleting = ref(false);

// Edit Modal State
const showEditModal = ref(false);
const editForm = ref({
  id: null,
  title: '',
  year: '',
  releaseDate: '',
  description: '',
  currentFileName: '',
  currentFileSize: '',
  currentUrl: ''
});
const editFile = ref(null);
const isEditDragging = ref(false);
const isUpdating = ref(false);
const editErrorMessage = ref('');

const activeCount = computed(() => {
  return publications.value.filter(p => p.active).length;
});

const availableYears = computed(() => {
  const years = new Set(publications.value.map(p => p.year).filter(Boolean));
  if (years.size === 0) {
    return ['All', '2026', '2025', '2024'];
  }
  const sorted = Array.from(years).sort((a, b) => b.localeCompare(a));
  return ['All', ...sorted];
});

const yearsCoverage = computed(() => {
  if (publications.value.length === 0) return '2024 - 2026';
  const years = publications.value
    .map(p => parseInt(p.year))
    .filter(y => !isNaN(y))
    .sort((a, b) => a - b);
  if (years.length === 0) return '2024 - 2026';
  const min = years[0];
  const max = years[years.length - 1];
  return min === max ? `${min}` : `${min} - ${max}`;
});

const totalStorage = computed(() => {
  if (publications.value.length === 0) return '0.0 MB';
  let totalBytes = 0;
  publications.value.forEach(p => {
    if (!p.fileSize) return;
    const sizeStr = p.fileSize.toString().trim().toUpperCase();
    const num = parseFloat(sizeStr);
    if (isNaN(num)) return;
    if (sizeStr.includes('GB')) totalBytes += num * 1024 * 1024 * 1024;
    else if (sizeStr.includes('MB')) totalBytes += num * 1024 * 1024;
    else if (sizeStr.includes('KB')) totalBytes += num * 1024;
    else if (sizeStr.includes('B')) totalBytes += num;
    else totalBytes += num * 1024;
  });
  if (totalBytes === 0) return '0.0 MB';
  return formatBytes(totalBytes);
});

const filteredPublications = computed(() => {
  return publications.value.filter(pub => {
    const matchesYear = selectedYearFilter.value === 'All' || pub.year === selectedYearFilter.value;
    const q = searchQuery.value.toLowerCase().trim();
    const matchesQuery = !q || 
      (pub.title && pub.title.toLowerCase().includes(q)) || 
      (pub.description && pub.description.toLowerCase().includes(q)) ||
      (pub.year && pub.year.toLowerCase().includes(q)) ||
      (pub.releaseDate && pub.releaseDate.toLowerCase().includes(q));
    return matchesYear && matchesQuery;
  });
});

const formatBytes = (bytes, decimals = 1) => {
  if (!bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const formatReleaseDateForInput = (dateStr) => {
  if (!dateStr) return '';
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) {
    return d.toISOString().split('T')[0];
  }
  return dateStr;
};

const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      errorMessage.value = 'Please select a valid PDF file.';
      selectedFile.value = null;
      return;
    }
    selectedFile.value = file;
    errorMessage.value = '';
  }
};

const handleFileDrop = (event) => {
  isDragging.value = false;
  const file = event.dataTransfer.files[0];
  if (file) {
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      errorMessage.value = 'Please select a valid PDF file.';
      return;
    }
    selectedFile.value = file;
    errorMessage.value = '';
  }
};

const handleEditFileSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      editErrorMessage.value = 'Please select a valid PDF file.';
      editFile.value = null;
      return;
    }
    editFile.value = file;
    editErrorMessage.value = '';
  }
};

const handleEditFileDrop = (event) => {
  isEditDragging.value = false;
  const file = event.dataTransfer.files[0];
  if (file) {
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      editErrorMessage.value = 'Please select a valid PDF file.';
      return;
    }
    editFile.value = file;
    editErrorMessage.value = '';
  }
};

const fetchPublications = async () => {
  isLoadingList.value = true;
  try {
    const res = await instance.get('/api/v1/publications/all');
    publications.value = Array.isArray(res.data) ? res.data : [];
  } catch (err) {
    try {
      const publicRes = await instance.get('/api/v1/publications');
      publications.value = Array.isArray(publicRes.data) ? publicRes.data : [];
    } catch (e) {
      console.error('Failed to load publications:', e);
    }
  } finally {
    isLoadingList.value = false;
  }
};

const handleSubmit = async () => {
  if (!selectedFile.value) {
    errorMessage.value = 'Please select a PDF file to upload.';
    return;
  }

  isSubmitting.value = true;
  errorMessage.value = '';
  successMessage.value = '';

  try {
    const formData = new FormData();
    formData.append('title', form.value.title);
    formData.append('year', form.value.year);
    formData.append('description', form.value.description);
    formData.append('releaseDate', form.value.releaseDate);
    formData.append('file', selectedFile.value);

    await instance.post('/api/v1/publications', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    successMessage.value = `Publication "${form.value.title}" successfully uploaded and published!`;
    form.value.title = '';
    form.value.description = '';
    selectedFile.value = null;
    await fetchPublications();
  } catch (err) {
    console.error('Upload failed:', err);
    errorMessage.value = err.response?.data || err.message || 'Failed to upload publication.';
  } finally {
    isSubmitting.value = false;
  }
};

const toggleActive = async (id) => {
  try {
    await instance.patch(`/api/v1/publications/${id}/toggle-status`);
    await fetchPublications();
  } catch (err) {
    console.error('Toggle status failed:', err);
  }
};

// Delete Handlers
const openDeleteModal = (pub) => {
  itemToDelete.value = pub;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  itemToDelete.value = null;
};

const executeDelete = async () => {
  if (!itemToDelete.value) return;
  isDeleting.value = true;
  try {
    await instance.delete(`/api/v1/publications/${itemToDelete.value.id}`);
    successMessage.value = `Publication "${itemToDelete.value.title}" deleted successfully.`;
    closeDeleteModal();
    await fetchPublications();
  } catch (err) {
    console.error('Delete failed:', err);
    errorMessage.value = 'Failed to delete publication.';
    closeDeleteModal();
  } finally {
    isDeleting.value = false;
  }
};

// Edit Handlers
const openEditModal = (pub) => {
  editForm.value = {
    id: pub.id,
    title: pub.title || '',
    year: pub.year || '',
    releaseDate: formatReleaseDateForInput(pub.releaseDate),
    description: pub.description || '',
    currentFileName: pub.fileName || (pub.url ? pub.url.split('/').pop() : ''),
    currentFileSize: pub.fileSize || 'PDF',
    currentUrl: pub.url || pub.fileUrl || ''
  };
  editFile.value = null;
  editErrorMessage.value = '';
  showEditModal.value = true;
};

const closeEditModal = () => {
  showEditModal.value = false;
  editFile.value = null;
  editErrorMessage.value = '';
};

const handleUpdate = async () => {
  if (!editForm.value.title || !editForm.value.year || !editForm.value.releaseDate || !editForm.value.description) {
    editErrorMessage.value = 'Please fill in all required fields.';
    return;
  }

  isUpdating.value = true;
  editErrorMessage.value = '';

  try {
    const formData = new FormData();
    formData.append('title', editForm.value.title);
    formData.append('year', editForm.value.year);
    formData.append('description', editForm.value.description);
    formData.append('releaseDate', editForm.value.releaseDate);
    if (editFile.value) {
      formData.append('file', editFile.value);
    }

    await instance.put(`/api/v1/publications/${editForm.value.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    successMessage.value = `Publication "${editForm.value.title}" successfully updated!`;
    closeEditModal();
    await fetchPublications();
  } catch (err) {
    console.error('Update failed:', err);
    editErrorMessage.value = err.response?.data?.message || err.response?.data || err.message || 'Failed to update publication.';
  } finally {
    isUpdating.value = false;
  }
};

const getPdfUrl = (pub) => {
  const url = pub.url || pub.fileUrl;
  if (!url || url === '#') return '#';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  const baseUrl = instance.defaults.baseURL || 'http://localhost:8096';
  return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
};

onMounted(fetchPublications);
</script>
