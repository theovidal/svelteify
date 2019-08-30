<script>
  import { MCard, MCardTitle, MCardActions, MBtn, MImg } from 'svelteify'

  export let props
</script>

<MCard {...props}>
  <MImg src="/img/placeholder_photo.jpg" />
  <MCardTitle primary_title>
    <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
    <div>
      Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate
      referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare
      no qui. Et percipit laboramus usu, no invidunt verterem nominati mel.
      Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae
      adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id
      ludus appareat.
    </div>
  </MCardTitle>
  <MCardActions>
    <MBtn flat color="orange--text">Share</MBtn>
    <MBtn flat color="orange--text">Explore</MBtn>
  </MCardActions>
</MCard>
