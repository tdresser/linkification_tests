// https://html.spec.whatwg.org/multipage/dom.html#interactive-content
const INTERACTIVE_CONTENT_SELECTOR = "a[href], audio[controls], button, details, embed, iframe, img[usemap], input:not([type='hidden']), label, select, textarea, video[controls]";

// Note that this doesn't update when content changes.
class ADiv extends HTMLElement {
    href: string | null = null;
    hitbox: HTMLElement;
    shadowRoot: ShadowRoot;

    constructor() {
        super();
        this.style.display = "block";
        this.shadowRoot = this.attachShadow({ mode: 'closed' });
        this.shadowRoot.innerHTML = `
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
            <slot></slot>`;
        this.hitbox = this.shadowRoot.getElementById("hitbox") ?? (() => {throw ""})();
        this.href = this.getAttribute("href");

        // Children need to be style via script.
        // See https://stackoverflow.com/a/61631668 for why.
        const slot = this.shadowRoot.querySelectorAll('slot')[0];
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

customElements.define('my-adiv', ADiv);