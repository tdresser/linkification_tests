import {INTERACTIVE_CONTENT_SELECTOR} from './adiv';

class SelectableADiv extends HTMLElement {
    constructor() {
        super();
        this.style.display = "block";
        const shadowRoot = this.attachShadow({ mode: 'closed' });
        shadowRoot.innerHTML = `
            <style>
                :host {
                    position:relative;
                }
                #hitbox {
                    position:absolute;
                    inset: 0;
                    z-index:2;
                }
                #hitbox:link {
                    text-decoration: inherit;
                    color: inherit;
                    cursor: auto;
                }
                #hitbox:visited {
                    text-decoration: inherit;
                    color: inherit;
                    cursor: auto;
                }
            </style>
            <a id="hitbox"><slot></slot></a>
            <slot name="interactable"></slot>`;
        const hitbox = shadowRoot.getElementById("hitbox") ?? (() => {throw ""})();
        hitbox.setAttribute("href", this.getAttribute("href") ?? "");

        // Children need to be style via script.
        // See https://stackoverflow.com/a/61631668 for why.
        const slot = shadowRoot.querySelectorAll('slot')[0];
        const elements = slot.assignedElements();

        // Start by considering the top level nodes themselves.
        let nodes = elements.filter(x => x.matches(INTERACTIVE_CONTENT_SELECTOR));
        // Then consider all children.
        nodes = nodes.concat(elements.map(x => {
            return [...x.querySelectorAll(INTERACTIVE_CONTENT_SELECTOR)]
        }).flat());
        console.log("NODES:", nodes);
        nodes.forEach(el => {
            el.setAttribute("slot", "interactable");
            console.log("SETTING INTERACTABLE", el);
        });
    }
}

customElements.define('selectable-adiv', SelectableADiv);
