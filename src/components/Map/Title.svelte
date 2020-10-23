<script>
    import { screen } from '../../stores/state'
    export let stepped = false

    function back () {
        screen.set(0)
    }
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
      //pointer-events none
      line-height: 47px;
      button
        cursor pointer
        padding 8px 40px
        margin 35px 0 0 35px
        background none
        border white 1px solid
        color white
        font-family: Rubik;
        font-style: normal;
        font-weight: normal;
        font-size: 10px;
        line-height: 12px;
        display: flex;
        align-items: center;
        text-align: center;
        color: white;
        font-size 18px
        border-radius 50px
      h1
        margin 35px
        max-width: 1200px;

      span
        margin 35px
        margin-right 120px
        font-family: Rubik;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 14px;
        display: flex;
        align-items: flex-end;
        text-align: right;
        color: #FF6AD5;
</style>

<div class="title">
    {#if stepped}
        <div>
            <button on:click={back}>Retour ↑</button>
            <h1>Où dates-tu dans Paris en fonction de l'évolution de la relation ?</h1>
        </div>
    {:else}
        <h1>Où dates-tu dans Paris ?</h1>
    {/if}
    <span>.dataDATE</span>
</div>
