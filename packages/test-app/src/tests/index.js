import VAvatar from './VAvatar/component.svelte'
import VAvatarTests from './VAvatar/tests'

import VBtn from './VBtn/component.svelte'
import VBtnTests from './VBtn/tests'

import VCard from './VCard/component.svelte'
import VCardTests from './VCard/tests'

import VChip from './VChip/component.svelte'
import VChipTests from './VChip/tests'

import VFooter from './VFooter/component.svelte'
import VFooterTests from './VFooter/tests'

import VIcon from './VIcon/component.svelte'
import VIconTests from './VIcon/tests'

import VList from './VList/component.svelte'
import VListTests from './VList/tests'

import VToolbar from './VToolbar/component.svelte'
import VToolbarTests from './VToolbar/tests'

const tests = [
  {
    name: 'Avatar tests',
    component: VAvatar,
    tests: VAvatarTests
  },
  {
    name: 'Button tests',
    component: VBtn,
    tests: VBtnTests
  },
  {
    name: 'Card tests',
    component: VCard,
    tests: VCardTests
  },
  {
    name: 'Chips tests',
    component: VChip,
    tests: VChipTests
  },
  {
    name: 'Footer tests',
    component: VFooter,
    tests: VFooterTests
  },
  {
    name: 'Icon tests',
    component: VIcon,
    tests: VIconTests
  },
  {
    name: 'List tests',
    component: VList,
    tests: VListTests
  },
  {
    name: 'Toolbar tests',
    component: VToolbar,
    tests: VToolbarTests
  }
]

export default tests
