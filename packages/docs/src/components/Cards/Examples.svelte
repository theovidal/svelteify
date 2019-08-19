<script>
  import {
    MCard,
    MCardTitle,
    MCardActions,
    MBtn,
    MIcon,
    MFlex,
    MImg
  } from 'svelteify'
</script>

<h2>Classic card</h2>
<MFlex size="xs12 sm6 md3">
  <MCard>
    <MImg
      src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
      alt="Background"
    />

    <MCardTitle primary_title>
      <div>
        <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
        <div>
          Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos
          suavitate referrentur ad, te duo agam libris qualisque, utroque
          quaestio accommodare no qui. Et percipit laboramus usu, no invidunt
          verterem nominati mel. Dolorem ancillae an mei, ut putant invenire
          splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in
          sed, et per malis fuisset, qui id ludus appareat.
        </div>
      </div>
    </MCardTitle>
    <MCardActions>
      <MBtn flat color="orange--text">Share</MBtn>
      <MBtn flat color="orange--text">Explore</MBtn>
    </MCardActions>
  </MCard>
</MFlex>

<h2>Image card</h2>
<MFlex size="xs12 sm6 md3">
  <MCard>
    <MImg
      src="https://exybore.becauseofprog.fr/img/background.jpg"
      alt="Background"
    />
    <MCardActions>
      <MBtn flat icon color="orange--text">
        <MIcon>favorite</MIcon>
      </MBtn>
      <MBtn flat icon color="orange--text">
        <MIcon>bookmark</MIcon>
      </MBtn>
      <MBtn flat icon color="orange--text">
        <MIcon>share</MIcon>
      </MBtn>
    </MCardActions>
  </MCard>
</MFlex>
