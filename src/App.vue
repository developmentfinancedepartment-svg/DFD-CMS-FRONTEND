<template>
  <div class="app-root">
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  localStorage.removeItem("token");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("role");
  localStorage.removeItem("username");
});
</script>