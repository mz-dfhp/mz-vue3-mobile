import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import store from '@/store'

export interface ISettings {
  theme: 'light' | 'dark'
  themeColor: string
  transitionName: 'fade' | 'slide-fade' | 'zoom' | 'fade-transform'
}
const pid = 'STORE__SETTING'

export const settingStore = defineStore(
  pid,
  () => {
    const theme = ref<ISettings['theme']>('light')
    const getTheme = computed(() => theme.value)
    function setTheme(name: ISettings['theme']) {
      theme.value = name
    }

    const themeColor = ref<string>('#0e0c95')
    const getThemeColor = computed(() => themeColor.value)
    function setThemeColor(name: string) {
      themeColor.value = name
    }

    const transitionName = ref<ISettings['transitionName']>('fade-transform')
    const getTransitionName = computed(() => transitionName.value)
    function setTransitionName(name: ISettings['transitionName']) {
      transitionName.value = name
    }

    return {
      theme,
      themeColor,
      transitionName,
      getTheme,
      getThemeColor,
      getTransitionName,
      setTheme,
      setThemeColor,
      setTransitionName,
    }
  },
  {
    persist: {
      storage: localStorage,
      paths: [],
    },
  },
)
export const settingStoreWithout = () => settingStore(store)
