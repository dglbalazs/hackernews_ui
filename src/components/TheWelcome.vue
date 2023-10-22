<template>
  <div>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque quas aliquid
    nam iste atque quo minus non eveniet molestias, ut ab, dolorem vitae
    possimus placeat! Suscipit et consequuntur nostrum vitae.

    <div>
      {{ baseApiUrl }}
    </div>
    <div v-for="item in items" :key="item.id">
      <h2>{{ item.title }}</h2>
      <p>Author: {{ item.by }}</p>
      <p>Descendants: {{ item.descendants }}</p>
      <p>Time: {{ formatTime(item.time) }}</p>
      <p>UNIX Time: {{ item.time }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { getData, getItem } from "@/components/functions";
import type { Item, ModifiedItem } from "@/components/types";

export default {
  data() {
    return {
      baseApiUrl: (this.$root as any).baseApiUrl,
      returnArr: {} as ModifiedItem,
      count: 0,
      items: [] as Array<ModifiedItem>,
    };
  },
  methods: {
    getData: async function () {
      return await getData(this.baseApiUrl);
    },
    getItem: async function (id: string) {
      return await getItem(this.baseApiUrl, id);
    },
    addItemInformation: function (itemData: ModifiedItem) {
      this.items.push(itemData);
    },
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
        const date = new Date(unixTime * 1000); // Convert Unix time to milliseconds
        return date.toLocaleDateString(); // Format as a localized date string
      }
    },
    handlePagination(page: string) {
      const url = new URL(window.location.href);
      url.searchParams.set("page", page); // Set the 'page' parameter to the current page number
      window.history.replaceState(null, "", url.toString()); // Update the URL without reloading the page
    },
  },
  async created() {
    console.log(this.baseApiUrl);
    const data = (await this.getData()) as Array<string>;
    console.dir(data);
    console.log(data.length);
    await Promise.all(
      data.map(async (itemId: string) => {
        let itemData = await this.getItem(itemId);
        this.addItemInformation(itemData);
      })
    );

    console.log(this.items);
  },
};
</script>
