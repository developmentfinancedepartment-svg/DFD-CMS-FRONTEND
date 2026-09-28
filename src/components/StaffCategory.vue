
<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="max-w-6xl mx-auto">
      
      <!-- HEADER -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">Staff Category Management</h1>
          <p class="text-gray-600">Define and organize organizational staff units</p>
        </div>
      </div>

      <!-- FORMS SECTION -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <!-- CREATE CATEGORY -->
        <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h2 class="text-xl font-bold text-gray-800">Add New Category</h2>
          </div>

          <form @submit.prevent="createCategory" class="space-y-5">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Category Name</label>
              <textarea
                v-model="staffCategory"
                rows="2"
                maxlength="199"
                placeholder="Enter staff category name..."
                class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-gray-50 text-gray-800"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-blue-100 flex items-center justify-center gap-2 group"
            >
              <span>Initialize Category</span>
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>
        </div>

        <!-- EDIT CATEGORY -->
        <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h2 class="text-xl font-bold text-gray-800">Update Category</h2>
          </div>

          <form @submit.prevent="editStaffUnit" class="space-y-5">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Select Category</label>
              <select
                v-model="selectedUnitId"
                @change="getUnitByUnitId"
                class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition bg-gray-50 text-gray-800"
              >
                <option value="" disabled>Choose a category to modify</option>
                <option v-for="unit in allStaffUnits" :key="unit.id" :value="unit.id">
                  ID: {{ unit.id }} - {{ unit.staffUnit }}
                </option>
              </select>
            </div>

            <div v-if="selectedStaffUnit" class="space-y-5">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Modify Name</label>
                <textarea
                  v-model="selectedStaffUnit.staffUnit"
                  rows="2"
                  maxlength="199"
                  class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition bg-gray-50 text-gray-800"
                ></textarea>
              </div>
              <button
                type="submit"
                class="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-purple-100"
              >
                Save Changes
              </button>
            </div>
            <div v-else class="h-[140px] flex items-center justify-center border-2 border-dashed border-gray-100 rounded-xl text-gray-400 italic text-sm">
              Select a category above to begin editing
            </div>
          </form>
        </div>
      </div>

      <!-- EXISTING CATEGORIES TABLE -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
          <h2 class="text-lg font-bold text-gray-800">Category Registry</h2>
          <div class="flex gap-2">
            <span class="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
              {{ allStaffUnits.length }} Units Recorded
            </span>
          </div>
        </div>
        
        <div class="overflow-x-auto">
          <table v-if="allStaffUnits.length" class="w-full text-left border-collapse text-sm">
            <thead>
              <tr class="bg-gray-50/50 border-b border-gray-100 font-semibold text-gray-700">
                <th class="px-6 py-4">Unit Name</th>
                <th class="px-6 py-4 text-center">Headcount</th>
                <th class="px-6 py-4">Registry Date</th>
                <th class="px-6 py-4 text-center">Status</th>
                <th class="px-6 py-4 text-right">Operations</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50 text-gray-600">
              <tr 
                v-for="unit in allStaffUnits" 
                :key="unit.id"
                class="hover:bg-blue-50/20 transition-all duration-200 group"
              >
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <span class="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{{ unit.staffUnit }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 text-center">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {{ unit.staffDetails.length }} Staff
                  </span>
                </td>
                <td class="px-6 py-4">
                  <div class="flex flex-col text-[11px] font-medium">
                    <span class="text-gray-400 uppercase tracking-wider mb-0.5">Established</span>
                    <span class="text-gray-700">{{ unit.createdAt.slice(0, 10) }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 text-center">
                  <button
                    @click="unit.status === 0 ? activeStaffUnit(unit.id, unit.staffUnit) : inactiveStaffUnit(unit.id, unit.staffUnit)"
                    :class="[
                      'px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-300 border',
                      unit.status === 1 
                        ? 'bg-green-100 text-green-700 hover:bg-green-200 border-green-200' 
                        : 'bg-red-100 text-red-700 hover:bg-red-200 border-red-200'
                    ]"
                  >
                    {{ unit.status === 1 ? 'ACTIVE' : 'INACTIVE' }}
                  </button>
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="flex justify-end gap-3 transition-all duration-300">
                    <button
                      @click="deleteStaffUnit(unit.id, unit.staffUnit)"
                      class="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all"
                      title="Remove Registry"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-else class="py-24 text-center">
             <div class="flex flex-col items-center gap-4 text-gray-400">
               <div class="p-6 bg-gray-50 rounded-full">
                 <svg class="w-12 h-12 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
               </svg>
               </div>
               <span class="font-medium italic">No staff categories currently defined.</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import instance from "@/axiosInstance";
import { useAuthStore } from "@/Stores/authStore";

export default {
  setup() {
    const authStore = useAuthStore();
    const staffCategory = ref("");
    const allStaffUnits = ref([]);
    const selectedUnitId = ref("");
    const selectedStaffUnit = ref("");

    const fetchAllStaffUnits = async () => {
      try {
        const response = await instance.get("/api/public/staff/units");
        allStaffUnits.value = response.data;
      } catch (error) {
        console.error("Error fetching staff units", error);
      }
    };

    const createCategory = async () => {
      try {
        await instance.post("/api/admin/staff/units", { staffUnit: staffCategory.value });
        alert(`${staffCategory.value} created successfully!`);
        staffCategory.value = "";
        await fetchAllStaffUnits();
      } catch (error) {
        console.error(error);
      }
    };

    const getUnitByUnitId = async () => {
      if (!selectedUnitId.value) return;
      try {
        const response = await instance.get(`/api/admin/staff/units/${selectedUnitId.value}`);
        selectedStaffUnit.value = response.data;
      } catch (error) {
        console.error(error);
      }
    };

    const editStaffUnit = async () => {
      if (!selectedUnitId.value) return;
      try {
        await instance.put(`/api/admin/staff/units/${selectedUnitId.value}`, {
          staffUnit: selectedStaffUnit.value.staffUnit,
        });
        alert("Staff category updated!");
        selectedUnitId.value = "";
        selectedStaffUnit.value = "";
        await fetchAllStaffUnits();
      } catch (error) {
        console.error(error);
      }
    };

    const activeStaffUnit = async (id, staffUnit) => {
      if (confirm(`Activate ${staffUnit}?`)) {
        await instance.put(`/api/admin/staff/units/${id}/status`, { status: 1 });
        await fetchAllStaffUnits();
      }
    };

    const inactiveStaffUnit = async (id, staffUnit) => {
      if (confirm(`Deactivate ${staffUnit}?`)) {
        await instance.put(`/api/admin/staff/units/${id}/status`, { status: 0 });
        await fetchAllStaffUnits();
      }
    };

    const deleteStaffUnit = async (id, staffUnit) => {
      if (confirm(`Delete ${staffUnit}?`)) {
        await instance.delete(`/api/admin/staff/units/${id}`);
        allStaffUnits.value = allStaffUnits.value.filter((unit) => unit.id !== id);
      }
    };

    onMounted(fetchAllStaffUnits);

    return {
      staffCategory,
      allStaffUnits,
      selectedUnitId,
      selectedStaffUnit,
      createCategory,
      getUnitByUnitId,
      editStaffUnit,
      activeStaffUnit,
      inactiveStaffUnit,
      deleteStaffUnit,
      authStore,
    };
  },
};
</script>

<style scoped>
.backdrop-blur-lg {
  backdrop-filter: blur(12px);
}
</style>
