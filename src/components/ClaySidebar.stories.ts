import ClaySidebar from "./ClaySidebar.vue";

export default {
    title: "Components/ClaySidebar",
    component: ClaySidebar
};

export const Default = {
    render: () => ({
        components: { ClaySidebar },
        template: "<ClaySidebar />"
    })
};
