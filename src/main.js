import { createApp, reactive } from 'vue'
import App from './App.vue'
import router from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faCartShopping)

const app = createApp(App)

const cart = reactive({
  items: [],
  addItem(product) {
    const existingItem = cart.items.find(item => item.id === product.id)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.items.push({
        ...product,
        quantity: 1
      })
    }
    cart.saveToLocalStorage()
  },
  removeItem(productId) {
    console.log(`Removing item with ID: ${productId}`)
    cart.items = cart.items.filter(item => item.id !== productId)
    cart.saveToLocalStorage()
  },
  saveToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart.items))
  },
  loadFromLocalStorage() {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      cart.items = JSON.parse(savedCart)
    }
  }
})

cart.loadFromLocalStorage()

app.config.globalProperties.$cart = cart
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.mount('#app')

