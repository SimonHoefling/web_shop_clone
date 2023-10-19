<script setup lang="ts">
import StoreNavbar from '../components/StoreNavbar.vue';
import StoreContent from '../components/StoreContent.vue';
import { ref } from 'vue';

let selectedGender = ref(''); // Initialize selectedGender in your parent component
</script>

<template>
  <div>
    <StoreNavbar @update:selectedGender="selectedGender = $event" />
    <StoreContent :selectedGender="selectedGender" />
  </div>
</template>
