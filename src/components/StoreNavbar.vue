<script lang="ts">
export default {
  data() {
    return {
      // Data properties for the states
      isDropdownOpen: false,
      selectedGender: 'men',
    };
  },
  methods: {
    // Method to toggle the dropdown menu's visibility
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    // Method to select a gender and emit an event to notify the parent component
    selectGender(gender: string) {
      this.selectedGender = gender;
      this.$emit('update:selectedGender', gender);
      this.isDropdownOpen = false;
    }
  }
};
</script>

<template>
  <nav class="text-black p-4 flex justify-between items-center">
    <div class="relative md:hidden" @click="toggleDropdown">
      <!-- Dropdown toggle button -->
      <button>
        <font-awesome-icon :icon="['fas', 'bars']" style="color: #000000; font-size: 1.5rem;" />
      </button>
      <!-- Dropdown Menu -->
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

    <!-- Desktop left side navigation -->
    <div class="hidden md:flex space-x-4">
      <router-link to="#" @click="selectGender('women')"
        :class="{ 'active': selectedGender === 'women' }">WOMAN</router-link>
      <router-link to="#" @click="selectGender('men')" :class="{ 'active': selectedGender === 'men' }">MAN</router-link>
    </div>

    <!-- Logo -->
    <div class="flex items-center justify-center md:justify-start">
      <img src="../assets/logo.png" class="w-32 h-auto" alt="Logo">
    </div>

    <!-- Desktop right side navigation -->
    <div class="hidden md:flex space-x-4">
      <router-link to="#" class="nav-item">
        <font-awesome-icon :icon="['fas', 'globe']" style="color: #000000; font-size: 1.5rem;" />
        Shops
      </router-link>
      <router-link to="#" class="nav-item">
        <font-awesome-icon :icon="['fas', 'user']" style="color: #000000; font-size: 1.5rem;" />
        My account
      </router-link>
      <router-link to="#" class="nav-item">
        <font-awesome-icon :icon="['fas', 'heart']" style="color: #000000; font-size: 1.5rem;" />
        Wishlist
      </router-link>
      <router-link to="#" class="nav-item">
        <font-awesome-icon :icon="['fas', 'bag-shopping']" style="color: #000000; font-size: 1.5rem;" />
        Cart
      </router-link>
    </div>
  </nav>
</template>

<style scoped>
nav {
  width: calc(100% - 12rem);
  margin: 0 auto;
}

/* Breakpoint for phonescreens */
@media (max-width: 640px) {
  nav {
    width: calc(100% - 2rem);
    margin: 0 auto;
  }
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
