// https://html.spec.whatwg.org/multipage/dom.html#interactive-content
export const INTERACTIVE_CONTENT_SELECTOR = "a[href], audio[controls], button, details, embed, iframe, img[usemap], input:not([type='hidden']), label, select, textarea, video[controls]";

// Note that this doesn't update when content changes.
class ADiv extends HTMLElement {
    constructor() {
        super();
    }

    // TODO: this can be called multiple times...
    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: 'closed' });
        shadowRoot.innerHTML = `
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
            </div>`;
        const hitbox = shadowRoot.getElementById("hitbox") ?? (() => {throw ""})();
        hitbox.setAttribute("href", this.getAttribute("href") ?? "");

        // Children need to be styled via script.
        // See https://stackoverflow.com/a/61631668 for why.
        const slot = shadowRoot.querySelectorAll('slot')[0];
        const elements = slot.assignedElements();

        // Start by considering the top level nodes themselves.
        let nodes = elements.filter(x => x.matches(INTERACTIVE_CONTENT_SELECTOR));
        // Then consider all children.
        nodes = nodes.concat(elements.map(x => {
            return [...x.querySelectorAll(INTERACTIVE_CONTENT_SELECTOR)]
        }).flat());
        nodes.forEach(el => {
            if (!(el instanceof HTMLElement)) {
                return;
            }
            el.style.position = "relative";
            el.style.zIndex = "5";
        });
    }
}

customElements.define('ce-adiv', ADiv);