<template>
  <div class="max-w-5xl flex justify-center flex-col min-w-full">
    <input
      type="date"
      class="bg-white text-black w-[20%] p-2 my-2 mx-auto shadow-2xl z-10 shadow-amber-300 shadow-blue-400 rounded-2xl"
      v-model="selectedDate"
    />
    <LineChart :selectedDate="selectedDate" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import LineChart from "../components/LineChart.vue";

const selectedDate = ref("2025-04-25");
</script>
