import { writable } from 'svelte/store'

export const theme = writable({
  primary: '#ff3e00',
  secondary: '#ff7f56',
  accent: '#40b3ff',
  error: '#F44336',
  warning: '#FDD835',
  info: '#2196F3',
  success: '#8BC34A'
})
