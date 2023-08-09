<script lang="ts">
  import Box from "./Box.svelte";
</script>

<div>
  <Box class="overflow-hidden bg-green-950">
    <span class="float-left max-w-[40%] pr-2">
      <slot name="image" />
      <slot name="buttons" />
    </span>
    <p><slot name="text" /></p>
  </Box>
</div>
