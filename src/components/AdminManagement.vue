<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="max-w-6xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">Admin Management</h1>
          <p class="text-gray-600">Create, edit and manage administrative users</p>
        </div>
        <button 
          @click="openAddModal"
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition flex items-center gap-2 shadow-lg hover:shadow-blue-200"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add New Admin
        </button>
      </div>

      <!-- Admin Table -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50 border-b border-gray-100 font-semibold text-gray-700">
              <th class="px-6 py-4">Username</th>
              <th class="px-6 py-4">Email</th>
              <th class="px-6 py-4 text-center">Status</th>
              <th class="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="admin in admins" :key="admin.userId" class="hover:bg-blue-50/30 transition">
              <td class="px-6 py-4 font-medium text-gray-800">{{ admin.username }}</td>
              <td class="px-6 py-4 text-gray-600">{{ admin.email }}</td>
              <td class="px-6 py-4 text-center">
                <button 
                  @click="toggleStatus(admin)"
                  :class="[
                    'px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-300 border',
                    admin.active 
                      ? 'bg-green-100 text-green-700 hover:bg-green-200 border-green-200' 
                      : 'bg-red-100 text-red-700 hover:bg-red-200 border-red-200'
                  ]"
                >
                  {{ admin.active ? 'ACTIVE' : 'INACTIVE' }}
                </button>
              </td>
              <td class="px-6 py-4 text-right flex justify-end gap-3">
                <button 
                  @click="openEditModal(admin)"
                  class="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button 
                  @click="confirmDelete(admin)"
                  class="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </td>
            </tr>
            <tr v-if="admins.length === 0">
              <td colspan="4" class="px-6 py-10 text-center text-gray-500 italic">No admins found.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal for Add/Edit -->
    <div v-if="showModal" class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[100] px-4">
      <div class="bg-white rounded-2xl w-full max-w-md shadow-2xl p-8 animate-in fade-in zoom-in duration-200">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">{{ isEdit ? 'Edit Admin' : 'Add New Admin' }}</h2>
        
        <form @submit.prevent="saveAdmin" class="space-y-4">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Username</label>
            <input 
              v-model="form.username" 
              type="text" 
              required 
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              :disabled="isEdit"
            />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input 
              v-model="form.email" 
              type="email" 
              required 
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>
          <div v-if="!isEdit">
            <label class="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <input 
              v-model="form.password" 
              type="password" 
              required 
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>
          <div v-if="isEdit">
            <label class="block text-sm font-semibold text-gray-700 mb-1">New Password (Leave blank to keep current)</label>
            <input 
              v-model="form.password" 
              type="password" 
              placeholder="••••••••"
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>
          
          <div class="flex items-center gap-2 pt-2">
            <input 
              id="active-check" 
              v-model="form.active" 
              type="checkbox" 
              class="w-4 h-4 text-blue-600 rounded"
            />
            <label for="active-check" class="text-sm font-semibold text-gray-700">Account Active</label>
          </div>

          <div class="flex gap-4 pt-6">
            <button 
              type="button" 
              @click="showModal = false"
              class="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button 
              type="submit"
              class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-100"
            >
              {{ isEdit ? 'Update' : 'Create' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from '../axiosInstance'

export default {
  name: 'AdminManagement',
  setup() {
    const admins = ref([])
    const showModal = ref(false)
    const isEdit = ref(false)
    const targetId = ref('')
    const form = ref({
      username: '',
      email: '',
      password: '',
      active: true
    })

    const fetchAdmins = async () => {
      try {
        const res = await axios.get('/api/superadmin/admins')
        admins.value = res.data
      } catch (err) {
        console.error('Failed to fetch admins:', err)
        alert('Error loading admins. Make sure you are a Super Admin.')
      }
    }

    const openAddModal = () => {
      isEdit.value = false
      form.value = { username: '', email: '', password: '', active: true }
      showModal.value = true
    }

    const openEditModal = (admin) => {
      isEdit.value = true
      targetId.value = admin.userId
      form.value = { 
        username: admin.username, 
        email: admin.email, 
        password: '', 
        active: admin.active 
      }
      showModal.value = true
    }

    const saveAdmin = async () => {
      try {
        if (isEdit.value) {
          await axios.put(`/api/superadmin/admins/${targetId.value}`, form.value)
        } else {
          await axios.post('/api/superadmin/admins/create', form.value)
        }
        showModal.value = false
        fetchAdmins()
      } catch (err) {
        alert(err.response?.data || 'Failed to save admin')
      }
    }

    const toggleStatus = async (admin) => {
      try {
        await axios.put(`/api/superadmin/admins/${admin.userId}/status`, { active: !admin.active })
        fetchAdmins()
      } catch (err) {
        alert('Failed to update status')
      }
    }

    const confirmDelete = async (admin) => {
      if (confirm(`Are you sure you want to delete admin "${admin.username}"? This action cannot be undone.`)) {
        try {
          await axios.delete(`/api/superadmin/admins/${admin.userId}`)
          fetchAdmins()
        } catch (err) {
          alert('Failed to delete admin')
        }
      }
    }

    onMounted(fetchAdmins)

    return {
      admins, showModal, isEdit, form,
      openAddModal, openEditModal, saveAdmin, toggleStatus, confirmDelete
    }
  }
}
</script>
