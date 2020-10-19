<script>
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<style lang="stylus">
	main {
		background-color: black;
		position: relative;
		//max-width: 56em;
		//padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<Nav {segment}/>

<main>
	<slot></slot>
</main>