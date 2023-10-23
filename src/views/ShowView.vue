<template>
  <main>
    <StoryItems v-if="baseApiUrl !== '' && options" :endpoint="options.show" />
  </main>
</template>

<script lang="ts">
import StoryItems from "@/components/StoryItems.vue";

export default {
  components: { StoryItems },
  props: ["baseApiUrl", "options"],
};
</script>
