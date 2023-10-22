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
    <div @click="backButton" v-if="pageNumber > 1">Back</div>
    <div @click="nextButton">Next</div>
  </div>
</template>

<script lang="ts">
import { getData, getItem } from "@/components/functions";
import type { ModifiedItem } from "@/components/types";
import StoryItem from "@/components/StoryItem.vue";

export default {
  components: { StoryItem },
  data() {
    return {
      baseApiUrl: (this.$root as any).baseApiUrl,
      returnArr: {} as ModifiedItem,
      count: 0,
      items: [] as Array<ModifiedItem>,
      pageNumber: 1,
      storyPerPage: 10,
    };
  },
  methods: {
    getData: async function () {
      return await getData(this.baseApiUrl, this.storyPerPage, this.pageNumber);
    },
    getItem: async function (id: string, itemIndex: number) {
      return await getItem(this.baseApiUrl, id, itemIndex);
    },
    addItemInformation: function (itemData: ModifiedItem) {
      this.items.push(itemData);
    },
    nextButton: function () {
      this.handlePagination((this.pageNumber + 1).toString(), "set");
      this.feedStories();
    },
    backButton: function () {
      this.handlePagination((this.pageNumber - 1).toString(), "set");
      this.feedStories();
    },
    handlePagination(page: string, type: "set" | "get") {
      const url = new URL(window.location.href);
      switch (type) {
        case "get":
          let pageValue = Number(url.searchParams.get("page")); // Get the 'page' parameter to the current page number
          if (pageValue == NaN) return;
          if (pageValue == 0) pageValue += 1;
          this.pageNumber = pageValue;
        case "set":
          if (!page) return;
          url.searchParams.set("page", page); // Set the 'page' parameter to the current page number
          window.history.replaceState(null, "", url.toString()); // Update the URL without reloading the page
          console.error(Number(page));
          this.pageNumber = Number(page);
      }
    },
    feedStories: async function () {
      const fetchedData = await this.getData();
      console.dir(fetchedData);

      // Handle in case we receive back an object which can happen in case of higher pagination
      const dataArray: string[] =
        typeof fetchedData === "object"
          ? Object.values(fetchedData)
          : (fetchedData as Array<string>);

      const indexArray: string[] =
        typeof fetchedData === "object" ? Object.keys(fetchedData) : [];

      const filteredData = dataArray.filter((item) => item);
      let unsortedData = [] as Array<ModifiedItem>;

      await Promise.all(
        filteredData.map(async (itemId: string) => {
          const index =
            typeof fetchedData === "object"
              ? parseInt(indexArray[dataArray.indexOf(itemId)], 10)
              : dataArray.indexOf(itemId);
          let itemData = await this.getItem(itemId, index);
          unsortedData.push(itemData);
        })
      );

      this.items = unsortedData.sort((a, b) => a.itemIndex - b.itemIndex);
      console.log(this.items);
    },
  },
  async created() {
    this.handlePagination("", "get");
    console.log(this.baseApiUrl);
    this.feedStories();
  },
};
</script>
