<template>
  <div>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque quas aliquid
    nam iste atque quo minus non eveniet molestias, ut ab, dolorem vitae
    possimus placeat! Suscipit et consequuntur nostrum vitae.

    <div>
      {{ baseApiUrl }}
    </div>
    <template v-for="item in items" :key="item.id">
      <StoryItem :item="item"></StoryItem>
    </template>
  </div>
</template>

<script lang="ts">
import { getData, getItem } from "@/components/functions";
import type { Item, ModifiedItem } from "@/components/types";
import StoryItem from "@/components/StoryItem.vue";

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
  components: { StoryItem },
};
</script>
