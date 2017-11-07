<template>
    <div class="extra-margin">
        <a class="floating-button extra-margin" @click="save()">
            <i class="material-icons">save</i>
            <span class="text">Änderungen speichern</span>
        </a>
        <form>
            <div>
                <input type="text" id="title" v-model="page.title" class="tiny" v-bind:class="{ valid: $root.isValid(page.title) }" />
                <label for="title" class="floating-label">{{ 'page-title' | translate }}</label>
            </div>
            <div>
                <input type="text" id="subtitle" v-model="page.subtitle" class="tiny" v-bind:class="{ valid: $root.isValid(page.subtitle) }" />
                <label for="subtitle" class="floating-label">{{ 'page-subtitle' | translate }}</label>
            </div>
            <div>
                <input type="text" id="description" class="large" v-model="page.description" v-bind:class="{ valid: $root.isValid(page.description) }" />
                <label for="description" class="floating-label">{{ 'page-description' | translate }}</label>
            </div>
            <div>
                <input type="text" id="keywords" class="large" v-model="page.keywords" v-bind:class="{ valid: $root.isValid(page.keywords) }" />
                <label for="keywords" class="floating-label">{{ 'page-keywords' | translate }}</label>
                <span class="helper">
                    {{ 'page-keywords-helper' | translate }}
                </span>
            </div>
            <div>
                <label for="footerScript">{{ 'page-footer-script' | translate }}</label>
                <textarea id="footerScript" v-model="page.footerScript"></textarea>
                <span class="helper">
                    {{ 'page-footer-script-helper' | translate }}
                </span>
            </div>
        </form>
    </div>
</template>

<script>
    import { sio } from '../../../main';
    export default {
        data() {
            return {
                page: {}
            }
        },
        methods: {
            save() {
                sio().emit('cp-save-general-configuration', this.page);
            }
        },
        created() {
            this.$root.$data.title = this.$options.filters.translate('configuration');

            sio().emit('cp-general-configuration', {});
            sio().on('cp-general-configuration', (data) => {
                this.page = data;
            });
        }
    }
</script>