<script setup>
import "vue3-carousel/carousel.css";
import { Carousel, Slide, Navigation } from "vue3-carousel";

const overlayTexts = [
  "Real time operations and despatch of electric power in an efficient, safe, reliable and economical manner.",
  "Keep balance between demand and supply, to ensure the security, reliability and quality of Power System.",
  "Operational and prospective planning of transmission system.",
  "Coordination with other control centers and regional control centers to manage the power grid effectively.",
  "Monitoring the performance of the transmission network and power plants, collecting data to assess system health and optimize operations.",
  "Automation (IT /OT and Process)",
  "Digitization",
  "Transparency through IT Systems",
  "AI Generation Forecast",
  "Energy Storage Systems",
  "Grid Modernization",
  "Load Forecasting",
  "Renewable Integration",
  "Cybersecurity in Power Systems",
  "Wind and Solar Integration",
  "Wind and Solar Integration",
  "HVDC",
  "DLR POWER PLANTS",
  "ENERGY GENERATION",
];

const images = Array.from({ length: 19 }, (_, index) => {
  return {
    id: index + 1,
    url: `/images/${index + 1}.jpg`,
    text: overlayTexts[index],
  };
});

const config = {
  height: "100vh",
  itemsToShow: 1,
  gap: 5,
  autoplay: 2000,
  wrapAround: true,
  pauseAutoplayOnHover: true,
};
</script>

<template>
  <Carousel v-bind="config">
    <Slide v-for="image in images" :key="image.id">
      <div class="image-container">
        <img :src="image.url" alt="image" />
        <div class="overlay-text">
          {{ image.text }}
        </div>
      </div>
    </Slide>

    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>

<style>
:root {
  background-color: #242424;
  overflow-y: hidden;
}

.carousel {
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;
}

img {
  border-radius: 8px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.overlay-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 5rem;
  font-weight: bold;
  padding: 20px 20px;
  box-shadow: 0px 4px 15px rgba(6, 92, 221, 0.5);
  z-index: 1;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  text-align: center;
  max-width: 90%;
  white-space: normal;
  word-wrap: break-word;
  line-height: 1.4;

  background: linear-gradient(90deg, #fc5508, #fc5508, #fc5508);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text; /* Optional for Firefox */
  color: transparent;
}
</style>
