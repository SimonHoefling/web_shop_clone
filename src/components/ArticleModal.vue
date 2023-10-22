<script setup lang="ts">
import { defineProps, defineEmits, ref, computed } from 'vue';

// DefineProps: Exposing props from the parent component
const { selectedArticle, selectedImageIndex } = defineProps(['selectedArticle', 'selectedImageIndex']);
// DefineEmits: Exposing events that can be emitted to the parent component
const emits = defineEmits(['close', 'showNextImage', 'showPreviousImage']);

// Refs for local component state
const localSelectedImageIndex = ref(selectedImageIndex);
const sizes = ref(selectedArticle.sizes);
const selectedSize = ref(selectedArticle.sizes[0]);
const selectedColor = ref(selectedArticle.colors[0]);
const numPictures = computed(() => selectedArticle.pictures.length);
const selectedTab = ref('DETAILS'); // Sets the default tab on the bottom to details

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

// The next 4 functions are for the list at the bottom to show the details of different tabs
const showDetails = () => {
  selectedTab.value = 'DETAILS';
};

const showFit = () => {
  selectedTab.value = 'FIT';
};

const showMaterialCare = () => {
  selectedTab.value = 'MATERIAL CARE';
};

const showSustainability = () => {
  selectedTab.value = 'SUSTAINABILITY';
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
  <div class="modal fixed top-0 left-0 w-full h-full flex items-center justify-center min-h-screen">
    <div class="modal-content bg-white w-11/12 md:w-3/4 lg:w-1/2 max-h-full overflow-y-auto relative custom-shadow">
      <font-awesome-icon @click="closeModal" class="cursor-pointer absolute top-4 right-4 text-black text-2xl"
        icon="times"></font-awesome-icon>

      <!-- Top section (image + details) -->
      <div class="flex flex-col md:flex-row my-12 p-4">

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
          <div class="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-2">
            <p v-for="size in sizes" :key="size" @click="updateSelectedSize(size)" class="size-badge sm:w-12 md:w-12"
              :class="{ 'selected-size': size === selectedSize }">
              {{ size }}
            </p>
          </div>
        </div>
      </div>

      <!-- Bottom tabs section for more details -->
      <div class="details-list bg-gray-200 p-4">
        <!-- Mobile dropdown -->
        <div class="md:hidden">
          <select v-model="selectedTab"
            class="block w-full bg-white border border-gray p-2 rounded focus:border-gray-500 focus:outline-none focus:ring-0">
            <option value="DETAILS">DETAILS</option>
            <option value="FIT">FIT</option>
            <option value="MATERIAL CARE">MATERIAL & CARE</option>
            <option value="SUSTAINABILITY">SUSTAINABILITY</option>
          </select>
        </div>

        <!-- Desktop tabs -->
        <ul class="hidden md:flex flex-row">
          <strong>
            <li class="cursor-pointer mr-6" @click="showDetails" :class="{ 'active': selectedTab === 'DETAILS' }">DETAILS
            </li>
          </strong>
          <strong>
            <li class="cursor-pointer mr-6" @click="showFit" :class="{ 'active': selectedTab === 'FIT' }">FIT</li>
          </strong>
          <strong>
            <li class="cursor-pointer mr-6" @click="showMaterialCare"
              :class="{ 'active': selectedTab === 'MATERIAL CARE' }">MATERIAL & CARE</li>
          </strong>
          <strong>
            <li class="cursor-pointer mr-6" @click="showSustainability"
              :class="{ 'active': selectedTab === 'SUSTAINABILITY' }">SUSTAINABILITY</li>
          </strong>
        </ul>
      </div>

      <!-- Tab section: Render the content based on the selected item -->
      <div class="content bg-gray-200 md:h-118 sm:h-auto p-4">

        <!-- Details tab -->
        <div v-if="selectedTab === 'DETAILS'">
          <p class="mb-4"><strong>Product details</strong></p>
          <ul>
            <li v-for="detail in selectedArticle.details" :key="detail">{{ detail }}</li>
          </ul>
          <div class="flex flex-row mt-4">
            <img src="../assets/barcode.png" class="w-auto h-10" alt="Logo">
            <div class="ml-2">
              <p>2154732.57D1.S</p>
              <p>4099975524103</p>
            </div>
          </div>
        </div>

        <!-- Fit tab -->
        <div v-else-if="selectedTab === 'FIT'">
          <p class="mb-4"><strong>FIT:</strong></p>
          <ul>
            <li v-for="fitDetail in selectedArticle.fit" :key="fitDetail">{{ fitDetail }}</li>
          </ul>
        </div>

        <!-- Material & Care tab -->
        <div v-else-if="selectedTab === 'MATERIAL CARE'">
          <div class="flex flex-row justify-between w-full">
            <div class="mb-4 w-1/2">
              <p class="mb-2"><strong>Material</strong></p>
              <p>Fabric: chambray</p>
              <p>Quality: lightweight</p>
            </div>
            <div class="w-1/2">
              <p class="mb-2"><strong>Material composition</strong></p>
              <p>99% Cotton, 1% Elastane</p>
            </div>
          </div>

          <div class="my-4 w-5/5 h-0.5 shadow"></div>

          <p><strong>Care instructions</strong></p>
          <div class="flex flex-row justify-between my-4 w-full">

            <div class="w-1/2">
              <div class="flex flex-row items-center mb-4">
                <img src="../assets/wash-icon.png" class="w-auto h-6 mr-8" alt="wash icon">
                <p>Machine wash 40°</p>
              </div>
              <div class="flex flex-row items-center mb-4">
                <img src="../assets/chlore.png" class="w-auto h-6 mr-8" alt="chlore danger icon">
                <p>Do not chlore</p>
              </div>
              <div class="flex flex-row items-center mb-4">
                <img src="../assets/iron-icon.png" class="w-auto h-6 mr-8" alt="iron icon">
                <p>Handwarm ironing</p>
              </div>
            </div>

            <div class="w-1/2">
              <div class="flex flex-row items-center mb-4">
                <img src="../assets/cleaning-icon.png" class="w-auto h-6 mr-8" alt="cleaning icon">
                <p>No dry cleaning</p>
              </div>
              <div class="flex flex-row items-center mb-4">
                <img src="../assets/machine.png" class="w-auto h-6 mr-8" alt="washing machine icon">
                <p>Tumble with reduced thermical pressure</p>
              </div>
            </div>
          </div>

        </div>

        <!-- Sustainability tab -->
        <div v-else-if="selectedTab === 'SUSTAINABILITY'" class="md:w-2/3 ">
          <p class="mb-4">{{ selectedArticle.sustainability[0] }}</p>
          <div class="w-full h-0.5 shadow"></div>
          <div class="flex items-center justify-start my-4">
            <img src="../assets/shirt.png" class="w-auto h-10" alt="Logo">
            <p class="ml-2"><strong>CERTIFIED SUSTAINABLE FIBRE</strong></p>
          </div>
          <p>{{ selectedArticle.sustainability[1] }}</p>
          <p class="mt-2">
            This product supports economically, ecologically and socially sustainable cotton farming.
            The sourcing of sustainable cotton follows the principle of mass balance. You can find more information
            <a href="https://soliver.eu" class="underline" target="blank">here.</a>
          </p>


        </div>
      </div>

      <!-- Footer -->
      <div class="flex flex-row justify-between items-center px-4  w-full bg-white sticky bottom-0 custom-footer-shadow">
        <p>{{ selectedArticle.name }}</p>
        <button class="bg-black text-white w-60 m-2 mr-0 p-2">
          <span class="flex items-center justify-between">
            <span>Add to cart</span>
            <span class="ml-2"><font-awesome-icon :icon="['fas', 'bag-shopping']" style="color: #ffffff;" /></span>
            <!-- Replace with your Font Awesome class -->
          </span>
        </button>
      </div>

    </div>
  </div>
</template>

<style scoped>
.modal-content {
  height: 94vh;
  margin: auto;
  margin-top: 3vh;
  margin-bottom: 3vh;
}

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

.active {
  border-bottom: 2px solid #000000;
}

.custom-footer-shadow {
  box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1);
}
</style>
