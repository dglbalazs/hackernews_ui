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
        <font-awesome-icon
          icon="fa-solid fa-caret-left"
          style="color: var(--color-brand)"
        />
        Back
      </div>
      <div
        v-if="items.length > 0"
        class="pagination_button"
        id="nextBtn"
        @click="paginationButton('next')"
      >
        Next
        <font-awesome-icon
          icon="fa-solid fa-caret-right"
          style="color: var(--color-brand)"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { getData, getItem } from "@/components/functions";
import type { ModifiedItem, itemListReturn } from "@/components/types";
import StoryItem from "@/components/StoryItem.vue";
import Loader from "@/components/Helper/Loader.vue";

export default {
  components: { StoryItem, Loader },
  data() {
    return {
      items: [] as Array<ModifiedItem>,
      pageNumber: 1,
      storyPerPage: 10,
      loading: true,
    };
  },
  props: ["endpoint", "baseApiUrl"],
  methods: {
    // Fetching Story IDs for the page
    getData: async function () {
      try {
        const response = await getData(
          this.baseApiUrl,
          this.endpoint,
          this.storyPerPage,
          this.pageNumber
        );
        return response;
      } catch (error) {
        console.error("Error while fetching ids - ", error);
        const emptyData: itemListReturn = {
          hasData: false,
          dataArr: [],
          indexArr: [],
        };
        return emptyData;
      }
    },

    // Fetching Story data based on ID
    getItem: async function (id: string, itemIndex: number) {
      try {
        const itemData = await getItem(this.baseApiUrl, id, itemIndex);
        return itemData;
      } catch (error) {
        console.error("Error fetching item:", error);
        return null;
      }
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

      // Collecting IDs for the page
      const dataResponse: itemListReturn = await this.getData();

      // In case the page is empty, we store an empty array
      if (!dataResponse.hasData) {
        this.items = [];
        this.loading = false;
        return;
      }

      // Prepare empty array where we can async feed the data for each item
      let unsortedData = [] as Array<ModifiedItem>;

      // Fetch the data for all IDs async
      await Promise.all(
        dataResponse.dataArr.map(async (itemId: string, index: number) => {
          let itemData = await this.getItem(
            itemId,
            dataResponse.indexArr[index]
          );
          if (itemData) unsortedData.push(itemData);
        })
      );

      // Now that we have the data, sort them again, as async didn't complete it in original order
      this.items = unsortedData.sort((a, b) => a.itemIndex - b.itemIndex);

      console.log(this.items);
      this.loading = false;
    },
  },
  async created() {
    this.handlePagination("", "get");
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
