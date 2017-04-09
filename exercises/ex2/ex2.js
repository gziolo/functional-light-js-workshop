// 1. Define `foo(..)` so that it produces a function which remembers only the first two arguments that were passed to `foo(..)`, and always adds them together.

function eagerFoo( a, b ) {
	const sum = a + b;

	return function() {
		return sum;
	}
}

const x = eagerFoo( 3, 4 );

console.log( x() );	// 7
console.log( x() );	// 7

// 2. The same as (1) but lazy.

function lazyFoo( a, b ) {
	let sum;

	return function() {
		if ( sum === undefined ) {
			sum = a + b;
		}

		return sum;
	}
}

const y = lazyFoo( 3, 4 );

console.log( y() );	// 7
console.log( y() );	// 7
