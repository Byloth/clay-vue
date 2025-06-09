<template>
    <div class="clay-card" v-bind="$attrs">
    </div>
</template>

<style lang="scss">
@use "sass:color";
@use "@/assets/scss/variables";

$input-color-background: #fff;
$input-color-outline: color.complement($input-color-background);
$input-color-shadow: color.adjust($input-color-background, $lightness: -25%);

:root {
  --clay-card-color-background: #{$input-color-background};
  --clay-card-color-background-dark: #{$input-color-background};
  --clay-card-color-outline: #{$input-color-outline};
  --clay-card-color-shadow: #{$input-color-shadow};
  --clay-card-spacing-x:7rem;
  --clay-card-spacing-y:8rem;
  --clay-card-spacing: var(--clay-card-spacing-x) var(--clay-card-spacing-y);
  --clay-card-roundness: var(--clay-card-spacing-x);
}

.clay-card {
  padding: var(--clay-card-spacing);
  border-radius: 11px;
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.10) 50%, rgba(0, 0, 0, 0.20) 100%), #FFF;
  box-shadow:
      0px -2px 4px 0px rgba(0, 0, 0, 0.50) inset,
      0px -8px 16px 0px rgba(0, 0, 0, 0.25) inset,
      0px 40px 48px 0px rgba(0, 0, 0, 0.60);
}

.clay-card.clay-card--glass {
padding: var(--clay-card-spacing);
border-radius: 11px;
background: linear-gradient(180deg, rgba(0, 0, 0, 0.00) -3.72%,
rgba(0, 0, 0, 0.10) 48.14%, rgba(0, 0, 0, 0.20) 100%), rgba(255, 255, 255, 0.00);
box-shadow:
 0px -2px 4px 0px rgba(0, 0, 0, 0.50) inset,
 0px -8px 16px 0px rgba(0, 0, 0, 0.25) inset,
 0px 40px 48px 0px rgba(0, 0, 0, 0.60);
}

.clay-card--Vicino {
box-shadow:
      0px -2px 4px 0px rgba(0, 0, 0, 0.50) inset,
      0px -8px 16px 0px rgba(0, 0, 0, 0.25) inset,
      0px 10px 10px 0px rgba(0, 0, 0, 0.60);
    }

.clay-card--Alto {
box-shadow:
      0px -2px 4px 0px rgba(0, 0, 0, 0.50) inset,
      0px -8px 16px 0px rgba(0, 0, 0, 0.25) inset,
      0px 80px 80px 0px rgba(0, 0, 0, 0.60);
    }

@media (prefers-color-scheme: dark) {
  .clay-card {
  padding: var(--clay-card-spacing);
   border-radius: 11px;
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.10) 50%, rgba(0, 0, 0, 0.20) 100%), #242323;
  box-shadow:
        0px -2px 16px 0px rgba(0, 0, 0, 0.50) inset,
        0px -8px 16px 0px rgba(0, 0, 0, 0.25) inset,
        0px 40px 48px 0px rgba(0, 0, 0, 0.60);
  }

  .clay-card.clay-card--glass {
    padding: var(--clay-card-spacing);
    border-radius: 11px;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.00) -3.72%,
    rgba(0, 0, 0, 0.10) 48.14%, rgba(0, 0, 0, 0.20) 100%), rgba(36, 35, 35, 0.00);
    box-shadow:
      0px -2px 4px 0px rgba(0, 0, 0, 0.50) inset,
      0px -8px 16px 0px rgba(0, 0, 0, 0.25) inset,
      0px 40px 48px 0px rgba(0, 0, 0, 0.60);
  }

  .clay-card--Vicino {
box-shadow:
      0px -2px 4px 0px rgba(0, 0, 0, 0.50) inset,
      0px -8px 16px 0px rgba(0, 0, 0, 0.25) inset,
      0px 10px 10px 0px rgba(0, 0, 0, 0.60);
    }

.clay-card--Alto {
box-shadow:
      0px -2px 4px 0px rgba(0, 0, 0, 0.50) inset,
      0px -8px 16px 0px rgba(0, 0, 0, 0.25) inset,
      0px 80px 80px 0px rgba(0, 0, 0, 0.60);
    }
}

.clay-card.clay-card--glass.clay-card--Vicino {
  box-shadow:
    0px -2px 4px 0px rgba(0, 0, 0, 0.50) inset,
    0px -8px 16px 0px rgba(0, 0, 0, 0.25) inset,
    0px 10px 10px 0px rgba(0, 0, 0, 0.60);
}

.clay-card.clay-card--glass.clay-card--Alto {
  box-shadow:
    0px -2px 4px 0px rgba(0, 0, 0, 0.50) inset,
    0px -8px 16px 0px rgba(0, 0, 0, 0.25) inset,
    0px 80px 80px 0px rgba(0, 0, 0, 0.60);
}
</style>
