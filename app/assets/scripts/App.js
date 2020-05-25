import '../styles/styles.css' //webpack understand only javascript
import MobileMenu from './modules/katbinMobileNav'

let mobileMenu = new MobileMenu();

if(module.hot) {
    module.hot.accept()
}