<template>
    <div>
        <form>
            <div>
                <input type="text" id="title" v-model="page.title" class="tiny" v-bind:class="{ valid: $root.isValid(page.title) }" />
                <label for="title">Titel der Seite</label>
            </div>
            <div>
                <input type="text" id="subtitle" v-model="page.subtitle" class="tiny" v-bind:class="{ valid: $root.isValid(page.subtitle) }" />
                <label for="subtitle">Untertitel der Seite</label>
            </div>
            <div>
                <input type="text" id="description" class="large" v-model="page.description" v-bind:class="{ valid: $root.isValid(page.description) }" />
                <label for="description">Beschreibung der Seite</label>
            </div>
            <div>
                <input type="text" id="keywords" class="large" v-model="page.keywords" v-bind:class="{ valid: $root.isValid(page.keywords) }" />
                <label for="keywords">Schlüsselwörter der Seite</label>
                <span class="helper">
                    Einzelne Schlüsselwörter müssen mit Kommatas getrennt werden
                </span>
            </div>
        </form>
    </div>
</template>

<script>
    import { sio } from '../main';
    export default {
        data() {
            return {
                page: {
                    title: "NodeLab IT",
                    subtitle: "deutsches Unternehmen",
                    description: "NodeLab IT ist ein deutsches Unternehmen, das sich auf die Entwicklung eines CMS festgesetzt hat",
                    keywords: "nodelab, it, informationstechnologie, deutsch"
                }
            }
        },
        methods: {

        },
        created() {
            this.$root.$data.title = this.$options.filters.translate('configuration');

        }
    }
</script>