<style lang="stylus">
    .menu
        display flex
        justify-content: space-between;

        ul
          display flex
          flex-direction column

          button
            text-align left
</style>

<div class="menu">
    <button>Chronologie des dates</button>

    <ul>
        <button><li>All</li></button>
        <button><li>Étudiant.e.s</li></button>
        <button><li>Alternant.e.s</li></button>
        <button><li>Sans-emploi</li></button>
        <button><li>Séniors</li></button>
        <input type="button" value="Détails par arrondissements">
    </ul>
</div>