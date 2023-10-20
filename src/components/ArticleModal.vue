<script setup lang="ts">
import { defineProps, defineEmits, ref, computed } from 'vue';

// DefineProps: Exposing props from parent component
const { selectedArticle, selectedImageIndex } = defineProps(['selectedArticle', 'selectedImageIndex']);
// DefineEmits: Exposing events that can be emitted to the parent component
const emits = defineEmits(['close', 'showNextImage', 'showPreviousImage']);

// Refs for local component state
const localSelectedImageIndex = ref(selectedImageIndex);
const sizes = ref(selectedArticle.sizes);
const selectedSize = ref(selectedArticle.sizes[0]);
const selectedColor = ref(selectedArticle.colors[0]);
const numPictures = computed(() => selectedArticle.pictures.length);


// Function to update the selected size
const updateSelectedSize = (size: string) => {
  selectedSize.value = size;
};

// Function to update the selected color
const updateSelectedColor = (color: string) => {
  selectedColor.value = color;
};

const showNextImage = () => {
  if (localSelectedImageIndex.value === undefined) {
    localSelectedImageIndex.value = 0;
  } else {
    localSelectedImageIndex.value = (localSelectedImageIndex.value + 1) % selectedArticle.pictures.length;
  }
  emits('showNextImage', localSelectedImageIndex.value);
};

const showPreviousImage = () => {
  if (localSelectedImageIndex.value === undefined) {
    localSelectedImageIndex.value = selectedArticle.pictures.length - 1;
  } else {
    localSelectedImageIndex.value = (localSelectedImageIndex.value - 1 + selectedArticle.pictures.length) % selectedArticle.pictures.length;
  }
  emits('showPreviousImage', localSelectedImageIndex.value);
};

const closeModal = () => {
  emits('close');
};

// Computed property that maps color names to CSS classes
const colorClassMap = computed(() => {
  const colorClasses: { [key: string]: string } = {};
  const colors = selectedArticle.colors;

  colors.forEach((color: string) => {
    colorClasses[color] = `color-${color.toLowerCase()}`;
  });

  return colorClasses;
});
</script>

<template>
  <div class="modal fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
    <div
      class="modal-content bg-white w-11/12 md:w-3/4 lg:w-1/2 mt-4 max-h-full overflow-y-auto p-4 relative custom-shadow">
      <font-awesome-icon @click="closeModal" class="cursor-pointer absolute top-4 right-4 text-black text-2xl"
        icon="times"></font-awesome-icon>

      <div class="flex flex-col md:flex-row mt-12">

        <!-- Left side: Article images -->
        <div class="w-full md:w-3/5 relative flex items-center justify-center">
          <!-- Left arrow to show previous image -->
          <div class="arrow left-arrow absolute left-4 cursor-pointer" @click="showPreviousImage">
            <font-awesome-icon :icon="['fas', 'chevron-left']" />
          </div>

          <img :src="selectedArticle.pictures[localSelectedImageIndex]" alt="Article Image" />

          <!-- Right arrow to show next image -->
          <div class="arrow right-arrow absolute right-4 cursor-pointer" @click="showNextImage">
            <font-awesome-icon :icon="['fas', 'chevron-right']" />
          </div>
          <div class="image-indicators absolute bottom-4  flex justify-center">
            <span v-for="index in numPictures" :key="index" class="indicator"
              :class="{ 'active': index - 1 === localSelectedImageIndex }"></span>
          </div>
        </div>

        <!-- Right side: Article details -->
        <div class="w-full md:w-2/5 pl-4">
          <p class="font-bold mt-4">Brand New</p>
          <p class="mt-4">{{ selectedArticle.name }}</p>
          <div class="flex items-center justify-between">
            <p class="font-bold mt-4">{{ selectedArticle.price }} €</p>
            <img src="../assets/logo.png" class="w-auto h-10 mt-4" alt="Logo">
          </div>

          <hr class="my-4">

          <!-- Render colored circles based on the colors -->
          <p class="mb-2">Color: <strong>{{ selectedColor }}</strong></p>
          <div class="color-circles cursor-pointer">
            <span v-for="color in selectedArticle.colors" :key="color"
              :class="['color-circle', colorClassMap[color], { 'selected': color === selectedColor }]"
              @click="updateSelectedColor(color)"></span>
          </div>

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
  border-radius: 99px;
  color: #000000;
  text-align: center;
  cursor: pointer;
  border: 2px solid transparent;
}

.custom-shadow {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
}

.selected-size {
  border: 2px solid #000000;
  color: #000000;
  text-align: center;
  /* Add additional styling for the selected size */
}

/* Styling for the color circles below */
.color-circles {
  display: flex;
  align-items: center;
  gap: 5px;
}

/* CSS classes for each color below */
.color-black {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: black;
}

.color-blue {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: blue;
}

.color-green {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: green;
}

.color-red {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: red;
}

.color-gray {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: rgb(167, 160, 160);
}

/* Classes to add dynamic border styling to the color circles below */
.color-circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid transparent;
}

/* Add a gray border for the selected color */
.color-circle.selected {
  border-color: rgb(106, 104, 104);
}

/* Styling for the indicators on the image */
.image-indicators {
  border-radius: 99px;
  padding: 2px
}

.indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #959292;
  margin: 0 5px;
  cursor: pointer;
}

.indicator.active {
  background-color: #333;
}
</style>
