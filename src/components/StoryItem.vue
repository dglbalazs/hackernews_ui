<template>
  <div class="story" :id="item.id">
    <div :class="['story-content', hoveredLink ? 'hovered' : '']">
      <div class="story-content__header">
        <div class="story-content__header_index">
          <span class="colored">#</span> {{ item.itemIndex + 1 }}
        </div>
        <div class="story-content__header_scores">
          Score:
          {{ item.score }}
          <font-awesome-icon
            icon="fa-solid fa-circle-arrow-up"
            style="color: var(--color-brand)"
          />
        </div>
      </div>
      <div class="story-content__main">
        <p class="story-content__main_submit">
          Submitted:
          <span class="submitted_date" :data-tooltip="item.timeExact">{{
            formatTime(item.time)
          }}</span>
          - by
          <a
            class="user"
            :href="'https://news.ycombinator.com/user?id=' + item.by"
            target="_blank"
            rel="noopener noreferrer"
            >{{ item.by }}</a
          >
          <sup class="karma"> {{ item.byKarma }}</sup>
        </p>
        <a
          :href="item.url"
          target="_blank"
          rel="noopener noreferrer"
          @mouseenter="() => (hoveredLink = true)"
          @mouseleave="() => (hoveredLink = false)"
        >
          <h2 class="story-content__main_title" v-html="item.title"></h2>
          <div class="story-content__main_url" v-if="item.url">
            Source : <span class="colored">{{ getTLDFromURL(item.url) }}</span>
          </div>
          <div
            class="story-content__main_text"
            v-if="!item.url && item.text"
            v-html="truncateString(item.text, 150)"
          ></div>
        </a>
      </div>
    </div>
    <a
      :href="'https://news.ycombinator.com/item?id=' + item.id"
      target="_blank"
      rel="noopener noreferrer"
      :class="[
        'story-comments',
        !item.descendants || item.descendants < 1 ? 'no_comment' : '',
      ]"
    >
      <p>
        {{ item.descendants }} Comment{{
          item.descendants && item.descendants > 1 ? "s" : ""
        }}
      </p>
    </a>
  </div>
</template>

<script lang="ts">
import type { ModifiedItem } from "@/components/types";

export default {
  data() {
    return {
      hoveredLink: false,
    };
  },
  props: {
    item: {
      type: Object as () => ModifiedItem,
      required: true,
      validator: (value: ModifiedItem) => {
        if (
          value &&
          value.id &&
          value.type &&
          value.by &&
          value.time &&
          value.timeExact
        ) {
          return true;
        } else {
          throw new Error("Invalid prop 'item'");
        }
      },
    },
  },
  methods: {
    // Top Domain Url Conversion from full URL
    getTLDFromURL(url?: string) {
      if (!url) return;
      // Use a regular expression to extract the TLD
      const match = url.match(
        /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n?]+)?/
      );
      if (match && match[1]) {
        // If a match is found, return the TLD
        return match[1];
      }
      return null; // Return null if no TLD is found
    },

    // Shortening text in case we are not showing a URL source, but the Optional Text input field from submission.
    truncateString(inputString: string, maxLength: number) {
      if (inputString.length <= maxLength) {
        return inputString; // Return the string as is if it's shorter than maxLength.
      } else {
        return inputString.substring(0, maxLength) + "..."; // Truncate and add three dots.
      }
    },

    // Function that formats UNIX time to e.g. "7 hours ago" || "3 minutes ago"
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
        return this.item.timeExact;
      }
    },
  },
};
</script>

<style scoped lang="scss">
$main-color: var(--color-brand);
$comments-subcolor: hsl(24, 100%, 50%);
$title-color: white;
$nocomment-opacity: 0.6;

$overall-fontsize: 0.7rem;
$index-fontsize: 1.5em;
$scores-fontsize: 1em;
$karma-fontsize: 0.8em;
$karma-letterspacing: 0.02em;
$title-fontsize: 2em;
$subtext-fontsize: 1.2em;
$subtext-lineheight: 1.8;
$comments-fontsize: 1em;
$comments-letterspacing: 0.01em;
$comments-lineheight: 1.6;

$storycard-width-desktop: 70%;
$storycard-width-mobile: 80%;
$subtext-width: 100%;

$card-bottom-radius: 2rem;

$content-padding: 1em 2em;
$content-padding-bottom: 2em;
$user-margins: 0.2em;
$title-margin-block: 1rem;
$subtext-margin-top: 1em;
$margin-block: 2em;
$comments-padding-vertical: 0.6em;
$comments-padding-horizontal: 0.3em;

.story {
  font-size: $overall-fontsize;
  display: flex;
  margin-inline: auto;
  margin-block: $margin-block;
  width: $storycard-width-desktop;
  flex-direction: column;
  border-bottom-left-radius: $card-bottom-radius;
  border-bottom-right-radius: $card-bottom-radius;

  @media (max-width: 55em) {
    width: $storycard-width-mobile;
  }

  .colored {
    color: $main-color;
  }

  .story-content {
    cursor: pointer;
    border: 1px solid grey;
    border-bottom-color: transparent !important;
    padding: $content-padding;
    padding-bottom: $content-padding-bottom;
    transition: box-shadow 250ms ease-in-out, border-color 250ms ease-in-out;

    @media (hover: hover) {
      &.hovered {
        box-shadow: 0 -1px 0.4em $main-color;
        border-color: $main-color;
      }
    }

    .story-content__header {
      display: flex;
      justify-content: space-between;
      .story-content__header_index {
        font-size: $index-fontsize;
      }

      .story-content__header_scores {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1em;
        font-size: $scores-fontsize;
        svg {
          font-size: 1.2em;
          border-radius: 50%;
          @media (hover: hover) {
            &:hover {
              scale: 1.1;
            }
          }
        }
      }
    }

    .story-content__main {
      .story-content__main_submit {
        z-index: 2;

        .submitted_date {
          position: relative;
        }

        .submitted_date::after {
          content: attr(data-tooltip);
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          padding: 8px;
          background-color: #333;
          color: #fff;
          border-radius: 4px;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s, visibility 0.3s;
          width: max-content;
          z-index: 3;
        }

        .submitted_date:hover::after {
          opacity: 1;
          visibility: visible;
        }
        .user {
          text-decoration: underline;
          text-decoration-color: $main-color;
          text-underline-offset: $user-margins;
          margin-right: $user-margins;
          transition: text-underline-offset 200ms ease-in-out;
          @media (hover: hover) {
            &:hover {
              text-underline-offset: calc($user-margins + 0.2em);
            }
          }
        }

        .karma {
          font-size: $karma-fontsize;
          letter-spacing: $karma-letterspacing;
        }
      }

      .story-content__main_title {
        color: $title-color;
        margin-block: $title-margin-block;
        font-size: $title-fontsize;
      }

      .story-content__main_url {
      }

      .story-content__main_text {
        margin-top: $subtext-margin-top;
        width: $subtext-width;
        font-size: $subtext-fontsize;
        line-height: $subtext-lineheight;
      }
    }
  }

  .story-comments {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: $comments-padding-vertical $comments-padding-horizontal;
    background: $main-color;
    color: rgb(20, 13, 13);
    font-size: 1em;
    letter-spacing: $comments-letterspacing;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-weight: 500;
    line-height: $comments-lineheight;
    width: 100%;
    border-bottom-left-radius: $card-bottom-radius;
    border-bottom-right-radius: $card-bottom-radius;
    z-index: 2;
    transition: box-shadow 250ms ease-in-out, border-color 250ms ease-in-out,
      opacity 250ms ease-in-out;
    border: 1px solid transparent;

    @media (hover: hover) {
      &:hover {
        box-shadow: 0 -0.2em 0.5em $comments-subcolor;
        border-color: $main-color;
        opacity: 1 !important;
      }
    }

    &.no_comment {
      opacity: $nocomment-opacity;
    }
  }
}
</style>
