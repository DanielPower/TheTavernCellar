<script lang="ts">
  import Box from "./Box.svelte";
</script>

<div>
  <Box class="overflow-hidden bg-green-950">
    <span class="float-left max-w-[calc(min(40%,14rem))] pr-2">
      <slot name="actions" />
    </span>
    <p><slot name="text" /></p>
  </Box>
</div>
