<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="max-w-6xl mx-auto">
      
      <!-- HEADER -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">Events Management</h1>
          <p class="text-gray-600">Register and manage organizational milestones and media</p>
        </div>
      </div>

      <!-- FORMS SECTION -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <!-- CREATE EVENT -->
        <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h2 class="text-xl font-bold text-gray-800">Add New Event</h2>
          </div>

          <form @submit.prevent="createEvent" class="space-y-5">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Event Designation</label>
              <input
                v-model="event.eventName"
                type="text"
                maxlength="300"
                placeholder="e.g. Annual Tech Summit 2024"
                class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-gray-50 text-gray-800"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Extended Content Link</label>
              <input
                v-model="event.moreContent"
                type="text"
                maxlength="300"
                placeholder="Google Drive or External URL..."
                class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-gray-50 text-gray-800"
              />
            </div>
            <button
              type="submit"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-blue-100 flex items-center justify-center gap-2 group"
            >
              <span>Initialize Registry</span>
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>
        </div>

        <!-- UPLOAD MEDIA -->
        <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 class="text-xl font-bold text-gray-800">Sync Event Media</h2>
          </div>

          <form @submit.prevent="uploadImageFiles" class="space-y-5">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Target Event</label>
              <select
                v-model="selectedEventId"
                class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition bg-gray-50 text-gray-800"
              >
                <option value="" disabled>Select event to attach media</option>
                <option v-for="event in allEvents" :key="event.id" :value="event.id">
                  {{ event.eventName }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Source Assets</label>
              <input
                type="file"
                multiple
                @change="handleImageUpload"
                ref="filesInput"
                class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition bg-gray-50 text-gray-800 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
              />
              <p v-if="message" class="mt-2 text-xs text-red-500 font-bold uppercase tracking-wider">
                {{ message }}
              </p>
            </div>
            <button
              type="submit"
              class="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-purple-100"
            >
              Commit Media Upload
            </button>
          </form>
        </div>
      </div>

      <!-- EXISTING EVENTS -->
      <div class="mb-8">
        <div class="flex items-center gap-4 mb-6">
          <h2 class="text-xl font-bold text-gray-800">Event Registry</h2>
          <div class="h-px flex-1 bg-gray-100"></div>
          <span class="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
            {{ allEvents.length }} Records
          </span>
        </div>

        <div v-if="allEvents.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="e in allEvents"
            :key="e.id"
            class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
          >
            <div class="flex justify-between items-start mb-4">
              <button
                @click="e.status === 0 ? activeEvent(e.id, e.eventName) : inactiveEvent(e.id, e.eventName)"
                :class="[
                  'px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-300 border',
                  e.status === 1 
                    ? 'bg-green-100 text-green-700 hover:bg-green-200 border-green-200' 
                    : 'bg-red-100 text-red-700 hover:bg-red-200 border-red-200'
                ]"
              >
                {{ e.status === 1 ? 'ACTIVE' : 'INACTIVE' }}
              </button>
              <span class="text-[10px] font-black text-gray-300 uppercase">EID-{{ e.id }}</span>
            </div>

            <h3 class="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
              {{ e.eventName }}
            </h3>

            <div class="flex items-center gap-2 mb-4">
              <div class="flex -space-x-2">
                <div v-for="i in Math.min(3, e.media.length)" :key="i" class="w-6 h-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-400">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                </div>
              </div>
              <span class="text-xs font-semibold text-gray-500 tracking-tight">
                {{ e.media.length }} Assets Linked
              </span>
            </div>

            <div class="text-[10px] text-gray-400 font-medium space-y-1 mb-6 border-l-2 border-gray-50 pl-3">
              <div class="flex justify-between">
                <span>ESTABLISHED</span>
                <span class="text-gray-700">{{ e.addedEventAt.slice(0, 10) }}</span>
              </div>
              <div class="flex justify-between">
                <span>LAST MODIFIED</span>
                <span class="text-gray-700">{{ e.latestUpdateAt.slice(0, 10) }}</span>
              </div>
            </div>

            <div class="flex justify-end pt-2">
              <button
                @click="deleteEvent(e.id, e.eventName)"
                class="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all"
                title="Purge Event"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </div>
          </div>
        </div>

        <div v-else class="py-24 text-center bg-white rounded-2xl border border-gray-100 border-dashed">
          <div class="flex flex-col items-center gap-4 text-gray-400">
            <div class="p-6 bg-gray-50 rounded-full text-gray-200">
              <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            </div>
            <span class="font-medium italic">No events currently recorded in history.</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.backdrop-blur-xl {
  backdrop-filter: blur(14px);
}
</style>

<script>
import { reactive, ref, onMounted } from "vue";
import instance from "../axiosInstance";

import { useAuthStore } from "@/Stores/authStore";

export default {
  setup() {
    const event = reactive({
      eventName: "",
      moreContent: "",
    });
    const allEvents = ref([]);
    const message = ref("");
    const selectedImages = ref([]);
    const selectedEventId = ref("");
    const filesInput = ref(null);
    const authStore = useAuthStore();

    const handleImageUpload = (image) => {
      const files = image.target.files;
      const selectedFiles = [...files];
      selectedImages.value = selectedFiles;
    };

    const uploadImageFiles = async () => {
      if (selectedImages.value.length === 0) {
        message.value = "Please select image files!";
        return;
      }

      const formData = new FormData();
      selectedImages.value.forEach((file) => {
        formData.append("files", file);
      });

      try {
        const response = await instance.post(
          `/api/admin/event/media/save/by/id/${selectedEventId.value}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        alert("Uploading images succesfull!");
        message.value = "";
        filesInput.value.value = "";
        selectedImages.value = [];
        selectedEventId.value = "";
        await getAllEvents();
      } catch (error) {
        message.value = error.response
          ? error.response.data
          : "Event images upload failed!";
      }
    };

    const createEvent = async () => {
      try {
        const response = await instance.post(
          "/api/admin/event/title/save",
          event
        );
        alert("Event title created succesfully!");
        event.eventName = "";
        event.moreContent = "";
        await getAllEvents();
      } catch (error) {
        console.error("Error creating event:", error);
        alert("Faild to create event!");
      }
    };

    const getAllEvents = async () => {
      try {
        const response = await instance.get("/api/public/event/get/all");
        allEvents.value = response.data;
       console.log(allEvents.value);
        
      } catch (error) {
        console.error("Error getting all events:", error);
      }
    };

    const deleteEvent = async (id, eventName) => {
      if (confirm(`Are you sure you want to delete event ${eventName}`)) {
        try {
          await instance.delete(`/api/admin/event/delete/${id}`);
          allEvents.value = allEvents.value.filter((event) => event.id !== id);
        } catch (error) {
          console.error("error deleting event:", error);
          alert("Failed delete event!");
        }
      }
    };

    const activeEvent = async (id, eventName) => {
      if (confirm(`Are you sure you want active event ${eventName}?`)) {
        try {
          const updateStatusDTO = { status: 1 };
          await instance.put(`/api/admin/event/status/${id}`, updateStatusDTO);
          alert(`${eventName} has been activated successfully!`);
          await getAllEvents();
        } catch (error) {
          console.error("error change status: ", error);
          alert("Failed to active this event!");
        }
      }
    };

    const inactiveEvent = async (id, eventName) => {
      if (confirm(`Are you sure you want inactive event ${eventName}?`)) {
        try {
          const updateStatusDTO = { status: 0 };
          await instance.put(`/api/admin/event/status/${id}`, updateStatusDTO);
          alert(`${eventName} has been deactivated successfully!`);
          await getAllEvents();
        } catch (error) {
          console.error("error change status: ", error);
          alert("Failed to inactive this event!");
        }
      }
    };

    onMounted(getAllEvents);

    return {
      event,
      createEvent,
      allEvents,
      deleteEvent,
      handleImageUpload,
      uploadImageFiles,
      selectedEventId,
      message,
      filesInput,
      activeEvent,
      inactiveEvent,
      authStore,
    };
  },
};
</script>
