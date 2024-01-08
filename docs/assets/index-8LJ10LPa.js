var d=Object.defineProperty;var h=(s,o,r)=>o in s?d(s,o,{enumerable:!0,configurable:!0,writable:!0,value:r}):s[o]=r;var n=(s,o,r)=>(h(s,typeof o!="symbol"?o+"":o,r),r);(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const a="a[href], audio[controls], button, details, embed, iframe, img[usemap], input:not([type='hidden']), label, select, textarea, video[controls]";class c extends HTMLElement{constructor(){super();n(this,"href",null);n(this,"hitbox");n(this,"shadowRoot");this.style.display="block",this.shadowRoot=this.attachShadow({mode:"closed"}),this.shadowRoot.innerHTML=`
            <style>
                :host {
                    position:relative;
                }
                #hitbox {
                    position:absolute;
                    inset: 0;
                    z-index:2;
                }
            </style>
            <a id="hitbox"></a>
            <slot></slot>`,this.hitbox=this.shadowRoot.getElementById("hitbox")??u(),this.href=this.getAttribute("href")}attributeChangedCallback(r,i,e){if(r!="href")throw"Invalid attribute changed";this.href=e,this.render()}render(){this.hitbox.setAttribute("href",this.href??"");const i=this.shadowRoot.querySelectorAll("slot")[0].assignedElements();let e=i.filter(t=>t.matches(a));e=e.concat(i.map(t=>[...t.querySelectorAll(a)]).flat()),e.forEach(t=>{t instanceof HTMLElement&&(t.style.position="relative",t.style.zIndex="5")})}}n(c,"observedAttributes",["href"]);customElements.define("my-adiv",c);function u(){throw new Error("missing element")}
