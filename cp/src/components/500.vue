<template>
    <div>
        <h2>{{ 'error' | translate }}: 500</h2>
        <p>{{ '500-description' | translate }} :(</p>
    </div>
</template>

<script>
    export default {
        created() {
            this.$root.$data.title = this.$options.filters.translate('error');
        }
    }
</script>