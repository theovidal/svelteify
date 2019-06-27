<script>
  import {
    VCard,
    VCardTitle,
    VCardActions,
    VBtn,
    VImg
  } from '../../../../svelteify/dist/svelteify'

  export let props
</script>

<VCard {...props}>
  <VImg src="foto.jpg" />
  <VCardTitle primary_title>
    <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
    <div>
      Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate
      referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare
      no qui. Et percipit laboramus usu, no invidunt verterem nominati mel.
      Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae
      adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id
      ludus appareat.
    </div>
  </VCardTitle>
  <VCardActions>
    <VBtn flat color="orange--text">Share</VBtn>
    <VBtn flat color="orange--text">Explore</VBtn>
  </VCardActions>
</VCard>
