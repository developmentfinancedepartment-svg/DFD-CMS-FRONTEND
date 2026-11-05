<template>
  <div class="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-[#002025] via-[#002a31] to-[#003842] text-white relative overflow-hidden font-sans">
    <!-- Ambient Background Glows -->
    <div class="pointer-events-none absolute -top-24 left-1/4 w-[32rem] h-[32rem] rounded-full bg-[#008795]/15 blur-3xl"></div>
    <div class="pointer-events-none absolute bottom-0 right-1/4 w-[28rem] h-[28rem] rounded-full bg-cyan-500/10 blur-3xl"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-6 py-8 space-y-8">
      <!-- 1. HERO WELCOME SECTION -->
      <section class="relative rounded-2xl bg-gradient-to-r from-[#003842] via-[#004652] to-[#003842] border border-cyan-500/30 p-7 sm:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.45)] overflow-hidden">
        <div class="pointer-events-none absolute -right-16 -top-16 w-72 h-72 rounded-full bg-[#008795]/25 blur-3xl"></div>

        <div class="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div class="space-y-3 max-w-3xl">
            <div class="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]"></span>
              Active Session Verified • Super Administrator
            </div>

            <h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Welcome back, Administrator - Information Technology Management Division (ITMD)
            </h1>

            <p class="text-sm sm:text-base text-cyan-100/75 leading-relaxed">
              Department of Development Finance (DFD) • Ministry of Finance, Economic Stabilization &amp; National Policies. Manage official circulars, performance reports, staff directories, and public bulletins from a unified command center.
            </p>
          </div>

          <!-- Primary Action Buttons -->
          <div class="flex flex-wrap items-center gap-3 shrink-0">
            <router-link
              :to="{ name: 'action-home' }"
              class="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-gradient-to-r from-[#008795] to-cyan-600 hover:from-[#009fb0] hover:to-cyan-500 text-white text-sm font-bold shadow-[0_10px_25px_rgba(0,135,149,0.4)] transition-all hover:-translate-y-0.5"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Upload Document
            </router-link>

            <router-link
              :to="{ name: 'category-staff' }"
              class="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-[#002025]/70 hover:bg-[#002025] border border-cyan-400/30 text-cyan-100 hover:text-white text-sm font-bold transition-all"
            >
              <svg class="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Staff Directory
            </router-link>

            <button
              type="button"
              @click="showLogoutModal = true"
              class="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/15 hover:bg-red-600/90 border border-red-500/30 text-red-300 hover:text-white text-sm font-bold transition-all"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              End Session
            </button>
          </div>
        </div>
      </section>

      <!-- 2. METRICS & KPI CARDS (4 CARDS) -->
      <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <!-- Card 1: Total Documents -->
        <div class="group rounded-2xl bg-[#003842]/85 backdrop-blur-md border border-cyan-500/25 hover:border-cyan-400/50 p-6 shadow-[0_12px_35px_rgba(0,0,0,0.35)] transition-all">
          <div class="flex items-center justify-between">
            <span class="text-xs font-extrabold uppercase tracking-widest text-cyan-200/70">Total Documents</span>
            <div class="h-11 w-11 rounded-xl bg-[#008795]/25 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.25)]">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <div class="mt-4 flex items-baseline gap-3">
            <span class="text-3xl font-black tracking-tight text-white">1,428</span>
            <span class="text-xs font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-400/25 px-2 py-0.5 rounded-md">+12.4%</span>
          </div>
          <p class="mt-2 text-xs text-cyan-100/65 font-medium">Indexed circulars, reports &amp; specifications</p>
        </div>

        <!-- Card 2: Active Staff -->
        <div class="group rounded-2xl bg-[#003842]/85 backdrop-blur-md border border-cyan-500/25 hover:border-cyan-400/50 p-6 shadow-[0_12px_35px_rgba(0,0,0,0.35)] transition-all">
          <div class="flex items-center justify-between">
            <span class="text-xs font-extrabold uppercase tracking-widest text-cyan-200/70">Active Staff</span>
            <div class="h-11 w-11 rounded-xl bg-[#008795]/25 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.25)]">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
          <div class="mt-4 flex items-baseline gap-3">
            <span class="text-3xl font-black tracking-tight text-white">64</span>
            <span class="text-xs font-bold text-cyan-300 bg-cyan-500/15 border border-cyan-400/25 px-2 py-0.5 rounded-md">8 Units</span>
          </div>
          <p class="mt-2 text-xs text-cyan-100/65 font-medium">Verified personnel across DFD divisions</p>
        </div>

        <!-- Card 3: Pending Approvals -->
        <div class="group rounded-2xl bg-[#003842]/85 backdrop-blur-md border border-cyan-500/25 hover:border-cyan-400/50 p-6 shadow-[0_12px_35px_rgba(0,0,0,0.35)] transition-all">
          <div class="flex items-center justify-between">
            <span class="text-xs font-extrabold uppercase tracking-widest text-cyan-200/70">Pending Approvals</span>
            <div class="h-11 w-11 rounded-xl bg-[#008795]/25 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.25)]">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div class="mt-4 flex items-baseline gap-3">
            <span class="text-3xl font-black tracking-tight text-white">07</span>
            <span class="text-xs font-bold text-amber-300 bg-amber-500/15 border border-amber-400/30 px-2 py-0.5 rounded-md">In Review</span>
          </div>
          <p class="mt-2 text-xs text-cyan-100/65 font-medium">Awaiting editorial &amp; compliance sign-off</p>
        </div>

        <!-- Card 4: Security State -->
        <div class="group rounded-2xl bg-[#003842]/85 backdrop-blur-md border border-cyan-500/25 hover:border-cyan-400/50 p-6 shadow-[0_12px_35px_rgba(0,0,0,0.35)] transition-all">
          <div class="flex items-center justify-between">
            <span class="text-xs font-extrabold uppercase tracking-widest text-cyan-200/70">Security State</span>
            <div class="h-11 w-11 rounded-xl bg-[#008795]/25 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.25)]">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
          <div class="mt-4 flex items-baseline gap-3">
            <span class="text-3xl font-black tracking-tight text-emerald-300">Optimal</span>
            <span class="text-xs font-bold text-cyan-300 bg-cyan-500/15 border border-cyan-400/25 px-2 py-0.5 rounded-md">256-Bit TLS</span>
          </div>
          <p class="mt-2 text-xs text-cyan-100/65 font-medium">Cookie JWT session &amp; audit logging active</p>
        </div>
      </section>

      <!-- 3. MAIN CONTENT (GRID LAYOUT) -->
      <section class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left 2 Columns: Recent Document Submissions Table -->
        <div class="lg:col-span-2 rounded-2xl bg-[#003842]/85 backdrop-blur-md border border-cyan-500/25 shadow-[0_15px_40px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col">
          <div class="p-6 border-b border-cyan-500/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 class="text-lg font-extrabold text-white tracking-tight">Recent Document Submissions</h2>
              <p class="text-xs text-cyan-100/65 mt-0.5">Latest official publications and policy files uploaded to DFD</p>
            </div>
            <router-link
              :to="{ name: 'action-home' }"
              class="text-xs font-bold uppercase tracking-wider text-cyan-300 hover:text-white px-3.5 py-2 rounded-xl bg-[#002025]/60 border border-cyan-500/25 hover:border-cyan-400/50 transition-all self-start sm:self-auto"
            >
              View All Documents →
            </router-link>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-[#002025]/60 text-[11px] font-extrabold uppercase tracking-wider text-cyan-200/75 border-b border-cyan-500/20">
                  <th class="py-3.5 px-6">Document Title</th>
                  <th class="py-3.5 px-4">Category</th>
                  <th class="py-3.5 px-4">Upload Date</th>
                  <th class="py-3.5 px-4">Status</th>
                  <th class="py-3.5 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-cyan-500/15 text-sm">
                <tr
                  v-for="doc in recentDocuments"
                  :key="doc.id"
                  class="hover:bg-[#002025]/40 transition-colors"
                >
                  <td class="py-4 px-6">
                    <div class="flex items-center gap-3">
                      <div class="h-9 w-9 rounded-lg bg-[#008795]/20 border border-cyan-400/25 flex items-center justify-center text-cyan-300 shrink-0">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p class="font-bold text-white leading-snug">{{ doc.title }}</p>
                        <p class="text-xs text-cyan-200/60">{{ doc.reference }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="py-4 px-4">
                    <span class="text-xs font-semibold text-cyan-100/85 bg-[#002025]/70 border border-cyan-500/20 px-2.5 py-1 rounded-lg">
                      {{ doc.category }}
                    </span>
                  </td>
                  <td class="py-4 px-4 text-xs font-semibold text-cyan-100/75 whitespace-nowrap">
                    {{ doc.date }}
                  </td>
                  <td class="py-4 px-4">
                    <span
                      v-if="doc.status === 'Published'"
                      class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-400/30"
                    >
                      <span class="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                      Published
                    </span>
                    <span
                      v-else
                      class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-300 border border-amber-400/30"
                    >
                      <span class="h-1.5 w-1.5 rounded-full bg-amber-400"></span>
                      In Review
                    </span>
                  </td>
                  <td class="py-4 px-6 text-right">
                    <router-link
                      :to="doc.route"
                      class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#008795]/25 hover:bg-[#008795] text-cyan-200 hover:text-white border border-cyan-400/30 text-xs font-bold transition-all"
                      title="Download / Manage Document"
                    >
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Right Column: Administrative Shortcuts & Server Heartbeat -->
        <div class="rounded-2xl bg-[#003842]/85 backdrop-blur-md border border-cyan-500/25 p-6 shadow-[0_15px_40px_rgba(0,0,0,0.4)] flex flex-col justify-between space-y-6">
          <div class="space-y-4">
            <div>
              <h2 class="text-lg font-extrabold text-white tracking-tight">Administrative Shortcuts</h2>
              <p class="text-xs text-cyan-100/65 mt-0.5">Direct access to frequent ITMD publishing workflows</p>
            </div>

            <div class="space-y-3">
              <!-- Shortcut 1: Upload Circular -->
              <router-link
                :to="{ name: 'action-home' }"
                class="group flex items-center justify-between p-4 rounded-xl bg-[#002025]/65 hover:bg-[#008795]/30 border border-cyan-500/20 hover:border-cyan-400/45 transition-all"
              >
                <div class="flex items-center gap-3.5">
                  <div class="h-10 w-10 rounded-xl bg-[#008795]/25 border border-cyan-400/30 flex items-center justify-center text-cyan-300 group-hover:scale-105 transition-transform">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-bold text-white">Upload Circular</p>
                    <p class="text-xs text-cyan-100/65">Publish action plans &amp; PDFs</p>
                  </div>
                </div>
                <span class="text-cyan-400 group-hover:translate-x-1 transition-transform">→</span>
              </router-link>

              <!-- Shortcut 2: Add Staff Member -->
              <router-link
                :to="{ name: 'members-staff' }"
                class="group flex items-center justify-between p-4 rounded-xl bg-[#002025]/65 hover:bg-[#008795]/30 border border-cyan-500/20 hover:border-cyan-400/45 transition-all"
              >
                <div class="flex items-center gap-3.5">
                  <div class="h-10 w-10 rounded-xl bg-[#008795]/25 border border-cyan-400/30 flex items-center justify-center text-cyan-300 group-hover:scale-105 transition-transform">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-bold text-white">Add Staff Member</p>
                    <p class="text-xs text-cyan-100/65">Update DFD division directory</p>
                  </div>
                </div>
                <span class="text-cyan-400 group-hover:translate-x-1 transition-transform">→</span>
              </router-link>

              <!-- Shortcut 3: Publish Bulletin -->
              <router-link
                :to="{ name: 'news-home' }"
                class="group flex items-center justify-between p-4 rounded-xl bg-[#002025]/65 hover:bg-[#008795]/30 border border-cyan-500/20 hover:border-cyan-400/45 transition-all"
              >
                <div class="flex items-center gap-3.5">
                  <div class="h-10 w-10 rounded-xl bg-[#008795]/25 border border-cyan-400/30 flex items-center justify-center text-cyan-300 group-hover:scale-105 transition-transform">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-bold text-white">Publish Bulletin</p>
                    <p class="text-xs text-cyan-100/65">Post official news &amp; notices</p>
                  </div>
                </div>
                <span class="text-cyan-400 group-hover:translate-x-1 transition-transform">→</span>
              </router-link>
            </div>
          </div>

          <!-- Server Heartbeat Status -->
          <div class="rounded-xl bg-[#002025]/80 border border-cyan-500/25 p-4 space-y-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span class="text-xs font-extrabold uppercase tracking-wider text-cyan-200">Server Heartbeat</span>
              </div>
              <span class="text-[11px] font-bold text-emerald-400">99.98% Uptime</span>
            </div>
            <div class="grid grid-cols-2 gap-2 text-xs">
              <div class="p-2.5 rounded-lg bg-[#003842]/70 border border-cyan-500/15">
                <p class="text-cyan-200/60 text-[10px] uppercase font-bold">Spring Boot API</p>
                <p class="text-white font-bold mt-0.5">Online • 18ms</p>
              </div>
              <div class="p-2.5 rounded-lg bg-[#003842]/70 border border-cyan-500/15">
                <p class="text-cyan-200/60 text-[10px] uppercase font-bold">TLS Security</p>
                <p class="text-emerald-300 font-bold mt-0.5">256-Bit Active</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- INTEGRATED LOGOUT CONFIRMATION MODAL -->
    <div
      v-if="showLogoutModal"
      @click.self="showLogoutModal = false"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
    >
      <div class="relative w-full max-w-md rounded-2xl bg-[#003842] border border-cyan-500/30 p-7 shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_30px_rgba(6,182,212,0.15)] overflow-hidden">
        <!-- Glowing ambient accents -->
        <div class="pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full bg-cyan-400/15 blur-3xl"></div>
        <div class="pointer-events-none absolute -bottom-16 -left-16 w-40 h-40 rounded-full bg-red-500/15 blur-3xl"></div>

        <div class="relative z-10 flex flex-col items-center text-center">
          <!-- Red logout icon badge -->
          <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/15 border border-red-500/30 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.25)]">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>

          <!-- Title & Subtitle -->
          <h3 class="text-xl font-extrabold tracking-tight text-white">
            Terminate Session?
          </h3>
          <p class="mt-2 text-sm text-cyan-100/80 leading-relaxed">
            Are you sure you want to terminate your current administrative session?
          </p>

          <!-- Actions -->
          <div class="mt-7 flex w-full items-center gap-3">
            <button
              type="button"
              @click="showLogoutModal = false"
              class="flex-1 rounded-xl border border-cyan-400/25 bg-white/5 px-4 py-2.5 text-sm font-bold text-cyan-100 hover:bg-white/10 hover:text-white transition-all"
            >
              Cancel
            </button>
            <button
              type="button"
              @click="confirmLogout"
              class="flex-1 rounded-xl bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-600 px-4 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(225,29,72,0.35)] hover:shadow-[0_10px_25px_rgba(225,29,72,0.5)] transition-all"
            >
              Terminate
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useAuthStore } from "../Stores/authStore";
import router from "@/router";

export default {
  setup() {
    const authStore = useAuthStore();
    const showLogoutModal = ref(false);

    const recentDocuments = ref([
      {
        id: 1,
        title: "Annual Development Finance Action Plan 2026",
        reference: "DFD/AP/2026/01 • PDF (2.4 MB)",
        category: "Action Plan",
        date: "Oct 12, 2026",
        status: "Published",
        route: "/home/action",
      },
      {
        id: 2,
        title: "Q3 Treasury Performance Evaluation Report",
        reference: "DFD/PR/2026/09 • PDF (3.8 MB)",
        category: "Performance Report",
        date: "Oct 10, 2026",
        status: "Published",
        route: "/home/performance",
      },
      {
        id: 3,
        title: "Enterprise Server & Network Hardware Specification",
        reference: "ITMD/HW/2026/14 • PDF (1.6 MB)",
        category: "Hardware Spec",
        date: "Oct 08, 2026",
        status: "In Review",
        route: "/home/hardware_spec",
      },
      {
        id: 4,
        title: "National Development Banking Policy Guidelines",
        reference: "DFD/CIR/2026/22 • PDF (1.9 MB)",
        category: "Circular",
        date: "Oct 05, 2026",
        status: "Published",
        route: "/home/news",
      },
      {
        id: 5,
        title: "Bilateral Concessional Financing Framework Update",
        reference: "DFD/PR/2026/11 • PDF (4.1 MB)",
        category: "Performance Report",
        date: "Oct 02, 2026",
        status: "In Review",
        route: "/home/performance",
      },
    ]);

    const confirmLogout = async () => {
      showLogoutModal.value = false;
      await authStore.logout();
      router.push("/login");
    };

    return {
      authStore,
      showLogoutModal,
      recentDocuments,
      confirmLogout,
    };
  },
};
</script>

