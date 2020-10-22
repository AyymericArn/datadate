<script>
	import { goto } from '@sapper/app';

	import anime from 'animejs/lib/anime.es.js';
	import { onMount } from 'svelte'

	let title, entering = false

	function enter() {
		entering = true
		setTimeout(() => {
			goto('map')
		}, 600);
	}

	onMount(async () => {
		title.innerHTML = title.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
		
		anime.timeline({loop: false})
			.add({
				targets: 'h1 .letter',
				translateY: [-200,0],
				easing: "easeOutExpo",
				duration: 1400,
				delay: (el, i) => 30 * i
			})
	})
</script>

<style lang="stylus">

	.container
		width 100vw
		height 100vh
		display flex
		flex-direction column
		align-items center
		justify-content space-around

		h1
			color white
			font-family: Rubik;
			font-style: normal;
			font-weight: normal;
			font-size: 82px;
			line-height: 97px;
			padding: 40px 0;
			overflow: hidden;

			.letter
				display: inline-block;
				position: relative;
				line-height: 1em;

		.center
			display flex
			flex-direction column
			justify-content center
			align-items center
			animation pop 1s cubic-bezier(.17,.67,.13,1.02) 1 1s
			animation-fill-mode both

			p
				color white
				font-family: Shrikhand;
				font-style: normal;
				font-weight: normal;
				font-size: 32px;
				line-height: 115.7%;

			button
				color black
				border-radius 50px
				border none
				background white
				font-family: Shrikhand;
				font-style: normal;
				font-weight: normal;
				font-size: 20px;
				line-height: 115.7%;
				cursor pointer
				margin-top 24px
				padding 8px 12px
				width max-content

		.animator
			position absolute
			left 0
			top 0
			border-radius 50%
			width 150vw
			background black
			z-index 100
			height 150vh
			transform scale(0)

			&.triggered
				animation pop 1s cubic-bezier(.17,.67,.13,1.02) 1
				animation-fill-mode both

		@keyframes pop {
			from {transform: scale(0)}
			to {transform: scale(1)}
		}
</style>

<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

<div class="container">
	<h1 bind:this={title}><span class="letter"></span>.dataDATE</h1>
	
	<div class={entering ? 'animator triggered' : 'animator'}></div>

	<div class="center">
		<p>Où dates-tu dans Paris ?</p>
		
		<button on:click={enter}>Trouver une adresse</button>
	</div>
	<div class="letter"></div>
</div>
