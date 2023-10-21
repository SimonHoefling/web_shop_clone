import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon);

// Custom v-lazy directive
app.directive('lazy', {
  mounted(el, binding) {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Cast 'el' to HTMLImageElement to access the 'src' property.
          const img = el as HTMLImageElement;
          img.src = binding.value;
          observer.unobserve(el);
        }
      });
    }, options);

    observer.observe(el);
  },
});

app.use(createPinia())
app.use(router)

app.mount('#app')
