var a=Object.defineProperty;var d=(r,o,s)=>o in r?a(r,o,{enumerable:!0,configurable:!0,writable:!0,value:s}):r[o]=s;var n=(r,o,s)=>(d(r,typeof o!="symbol"?o+"":o,s),s);(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const c="a[href], audio[controls], button, details, embed, iframe, img[usemap], input:not([type='hidden']), label, select, textarea, video[controls]";class u extends HTMLElement{constructor(){super();n(this,"href",null);n(this,"hitbox");n(this,"shadowRoot");this.style.display="block",this.shadowRoot=this.attachShadow({mode:"closed"}),this.shadowRoot.innerHTML=`
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
            <slot></slot>`,this.hitbox=this.shadowRoot.getElementById("hitbox")??(()=>{throw""})(),this.href=this.getAttribute("href");const i=this.shadowRoot.querySelectorAll("slot")[0].assignedElements();let e=i.filter(t=>t.matches(c));e=e.concat(i.map(t=>[...t.querySelectorAll(c)]).flat()),e.forEach(t=>{t instanceof HTMLElement&&(t.style.position="relative",t.style.zIndex="5")})}}customElements.define("my-adiv",u);
