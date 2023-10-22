<template>
  <div class="story-item" :id="item.id">
    <div class="story-item__generalinfo">
      <h2>{{ item.title }}</h2>
      <p>
        {{ item.descendants }} Comment{{
          item.descendants && item.descendants > 1 ? "s" : ""
        }}
      </p>
      <p>Time: {{ formatTime(item.time) }}</p>
    </div>
    <div class="story-item__userinfo">
      <p>Author: {{ item.by }}</p>
      <p>Karma: {{ item.byKarma }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import type { ModifiedItem } from "@/components/types";

export default {
  props: {
    item: {
      type: Object as () => ModifiedItem,
      required: true,
      validator: (value: ModifiedItem) => {
        if (
          value &&
          value.id &&
          value.type &&
          value.by &&
          value.time &&
          value.timeExact
        ) {
          return true;
        } else {
          throw new Error("Invalid prop 'item'");
        }
      },
    },
  },
  methods: {
    // Function that formats UNIX time to e.g. "7 hours ago" || "3 minutes ago"
    formatTime(unixTime: number) {
      const currentTime = Math.floor(Date.now() / 1000);
      const timeDifference = currentTime - unixTime;

      // LESS THAN A MINUTE AGO
      if (timeDifference < 60) {
        return `${timeDifference} minute${timeDifference > 1 ? "s" : ""} ago`;

        // LESS THAN AN HOUR AGO
      } else if (timeDifference < 3600) {
        const minutes = Math.floor(timeDifference / 60);
        return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;

        // LESS THAN A DAY AGO
      } else if (timeDifference < 86400) {
        const hours = Math.floor(timeDifference / 3600);
        return `${hours} hour${hours > 1 ? "s" : ""} ago`;

        // LESS THAN A MONTH AGO
      } else if (timeDifference < 2592000) {
        const days = Math.floor(timeDifference / 86400);
        return `${days} day${days > 1 ? "s" : ""} ago`;

        // LESS THAN A YEAR AGO
      } else if (timeDifference < 31536000) {
        const months = Math.floor(timeDifference / 2592000);
        return `${months} month${months > 1 ? "s" : ""} ago`;

        // SHOW EXACT DATE
      } else {
        return this.item.timeExact;
      }
    },
  },
};
</script>

<style scoped lang="scss">
$margin-block: 1em;
$desktop-width: 80%;
$desktop-padding: 2em 1em;

.story-item {
  display: flex;
  margin-inline: auto;
  margin-block: $margin-block;
  width: $desktop-width;
  justify-content: space-between;
  border: 1px solid green;
  padding: $desktop-padding;
}
</style>
