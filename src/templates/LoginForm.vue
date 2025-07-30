<script lang="ts" setup>
    import ClayButton from "@/components/ClayButton.vue";
    import ClayCard from "@/components/ClayCard.vue";
    import ClayInput from "@/components/inputs/ClayInput.vue";
</script>

<template>
    <ClayCard class="claycard">
        <h1 class="title">
            Login Form
        </h1>
        <form class="login-form" @submit.prevent>
            <label class="label" for="username">Please type your email address</label>
            <ClayInput id="username"
                       class="input"
                       placeholder="Type here your email address..."
                       type="email" />
            <label class="label" for="password">Please type your password</label>
            <ClayInput id="password"
                       class="input"
                       placeholder="Type here your password..."
                       type="password" />
            <hr />
            <ClayButton class="claybutton" type="submit">
                Login
            </ClayButton>
        </form>
    </ClayCard>
</template>

<style lang="scss">
    .loginContainer
    {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .label
    {
        float:left;
    }
    .login-form
    {
        display: flex;
        flex-direction: column;
        gap: 1em;
        justify-content:center;
        align-items: center;
        hr
        {
            width: 100%;
        }
    }
    .claybutton
    {
        width:200px;
        justify-content:center;
    }
    .claycard
    {
        width:400px;
    }
    .input
    {
        width:200px;
    }
</style>
