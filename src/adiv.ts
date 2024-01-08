import './ce-adiv'

// @ts-ignore
if (typeof HTMLADivElement != "function") {
    (function () {
        const sheet = new CSSStyleSheet()
        sheet.replaceSync(`adiv, ce-adiv {
            display:none;
        }`);
        document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
        document.addEventListener("DOMContentLoaded", () => {
            sheet.replaceSync(`adiv, ce-adiv {
                display:block !important;
            }`)
            document.querySelectorAll("aspan,adiv").forEach(x => {
                let ce = document.createElement("ce-" + x.tagName);
                ce.setAttribute("href", x.getAttribute("href") ?? "");
                while (true) {
                    if (x.childElementCount == 0) {
                        break;
                    }
                    const c = x.children[0];
                    ce.appendChild(c);
                    console.log(c);
                }
                x.appendChild(ce);
            })
        })
    })()
};