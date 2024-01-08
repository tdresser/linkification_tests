(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const c="a[href], audio[controls], button, details, embed, iframe, img[usemap], input:not([type='hidden']), label, select, textarea, video[controls]";class l extends HTMLElement{constructor(){super()}connectedCallback(){const o=this.attachShadow({mode:"closed"});o.innerHTML=`
            <style>
                #container {
                    position:relative;
                }
                #hitbox {
                    position:absolute;
                    inset: 0;
                    z-index:2;
                }
            </style>
            <div id="container">
            <a id="hitbox"></a>
            <slot></slot>
            </div>`,(o.getElementById("hitbox")??(()=>{throw""})()).setAttribute("href",this.getAttribute("href")??"");const e=o.querySelectorAll("slot")[0].assignedElements();let t=e.filter(n=>n.matches(c));t=t.concat(e.map(n=>[...n.querySelectorAll(c)]).flat()),t.forEach(n=>{n instanceof HTMLElement&&(n.style.position="relative",n.style.zIndex="5")})}}customElements.define("ce-adiv",l);typeof HTMLADivElement!="function"&&function(){const s=new CSSStyleSheet;s.replaceSync(`adiv, ce-adiv {
            display:none;
        }`),document.adoptedStyleSheets=[...document.adoptedStyleSheets,s],document.addEventListener("DOMContentLoaded",()=>{s.replaceSync(`adiv, ce-adiv {
                display:block !important;
            }`),document.querySelectorAll("aspan,adiv").forEach(o=>{let r=document.createElement("ce-"+o.tagName);for(r.setAttribute("href",o.getAttribute("href")??"");o.childElementCount!=0;){const i=o.children[0];r.appendChild(i),console.log(i)}o.appendChild(r)})})}();
