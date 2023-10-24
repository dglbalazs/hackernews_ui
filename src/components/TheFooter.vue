<template>
  <div id="footer">
    <template
      v-for="element in footerElements"
      :key="footerElements.indexOf(element)"
    >
      <a
        :href="(element[2] == 'mail' ? 'mailto:' : '') + element[1]"
        :target="element[2] == 'outlink' ? '_blank' : ''"
        :rel="element[2] == 'outlink' ? 'noopener noreferrer' : ''"
        >{{ element[0] }}</a
      >
    </template>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      footerElements: [
        [
          "Guidelines",
          "https://news.ycombinator.com/newsguidelines.html",
          "outlink",
        ],
        ["FAQ", "https://news.ycombinator.com/newsfaq.html", "outlink"],
        ["Lists", "https://news.ycombinator.com/lists", "outlink"],
        ["API", "https://github.com/HackerNews/API", "outlink"],
        ["Security", "https://news.ycombinator.com/security.html", "outlink"],
        ["Legal", "https://ycombinator.com/legal/", "outlink"],
        ["Apply to YC", "https://ycombinator.com/apply/", "outlink"],
        ["Contact", "hn@ycombinator", "mail"],
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
#footer {
  border-top: 1px solid var(--color-brand);

  display: flex;
  padding-block: 2em;
  gap: 1em;
  justify-content: space-evenly;
  flex-wrap: wrap;

  a {
    transition: color 200ms ease-in-out;
    @media (hover: hover) {
      &:hover {
        color: var(--color-brand);
      }
    }
    @media (max-width: 55em) {
      font-size: 12px;
    }
  }
  a:not(:first-of-type) {
    padding-left: 4em;
    @media (max-width: 55em) {
      padding-left: 1em;
    }
  }
}
</style>
