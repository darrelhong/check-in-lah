import { createPocketBaseInstance } from '$lib/poocketbase';

// instantiate PocketBase instance on client
const pb = createPocketBaseInstance();

// load authStore from cookie that was set in hooks.server.ts
pb.authStore.loadFromCookie(document.cookie);
