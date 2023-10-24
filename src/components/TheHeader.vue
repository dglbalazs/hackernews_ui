<template>
  <header :class="[darkMode ? 'dark' : 'light']">
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />
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
        // text-align: left;
        // margin-left: -1rem;
        font-size: 1rem;
        gap: 2em;
        // padding: 0 2rem;
        // padding: 1rem 0;
        // margin-top: 1rem;
      }

      a {
        display: inline-block;
        transition: color 200ms ease-in-out;

        @media (max-width: 55em) {
          padding: 0 1em;
        }

        &:hover {
          color: #ff6600;
        }
        &:not(:first-of-type) {
          border-left: 1px solid var(--color-border);

          @media (min-width: 55em) {
            padding-left: 2em;
          }
        }

        &.router-link-exact-active {
          color: #ff6600;
          text-decoration: underline;
          text-underline-offset: 0.5em;
        }
      }
    }
  }
}
</style>
