<script lang="ts" setup>
    import ClayButton from "@/components/ClayButton.vue";
    import ClayCard from "@/components/ClayCard.vue";
    import ClayInput from "@/components/inputs/ClayInput.vue";
</script>

<template>
    <ClayCard>
        <form class="login-form" @submit.prevent>
            <ClayInput id="username"
                       placeholder="Type your email address..."
                       type="email" />
            <ClayInput id="password"
                       placeholder="Type your password..."
                       type="password" />
            <hr />
            <ClayButton type="submit">
                Login
            </ClayButton>
        </form>
    </ClayCard>
</template>

<style lang="scss">
    .login-form
    {
        display: flex;
        flex-direction: column;
        gap: 1em;

        hr
        {
            width: 100%;
        }
    }
</style>
