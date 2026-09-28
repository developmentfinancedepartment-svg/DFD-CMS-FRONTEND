<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="max-w-6xl mx-auto">
      
      <!-- HEADER -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">Performance Reports</h1>
          <p class="text-gray-600">Upload and manage performance report documents</p>
        </div>
      </div>

      <!-- UPLOAD SECTION -->
      <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-12 max-w-2xl mx-auto">
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600 mb-4">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-800">Upload New Report</h3>
          <p class="text-sm text-gray-500 mt-1">Select a PDF file to secure in the system</p>
        </div>

        <form @submit.prevent="uploadPerformanceFile" class="space-y-6">
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700">Document Source</label>
            <div class="relative group">
              <input
                type="file"
                ref="performanceFileUpload"
                @change="handleFileUpload"
                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer text-gray-600"
              />
            </div>
            <div class="flex justify-between text-[11px] font-medium uppercase tracking-wider">
              <span class="text-blue-500">PDF Document Only</span>
              <span class="text-gray-400">Max size 50MB</span>
            </div>
          </div>

          <p v-if="message" class="text-red-500 text-xs font-bold text-center bg-red-50 py-2 rounded-lg border border-red-100 animate-pulse">
            {{ message }}
          </p>

          <button
            type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition duration-300 shadow-lg shadow-blue-100 flex items-center justify-center gap-2 group"
          >
            <span>Initialize Upload</span>
            <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </form>
      </div>

      <!-- EXISTING REPORTS TABLE -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
          <h2 class="text-lg font-bold text-gray-800">Archive Management</h2>
          <div class="flex gap-2">
            <span class="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
              {{ performanceFiles.length }} Documents
            </span>
          </div>
        </div>
        
        <div class="overflow-x-auto">
          <table v-if="performanceFiles.length" class="w-full text-left border-collapse text-sm">
            <thead>
              <tr class="bg-gray-50/50 border-b border-gray-100 font-semibold text-gray-700">
                <th class="px-6 py-4">Report Name</th>
                <th class="px-6 py-4">Timeline</th>
                <th class="px-6 py-4 text-center">Security Status</th>
                <th class="px-6 py-4 text-right">Operations</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50 text-gray-600">
              <tr 
                v-for="file in performanceFiles" 
                :key="file.id"
                class="hover:bg-blue-50/20 transition-all duration-200 group"
              >
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <span class="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{{ file.performancePdfName.slice(0, -4) }}</span>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="flex flex-col text-[11px] font-medium">
                    <span class="text-gray-400 uppercase tracking-wider mb-0.5">Added On</span>
                    <span class="text-gray-700">{{ file.addedPdfAt.slice(0, 10) }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 text-center">
                  <button
                    @click="file.performanceStatus === 0 ? activePerformancePdf(file.id, file.performancePdfName) : inactivatePerformancePdf(file.id, file.performancePdfName)"
                    :class="[
                      'px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-300 border font-bold',
                      file.performanceStatus === 1 
                        ? 'bg-green-100 text-green-700 hover:bg-green-200 border-green-200' 
                        : 'bg-red-100 text-red-700 hover:bg-red-200 border-red-200'
                    ]"
                  >
                    {{ file.performanceStatus === 1 ? 'ACTIVE' : 'INACTIVE' }}
                  </button>
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="flex justify-end gap-3 transition-all duration-300">
                    <button
                      @click="deletePerformanceReport(file.id, file.performancePdfName)"
                      class="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all"
                      title="Destroy Document"
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
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                 </svg>
               </div>
               <span class="font-medium italic">No performance reports found in archives.</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import { ref, onMounted } from "vue";
import instance from "../axiosInstance";

import { useAuthStore } from "@/Stores/authStore";

export default {
  setup() {
    const selectedFile = ref(null);
    const message = ref("");
    const performanceFiles = ref([]);
    const performanceFileUpload = ref(null);
    const authStore = useAuthStore();

    const handleFileUpload = (Performance) => {
      selectedFile.value = Performance.target.files[0];
    };

    const uploadPerformanceFile = async () => {
      if (!selectedFile.value) {
        message.value = "Please select a Performance report!";
        return;
      }

      const formData = new FormData();
      formData.append("file", selectedFile.value);

      try {
        const response = await instance.post(
          "/api/admin/upload/performancefile",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        alert("Perfrmance report upload successfull!");
        message.value = "";
        performanceFileUpload.value.value = "";
        selectedFile.value = "";
        await getAllPerfomaceReports();
      } catch (error) {
        message.value = error.response
          ? error.response.data
          : "Performance report upload failed!";
      }
    };

    const getAllPerfomaceReports = async () => {
      try {
        const response = await instance.get(
          "/api/public/getallperformancefile"
        );
        performanceFiles.value = response.data;
      } catch (error) {
        console.error("Error get performance reports", error);
      }
    };

    const deletePerformanceReport = async (id, performancePdfName) => {
      if (confirm(`Are you sure you want to delete ${performancePdfName}?`)) {
        try {
          await instance.delete(`/api/admin/performance/delete/${id}`);
          performanceFiles.value = performanceFiles.value.filter(
            (file) => file.id !== id
          );
        } catch (error) {
          console.error("error deleting file:", error);
          alert("Failed to delete file.");
        }
      }
    };

    const activePerformancePdf = async (id, performancePdfName) => {
      if (confirm(`Are you sure you want active ${performancePdfName}?`)) {
        try {
          const updateStatusDTO = { status: 1 };
          await instance.put(
            `api/admin/performance/status/${id}`,
            updateStatusDTO
          );
          alert(`${performancePdfName} has been activated successfully!`);
          await getAllPerfomaceReports();
        } catch (error) {
          console.error("error change status: ", error);
          alert("Failed to active this pdf!");
        }
      }
    };

    const inactivatePerformancePdf = async (id, performancePdfName) => {
      if (confirm(`Are you sure you want Inactive ${performancePdfName}?`)) {
        try {
          const updateStatusDTO = { status: 0 };
          await instance.put(
            `api/admin/performance/status/${id}`,
            updateStatusDTO
          );
          alert(`${performancePdfName} has been deactivated!`);
          await getAllPerfomaceReports();
        } catch (error) {
          console.error("error change status: ", error);
          alert("Failed to inactive this pdf!");
        }
      }
    };

    onMounted(getAllPerfomaceReports);

    return {
      selectedFile,
      message,
      handleFileUpload,
      uploadPerformanceFile,
      performanceFiles,
      deletePerformanceReport,
      performanceFileUpload,
      activePerformancePdf,
      inactivatePerformancePdf,
      authStore,
    };
  },
};
</script>
