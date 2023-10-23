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

  <RouterView
    :baseApiUrl="baseApiUrl"
    :options="options"
    :class="[darkMode ? 'dark' : 'light']"
  />
</template>

<script lang="ts">
import { RouterLink, RouterView } from "vue-router";

export default {
  data() {
    return {
      baseApiUrl: "",
      options: null,
      darkMode: true,
    };
  },
  async beforeCreate() {
    try {
      const response = await fetch("/environment.json"); // Reference the file by its URL]
      if (response.ok) {
        const environmentData = await response.json();
        this.baseApiUrl = environmentData.API_BASE_URL;
        this.options = environmentData;
        console.log(this.options);
        console.log(environmentData);
      } else {
        console.error("Failed to fetch environment data");
      }
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style lang="scss" scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.wrapper {
  width: 100%;
}
nav {
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  transition: color 200ms ease-in-out;

  @media (hover: hover) {
    &:hover {
      color: #ff6600;
    }
  }
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
    gap: 2rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
