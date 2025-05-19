<template>
  <div class="p-4 rounded-lg shadow relative overflow-y-auto">
    <div
      class="absolute top-10 left-90 bg-red-500 opacity-50 z-10 w-[500px] text-white text-shadow-2xs text-shadow-white rounded-3xl p-3 animate-bounce"
      v-if="alertFlag > 0"
      @click="changeStatus"
    >
      <span class="text-sm text-white w-full block"
        >Expected Rain | Wind Gust In
        <h3 class="text-xl text-blue-500 inline cursor-pointer">LESCO</h3></span
      >
    </div>

    <apexchart
      v-if="isChartReady"
      ref="chartRef"
      type="line"
      :options="chartOptions"
      :series="series"
      :height="setHeight"
    />

    <!-- <Modal :modalshow="showModal" @closeModal="handleFlag" :rainwind="chanceOfRain" /> -->
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import Modal from "./Modal.vue";
import axios from "axios";
import _ from "lodash";

const series = ref([]);

const chartRef = ref(null);
const setHeight = ref(550);
const alertFlag = ref(0);
const isChartReady = ref(false);

const props = defineProps({
  selectedDate: {
    type: String,
    default: "",
  },
});
const labels = [
  "00:00",
  "00:15",
  "00:30",
  "00:45",
  "01:00",
  "01:15",
  "01:30",
  "01:45",
  "02:00",
  "02:15",
  "02:30",
  "02:45",
  "03:00",
  "03:15",
  "03:30",
  "03:45",
  "04:00",
  "04:15",
  "04:30",
  "04:45",
  "05:00",
  "05:15",
  "05:30",
  "05:45",
  "06:00",
  "06:15",
  "06:30",
  "06:45",
  "07:00",
  "07:15",
  "07:30",
  "07:45",
  "08:00",
  "08:15",
  "08:30",
  "08:45",
  "09:00",
  "09:15",
  "09:30",
  "09:45",
  "10:00",
  "10:15",
  "10:30",
  "10:45",
  "11:00",
  "11:15",
  "11:30",
  "11:45",
  "12:00",
  "12:15",
  "12:30",
  "12:45",
  "13:00",
  "13:15",
  "13:30",
  "13:45",
  "14:00",
  "14:15",
  "14:30",
  "14:45",
  "15:00",
  "15:15",
  "15:30",
  "15:45",
  "16:00",
  "16:15",
  "16:30",
  "16:45",
  "17:00",
  "17:15",
  "17:30",
  "17:45",
  "18:00",
  "18:15",
  "18:30",
  "18:45",
  "19:00",
  "19:15",
  "19:30",
  "19:45",
  "20:00",
  "20:15",
  "20:30",
  "20:45",
  "21:00",
  "21:15",
  "21:30",
  "21:45",
  "22:00",
  "22:15",
  "22:30",
  "22:45",
  "23:00",
  "23:15",
  "23:30",
  "23:45",
];
const chanceOfRain = ref([]);
const showModal = ref(false);

const chartOptions = ref({
  chart: {
    id: "line-chart",
    type: "line",
    zoom: { enabled: false },
    background: "#fff", // Dark background
  },
  xaxis: {
    categories: labels,
    title: { text: "Time (15-minute intervals)" },
    labels: {
      rotate: -45,
      formatter: function (value) {
        return value;
      },
      style: {
        colors: "#000", // White text for dark mode
      },
    },
  },
  yaxis: {
    title: { text: "Value (MW)" }, // Assuming values are in Megawatts
    labels: {
      style: {
        colors: "#000", // White text for dark mode
      },
    },
  },
  stroke: {
    curve: "smooth",
    width: [2, 2], // Line width for forecast and actual
  },
  colors: ["#8e44ad", "#FF4560"], // Purple for forecast, red for actual
  tooltip: {
    x: {
      show: true,
    },
  },
  title: {
    text: "Forecast vs Actual Load Drawn",
    align: "left",
    style: {
      color: "#000", // White text for dark mode
    },
  },
  legend: {
    labels: {
      colors: "#000", // White text for legend
    },
  },
});

onMounted(() => {
  const width = window.innerWidth;
  if (width > 1500) {
    setHeight.value = 900;
  } else {
    setHeight.value = 550;
  }
});

const handleFlag = (flag) => {
  showModal.value = flag;
};

const changeStatus = () => {
  showModal.value = !showModal.value;
};

const fetchForecastData = async (date) => {
  try {
    const response = await axios.post(
      "http://localhost:54776/Disco/LescoLoadDrawnForecast",
      {
        current_date: date,
      }
    );

    const rawData = response.data;
    console.log("Forecasted Data", rawData);
    series.value = [
      {
        name: "Forecast",
        data: rawData.map((item, index) => ({
          x: labels[index], // Use labels as x-axis values
          y: item.Load_Forecast, // Use forecasted_value as y-axis values
        })),
      },
    ];
  } catch (error) {
    console.error("Error fetching forecast data:", error);
  }
};

const fetchRainWindData = async (date) => {
  try {
    const response = await axios.post("http://localhost:54776/Disco/ExpectRainOrWind", {
      current_date: date,
    });

    chanceOfRain.value = response.data;
    // check chanceOfRain if any value for chance_of_rain or wind_kph is greater than 0
    const hasRainOrWind = chanceOfRain.value.some(
      (item) => item.chance_of_rain > 85 || item.wind_kph >= 30
    );
    if (hasRainOrWind) {
      alertFlag.value = 1;
    } else {
      alertFlag.value = 0;
    }

    isChartReady.value = true;
  } catch (error) {
    console.error("Error fetching actual data:", error);
  }
};

const fetchActualData = async (date) => {
  try {
    const response = await axios.post("http://localhost:54776/Disco/LescoActualDrawn", {
      current_date: date,
    });

    // Sort the data by Load_Forecast_Hour in ascending order
    const rawData = _.sortBy(response.data, "Lesco_Actual_Hour");
    console.log("Actual Data", rawData);
    series.value.push({
      name: "Actual",
      data: rawData.map((item, index) => ({
        x: labels[index], // Use labels as x-axis values
        y: item.Lesco_Actual_Drawn, // Use actual_value as y-axis values
      })),
    });
  } catch (error) {
    console.error("Error fetching actual data:", error);
  }
};

watch(
  () => props.selectedDate,
  async (newDate) => {
    if (newDate) {
      //   // Reset series data to avoid stale data
      //   series.value = [
      //     { name: "Forecast", data: [] },
      //     { name: "Actual", data: [] },
      //   ];
      await fetchForecastData(newDate);
      await fetchActualData(newDate);
      await fetchRainWindData(newDate);
    }
  },
  { immediate: true }
);
</script>
<style scoped></style>
