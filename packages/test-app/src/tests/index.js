import MAvatar from './MAvatar/component.svelte'
import MAvatarTests from './MAvatar/tests'

import MBtn from './MBtn/component.svelte'
import MBtnTests from './MBtn/tests'

import MCard from './MCard/component.svelte'
import MCardTests from './MCard/tests'

import MChip from './MChip/component.svelte'
import MChipTests from './MChip/tests'

import MFooter from './MFooter/component.svelte'
import MFooterTests from './MFooter/tests'

import MIcon from './MIcon/component.svelte'
import MIconTests from './MIcon/tests'

import MList from './MList/component.svelte'
import MListTests from './MList/tests'

import MToolbar from './MToolbar/component.svelte'
import MToolbarTests from './MToolbar/tests'

const tests = [
  {
    name: 'Avatar tests',
    component: MAvatar,
    tests: MAvatarTests
  },
  {
    name: 'Button tests',
    component: MBtn,
    tests: MBtnTests
  },
  {
    name: 'Card tests',
    component: MCard,
    tests: MCardTests
  },
  {
    name: 'Chips tests',
    component: MChip,
    tests: MChipTests
  },
  {
    name: 'Footer tests',
    component: MFooter,
    tests: MFooterTests
  },
  {
    name: 'Icon tests',
    component: MIcon,
    tests: MIconTests
  },
  {
    name: 'List tests',
    component: MList,
    tests: MListTests
  },
  {
    name: 'Toolbar tests',
    component: MToolbar,
    tests: MToolbarTests
  }
]

export default tests
