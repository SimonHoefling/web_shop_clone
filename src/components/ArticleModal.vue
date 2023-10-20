<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';

const { selectedArticle, selectedImageIndex } = defineProps(['selectedArticle', 'selectedImageIndex']);
const emits = defineEmits(['close']);

const closeModal = () => {
  emits('close');
};

const sizes = ref(selectedArticle.sizes);
const selectedSize = ref('XS');

const updateSelectedSize = (size: string) => {
  selectedSize.value = size;
};
</script>

<template>
  <div class="modal fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
    <div class="modal-content bg-white w-3/4 md:w-1/2 max-h-full overflow-y-auto p-4 relative custom-shadow">
      <font-awesome-icon @click="closeModal" class="cursor-pointer absolute top-4 right-4 text-black text-2xl"
        icon="times"></font-awesome-icon>

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
          <!-- Size options -->
          <p>Size: <strong>{{ selectedSize }}</strong></p>
          <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-2">
            <p v-for="size in sizes" :key="size" @click="updateSelectedSize(size)" class="size-badge sm:w-12 md:w-12"
              :class="{ 'selected-size': size === selectedSize }">
              {{ size }}
            </p>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.size-badge {
  background-color: #bcc0c3;
  /* width: 4rem; */
  border-radius: 99px;
  color: #000000;
  /* margin: 10px 10px 0 0;  */
  text-align: center;
  cursor: pointer;
  border: 2px solid transparent;
}

.selected-size {
  border: 2px solid #000000;
  color: #000000;
  text-align: center;
  /* Add additional styling for the selected size */
}

.custom-shadow {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
