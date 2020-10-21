import { writable } from 'svelte/store';

export const selected = writable({
    population: [],
    lieu: []
});