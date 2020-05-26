import '../styles/styles.css'; //webpack understand only javascript
import MobileMenu from './modules/katbinMobileNav';
import RevealOnScroll from './modules/katbinScrolling';

new RevealOnScroll(document.querySelectorAll(".feature-item", 65));

new RevealOnScroll(document.querySelectorAll(".testmonial", 50));

let mobileMenu = new MobileMenu();

if(module.hot) {
    module.hot.accept()
}