<script lang="ts">
import type { YourDataType } from '@/api/apiService';

export default {
  data() {
    return {
      apiData: [] as YourDataType[],  // Initialize apiData as an empty array to store your API data.
      menProductsCount: 0,            // Initialize menProductsCount as 0.
      selectedImages: {} as { [key: string]: number },  // Initialize selectedImages as an empty object to keep track of selected images.
    };
  },
  methods: {
    showNextImage(articleIndex: number) {
      // Function to show the next image when the right arrow is clicked.
      if (this.selectedImages[articleIndex] === undefined) {
        // If no image is selected, set the first image (index 0).
        this.selectedImages[articleIndex] = 0;
      } else {
        // Cycle to the next image, looping back to 0 when at the end.
        this.selectedImages[articleIndex] = (this.selectedImages[articleIndex] + 1) % this.apiData[articleIndex].pictures.length;
      }
    },
    showPreviousImage(articleIndex: number) {
      // Function to show the previous image when the left arrow is clicked.
      if (this.selectedImages[articleIndex] === undefined) {
        // If no image is selected, set the last image (index equal to the number of pictures - 1).
        this.selectedImages[articleIndex] = this.apiData[articleIndex].pictures.length - 1;
      } else {
        // Cycle to the previous image, looping to the last image when at the beginning.
        this.selectedImages[articleIndex] = (this.selectedImages[articleIndex] - 1 + this.apiData[articleIndex].pictures.length) % this.apiData[articleIndex].pictures.length;
      }
    },
  },
  created() {
    // This hook is executed when the component is created.

    import('@/api/apiService').then((module) => {
      // Import the API service module.

      module.fetchApiData('/men')
        .then((response) => {
          // Fetch data from the '/men' API endpoint.

          this.apiData = response.data;  // Store the API data in apiData.

          // Initialize selectedImages for each article to 0 (the first image).
          this.apiData.forEach((_, index) => {
            this.selectedImages[index] = 0;
          });

          // Calculate the number of products for the "men" category.
          if (this.apiData.length > 0) {
            this.menProductsCount = this.apiData.length;
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);  // Log an error if there is a problem with data retrieval.
        });
    });
  },
};
</script>

<template>
  <div class="discount_banner">
    <p>Mid Season Sale: Up to <strong>40%</strong> discount</p>
  </div>

  <div class="container mt-4 pb-16">

    <div class="sidebar hidden lg:block">
      <ul class="text-s">
        <li class="my-2 cursor-pointer font-semibold">Clothing</li>
        <li class="my-2 cursor-pointer">Our best-seller</li>
        <li class="my-2 cursor-pointer">Shirts & Polos</li>
        <li class="my-2 cursor-pointer">Jumper & cardingans</li>
        <li class="my-2 cursor-pointer">Jackets & coats</li>
        <li class="my-2 cursor-pointer">Jeans</li>
        <li class="my-2 cursor-pointer">Trousers</li>
        <li class="my-2 cursor-pointer">Shirts</li>
        <li class="my-2 cursor-pointer">Sweatshirts & -jackets</li>
        <li class="my-2 cursor-pointer">Big Sizes</li>
        <li class="my-2 cursor-pointer">Tall Sizes</li>
        <li class="my-2 cursor-pointer">Tailored jackets & waitstcoats</li>
        <li class="my-2 cursor-pointer">Suits</li>
        <li class="my-2 cursor-pointer">Bermuda shorts</li>
        <li class="my-2 cursor-pointer">Basics</li>
        <li class="my-2 cursor-pointer">Business Wear</li>
      </ul>
    </div>

    <div class="content w-full h-full pb-20">
      <div class="heading">
        <p class="text-3xl">Clothing</p>
        <p class="italic text-xs text-gray-400 ml-2 mb-1">({{ menProductsCount }} Products)</p>
      </div>
      <p class="text-xs max-w-full lg:max-w-[50%]">Find your style – with our looks. From business classics like tailored
        jackets and
        shirts to casual pieces such as
        hoodies and tracksuit bottoms: Be inspired by our designs and find outfits that are perfect for you.
      </p>

      <div class="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-32 my-4 h-full">
        <div class="item relative" v-for="(item, index) in apiData" :key="index">
          <div class="arrow left-arrow" @click="showPreviousImage(index)">
            <font-awesome-icon :icon="['fas', 'chevron-left']" />
          </div>
          <div class="arrow right-arrow" @click="showNextImage(index)">
            <font-awesome-icon :icon="['fas', 'chevron-right']" />
          </div>
          <div class="image-container">
            <img :src="item.pictures[selectedImages[index]]" class="bg-gray-200 h-128 cursor-pointer object-contain" />
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
  width: calc(100% - 12rem);
  margin: 4rem auto;
  display: flex;
  border: 3px solid black;
}
.sidebar {
  width: 20%;
  height: 100%;
  border: 2px solid green;
}
.heading {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
}
.content {
  border: 2px solid blueviolet;
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
.left-arrow {
  left: 0;
}
.right-arrow {
  right: 0;
}
/* Show the arrows on hover */
.item:hover .arrow {
  display: block;
}
</style>
