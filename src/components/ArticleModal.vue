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
    <div class="modal-content bg-white w-3/4 md:w-1/2 max-h-full overflow-y-auto p-4 relative shadow-xl">
      <font-awesome-icon
        @click="closeModal"
        class="cursor-pointer absolute top-4 right-4 text-black text-2xl"
        icon="times"
      ></font-awesome-icon>

      <div class="flex flex-row mt-12">
        <!-- Left side: Display article image -->
        <div class="w-3/5">
          <img :src="selectedArticle.pictures[selectedImageIndex]" alt="Article Image" />
        </div>

        <!-- Right side: Article details -->
        <div class="w-2/5 pl-4">
          <p class="font-bold mt-4">Brand New</p>
          <p class="mt-4">{{ selectedArticle.name }}</p>
          <div class="flex items-center justify-between">
            <p class="font-bold mt-4">{{ selectedArticle.price }} €</p>
            <img src="../assets/logo.png" class="w-auto h-10 mt-4" alt="Logo">
          </div>
          <hr class="my-4">
          <p>Color: {{ selectedArticle.colors.join(', ') }}</p>
          <hr class="my-4">
          <p>Size:</p>
          <p>{{ selectedArticle.sizes.join(', ') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>





<style scoped>
</style>
