<script>
    export let stepped = false
</script>

<style lang="stylus">
    .title
      position relative
      z-index 60
      display flex
      width 100vw
      box-sizing border-box
      justify-content: space-between
      font-family: Shrikhand;
      font-style: normal;
      font-weight: normal;
      font-size: 24px;
      pointer-events none
      line-height: 47px;
      h1
        margin 35px
      span
        margin 35px
        font-family: Rubik;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 14px;
        display: flex;
        align-items: flex-end;
        text-align: right;
        color: #FF6AD5;
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
