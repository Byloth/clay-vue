// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./shims.d.ts" />

import { defineCustomElement } from "vue";

import "./assets/scss/main.scss";

import ClayButton from "./components/ClayButton.vue";
import ClayCard from "./components/ClayCard.vue";

export const ClayButtonElement = defineCustomElement(ClayButton, { shadowRoot: false });
export const ClayCardElement = defineCustomElement(ClayCard, { shadowRoot: false });

declare global
{
    interface HTMLElementTagNameMap
    {
        "clay-button": InstanceType<typeof ClayButtonElement>;
        "clay-card": InstanceType<typeof ClayCardElement>;
    }
}

if (typeof customElements !== "undefined")
{
    if (!(customElements.get("clay-button"))) { customElements.define("clay-button", ClayButtonElement); }
    if (!(customElements.get("clay-card"))) { customElements.define("clay-card", ClayCardElement); }
}
