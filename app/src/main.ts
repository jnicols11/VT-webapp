import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './style.css'
import { createAuth0 } from '@auth0/auth0-vue'

const app = createApp(App)

app.use(
  createAuth0({
    domain: 'dev-woizghjpyck5bia3.us.auth0.com',
    clientId: '80YiwQxuL5CxqDO2oSRCZC7uuVRf0Fus',
    authorizationParams: {
      redirect_uri: window.location.origin
    }
  })
)

app.use(createPinia())
app.use(router)

app.mount('#app')
