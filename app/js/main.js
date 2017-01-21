/**
 * @author : abhishek goswami ( hiro )
 * abhishekg785@gmail.com
 *
 * main.js : magic happens here :)
 */

/*
 first step is creating a system class
 our system will iterate over a list of items and update their properties
 translate those properties into css values and update the viewport. Simple!

 our system in brief : initializing , adding items, updating them, drawing them YO!
 */

SimpleSimulation = {}; exports = SimpleSimulation;

(function(exports) {

    /** @namespace */
    var System = {
        name : 'System'
    }

    /**
     * Stores references to all items in the system
     * @private
     */
    System._records = {
        lookup : {},
        list : []
    }

    /**
     * Used to create unique ids
     * @private
     */
    System._idCount = 0;

    /**
     * Initializes the system and starts the update loop
     *
     * @param { Function } opt_setup = Creates the initial system configuration
     * @param { Object } opt_world = A reference to a DOM element representing the system world
     */
    System.init = function(opt_setup, opt_world) {
        var setup = opt_setup || function() {},
            world = opt_world || document.body

        System._records.list.push(new exports.World(world));
        setup.call(this);
    }

    exports.System = System;

})(exports);

(function (exports) {

    /**
     * creates a new world
     *
     * @param { Object } e1 The DOM element representing the world
     * @constructor
     */

    function World(el) {

        var viewportSize = exports.Utils.getViewportSize();

        if(!el || typeof el !== 'object') {
            throw new Error('World: A valid DOM object is required for a new world.');
        }

        this.el = el;
        this.el.className = 'world';
        this.width = viewportSize.width;
        this.height = viewportSize.height;
        this.location = {
            x : viewportSize.width / 2,
            y : viewportSize.height / 2
        }
        this.color = 'transparent';
        this.visibility = 'visible';
    }

    /**
     * Worlds does not have worlds, However assigning a
     * blank object avoid coding extra logic in System._update
     */

    World.prototype.world = {};
    exports.World = World;

})(exports);

(function(exports){

    var Utils = {};

    /** Determine the browser viewport
     *
     * @returns { Object } The current browser viewport width and height
     * @private
     */
    Utils.getViewportSize = function() {

        var d = {};

        if(typeof(window.innerWidth) !== 'undefined') {
            d.width = window.innerWidth;
            d.height = window.innerHeight;
        }
        else if(typeof(document.documentElement) != 'undefined' && typeof(document.documentElement.clientWidth) != 'undefined') {
            d.width = document.documentElement.clientWidth;
            d.height = document.documentElement.clientHeight;
        }
        else if(typeof(document.body) != 'undefined') {
            d.width = document.body.clientWidth;
            d.height = document.body.clientHeight;
        }
        else {
            d.width = undefined;
            d.height = undefined;
        }
        return d;
    }

    exports.Utils = Utils;
})(exports);