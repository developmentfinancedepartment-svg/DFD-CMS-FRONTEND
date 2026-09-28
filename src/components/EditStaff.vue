<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="max-w-6xl mx-auto">
      
      <!-- HEADER -->
      <div class="mb-10 text-center">
        <h1 class="text-3xl font-bold text-gray-800">Personnel Registry Maintenance</h1>
        <p class="text-gray-600">Database synchronization and profile modification tools</p>
      </div>

      <!-- SEARCH FORM -->
      <div class="max-w-2xl mx-auto mb-12">
        <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 class="text-xl font-bold text-gray-800">Search Protocol</h2>
          </div>

          <form @submit.prevent="getDetailByDetailId(); getUnitsByDetailsId();" class="relative">
            <input
              v-model="query"
              @input="searchByName"
              type="text"
              placeholder="Enter personnel identity..."
              class="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition bg-gray-50 text-gray-800"
            />
            <button
              type="submit"
              class="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 rounded-lg transition-all shadow-md shadow-blue-100 flex items-center gap-2"
            >
              <span>Scan</span>
            </button>
          </form>

          <!-- SEARCH RESULTS -->
          <div v-if="allSearchResult.length" class="mt-6 space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
            <div
              v-for="result in allSearchResult"
              :key="result.id"
              @click="selectSuggestName(result.name, result.id)"
              class="flex items-center justify-between p-4 bg-gray-50 hover:bg-blue-50 border border-gray-100 rounded-xl cursor-pointer transition-all group"
            >
              <div class="flex flex-col">
                <span class="font-bold text-gray-800 group-hover:text-blue-700">{{ result.name }}</span>
                <span class="text-[10px] font-black text-gray-400 uppercase tracking-widest">{{ result.designation }}</span>
              </div>
              <svg class="w-4 h-4 text-gray-300 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- EDIT FORM -->
      <div v-if="selectedDetail" class="max-w-2xl mx-auto">
        <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div class="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h2 class="text-xl font-bold text-gray-800">Modifier Module</h2>
            </div>
            <span 
              :class="[
                'px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border',
                selectedDetail.status === 1 ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'
              ]"
            >
              {{ statusText }}
            </span>
          </div>

          <form @submit.prevent="editStaffDetails" class="space-y-5">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div class="md:col-span-2">
                <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 px-1">Identification</label>
                <input
                  v-model="selectedDetail.name"
                  type="text"
                  disabled
                  class="w-full px-4 py-2 border border-gray-100 rounded-lg bg-gray-50 text-gray-500 font-bold cursor-not-allowed"
                />
              </div>

              <div>
                <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 px-1">Designation</label>
                <input
                  v-model="selectedDetail.designation"
                  :disabled="!isEditing"
                  type="text"
                  class="w-full px-4 py-2 border border-blue-100 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-white text-gray-800 font-medium"
                />
              </div>

              <div>
                <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 px-1">Email Node</label>
                <input
                  v-model="selectedDetail.email"
                  :disabled="!isEditing"
                  type="email"
                  class="w-full px-4 py-2 border border-blue-100 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-white text-gray-800 font-medium"
                />
              </div>

              <div>
                <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 px-1">LinkedIn Sync</label>
                <input
                  v-model="selectedDetail.linkedIn"
                  :disabled="!isEditing"
                  type="text"
                  class="w-full px-4 py-2 border border-blue-100 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-white text-gray-800 font-medium"
                />
              </div>

              <div>
                <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 px-1">Contact Link</label>
                <input
                  v-model="selectedDetail.contactNumber"
                  :disabled="!isEditing"
                  type="text"
                  class="w-full px-4 py-2 border border-blue-100 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-white text-gray-800 font-medium"
                />
              </div>

              <div class="md:col-span-2">
                <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 px-1">Domain Category</label>
                <select
                  v-model="fetchedUnit.id"
                  :disabled="!isEditing"
                  class="w-full px-4 py-2 border border-blue-100 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-white text-gray-800 font-medium"
                >
                  <option disabled value="">Select Categorization</option>
                  <option v-for="unit in allStaffUnits" :key="unit.id" :value="unit.id">
                    {{ unit.staffUnit }}
                  </option>
                </select>
              </div>
            </div>

            <div class="flex gap-4 pt-6">
              <button
                type="button"
                @click="toggleEditMode"
                class="flex-1 py-3 px-6 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300"
                :class="isEditing ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'"
              >
                {{ isEditing ? "Cancel Transaction" : "Enable Modification" }}
              </button>

              <button
                v-if="isEditing"
                type="submit"
                class="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-blue-100"
              >
                Commit Changes
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import instance from "@/axiosInstance"; 
import { debounce } from "vue-debounce";
import { getAllStaffUnits } from "@/Services/staffApi"; 

export default {
  setup() {
    const query = ref("");
    const allSearchResult = ref([]);
    const selectedDetailId = ref("");
    const selectedDetail = ref(null);
    const fetchedUnit = ref({ id: "" });
    const allStaffUnits = ref([]);
    const isEditing = ref(false);

    const statusText = computed({
      get() {
        if (!selectedDetail.value) return "";
        return selectedDetail.value.status === 1 ? "Active" : "Inactive";
      },
      set(value) {
        if (!selectedDetail.value) return;
        selectedDetail.value.status = value === "Active" ? 1 : 0;
      },
    });

    const searchByName = debounce(async () => {
      if (!query.value.trim()) {
        allSearchResult.value = [];
        return;
      }
      try {
        const res = await instance.get("/api/admin/staff/details/search", {
          params: { q: query.value },
        });
        allSearchResult.value = res.data;
      } catch (err) {
        console.error("Search error:", err);
        allSearchResult.value = [];
      }
    }, 300);

    const selectSuggestName = (name, id) => {
      query.value = name;
      selectedDetailId.value = id;
      allSearchResult.value = [];
      getDetailByDetailId();
      getUnitsByDetailsId();
    };

    const getDetailByDetailId = async () => {
      if (!selectedDetailId.value) return;
      try {
        const res = await instance.get(`/api/admin/staff/details/${selectedDetailId.value}`);
        selectedDetail.value = res.data;
      } catch (err) {
        console.error("Get staff detail error:", err);
      }
    };

    const getUnitsByDetailsId = async () => {
      if (!selectedDetailId.value) return;
      try {
        const res = await instance.get(`/api/admin/staff/${selectedDetailId.value}/unit`);
        fetchedUnit.value = res.data;
      } catch (err) {
        console.error("Get staff unit error:", err);
      }
    };

    const fetchAllStaffUnits = async () => {
      try {
        allStaffUnits.value = await getAllStaffUnits();
      } catch (err) {
        console.error("Fetch units error:", err);
      }
    };

    const toggleEditMode = () => {
      if (isEditing.value) {
        selectedDetail.value = null;
        selectedDetailId.value = "";
        fetchedUnit.value = { id: "" };
        query.value = "";
      }
      isEditing.value = !isEditing.value;
    };

    const editStaffDetails = async () => {
      if (!selectedDetailId.value) return;
      try {
        const payload = {
          designation: selectedDetail.value.designation,
          email: selectedDetail.value.email,
          linkedIn: selectedDetail.value.linkedIn,
          contactNumber: selectedDetail.value.contactNumber,
          updatedUnitId: fetchedUnit.value.id,
        };
        await instance.put(`/api/admin/staff/details/${selectedDetailId.value}`, payload);
        alert("Staff member updated successfully!");
        toggleEditMode();
      } catch (err) {
        console.error("Update staff error:", err);
        alert("Failed to update staff member.");
      }
    };

    onMounted(fetchAllStaffUnits);

    return {
      query,
      allSearchResult,
      searchByName,
      selectSuggestName,
      selectedDetail,
      selectedDetailId,
      getDetailByDetailId,
      getUnitsByDetailsId,
      fetchedUnit,
      allStaffUnits,
      isEditing,
      toggleEditMode,
      editStaffDetails,
      statusText,
    };
  },
};
</script>

<style>
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}
</style>
