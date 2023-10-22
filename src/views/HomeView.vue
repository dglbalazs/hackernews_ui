<template>
  <main>
    <TheWelcome v-if="baseApiUrl !== ''" />
  </main>
</template>

<script lang="ts">
import TheWelcome from "@/components/TheWelcome.vue";

export default {
  components: { TheWelcome },
  props: ["baseApiUrl"],
};
</script>
