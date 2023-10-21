<template>
  <main>
    <TheWelcome />
    {{ url }}
  </main>
</template>

<script lang="ts">
import TheWelcome from "../components/TheWelcome.vue";

export default {
  components: { TheWelcome },
  props: ["url"],
};
</script>
