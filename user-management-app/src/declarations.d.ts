declare module 'sharedstore/store' {
    import { Store } from '@reduxjs/toolkit';
    export const store: Store;
    export const setUsers: (payload: any) => any;
  }