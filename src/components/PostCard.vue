<template>
    <div class="d-flex flex-column col bg-white shadow-sm p-3 text-start">
        <h3 class="text-primary">{{ post.title }}</h3>
        <p>{{ post.body }}</p>
        <p class="text-secondary">{{ post?.user?.name }}</p>
    </div>
</template>

<script setup lang="ts">
import {IPostWithUser} from "../interfaces/IPostWithUser";

defineProps<{
    post: IPostWithUser
}>()
</script>

<style scoped>

</style>
