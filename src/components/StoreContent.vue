<script lang="ts">
import type { YourDataType } from '@/api/apiService';

export default {
  data() {
    return {
      apiData: [] as YourDataType[],
      menProductsCount: 0,
    };
  },
  created() {
    import('@/api/apiService').then((module) => {
      module.fetchApiData('/men')
        .then((response) => {
          this.apiData = response.data;

          // Number of products for the "men" category
          if (this.apiData.length > 0) {
            this.menProductsCount = this.apiData.length;
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    });
  },
};
</script>



<template>
  <div class="discount_banner">
    <p>Mid Season Sale: Up to <strong>40%</strong> discount</p>
  </div>
  <div class="container mt-4">

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

    <div class="content w-full">
      <div class="heading">
        <p class="text-3xl">Clothing</p>
        <p class="italic text-xs text-gray-400 ml-2 mb-1">({{ menProductsCount}} Products)</p>
      </div>
      <p class="text-xs max-w-full lg:max-w-[50%]">Find your style – with our looks. From business classics like tailored
        jackets and
        shirts to casual pieces such as
        hoodies and tracksuit bottoms: Be inspired by our designs and find outfits that are perfect for you.
      </p>

      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 my-4">
  <!-- Loop through apiData -->
  <div class="item relative" v-for="(item, index) in apiData" :key="index">
    <div class="relative">
      <img :src="item.pictures[0]" class="bg-gray-200 h-128 cursor-pointer">
      <!-- Absolute positioning for icons within the image container -->
      <div class="absolute top-0 right-16 p-2 flex flex-col">
        <font-awesome-icon :icon="['fas', 'heart']" class="text-black py-2 cursor-pointer" style="font-size: 20px;" />
        <font-awesome-icon :icon="['fas', 'bag-shopping']" class="text-black cursor-pointer" style="font-size: 20px;" />
      </div>
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
</style>
