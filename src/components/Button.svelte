<script>
	export let ref = null;
</script>

<button
	class={`rounded-md border-2 border-red-800 bg-gradient-to-b from-gray-200 to-gray-500
    p-1 text-black hover:from-gray-300 hover:to-gray-600 active:from-gray-600 
    active:to-gray-900 active:text-white disabled:cursor-not-allowed disabled:from-gray-400
    disabled:to-gray-700 disabled:text-gray-700`}
	bind:this={ref}
	on:click
	on:focus
	on:mouseover
	on:mouseenter
	on:mouseleave
	{...$$props}
>
	<slot />
</button>
