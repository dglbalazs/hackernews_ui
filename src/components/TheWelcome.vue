<template>
  <div>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque quas aliquid
    nam iste atque quo minus non eveniet molestias, ut ab, dolorem vitae
    possimus placeat! Suscipit et consequuntur nostrum vitae.

    <div>
      {{ baseApiUrl }}
    </div>
    <div>
      {{ returnArr }}
    </div>
    <div>
      {{ count }}
    </div>
  </div>
</template>

<script lang="ts">
import { getData, getItem, getCommentCount } from "@/components/functions";

export default {
  data() {
    return {
      baseApiUrl: (this.$root as any).baseApiUrl,
      returnArr: [],
      count: 0,
    };
  },
  methods: {
    getData: async function () {
      return await getData(this.baseApiUrl);
    },
    getItem: async function (id: string) {
      return await getItem(this.baseApiUrl, id);
    },
    getCommentCount: async function (id: string) {
      return await getCommentCount(this.baseApiUrl, id);
    },
  },
  async created() {
    console.log(this.baseApiUrl);
    const data = await this.getData();
    console.dir(data);
    console.log(data.length);
    console.log(data[0]);
    this.returnArr = await this.getItem(data[1]);
    this.count = await this.getCommentCount(data[1]);
  },
};
</script>
