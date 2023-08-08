<script lang="ts">
  import "../app.css";
</script>

<h1 class="text-2xl">The Basement Cellar</h1>
<p class="pb-1 text-lg">Created for Gump Jam</p>
<slot />
<footer>
  Built on {new Date().toUTCString()}
</footer>
