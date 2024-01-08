import { fail } from "./main";

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
                    background: #ddd;
                    position:relative;
                }
                :host(:hover) {
                    background: #aaa;
                }
                #hitbox {
                    position:absolute;
                    inset: 0;
                    z-index:2;
                }
            </style>
            <a id="hitbox"></a>
            <slot></slot>`;
        // Children need to be style via script.
        // See https://stackoverflow.com/a/61631668 for why.
        this.hitbox = this.shadowRoot.getElementById("hitbox") ?? fail();
        this.href = this.getAttribute("href");
        this.render();
    }

    connectedCallback() {
        console.log('connected!', this);
        this.render();
    }

    disconnectedCallback() {
        console.log('disconnected', this);
    }

    static observedAttributes = ['href'];

    attributeChangedCallback(name: string, _: string, newValue: string) {
        if (name != "href") {
            throw ("Invalid attribute changed");
        }
        console.log("Attr changed.")
        this.href = newValue;
        this.render();
    }

    render() {
        this.hitbox.setAttribute("href", this.href ?? "");

        let slot = this.shadowRoot.querySelectorAll('slot')[0] ;
        let nodes = slot.assignedNodes().map(x => {
            if (x instanceof HTMLElement) {
                return [...x.querySelectorAll("a")]
            } else {
                return [];
            }
        }).flat().filter(x => x instanceof HTMLElement) as HTMLElement[];
        console.log("nodes: ", nodes);
        nodes.forEach(el => {
            console.log("ELEMENT IS: ", el);
            el.style.position = "relative";
            console.log(el.tagName);

            if (el.tagName == "A") {
                console.log("SETTING Z INDEX");
                el.style.zIndex = "5";
            }
        })
    }
}

customElements.define('my-adiv', ADiv);
