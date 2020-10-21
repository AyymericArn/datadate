import { writable } from 'svelte/store';

export const selected = writable({
    population: [],
    lieu: []
});

export const screen = writable(1);