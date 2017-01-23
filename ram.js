function Ram() {
	this.name = 'abhishek';
}

Ram.prototype.changeName = function() {
        var name = this.name;
	name = 'gosu';
	console.log(this.name);
}

Ram.prototype.chaman = function() {
	console.log(this.name);
	this.changeName();
	console.log(this.name);
}

var obj = new Ram();
obj.chaman();
 
