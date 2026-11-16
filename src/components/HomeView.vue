<template>
  <div class="bg-slate-50/80 min-h-screen py-8 px-6 font-sans">
    <div class="max-w-7xl mx-auto space-y-6">

      <!-- 1. SLEEK COMPACT WELCOME HEADER -->
      <section class="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm border-l-4 border-l-teal-600">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <!-- Left: Status pill, Title & Subtitle -->
          <div class="space-y-1.5">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold tracking-wide">
              <span class="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>System Active • {{ authStore.isSuperAdmin ? 'Super Administrator' : 'Administrator' }}</span>
            </div>

            <h1 class="text-2xl font-bold text-slate-900 tracking-tight">
              Welcome back, {{ authStore.username || 'Administrator' }}
            </h1>

            <p class="text-sm text-slate-500">
              Department of Development Finance — Content Management Portal
            </p>
          </div>

          <!-- Right: Sleek Action Buttons -->
          <div class="flex flex-wrap items-center gap-3 shrink-0">
            <router-link
              :to="{ name: 'admin-publications' }"
              class="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl px-4 py-2.5 text-sm font-medium shadow-sm transition-all hover:shadow cursor-pointer"
            >
              <i class="fas fa-plus text-xs"></i>
              <span>Upload Publication</span>
            </router-link>

            <router-link
              :to="{ name: 'manage-team' }"
              class="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl px-4 py-2.5 text-sm font-medium transition-all cursor-pointer"
            >
              <i class="fas fa-users text-xs text-slate-500"></i>
              <span>Manage Officials</span>
            </router-link>
          </div>
        </div>
      </section>

      <!-- 2. MODERN 4-COLUMN KPI METRIC CARDS -->
      <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <!-- Card 1: Total Publications -->
        <router-link
          :to="{ name: 'admin-publications' }"
          class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all group block cursor-pointer"
        >
          <div class="flex items-center justify-between">
            <div class="w-11 h-11 rounded-2xl bg-teal-50 border border-teal-100/80 flex items-center justify-center text-teal-600 shrink-0 group-hover:scale-105 transition-transform">
              <i class="fas fa-file-contract text-base"></i>
            </div>
            <span class="text-xs font-semibold text-teal-600 group-hover:translate-x-0.5 transition-transform">
              <i class="fas fa-arrow-right text-[11px]"></i>
            </span>
          </div>
          <div class="mt-4">
            <p class="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Publications</p>
            <div class="flex items-baseline gap-2 mt-1">
              <span v-if="!isLoadingStats" class="text-2xl font-extrabold text-slate-900">{{ stats.publicationsCount }}</span>
              <div v-else class="h-8 w-14 bg-slate-100 animate-pulse rounded-lg"></div>
            </div>
            <p class="text-xs text-slate-400 mt-1">Published reports &amp; circulars</p>
          </div>
        </router-link>

        <!-- Card 2: Department Officials -->
        <router-link
          :to="{ name: 'manage-team' }"
          class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all group block cursor-pointer"
        >
          <div class="flex items-center justify-between">
            <div class="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100/80 flex items-center justify-center text-blue-600 shrink-0 group-hover:scale-105 transition-transform">
              <i class="fas fa-user-tie text-base"></i>
            </div>
            <span class="text-xs font-semibold text-blue-600 group-hover:translate-x-0.5 transition-transform">
              <i class="fas fa-arrow-right text-[11px]"></i>
            </span>
          </div>
          <div class="mt-4">
            <p class="text-xs font-bold text-slate-500 uppercase tracking-wider">Department Officials</p>
            <div class="flex items-baseline gap-2 mt-1">
              <span v-if="!isLoadingStats" class="text-2xl font-extrabold text-slate-900">{{ stats.officialsCount }}</span>
              <div v-else class="h-8 w-14 bg-slate-100 animate-pulse rounded-lg"></div>
            </div>
            <p class="text-xs text-slate-400 mt-1">Active directory members</p>
          </div>
        </router-link>

        <!-- Card 3: Financing Schemes -->
        <router-link
          :to="{ name: 'manage-schemes' }"
          class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all group block cursor-pointer"
        >
          <div class="flex items-center justify-between">
            <div class="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100/80 flex items-center justify-center text-indigo-600 shrink-0 group-hover:scale-105 transition-transform">
              <i class="fas fa-hand-holding-usd text-base"></i>
            </div>
            <span class="text-xs font-semibold text-indigo-600 group-hover:translate-x-0.5 transition-transform">
              <i class="fas fa-arrow-right text-[11px]"></i>
            </span>
          </div>
          <div class="mt-4">
            <p class="text-xs font-bold text-slate-500 uppercase tracking-wider">Financing Schemes</p>
            <div class="flex items-baseline gap-2 mt-1">
              <span v-if="!isLoadingStats" class="text-2xl font-extrabold text-slate-900">{{ stats.schemesCount }}</span>
              <div v-else class="h-8 w-14 bg-slate-100 animate-pulse rounded-lg"></div>
            </div>
            <p class="text-xs text-slate-400 mt-1">Active credit facilities</p>
          </div>
        </router-link>

        <!-- Card 4: News & Gallery -->
        <router-link
          :to="{ name: 'news-home' }"
          class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all group block cursor-pointer"
        >
          <div class="flex items-center justify-between">
            <div class="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-100/80 flex items-center justify-center text-amber-600 shrink-0 group-hover:scale-105 transition-transform">
              <i class="fas fa-newspaper text-base"></i>
            </div>
            <span class="text-xs font-semibold text-amber-600 group-hover:translate-x-0.5 transition-transform">
              <i class="fas fa-arrow-right text-[11px]"></i>
            </span>
          </div>
          <div class="mt-4">
            <p class="text-xs font-bold text-slate-500 uppercase tracking-wider">News &amp; Gallery</p>
            <div class="flex items-baseline gap-2 mt-1">
              <span v-if="!isLoadingStats" class="text-2xl font-extrabold text-slate-900">{{ stats.mediaCount }}</span>
              <div v-else class="h-8 w-14 bg-slate-100 animate-pulse rounded-lg"></div>
            </div>
            <p class="text-xs text-slate-400 mt-1">Public bulletins &amp; media</p>
          </div>
        </router-link>
      </section>

      <!-- 3. HOMEPAGE KEY METRICS MANAGEMENT CARD -->
      <section class="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-5">
        <!-- Header: Title, Subtitle, and Action Button -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100/80 flex items-center justify-center text-teal-600 shrink-0">
              <i class="fas fa-chart-line text-sm"></i>
            </div>
            <div>
              <h2 class="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                Homepage Key Metrics
                <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200/80">Public Banner</span>
              </h2>
              <p class="text-xs text-slate-400 mt-0.5">
                Configure the 5 impact statistics displayed live on the public landing page banner
              </p>
            </div>
          </div>

          <!-- Update Button & Actions -->
          <div class="flex items-center gap-3 shrink-0">
            <button
              @click="saveHomeMetrics"
              :disabled="isSavingMetrics || isLoadingMetrics"
              class="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl px-4 py-2.5 text-xs font-semibold shadow-sm transition-all hover:shadow cursor-pointer"
            >
              <i v-if="isSavingMetrics" class="fas fa-circle-notch fa-spin text-xs"></i>
              <i v-else class="fas fa-save text-xs"></i>
              <span>{{ isSavingMetrics ? 'Saving Changes...' : 'Update Homepage Metrics' }}</span>
            </button>
          </div>
        </div>

        <!-- Notification Banner (Success / Error) -->
        <div
          v-if="metricsAlert.show"
          class="p-3.5 rounded-xl text-xs font-medium flex items-center justify-between transition-all"
          :class="metricsAlert.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/80' : 'bg-rose-50 text-rose-800 border border-rose-200/80'"
        >
          <div class="flex items-center gap-2">
            <i :class="metricsAlert.type === 'success' ? 'fas fa-check-circle text-emerald-600' : 'fas fa-exclamation-circle text-rose-600'"></i>
            <span>{{ metricsAlert.message }}</span>
          </div>
          <button @click="metricsAlert.show = false" class="text-slate-400 hover:text-slate-600 cursor-pointer">
            <i class="fas fa-times text-xs"></i>
          </button>
        </div>

        <!-- 5-Column Metrics Inputs Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <!-- Metric 1: Number of Refinance Beneficiaries -->
          <div class="bg-slate-50/70 p-4 rounded-xl border border-slate-200/70 hover:border-teal-300 focus-within:border-teal-500 focus-within:bg-white transition-all space-y-2">
            <div class="flex items-center gap-2">
              <div class="w-7 h-7 rounded-lg bg-teal-50 text-[#008795] flex items-center justify-center text-xs shrink-0">
                <i class="fas fa-users"></i>
              </div>
              <label class="text-[11px] font-bold uppercase tracking-wider text-slate-500 truncate" title="Number of Refinance Beneficiaries">
                Refinance Beneficiaries
              </label>
            </div>
            <input
              v-model="homeMetrics.refinanceBeneficiaries"
              type="text"
              placeholder="e.g. 25,400+"
              class="w-full px-3 py-2 text-sm font-bold text-slate-800 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition"
            />
            <p class="text-[10px] text-slate-400">Position 1 • Refinance Beneficiaries</p>
          </div>

          <!-- Metric 2: Number of Interest Subsidies -->
          <div class="bg-slate-50/70 p-4 rounded-xl border border-slate-200/70 hover:border-teal-300 focus-within:border-teal-500 focus-within:bg-white transition-all space-y-2">
            <div class="flex items-center gap-2">
              <div class="w-7 h-7 rounded-lg bg-teal-50 text-[#008795] flex items-center justify-center text-xs shrink-0">
                <i class="fas fa-percentage"></i>
              </div>
              <label class="text-[11px] font-bold uppercase tracking-wider text-slate-500 truncate" title="Number of Interest Subsidies">
                Interest Subsidies
              </label>
            </div>
            <input
              v-model="homeMetrics.interestSubsidies"
              type="text"
              placeholder="e.g. 18,250+"
              class="w-full px-3 py-2 text-sm font-bold text-slate-800 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition"
            />
            <p class="text-[10px] text-slate-400">Position 2 • Interest Subsidies</p>
          </div>

          <!-- Metric 3: Partner Banks -->
          <div class="bg-slate-50/70 p-4 rounded-xl border border-slate-200/70 hover:border-teal-300 focus-within:border-teal-500 focus-within:bg-white transition-all space-y-2">
            <div class="flex items-center gap-2">
              <div class="w-7 h-7 rounded-lg bg-teal-50 text-[#008795] flex items-center justify-center text-xs shrink-0">
                <i class="fas fa-landmark"></i>
              </div>
              <label class="text-[11px] font-bold uppercase tracking-wider text-slate-500 truncate" title="Partner Banks">
                Partner Banks
              </label>
            </div>
            <input
              v-model="homeMetrics.partnerBanks"
              type="text"
              placeholder="e.g. 14+"
              class="w-full px-3 py-2 text-sm font-bold text-slate-800 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition"
            />
            <p class="text-[10px] text-slate-400">Position 3 • Partner Banks</p>
          </div>

          <!-- Metric 4: Active Loan Schemes -->
          <div class="bg-slate-50/70 p-4 rounded-xl border border-slate-200/70 hover:border-teal-300 focus-within:border-teal-500 focus-within:bg-white transition-all space-y-2">
            <div class="flex items-center gap-2">
              <div class="w-7 h-7 rounded-lg bg-teal-50 text-[#008795] flex items-center justify-center text-xs shrink-0">
                <i class="fas fa-file-invoice-dollar"></i>
              </div>
              <label class="text-[11px] font-bold uppercase tracking-wider text-slate-500 truncate" title="Active Loan Schemes">
                Active Loan Schemes
              </label>
            </div>
            <input
              v-model="homeMetrics.activeLoanSchemes"
              type="text"
              placeholder="e.g. 8+"
              class="w-full px-3 py-2 text-sm font-bold text-slate-800 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition"
            />
            <p class="text-[10px] text-slate-400">Position 4 • Active Schemes</p>
          </div>

          <!-- Metric 5: Total Funds Disbursed -->
          <div class="bg-slate-50/70 p-4 rounded-xl border border-slate-200/70 hover:border-teal-300 focus-within:border-teal-500 focus-within:bg-white transition-all space-y-2">
            <div class="flex items-center gap-2">
              <div class="w-7 h-7 rounded-lg bg-teal-50 text-[#008795] flex items-center justify-center text-xs shrink-0">
                <i class="fas fa-coins"></i>
              </div>
              <label class="text-[11px] font-bold uppercase tracking-wider text-slate-500 truncate" title="Total Funds Disbursed">
                Total Funds Disbursed
              </label>
            </div>
            <input
              v-model="homeMetrics.totalFundsDisbursed"
              type="text"
              placeholder="e.g. Rs. 4,850M+"
              class="w-full px-3 py-2 text-sm font-bold text-slate-800 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition"
            />
            <p class="text-[10px] text-slate-400">Position 5 • Funds Disbursed</p>
          </div>
        </div>
      </section>

      <!-- 4. MAIN 2-COLUMN CONTENT GRID (70% / 30% SPLIT) -->
      <section class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        <!-- Left Column: Recent Publications & Activity (8 cols on lg) -->
        <div class="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col">
          <!-- Card Header -->
          <div class="p-5 sm:px-6 sm:py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 class="text-lg font-bold text-slate-900 tracking-tight">Recent Publications</h2>
              <p class="text-xs text-slate-400 mt-0.5">Latest published official reports, action plans, and circulars</p>
            </div>
            <router-link
              :to="{ name: 'admin-publications' }"
              class="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1.5 transition-colors group self-start sm:self-auto cursor-pointer"
            >
              <span>View All</span>
              <i class="fas fa-arrow-right text-[11px] group-hover:translate-x-0.5 transition-transform"></i>
            </router-link>
          </div>

          <!-- Loading State -->
          <div v-if="isLoadingPublications" class="p-12 text-center">
            <div class="w-9 h-9 border-3 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p class="text-xs font-semibold text-slate-500">Loading recent publications...</p>
          </div>

          <!-- Empty State -->
          <div v-else-if="recentPublications.length === 0" class="p-12 text-center space-y-3">
            <div class="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <i class="fas fa-file-invoice text-lg"></i>
            </div>
            <div>
              <p class="text-sm font-bold text-slate-700">No Publications Found</p>
              <p class="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                No official publications have been uploaded yet. Upload your first action plan or circular to get started.
              </p>
            </div>
            <router-link
              :to="{ name: 'admin-publications' }"
              class="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
            >
              <i class="fas fa-plus text-[10px]"></i>
              <span>Upload Publication</span>
            </router-link>
          </div>

          <!-- Publications Table -->
          <div v-else class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead class="bg-slate-50/75 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <tr>
                  <th class="py-3 px-6 text-left">Document Title</th>
                  <th class="py-3 px-4 text-left">Category / Year</th>
                  <th class="py-3 px-4 text-left">Release Date</th>
                  <th class="py-3 px-4 text-left">Status</th>
                  <th class="py-3 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 text-xs">
                <tr
                  v-for="doc in recentPublications"
                  :key="doc.id"
                  class="hover:bg-slate-50/70 transition-colors group"
                >
                  <!-- Document Title -->
                  <td class="py-3.5 px-6">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-lg bg-teal-50 border border-teal-100/80 flex items-center justify-center text-teal-600 shrink-0">
                        <i class="fas fa-file-pdf text-xs"></i>
                      </div>
                      <div class="min-w-0">
                        <p class="font-bold text-slate-800 group-hover:text-teal-700 transition-colors truncate max-w-xs sm:max-w-md">
                          {{ doc.title }}
                        </p>
                        <p class="text-[11px] text-slate-400 truncate">
                          {{ doc.fileName || doc.fileSize || 'PDF Document' }}
                        </p>
                      </div>
                    </div>
                  </td>

                  <!-- Category / Year Badge -->
                  <td class="py-3.5 px-4 whitespace-nowrap">
                    <span class="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                      {{ doc.year ? `FY ${doc.year}` : 'Action Plan' }}
                    </span>
                  </td>

                  <!-- Release Date -->
                  <td class="py-3.5 px-4 text-slate-500 whitespace-nowrap font-medium">
                    {{ formatDate(doc.releaseDate) }}
                  </td>

                  <!-- Status -->
                  <td class="py-3.5 px-4 whitespace-nowrap">
                    <span
                      v-if="doc.active !== false"
                      class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200"
                    >
                      <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                      Published
                    </span>
                    <span
                      v-else
                      class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200"
                    >
                      <span class="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                      Inactive
                    </span>
                  </td>

                  <!-- Actions -->
                  <td class="py-3.5 px-6 text-right whitespace-nowrap">
                    <div class="flex items-center justify-end gap-1.5">
                      <a
                        v-if="getPdfUrl(doc) && getPdfUrl(doc) !== '#'"
                        :href="getPdfUrl(doc)"
                        target="_blank"
                        class="p-1.5 rounded-lg text-slate-400 hover:text-teal-600 hover:bg-teal-50 transition cursor-pointer"
                        title="View Document"
                      >
                        <i class="fas fa-external-link-alt text-xs"></i>
                      </a>
                      <router-link
                        :to="{ name: 'admin-publications' }"
                        class="p-1.5 rounded-lg text-slate-400 hover:text-teal-600 hover:bg-teal-50 transition cursor-pointer"
                        title="Manage in Publications"
                      >
                        <i class="fas fa-edit text-xs"></i>
                      </router-link>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Right Column: Quick Publishing Shortcuts (4 cols on lg) -->
        <div class="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          <div>
            <h2 class="text-lg font-bold text-slate-900 tracking-tight">Quick Actions</h2>
            <p class="text-xs text-slate-400 mt-0.5">Jump directly to content workflows</p>
          </div>

          <div class="space-y-2.5">
            <!-- Shortcut 1: Publish Report / Circular -->
            <router-link
              :to="{ name: 'admin-publications' }"
              class="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/80 transition-all group cursor-pointer"
            >
              <div class="flex items-center gap-3.5">
                <div class="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shrink-0 group-hover:scale-105 transition-transform">
                  <i class="fas fa-file-upload text-sm"></i>
                </div>
                <div>
                  <p class="text-xs font-bold text-slate-800 group-hover:text-teal-700 transition-colors">
                    Publish Report / Circular
                  </p>
                  <p class="text-[11px] text-slate-400">Deploy new reports &amp; circulars</p>
                </div>
              </div>
              <i class="fas fa-chevron-right text-xs text-slate-300 group-hover:text-teal-600 group-hover:translate-x-1 transition-all"></i>
            </router-link>

            <!-- Shortcut 2: Add Department Official -->
            <router-link
              :to="{ name: 'manage-team' }"
              class="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/80 transition-all group cursor-pointer"
            >
              <div class="flex items-center gap-3.5">
                <div class="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 group-hover:scale-105 transition-transform">
                  <i class="fas fa-user-plus text-sm"></i>
                </div>
                <div>
                  <p class="text-xs font-bold text-slate-800 group-hover:text-blue-700 transition-colors">
                    Add Department Official
                  </p>
                  <p class="text-[11px] text-slate-400">Update personnel &amp; phone directory</p>
                </div>
              </div>
              <i class="fas fa-chevron-right text-xs text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all"></i>
            </router-link>

            <!-- Shortcut 3: Update Loan Schemes -->
            <router-link
              :to="{ name: 'manage-schemes' }"
              class="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/80 transition-all group cursor-pointer"
            >
              <div class="flex items-center gap-3.5">
                <div class="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 group-hover:scale-105 transition-transform">
                  <i class="fas fa-hand-holding-usd text-sm"></i>
                </div>
                <div>
                  <p class="text-xs font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">
                    Update Loan Schemes
                  </p>
                  <p class="text-[11px] text-slate-400">Manage credit &amp; subsidy facilities</p>
                </div>
              </div>
              <i class="fas fa-chevron-right text-xs text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all"></i>
            </router-link>

            <!-- Shortcut 4: Upload Gallery Media -->
            <router-link
              to="/admin/gallery"
              class="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/80 transition-all group cursor-pointer"
            >
              <div class="flex items-center gap-3.5">
                <div class="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0 group-hover:scale-105 transition-transform">
                  <i class="fas fa-images text-sm"></i>
                </div>
                <div>
                  <p class="text-xs font-bold text-slate-800 group-hover:text-amber-700 transition-colors">
                    Upload Gallery Media
                  </p>
                  <p class="text-[11px] text-slate-400">Post field visits &amp; photo albums</p>
                </div>
              </div>
              <i class="fas fa-chevron-right text-xs text-slate-300 group-hover:text-amber-600 group-hover:translate-x-1 transition-all"></i>
            </router-link>
          </div>
        </div>

      </section>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useAuthStore } from '../Stores/authStore';
import axios from '../axiosInstance';

const authStore = useAuthStore();

// Dynamic KPI Statistics
const stats = reactive({
  publicationsCount: 0,
  officialsCount: 0,
  schemesCount: 0,
  mediaCount: 0
});

const isLoadingStats = ref(true);
const isLoadingPublications = ref(true);
const recentPublications = ref([]);

// Homepage Key Metrics Configuration State
const homeMetrics = reactive({
  refinanceBeneficiaries: '25,400+',
  interestSubsidies: '18,250+',
  partnerBanks: '14+',
  activeLoanSchemes: '8+',
  totalFundsDisbursed: 'Rs. 4,850M+'
});

const isLoadingMetrics = ref(false);
const isSavingMetrics = ref(false);
const metricsAlert = reactive({
  show: false,
  type: 'success',
  message: ''
});

const fetchHomeMetrics = async () => {
  isLoadingMetrics.value = true;
  try {
    const res = await axios.get('/api/public/home-stats');
    if (res?.data) {
      if (res.data.refinanceBeneficiaries) homeMetrics.refinanceBeneficiaries = res.data.refinanceBeneficiaries;
      if (res.data.interestSubsidies) homeMetrics.interestSubsidies = res.data.interestSubsidies;
      if (res.data.partnerBanks) homeMetrics.partnerBanks = res.data.partnerBanks;
      if (res.data.activeLoanSchemes) homeMetrics.activeLoanSchemes = res.data.activeLoanSchemes;
      const funds = res.data.totalFundsDisbursed || res.data.totalFundDisbursed;
      if (funds) homeMetrics.totalFundsDisbursed = funds;
    }
  } catch (error) {
    console.warn('Could not fetch home stats from backend, keeping default metrics:', error);
  } finally {
    isLoadingMetrics.value = false;
  }
};

const saveHomeMetrics = async () => {
  isSavingMetrics.value = true;
  metricsAlert.show = false;
  try {
    const payload = {
      refinanceBeneficiaries: homeMetrics.refinanceBeneficiaries,
      interestSubsidies: homeMetrics.interestSubsidies,
      partnerBanks: homeMetrics.partnerBanks,
      activeLoanSchemes: homeMetrics.activeLoanSchemes,
      totalFundsDisbursed: homeMetrics.totalFundsDisbursed,
      totalFundDisbursed: homeMetrics.totalFundsDisbursed
    };
    const res = await axios.put('/api/admin/home-stats', payload);
    if (res?.data) {
      homeMetrics.refinanceBeneficiaries = res.data.refinanceBeneficiaries;
      homeMetrics.interestSubsidies = res.data.interestSubsidies;
      homeMetrics.partnerBanks = res.data.partnerBanks;
      homeMetrics.activeLoanSchemes = res.data.activeLoanSchemes;
      homeMetrics.totalFundsDisbursed = res.data.totalFundsDisbursed || res.data.totalFundDisbursed;
    }
    metricsAlert.show = true;
    metricsAlert.type = 'success';
    metricsAlert.message = 'Homepage Key Metrics successfully updated and saved!';
    setTimeout(() => {
      metricsAlert.show = false;
    }, 4500);
  } catch (error) {
    console.error('Failed to update home stats:', error);
    metricsAlert.show = true;
    metricsAlert.type = 'error';
    metricsAlert.message = 'Failed to update metrics. Please ensure you are logged in and backend is running.';
  } finally {
    isSavingMetrics.value = false;
  }
};

// Format display dates cleanly (e.g. "Oct 12, 2026")
const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return dateStr;
  }
};

// Generate full URL for PDF preview or download
const getPdfUrl = (pub) => {
  if (!pub) return '#';
  const url = pub.url || pub.fileUrl;
  if (!url || url === '#') return '#';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  const baseUrl = axios.defaults.baseURL || 'http://localhost:8096';
  return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
};

// Fetch real dynamic counts and recent documents concurrently
const loadDashboardData = async () => {
  isLoadingStats.value = true;
  isLoadingPublications.value = true;

  try {
    const [pubRes, teamRes, schemeRes, newsRes, galleryRes] = await Promise.allSettled([
      axios.get('/api/v1/publications/all').catch(() => axios.get('/api/v1/publications')),
      axios.get('/api/v1/team-members'),
      axios.get('/api/v1/services').catch(() => axios.get('/api/schemes')),
      axios.get('/api/news'),
      axios.get('/api/v1/gallery')
    ]);

    // 1. Publications & Recent List
    if (pubRes.status === 'fulfilled' && pubRes.value?.data) {
      const pubData = Array.isArray(pubRes.value.data) ? pubRes.value.data : [];
      stats.publicationsCount = pubData.length;
      // Sort recent by ID or releaseDate descending and take top 6
      recentPublications.value = [...pubData].sort((a, b) => (b.id || 0) - (a.id || 0)).slice(0, 6);
    } else {
      stats.publicationsCount = 0;
      recentPublications.value = [];
    }

    // 2. Department Officials
    if (teamRes.status === 'fulfilled' && teamRes.value?.data) {
      const teamData = Array.isArray(teamRes.value.data) ? teamRes.value.data : (teamRes.value.data?.members || []);
      stats.officialsCount = teamData.length;
    } else {
      stats.officialsCount = 0;
    }

    // 3. Financing Schemes
    if (schemeRes.status === 'fulfilled' && schemeRes.value?.data) {
      const schemeData = Array.isArray(schemeRes.value.data) ? schemeRes.value.data : [];
      stats.schemesCount = schemeData.length;
    } else {
      stats.schemesCount = 0;
    }

    // 4. News & Gallery Media Total
    let mediaTotal = 0;
    if (newsRes.status === 'fulfilled' && Array.isArray(newsRes.value?.data)) {
      mediaTotal += newsRes.value.data.length;
    }
    if (galleryRes.status === 'fulfilled' && Array.isArray(galleryRes.value?.data)) {
      mediaTotal += galleryRes.value.data.length;
    }
    stats.mediaCount = mediaTotal;

  } catch (error) {
    console.error('Failed to load dashboard statistics:', error);
  } finally {
    isLoadingStats.value = false;
    isLoadingPublications.value = false;
  }
};

onMounted(() => {
  loadDashboardData();
  fetchHomeMetrics();
});
</script>
