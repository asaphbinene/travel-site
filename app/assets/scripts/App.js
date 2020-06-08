import '../styles/styles.css'; //webpack understand only javascript
import 'lazysizes';
import MobileMenu from './modules/katbinMobileNav';
import RevealOnScroll from './modules/katbinScrolling';
import StickingHeader from './modules/sticking-head';

// React Related code here
import React from 'react'
import ReactDOM from 'react-dom'
ReactDOM.render(<MyAmazingComponent />, document.querySelector("#my-react-example"))

function MyAmazingComponent(){
   return(
       <div>
           <h1>This is My Amazing React Component</h1>
           <p>React is great, the sky is blue, grass is green.</p>
       </div>
   ) 
}
new StickingHeader();
new RevealOnScroll(document.querySelectorAll(".feature-item", 75));
new RevealOnScroll(document.querySelectorAll(".testmonial", 60));
new MobileMenu();
let modal;

document.querySelectorAll(".open-modal").forEach(el => {
    el.addEventListener("click", e => {
        e.preventDefault();
        if(typeof modal == "undefined"){
            import('./modules/katbinModal').then(x => {
                modal = new x.default();
                setTimeout(() => modal.openTheModal(), 20);
            }).catch(() => console.log("There was a problem."));
        }else{
            modal.openTheModal();
        }
    })
})
if(module.hot) {
    module.hot.accept()
}