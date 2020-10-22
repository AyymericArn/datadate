// @ts-ignore
const ctx: Worker = self as any;

ctx.addEventListener('message', (event) => console.log(event));

// self.onmessage = (message) => {
//     console.log('from worker : message', message)
// }