import { defineStore } from 'pinia';
import { notify } from "notiwind"

export const useAlertStore = defineStore({
    id: 'alert',
    state: () => ({
        alert: null
    }),
    actions: {
        success(message) {
            this.alert = { message, type: 'alert-success' };
            notify({
                group: "foo",
                title: "Success",
                text: message
            }, 2000)
        },
        error(message) {
            this.alert = { message, type: 'alert-danger' };
            notify({
                group: "error",
                title: "Error",
                text: message
            }, 2000)
        },
        clear() {
            this.alert = null;
        }
    }
});
