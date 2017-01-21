(function() {
    
    function f3() {
        return this;
    }
 
    f3.call(this) === global;

    function f4() {
        this.hrep = "drep";
    }

    function Thing() {
        this.thisIsEasyToUnderstand = "just kidding";
        f4.call(this);  // call can be used to pass context of 'this'
    }
    
    var thing = new Thing();
})();


