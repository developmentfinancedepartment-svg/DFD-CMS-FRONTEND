<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="max-w-7xl mx-auto">
      
      <!-- HEADER -->
      <div class="flex justify-between items-center mb-10">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">Hardware Specifications</h1>
          <p class="text-gray-500 font-medium tracking-tight">Technical configurations and document synchronization ledger</p>
        </div>
      </div>

      <!-- FORMS SECTION -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <!-- CREATE SPEC -->
        <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col relative overflow-hidden">
          <div class="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
          
          <div class="flex items-center gap-3 mb-8 relative z-10">
            <div class="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-100">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            </div>
            <h2 class="text-xl font-black text-gray-800 uppercase tracking-tight">Initialize Configuration</h2>
          </div>

          <form @submit.prevent="createSpecification" class="space-y-6 flex-grow flex flex-col justify-between relative z-10">
            <div class="space-y-1.5">
              <label class="px-1 text-[10px] font-black text-gray-400 uppercase tracking-widest">Configuration Designation</label>
              <input
                v-model="specification.specificationType"
                type="text"
                placeholder="e.g. Cluster Architecture Alpha"
                class="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-gray-800"
                required
              />
            </div>

            <button
              type="submit"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest py-3.5 rounded-xl transition-all shadow-lg shadow-blue-100"
            >
              Commit Specification
            </button>
          </form>
        </div>

        <!-- UPLOAD DOCUMENTS -->
        <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-32 h-32 bg-purple-50/50 rounded-full -mr-16 -mt-16"></div>

          <div class="flex items-center gap-3 mb-8 relative z-10">
            <div class="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-lg shadow-purple-100">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
            </div>
            <h2 class="text-xl font-black text-gray-800 uppercase tracking-tight">Attach Protocol Documents</h2>
          </div>

          <form @submit.prevent="uploadDocFiles" class="space-y-6 relative z-10">
            <div class="grid grid-cols-1 gap-6">
              <div class="space-y-1.5">
                <label class="px-1 text-[10px] font-black text-gray-400 uppercase tracking-widest">Target specification Node</label>
                <select
                  v-model="selectedSpecificationId"
                  class="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-purple-500 outline-none transition-all font-bold text-gray-800"
                >
                  <option value="" disabled>Select hardware node...</option>
                  <option v-for="spec in allSpecification" :key="spec.id" :value="spec.id">
                    {{ spec.specificationType }}
                  </option>
                </select>
              </div>

              <div class="space-y-1.5">
                <label class="px-1 text-[10px] font-black text-gray-400 uppercase tracking-widest">Resource assets</label>
                <div class="relative">
                  <input
                    type="file"
                    multiple
                    @change="handleDocumentUpload"
                    ref="filesInput"
                    class="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-purple-500 transition-all text-xs font-bold text-gray-800 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200 cursor-pointer"
                  />
                </div>
                <p v-if="message" class="text-red-500 text-[10px] font-black uppercase tracking-widest mt-1 animate-pulse">{{ message }}</p>
              </div>
            </div>

            <button
              type="submit"
              class="w-full bg-purple-600 hover:bg-purple-700 text-white font-black uppercase tracking-widest py-3.5 rounded-xl transition-all shadow-lg shadow-purple-100"
            >
              Deploy documents
            </button>
          </form>
        </div>
      </div>

      <!-- EXISTING SPECIFICATIONS GRID -->
      <div class="mb-16">
        <div class="flex items-center gap-4 mb-10">
          <h2 class="text-2xl font-black text-gray-800 uppercase tracking-tight">Master Spec Ledger</h2>
          <div class="h-px flex-1 bg-gray-100"></div>
          <span class="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-100">{{ allSpecification.length }} Nodes</span>
        </div>

        <div v-if="allSpecification.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="spec in allSpecification"
            :key="spec.id"
            class="bg-white p-7 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-100 transition-all group"
          >
            <div class="flex justify-between items-start mb-6">
               <button
                @click="spec.status === 1 ? inactiveSpecification(spec.id, spec.specificationType) : activeSpecification(spec.id, spec.specificationType)"
                :class="[
                  'px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all duration-300',
                  spec.status === 1 ? 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200' : 'bg-red-100 text-red-700 border-red-200 hover:bg-red-200'
                ]"
              >
                {{ spec.status === 1 ? 'ACTIVE' : 'INACTIVE' }}
              </button>
              <span class="text-[9px] font-bold text-gray-300 uppercase tracking-widest">S-NODE#{{ spec.id }}</span>
            </div>

            <h3 class="text-lg font-black text-gray-800 mb-6 group-hover:text-blue-600 transition-colors uppercase tracking-tight">
              {{ spec.specificationType }}
            </h3>

            <div class="space-y-3 mb-8">
              <div class="flex justify-between text-[10px] font-black uppercase tracking-widest">
                <span class="text-gray-400">Attached protocols</span>
                <span class="text-blue-600">{{ spec.specifyDocs.length }} Units</span>
              </div>
              <div class="h-2 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                <div class="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-1000" :style="{ width: Math.min(100, (spec.specifyDocs.length * 12.5)) + '%' }"></div>
              </div>
            </div>

            <div class="flex justify-end pt-6 border-t border-gray-50">
              <button
                @click="deleteSpecification(spec.id, spec.specificationType)"
                class="p-2.5 flex items-center justify-center rounded-xl bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600 transition-all border border-red-100"
                title="Purge Node"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
          </div>
        </div>

        <div v-else class="py-32 text-center bg-white rounded-3xl border border-dashed border-gray-200">
          <svg class="w-16 h-16 mx-auto text-gray-100 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
          <p class="text-gray-400 font-black uppercase tracking-[0.3em] text-sm italic">Master ledger currently void</p>
        </div>
      </div>

      <!-- REPOSITORY VIEW -->
      <div class="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden mb-12">
        <div class="px-10 py-8 bg-gray-50/50 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h2 class="text-2xl font-black text-gray-800 uppercase tracking-tight">Resource repository</h2>
            <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Cross-reference document library</p>
          </div>
          
          <div class="w-full md:w-72">
             <select
              v-model="selectedIdForDocs"
              @change="getAllDocuments"
              class="w-full px-5 py-3 text-xs font-black uppercase tracking-widest border border-gray-100 bg-white rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
            >
              <option value="" disabled>Filter by spec protocol...</option>
              <option v-for="spec in allSpecification" :key="spec.id" :value="spec.id">
                {{ spec.specificationType }}
              </option>
            </select>
          </div>
        </div>

        <div class="p-10">
          <div v-if="allDocuments.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              v-for="doc in allDocuments"
              :key="doc.id"
              class="relative bg-white p-6 rounded-3xl border border-gray-50 group transition-all hover:shadow-2xl hover:border-blue-50 hover:-translate-y-1"
            >
              <div class="flex items-center gap-4 mb-6">
                <div class="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                   <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
                <div class="flex-1 min-w-0">
                   <h4 class="text-xs font-black text-gray-800 uppercase tracking-tight group-hover:text-blue-600 transition-colors">{{ doc.docName }}</h4>
                   <p class="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{{ doc.docType }}</p>
                </div>
              </div>

              <div class="flex items-center justify-between mb-6">
                <button
                  @click="doc.docStatus === 1 ? inactiveDocument(doc.id, doc.docName) : activeDocument(doc.id, doc.docName)"
                  :class="[
                    'px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all duration-300',
                    doc.docStatus === 1 ? 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200' : 'bg-red-100 text-red-700 border-red-200 hover:bg-red-200'
                  ]"
                >
                  {{ doc.docStatus === 1 ? 'ACTIVE' : 'INACTIVE' }}
                </button>
                 <span class="text-[9px] font-bold text-gray-200 uppercase">#{{ doc.id }}</span>
              </div>

              <div class="flex justify-end pt-2">
                <button
                  @click="deleteDocument(doc.id, doc.docName)"
                  class="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all"
                  title="Purge Protocol"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>
          </div>
          <div v-else class="py-32 text-center">
             <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-200 shadow-inner">
                <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
             </div>
             <p class="text-gray-400 font-black uppercase tracking-[0.2em] text-xs">Repository selection required for access</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.backdrop-blur-lg {
  backdrop-filter: blur(12px);
}
</style>


<script>
import { reactive, ref, onMounted } from "vue";
import instance from "../axiosInstance";

import { useAuthStore } from "@/Stores/authStore";

export default {
  setup() {
    const specification = reactive({
      specificationType: "",
    });
    const allSpecification = ref([]);
    const allDocuments = ref([]);
    const message = ref("");
    const selectedDocs = ref([]);
    const selectedSpecificationId = ref("");
    const selectedIdForDocs = ref("");
    const filesInput = ref(null);
    const authStore = useAuthStore();

    const handleDocumentUpload = (doc) => {
      const files = doc.target.files;
      const selectedFiles = [...files];
      selectedDocs.value = selectedFiles;
    };

    const uploadDocFiles = async () => {
      if (selectedDocs.value.length === 0) {
        message.value = "Please select Document files!";
        return;
      }

      const formData = new FormData();
      selectedDocs.value.forEach((file) => {
        formData.append("docs", file);
      });

      try {
        const response = await instance.post(
          `/api/admin/hardware/specification/doc/${selectedSpecificationId.value}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        alert("Uploading docs succesfull!");
        message.value = "";
        filesInput.value.value = "";
        selectedDocs.value = [];
        selectedSpecificationId.value = "";
        await getAllSpecification();
        await getAllDocuments();
      } catch (error) {
        message.value = error.response
          ? error.response.data
          : "Specification docs upload failed!";
      }
    };

    const createSpecification = async () => {
      try {
        const response = await instance.post(
          "/api/admin/hardware/specification",
          specification
        );
        alert("Specification Type created succesfully!");
        specification.specificationType = "";
        await getAllSpecification();
      } catch (error) {
        console.error("Error creating specification:", error);
        alert("Faild to create specification!");
      }
    };

    const getAllDocuments = async () => {
      try {
        const response = await instance.get(
          `/api/public/hardware/specification/docs/by/${selectedIdForDocs.value}`
        );
        allDocuments.value = response.data;
      } catch (error) {
        console.error("Error getting all documents:", error);
      }
    };

    const getAllSpecification = async () => {
      try {
        const response = await instance.get(
          "/api/public/hardware/specifications"
        );
        allSpecification.value = response.data;
      } catch (error) {
        console.error("Error getting all specification:", error);
      }
    };

    const deleteDocument = async (id, docName) => {
      if (confirm(`Are you sure you want to delete document ${docName}`)) {
        try {
          await instance.delete(`api/admin/hardware/specification/doc/${id}`);
          allDocuments.value = allDocuments.value.filter(
            (document) => document.id !== id
          );
          await getAllSpecification();
        } catch (error) {
          console.error("error deleting document:", error);
          alert("Failed delete document!");
        }
      }
    };

    const deleteSpecification = async (id, specificationType) => {
      if (
        confirm(`Are you sure you want to delete event ${specificationType}`)
      ) {
        try {
          await instance.delete(`api/admin/hardware/specification/${id}`);
          allSpecification.value = allSpecification.value.filter(
            (specification) => specification.id !== id
          );
        } catch (error) {
          console.error("error deleting specification:", error);
          alert("Failed delete specification!");
        }
      }
    };

    const activeSpecification = async (id, specificationType) => {
      if (confirm(`Are you sure you want active ${specificationType}?`)) {
        try {
          const updateStatusDTO = { status: 1 };
          await instance.put(
            `api/admin/hardware/specification/status/${id}`,
            updateStatusDTO
          );
          alert(`${specificationType} has been activated successfully!`);
          await getAllSpecification();
        } catch (error) {
          console.error("error change status: ", error);
          alert("Failed to active this specification!");
        }
      }
    };

    const inactiveSpecification = async (id, specificationType) => {
      if (confirm(`Are you sure you want inactive ${specificationType}?`)) {
        try {
          const updateStatusDTO = { status: 0 };
          await instance.put(
            `api/admin/hardware/specification/status/${id}`,
            updateStatusDTO
          );
          alert(`${specificationType} has been deactivated successfully!`);
          await getAllSpecification();
        } catch (error) {
          console.error("error change status: ", error);
          alert("Failed to inactive this specification!");
        }
      }
    };

    const activeDocument = async (id, docName) => {
      if (confirm(`Are you sure you want active ${docName}?`)) {
        try {
          const updateStatusDTO = { status: 1 };
          await instance.put(
            `api/admin/hardware/specification/docs/status/${id}`,
            updateStatusDTO
          );
          alert(`${docName} has been activated successfully!`);
          await getAllSpecification();
          await getAllDocuments();
        } catch (error) {
          console.error("error change status: ", error);
          alert("Failed to active this document!");
        }
      }
    };

    const inactiveDocument = async (id, docName) => {
      if (confirm(`Are you sure you want inactive ${docName}?`)) {
        try {
          const updateStatusDTO = { status: 0 };
          await instance.put(
            `api/admin/hardware/specification/docs/status/${id}`,
            updateStatusDTO
          );
          alert(`${docName} has been deactivated successfully!`);
          await getAllSpecification();
          await getAllDocuments();
        } catch (error) {
          console.error("error change status: ", error);
          alert("Failed to inactive this document!");
        }
      }
    };

    onMounted(getAllSpecification);

    return {
      specification,
      createSpecification,
      allSpecification,
      allDocuments,
      deleteSpecification,
      deleteDocument,
      handleDocumentUpload,
      uploadDocFiles,
      selectedSpecificationId,
      selectedIdForDocs,
      message,
      filesInput,
      getAllDocuments,
      activeSpecification,
      inactiveSpecification,
      activeDocument,
      inactiveDocument,
      authStore,
    };
  },
};
</script>