<template>
    <div class="container">
        <PostsFilter
            @filter-update="filterUpdate"
        />
        <div
            v-if="postWithUser?.length > 0"
            class="container posts-container d-grid gap-3 py-3"
        >
            <PostCard
                v-for="post in postWithUser"
                :key="post.id"
                :post="post"
            />
        </div>
        <div
            v-else-if="loading"
            class="container h-100"
        >
            <h2 class="text-center py-5">
                Loading...
            </h2>
        </div>
        <div
            v-else
        >
            <h2 class="text-center py-5">
                Nothing found :(
            </h2>
        </div>
    </div>
</template>

<script setup lang="ts">
import PostsFilter from "./components/PostsFilter.vue";
import PostCard from "./components/PostCard.vue";
import {computed, onMounted, ref} from "vue";
import {IPost} from "./interfaces/IPost";
import {IUser} from "./interfaces/IUser";
import {IPostWithUser} from "./interfaces/IPostWithUser";

const loading = ref<boolean>(true);
const posts = ref<IPost[]>([]);
const users = ref<IUser[]>([]);
const filterQuery = ref<string>('');

onMounted(async () => {
    const [_users, _posts] = await Promise.all([
        getUsers(),
        getPosts()
    ])

    loading.value = false;
    users.value = _users;
    posts.value = _posts;
})

const postWithUser = computed(() => {
    return posts.value.map(item => {
        const postUser = users.value.find(user => user.id === item.userId)
        return {...item, user: postUser} as IPostWithUser;
    }).filter(item => item.user?.name.toLowerCase().indexOf(filterQuery.value.toLowerCase()) !== -1);
})

async function getPosts() {
    const res = await fetch('http://jsonplaceholder.typicode.com/posts');
    return await res.json();
}

async function getUsers() {
    const res = await fetch('http://jsonplaceholder.typicode.com/users');
    return await res.json();
}

function filterUpdate(query: string) {
    filterQuery.value = query;
}

</script>

<style scoped>
.posts-container {
    grid-template-columns: repeat(3, 1fr);
}

@media (max-width: 992px) {
    .posts-container {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
    .posts-container {
        grid-template-columns: 1fr;
    }
}
</style>
