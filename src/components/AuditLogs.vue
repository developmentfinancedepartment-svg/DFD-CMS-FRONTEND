<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="max-w-6xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">System Audit Logs</h1>
          <p class="text-gray-600">Track all administrative actions across the system</p>
        </div>
        <div class="flex gap-4">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search by admin name..."
            class="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition w-64"
          />
          <button 
            @click="fetchLogs"
            class="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
            title="Refresh logs"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Status Indicators -->
      <div v-if="isLoading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <div v-else-if="error" class="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8">
        {{ error }}
      </div>

      <!-- Logs Table -->
      <div v-else class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-50 border-b border-gray-100 font-semibold text-gray-700">
                <th class="px-6 py-4">Timestamp</th>
                <th class="px-6 py-4">Admin User</th>
                <th class="px-6 py-4">Action</th>
                <th class="px-6 py-4">Entity Type</th>
                <th class="px-6 py-4">Entity ID</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr v-for="log in filteredLogs" :key="log.id" class="hover:bg-blue-50/20 transition">
                <td class="px-6 py-4 text-sm text-gray-500">{{ formatDate(log.dateTime) }}</td>
                <td class="px-6 py-4">
                  <span class="font-medium text-gray-800">{{ log.userName }}</span>
                </td>
                <td class="px-6 py-4 text-center">
                  <span 
                    :class="[
                      'px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border',
                      getActionColor(log.task)
                    ]"
                  >
                    {{ log.task }}
                  </span>
                </td>
                <td class="px-6 py-4 text-gray-600">{{ log.tableName }}</td>
                <td class="px-6 py-4 font-mono text-xs text-gray-400">{{ log.affectedId }}</td>
              </tr>
              <tr v-if="filteredLogs.length === 0">
                <td colspan="5" class="px-6 py-12 text-center text-gray-400">
                   <div class="flex flex-col items-center gap-2">
                     <svg class="w-12 h-12 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                     </svg>
                     <span>No transaction logs found matching your criteria.</span>
                   </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import axios from '../axiosInstance'

export default {
  name: 'AuditLogs',
  setup() {
    const logs = ref([])
    const searchQuery = ref('')
    const isLoading = ref(false)
    const error = ref(null)

    const fetchLogs = async () => {
      isLoading.value = true
      error.value = null
      try {
        const res = await axios.get('/api/superadmin/logs')
        // Sort by dateTime descending
        if (Array.isArray(res.data)) {
          logs.value = res.data.sort((a, b) => (b.dateTime || '').localeCompare(a.dateTime || ''))
        } else {
          logs.value = []
        }
      } catch (err) {
        console.error('Failed to fetch logs:', err)
        error.value = 'Failed to load audit logs. Please ensure you are logged in as Super Admin.'
      } finally {
        isLoading.value = false
      }
    }

    const filteredLogs = computed(() => {
      if (!searchQuery.value) return logs.value
      const q = searchQuery.value.toLowerCase()
      return logs.value.filter(l => 
        (l.userName?.toLowerCase() || '').includes(q) || 
        (l.task?.toLowerCase() || '').includes(q) ||
        (l.tableName?.toLowerCase() || '').includes(q)
      )
    })

    const formatDate = (dateStr) => {
      if (!dateStr) return 'N/A'
      return dateStr
    }

    const getActionColor = (task) => {
      if (!task) return 'bg-gray-100 border-gray-200 text-gray-700'
      const t = task.toUpperCase()
      if (t.includes('CREATE')) return 'bg-blue-100 border-blue-200 text-blue-700'
      if (t.includes('UPDATE')) return 'bg-yellow-100 border-yellow-200 text-yellow-700'
      if (t.includes('DELETE')) return 'bg-red-100 border-red-200 text-red-700'
      if (t.includes('ACTIVATE')) return 'bg-green-100 border-green-200 text-green-700'
      if (t.includes('INACTIVATE')) return 'bg-orange-100 border-orange-200 text-orange-700'
      return 'bg-gray-100 border-gray-200 text-gray-700'
    }

    onMounted(fetchLogs)

    return { logs, searchQuery, filteredLogs, formatDate, getActionColor, fetchLogs, isLoading, error }
  }
}
</script>
