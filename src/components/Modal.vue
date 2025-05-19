<template>
  <div>
    <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center z-50">
      <!-- Modal Content -->
      <div
        @click.self="closeModal"
        class="bg-white rounded-lg p-6 w-full max-w-2xl shadow-lg"
      >
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">LESCO Expected Rain | Wind</h2>
          <button
            @click="closeModal"
            class="text-gray-500 hover:text-red-600 text-2xl font-bold"
          >
            &times;
          </button>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto h-[500px] overflow-y-auto">
          <table class="min-w-full divide-y divide-gray-200 border">
            <thead class="bg-gray-50 sticky top-0 z-10 text-center">
              <tr class="text-center">
                <th class="px-4 py-2 text-sm font-medium text-gray-500">Hour No</th>
                <th class="px-4 py-2 text-sm font-medium text-gray-500">
                  Chance of Rain %
                </th>
                <th class="px-4 py-2 text-sm font-medium text-gray-500">
                  Wind Gust (KPH)
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 text-center">
              <tr v-for="(r, index) in rainWind" :key="index">
                <td class="px-4 py-2">{{ formatTime(r.HourNo, index) }}</td>
                <td class="px-4 py-2">{{ r.chance_of_rain }}</td>
                <td class="px-4 py-2">{{ r.wind_kph }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { watch, ref, defineEmits } from "vue";
const isModalOpen = ref(false);
const rainWind = ref([]);
const emit = defineEmits(["closeModal"]);
const props = defineProps({
  modalshow: Boolean,
  rainwind: {
    type: Array,
    default: () => [],
  },
});
const closeModal = () => {
  isModalOpen.value = false;
  emit("closeModal", false);
};

const formatTime = (hour, index) => {
  // Each hour is repeated 4 times (every 15 minutes)
  const totalMinutes = (hour % 24) * 60 + (index % 4) * 15;
  const hours = Math.floor(totalMinutes / 60)
    .toString()
    .padStart(2, "0");
  const minutes = (totalMinutes % 60).toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

watch(
  () => props.modalshow,
  (newValue) => {
    isModalOpen.value = newValue;
  }
);
watch(
  () => props.rainwind,
  (newValue) => {
    rainWind.value = newValue;
  }
);
</script>
<style></style>
