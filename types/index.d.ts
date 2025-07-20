declare module 'nuxt-mixpanel' {
  import { Module } from '@nuxt/types'
  
  interface MixpanelConfig {
    debug?: boolean
    track_pageview?: boolean
    persistence?: 'cookie' | 'localStorage'
    api_host?: string
    loaded?: () => void
    [key: string]: any
  }

  interface MixpanelModuleOptions {
    token?: string
    config?: MixpanelConfig
    name?: string
    disabled?: boolean
    useRouter?: boolean
  }

  const mixpanelModule: Module<MixpanelModuleOptions>
  export = mixpanelModule
}

declare module '@nuxt/types' {
  interface Context {
    $mixpanel: any
  }

  interface NuxtAppOptions {
    $mixpanel: any
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $mixpanel: any
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $mixpanel: any
  }
}
