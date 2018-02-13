<template>
    <div class="highlighted">
        <h3>Automatische Anmeldung</h3>
        <div class="grid" v-if="!$root.loggedIn">
            <div class="alert info">
                Die automatische Anmeldung wird aktuell ausgeführt. Dies kann einen Augenblick dauern.
            </div>
        </div>
        <div v-else>
            <div class="alert error">
                Du kannst nicht auf diese Seite zugreifen, wenn du angemeldet bist.
            </div>
        </div>
    </div>
</template>