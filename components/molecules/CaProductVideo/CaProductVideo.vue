<template>
  <client-only>
    <div class="ca-product-video" :class="modifiers">
      <LazyVimeo
        v-show="ready"
        ref="player"
        :video-id="videoId"
        :options="options"
        class="ca-product-video__video"
        @timeupdate="onTimeUpdate"
        @ready="onReady"
      />
      <div
        v-show="ready"
        class="ca-product-video__controls"
        :class="{ 'ca-product-video__controls--playing': isPlaying }"
      >
        <CaIconButton
          class="ca-product-video__button"
          :class="{
            'ca-product-video__button--playing': isPlaying
          }"
          :icon-name="isPlaying ? 'pause' : 'play'"
          :aria-label="isPlaying ? 'Pause video' : 'Play video'"
          @clicked="togglePlayPause"
        />

        <div
          ref="scrollbar"
          class="ca-product-video__scrollbar"
          @mousedown="startScrubbing"
          @touchstart="startScrubbing"
        >
          <div
            class="ca-product-video__progress"
            :style="{ width: progress + '%' }"
          />
        </div>
      </div>
      <CaSkeleton
        v-if="!ready"
        class="ca-product-video__video"
        :radius="false"
        height="100vh"
      />
    </div>
  </client-only>
</template>
<script>
/*
  A component to show the product gallery video
*/
export default {
  name: 'CaProductVideo',
  components: {
    LazyVimeo: () =>
      import('vue-vimeo-player').then(({ vueVimeoPlayer }) => vueVimeoPlayer)
  },
  mixins: [],
  props: {
    videoId: {
      type: String,
      required: true
    },
    aspectRatioProduct: {
      type: Boolean,
      default: true
    },
    autoplay: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    isPlaying: false,
    options: {
      autoplay: false,
      muted: true,
      loop: true,
      background: false,
      responsive: true,
      quality: '1080p',
      controls: false
    },
    progress: 0,
    isScrubbing: false,
    ready: false
  }),
  computed: {
    modifiers() {
      return {
        'ca-product-video--aspect-ratio-product': this.aspectRatioProduct
      };
    }
  },
  watch: {},
  created() {
    if (this.autoplay) {
      this.options.background = true;
    }
  },
  mounted() {},
  methods: {
    onReady() {
      this.ready = true;
      if (this.autoplay) {
        this.isPlaying = true;
      }
    },
    togglePlayPause() {
      if (this.isPlaying) {
        this.pauseVideo();
      } else {
        this.playVideo();
      }
    },
    playVideo() {
      this.$refs.player.play();
      this.isPlaying = true;
    },
    pauseVideo() {
      this.$refs.player.pause();
      this.isPlaying = false;
    },
    onTimeUpdate(data) {
      const percentComplete = ((data.seconds / data.duration) * 100).toFixed(2);
      this.progress = percentComplete;
    },
    startScrubbing(event) {
      event.preventDefault();
      this.isScrubbing = true;
      this.updateProgress(event);
      document.addEventListener('mousemove', this.updateProgress);
      document.addEventListener('touchmove', this.updateProgress);
      document.addEventListener('mouseup', this.stopScrubbing);
      document.addEventListener('touchend', this.stopScrubbing);
    },
    updateProgress(event) {
      if (!this.isScrubbing) {
        return;
      }

      const scrollbar = this.$refs.scrollbar;
      const position = this.getPositionFromEvent(event);
      const progress = Math.min(
        100,
        Math.max(
          0,
          ((position.x - (scrollbar.offsetLeft + 16)) / scrollbar.offsetWidth) *
            100
        )
      );

      this.$refs.player.player.getDuration().then(duration => {
        const updatedTime = (progress / 100) * duration;
        this.$refs.player.player.setCurrentTime(updatedTime);
      });
    },
    stopScrubbing() {
      this.isScrubbing = false;
      document.removeEventListener('mousemove', this.updateProgress);
      document.removeEventListener('touchmove', this.updateProgress);
      document.removeEventListener('mouseup', this.stopScrubbing);
      document.removeEventListener('touchend', this.stopScrubbing);
    },
    getPositionFromEvent(event) {
      if (event.touches && event.touches[0]) {
        return { x: event.touches[0].clientX, y: event.touches[0].clientY };
      } else {
        return { x: event.clientX, y: event.clientY };
      }
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-product-video';
</style>
