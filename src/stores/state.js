import { writable } from 'svelte/store';

export const selected = writable({
    population: 0,
    lieu: 0
});