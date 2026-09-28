
<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="max-w-6xl mx-auto">
      
      <!-- HEADER -->
      <div class="mb-10">
        <h1 class="text-3xl font-bold text-gray-800">Personnel Onboarding</h1>
        <p class="text-gray-600">Register and manage organizational staff members</p>
      </div>

      <!-- ADD STAFF FORM -->
      <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-12">
        <div class="flex items-center gap-3 mb-8">
          <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2 class="text-xl font-bold text-gray-800 text-center">Establish New Profile</h2>
        </div>

        <form @submit.prevent="addStaffDetails" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5 uppercase tracking-tight">Category Assignment</label>
              <select
                v-model="selectedCatIdForSave"
                required
                class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-gray-50 text-gray-800"
              >
                <option value="" disabled>Select organizational unit</option>
                <option v-for="unit in allStaffUnits" :key="unit.id" :value="unit.id">
                  {{ unit.staffUnit }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5 uppercase tracking-tight">Full Name</label>
              <input
                v-model="staffDetails.name"
                type="text"
                required
                placeholder="e.g. Alexander Hamilton"
                class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-gray-50 text-gray-800"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5 uppercase tracking-tight">Designation</label>
              <input
                v-model="staffDetails.designation"
                type="text"
                required
                placeholder="e.g. Senior Systems Analyst"
                class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-gray-50 text-gray-800"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5 uppercase tracking-tight">Email Identification</label>
              <input
                v-model="staffDetails.email"
                type="email"
                required
                placeholder="staff@org.domain"
                class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-gray-50 text-gray-800"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5 uppercase tracking-tight">Digital Portfolio (LinkedIn)</label>
              <input
                v-model="staffDetails.linkedIn"
                type="text"
                placeholder="linkedin.com/in/handle"
                class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-gray-50 text-gray-800"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5 uppercase tracking-tight">Contact Frequency</label>
              <input
                v-model="staffDetails.contactNumber"
                type="text"
                required
                placeholder="+1 234 567 890"
                class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-gray-50 text-gray-800"
              />
            </div>
          </div>

          <div class="flex justify-center pt-4">
            <button
              type="submit"
              class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-12 rounded-xl transition shadow-lg shadow-blue-100 flex items-center gap-2 group"
            >
              <span>Initialize Personnel Record</span>
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </form>
      </div>

      <!-- STAFF LIST TABLE -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
          <h2 class="text-lg font-bold text-gray-800">Personnel Roster</h2>
          <span class="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
            {{ allStaffDetails.length }} Records Found
          </span>
        </div>

        <div class="overflow-x-auto">
          <table v-if="allStaffDetails.length" class="w-full text-left border-collapse text-sm">
            <thead>
              <tr class="bg-gray-50/50 border-b border-gray-100 font-semibold text-gray-700">
                <th class="px-6 py-4">Identity & Role</th>
                <th class="px-6 py-4 text-center">Entry Date</th>
                <th class="px-6 py-4 text-center">Status</th>
                <th class="px-6 py-4 text-center">Sync Log</th>
                <th class="px-6 py-4 text-right">Operations</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50 text-gray-600">
              <tr 
                v-for="detail in allStaffDetails" 
                :key="detail.id"
                class="hover:bg-blue-50/20 transition-all duration-200 group"
              >
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold group-hover:scale-110 transition-transform">
                      {{ detail.name.charAt(0) }}
                    </div>
                    <div class="flex flex-col">
                      <span class="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{{ detail.name }}</span>
                      <span class="text-[10px] text-gray-500 uppercase tracking-tighter">{{ detail.designation }}</span>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 text-center font-medium">
                  {{ detail.addedAt.slice(0, 10) }}
                </td>
                <td class="px-6 py-4 text-center">
                  <button
                    @click="detail.status === 0 ? activeStaffMember(detail.id, detail.name) : inactiveStaffMember(detail.id, detail.name)"
                    :class="[
                      'px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-300 border',
                      detail.status === 1 
                        ? 'bg-green-100 text-green-700 hover:bg-green-200 border-green-200' 
                        : 'bg-red-100 text-red-700 hover:bg-red-200 border-red-200'
                    ]"
                  >
                    {{ detail.status === 1 ? 'ACTIVE' : 'INACTIVE' }}
                  </button>
                </td>
                <td class="px-6 py-4 text-center text-[10px] text-gray-400 font-bold">
                  {{ detail.latestUpdate.slice(0, 10) }}
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="flex justify-end gap-3 transition-all duration-300">
                    <button
                      @click="deleteStaffMember(detail.id, detail.name)"
                      class="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all"
                      title="Purge Profile"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-else class="py-24 text-center">
             <div class="flex flex-col items-center gap-4 text-gray-400">
               <div class="p-6 bg-gray-50 rounded-full text-gray-200">
                 <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
               </div>
               <span class="font-medium italic">No personnel currently listed in the registry.</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import { reactive, ref, onMounted } from "vue";
import instance from "@/axiosInstance";
import { getAllStaffUnits, getAllStaffDetails } from "@/Services/staffApi";
import { useAuthStore } from "@/Stores/authStore";

export default {
  setup() {
    const staffDetails = reactive({
      name: "",
      designation: "",
      email: "",
      linkedIn: "",
      contactNumber: "",
    });
    const authStore = useAuthStore();
    const selectedCatIdForSave = ref("");
    const allStaffUnits = ref([]);
    const allStaffDetails = ref([]);

    const fetchAllStaffUnits = async () => {
      try {
        allStaffUnits.value = await getAllStaffUnits();
      } catch (error) {
        console.error("error fetching staff units: ", error);
      }
    };

    const fetchAllStaffDetails = async () => {
      try {
        allStaffDetails.value = await getAllStaffDetails();
      } catch (error) {
        console.error("error fetching staff details", error);
      }
    };

    const addStaffDetails = async () => {
      try {
        await instance.post(
          `/api/admin/staff/${selectedCatIdForSave.value}/details`,
          staffDetails
          
        );
        staffDetails.name = "";
        staffDetails.designation = "";
        staffDetails.email = "";
        staffDetails.linkedIn = "";
        staffDetails.contactNumber = "";
        selectedCatIdForSave.value = "";
        alert("Staff member saved successfully!");
        await fetchAllStaffDetails();
      } catch (error) {
        console.error("staff member saving fail:", error);
        alert("Member Savinng Failed!");
      }
    };

    const activeStaffMember = async (id, name) => {
      if (confirm(`Are you sure you want to active ${name}?`)) {
        try {
          const updateStatusDTO = { status: 1 };
          await instance.put(
            `/api/admin/staff/details/${id}/status`,
            updateStatusDTO
          );
          alert(`${name} has activated!`);
          await fetchAllStaffDetails();
        } catch (error) {
          console.error("error in change status:", error);
          alert(`${name} activating failed!`);
        }
      }
    };

    const inactiveStaffMember = async (id, name) => {
      if (confirm(`Are you sure you want to deactivate ${name}?`)) {
        try {
          const updateStatusDTO = { status: 0 };
          await instance.put(
            `/api/admin/staff/details/${id}/status`,
            updateStatusDTO
          );
          alert(`${name} has deactivated!`);
          await fetchAllStaffDetails();
        } catch (error) {
          console.error("error in change status:", error);
          alert(`${name} deactivating failed!`);
        }
      }
    };

    const deleteStaffMember = async (id, name) => {
      if (confirm(`Are you sure you want to delete ${name}?`)) {
        try {
          await instance.delete(`/api/admin/staff/details/${id}`);
          alert(`${name} deleted!`);
          allStaffDetails.value = allStaffDetails.value.filter(
            (details) => details.id !== id
          );
        } catch (error) {
          console.error("error deleting member: ", error);
          alert(`Failed delete ${name}!`);
        }
      }
    };

    onMounted(() => {
      fetchAllStaffUnits();
      fetchAllStaffDetails();
    });

    return {
      staffDetails,
      selectedCatIdForSave,
      allStaffUnits,
      addStaffDetails,
      allStaffDetails,
      authStore,
      activeStaffMember,
      inactiveStaffMember,
      deleteStaffMember,
    };
  },
};
</script>
