<script lang="ts">
import type { YourDataType } from '@/api/apiService';
import ArticleModal from './ArticleModal.vue';

export default {
  props: ['selectedGender'],  // Prop to receive the selected gender from the Navbar
  components: {
    ArticleModal,
  },

  data() {
    return {
      apiData: [] as YourDataType[],  // Initialize apiData as an empty array to store your API data.
      productsCount: 0,            // Initialize productsCount as 0.
      selectedImages: {} as { [key: string]: number },  // Initialize selectedImages as an empty object to keep track of selected images.
      isModalOpen: false,           // Initialize isModalOpen to control the visibility of the modal.
      selectedArticle: null as YourDataType | null,  // Initialize selectedArticle to store the currently selected article.
      selectedImageIndex: null as Number | null,     // Initialize selectedImageIndex to store the index of the selected image.
      sidebarItems: [
        'Clothing',
        'Our best-seller',
        'Shirts & Polos',
        'Jumper & cardigans',
        'Jackets & coats',
        'Jeans',
        'Trousers',
        'Shirts',
        'Sweatshirts & jackets',
        'Big Sizes',
        'Tall Sizes',
        'Tailored jackets & waistcoats',
        'Suits',
        'Bermuda shorts',
        'Basics',
        'Business Wear'
      ], // Initialize sidebarItems with category names.
      selectedIndex: 0,
    };
  },
  methods: {
    // Function to open the modal when an item is clicked.
    openModal(article: YourDataType, imageIndex: number) {
      console.log('Opening modal');
      this.selectedArticle = article;  // Set the selected article.
      this.selectedImageIndex = imageIndex;  // Set the selected image index.
      this.isModalOpen = true;  // Set isModalOpen to true to show the modal.
    },

    closeModal() {
      this.isModalOpen = false;  // Close the modal by setting isModalOpen to false.
    },

    // Function to fetch data from the API
    fetchData() {
      let endpoint = '/men'; // Default to 'men' if no gender is selected.

      if (this.selectedGender === 'men') {
        endpoint = '/men';  // Change endpoint to 'men' if 'men' is selected.
      } else if (this.selectedGender === 'women') {
        endpoint = '/women';  // Change endpoint to 'women' if 'women' is selected.
      }

      console.log('StoreContent.vue: Fetching data for endpoint:', endpoint);  // Log the endpoint being fetched.

      if (endpoint) {
        import('@/api/apiService').then((module) => {
          module.fetchApiData(endpoint)
            .then((response) => {
              this.apiData = response.data;  // Store the fetched API data.
              this.apiData.forEach((_, index) => {
                this.selectedImages[index] = 0;  // Initialize selectedImages for each item.
              });
              if (this.apiData.length > 0) {
                this.productsCount = this.apiData.length;  // Set productsCount to the number of fetched products.
              }
            })
            .catch((error) => {
              console.error('Error fetching data:', error);
            });
        });
      }
    },
    // This is the function that will be called when an item in the sidebar is clicked to make it bold.
    selectItem(index: number) {
      this.selectedIndex = index;
    }
  },
  created() {
    // This hook is executed when the component is created.
    this.fetchData();  // Fetch data when the component is created.
  },
  watch: {
    selectedGender: 'fetchData', // Watch for changes in selectedGender and refetch data when it changes.
  },
};
</script>

<template>
  <div class="discount_banner">
    <p>Mid Season Sale: Up to <strong>40%</strong> discount</p>
  </div>

  <div class="container mt-4 pb-16">

    <!-- Sidebar -->
    <div class="sidebar hidden lg:block">
      <ul class="text-s">
        <li v-for="(item, index) in sidebarItems" :key="index" class="my-2 cursor-pointer"
          :class="{ 'font-semibold': selectedIndex === index }" @click="selectItem(index)">
          {{ item }}
        </li>
      </ul>
    </div>

    <!-- Content container -->
    <div class="content w-full h-full pb-20">
      <div class="heading">
        <p class="text-3xl">Clothing</p>
        <p class="italic text-xs text-gray-400 ml-2 mb-1">({{ productsCount }} Products)</p>
      </div>
      <p class="text-xs lg:mb-8 max-w-full lg:max-w-[50%]">Find your style – with our looks. From business classics like
        tailored
        jackets and
        shirts to casual pieces such as
        hoodies and tracksuit bottoms: Be inspired by our designs and find outfits that are perfect for you.
      </p>

      <!-- Articles grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-16 my-4 h-full">
        <div class="item relative" v-for="(item, index) in apiData" :key="index">
          <div class="image-container" @click="openModal(item, selectedImages[index])">
            <img v-lazy="item.pictures[selectedImages[index]]" class="bg-gray-200 h-128 cursor-pointer object-contain" />
          </div>
          <div class="absolute top-0 right-0 flex flex-col p-2">
            <font-awesome-icon :icon="['fas', 'heart']" class="text-black cursor-pointer mb-2" style="font-size: 20px;" />
            <font-awesome-icon :icon="['fas', 'bag-shopping']" class="text-black cursor-pointer mb-2"
              style="font-size: 20px;" />
          </div>
          <p>{{ item.name }}</p>
          <p>{{ item.price }} €</p>
        </div>
      </div>

    </div>

    <!-- Render the modal when it's open -->
    <ArticleModal v-if="isModalOpen" :selected-article="selectedArticle" :selected-image-index="selectedImageIndex"
      @close="closeModal" />

  </div>
</template>

<style scoped>
.discount_banner {
  background-color: #fc0000;
  color: #fffdfd;
  text-align: center;
  padding: 0.2em;
  font-size: 18px;
}

.container {
  width: calc(100% - 2rem);
  margin: 2rem auto;
  display: flex;
}

.sidebar {
  width: 20%;
  height: 100%;
}

.heading {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
}


img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Style for the left and right arrows */
.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  display: none;
  background-color: transparent;
  padding: 8px;
  border-radius: 50%;
}
</style>
