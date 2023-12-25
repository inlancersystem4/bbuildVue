import { defineStore } from 'pinia';

export const useAlertStore = defineStore({
    id: 'alert',
    state: () => ({
        alert: null
    }),
    actions: {
        success(message) {
            alert(message);
            this.alert = { message, type: 'alert-success' };
            // this.$notify({
            //     group: "foo",
            //     title: "Success",
            //     text: message
            // }, 2000)
        },
        error(message) {
            alert(message);
            this.alert = { message, type: 'alert-danger' };
            // this.$notify({
            //     group: "foo",
            //     title: "error",
            //     text: message
            // }, 2000)
        },
        clear() {
            this.alert = null;
        }
    }
});
