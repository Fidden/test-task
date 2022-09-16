<template>
    <div class="input-group flex-nowrap w-25 mx-auto px-2">
        <span class="input-group-text" id="addon-wrapping">
            <svg width="20" height="20" class="DocSearch-Search-Icon" viewBox="0 0 20 20"><path
                d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
                stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="round"
                stroke-linejoin="round"></path></svg>
        </span>
        <input
            type="text"
            class="form-control"
            placeholder="Filter by author ..."
            aria-label="Filter by author ..."
            aria-describedby="addon-wrapping"
            v-model.trim="query"
        >
    </div>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";

const debounceTimer = ref<NodeJS.Timeout>();

const emit = defineEmits<{
    (e: 'filter-update', value: string): void;
}>();
const query = ref<string>('');

watch(query, (value) => {
    if (debounceTimer.value)
        clearTimeout(debounceTimer.value);

    debounceTimer.value = setTimeout(() => {
        emit('filter-update', value);
    }, 500);
});

</script>

<style scoped>
@media (max-width: 992px) {
    .input-group {
        width: 50% !important;
    }
}

@media (max-width: 576px) {
    .input-group {
        width: 100% !important;
    }
}
</style>
