function add(x) {
	return new Promise(function(resolve, reject) {
		resolve(x + 1000);	
	}, function() {
		reject(new Error("Add didn't work"))
	})
}

function subtract(x) {
	return new Promise(function(resolve, reject) {
		resolve(x - 5);
	}, function() {
	reject(new Error("Subtract didn't work"))
	})
}

function multiply(x, y) {
	return new Promise(function(resolve, reject) {
		resolve(x * y);
	}, function() {
		reject(new Error("Multiply didn't work"));
	}) 
}

function main(x, y){
	multiply(x, y)
	.then(function(product) {
		return add(product);
	}). then(function(sum) {
		return subtract(sum);
	}).then(function(output){
		console.log(output);
	})
}

main(1, 1)