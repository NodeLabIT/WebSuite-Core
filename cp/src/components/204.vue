<template>
    <div>
        <h2>{{ 'error' | translate }}: 204</h2>
        <p>{{ '204-description' | translate }} :(</p>
    </div>
</template>

<script>
    export default {
        created() {
            this.$root.$data.title = this.$options.filters.translate('error');
        }
    }
</script>