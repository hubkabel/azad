/* Copyright(c) 2018 Philip Mulcahy. */
/* jshint strict: true, esversion: 6 */

let amazon_order_history_db = (function() {
    'use strict';

    class DB {
        constructor() {
            this.orders = {};
        }

        get(id) {
            return this.orders[id];
        }

        set(order) {
            this.orders[id] = order;
        }
    }


    return {
        create: function() {
            return new DB();
        }
    };
})();
