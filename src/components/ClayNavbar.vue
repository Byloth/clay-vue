<template>
  <ClayCard>
    <nav class="clay-navbar">
      <div class="clay-navbar__brand">
        <span class="clay-navbar__brand-text">BRAND<sup>™</sup></span>
      </div>
      <ul class="clay-navbar__links">
        <li><a href="#" class="active">Page 1</a></li>
        <li><a href="#">Page 2</a></li>
        <li><a href="#">Page 3</a></li>
      </ul>
      <div class="clay-navbar__button">
        <button>Button</button>
      </div>
    </nav>
  </ClayCard>
</template>

<script lang="ts" setup>
import ClayCard from "./ClayCard.vue";
</script>

<style lang="scss">
@use "@/assets/scss/mixins";
@use "@/assets/scss/variables";

 .clay-navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--clay-light-color);
  font-family: #{variables.$font-family};
  font-weight: 500;
  font-size: 1.15em;
  min-height: 3.5em;
  box-sizing: border-box;

  &__brand {
    font-weight: bold;
    font-size: 2em;
    font-style: italic;
    letter-spacing: 0.05em;
    display: flex;
    align-items: center;
    color: var(--clay-dark-color);
    transition: color var(--ease-duration);

    @media (prefers-color-scheme: dark) {
      color: var(--clay-light-color);
    }

    .clay-navbar__brand-text {
      font-family: #{variables.$font-family};
      font-weight: 900;
      font-style: italic;
      letter-spacing: 0.05em;
      transition: color var(--ease-duration);
    }
    sup {
      font-size: 0.5em;
      font-weight: 700;
      margin-left: 0.1em;
    }

    &:hover {
      color: var(--clay-primary-color);
      transition: color var(--clay-ease-duration) var(--clay-ease-function);
    }
  }
  &__links {
    display: flex;
    gap: 1.5em;
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      a {
        color: #444;
        text-decoration: none;
        opacity: 0.7;
        font-weight: 500;
        transition: color var(--ease-duration);

        &.active {
          color: #222;
          opacity: 1;
        }

        &:hover {
          color: var(--clay-primary-color);
          transform: scale(1.2);
          font-size: 1.2em;
          transition: color var(--clay-ease-duration) var(--clay-ease-function),
                      transform var(--clay-ease-duration) var(--clay-ease-function),
                      font-size var(--clay-ease-duration) var(--clay-ease-function);
        }
        &:not(:hover) {
          transition: color var(--clay-ease-duration) var(--clay-ease-function),
                      transform var(--clay-ease-duration) var(--clay-ease-function),
                      font-size var(--clay-ease-duration) var(--clay-ease-function);
          transform: scale(1);
          font-size: 1em;
        }
      }
    }

    @media (prefers-color-scheme: dark) {
      li {
        a {
          color: #bbb;

          &.active {
            color: #fff;
          }

          &.active:hover {
            color: var(--clay-primary-color);
          }
        }
      }
    }
  }
  &__button {
    button {
      position: absolute;
      top: 0;
      right: 0;
      width: 200px;
      height: 100%;
      padding: 12px;
      justify-content: center;
      align-items: center;
      gap: 10px;
      border-radius: var(--clay-card-roundness);
      background: transparent;
      color: var(--clay-dark-color);
      font-size: 1.2em;
      font-weight: bold;
      border: none;
      transition: background-color var(--clay-ease-duration) var(--clay-ease-function),
                  color var(--clay-ease-duration) var(--clay-ease-function);

      &:hover {
        background: var(--clay-primary-color);
        color: var(--clay-light-color);
      }

      @media (prefers-color-scheme: dark) {
        color: var(--clay-light-color);

        &:hover {
          background: var(--clay-primary-color);
          color: var(--clay-dark-color);
        }
      }
    }
  }
}
</style>
