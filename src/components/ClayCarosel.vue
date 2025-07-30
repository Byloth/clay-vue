<script lang="ts" setup>
    import { ref } from "vue";

    import ClayCard from "./ClayCard.vue";
    import ClayButton from "./ClayButton.vue";

    const props = defineProps({
        vertical: {
            type: Boolean,
            default: false
        },
        withButtons: {
            type: Boolean,
            default: false
        }
    });

    const images = [
        "https://picsum.photos/1920/1080",
        "https://picsum.photos/1920/1080",
        "https://picsum.photos/1920/1080"
    ];

    const carouselRef = ref<HTMLElement | null>(null);
    const isDragging = ref(false);
    const startPos = ref(0);
    const scrollStart = ref(0);
    const scrollAmount = 300;

    const scrollNext = (): void =>
    {
        if (!carouselRef.value) { return; }
        if (props.vertical)
        {
            carouselRef.value.scrollTop += scrollAmount;
        }
        else
        {
            carouselRef.value.scrollLeft += scrollAmount;
        }
    };

    const scrollPrev = (): void =>
    {
        if (!carouselRef.value) { return; }
        if (props.vertical)
        {
            carouselRef.value.scrollTop -= scrollAmount;
        }
        else
        {
            carouselRef.value.scrollLeft -= scrollAmount;
        }
    };

    defineExpose({ scrollNext, scrollPrev });

    const onWheel = (e: WheelEvent): void =>
    {
        if (!carouselRef.value) { return; }
        if (props.vertical)
        {
            carouselRef.value.scrollTop += e.deltaY;
        }
        else
        {
            carouselRef.value.scrollLeft += e.deltaY;
        }
    };

    const onDragStart = (e: MouseEvent): void =>
    {
        if (!carouselRef.value) { return; }
        isDragging.value = true;
        carouselRef.value.classList.add("dragging");

        if (props.vertical)
        {
            startPos.value = e.pageY - carouselRef.value.offsetTop;
            scrollStart.value = carouselRef.value.scrollTop;
        }
        else
        {
            startPos.value = e.pageX - carouselRef.value.offsetLeft;
            scrollStart.value = carouselRef.value.scrollLeft;
        }
    };

    const onDragMove = (e: MouseEvent): void =>
    {
        if (!isDragging.value || !carouselRef.value) { return; }

        let current = 0;
        if (props.vertical)
        {
            current = e.pageY - carouselRef.value.offsetTop;
        }
        else
        {
            current = e.pageX - carouselRef.value.offsetLeft;
        }

        const walk = current - startPos.value;
        if (props.vertical)
        {
            carouselRef.value.scrollTop = scrollStart.value - walk;
        }
        else
        {
            carouselRef.value.scrollLeft = scrollStart.value - walk;
        }
    };

    const onDragEnd = (): void =>
    {
        if (!carouselRef.value) { return; }
        isDragging.value = false;
        carouselRef.value.classList.remove("dragging");
    };
</script>

<template>
    <div class="clay-carosel-wrapper" :class="{ vertical }">
        <div class="clay-carosel" :class="{ vertical }">
            <div ref="carouselRef"
                 class="clay-carosel__container"
                 @wheel.prevent="onWheel"
                 @mousedown="onDragStart"
                 @mousemove="onDragMove"
                 @mouseup="onDragEnd"
                 @mouseleave="onDragEnd">
                <div v-for="(image, index) in images"
                     :key="index"
                     class="clay-carosel__item"
                     :class="{ vertical }">
                    <ClayCard :style="{ background: 'none', boxShadow: 'var(--clay-shadow)' }">
                        <img :src="image"
                             alt="Image"
                             class="clay-carosel__image"
                             @mousedown.prevent />
                    </ClayCard>
                </div>
            </div>
        </div>

        <!-- Fade overlay -->
        <div class="clay-carosel__fade" :class="{ vertical }"></div>

        <!-- Buttons -->
        <ClayButton v-if="withButtons"
                    class="clay-carosel__button prev"
                    :class="{ vertical: props.vertical }"
                    aria-label="Scroll previous"
                    @click="scrollPrev">
            {{ props.vertical ? '↑' : '←' }}
        </ClayButton>

        <ClayButton v-if="withButtons"
                    class="clay-carosel__button next"
                    :class="{ vertical: props.vertical }"
                    aria-label="Scroll next"
                    @click="scrollNext">
            {{ props.vertical ? '↓' : '→' }}
        </ClayButton>
    </div>
</template>

<style lang="scss">
.clay-carosel-wrapper {
  position: relative;

  &.vertical {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80%;
  }
}

.clay-carosel {
  width: 100%;
  overflow: hidden;
  padding: 24px 0;
  position: relative;

  &.vertical {
    height: 100%;
    padding: 24px 0;
  }
}

.clay-carosel__container {
  display: flex;
  overflow: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  user-select: none;
  gap: 24px;
  padding: 0 24px;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  flex-direction: row;
  cursor: grab;
}

.clay-carosel.vertical .clay-carosel__container {
  flex-direction: column;
  scroll-snap-type: y mandatory;
  height: 100%;
  padding: 0 12px;
}

.clay-carosel__container::-webkit-scrollbar {
  display: none;
}

.clay-carosel__item {
  flex: 0 0 80%;
  scroll-snap-align: center;
  transition: transform 0.3s ease;

  &.vertical {
    flex: 0 0 70%;
  }
}

.clay-carosel__image {
  width: 100%;
  border-radius: 16px;
  display: block;
}

.dragging {
  cursor: grabbing;
  user-select: none;
}

.clay-carosel__button {
  padding: 8px 12px;
  transition: transform 0.2s ease;
  z-index: 5;

  &.prev,
  &.next {
    position: absolute;
  }

  &.prev:not(.vertical) {
    left: -45px;
    top: 50%;
    transform: translateY(-50%);
  }

  &.next:not(.vertical) {
    right: -45px;
    top: 50%;
    transform: translateY(-50%);
  }

  &.vertical.prev {
    top: 50%;
    right: -24px;
    transform: translateY(-50%);
  }

  &.vertical.next {
    top: 60%;
    right: -24px;
    transform: translateY(-50%);
  }
}

.clay-carosel__fade {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;

  background: linear-gradient(
    to right,
    var(--clay-color-background) 0%,
    transparent 20%,
    transparent 80%,
    var(--clay-color-background) 100%
  );

  &.vertical {
    background: linear-gradient(
      to bottom,
    var(--clay-color-background) 0%,
      transparent 20%,
      transparent 80%,
    var(--clay-color-background) 100%
    );
  }
}
</style>
