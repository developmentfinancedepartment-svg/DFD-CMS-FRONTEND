<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="max-w-6xl mx-auto">
      
      <!-- HEADER -->
      <div class="flex justify-between items-center mb-10">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">News Dashboard</h1>
          <p class="text-gray-600">Broadcast updates and manage news content</p>
        </div>
      </div>

      <!-- FORMS -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <!-- ADD NEWS -->
        <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h2 class="text-xl font-bold text-gray-800">Publish News</h2>
          </div>

          <form @submit.prevent="addNews" class="space-y-5">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Headline</label>
              <textarea
                v-model="news.title"
                rows="2"
                maxlength="199"
                placeholder="Enter headline..."
                class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-gray-50 text-gray-800"
                required
              ></textarea>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Full Content</label>
              <textarea
                v-model="news.content"
                rows="5"
                maxlength="999"
                placeholder="Detailed news description..."
                class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-gray-50 text-gray-800"
                required
              ></textarea>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Link URL (Optional)</label>
              <input
                v-model="news.newsLink"
                type="url"
                placeholder="https://example.com"
                class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-gray-50 text-gray-800"
              />
            </div>
            <button
              type="submit"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-blue-100 flex items-center justify-center gap-2 group"
            >
              <span>Broadcast News</span>
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>
        </div>

        <!-- EDIT NEWS -->
        <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h2 class="text-xl font-bold text-gray-800">Update Content</h2>
          </div>

          <form @submit.prevent="editNews" class="space-y-5">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Select Document</label>
              <select
                v-model="selectedNewsId"
                @change="getNews"
                class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition bg-gray-50 text-gray-800"
              >
                <option value="" disabled>Choose a report to edit</option>
                <option v-for="n in allNews" :key="n.id" :value="n.id">
                  ID: {{ n.id }} - {{ n.title.slice(0, 40) }}...
                </option>
              </select>
            </div>

            <div v-if="selectedNews" class="space-y-5">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Update Headline</label>
                <textarea
                  v-model="selectedNews.title"
                  rows="2"
                  maxlength="199"
                  class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition bg-gray-50 text-gray-800"
                ></textarea>
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Update Content</label>
                <textarea
                  v-model="selectedNews.content"
                  rows="4"
                  maxlength="999"
                  class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition bg-gray-50 text-gray-800"
                ></textarea>
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Update Link URL</label>
                <input
                  v-model="selectedNews.newsLink"
                  type="url"
                  placeholder="https://example.com"
                  class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition bg-gray-50 text-gray-800"
                />
              </div>
              <button
                type="submit"
                class="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-purple-100"
              >
                Save Changes
              </button>
            </div>
            <div v-else class="h-[300px] flex items-center justify-center border-2 border-dashed border-gray-100 rounded-xl text-gray-400 italic text-sm">
              Select a news report above to begin editing
            </div>
          </form>
        </div>
      </div>

      <!-- NEWS LIST -->
      <div class="space-y-8">
        <h2 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          Current Broadcasts
        </h2>

        <div v-if="allNews.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="n in allNews"
            :key="n.id"
            class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-200 transition-all group"
          >
            <div class="flex justify-between items-start mb-4">
              <button
                @click="n.status === 0 ? activeNews(n.id) : inactiveNews(n.id)"
                :class="[
                  'px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-300 border',
                  n.status === 1 
                    ? 'bg-green-100 text-green-700 hover:bg-green-200 border-green-200' 
                    : 'bg-red-100 text-red-700 hover:bg-red-200 border-red-200'
                ]"
              >
                {{ n.status === 1 ? 'ACTIVE' : 'INACTIVE' }}
              </button>
              <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">ID: {{ n.id }}</span>
            </div>

            <h3 class="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
              {{ n.title }}
            </h3>
            <p class="text-sm text-gray-600 mb-6 line-clamp-4 leading-relaxed h-[80px]">
              {{ n.content }}
            </p>

            <div class="pt-4 border-t border-gray-50 flex items-center justify-between">
              <div class="flex flex-col text-[10px] text-gray-400 uppercase font-medium">
                <span>Created</span>
                <span class="text-gray-600">{{ n.createdAt.slice(0, 10) }}</span>
              </div>
              <div class="flex gap-2">
                <button
                  @click="deleteNews(n.id)"
                  class="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all"
                  title="Remove News"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="py-24 text-center bg-white rounded-2xl border border-dashed border-gray-200">
           <div class="flex flex-col items-center gap-4 text-gray-400">
             <div class="p-6 bg-gray-50 rounded-full">
               <svg class="w-12 h-12 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
               </svg>
             </div>
             <span class="font-medium italic">No news reports currently in archive.</span>
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
    const news = reactive({ title: "", content: "", newsLink: "" });
    const allNews = ref([]);
    const selectedNewsId = ref("");
    const selectedNews = ref("");
    const authStore = useAuthStore();

    const addNews = async () => {
      try {
        await instance.post("/api/admin/addnews", news);
        alert("News added successfully!");
        news.title = "";
        news.content = "";
        news.newsLink = "";
        await getAllNews();
      } catch (error) {
        console.error(error);
        alert("Failed to add news!");
      }
    };

    const getAllNews = async () => {
      try {
        const response = await instance.get("/api/admin/allnews");
        allNews.value = response.data;
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    const getNews = async () => {
      if (!selectedNewsId.value) return;
      try {
        const response = await instance.get(`/api/admin/get/news/by/${selectedNewsId.value}`);
        selectedNews.value = response.data;
      } catch (error) {
        console.error(error);
      }
    };

    const editNews = async () => {
      if (!selectedNewsId.value) return;
      try {
        await instance.put(`/api/admin/update/news/by/${selectedNewsId.value}`, selectedNews.value);
        alert("News updated successfully!");
        selectedNewsId.value = "";
        selectedNews.value = "";
        await getAllNews();
      } catch (error) {
        console.error(error);
        alert("Failed to update news!");
      }
    };

    const deleteNews = async (id) => {
      if (confirm(`Delete news ID: ${id}?`)) {
        try {
          await instance.delete(`/api/admin/deletenews/by/${id}`);
          allNews.value = allNews.value.filter(n => n.id !== id);
        } catch (error) {
          console.error(error);
          alert("Failed to delete news.");
        }
      }
    };

    const activeNews = async (id) => {
      if (confirm(`Activate news ID: ${id}?`)) {
        try {
          await instance.put(`api/admin/news/status/${id}`, { status: 1 });
          await getAllNews();
        } catch (error) {
          console.error(error);
          alert("Failed to activate news!");
        }
      }
    };

    const inactiveNews = async (id) => {
      if (confirm(`Deactivate news ID: ${id}?`)) {
        try {
          await instance.put(`api/admin/news/status/${id}`, { status: 0 });
          await getAllNews();
        } catch (error) {
          console.error(error);
          alert("Failed to deactivate news!");
        }
      }
    };

    onMounted(getAllNews);

    return {
      news, allNews, selectedNewsId, selectedNews, authStore,
      addNews, getNews, editNews, deleteNews, activeNews, inactiveNews
    };
  },
};
</script>
