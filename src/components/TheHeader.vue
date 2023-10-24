<template>
  <header :class="[darkMode ? 'dark' : 'light']">
    <a
      class="image_link"
      href="https://news.ycombinator.com/news"
      target="_blank"
      rel="noopenner noreferrer"
      ><img
        alt="logo"
        class="logo"
        src="@/assets/logo.svg"
        width="125"
        height="125"
      />
    </a>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Top</RouterLink>
        <RouterLink to="/new">New</RouterLink>
        <RouterLink to="/best">Best</RouterLink>
        <RouterLink to="/ask">Ask</RouterLink>
        <RouterLink to="/show">Show</RouterLink>
        <RouterLink to="/job">Job</RouterLink>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
export default {
  props: ["darkMode"],
};
</script>

<style lang="scss" scoped>
header {
  line-height: 1.5;
  max-height: 100vh;

  @media (min-width: 55rem) {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .image_link {
    margin-top: -0.5em;
  }
  .logo {
    display: block;
    margin: 0 auto 2rem;
  }

  .wrapper {
    width: 100%;

    @media (min-width: 55rem) {
      display: flex;
      place-items: flex-start;
      flex-wrap: wrap;
    }

    nav {
      display: flex;
      justify-content: center;
      width: 100%;
      font-size: 12px;
      text-align: center;
      margin-top: 2rem;

      @media (min-width: 55rem) {
        font-size: 1rem;
        gap: 2em;
      }

      a {
        display: inline-block;
        transition: color 200ms ease-in-out;

        @media (max-width: 55em) {
          padding: 0 1em;
        }

        &:hover {
          color: var(--color-brand);
        }
        &:not(:first-of-type) {
          border-left: 1px solid var(--color-border);

          @media (min-width: 55em) {
            padding-left: 2em;
          }
        }

        &.router-link-exact-active {
          color: var(--color-brand);
          text-decoration: underline;
          text-underline-offset: 0.5em;
        }
      }
    }
  }
}
</style>
