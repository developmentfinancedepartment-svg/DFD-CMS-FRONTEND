<template>
  <div class="p-6 lg:p-8 bg-slate-50/60 min-h-screen">
    <div class="max-w-7xl mx-auto space-y-6">
      
      <!-- 1. TOP STATISTICS HEADER -->
      <div class="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 pb-2">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200/80 text-cyan-800 text-xs font-bold uppercase tracking-wider mb-2">
            <span class="h-1.5 w-1.5 rounded-full bg-[#008795]"></span>
            DFD Media &amp; Institutional Memory
          </div>
          <h1 class="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Manage Gallery
          </h1>
          <p class="text-slate-500 mt-1 text-sm">
            Upload event photographs, field visit documentation, and institutional photo albums to the public portal.
          </p>
        </div>

        <!-- Metric KPI Cards -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3.5 w-full xl:w-auto">
          <!-- Total Images -->
          <div class="flex items-center gap-3 px-4 py-3 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
            <div class="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-[#008795] shrink-0">
              <i class="fas fa-images text-sm"></i>
            </div>
            <div>
              <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Photos</p>
              <span class="text-lg font-extrabold text-slate-900">{{ galleryItems.length }}</span>
            </div>
          </div>

          <!-- Workshops -->
          <div class="flex items-center gap-3 px-4 py-3 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
            <div class="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
              <i class="fas fa-chalkboard-teacher text-sm"></i>
            </div>
            <div>
              <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Workshops</p>
              <span class="text-lg font-extrabold text-slate-900">{{ countCategory('Workshops') }}</span>
            </div>
          </div>

          <!-- Field Visits -->
          <div class="flex items-center gap-3 px-4 py-3 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
            <div class="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
              <i class="fas fa-map-marked-alt text-sm"></i>
            </div>
            <div>
              <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Field Visits</p>
              <span class="text-lg font-extrabold text-slate-900">{{ countCategory('Field Visits') }}</span>
            </div>
          </div>

          <!-- Institutional -->
          <div class="flex items-center gap-3 px-4 py-3 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
            <div class="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
              <i class="fas fa-landmark text-sm"></i>
            </div>
            <div>
              <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Institutional</p>
              <span class="text-lg font-extrabold text-slate-900">{{ countCategory('Institutional') }}</span>
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
        
        <!-- 2. UPLOAD FORM CARD (5 cols) -->
        <div class="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 p-6 lg:p-7 shadow-sm sticky top-24">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-[#008795]">
              <i class="fas fa-camera text-base"></i>
            </div>
            <div>
              <h2 class="text-lg font-bold text-slate-800">Upload Gallery Photo</h2>
              <p class="text-xs text-slate-400">Post new photograph to POST /api/v1/gallery</p>
            </div>
          </div>

          <form @submit.prevent="handleUpload" class="space-y-4">
            <!-- Title -->
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Photo / Event Title <span class="text-rose-500">*</span>
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <i class="fas fa-heading text-xs"></i>
                </div>
                <input
                  v-model="form.title"
                  type="text"
                  required
                  placeholder="e.g. MSME Policy Workshop 2026"
                  class="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800"
                />
              </div>
            </div>

            <!-- Category Select -->
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Category <span class="text-rose-500">*</span>
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <i class="fas fa-folder text-xs"></i>
                </div>
                <select
                  v-model="form.category"
                  required
                  class="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800 font-semibold"
                >
                  <option value="" disabled>Select category</option>
                  <option value="Workshops">Workshops</option>
                  <option value="Field Visits">Field Visits</option>
                  <option value="Institutional">Institutional</option>
                </select>
              </div>
            </div>

            <!-- Event Date -->
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Event Date <span class="text-rose-500">*</span>
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <i class="fas fa-calendar-alt text-xs"></i>
                </div>
                <input
                  v-model="form.eventDate"
                  type="date"
                  required
                  class="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800"
                />
              </div>
            </div>

            <!-- Image File Input -->
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Image File <span class="text-rose-500">*</span>
              </label>
              <div
                @dragover.prevent="isDragging = true"
                @dragleave.prevent="isDragging = false"
                @drop.prevent="handleFileDrop"
                :class="[
                  'relative border-2 border-dashed rounded-2xl p-5 text-center transition-all cursor-pointer group',
                  isDragging ? 'border-[#008795] bg-cyan-50/50' : 'border-slate-200 hover:border-[#008795] bg-slate-50/50 hover:bg-cyan-50/30'
                ]"
                @click="$refs.fileInput.click()"
              >
                <input
                  ref="fileInput"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  @change="handleFileChange"
                  class="hidden"
                />

                <div v-if="previewUrl" class="space-y-2">
                  <div class="relative w-full h-40 rounded-xl overflow-hidden border border-slate-200">
                    <img :src="previewUrl" class="w-full h-full object-cover" alt="Preview" />
                    <button
                      type="button"
                      @click.stop="removeSelectedFile"
                      class="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-rose-600 text-white rounded-lg transition"
                      title="Remove file"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                  <p class="text-xs font-medium text-slate-600 truncate">{{ selectedFile?.name }}</p>
                </div>

                <div v-else class="space-y-2 py-3">
                  <div class="w-12 h-12 mx-auto rounded-2xl bg-cyan-50 flex items-center justify-center text-[#008795] group-hover:scale-110 transition-transform">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <span class="text-xs font-bold text-[#008795]">Click to upload</span>
                    <span class="text-xs text-slate-500"> or drag and drop</span>
                  </div>
                  <p class="text-[11px] text-slate-400">PNG, JPG, JPEG, WEBP up to 10MB</p>
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="uploading || !selectedFile"
              class="w-full mt-2 inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#008795] to-[#006071] hover:from-[#009fb0] hover:to-[#007c91] text-white text-sm font-bold shadow-lg shadow-cyan-900/15 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              <svg v-if="uploading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              <i v-else class="fas fa-cloud-upload-alt"></i>
              <span>{{ uploading ? 'Uploading Photograph...' : 'Publish to Gallery' }}</span>
            </button>
          </form>
        </div>

        <!-- 3. GALLERY CARDS LIST (7 cols) -->
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
                placeholder="Search photos..."
                class="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-[#008795] outline-none transition text-slate-800"
              />
            </div>

            <!-- Category Pills -->
            <div class="flex flex-wrap items-center gap-1.5">
              <button
                v-for="cat in ['All', 'Workshops', 'Field Visits', 'Institutional']"
                :key="cat"
                @click="selectedCategory = cat"
                :class="[
                  'px-3 py-1 rounded-xl text-xs font-bold transition',
                  selectedCategory === cat
                    ? 'bg-[#008795] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                ]"
              >
                {{ cat }}
              </button>
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="loading" class="py-16 text-center text-slate-500">
            <svg class="animate-spin h-6 w-6 text-[#008795] mx-auto mb-2" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            <p class="text-xs font-bold text-slate-600">Loading gallery photos...</p>
          </div>

          <!-- Empty State -->
          <div v-else-if="filteredItems.length === 0" class="py-16 text-center text-slate-400">
            <div class="w-14 h-14 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
              <i class="fas fa-images text-2xl"></i>
            </div>
            <p class="text-sm font-bold text-slate-700">No gallery photos found</p>
            <p class="text-xs text-slate-400 mt-1">Upload photos using the form on the left.</p>
          </div>

          <!-- Cards Grid -->
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              v-for="item in filteredItems"
              :key="item.id"
              class="group bg-slate-50/70 hover:bg-white rounded-2xl border border-slate-200/80 hover:border-cyan-500/50 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col"
            >
              <!-- Thumbnail -->
              <div class="relative h-44 bg-slate-200 overflow-hidden">
                <img
                  v-if="item.imageUrl"
                  :src="resolveImageUrl(item.imageUrl)"
                  :alt="item.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  @error="onImageError"
                />
                <div v-else class="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100">
                  <i class="fas fa-image text-3xl"></i>
                </div>

                <!-- Category badge overlaid -->
                <span
                  :class="[
                    'absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md shadow-sm',
                    categoryBadgeClass(item.category)
                  ]"
                >
                  {{ item.category }}
                </span>

                <!-- Action buttons: Edit & Delete -->
                <div class="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                  <button
                    type="button"
                    @click.stop="openEditModal(item)"
                    class="w-8 h-8 rounded-lg bg-white/95 hover:bg-[#008795] text-slate-600 hover:text-white transition-colors flex items-center justify-center"
                    title="Edit Photo"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    @click.stop="openDeleteModal(item)"
                    class="w-8 h-8 rounded-lg bg-white/95 hover:bg-rose-600 text-slate-600 hover:text-white transition-colors flex items-center justify-center"
                    title="Delete Photo"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Info -->
              <div class="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 class="text-sm font-extrabold text-slate-800 line-clamp-1 group-hover:text-[#008795] transition-colors" :title="item.title">
                    {{ item.title }}
                  </h3>
                  <div class="flex items-center gap-1.5 text-xs text-slate-500 mt-1 font-medium">
                    <i class="far fa-calendar-alt text-[#008795] text-[11px]"></i>
                    <span>{{ item.eventDate || 'N/A' }}</span>
                  </div>
                </div>

                <!-- Footer details -->
                <div class="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span>ID: #{{ item.id }}</span>
                  <a
                    v-if="item.imageUrl"
                    :href="resolveImageUrl(item.imageUrl)"
                    target="_blank"
                    class="text-[#008795] hover:underline font-semibold flex items-center gap-1"
                  >
                    <span>View full</span>
                    <i class="fas fa-external-link-alt text-[9px]"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      <!-- EDIT PHOTO MODAL -->
      <div
        v-if="showEditModal"
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
                <h3 class="text-lg font-bold text-slate-800">Edit Gallery Photo</h3>
                <p class="text-xs text-slate-400">Update photo title, category, and date</p>
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

          <!-- Error Alert inside modal -->
          <div v-if="editErrorMessage" class="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center justify-between shadow-xs">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-rose-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{{ editErrorMessage }}</span>
            </div>
            <button type="button" @click="editErrorMessage = ''" class="text-rose-500 hover:text-rose-700">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleUpdate" class="space-y-4">
            <!-- Title -->
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Photo / Event Title <span class="text-rose-500">*</span>
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <i class="fas fa-heading text-xs"></i>
                </div>
                <input
                  v-model="editForm.title"
                  type="text"
                  required
                  placeholder="e.g. MSME Policy Workshop 2026"
                  class="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800"
                />
              </div>
            </div>

            <!-- Category -->
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Category <span class="text-rose-500">*</span>
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <i class="fas fa-folder text-xs"></i>
                </div>
                <select
                  v-model="editForm.category"
                  required
                  class="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800 font-semibold"
                >
                  <option value="Workshops">Workshops</option>
                  <option value="Field Visits">Field Visits</option>
                  <option value="Institutional">Institutional</option>
                </select>
              </div>
            </div>

            <!-- Event Date -->
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Event Date <span class="text-rose-500">*</span>
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <i class="fas fa-calendar-alt text-xs"></i>
                </div>
                <input
                  v-model="editForm.eventDate"
                  type="date"
                  required
                  class="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl hover:border-[#008795] focus:bg-white focus:ring-2 focus:ring-[#008795] focus:border-[#008795] outline-none transition text-slate-800"
                />
              </div>
            </div>

            <!-- Current Image Preview / Optional Replacement Image -->
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Photograph (Optional Replacement)
              </label>
              <div class="flex items-center gap-3.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80">
                <div class="w-16 h-16 rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-slate-200">
                  <img
                    v-if="editPreviewUrl || editForm.imageUrl"
                    :src="editPreviewUrl || resolveImageUrl(editForm.imageUrl)"
                    class="w-full h-full object-cover"
                    alt="Current photo"
                  />
                  <div v-else class="w-full h-full flex items-center justify-center text-slate-400">
                    <i class="fas fa-image text-lg"></i>
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-bold text-slate-700 truncate">
                    {{ editSelectedFile ? editSelectedFile.name : 'Current Image' }}
                  </p>
                  <p class="text-[11px] text-slate-400">
                    {{ editSelectedFile ? 'New photo will replace current' : 'Leave empty to keep existing photograph' }}
                  </p>
                  <div class="mt-2 flex items-center gap-2">
                    <label class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:border-[#008795] hover:text-[#008795] cursor-pointer transition shadow-xs">
                      <i class="fas fa-camera text-[10px]"></i>
                      <span>{{ editSelectedFile ? 'Change photo' : 'Upload new photo' }}</span>
                      <input
                        type="file"
                        accept="image/png, image/jpeg, image/jpg, image/webp"
                        @change="handleEditFileChange"
                        class="hidden"
                      />
                    </label>
                    <button
                      v-if="editSelectedFile"
                      type="button"
                      @click="removeEditSelectedFile"
                      class="text-[11px] text-rose-500 hover:text-rose-700 font-semibold transition"
                    >
                      Revert
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer Actions -->
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
                class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#008795] to-[#006071] hover:from-[#009fb0] hover:to-[#007c91] text-white text-sm font-bold shadow-md shadow-cyan-900/15 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
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
              Delete Gallery Photo?
            </h3>
            <p class="mt-2 text-sm text-cyan-100/70 leading-relaxed">
              Are you sure you want to permanently delete this photograph? This will remove the image file and database record.
            </p>

            <div v-if="itemToDelete" class="mt-4 w-full p-3.5 rounded-2xl bg-[#001f24] border border-cyan-500/20 flex items-center gap-3 text-left">
              <img
                v-if="itemToDelete.imageUrl"
                :src="resolveImageUrl(itemToDelete.imageUrl)"
                class="w-12 h-12 rounded-xl object-cover border border-cyan-500/30"
              />
              <div class="min-w-0 flex-1">
                <p class="text-sm font-bold text-white truncate">{{ itemToDelete.title }}</p>
                <p class="text-xs text-cyan-300">{{ itemToDelete.category }} • {{ itemToDelete.eventDate }}</p>
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
import { ref, computed, onMounted } from 'vue';
import axios from '../axiosInstance';

// State
const galleryItems = ref([]);
const loading = ref(false);
const uploading = ref(false);
const isDeleting = ref(false);
const isDragging = ref(false);

const selectedCategory = ref('All');
const searchQuery = ref('');

const successMessage = ref('');
const errorMessage = ref('');

const form = ref({
  title: '',
  category: 'Workshops',
  eventDate: new Date().toISOString().split('T')[0]
});

const selectedFile = ref(null);
const previewUrl = ref('');

const showDeleteModal = ref(false);
const itemToDelete = ref(null);

// Edit State
const showEditModal = ref(false);
const isUpdating = ref(false);
const editErrorMessage = ref('');
const editSelectedFile = ref(null);
const editPreviewUrl = ref('');

const editForm = ref({
  id: null,
  title: '',
  category: 'Workshops',
  eventDate: '',
  imageUrl: ''
});

// Category badge classes
const categoryBadgeClass = (category) => {
  switch (category) {
    case 'Workshops':
      return 'bg-indigo-600/90 text-white';
    case 'Field Visits':
      return 'bg-emerald-600/90 text-white';
    case 'Institutional':
      return 'bg-amber-600/90 text-white';
    default:
      return 'bg-slate-700/90 text-white';
  }
};

const countCategory = (category) => {
  return galleryItems.value.filter(item => item.category === category).length;
};

// URL resolver for uploaded files
const resolveImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8096';
  return `${baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
};

const onImageError = (e) => {
  e.target.style.display = 'none';
};

// File handlers
const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    processSelectedFile(file);
  }
};

const handleFileDrop = (e) => {
  isDragging.value = false;
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) {
    processSelectedFile(file);
  } else {
    errorMessage.value = 'Please drop an image file (PNG, JPG, WEBP).';
  }
};

const processSelectedFile = (file) => {
  selectedFile.value = file;
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value);
  }
  previewUrl.value = URL.createObjectURL(file);
};

const removeSelectedFile = () => {
  selectedFile.value = null;
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value);
    previewUrl.value = '';
  }
};

// Filtering
const filteredItems = computed(() => {
  return galleryItems.value.filter(item => {
    const matchesCategory =
      selectedCategory.value === 'All' ||
      item.category === selectedCategory.value;

    if (!matchesCategory) return false;

    if (!searchQuery.value.trim()) return true;
    const q = searchQuery.value.toLowerCase().trim();
    return (
      (item.title || '').toLowerCase().includes(q) ||
      (item.category || '').toLowerCase().includes(q) ||
      (item.eventDate || '').toLowerCase().includes(q)
    );
  });
});

// Fetch Gallery
const fetchGallery = async () => {
  loading.value = true;
  try {
    const response = await axios.get('/api/v1/gallery');
    galleryItems.value = response.data || [];
  } catch (error) {
    console.error('Failed to load gallery items:', error);
    errorMessage.value = 'Failed to load gallery items.';
  } finally {
    loading.value = false;
  }
};

// Upload Photo
const handleUpload = async () => {
  if (!selectedFile.value) {
    errorMessage.value = 'Please select an image file to upload.';
    return;
  }

  uploading.value = true;
  errorMessage.value = '';
  successMessage.value = '';

  try {
    const formData = new FormData();
    formData.append('title', form.value.title);
    formData.append('category', form.value.category);
    formData.append('eventDate', form.value.eventDate);
    formData.append('image', selectedFile.value);

    await axios.post('/api/v1/gallery', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    successMessage.value = 'Photograph uploaded to gallery successfully!';
    form.value.title = '';
    removeSelectedFile();
    await fetchGallery();
  } catch (error) {
    console.error('Failed to upload gallery photo:', error);
    errorMessage.value = 'Failed to upload photo. Please check file format and server connection.';
  } finally {
    uploading.value = false;
  }
};

// Edit Handlers
const formatDateForInput = (dateStr) => {
  if (!dateStr) return '';
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
  try {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      return d.toISOString().split('T')[0];
    }
  } catch (e) {
    // fallback
  }
  return dateStr;
};

const openEditModal = (item) => {
  editErrorMessage.value = '';
  editSelectedFile.value = null;
  if (editPreviewUrl.value) {
    URL.revokeObjectURL(editPreviewUrl.value);
    editPreviewUrl.value = '';
  }

  editForm.value = {
    id: item.id,
    title: item.title || '',
    category: item.category || 'Workshops',
    eventDate: formatDateForInput(item.eventDate),
    imageUrl: item.imageUrl || ''
  };
  showEditModal.value = true;
};

const closeEditModal = () => {
  if (isUpdating.value) return;
  showEditModal.value = false;
  editErrorMessage.value = '';
  if (editPreviewUrl.value) {
    URL.revokeObjectURL(editPreviewUrl.value);
    editPreviewUrl.value = '';
  }
  editSelectedFile.value = null;
  editForm.value = {
    id: null,
    title: '',
    category: 'Workshops',
    eventDate: '',
    imageUrl: ''
  };
};

const handleEditFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    editSelectedFile.value = file;
    if (editPreviewUrl.value) {
      URL.revokeObjectURL(editPreviewUrl.value);
    }
    editPreviewUrl.value = URL.createObjectURL(file);
  }
};

const removeEditSelectedFile = () => {
  editSelectedFile.value = null;
  if (editPreviewUrl.value) {
    URL.revokeObjectURL(editPreviewUrl.value);
    editPreviewUrl.value = '';
  }
};

const handleUpdate = async () => {
  if (!editForm.value.title?.trim()) {
    editErrorMessage.value = 'Please provide a photo title.';
    return;
  }
  if (!editForm.value.category) {
    editErrorMessage.value = 'Please select a category.';
    return;
  }
  if (!editForm.value.eventDate) {
    editErrorMessage.value = 'Please select an event date.';
    return;
  }

  isUpdating.value = true;
  editErrorMessage.value = '';
  errorMessage.value = '';

  try {
    if (editSelectedFile.value) {
      const formData = new FormData();
      formData.append('title', editForm.value.title.trim());
      formData.append('category', editForm.value.category);
      formData.append('eventDate', editForm.value.eventDate);
      formData.append('image', editSelectedFile.value);

      await axios.put(`/api/v1/gallery/${editForm.value.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } else {
      await axios.put(`/api/v1/gallery/${editForm.value.id}`, {
        title: editForm.value.title.trim(),
        category: editForm.value.category,
        eventDate: editForm.value.eventDate
      });
    }

    successMessage.value = 'Gallery photo updated successfully!';
    closeEditModal();
    await fetchGallery();
  } catch (error) {
    console.error('Failed to update gallery photo:', error);
    editErrorMessage.value =
      error.response?.data?.message ||
      (typeof error.response?.data === 'string' ? error.response.data : null) ||
      'Failed to update photo. Please check your connection and try again.';
  } finally {
    isUpdating.value = false;
  }
};

// Delete Handlers
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
  errorMessage.value = '';

  try {
    await axios.delete(`/api/v1/gallery/${itemToDelete.value.id}`);
    galleryItems.value = galleryItems.value.filter(i => i.id !== itemToDelete.value.id);
    successMessage.value = 'Photo deleted from gallery successfully.';
    showDeleteModal.value = false;
    itemToDelete.value = null;
    await fetchGallery();
  } catch (error) {
    console.error('Failed to delete gallery item:', error);
    errorMessage.value = 'Failed to delete gallery item.';
  } finally {
    isDeleting.value = false;
  }
};

onMounted(fetchGallery);
</script>
