import { computed, ref } from "vue";

import type { ColorScheme } from "./types";

const _scheme = ref<ColorScheme>("light");

const _mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
if (_mediaQuery.matches) { _scheme.value = "dark"; }

const _onSchemaChange = (e: MediaQueryListEvent) =>
{
    if (e.matches) { _scheme.value = "dark"; }
    else { _scheme.value = "light"; }
};

_mediaQuery.addEventListener("change", _onSchemaChange);

const scheme = computed({
    get: () => _scheme.value,
    set: (value: ColorScheme) =>
    {
        const _html = document.querySelector<HTMLHtmlElement>("html")!;

        if (value === "dark")
        {
            _html.removeAttribute("light");
            _html.setAttribute("dark", "");
        }
        else
        {
            _html.removeAttribute("dark");
            _html.setAttribute("light", "");
        }
    }
});

export const useTheme = () => ({ colorScheme: scheme });
