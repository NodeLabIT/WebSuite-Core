<template>
    <div class="dropdown relative">
        <a class="relative">
            <i v-if="icon" class="fa" :class="icon"></i>
            <span v-if="badge" class="notification-badge">{{ badge }}</span>
            <span class="mobile-hidden">{{ title }}</span>
        </a>

        <div class="dropdown-content notification">
            <h4>{{ title }}</h4>
            <div class="content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
    // TODO
</script>