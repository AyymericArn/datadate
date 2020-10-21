<script>
    import scaleSrc from '../../assets/Echelle.svg'
    import { selected } from '../../stores/state'

    function changePopulation (index) {
        selected.update(s => {
            return {...s, population: index}
        })
    }
    function changeLieu (index) {
        selected.update(s => {
            return {...s, lieu: index}
        })
    }
</script>

<style lang="stylus">
    .menu
        position relative
        box-sizing border-box
        display flex
        justify-content: space-between;
        margin-right 50px
        margin-bottom 70px
        margin-left 50px

        .chronology
          position relative
          z-index 50
          margin-top 46px
          background none
          border white solid 1px
          border-radius 50px
          color white
          padding 6px 20px
          cursor pointer
          height min-content
          align-self flex-end

        ul
          z-index 50
          display flex
          flex-direction column
          padding-left 0
          margin-left 0
          position absolute
          bottom 0px
          right 50px

          button
            cursor pointer
            text-align left
            margin 10px 0
            background none
            border none
            color white
            font-size 16px
            list-style none
            padding-left 0

            &:focus
                outline none

            &.selected
              font-weight bold

          .separator
            margin-top 46px
            padding 8px 0
            font-style italic
            text-decoration underline
            text-transform capitalize
            font-size: 16px;
            line-height: 17px;

          input
            margin-top 46px
            background none
            border white solid 1px
            border-radius 50px
            color white
            padding 6px 20px
            cursor pointer

          img
            position absolute
            bottom 0
            right 120%

</style>

<div class="menu">
    <button class="chronology">Chronologie des dates ↓</button>

    <ul>
        <span class="separator">Lieux de dates</span>
        <button on:click={() => changePopulation(0)}><li>TOUS</li></button>
        <button on:click={() => changePopulation(1)}><li>Bars</li></button>
        <button on:click={() => changePopulation(2)}><li>Restaurants</li></button>
        <button on:click={() => changePopulation(3)}><li>Cinémas</li></button>
        <button on:click={() => changePopulation(4)}><li>Concerts</li></button>
        <button on:click={() => changePopulation(5)}><li>Musée</li></button>
        <button on:click={() => changePopulation(6)}><li>Parc</li></button>
        <span class="separator">Population</span>
        <button on:click={() => changeLieu(0)}><li>TOUS</li></button>
        <button on:click={() => changeLieu(1)}><li>Étudiant.e.s</li></button>
        <button on:click={() => changeLieu(2)}><li>Alternant.e.s</li></button>
        <button on:click={() => changeLieu(3)}><li>Sans-emploi</li></button>
        <button on:click={() => changeLieu(4)}><li>Séniors</li></button>
        <input type="button" value="Détails par arrondissements">
        <img src={scaleSrc} alt="scale">
    </ul>
</div>