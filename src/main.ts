import './style.css'
import './adiv'

export function fail(): never {
  throw new Error("missing element");
}

const el = document.getElementById("foo") ?? fail();


function addAnchor(el:HTMLElement, href:string) {
  // TODO: this is breaking!
  el.style.position = "relative";
  for (const c of el.children) {
    (c as HTMLElement).style.position = "relative";
  }

  const a = document.createElement("a");
  a.href = href;
  a.style.position = "absolute";
  a.style.inset = "0";
  a.innerText = "Test";
  el.prepend(a);
}

addAnchor(el, "http://www.google.com");

