import {INTERACTIVE_CONTENT_SELECTOR, fail} from './adiv';

class SelectableADiv extends HTMLElement {
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
        this.hitbox = this.shadowRoot.getElementById("hitbox") ?? fail();
        this.href = this.getAttribute("href");
    }

    static observedAttributes = ['href'];

    attributeChangedCallback(name: string, _: string, newValue: string) {
        if (name != "href") {
            throw ("Invalid attribute changed");
        }
        this.href = newValue;
        this.render();
    }
    render() {
        this.hitbox.setAttribute("href", this.href ?? "");

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

customElements.define('selectable-adiv', SelectableADiv);