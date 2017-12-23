<template>
    <div class="cat-sidebar" v-if="$root.loggedIn">
    </div>
    <div class="cat-sidebar" v-else>
        <div class="panel-head">
            <h4>Sie sind nicht angemeldet!</h4>
        </div>
        <div class="content">
            <router-link to="/login" class="mainbutton" style="width: 100%; text-align: center;">Jetzt Anmelden/Registrieren</router-link>
        </div>
    </div>
</template>