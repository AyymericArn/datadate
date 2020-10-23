<script>
    export let stepped = false
</script>

<style lang="stylus">
    .title
      position relative
      z-index 60
      display flex
      width 100vw
      justify-content: space-between
</style>

<div class="title">
    {#if stepped}
        <button>Retour ↑</button>
        <h1>Où dates-tu dans Paris en fonction de l'évolution de la relation ?</h1>
    {:else}
        <h1>Où dates-tu dans Paris ?</h1>
    {/if}
    <span>.dataDATE</span>
</div>
