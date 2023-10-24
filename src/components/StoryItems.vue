<template>
  <section id="content">
    <Loader v-if="loading"></Loader>
    <template v-if="!loading" v-for="item in items" :key="item.id">
      <StoryItem :item="item"></StoryItem>
    </template>
    <div class="no-item-text" v-if="!loading && items.length == 0">
      No element to be shown.
    </div>
    <div class="pagination_container" v-if="!loading">
      <div
        class="pagination_button"
        id="backBtn"
        @click="paginationButton('back')"
        v-if="pageNumber > 1"
      >
        Back
      </div>
      <div
        v-if="items.length > 0"
        class="pagination_button"
        id="nextBtn"
        @click="paginationButton('next')"
      >
        Next
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { getData, getItem } from "@/components/functions";
import type { ModifiedItem } from "@/components/types";
import StoryItem from "@/components/StoryItem.vue";
import Loader from "@/components/Helper/Loader.vue";

export default {
  components: { StoryItem, Loader },
  data() {
    return {
      baseApiUrl: (this.$root as any).baseApiUrl,
      returnArr: {} as ModifiedItem,
      count: 0,
      items: [] as Array<ModifiedItem>,
      pageNumber: 1,
      storyPerPage: 10,
      loading: true,
    };
  },
  props: ["endpoint"],
  methods: {
    // Fetching Story IDs for the page
    getData: async function () {
      return await getData(
        this.baseApiUrl,
        this.endpoint,
        this.storyPerPage,
        this.pageNumber
      );
    },

    // Fetching Story data based on ID
    getItem: async function (id: string, itemIndex: number) {
      return await getItem(this.baseApiUrl, id, itemIndex);
    },

    // Pagination Button functionality
    paginationButton: function (type: "back" | "next") {
      const incrementValue = type === "back" ? -1 : +1;
      this.handlePagination(
        (this.pageNumber + incrementValue).toString(),
        "set"
      );
      this.feedStories();
    },

    // Handling pagination - getting and setting value from URL parameter
    handlePagination(page: string, type: "set" | "get") {
      const url = new URL(window.location.href);
      switch (type) {
        case "get":
          let pageValue = Number(url.searchParams.get("page")); // Get the 'page' parameter to the current page number
          if (isNaN(pageValue)) return;
          if (pageValue == 0) pageValue += 1;
          this.pageNumber = pageValue;
        case "set":
          if (!page) return;
          url.searchParams.set("page", page); // Set the 'page' parameter to the current page number
          window.history.replaceState(null, "", url.toString()); // Update the URL without reloading the page
          this.pageNumber = Number(page);
      }
    },

    // Main function for feeding data to the page
    feedStories: async function () {
      this.loading = true;
      const fetchedData = await this.getData(); // Collecting IDs for the page
      console.dir(fetchedData);

      // In case the page is empty, we store an empty array
      if (fetchedData == null) {
        this.items = [];
        this.loading = false;
        return;
      }

      // Handle in case we receive back an object which can happen in case of higher pagination
      const dataArray: string[] =
        typeof fetchedData === "object"
          ? Object.values(fetchedData)
          : (fetchedData as Array<string>);

      const indexArray: string[] =
        typeof fetchedData === "object" ? Object.keys(fetchedData) : [];

      // Sometimes we receive back null values in case of pagination, so filter them out
      const filteredData = dataArray.filter((item) => item);

      // Create our temporary container of items where we can asynch feed the data
      let unsortedData = [] as Array<ModifiedItem>;

      // Call asynch full data fetch for all of the corresponding Story Ids we received
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

      // Since the previous call was asynch, the order could have been messed up
      // so let's sort the results based on their index
      this.items = unsortedData.sort((a, b) => a.itemIndex - b.itemIndex);

      console.log(this.items);
      this.loading = false;
    },
  },
  async created() {
    this.handlePagination("", "get");
    console.log(this.baseApiUrl);
    this.feedStories();
  },
};
</script>

<style lang="scss" scoped>
#content {
  min-height: 80vh;
}
.no-item-text {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-block: 5rem;
  font-size: 1.6rem;
  font-family: "Courier New", Courier, monospace;
}
.pagination_container {
  margin: 3.5rem 0 4.5rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  grid-template-areas: "backBtn nextBtn";
  justify-content: center;
}
.pagination_button {
  letter-spacing: 0.2em;
  transition: color 250ms ease-in-out;
  cursor: pointer;
  @media (hover: hover) {
    &:hover {
      color: var(--color-brand);
    }
  }
  &#backBtn {
    justify-self: flex-end;
    grid-area: backBtn;
  }

  &#nextBtn {
    justify-self: flex-start;
    grid-area: nextBtn;
  }
}
</style>
