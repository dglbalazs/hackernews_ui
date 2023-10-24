<template>
  <TheHeader></TheHeader>
  <RouterView
    :baseApiUrl="baseApiUrl"
    :options="options"
    :class="[darkMode ? 'dark' : 'light']"
  />
  <TheFooter></TheFooter>
</template>

<script lang="ts">
import { RouterLink, RouterView } from "vue-router";
import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";

export default {
  components: { TheHeader, TheFooter },
  data() {
    return {
      baseApiUrl: "",
      options: null,
      darkMode: true,
    };
  },
  async beforeCreate() {
    try {
      const response = await fetch("/environment.json"); // Reference the file by its URL]
      if (response.ok) {
        const environmentData = await response.json();
        this.baseApiUrl = environmentData.API_BASE_URL;
        this.options = environmentData;
        console.log(this.options);
        console.log(environmentData);
      } else {
        console.error("Failed to fetch environment data");
      }
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style lang="scss" scoped></style>
