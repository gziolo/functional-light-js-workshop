// 1. Make a pure function `bar(..)` to wrap around `foo(..)`.

function bar( x, y ) {
	let z;

	foo( x );
	return [ y, z ];

	function foo( x ) {
		y ++;
		z = x * y;
	}
}

console.log( bar( 20, 5 ) );		// [ 6, 120 ]
console.log( bar( 25, 6 ) );		// [ 7, 175 ]

// 2. Make a pure function `bar(..)` to wrap around `foo(..)`. Use state rollback technique.

function foo( x ) {
	y ++;
	z = x * y;
}

let y = 5, z;

function barStateRollback( x, yInitial, zInitial ) {
	const state = [ y, z ];

	[ y, z ] = [ yInitial, zInitial ];

	foo( x );

	[ yInitial, zInitial ] = [ y, z ];

	[ y, z ] = state;

	return [ yInitial, zInitial ];
}

console.log( barStateRollback( 20, 5 ) );		// [ 6, 120 ]
console.log( barStateRollback( 25, 6 ) );		// [ 7, 175 ]
console.log( y, z ); // 5, undefined

// 3. Use compose with 3 different functions.

function compose( fn3, fn2, fn1 ) {
	return function( input ) {
		return fn3( fn2( fn1( input ) ) );
	}
}

function add2( x ) {
	return x + 2;
}

function double( x ) {
	return x * x;
}

function subtract5( x ) {
	return x - 5;
}

const doSomeComposeMagic = compose( add2, double, subtract5 );

console.log( doSomeComposeMagic( 6 ) ); // 3
console.log( doSomeComposeMagic( 10 ) ); // 27
console.log( doSomeComposeMagic( 20 ) ); // 227

// 4. Use pipe with the same functions as in (3).

function pipe( fn1, fn2, fn3 ) {
	return function( input ) {
		return fn3( fn2( fn1( input ) ) );
	}
}
const doSomePipeMagic = pipe( subtract5, double, add2 );

console.log( doSomePipeMagic( 6 ) ); // 3
console.log( doSomePipeMagic( 10 ) ); // 27
console.log( doSomePipeMagic( 20 ) ); // 227
