<script>
    import scaleSrc from '../../assets/Echelle.svg'
    import { selected } from '../../stores/state'

    function togglePopulation (key, e) {
        console.log(e)
        selected.update(s => {
            !s.population.includes(key) ? s.population.push(key) : s.population.splice(s.population.indexOf(key), 1);
            return s
        })

        e.target.classList.toggle('selected')
    }
    function toggleLieu (key, e) {
        selected.update(s => {
            !s.lieu.includes(key) ? s.lieu.push(key) : s.lieu.splice(s.lieu.indexOf(key), 1);
            return s
        })

        e.target.classList.toggle('selected')
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

            li.selected
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
        <button on:click={(e) => togglePopulation("all", e)}><li>TOUS</li></button>
        <button on:click={(e) => togglePopulation("Bar", e)}><li>Bars</li></button>
        <button on:click={(e) => togglePopulation("Restaurant", e)}><li>Restaurants</li></button>
        <button on:click={(e) => togglePopulation("Cinéma", e)}><li>Cinémas</li></button>
        <button on:click={(e) => togglePopulation("Concert", e)}><li>Concerts</li></button>
        <button on:click={(e) => togglePopulation("Musée", e)}><li>Musée</li></button>
        <button on:click={(e) => togglePopulation("Parc", e)}><li>Parc</li></button>
        <span class="separator">Population</span>
        <button on:click={(e) => toggleLieu("all", e)}><li>TOUS</li></button>
        <button on:click={(e) => toggleLieu("student", e)}><li>Étudiant.e.s</li></button>
        <button on:click={(e) => toggleLieu("alternant", e)}><li>Alternant.e.s</li></button>
        <button on:click={(e) => toggleLieu("jobless", e)}><li>Sans-emploi</li></button>
        <button on:click={(e) => toggleLieu("retired", e)}><li>Retraité.e.s</li></button>
        <button on:click={(e) => toggleLieu("other", e)}><li>Autres</li></button>
        <input type="button" value="Détails par arrondissements">
        <img src={scaleSrc} alt="scale">
    </ul>
</div>