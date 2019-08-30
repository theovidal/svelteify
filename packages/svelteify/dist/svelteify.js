'use strict'
function noop() {}
function assign(e, t) {
  for (const s in t) e[s] = t[s]
  return e
}
function run(e) {
  return e()
}
function blank_object() {
  return Object.create(null)
}
function run_all(e) {
  e.forEach(run)
}
function is_function(e) {
  return 'function' == typeof e
}
function safe_not_equal(e, t) {
  return e != e
    ? t == t
    : e !== t || (e && 'object' == typeof e) || 'function' == typeof e
}
function subscribe(e, t) {
  const s = e.subscribe(t)
  return s.unsubscribe ? () => s.unsubscribe() : s
}
function component_subscribe(e, t, s) {
  e.$$.on_destroy.push(subscribe(t, s))
}
function create_slot(e, t, s) {
  if (e) {
    const l = get_slot_context(e, t, s)
    return e[0](l)
  }
}
function get_slot_context(e, t, s) {
  return e[1]
    ? assign({}, assign(t.$$scope.ctx, e[1](s ? s(t) : {})))
    : t.$$scope.ctx
}
function get_slot_changes(e, t, s, l) {
  return e[1]
    ? assign({}, assign(t.$$scope.changed || {}, e[1](l ? l(s) : {})))
    : t.$$scope.changed || {}
}
function append(e, t) {
  e.appendChild(t)
}
function insert(e, t, s) {
  e.insertBefore(t, s || null)
}
function detach(e) {
  e.parentNode.removeChild(e)
}
function element(e) {
  return document.createElement(e)
}
function text(e) {
  return document.createTextNode(e)
}
function space() {
  return text(' ')
}
function listen(e, t, s, l) {
  return e.addEventListener(t, s, l), () => e.removeEventListener(t, s, l)
}
function attr(e, t, s) {
  null == s ? e.removeAttribute(t) : e.setAttribute(t, s)
}
function children(e) {
  return Array.from(e.childNodes)
}
function set_style(e, t, s, l) {
  e.style.setProperty(t, s, l ? 'important' : '')
}
function toggle_class(e, t, s) {
  e.classList[s ? 'add' : 'remove'](t)
}
function custom_event(e, t) {
  const s = document.createEvent('CustomEvent')
  return s.initCustomEvent(e, !1, !1, t), s
}
let current_component
function set_current_component(e) {
  current_component = e
}
function createEventDispatcher() {
  const e = current_component
  return (t, s) => {
    const l = e.$$.callbacks[t]
    if (l) {
      const n = custom_event(t, s)
      l.slice().forEach(t => {
        t.call(e, n)
      })
    }
  }
}
function bubble(e, t) {
  const s = e.$$.callbacks[t.type]
  s && s.slice().forEach(e => e(t))
}
Object.defineProperty(exports, '__esModule', { value: !0 })
const dirty_components = [],
  binding_callbacks = [],
  render_callbacks = [],
  flush_callbacks = [],
  resolved_promise = Promise.resolve()
let update_scheduled = !1
function schedule_update() {
  update_scheduled || ((update_scheduled = !0), resolved_promise.then(flush))
}
function add_render_callback(e) {
  render_callbacks.push(e)
}
function flush() {
  const e = new Set()
  do {
    for (; dirty_components.length; ) {
      const e = dirty_components.shift()
      set_current_component(e), update(e.$$)
    }
    for (; binding_callbacks.length; ) binding_callbacks.pop()()
    for (let t = 0; t < render_callbacks.length; t += 1) {
      const s = render_callbacks[t]
      e.has(s) || (s(), e.add(s))
    }
    render_callbacks.length = 0
  } while (dirty_components.length)
  for (; flush_callbacks.length; ) flush_callbacks.pop()()
  update_scheduled = !1
}
function update(e) {
  e.fragment &&
    (e.update(e.dirty),
    run_all(e.before_update),
    e.fragment.p(e.dirty, e.ctx),
    (e.dirty = null),
    e.after_update.forEach(add_render_callback))
}
const outroing = new Set()
let outros
function group_outros() {
  outros = { r: 0, c: [], p: outros }
}
function check_outros() {
  outros.r || run_all(outros.c), (outros = outros.p)
}
function transition_in(e, t) {
  e && e.i && (outroing.delete(e), e.i(t))
}
function transition_out(e, t, s, l) {
  if (e && e.o) {
    if (outroing.has(e)) return
    outroing.add(e),
      outros.c.push(() => {
        outroing.delete(e), l && (s && e.d(1), l())
      }),
      e.o(t)
  }
}
function mount_component(e, t, s) {
  const { fragment: l, on_mount: n, on_destroy: o, after_update: a } = e.$$
  l.m(t, s),
    add_render_callback(() => {
      const t = n.map(run).filter(is_function)
      o ? o.push(...t) : run_all(t), (e.$$.on_mount = [])
    }),
    a.forEach(add_render_callback)
}
function destroy_component(e, t) {
  e.$$.fragment &&
    (run_all(e.$$.on_destroy),
    e.$$.fragment.d(t),
    (e.$$.on_destroy = e.$$.fragment = null),
    (e.$$.ctx = {}))
}
function make_dirty(e, t) {
  e.$$.dirty ||
    (dirty_components.push(e),
    schedule_update(),
    (e.$$.dirty = blank_object())),
    (e.$$.dirty[t] = !0)
}
function init(e, t, s, l, n, o) {
  const a = current_component
  set_current_component(e)
  const i = t.props || {},
    r = (e.$$ = {
      fragment: null,
      ctx: null,
      props: o,
      update: noop,
      not_equal: n,
      bound: blank_object(),
      on_mount: [],
      on_destroy: [],
      before_update: [],
      after_update: [],
      context: new Map(a ? a.$$.context : []),
      callbacks: blank_object(),
      dirty: null
    })
  let c = !1
  ;(r.ctx = s
    ? s(e, i, (t, s) => {
        r.ctx &&
          n(r.ctx[t], (r.ctx[t] = s)) &&
          (r.bound[t] && r.bound[t](s), c && make_dirty(e, t))
      })
    : i),
    r.update(),
    (c = !0),
    run_all(r.before_update),
    (r.fragment = l(r.ctx)),
    t.target &&
      (t.hydrate ? r.fragment.l(children(t.target)) : r.fragment.c(),
      t.intro && transition_in(e.$$.fragment),
      mount_component(e, t.target, t.anchor),
      flush()),
    set_current_component(a)
}
class SvelteComponent {
  $destroy() {
    destroy_component(this, 1), (this.$destroy = noop)
  }
  $on(e, t) {
    const s = this.$$.callbacks[e] || (this.$$.callbacks[e] = [])
    return (
      s.push(t),
      () => {
        const e = s.indexOf(t)
        ;-1 !== e && s.splice(e, 1)
      }
    )
  }
  $set() {}
}
const subscriber_queue = []
function writable(e, t = noop) {
  let s
  const l = []
  function n(t) {
    if (safe_not_equal(e, t) && ((e = t), s)) {
      const t = !subscriber_queue.length
      for (let t = 0; t < l.length; t += 1) {
        const s = l[t]
        s[1](), subscriber_queue.push(s, e)
      }
      if (t) {
        for (let e = 0; e < subscriber_queue.length; e += 2)
          subscriber_queue[e][0](subscriber_queue[e + 1])
        subscriber_queue.length = 0
      }
    }
  }
  return {
    set: n,
    update: function(t) {
      n(t(e))
    },
    subscribe: function(o, a = noop) {
      const i = [o, a]
      return (
        l.push(i),
        1 === l.length && (s = t(n) || noop),
        o(e),
        () => {
          const e = l.indexOf(i)
          ;-1 !== e && l.splice(e, 1), 0 === l.length && (s(), (s = null))
        }
      )
    }
  }
}
const theme = writable({
  primary: '#ff3e00',
  secondary: '#ff7f56',
  accent: '#40b3ff',
  error: '#F44336',
  warning: '#FDD835',
  info: '#2196F3',
  success: '#8BC34A'
})
function create_fragment(e) {
  var t, s, l
  const n = e.$$slots.default,
    o = create_slot(n, e, null)
  return {
    c() {
      ;(t = element('div')),
        (s = element('div')),
        o && o.c(),
        attr(s, 'class', 'application--wrap'),
        attr(t, 'id', e.id),
        attr(t, 'class', 'application'),
        attr(t, 'data-app', 'true'),
        toggle_class(t, 'theme--dark', e.dark),
        toggle_class(t, 'theme--light', !e.dark)
    },
    l(e) {
      o && o.l(div0_nodes)
    },
    m(e, n) {
      insert(e, t, n), append(t, s), o && o.m(s, null), (l = !0)
    },
    p(e, s) {
      o &&
        o.p &&
        e.$$scope &&
        o.p(get_slot_changes(n, s, e, null), get_slot_context(n, s, null)),
        (l && !e.id) || attr(t, 'id', s.id),
        e.dark &&
          (toggle_class(t, 'theme--dark', s.dark),
          toggle_class(t, 'theme--light', !s.dark))
    },
    i(e) {
      l || (transition_in(o, e), (l = !0))
    },
    o(e) {
      transition_out(o, e), (l = !1)
    },
    d(e) {
      e && detach(t), o && o.d(e)
    }
  }
}
function instance(e, t, s) {
  let l
  component_subscribe(e, theme, e => {
    s('$defaultTheme', (l = e))
  })
  let { id: n = 'inspire', dark: o = !1, theme: a = {} } = t,
    { $$slots: i = {}, $$scope: r } = t
  return (
    (e.$set = e => {
      'id' in e && s('id', (n = e.id)),
        'dark' in e && s('dark', (o = e.dark)),
        'theme' in e && s('theme', (a = e.theme)),
        '$$scope' in e && s('$$scope', (r = e.$$scope))
    }),
    (e.$$.update = (e = { $defaultTheme: 1, theme: 1, dark: 1 }) => {
      ;(e.$defaultTheme || e.theme || e.dark) &&
        theme.set(Object.assign({}, l, a, { dark: o, light: !o }))
    }),
    { id: n, dark: o, theme: a, $$slots: i, $$scope: r }
  )
}
class MApp extends SvelteComponent {
  constructor(e) {
    super(),
      init(this, e, instance, create_fragment, safe_not_equal, [
        'id',
        'dark',
        'theme'
      ])
  }
}
function generateTheme(e, t, s = !0) {
  let l = '',
    n = ''
  return (
    t.split(' ').forEach(function(t, o, a) {
      '#' === t[0]
        ? (l += `${s ? 'background-' : ''}color: ${t};`)
        : Object.keys(e).includes(t)
        ? (l += `${s ? 'background-' : ''}color: ${e[t]};`)
        : (n += `${t} `)
    }),
    { style: l, strColors: n }
  )
}
function create_fragment$1(e) {
  var t, s
  const l = e.$$slots.default,
    n = create_slot(l, e, null)
  return {
    c() {
      ;(t = element('div')),
        n && n.c(),
        attr(t, 'class', 'v-avatar ' + e.strColors),
        attr(t, 'style', e.style),
        toggle_class(t, 'v-avatar--tile', e.tile)
    },
    l(e) {
      n && n.l(div_nodes)
    },
    m(e, l) {
      insert(e, t, l), n && n.m(t, null), (s = !0)
    },
    p(e, o) {
      n &&
        n.p &&
        e.$$scope &&
        n.p(get_slot_changes(l, o, e, null), get_slot_context(l, o, null)),
        (s && !e.style) || attr(t, 'style', o.style),
        (e.strColors || e.tile) && toggle_class(t, 'v-avatar--tile', o.tile)
    },
    i(e) {
      s || (transition_in(n, e), (s = !0))
    },
    o(e) {
      transition_out(n, e), (s = !1)
    },
    d(e) {
      e && detach(t), n && n.d(e)
    }
  }
}
function instance$1(e, t, s) {
  let l
  component_subscribe(e, theme, e => {
    s('$theme', (l = e))
  })
  let { color: n = '', size: o = '48px', tile: a = !1 } = t,
    { style: i, strColors: r } = generateTheme(l, n)
  s('style', (i += `height: ${o}; width: ${o};`))
  let { $$slots: c = {}, $$scope: d } = t
  return (
    (e.$set = e => {
      'color' in e && s('color', (n = e.color)),
        'size' in e && s('size', (o = e.size)),
        'tile' in e && s('tile', (a = e.tile)),
        '$$scope' in e && s('$$scope', (d = e.$$scope))
    }),
    {
      color: n,
      size: o,
      tile: a,
      style: i,
      strColors: r,
      $$slots: c,
      $$scope: d
    }
  )
}
class MAvatar extends SvelteComponent {
  constructor(e) {
    super(),
      init(this, e, instance$1, create_fragment$1, safe_not_equal, [
        'color',
        'size',
        'tile'
      ])
  }
}
function create_fragment$2(e) {
  var t, s, l, n, o
  const a = e.$$slots.default,
    i = create_slot(a, e, null)
  return {
    c() {
      ;(t = element('a')),
        (s = element('div')),
        i && i.c(),
        attr(s, 'class', 'v-btn__content'),
        attr(t, 'class', (l = 'v-btn ' + e.strColors + ' ' + e.classes)),
        attr(t, 'href', e.href),
        attr(t, 'target', e.target),
        attr(t, 'style', e.style),
        toggle_class(t, 'v-btn--absolute', e.absolute),
        toggle_class(t, 'v-btn--block', e.block),
        toggle_class(t, 'v-btn--bottom', e.bottom),
        toggle_class(t, 'v-btn--column', e.column),
        toggle_class(t, 'v-btn--depressed', e.depressed),
        toggle_class(t, 'v-btn--disabled', e.disabled),
        toggle_class(t, 'v-btn--fixed', e.fixed),
        toggle_class(t, 'v-btn--flat', e.flat),
        toggle_class(t, 'v-btn--floating', e.floating),
        toggle_class(t, 'v-btn--icon', e.icon),
        toggle_class(t, 'v-btn--large', e.large),
        toggle_class(t, 'v-btn--left', e.left),
        toggle_class(t, 'v-btn--outline', e.outline),
        toggle_class(t, 'v-btn--right', e.right),
        toggle_class(t, 'v-btn--round', e.round),
        toggle_class(t, 'v-btn--small', e.small),
        toggle_class(t, 'v-btn--top', e.top),
        toggle_class(t, 'theme--dark', e.darkTheme),
        toggle_class(t, 'theme--light', !e.darkTheme),
        (o = [
          listen(t, 'click', e.click_handler),
          listen(t, 'hover', e.hover_handler)
        ])
    },
    l(e) {
      i && i.l(div_nodes)
    },
    m(e, l) {
      insert(e, t, l), append(t, s), i && i.m(s, null), (n = !0)
    },
    p(e, s) {
      i &&
        i.p &&
        e.$$scope &&
        i.p(get_slot_changes(a, s, e, null), get_slot_context(a, s, null)),
        (n && !e.classes) ||
          l === (l = 'v-btn ' + s.strColors + ' ' + s.classes) ||
          attr(t, 'class', l),
        (n && !e.href) || attr(t, 'href', s.href),
        (n && !e.target) || attr(t, 'target', s.target),
        (e.strColors || e.classes || e.absolute) &&
          toggle_class(t, 'v-btn--absolute', s.absolute),
        (e.strColors || e.classes || e.block) &&
          toggle_class(t, 'v-btn--block', s.block),
        (e.strColors || e.classes || e.bottom) &&
          toggle_class(t, 'v-btn--bottom', s.bottom),
        (e.strColors || e.classes || e.column) &&
          toggle_class(t, 'v-btn--column', s.column),
        (e.strColors || e.classes || e.depressed) &&
          toggle_class(t, 'v-btn--depressed', s.depressed),
        (e.strColors || e.classes || e.disabled) &&
          toggle_class(t, 'v-btn--disabled', s.disabled),
        (e.strColors || e.classes || e.fixed) &&
          toggle_class(t, 'v-btn--fixed', s.fixed),
        (e.strColors || e.classes || e.flat) &&
          toggle_class(t, 'v-btn--flat', s.flat),
        (e.strColors || e.classes || e.floating) &&
          toggle_class(t, 'v-btn--floating', s.floating),
        (e.strColors || e.classes || e.icon) &&
          toggle_class(t, 'v-btn--icon', s.icon),
        (e.strColors || e.classes || e.large) &&
          toggle_class(t, 'v-btn--large', s.large),
        (e.strColors || e.classes || e.left) &&
          toggle_class(t, 'v-btn--left', s.left),
        (e.strColors || e.classes || e.outline) &&
          toggle_class(t, 'v-btn--outline', s.outline),
        (e.strColors || e.classes || e.right) &&
          toggle_class(t, 'v-btn--right', s.right),
        (e.strColors || e.classes || e.round) &&
          toggle_class(t, 'v-btn--round', s.round),
        (e.strColors || e.classes || e.small) &&
          toggle_class(t, 'v-btn--small', s.small),
        (e.strColors || e.classes || e.top) &&
          toggle_class(t, 'v-btn--top', s.top),
        (e.strColors || e.classes || e.darkTheme) &&
          (toggle_class(t, 'theme--dark', s.darkTheme),
          toggle_class(t, 'theme--light', !s.darkTheme))
    },
    i(e) {
      n || (transition_in(i, e), (n = !0))
    },
    o(e) {
      transition_out(i, e), (n = !1)
    },
    d(e) {
      e && detach(t), i && i.d(e), run_all(o)
    }
  }
}
function instance$2(e, t, s) {
  let l
  component_subscribe(e, theme, e => {
    s('$theme', (l = e))
  })
  let {
      absolute: n = !1,
      block: o = !1,
      bottom: a = !1,
      classes: i = '',
      column: r = !1,
      color: c = '',
      dark: d = !1,
      depressed: g = !1,
      disabled: _ = !1,
      fixed: u = !1,
      flat: $ = !1,
      floating: h = !1,
      href: p = '#!',
      target: m = '',
      icon: f = !1,
      large: v = !1,
      left: b = !1,
      light: k = !1,
      outline: x = !1,
      right: C = !1,
      round: y = !1,
      small: T = !1,
      top: M = !1
    } = t,
    w = !$,
    { style: q, strColors: S } = generateTheme(l, c, w),
    j = !1,
    { $$slots: L = {}, $$scope: z } = t
  return (
    (e.$set = e => {
      'absolute' in e && s('absolute', (n = e.absolute)),
        'block' in e && s('block', (o = e.block)),
        'bottom' in e && s('bottom', (a = e.bottom)),
        'classes' in e && s('classes', (i = e.classes)),
        'column' in e && s('column', (r = e.column)),
        'color' in e && s('color', (c = e.color)),
        'dark' in e && s('dark', (d = e.dark)),
        'depressed' in e && s('depressed', (g = e.depressed)),
        'disabled' in e && s('disabled', (_ = e.disabled)),
        'fixed' in e && s('fixed', (u = e.fixed)),
        'flat' in e && s('flat', ($ = e.flat)),
        'floating' in e && s('floating', (h = e.floating)),
        'href' in e && s('href', (p = e.href)),
        'target' in e && s('target', (m = e.target)),
        'icon' in e && s('icon', (f = e.icon)),
        'large' in e && s('large', (v = e.large)),
        'left' in e && s('left', (b = e.left)),
        'light' in e && s('light', (k = e.light)),
        'outline' in e && s('outline', (x = e.outline)),
        'right' in e && s('right', (C = e.right)),
        'round' in e && s('round', (y = e.round)),
        'small' in e && s('small', (T = e.small)),
        'top' in e && s('top', (M = e.top)),
        '$$scope' in e && s('$$scope', (z = e.$$scope))
    }),
    (e.$$.update = (e = { dark: 1, light: 1, $theme: 1 }) => {
      ;(e.dark || e.light || e.$theme) &&
        s('darkTheme', (j = !!d || (!k && l.dark)))
    }),
    {
      absolute: n,
      block: o,
      bottom: a,
      classes: i,
      column: r,
      color: c,
      dark: d,
      depressed: g,
      disabled: _,
      fixed: u,
      flat: $,
      floating: h,
      href: p,
      target: m,
      icon: f,
      large: v,
      left: b,
      light: k,
      outline: x,
      right: C,
      round: y,
      small: T,
      top: M,
      style: q,
      strColors: S,
      darkTheme: j,
      click_handler: function(t) {
        bubble(e, t)
      },
      hover_handler: function(t) {
        bubble(e, t)
      },
      $$slots: L,
      $$scope: z
    }
  )
}
class MBtn extends SvelteComponent {
  constructor(e) {
    super(),
      init(this, e, instance$2, create_fragment$2, safe_not_equal, [
        'absolute',
        'block',
        'bottom',
        'classes',
        'column',
        'color',
        'dark',
        'depressed',
        'disabled',
        'fixed',
        'flat',
        'floating',
        'href',
        'target',
        'icon',
        'large',
        'left',
        'light',
        'outline',
        'right',
        'round',
        'small',
        'top'
      ])
  }
}
function create_fragment$3(e) {
  var t, s, l
  const n = e.$$slots.default,
    o = create_slot(n, e, null)
  return {
    c() {
      ;(t = element('div')),
        o && o.c(),
        attr(
          t,
          'class',
          (s = 'v-card v-sheet ' + e.strColors + ' elevation-' + e.elevation)
        ),
        attr(t, 'style', e.style),
        toggle_class(t, 'v-card--flat', e.flat),
        toggle_class(t, 'v-card--hover', e.hover),
        toggle_class(t, 'v-card--raised', e.raised),
        toggle_class(t, 'v-sheet--tile', e.tile),
        toggle_class(t, 'theme--dark', e.darkTheme),
        toggle_class(t, 'theme--light', !e.darkTheme)
    },
    l(e) {
      o && o.l(div_nodes)
    },
    m(e, s) {
      insert(e, t, s), o && o.m(t, null), (l = !0)
    },
    p(e, a) {
      o &&
        o.p &&
        e.$$scope &&
        o.p(get_slot_changes(n, a, e, null), get_slot_context(n, a, null)),
        (l && !e.elevation) ||
          s ===
            (s =
              'v-card v-sheet ' + a.strColors + ' elevation-' + a.elevation) ||
          attr(t, 'class', s),
        (e.strColors || e.elevation || e.flat) &&
          toggle_class(t, 'v-card--flat', a.flat),
        (e.strColors || e.elevation || e.hover) &&
          toggle_class(t, 'v-card--hover', a.hover),
        (e.strColors || e.elevation || e.raised) &&
          toggle_class(t, 'v-card--raised', a.raised),
        (e.strColors || e.elevation || e.tile) &&
          toggle_class(t, 'v-sheet--tile', a.tile),
        (e.strColors || e.elevation || e.darkTheme) &&
          (toggle_class(t, 'theme--dark', a.darkTheme),
          toggle_class(t, 'theme--light', !a.darkTheme))
    },
    i(e) {
      l || (transition_in(o, e), (l = !0))
    },
    o(e) {
      transition_out(o, e), (l = !1)
    },
    d(e) {
      e && detach(t), o && o.d(e)
    }
  }
}
function instance$3(e, t, s) {
  let l
  component_subscribe(e, theme, e => {
    s('$theme', (l = e))
  })
  let {
      color: n = '',
      dark: o = !1,
      elevation: a = 2,
      flat: i = !1,
      height: r = '',
      hover: c = !1,
      light: d = !1,
      max_height: g = '',
      max_width: _ = '',
      min_height: u = '',
      min_width: $ = '',
      raised: h = !1,
      tile: p = !1,
      width: m = ''
    } = t,
    { style: f, strColors: v } = generateTheme(l, n),
    b = !1,
    { $$slots: k = {}, $$scope: x } = t
  return (
    (e.$set = e => {
      'color' in e && s('color', (n = e.color)),
        'dark' in e && s('dark', (o = e.dark)),
        'elevation' in e && s('elevation', (a = e.elevation)),
        'flat' in e && s('flat', (i = e.flat)),
        'height' in e && s('height', (r = e.height)),
        'hover' in e && s('hover', (c = e.hover)),
        'light' in e && s('light', (d = e.light)),
        'max_height' in e && s('max_height', (g = e.max_height)),
        'max_width' in e && s('max_width', (_ = e.max_width)),
        'min_height' in e && s('min_height', (u = e.min_height)),
        'min_width' in e && s('min_width', ($ = e.min_width)),
        'raised' in e && s('raised', (h = e.raised)),
        'tile' in e && s('tile', (p = e.tile)),
        'width' in e && s('width', (m = e.width)),
        '$$scope' in e && s('$$scope', (x = e.$$scope))
    }),
    (e.$$.update = (e = { dark: 1, light: 1, $theme: 1 }) => {
      ;(e.dark || e.light || e.$theme) &&
        s('darkTheme', (b = !!o || (!d && l.dark)))
    }),
    {
      color: n,
      dark: o,
      elevation: a,
      flat: i,
      height: r,
      hover: c,
      light: d,
      max_height: g,
      max_width: _,
      min_height: u,
      min_width: $,
      raised: h,
      tile: p,
      width: m,
      style: f,
      strColors: v,
      darkTheme: b,
      $$slots: k,
      $$scope: x
    }
  )
}
class MCard extends SvelteComponent {
  constructor(e) {
    super(),
      init(this, e, instance$3, create_fragment$3, safe_not_equal, [
        'color',
        'dark',
        'elevation',
        'flat',
        'height',
        'hover',
        'light',
        'max_height',
        'max_width',
        'min_height',
        'min_width',
        'raised',
        'tile',
        'width'
      ])
  }
}
function create_fragment$4(e) {
  var t, s
  const l = e.$$slots.default,
    n = create_slot(l, e, null)
  return {
    c() {
      ;(t = element('div')), n && n.c(), attr(t, 'class', 'v-card__actions')
    },
    l(e) {
      n && n.l(div_nodes)
    },
    m(e, l) {
      insert(e, t, l), n && n.m(t, null), (s = !0)
    },
    p(e, t) {
      n &&
        n.p &&
        e.$$scope &&
        n.p(get_slot_changes(l, t, e, null), get_slot_context(l, t, null))
    },
    i(e) {
      s || (transition_in(n, e), (s = !0))
    },
    o(e) {
      transition_out(n, e), (s = !1)
    },
    d(e) {
      e && detach(t), n && n.d(e)
    }
  }
}
function instance$4(e, t, s) {
  let { $$slots: l = {}, $$scope: n } = t
  return (
    (e.$set = e => {
      '$$scope' in e && s('$$scope', (n = e.$$scope))
    }),
    { $$slots: l, $$scope: n }
  )
}
class MCardActions extends SvelteComponent {
  constructor(e) {
    super(), init(this, e, instance$4, create_fragment$4, safe_not_equal, [])
  }
}
function create_fragment$5(e) {
  var t, s
  const l = e.$$slots.default,
    n = create_slot(l, e, null)
  return {
    c() {
      ;(t = element('div')), n && n.c(), attr(t, 'class', 'v-card__text')
    },
    l(e) {
      n && n.l(div_nodes)
    },
    m(e, l) {
      insert(e, t, l), n && n.m(t, null), (s = !0)
    },
    p(e, t) {
      n &&
        n.p &&
        e.$$scope &&
        n.p(get_slot_changes(l, t, e, null), get_slot_context(l, t, null))
    },
    i(e) {
      s || (transition_in(n, e), (s = !0))
    },
    o(e) {
      transition_out(n, e), (s = !1)
    },
    d(e) {
      e && detach(t), n && n.d(e)
    }
  }
}
function instance$5(e, t, s) {
  let { $$slots: l = {}, $$scope: n } = t
  return (
    (e.$set = e => {
      '$$scope' in e && s('$$scope', (n = e.$$scope))
    }),
    { $$slots: l, $$scope: n }
  )
}
class MCardText extends SvelteComponent {
  constructor(e) {
    super(), init(this, e, instance$5, create_fragment$5, safe_not_equal, [])
  }
}
function create_fragment$6(e) {
  var t, s
  const l = e.$$slots.default,
    n = create_slot(l, e, null)
  return {
    c() {
      ;(t = element('div')),
        n && n.c(),
        attr(t, 'class', 'v-card__title'),
        toggle_class(t, 'v-card__title', e.primary_title)
    },
    l(e) {
      n && n.l(div_nodes)
    },
    m(e, l) {
      insert(e, t, l), n && n.m(t, null), (s = !0)
    },
    p(e, s) {
      n &&
        n.p &&
        e.$$scope &&
        n.p(get_slot_changes(l, s, e, null), get_slot_context(l, s, null)),
        e.primary_title && toggle_class(t, 'v-card__title', s.primary_title)
    },
    i(e) {
      s || (transition_in(n, e), (s = !0))
    },
    o(e) {
      transition_out(n, e), (s = !1)
    },
    d(e) {
      e && detach(t), n && n.d(e)
    }
  }
}
function instance$6(e, t, s) {
  let { primary_title: l = !1 } = t,
    { $$slots: n = {}, $$scope: o } = t
  return (
    (e.$set = e => {
      'primary_title' in e && s('primary_title', (l = e.primary_title)),
        '$$scope' in e && s('$$scope', (o = e.$$scope))
    }),
    { primary_title: l, $$slots: n, $$scope: o }
  )
}
class MCardTitle extends SvelteComponent {
  constructor(e) {
    super(),
      init(this, e, instance$6, create_fragment$6, safe_not_equal, [
        'primary_title'
      ])
  }
}
function create_fragment$7(e) {
  var t, s
  const l = e.$$slots.default,
    n = create_slot(l, e, null)
  return {
    c() {
      ;(t = element('i')),
        n && n.c(),
        attr(t, 'class', 'v-icon material-icons ' + e.strColors),
        attr(t, 'aria-hidden', 'true'),
        attr(t, 'style', e.style),
        toggle_class(t, 'v-icon--left', e.left),
        toggle_class(t, 'v-icon--right', e.right),
        toggle_class(t, 'theme--dark', e.darkTheme),
        toggle_class(t, 'theme--light', !e.darkTheme)
    },
    l(e) {
      n && n.l(i_nodes)
    },
    m(e, l) {
      insert(e, t, l), n && n.m(t, null), (s = !0)
    },
    p(e, o) {
      n &&
        n.p &&
        e.$$scope &&
        n.p(get_slot_changes(l, o, e, null), get_slot_context(l, o, null)),
        (s && !e.style) || attr(t, 'style', o.style),
        (e.strColors || e.left) && toggle_class(t, 'v-icon--left', o.left),
        (e.strColors || e.right) && toggle_class(t, 'v-icon--right', o.right),
        (e.strColors || e.darkTheme) &&
          (toggle_class(t, 'theme--dark', o.darkTheme),
          toggle_class(t, 'theme--light', !o.darkTheme))
    },
    i(e) {
      s || (transition_in(n, e), (s = !0))
    },
    o(e) {
      transition_out(n, e), (s = !1)
    },
    d(e) {
      e && detach(t), n && n.d(e)
    }
  }
}
function instance$7(e, t, s) {
  let l
  component_subscribe(e, theme, e => {
    s('$theme', (l = e))
  })
  let {
      color: n = '',
      dark: o = !1,
      large: a = !1,
      left: i = !1,
      light: r = !1,
      medium: c = !1,
      right: d = !1,
      small: g = !1,
      size: _,
      xlarge: u = !1
    } = t,
    { style: $, strColors: h } = generateTheme(l, n, !1),
    p = !1
  void 0 === _ &&
    (g
      ? s('size', (_ = 16))
      : c
      ? s('size', (_ = 28))
      : a
      ? s('size', (_ = 36))
      : u && s('size', (_ = 40)),
    s('style', ($ += `font-size: ${_}px;`)))
  let { $$slots: m = {}, $$scope: f } = t
  return (
    (e.$set = e => {
      'color' in e && s('color', (n = e.color)),
        'dark' in e && s('dark', (o = e.dark)),
        'large' in e && s('large', (a = e.large)),
        'left' in e && s('left', (i = e.left)),
        'light' in e && s('light', (r = e.light)),
        'medium' in e && s('medium', (c = e.medium)),
        'right' in e && s('right', (d = e.right)),
        'small' in e && s('small', (g = e.small)),
        'size' in e && s('size', (_ = e.size)),
        'xlarge' in e && s('xlarge', (u = e.xlarge)),
        '$$scope' in e && s('$$scope', (f = e.$$scope))
    }),
    (e.$$.update = (e = { dark: 1, light: 1, $theme: 1 }) => {
      ;(e.dark || e.light || e.$theme) &&
        s('darkTheme', (p = !!o || (!r && l.dark)))
    }),
    {
      color: n,
      dark: o,
      large: a,
      left: i,
      light: r,
      medium: c,
      right: d,
      small: g,
      size: _,
      xlarge: u,
      style: $,
      strColors: h,
      darkTheme: p,
      $$slots: m,
      $$scope: f
    }
  )
}
class MIcon extends SvelteComponent {
  constructor(e) {
    super(),
      init(this, e, instance$7, create_fragment$7, safe_not_equal, [
        'color',
        'dark',
        'large',
        'left',
        'light',
        'medium',
        'right',
        'small',
        'size',
        'xlarge'
      ])
  }
}
function create_if_block(e) {
  var t,
    s,
    l,
    n = new MIcon({
      props: {
        dark: e.dark,
        $$slots: { default: [create_default_slot] },
        $$scope: { ctx: e }
      }
    })
  return {
    c() {
      ;(t = element('div')),
        n.$$.fragment.c(),
        attr(t, 'class', 'v-chip__close'),
        (l = listen(t, 'click', e.handleClose))
    },
    m(e, l) {
      insert(e, t, l), mount_component(n, t, null), (s = !0)
    },
    p(e, t) {
      var s = {}
      e.dark && (s.dark = t.dark),
        e.$$scope && (s.$$scope = { changed: e, ctx: t }),
        n.$set(s)
    },
    i(e) {
      s || (transition_in(n.$$.fragment, e), (s = !0))
    },
    o(e) {
      transition_out(n.$$.fragment, e), (s = !1)
    },
    d(e) {
      e && detach(t), destroy_component(n), l()
    }
  }
}
function create_default_slot(e) {
  var t
  return {
    c() {
      t = text('cancel')
    },
    m(e, s) {
      insert(e, t, s)
    },
    d(e) {
      e && detach(t)
    }
  }
}
function create_fragment$8(e) {
  var t, s, l, n, o
  const a = e.$$slots.default,
    i = create_slot(a, e, null)
  var r = e.close && create_if_block(e)
  return {
    c() {
      ;(t = element('div')),
        (s = element('div')),
        i && i.c(),
        (l = space()),
        r && r.c(),
        attr(s, 'class', 'v-chip__content'),
        attr(t, 'class', 'v-chip ' + e.strColors),
        attr(t, 'style', e.style),
        toggle_class(t, 'v-chip--disabled', e.disabled),
        toggle_class(t, 'v-chip--label', e.label),
        toggle_class(t, 'v-chip--outline', e.outline),
        toggle_class(t, 'v-chip--removable', e.close),
        toggle_class(t, 'v-chip--selected', e.selected),
        toggle_class(t, 'v-chip--small', e.small),
        toggle_class(t, 'theme--dark', e.darkTheme),
        toggle_class(t, 'theme--light', !e.darkTheme),
        (o = [
          listen(t, 'click', e.handleClick),
          listen(t, 'mouseleave', e.handleLeave)
        ])
    },
    l(e) {
      i && i.l(div0_nodes)
    },
    m(e, o) {
      insert(e, t, o),
        append(t, s),
        i && i.m(s, null),
        append(s, l),
        r && r.m(s, null),
        (n = !0)
    },
    p(e, l) {
      i &&
        i.p &&
        e.$$scope &&
        i.p(get_slot_changes(a, l, e, null), get_slot_context(a, l, null)),
        l.close
          ? r
            ? (r.p(e, l), transition_in(r, 1))
            : ((r = create_if_block(l)).c(), transition_in(r, 1), r.m(s, null))
          : r &&
            (group_outros(),
            transition_out(r, 1, 1, () => {
              r = null
            }),
            check_outros()),
        (n && !e.style) || attr(t, 'style', l.style),
        (e.strColors || e.disabled) &&
          toggle_class(t, 'v-chip--disabled', l.disabled),
        (e.strColors || e.label) && toggle_class(t, 'v-chip--label', l.label),
        (e.strColors || e.outline) &&
          toggle_class(t, 'v-chip--outline', l.outline),
        (e.strColors || e.close) &&
          toggle_class(t, 'v-chip--removable', l.close),
        (e.strColors || e.selected) &&
          toggle_class(t, 'v-chip--selected', l.selected),
        (e.strColors || e.small) && toggle_class(t, 'v-chip--small', l.small),
        (e.strColors || e.darkTheme) &&
          (toggle_class(t, 'theme--dark', l.darkTheme),
          toggle_class(t, 'theme--light', !l.darkTheme))
    },
    i(e) {
      n || (transition_in(i, e), transition_in(r), (n = !0))
    },
    o(e) {
      transition_out(i, e), transition_out(r), (n = !1)
    },
    d(e) {
      e && detach(t), i && i.d(e), r && r.d(), run_all(o)
    }
  }
}
function instance$8(e, t, s) {
  let l
  component_subscribe(e, theme, e => {
    s('$theme', (l = e))
  })
  let {
      close: n = !1,
      color: o = '',
      dark: a = !1,
      disabled: i = !1,
      label: r = !1,
      light: c = !1,
      outline: d = !1,
      selected: g = !1,
      small: _ = !1
    } = t,
    { style: u, strColors: $ } = generateTheme(l, o),
    h = !1,
    p = g
  let { $$slots: m = {}, $$scope: f } = t
  return (
    (e.$set = e => {
      'close' in e && s('close', (n = e.close)),
        'color' in e && s('color', (o = e.color)),
        'dark' in e && s('dark', (a = e.dark)),
        'disabled' in e && s('disabled', (i = e.disabled)),
        'label' in e && s('label', (r = e.label)),
        'light' in e && s('light', (c = e.light)),
        'outline' in e && s('outline', (d = e.outline)),
        'selected' in e && s('selected', (g = e.selected)),
        'small' in e && s('small', (_ = e.small)),
        '$$scope' in e && s('$$scope', (f = e.$$scope))
    }),
    (e.$$.update = (e = { dark: 1, light: 1, $theme: 1 }) => {
      ;(e.dark || e.light || e.$theme) &&
        s('darkTheme', (h = !!a || (!c && l.dark)))
    }),
    {
      close: n,
      color: o,
      dark: a,
      disabled: i,
      label: r,
      light: c,
      outline: d,
      selected: g,
      small: _,
      style: u,
      strColors: $,
      darkTheme: h,
      handleClose: function() {
        s('style', (u += 'display: none;'))
      },
      handleClick: function() {
        p || s('selected', (g = !0))
      },
      handleLeave: function() {
        p || s('selected', (g = !1))
      },
      $$slots: m,
      $$scope: f
    }
  )
}
class MChip extends SvelteComponent {
  constructor(e) {
    super(),
      init(this, e, instance$8, create_fragment$8, safe_not_equal, [
        'close',
        'color',
        'dark',
        'disabled',
        'label',
        'light',
        'outline',
        'selected',
        'small'
      ])
  }
}
function create_fragment$9(e) {
  var t, s
  return {
    c() {
      attr((t = element('hr')), 'class', (s = 'v-divider ' + e.classes)),
        toggle_class(t, 'v-divider--inset', e.inset),
        toggle_class(t, 'v-divider--vertical', e.vertical),
        toggle_class(t, 'theme--dark', e.darkTheme),
        toggle_class(t, 'theme--light', !e.darkTheme)
    },
    m(e, s) {
      insert(e, t, s)
    },
    p(e, l) {
      e.classes && s !== (s = 'v-divider ' + l.classes) && attr(t, 'class', s),
        (e.classes || e.inset) && toggle_class(t, 'v-divider--inset', l.inset),
        (e.classes || e.vertical) &&
          toggle_class(t, 'v-divider--vertical', l.vertical),
        (e.classes || e.darkTheme) &&
          (toggle_class(t, 'theme--dark', l.darkTheme),
          toggle_class(t, 'theme--light', !l.darkTheme))
    },
    i: noop,
    o: noop,
    d(e) {
      e && detach(t)
    }
  }
}
function instance$9(e, t, s) {
  let l
  component_subscribe(e, theme, e => {
    s('$theme', (l = e))
  })
  let {
      classes: n = '',
      dark: o = !1,
      inset: a = !1,
      light: i = !1,
      vertical: r = !1
    } = t,
    c = !1
  return (
    (e.$set = e => {
      'classes' in e && s('classes', (n = e.classes)),
        'dark' in e && s('dark', (o = e.dark)),
        'inset' in e && s('inset', (a = e.inset)),
        'light' in e && s('light', (i = e.light)),
        'vertical' in e && s('vertical', (r = e.vertical))
    }),
    (e.$$.update = (e = { dark: 1, light: 1, $theme: 1 }) => {
      ;(e.dark || e.light || e.$theme) &&
        s('darkTheme', (c = !!o || (!i && l.dark)))
    }),
    { classes: n, dark: o, inset: a, light: i, vertical: r, darkTheme: c }
  )
}
class MDivider extends SvelteComponent {
  constructor(e) {
    super(),
      init(this, e, instance$9, create_fragment$9, safe_not_equal, [
        'classes',
        'dark',
        'inset',
        'light',
        'vertical'
      ])
  }
}
function create_fragment$a(e) {
  var t, s, l
  const n = e.$$slots.default,
    o = create_slot(n, e, null)
  return {
    c() {
      ;(t = element('footer')),
        o && o.c(),
        attr(t, 'class', (s = 'v-footer ' + e.classes + ' ' + e.strColors)),
        attr(t, 'style', e.style),
        toggle_class(t, 'v-footer--absolute', e.absolute),
        toggle_class(t, 'v-footer--fixed', e.fixed),
        toggle_class(t, 'v-footer--inset', e.inset),
        toggle_class(t, 'theme--dark', e.darkTheme),
        toggle_class(t, 'theme--light', !e.darkTheme)
    },
    l(e) {
      o && o.l(footer_nodes)
    },
    m(e, s) {
      insert(e, t, s), o && o.m(t, null), (l = !0)
    },
    p(e, a) {
      o &&
        o.p &&
        e.$$scope &&
        o.p(get_slot_changes(n, a, e, null), get_slot_context(n, a, null)),
        (l && !e.classes) ||
          s === (s = 'v-footer ' + a.classes + ' ' + a.strColors) ||
          attr(t, 'class', s),
        (l && !e.style) || attr(t, 'style', a.style),
        (e.classes || e.strColors || e.absolute) &&
          toggle_class(t, 'v-footer--absolute', a.absolute),
        (e.classes || e.strColors || e.fixed) &&
          toggle_class(t, 'v-footer--fixed', a.fixed),
        (e.classes || e.strColors || e.inset) &&
          toggle_class(t, 'v-footer--inset', a.inset),
        (e.classes || e.strColors || e.darkTheme) &&
          (toggle_class(t, 'theme--dark', a.darkTheme),
          toggle_class(t, 'theme--light', !a.darkTheme))
    },
    i(e) {
      l || (transition_in(o, e), (l = !0))
    },
    o(e) {
      transition_out(o, e), (l = !1)
    },
    d(e) {
      e && detach(t), o && o.d(e)
    }
  }
}
function instance$a(e, t, s) {
  let l
  component_subscribe(e, theme, e => {
    s('$theme', (l = e))
  })
  let {
      absolute: n = !1,
      classes: o = '',
      color: a = '',
      dark: i = !1,
      fixed: r = !1,
      height: c = '32px',
      inset: d = !1,
      light: g = !1
    } = t,
    { style: _, strColors: u } = generateTheme(l, a)
  s('style', (_ += 'height: {height};'))
  let $ = !1,
    { $$slots: h = {}, $$scope: p } = t
  return (
    (e.$set = e => {
      'absolute' in e && s('absolute', (n = e.absolute)),
        'classes' in e && s('classes', (o = e.classes)),
        'color' in e && s('color', (a = e.color)),
        'dark' in e && s('dark', (i = e.dark)),
        'fixed' in e && s('fixed', (r = e.fixed)),
        'height' in e && s('height', (c = e.height)),
        'inset' in e && s('inset', (d = e.inset)),
        'light' in e && s('light', (g = e.light)),
        '$$scope' in e && s('$$scope', (p = e.$$scope))
    }),
    (e.$$.update = (e = { dark: 1, light: 1, $theme: 1 }) => {
      ;(e.dark || e.light || e.$theme) &&
        s('darkTheme', ($ = !!i || (!g && l.dark)))
    }),
    {
      absolute: n,
      classes: o,
      color: a,
      dark: i,
      fixed: r,
      height: c,
      inset: d,
      light: g,
      style: _,
      strColors: u,
      darkTheme: $,
      $$slots: h,
      $$scope: p
    }
  )
}
class MFooter extends SvelteComponent {
  constructor(e) {
    super(),
      init(this, e, instance$a, create_fragment$a, safe_not_equal, [
        'absolute',
        'classes',
        'color',
        'dark',
        'fixed',
        'height',
        'inset',
        'light'
      ])
  }
}
function create_fragment$b(e) {
  var t, s, l
  const n = e.$$slots.default,
    o = create_slot(n, e, null)
  return {
    c() {
      ;(t = element('div')),
        o && o.c(),
        attr(
          t,
          'class',
          (s =
            'container ' +
            e.alignClass +
            '\r\n  ' +
            e.justifyClass +
            '\r\n  ' +
            e.gridListClass +
            '\r\n  ' +
            e.dClass +
            '\r\n  ' +
            e.classes)
        ),
        toggle_class(t, 'fluid', e.fluid),
        toggle_class(t, 'fill-height', e.fill_height)
    },
    l(e) {
      o && o.l(div_nodes)
    },
    m(e, s) {
      insert(e, t, s), o && o.m(t, null), (l = !0)
    },
    p(e, a) {
      o &&
        o.p &&
        e.$$scope &&
        o.p(get_slot_changes(n, a, e, null), get_slot_context(n, a, null)),
        (l && !e.classes) ||
          s ===
            (s =
              'container ' +
              a.alignClass +
              '\r\n  ' +
              a.justifyClass +
              '\r\n  ' +
              a.gridListClass +
              '\r\n  ' +
              a.dClass +
              '\r\n  ' +
              a.classes) ||
          attr(t, 'class', s),
        (e.alignClass ||
          e.justifyClass ||
          e.gridListClass ||
          e.dClass ||
          e.classes ||
          e.fluid) &&
          toggle_class(t, 'fluid', a.fluid),
        (e.alignClass ||
          e.justifyClass ||
          e.gridListClass ||
          e.dClass ||
          e.classes ||
          e.fill_height) &&
          toggle_class(t, 'fill-height', a.fill_height)
    },
    i(e) {
      l || (transition_in(o, e), (l = !0))
    },
    o(e) {
      transition_out(o, e), (l = !1)
    },
    d(e) {
      e && detach(t), o && o.d(e)
    }
  }
}
function instance$b(e, t, s) {
  let {
      align: l = '',
      classes: n = '',
      justify: o = '',
      grid_list: a = '',
      d: i = '',
      fill_height: r = !1,
      fluid: c = !1
    } = t,
    d = '' === l ? '' : `align-${l}`,
    g = '' === o ? '' : `justify-${o}`,
    _ = '' === a ? '' : `grid-list-${a}`,
    u = '' === i ? '' : `d-${i}`,
    { $$slots: $ = {}, $$scope: h } = t
  return (
    (e.$set = e => {
      'align' in e && s('align', (l = e.align)),
        'classes' in e && s('classes', (n = e.classes)),
        'justify' in e && s('justify', (o = e.justify)),
        'grid_list' in e && s('grid_list', (a = e.grid_list)),
        'd' in e && s('d', (i = e.d)),
        'fill_height' in e && s('fill_height', (r = e.fill_height)),
        'fluid' in e && s('fluid', (c = e.fluid)),
        '$$scope' in e && s('$$scope', (h = e.$$scope))
    }),
    {
      align: l,
      classes: n,
      justify: o,
      grid_list: a,
      d: i,
      fill_height: r,
      fluid: c,
      alignClass: d,
      justifyClass: g,
      gridListClass: _,
      dClass: u,
      $$slots: $,
      $$scope: h
    }
  )
}
class MContainer extends SvelteComponent {
  constructor(e) {
    super(),
      init(this, e, instance$b, create_fragment$b, safe_not_equal, [
        'align',
        'classes',
        'justify',
        'grid_list',
        'd',
        'fill_height',
        'fluid'
      ])
  }
}
function create_fragment$c(e) {
  var t, s, l, n
  const o = e.$$slots.default,
    a = create_slot(o, e, null)
  return {
    c() {
      ;(t = element('main')),
        (s = element('div')),
        a && a.c(),
        attr(s, 'class', 'v-content__wrap'),
        attr(t, 'class', (l = 'v-content ' + e.classes))
    },
    l(e) {
      a && a.l(div_nodes)
    },
    m(e, l) {
      insert(e, t, l), append(t, s), a && a.m(s, null), (n = !0)
    },
    p(e, s) {
      a &&
        a.p &&
        e.$$scope &&
        a.p(get_slot_changes(o, s, e, null), get_slot_context(o, s, null)),
        (n && !e.classes) ||
          l === (l = 'v-content ' + s.classes) ||
          attr(t, 'class', l)
    },
    i(e) {
      n || (transition_in(a, e), (n = !0))
    },
    o(e) {
      transition_out(a, e), (n = !1)
    },
    d(e) {
      e && detach(t), a && a.d(e)
    }
  }
}
function instance$c(e, t, s) {
  let { classes: l = '' } = t,
    { $$slots: n = {}, $$scope: o } = t
  return (
    (e.$set = e => {
      'classes' in e && s('classes', (l = e.classes)),
        '$$scope' in e && s('$$scope', (o = e.$$scope))
    }),
    { classes: l, $$slots: n, $$scope: o }
  )
}
class MContent extends SvelteComponent {
  constructor(e) {
    super(),
      init(this, e, instance$c, create_fragment$c, safe_not_equal, ['classes'])
  }
}
function create_fragment$d(e) {
  var t, s, l
  const n = e.$$slots.default,
    o = create_slot(n, e, null)
  return {
    c() {
      ;(t = element('div')),
        o && o.c(),
        attr(t, 'class', (s = 'flex ' + e.size + ' ' + e.classes)),
        toggle_class(t, 'shrink', e.shrink)
    },
    l(e) {
      o && o.l(div_nodes)
    },
    m(e, s) {
      insert(e, t, s), o && o.m(t, null), (l = !0)
    },
    p(e, a) {
      o &&
        o.p &&
        e.$$scope &&
        o.p(get_slot_changes(n, a, e, null), get_slot_context(n, a, null)),
        (l && !e.size && !e.classes) ||
          s === (s = 'flex ' + a.size + ' ' + a.classes) ||
          attr(t, 'class', s),
        (e.size || e.classes || e.shrink) && toggle_class(t, 'shrink', a.shrink)
    },
    i(e) {
      l || (transition_in(o, e), (l = !0))
    },
    o(e) {
      transition_out(o, e), (l = !1)
    },
    d(e) {
      e && detach(t), o && o.d(e)
    }
  }
}
function instance$d(e, t, s) {
  let { classes: l = '', size: n = '', shrink: o = !1 } = t,
    { $$slots: a = {}, $$scope: i } = t
  return (
    (e.$set = e => {
      'classes' in e && s('classes', (l = e.classes)),
        'size' in e && s('size', (n = e.size)),
        'shrink' in e && s('shrink', (o = e.shrink)),
        '$$scope' in e && s('$$scope', (i = e.$$scope))
    }),
    { classes: l, size: n, shrink: o, $$slots: a, $$scope: i }
  )
}
class MFlex extends SvelteComponent {
  constructor(e) {
    super(),
      init(this, e, instance$d, create_fragment$d, safe_not_equal, [
        'classes',
        'size',
        'shrink'
      ])
  }
}
function create_fragment$e(e) {
  var t, s, l
  const n = e.$$slots.default,
    o = create_slot(n, e, null)
  return {
    c() {
      ;(t = element('div')),
        o && o.c(),
        attr(
          t,
          'class',
          (s =
            'layout ' +
            e.alignClass +
            '\r\n  ' +
            e.justifyClass +
            '\r\n  ' +
            e.dClass +
            '\r\n  ' +
            e.classes)
        ),
        toggle_class(t, 'column', e.column),
        toggle_class(t, 'fill-height', e.fill_height),
        toggle_class(t, 'reverse', e.reverse),
        toggle_class(t, 'row', e.row),
        toggle_class(t, 'wrap', e.wrap)
    },
    l(e) {
      o && o.l(div_nodes)
    },
    m(e, s) {
      insert(e, t, s), o && o.m(t, null), (l = !0)
    },
    p(e, a) {
      o &&
        o.p &&
        e.$$scope &&
        o.p(get_slot_changes(n, a, e, null), get_slot_context(n, a, null)),
        (l && !e.classes) ||
          s ===
            (s =
              'layout ' +
              a.alignClass +
              '\r\n  ' +
              a.justifyClass +
              '\r\n  ' +
              a.dClass +
              '\r\n  ' +
              a.classes) ||
          attr(t, 'class', s),
        (e.alignClass || e.justifyClass || e.dClass || e.classes || e.column) &&
          toggle_class(t, 'column', a.column),
        (e.alignClass ||
          e.justifyClass ||
          e.dClass ||
          e.classes ||
          e.fill_height) &&
          toggle_class(t, 'fill-height', a.fill_height),
        (e.alignClass ||
          e.justifyClass ||
          e.dClass ||
          e.classes ||
          e.reverse) &&
          toggle_class(t, 'reverse', a.reverse),
        (e.alignClass || e.justifyClass || e.dClass || e.classes || e.row) &&
          toggle_class(t, 'row', a.row),
        (e.alignClass || e.justifyClass || e.dClass || e.classes || e.wrap) &&
          toggle_class(t, 'wrap', a.wrap)
    },
    i(e) {
      l || (transition_in(o, e), (l = !0))
    },
    o(e) {
      transition_out(o, e), (l = !1)
    },
    d(e) {
      e && detach(t), o && o.d(e)
    }
  }
}
function instance$e(e, t, s) {
  let {
      align: l = '',
      classes: n = '',
      column: o = !1,
      d: a = '',
      fill_height: i = !1,
      justify: r = '',
      reverse: c = !1,
      row: d = !1,
      wrap: g = !1
    } = t,
    _ = '' === l ? '' : `align-${l}`,
    u = '' === r ? '' : `justify-${r}`,
    $ = '' === a ? '' : `d-${a}`,
    { $$slots: h = {}, $$scope: p } = t
  return (
    (e.$set = e => {
      'align' in e && s('align', (l = e.align)),
        'classes' in e && s('classes', (n = e.classes)),
        'column' in e && s('column', (o = e.column)),
        'd' in e && s('d', (a = e.d)),
        'fill_height' in e && s('fill_height', (i = e.fill_height)),
        'justify' in e && s('justify', (r = e.justify)),
        'reverse' in e && s('reverse', (c = e.reverse)),
        'row' in e && s('row', (d = e.row)),
        'wrap' in e && s('wrap', (g = e.wrap)),
        '$$scope' in e && s('$$scope', (p = e.$$scope))
    }),
    {
      align: l,
      classes: n,
      column: o,
      d: a,
      fill_height: i,
      justify: r,
      reverse: c,
      row: d,
      wrap: g,
      alignClass: _,
      justifyClass: u,
      dClass: $,
      $$slots: h,
      $$scope: p
    }
  )
}
class MLayout extends SvelteComponent {
  constructor(e) {
    super(),
      init(this, e, instance$e, create_fragment$e, safe_not_equal, [
        'align',
        'classes',
        'column',
        'd',
        'fill_height',
        'justify',
        'reverse',
        'row',
        'wrap'
      ])
  }
}
function create_fragment$f(e) {
  var t, s, l, n
  return {
    c() {
      ;(t = element('div')),
        (s = element('div')),
        (l = space()),
        (n = element('div')),
        attr(s, 'class', 'v-responsive__sizer'),
        set_style(s, 'padding-bottom', '100%'),
        attr(n, 'class', 'v-image__image v-image__image--cover'),
        set_style(n, 'background-image', "url('" + e.src + "')"),
        set_style(n, 'background-position', 'center center'),
        attr(t, 'class', 'v-responsive v-image')
    },
    m(e, o) {
      insert(e, t, o), append(t, s), append(t, l), append(t, n)
    },
    p(e, t) {
      e.src && set_style(n, 'background-image', "url('" + t.src + "')")
    },
    i: noop,
    o: noop,
    d(e) {
      e && detach(t)
    }
  }
}
function instance$f(e, t, s) {
  let { src: l, alt: n } = t
  return (
    (e.$set = e => {
      'src' in e && s('src', (l = e.src)), 'alt' in e && s('alt', (n = e.alt))
    }),
    { src: l, alt: n }
  )
}
class MImg extends SvelteComponent {
  constructor(e) {
    super(),
      init(this, e, instance$f, create_fragment$f, safe_not_equal, [
        'src',
        'alt'
      ])
  }
}
function create_fragment$g(e) {
  var t, s
  const l = e.$$slots.default,
    n = create_slot(l, e, null)
  return {
    c() {
      ;(t = element('div')),
        n && n.c(),
        attr(t, 'class', 'v-list'),
        toggle_class(t, 'v-list--dense', e.dense),
        toggle_class(t, 'v-list--subheader', e.subheader),
        toggle_class(t, 'v-list--three-line', e.three_line),
        toggle_class(t, 'v-list--two-line', e.two_line)
    },
    l(e) {
      n && n.l(div_nodes)
    },
    m(e, l) {
      insert(e, t, l), n && n.m(t, null), (s = !0)
    },
    p(e, s) {
      n &&
        n.p &&
        e.$$scope &&
        n.p(get_slot_changes(l, s, e, null), get_slot_context(l, s, null)),
        e.dense && toggle_class(t, 'v-list--dense', s.dense),
        e.subheader && toggle_class(t, 'v-list--subheader', s.subheader),
        e.three_line && toggle_class(t, 'v-list--three-line', s.three_line),
        e.two_line && toggle_class(t, 'v-list--two-line', s.two_line)
    },
    i(e) {
      s || (transition_in(n, e), (s = !0))
    },
    o(e) {
      transition_out(n, e), (s = !1)
    },
    d(e) {
      e && detach(t), n && n.d(e)
    }
  }
}
function instance$g(e, t, s) {
  let {
      dark: l = !1,
      dense: n = !1,
      expand: o = !1,
      light: a = !1,
      subheader: i = !1,
      three_line: r = !1,
      two_line: c = !1
    } = t,
    { $$slots: d = {}, $$scope: g } = t
  return (
    (e.$set = e => {
      'dark' in e && s('dark', (l = e.dark)),
        'dense' in e && s('dense', (n = e.dense)),
        'expand' in e && s('expand', (o = e.expand)),
        'light' in e && s('light', (a = e.light)),
        'subheader' in e && s('subheader', (i = e.subheader)),
        'three_line' in e && s('three_line', (r = e.three_line)),
        'two_line' in e && s('two_line', (c = e.two_line)),
        '$$scope' in e && s('$$scope', (g = e.$$scope))
    }),
    {
      dark: l,
      dense: n,
      expand: o,
      light: a,
      subheader: i,
      three_line: r,
      two_line: c,
      $$slots: d,
      $$scope: g
    }
  )
}
class MList extends SvelteComponent {
  constructor(e) {
    super(),
      init(this, e, instance$g, create_fragment$g, safe_not_equal, [
        'dark',
        'dense',
        'expand',
        'light',
        'subheader',
        'three_line',
        'two_line'
      ])
  }
}
function create_fragment$h(e) {
  return { c: noop, m: noop, p: noop, i: noop, o: noop, d: noop }
}
class MListGroup extends SvelteComponent {
  constructor(e) {
    super(), init(this, e, null, create_fragment$h, safe_not_equal, [])
  }
}
function create_fragment$i(e) {
  var t, s, l, n
  const o = e.$$slots.default,
    a = create_slot(o, e, null)
  return {
    c() {
      ;(t = element('div')),
        (s = element('a')),
        a && a.c(),
        attr(s, 'class', 'v-list__tile'),
        attr(s, 'href', e.href),
        toggle_class(s, 'v-list__tile--avatar', e.avatar),
        toggle_class(s, 'theme--dark', e.darkTheme),
        toggle_class(s, 'theme--light', !e.darkTheme),
        attr(t, 'role', 'listitem'),
        attr(t, 'class', (l = e.classes + ' ' + e.strColors)),
        attr(t, 'style', e.style)
    },
    l(e) {
      a && a.l(a_nodes)
    },
    m(e, l) {
      insert(e, t, l), append(t, s), a && a.m(s, null), (n = !0)
    },
    p(e, i) {
      a &&
        a.p &&
        e.$$scope &&
        a.p(get_slot_changes(o, i, e, null), get_slot_context(o, i, null)),
        (n && !e.href) || attr(s, 'href', i.href),
        e.avatar && toggle_class(s, 'v-list__tile--avatar', i.avatar),
        e.darkTheme &&
          (toggle_class(s, 'theme--dark', i.darkTheme),
          toggle_class(s, 'theme--light', !i.darkTheme)),
        (n && !e.classes) ||
          l === (l = i.classes + ' ' + i.strColors) ||
          attr(t, 'class', l)
    },
    i(e) {
      n || (transition_in(a, e), (n = !0))
    },
    o(e) {
      transition_out(a, e), (n = !1)
    },
    d(e) {
      e && detach(t), a && a.d(e)
    }
  }
}
function instance$h(e, t, s) {
  let l
  component_subscribe(e, theme, e => {
    s('$theme', (l = e))
  })
  let {
      avatar: n = !1,
      classes: o = '',
      color: a = '',
      dark: i = !1,
      href: r = '#!',
      light: c = !1
    } = t,
    { style: d, strColors: g } = generateTheme(l, a),
    _ = !1,
    { $$slots: u = {}, $$scope: $ } = t
  return (
    (e.$set = e => {
      'avatar' in e && s('avatar', (n = e.avatar)),
        'classes' in e && s('classes', (o = e.classes)),
        'color' in e && s('color', (a = e.color)),
        'dark' in e && s('dark', (i = e.dark)),
        'href' in e && s('href', (r = e.href)),
        'light' in e && s('light', (c = e.light)),
        '$$scope' in e && s('$$scope', ($ = e.$$scope))
    }),
    (e.$$.update = (e = { dark: 1, light: 1, $theme: 1 }) => {
      ;(e.dark || e.light || e.$theme) &&
        s('darkTheme', (_ = !!i || (!c && l.dark)))
    }),
    {
      avatar: n,
      classes: o,
      color: a,
      dark: i,
      href: r,
      light: c,
      style: d,
      strColors: g,
      darkTheme: _,
      $$slots: u,
      $$scope: $
    }
  )
}
class MListTile extends SvelteComponent {
  constructor(e) {
    super(),
      init(this, e, instance$h, create_fragment$i, safe_not_equal, [
        'avatar',
        'classes',
        'color',
        'dark',
        'href',
        'light'
      ])
  }
}
function create_fragment$j(e) {
  var t, s
  const l = e.$$slots.default,
    n = create_slot(l, e, null)
  return {
    c() {
      ;(t = element('div')),
        n && n.c(),
        attr(t, 'class', 'v-list__tile__action')
    },
    l(e) {
      n && n.l(div_nodes)
    },
    m(e, l) {
      insert(e, t, l), n && n.m(t, null), (s = !0)
    },
    p(e, t) {
      n &&
        n.p &&
        e.$$scope &&
        n.p(get_slot_changes(l, t, e, null), get_slot_context(l, t, null))
    },
    i(e) {
      s || (transition_in(n, e), (s = !0))
    },
    o(e) {
      transition_out(n, e), (s = !1)
    },
    d(e) {
      e && detach(t), n && n.d(e)
    }
  }
}
function instance$i(e, t, s) {
  let { $$slots: l = {}, $$scope: n } = t
  return (
    (e.$set = e => {
      '$$scope' in e && s('$$scope', (n = e.$$scope))
    }),
    { $$slots: l, $$scope: n }
  )
}
class MListTileAction extends SvelteComponent {
  constructor(e) {
    super(), init(this, e, instance$i, create_fragment$j, safe_not_equal, [])
  }
}
function create_fragment$k(e) {
  var t, s
  const l = e.$$slots.default,
    n = create_slot(l, e, null)
  return {
    c() {
      ;(t = element('div')),
        n && n.c(),
        attr(t, 'class', 'v-list__tile__action-text')
    },
    l(e) {
      n && n.l(div_nodes)
    },
    m(e, l) {
      insert(e, t, l), n && n.m(t, null), (s = !0)
    },
    p(e, t) {
      n &&
        n.p &&
        e.$$scope &&
        n.p(get_slot_changes(l, t, e, null), get_slot_context(l, t, null))
    },
    i(e) {
      s || (transition_in(n, e), (s = !0))
    },
    o(e) {
      transition_out(n, e), (s = !1)
    },
    d(e) {
      e && detach(t), n && n.d(e)
    }
  }
}
function instance$j(e, t, s) {
  let { $$slots: l = {}, $$scope: n } = t
  return (
    (e.$set = e => {
      '$$scope' in e && s('$$scope', (n = e.$$scope))
    }),
    { $$slots: l, $$scope: n }
  )
}
class MListTileActionText extends SvelteComponent {
  constructor(e) {
    super(), init(this, e, instance$j, create_fragment$k, safe_not_equal, [])
  }
}
function create_default_slot$1(e) {
  var t
  const s = e.$$slots.default,
    l = create_slot(s, e, null)
  return {
    c() {
      l && l.c()
    },
    l(e) {
      l && l.l(e)
    },
    m(e, s) {
      l && l.m(e, s), (t = !0)
    },
    p(e, t) {
      l &&
        l.p &&
        e.$$scope &&
        l.p(get_slot_changes(s, t, e, null), get_slot_context(s, t, null))
    },
    i(e) {
      t || (transition_in(l, e), (t = !0))
    },
    o(e) {
      transition_out(l, e), (t = !1)
    },
    d(e) {
      l && l.d(e)
    }
  }
}
function create_fragment$l(e) {
  var t,
    s,
    l = new MAvatar({
      props: {
        size: '40px',
        $$slots: { default: [create_default_slot$1] },
        $$scope: { ctx: e }
      }
    })
  return {
    c() {
      ;(t = element('div')),
        l.$$.fragment.c(),
        attr(t, 'class', 'v-list__tile__avatar')
    },
    m(e, n) {
      insert(e, t, n), mount_component(l, t, null), (s = !0)
    },
    p(e, t) {
      var s = {}
      e.$$scope && (s.$$scope = { changed: e, ctx: t }), l.$set(s)
    },
    i(e) {
      s || (transition_in(l.$$.fragment, e), (s = !0))
    },
    o(e) {
      transition_out(l.$$.fragment, e), (s = !1)
    },
    d(e) {
      e && detach(t), destroy_component(l)
    }
  }
}
function instance$k(e, t, s) {
  let { $$slots: l = {}, $$scope: n } = t
  return (
    (e.$set = e => {
      '$$scope' in e && s('$$scope', (n = e.$$scope))
    }),
    { $$slots: l, $$scope: n }
  )
}
class MListTileAvatar extends SvelteComponent {
  constructor(e) {
    super(), init(this, e, instance$k, create_fragment$l, safe_not_equal, [])
  }
}
function create_fragment$m(e) {
  var t, s
  const l = e.$$slots.default,
    n = create_slot(l, e, null)
  return {
    c() {
      ;(t = element('div')),
        n && n.c(),
        attr(t, 'class', 'v-list__tile__content')
    },
    l(e) {
      n && n.l(div_nodes)
    },
    m(e, l) {
      insert(e, t, l), n && n.m(t, null), (s = !0)
    },
    p(e, t) {
      n &&
        n.p &&
        e.$$scope &&
        n.p(get_slot_changes(l, t, e, null), get_slot_context(l, t, null))
    },
    i(e) {
      s || (transition_in(n, e), (s = !0))
    },
    o(e) {
      transition_out(n, e), (s = !1)
    },
    d(e) {
      e && detach(t), n && n.d(e)
    }
  }
}
function instance$l(e, t, s) {
  let { $$slots: l = {}, $$scope: n } = t
  return (
    (e.$set = e => {
      '$$scope' in e && s('$$scope', (n = e.$$scope))
    }),
    { $$slots: l, $$scope: n }
  )
}
class MListTileContent extends SvelteComponent {
  constructor(e) {
    super(), init(this, e, instance$l, create_fragment$m, safe_not_equal, [])
  }
}
function create_fragment$n(e) {
  var t, s
  const l = e.$$slots.default,
    n = create_slot(l, e, null)
  return {
    c() {
      ;(t = element('div')),
        n && n.c(),
        attr(t, 'class', 'v-list__tile__sub-title')
    },
    l(e) {
      n && n.l(div_nodes)
    },
    m(e, l) {
      insert(e, t, l), n && n.m(t, null), (s = !0)
    },
    p(e, t) {
      n &&
        n.p &&
        e.$$scope &&
        n.p(get_slot_changes(l, t, e, null), get_slot_context(l, t, null))
    },
    i(e) {
      s || (transition_in(n, e), (s = !0))
    },
    o(e) {
      transition_out(n, e), (s = !1)
    },
    d(e) {
      e && detach(t), n && n.d(e)
    }
  }
}
function instance$m(e, t, s) {
  let { $$slots: l = {}, $$scope: n } = t
  return (
    (e.$set = e => {
      '$$scope' in e && s('$$scope', (n = e.$$scope))
    }),
    { $$slots: l, $$scope: n }
  )
}
class MListTileSubTitle extends SvelteComponent {
  constructor(e) {
    super(), init(this, e, instance$m, create_fragment$n, safe_not_equal, [])
  }
}
function create_fragment$o(e) {
  var t, s
  const l = e.$$slots.default,
    n = create_slot(l, e, null)
  return {
    c() {
      ;(t = element('div')), n && n.c(), attr(t, 'class', 'v-list__tile__title')
    },
    l(e) {
      n && n.l(div_nodes)
    },
    m(e, l) {
      insert(e, t, l), n && n.m(t, null), (s = !0)
    },
    p(e, t) {
      n &&
        n.p &&
        e.$$scope &&
        n.p(get_slot_changes(l, t, e, null), get_slot_context(l, t, null))
    },
    i(e) {
      s || (transition_in(n, e), (s = !0))
    },
    o(e) {
      transition_out(n, e), (s = !1)
    },
    d(e) {
      e && detach(t), n && n.d(e)
    }
  }
}
function instance$n(e, t, s) {
  let { $$slots: l = {}, $$scope: n } = t
  return (
    (e.$set = e => {
      '$$scope' in e && s('$$scope', (n = e.$$scope))
    }),
    { $$slots: l, $$scope: n }
  )
}
class MListTileTitle extends SvelteComponent {
  constructor(e) {
    super(), init(this, e, instance$n, create_fragment$o, safe_not_equal, [])
  }
}
function create_fragment$p(e) {
  var t, s, l, n, o
  const a = e.$$slots.default,
    i = create_slot(a, e, null)
  return {
    c() {
      ;(t = element('aside')),
        i && i.c(),
        attr(t, 'id', (s = e.app ? 'app-drawer' : '')),
        attr(
          t,
          'class',
          (l = 'v-navigation-drawer ' + e.strColors + ' ' + e.classes)
        ),
        attr(
          t,
          'style',
          (n = 'width: ' + e.width + '; height: ' + e.height + '; ' + e.style)
        ),
        toggle_class(t, 'v-navigation-drawer--absolute', e.absolute),
        toggle_class(t, 'v-navigation-drawer--clipped', e.clipped),
        toggle_class(t, 'v-navigation-drawer--fixed', e.fixed),
        toggle_class(t, 'v-navigation-drawer--floating', e.floating),
        toggle_class(t, 'v-navigation-drawer--mini-variant', e.mini),
        toggle_class(t, 'v-navigation-drawer--right', e.right),
        toggle_class(t, 'theme--dark', e.darkTheme),
        toggle_class(t, 'theme--light', !e.darkTheme)
    },
    l(e) {
      i && i.l(aside_nodes)
    },
    m(e, s) {
      insert(e, t, s), i && i.m(t, null), (o = !0)
    },
    p(e, r) {
      i &&
        i.p &&
        e.$$scope &&
        i.p(get_slot_changes(a, r, e, null), get_slot_context(a, r, null)),
        (o && !e.app) ||
          s === (s = r.app ? 'app-drawer' : '') ||
          attr(t, 'id', s),
        (o && !e.classes) ||
          l === (l = 'v-navigation-drawer ' + r.strColors + ' ' + r.classes) ||
          attr(t, 'class', l),
        (o && !e.width && !e.height) ||
          n ===
            (n =
              'width: ' + r.width + '; height: ' + r.height + '; ' + r.style) ||
          attr(t, 'style', n),
        (e.strColors || e.classes || e.absolute) &&
          toggle_class(t, 'v-navigation-drawer--absolute', r.absolute),
        (e.strColors || e.classes || e.clipped) &&
          toggle_class(t, 'v-navigation-drawer--clipped', r.clipped),
        (e.strColors || e.classes || e.fixed) &&
          toggle_class(t, 'v-navigation-drawer--fixed', r.fixed),
        (e.strColors || e.classes || e.floating) &&
          toggle_class(t, 'v-navigation-drawer--floating', r.floating),
        (e.strColors || e.classes || e.mini) &&
          toggle_class(t, 'v-navigation-drawer--mini-variant', r.mini),
        (e.strColors || e.classes || e.right) &&
          toggle_class(t, 'v-navigation-drawer--right', r.right),
        (e.strColors || e.classes || e.darkTheme) &&
          (toggle_class(t, 'theme--dark', r.darkTheme),
          toggle_class(t, 'theme--light', !r.darkTheme))
    },
    i(e) {
      o || (transition_in(i, e), (o = !0))
    },
    o(e) {
      transition_out(i, e), (o = !1)
    },
    d(e) {
      e && detach(t), i && i.d(e)
    }
  }
}
function instance$o(e, t, s) {
  let l
  component_subscribe(e, theme, e => {
    s('$theme', (l = e))
  })
  let {
    app: n = !1,
    absolute: o = !1,
    classes: a = '',
    clipped: i = !1,
    color: r = '',
    dark: c = !1,
    fixed: d = !1,
    floating: g = !1,
    height: _ = 'auto',
    light: u = !1,
    mini: $ = !1,
    right: h = !1,
    width: p = '300px'
  } = t
  $ && s('width', (p = '80px'))
  let { style: m, strColors: f } = generateTheme(l, r, !0),
    v = !1,
    { $$slots: b = {}, $$scope: k } = t
  return (
    (e.$set = e => {
      'app' in e && s('app', (n = e.app)),
        'absolute' in e && s('absolute', (o = e.absolute)),
        'classes' in e && s('classes', (a = e.classes)),
        'clipped' in e && s('clipped', (i = e.clipped)),
        'color' in e && s('color', (r = e.color)),
        'dark' in e && s('dark', (c = e.dark)),
        'fixed' in e && s('fixed', (d = e.fixed)),
        'floating' in e && s('floating', (g = e.floating)),
        'height' in e && s('height', (_ = e.height)),
        'light' in e && s('light', (u = e.light)),
        'mini' in e && s('mini', ($ = e.mini)),
        'right' in e && s('right', (h = e.right)),
        'width' in e && s('width', (p = e.width)),
        '$$scope' in e && s('$$scope', (k = e.$$scope))
    }),
    (e.$$.update = (e = { dark: 1, light: 1, $theme: 1 }) => {
      ;(e.dark || e.light || e.$theme) &&
        s('darkTheme', (v = !!c || (!u && l.dark)))
    }),
    {
      app: n,
      absolute: o,
      classes: a,
      clipped: i,
      color: r,
      dark: c,
      fixed: d,
      floating: g,
      height: _,
      light: u,
      mini: $,
      right: h,
      width: p,
      style: m,
      strColors: f,
      darkTheme: v,
      $$slots: b,
      $$scope: k
    }
  )
}
class MNavigationDrawer extends SvelteComponent {
  constructor(e) {
    super(),
      init(this, e, instance$o, create_fragment$p, safe_not_equal, [
        'app',
        'absolute',
        'classes',
        'clipped',
        'color',
        'dark',
        'fixed',
        'floating',
        'height',
        'light',
        'mini',
        'right',
        'width'
      ])
  }
}
function create_fragment$q(e) {
  var t, s
  const l = e.$$slots.default,
    n = create_slot(l, e, null)
  return {
    c() {
      ;(t = element('div')),
        n && n.c(),
        attr(t, 'class', 'v-subheader'),
        toggle_class(t, 'v-subheader--inset', e.inset),
        toggle_class(t, 'theme--dark', e.darkTheme),
        toggle_class(t, 'theme--light', !e.darkTheme)
    },
    l(e) {
      n && n.l(div_nodes)
    },
    m(e, l) {
      insert(e, t, l), n && n.m(t, null), (s = !0)
    },
    p(e, s) {
      n &&
        n.p &&
        e.$$scope &&
        n.p(get_slot_changes(l, s, e, null), get_slot_context(l, s, null)),
        e.inset && toggle_class(t, 'v-subheader--inset', s.inset),
        e.darkTheme &&
          (toggle_class(t, 'theme--dark', s.darkTheme),
          toggle_class(t, 'theme--light', !s.darkTheme))
    },
    i(e) {
      s || (transition_in(n, e), (s = !0))
    },
    o(e) {
      transition_out(n, e), (s = !1)
    },
    d(e) {
      e && detach(t), n && n.d(e)
    }
  }
}
function instance$p(e, t, s) {
  let l
  component_subscribe(e, theme, e => {
    s('$theme', (l = e))
  })
  let { dark: n = !1, inset: o = !1, light: a = !1 } = t,
    { $$slots: i = {}, $$scope: r } = t
  return (
    (e.$set = e => {
      'dark' in e && s('dark', (n = e.dark)),
        'inset' in e && s('inset', (o = e.inset)),
        'light' in e && s('light', (a = e.light)),
        '$$scope' in e && s('$$scope', (r = e.$$scope))
    }),
    (e.$$.update = (e = { dark: 1, light: 1, $theme: 1 }) => {
      ;(e.dark || e.light || e.$theme) && (darkTheme = !!n || (!a && l.dark))
    }),
    {
      dark: n,
      inset: o,
      light: a,
      darkTheme: darkTheme,
      $$slots: i,
      $$scope: r
    }
  )
}
class MSubheader extends SvelteComponent {
  constructor(e) {
    super(),
      init(this, e, instance$p, create_fragment$q, safe_not_equal, [
        'dark',
        'inset',
        'light'
      ])
  }
}
const get_extension_slot_changes = () => ({}),
  get_extension_slot_context = () => ({})
function create_if_block$1(e) {
  var t, s
  const l = e.$$slots.extension,
    n = create_slot(l, e, get_extension_slot_context)
  return {
    c() {
      ;(t = element('div')),
        n && n.c(),
        attr(t, 'class', 'v-toolbar__extension'),
        toggle_class(t, 'v-toolbar--tabs', e.tabs)
    },
    l(e) {
      n && n.l(div_nodes)
    },
    m(e, l) {
      insert(e, t, l), n && n.m(t, null), (s = !0)
    },
    p(e, s) {
      n &&
        n.p &&
        e.$$scope &&
        n.p(
          get_slot_changes(l, s, e, get_extension_slot_changes),
          get_slot_context(l, s, get_extension_slot_context)
        ),
        e.tabs && toggle_class(t, 'v-toolbar--tabs', s.tabs)
    },
    i(e) {
      s || (transition_in(n, e), (s = !0))
    },
    o(e) {
      transition_out(n, e), (s = !1)
    },
    d(e) {
      e && detach(t), n && n.d(e)
    }
  }
}
function create_fragment$r(e) {
  var t, s, l, n, o, a
  const i = e.$$slots.default,
    r = create_slot(i, e, null)
  var c = e.extended && create_if_block$1(e)
  return {
    c() {
      ;(t = element('div')),
        (s = element('div')),
        r && r.c(),
        (l = space()),
        c && c.c(),
        attr(s, 'class', 'v-toolbar__content'),
        attr(t, 'id', (n = e.app ? 'app-toolbar' : '')),
        attr(t, 'class', (o = 'v-toolbar ' + e.strColors + ' ' + e.classes)),
        attr(t, 'style', e.style),
        toggle_class(t, 'v-toolbar--absolute', e.absolute),
        toggle_class(t, 'v-toolbar--card', e.card),
        toggle_class(t, 'v-toolbar--clipped', e.clipped),
        toggle_class(t, 'v-toolbar--dense', e.dense),
        toggle_class(t, 'v-toolbar--extended', e.extended),
        toggle_class(t, 'v-toolbar--fixed', e.fixed),
        toggle_class(t, 'v-toolbar--floating', e.floating),
        toggle_class(t, 'elevation-0', e.flat),
        toggle_class(t, 'theme--dark', e.darkTheme),
        toggle_class(t, 'theme--light', !e.darkTheme)
    },
    l(e) {
      r && r.l(div0_nodes)
    },
    m(e, n) {
      insert(e, t, n),
        append(t, s),
        r && r.m(s, null),
        append(t, l),
        c && c.m(t, null),
        (a = !0)
    },
    p(e, s) {
      r &&
        r.p &&
        e.$$scope &&
        r.p(get_slot_changes(i, s, e, null), get_slot_context(i, s, null)),
        s.extended
          ? c
            ? (c.p(e, s), transition_in(c, 1))
            : ((c = create_if_block$1(s)).c(),
              transition_in(c, 1),
              c.m(t, null))
          : c &&
            (group_outros(),
            transition_out(c, 1, 1, () => {
              c = null
            }),
            check_outros()),
        (a && !e.app) ||
          n === (n = s.app ? 'app-toolbar' : '') ||
          attr(t, 'id', n),
        (a && !e.classes) ||
          o === (o = 'v-toolbar ' + s.strColors + ' ' + s.classes) ||
          attr(t, 'class', o),
        (e.strColors || e.classes || e.absolute) &&
          toggle_class(t, 'v-toolbar--absolute', s.absolute),
        (e.strColors || e.classes || e.card) &&
          toggle_class(t, 'v-toolbar--card', s.card),
        (e.strColors || e.classes || e.clipped) &&
          toggle_class(t, 'v-toolbar--clipped', s.clipped),
        (e.strColors || e.classes || e.dense) &&
          toggle_class(t, 'v-toolbar--dense', s.dense),
        (e.strColors || e.classes || e.extended) &&
          toggle_class(t, 'v-toolbar--extended', s.extended),
        (e.strColors || e.classes || e.fixed) &&
          toggle_class(t, 'v-toolbar--fixed', s.fixed),
        (e.strColors || e.classes || e.floating) &&
          toggle_class(t, 'v-toolbar--floating', s.floating),
        (e.strColors || e.classes || e.flat) &&
          toggle_class(t, 'elevation-0', s.flat),
        (e.strColors || e.classes || e.darkTheme) &&
          (toggle_class(t, 'theme--dark', s.darkTheme),
          toggle_class(t, 'theme--light', !s.darkTheme))
    },
    i(e) {
      a || (transition_in(r, e), transition_in(c), (a = !0))
    },
    o(e) {
      transition_out(r, e), transition_out(c), (a = !1)
    },
    d(e) {
      e && detach(t), r && r.d(e), c && c.d()
    }
  }
}
function instance$q(e, t, s) {
  let l
  component_subscribe(e, theme, e => {
    s('$theme', (l = e))
  })
  let {
      app: n = !1,
      absolute: o = !1,
      card: a = !1,
      classes: i = '',
      clipped: r = !1,
      color: c = '',
      dark: d = !1,
      dense: g = !1,
      extended: _ = !1,
      fixed: u = !1,
      flat: $ = !1,
      floating: h = !1,
      light: p = !1,
      tabs: m = !1
    } = t,
    { style: f, strColors: v } = generateTheme(l, c),
    b = !1,
    { $$slots: k = {}, $$scope: x } = t
  return (
    (e.$set = e => {
      'app' in e && s('app', (n = e.app)),
        'absolute' in e && s('absolute', (o = e.absolute)),
        'card' in e && s('card', (a = e.card)),
        'classes' in e && s('classes', (i = e.classes)),
        'clipped' in e && s('clipped', (r = e.clipped)),
        'color' in e && s('color', (c = e.color)),
        'dark' in e && s('dark', (d = e.dark)),
        'dense' in e && s('dense', (g = e.dense)),
        'extended' in e && s('extended', (_ = e.extended)),
        'fixed' in e && s('fixed', (u = e.fixed)),
        'flat' in e && s('flat', ($ = e.flat)),
        'floating' in e && s('floating', (h = e.floating)),
        'light' in e && s('light', (p = e.light)),
        'tabs' in e && s('tabs', (m = e.tabs)),
        '$$scope' in e && s('$$scope', (x = e.$$scope))
    }),
    (e.$$.update = (e = { dark: 1, light: 1, $theme: 1 }) => {
      ;(e.dark || e.light || e.$theme) &&
        s('darkTheme', (b = !!d || (!p && l.dark)))
    }),
    {
      app: n,
      absolute: o,
      card: a,
      classes: i,
      clipped: r,
      color: c,
      dark: d,
      dense: g,
      extended: _,
      fixed: u,
      flat: $,
      floating: h,
      light: p,
      tabs: m,
      style: f,
      strColors: v,
      darkTheme: b,
      $$slots: k,
      $$scope: x
    }
  )
}
class MToolbar extends SvelteComponent {
  constructor(e) {
    super(),
      init(this, e, instance$q, create_fragment$r, safe_not_equal, [
        'app',
        'absolute',
        'card',
        'classes',
        'clipped',
        'color',
        'dark',
        'dense',
        'extended',
        'fixed',
        'flat',
        'floating',
        'light',
        'tabs'
      ])
  }
}
function create_fragment$s(e) {
  var t, s, l
  const n = e.$$slots.default,
    o = create_slot(n, e, null)
  return {
    c() {
      ;(t = element('div')),
        o && o.c(),
        attr(t, 'class', (s = 'v-toolbar__items ' + e.classes))
    },
    l(e) {
      o && o.l(div_nodes)
    },
    m(e, s) {
      insert(e, t, s), o && o.m(t, null), (l = !0)
    },
    p(e, a) {
      o &&
        o.p &&
        e.$$scope &&
        o.p(get_slot_changes(n, a, e, null), get_slot_context(n, a, null)),
        (l && !e.classes) ||
          s === (s = 'v-toolbar__items ' + a.classes) ||
          attr(t, 'class', s)
    },
    i(e) {
      l || (transition_in(o, e), (l = !0))
    },
    o(e) {
      transition_out(o, e), (l = !1)
    },
    d(e) {
      e && detach(t), o && o.d(e)
    }
  }
}
function instance$r(e, t, s) {
  let { classes: l = '' } = t,
    { $$slots: n = {}, $$scope: o } = t
  return (
    (e.$set = e => {
      'classes' in e && s('classes', (l = e.classes)),
        '$$scope' in e && s('$$scope', (o = e.$$scope))
    }),
    { classes: l, $$slots: n, $$scope: o }
  )
}
class MToolbarItems extends SvelteComponent {
  constructor(e) {
    super(),
      init(this, e, instance$r, create_fragment$s, safe_not_equal, ['classes'])
  }
}
function create_default_slot$2(e) {
  var t
  return {
    c() {
      ;((t = element('i')).textContent = 'menu'),
        attr(t, 'aria-hidden', 'true'),
        attr(t, 'class', 'v-icon material-icons theme--light')
    },
    m(e, s) {
      insert(e, t, s)
    },
    d(e) {
      e && detach(t)
    }
  }
}
function create_fragment$t(e) {
  var t,
    s = new MBtn({
      props: {
        dark: e.dark,
        classes: 'v-toolbar__side-icon',
        icon: !0,
        $$slots: { default: [create_default_slot$2] },
        $$scope: { ctx: e }
      }
    })
  return (
    s.$on('click', e.dispatchClick),
    {
      c() {
        s.$$.fragment.c()
      },
      m(e, l) {
        mount_component(s, e, l), (t = !0)
      },
      p(e, t) {
        var l = {}
        e.dark && (l.dark = t.dark),
          e.$$scope && (l.$$scope = { changed: e, ctx: t }),
          s.$set(l)
      },
      i(e) {
        t || (transition_in(s.$$.fragment, e), (t = !0))
      },
      o(e) {
        transition_out(s.$$.fragment, e), (t = !1)
      },
      d(e) {
        destroy_component(s, e)
      }
    }
  )
}
function instance$s(e, t, s) {
  let { dark: l = !1 } = t
  const n = createEventDispatcher()
  return (
    (e.$set = e => {
      'dark' in e && s('dark', (l = e.dark))
    }),
    {
      dark: l,
      dispatchClick: function(e) {
        n('click', { event: e })
      }
    }
  )
}
class MToolbarSideIcon extends SvelteComponent {
  constructor(e) {
    super(),
      init(this, e, instance$s, create_fragment$t, safe_not_equal, ['dark'])
  }
}
function create_fragment$u(e) {
  var t, s, l
  const n = e.$$slots.default,
    o = create_slot(n, e, null)
  return {
    c() {
      ;(t = element('div')),
        o && o.c(),
        attr(t, 'class', (s = 'v-toolbar__title ' + e.classes))
    },
    l(e) {
      o && o.l(div_nodes)
    },
    m(e, s) {
      insert(e, t, s), o && o.m(t, null), (l = !0)
    },
    p(e, a) {
      o &&
        o.p &&
        e.$$scope &&
        o.p(get_slot_changes(n, a, e, null), get_slot_context(n, a, null)),
        (l && !e.classes) ||
          s === (s = 'v-toolbar__title ' + a.classes) ||
          attr(t, 'class', s)
    },
    i(e) {
      l || (transition_in(o, e), (l = !0))
    },
    o(e) {
      transition_out(o, e), (l = !1)
    },
    d(e) {
      e && detach(t), o && o.d(e)
    }
  }
}
function instance$t(e, t, s) {
  let { classes: l = '' } = t,
    { $$slots: n = {}, $$scope: o } = t
  return (
    (e.$set = e => {
      'classes' in e && s('classes', (l = e.classes)),
        '$$scope' in e && s('$$scope', (o = e.$$scope))
    }),
    { classes: l, $$slots: n, $$scope: o }
  )
}
class MToolbarTitle extends SvelteComponent {
  constructor(e) {
    super(),
      init(this, e, instance$t, create_fragment$u, safe_not_equal, ['classes'])
  }
}
;(exports.MApp = MApp),
  (exports.MAvatar = MAvatar),
  (exports.MBtn = MBtn),
  (exports.MCard = MCard),
  (exports.MCardActions = MCardActions),
  (exports.MCardText = MCardText),
  (exports.MCardTitle = MCardTitle),
  (exports.MChip = MChip),
  (exports.MContainer = MContainer),
  (exports.MContent = MContent),
  (exports.MDivider = MDivider),
  (exports.MFlex = MFlex),
  (exports.MFooter = MFooter),
  (exports.MIcon = MIcon),
  (exports.MImg = MImg),
  (exports.MLayout = MLayout),
  (exports.MList = MList),
  (exports.MListGroup = MListGroup),
  (exports.MListTile = MListTile),
  (exports.MListTileAction = MListTileAction),
  (exports.MListTileActionText = MListTileActionText),
  (exports.MListTileAvatar = MListTileAvatar),
  (exports.MListTileContent = MListTileContent),
  (exports.MListTileSubTitle = MListTileSubTitle),
  (exports.MListTileTitle = MListTileTitle),
  (exports.MNavigationDrawer = MNavigationDrawer),
  (exports.MSubheader = MSubheader),
  (exports.MToolbar = MToolbar),
  (exports.MToolbarItems = MToolbarItems),
  (exports.MToolbarSideIcon = MToolbarSideIcon),
  (exports.MToolbarTitle = MToolbarTitle)
//# sourceMappingURL=svelteify.js.map
