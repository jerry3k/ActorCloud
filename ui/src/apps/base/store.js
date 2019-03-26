import { httpGet } from '@/utils/api'

const state = {
  loading: false,
  leftbar: JSON.parse(localStorage.getItem('leftbar')) || { width: 'wide' },
  menus: JSON.parse(localStorage.getItem('menus')) || [],
  tabs: JSON.parse(localStorage.getItem('tabs')) || {},
  permissions: JSON.parse(localStorage.getItem('permissions')) || {},
  dictCode: JSON.parse(localStorage.getItem('dictCode')) || {},
  showProductsMall: parseInt(localStorage.getItem('showProductsMall'), 10) || 0, // Number type
  userLogo: localStorage.getItem('userLogo') || '',
  userLogoDark: localStorage.getItem('userLogoDark') || '',
  currentTheme: localStorage.getItem('currentTheme') || 'light', // Current theme, light/dark
}

const LOADING_START = 'LOADING_START'
const LOADING_END = 'LOADING_END'
const LEFTBAR_SWITCH = 'LEFTBAR_SWITCH'
const LEFT_MENUS = 'LEFT_MENUS'
const NAV_TABS = 'NAV_TABS'
const USER_PERMISSIONS = 'USER_PERMISSIONS'
const CLEAR_BASE = 'CLEAR_BASE'
const GET_DICT_CODE = 'GET_DICT_CODE'
const RECEIVE_DICT_CODE = 'RECEIVE_DICT_CODE'
const SHOW_PRODUCTS_MALL = 'SHOW_PRODUCTS_MALL'
const USER_LOGO = 'USER_LOGO'
const USER_LOGO_DARK = 'USER_LOGO_DARK'
const THEME_SWITCH = 'THEME_SWITCH'

const actions = {
  [LOADING_START]({ commit }) {
    commit(LOADING_START)
  },
  [LOADING_END]({ commit }) {
    commit(LOADING_END)
  },
  [LEFTBAR_SWITCH]({ commit }, payload) {
    localStorage.setItem('leftbar', JSON.stringify(payload.leftbar))
    commit(LEFTBAR_SWITCH, payload.leftbar)
  },
  [LEFT_MENUS]({ commit }, payload) {
    localStorage.setItem('menus', JSON.stringify(payload.menus))
    commit(LEFT_MENUS, payload.menus)
  },
  [NAV_TABS]({ commit }, payload) {
    localStorage.setItem('tabs', JSON.stringify(payload.tabs))
    commit(NAV_TABS, payload.tabs)
  },
  [USER_PERMISSIONS]({ commit }, payload) {
    localStorage.setItem('permissions', JSON.stringify(payload.permissions))
    commit(USER_PERMISSIONS, payload.permissions)
  },
  [CLEAR_BASE]({ commit }) {
    localStorage.removeItem('menus')
    localStorage.removeItem('tabs')
    localStorage.removeItem('permissions')
    commit(CLEAR_BASE)
  },
  [GET_DICT_CODE]({ commit }) {
    return new Promise((resolve) => {
      httpGet('/emq_select/dict_code').then((response) => {
        commit(RECEIVE_DICT_CODE, response.data)
        localStorage.setItem('dictCode', JSON.stringify(response.data))
        resolve(response.data)
      })
    })
  },
  [SHOW_PRODUCTS_MALL]({ commit }, payload) {
    localStorage.setItem('showProductsMall', payload.showProductsMall)
    commit(SHOW_PRODUCTS_MALL, payload.showProductsMall)
  },
  [USER_LOGO]({ commit }, payload) {
    localStorage.setItem('userLogo', payload.userLogo)
    commit(USER_LOGO, payload.userLogo)
  },
  [USER_LOGO_DARK]({ commit }, payload) {
    localStorage.setItem('userLogoDark', payload.userLogoDark)
    commit(USER_LOGO_DARK, payload.userLogoDark)
  },
  [THEME_SWITCH]({ commit }, payload) {
    localStorage.setItem('currentTheme', payload.currentTheme)
    commit(THEME_SWITCH, payload.currentTheme)
  },
}

const mutations = {
  [LOADING_START](state) {
    state.loading = true
  },
  [LOADING_END](state) {
    state.loading = false
  },
  [LEFTBAR_SWITCH](state, leftbar) {
    Object.assign(state.leftbar, leftbar)
  },
  [LEFT_MENUS](state, menus) {
    Object.assign(state.menus, menus)
  },
  [NAV_TABS](state, tabs) {
    Object.assign(state.tabs, tabs)
  },
  [USER_PERMISSIONS](state, permissions) {
    Object.assign(state.permissions, permissions)
  },
  [CLEAR_BASE](state) {
    state.menus = []
    state.tabs = {}
    state.permissions = {}
  },
  [RECEIVE_DICT_CODE](state, dictCode) {
    Object.assign(state.dictCode, dictCode)
  },
  [SHOW_PRODUCTS_MALL](state, showProductsMall) {
    state.showProductsMall = showProductsMall
  },
  [USER_LOGO](state, userLogo) {
    state.userLogo = userLogo
  },
  [USER_LOGO_DARK](state, userLogoDark) {
    state.userLogoDark = userLogoDark
  },
  [THEME_SWITCH](state, currentTheme) {
    state.currentTheme = currentTheme
  },
}

export default {
  state,
  actions,
  mutations,
}