/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Composables
import { createVuetify } from 'vuetify'
// Styles
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'myCustomTheme',
    themes: {
      myCustomTheme: {
        dark: true,
        colors: {
          primary: '#313232',
          secondary: '#ffffff',
          success: '#4CAF50',
          error: '#F44336',
          warning: '#FF9800',
          info: '#2196F3',
          background: '#070707',
        },
      },
    },
  },
})
