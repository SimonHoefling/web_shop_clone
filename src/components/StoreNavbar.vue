<script lang="ts">
export default {
  data() {
    return {
      isDropdownOpen: false,
      selectedGender: 'men',
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    selectGender(gender: string) {
      this.selectedGender = gender;
      this.$emit('update:selectedGender', gender); // Emit the event with the correct name
      this.isDropdownOpen = false; // Close the dropdown after selection
    }

  }
};
</script>

<template>
  <nav class="text-black p-4 flex justify-between items-center">
    <div class="relative md:hidden" @click="toggleDropdown">
      <button>
        <font-awesome-icon :icon="['fas', 'bars']" style="color: #000000; font-size: 1.5rem;" />
      </button>
      <div v-if="isDropdownOpen" class="absolute left-0 mt-2 bg-white border rounded shadow-lg">
        <ul class="py-1">
          <li><a href="#" @click="selectGender('women')" class="block px-4 py-2 text-gray-800 hover:bg-red-200">WOMAN</a>
          </li>
          <li><a href="#" @click="selectGender('men')" class="block px-4 py-2 text-gray-800 hover:bg-red-200">MAN</a></li>
          <hr>
          <li><a href="#" class="block px-4 py-2 text-gray-800 hover:bg-red-200">Shops</a></li>
          <li><a href="#" class="block px-4 py-2 text-gray-800 hover-bg-red-200">My account</a></li>
          <li><a href="#" class="block px-4 py-2 text-gray-800 hover:bg-red-200">Wishlist</a></li>
          <li><a href="#" class="block px-4 py-2 text-gray-800 hover:bg-red-200">Cart</a></li>
        </ul>
      </div>
    </div>

    <div class="hidden md:flex space-x-4">
      <a href="#" @click="selectGender('women')" :class="{ 'active': selectedGender === 'women' }">WOMAN</a>
      <a href="#" @click="selectGender('men')" :class="{ 'active': selectedGender === 'men' }">MAN</a>
    </div>


    <div class="flex items-center justify-center md:justify-start">
      <img src="../assets/logo.png" class="w-32 h-auto" alt="Logo">
    </div>

    <div class="hidden md:flex space-x-4">
      <a href="#" class="nav-item">
        <font-awesome-icon :icon="['fas', 'globe']" style="color: #000000; font-size: 1.5rem;" />
        Shops
      </a>
      <a href="#" class="nav-item">
        <font-awesome-icon :icon="['fas', 'user']" style="color: #000000; font-size: 1.5rem;" />
        My account
      </a>
      <a href="#" class="nav-item">
        <font-awesome-icon :icon="['fas', 'heart']" style="color: #000000; font-size: 1.5rem;" />
        Wishlist
      </a>
      <a href="#" class="nav-item">
        <font-awesome-icon :icon="['fas', 'bag-shopping']" style="color: #000000; font-size: 1.5rem;" />
        Cart
      </a>
    </div>
  </nav>
</template>

<style scoped>
nav {
  width: calc(100% - 12rem);
  margin: 0 auto;
}

.nav-item {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

/* Add styles for the active class */
.active {
  border-bottom: 2px solid #000000;
}
</style>
