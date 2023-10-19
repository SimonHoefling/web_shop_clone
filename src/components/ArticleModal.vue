<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const { selectedArticle, selectedImageIndex } = defineProps(['selectedArticle', 'selectedImageIndex']);
const emits = defineEmits(['close']);

const closeModal = () => {
  emits('close');
};
</script>

<template>
  <div class="modal fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
    <div class="modal-content bg-white w-3/4 md:w-1/2 max-h-full overflow-y-auto rounded-lg p-4">
      <!-- Display article details here -->
      <img :src="selectedArticle.pictures[selectedImageIndex]" alt="Article Image" />
      <p>{{ selectedArticle.name }}</p>
      <p>Size: {{ selectedArticle.sizes.join(', ') }}</p>
      <p>Color: {{ selectedArticle.colors.join(', ') }}</p>
      <p>{{ selectedArticle.price }} €</p>

      <!-- Close button -->
      <button @click="closeModal" class="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
        Close
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>
