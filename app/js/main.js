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
     * Increments the idCount and returns the value
     */
    System.getNewId = function() {
        this._idCount ++;
        return this._idCount;
    }

    /**
     * Initializes the system and starts the update loop
     *
     * @param { Function } opt_setup = Creates the initial system configuration
     * @param { Object } opt_world = A reference to a DOM element representing the system world
     */
    System.init = function(opt_setup, opt_world) {
        var setup = opt_setup || function() { console.log(this); },
            world = opt_world || document.body

        System._records.list.push(new exports.World(world));
        setup.call(this);

        this._update();
    }

    /**
     * Adds an object to the system
     *
     * @param { Object } opt_options = Object properties
     */
    System.add = function(klass, opt_options) {

        var last,
            records = this._records.list,
            recordLookup = this._records.lookup,
            options = opt_options || {};

        options.world = records[0];

        if(exports[klass]) {
            records[records.length] = new exports[klass](options);
        }
        else if(exports.Classes[klass]) {
            records[records.length] = new exports.Classes[klass](options);
        }
        else {
            throw new Error(klass + ' class does not exists');
        }

        last = records.length - 1;
        recordLookup[records[last].id] = records[last].el.parentNode;
        records[last].init(options);
        return records[last];
    }

    /**
     * Iterates over the items in the system and calls the step() and draw()
     *
     * @private
     */
    System._update = function() {

        var i,
            records = System._records.list,
            record;

        for(i = records.length - 1; i >=0; i-=1) {
            records[i].step();
        }

        for(i = records.length - 1; i >=0 ; i -=1) {
            records[i].draw();
        }
        window.requestAnimationFrame(System._update);

    }

    /**
     * Updates the corresponding DOM element's style property
     */
    System._draw = function(obj) {

        var cssText = exports.System.getCSSText({
            x : obj.location.x - (obj.width / 2),
            y : obj.location.y - (obj.width / 2),
            width : obj.width,
            height : obj.height,
            color0 : obj.color[0],
            color1 : obj.color[1],
            color2 : obj.color[2],
            visibility : obj.visibility
        });

        obj.el.style.cssText = cssText;
    }

    /**
     * Concatenates a new cssText String
     *
     * @param { Object } props A map of object properties
     */
    System.getCSSText = function(props) {
        return 'position: absolute; left: ' + props.x + 'px; top: ' + props.y + 'px; width: ' +
            props.width + 'px; height: ' + props.height + 'px; background-color: ' +
            'rgb(' + props.color0 + ', ' + props.color1 + ', ' + props.color2 + ');' +
            'visibility: ' + props.visibility + ';';
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

    /**
     * Update properties
     */
    World.prototype.step = function() {};

    /**
     * Update the corresponding DOM style property
     */
    World.prototype.draw = function() {
        exports.System._draw(this);
    }

    exports.World = World;

})(exports);

(function(exports) {

    /**
     * Creates a new Item
     *
     * @param  { Objects } options A map of initial properties
     * @constructor
     */

    function Item(options) {

        if(!options || !options.world || typeof options.world !== 'object') {
            throw new Error('Item: A valid DOM object is required for a new item');
        }

        this.world = options.world;
        this.name = options.name || 'Item';
        this.id = this.name + exports.System.getNewId();

        this.el = document.createElement('div');
        this.el.id = this.id;
        this.el.className = 'item' + this.name.toLowerCase();
        this.el.style.visibility = 'hidden';
        this.world.el.appendChild(this.el);

        /**
         * Initializes the object
         */
        Item.prototype.init = function(opt_options) {

            var options = opt_options || {};

            this.location = options.location || {x : this.world.width / 2, y : this.world.height / 2 };
            this.width = options.width || 20;
            this.height = options.height || 20;
            this.color = options.color || [0, 0, 0];
            this.visibility = options.visibility || 'visible';

        };

        /**
         * Update properties
         */
        Item.prototype.step = function() {
            this.location.y += 1;
        };

        Item.prototype.draw = function() {
            exports.System._draw(this);
        }

    }

    exports.Item = Item;

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

(function(exports){

    var Classes = {};
    exports.Classes = Classes;

})(exports);

/**
 * RequestAnimationFrame Shim layer with setTimeout
 * @param { function }  callback The function to call
 * @returns { function | Object } An animation frame or a timeout object
 */

window.requestAnimationFrame = (function (callback) {

    return window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60)
        };

})();