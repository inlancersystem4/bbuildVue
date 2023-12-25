import { defineStore } from 'pinia';
import { notify } from "notiwind"

export const useAlertStore = defineStore({
    id: 'alert',
    state: () => ({
        alert: null
    }),
    actions: {
        success(message) {
            alert(message);
            this.alert = { message, type: 'alert-success' };
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
