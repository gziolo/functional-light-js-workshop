// 1. Write two functions, each which return a different number value when called.

function foo() {
	return 3;
}

function bar() {
	return 5;
}

// 2. Write an `add(..)` function that takes two numbers and adds them and returns the result. Call `add(..)` with the results of your two functions from (1) and print the result to the console.

function add( a, b ) {
	return a + b;
}

console.log( add( foo(), bar() ) ); // 8

// 3. Write an `add2(..)` that takes two functions instead of two numbers, and it calls those two functions and then sends those values to `add(..)`, just like you did in (2) above.

function add2( fnA, fnB ) {
	return fnA() + fnB();
}

console.log( add2( foo, bar ) ); // 8

// 4. Replace your two functions from (1) with a single function that takes a value and returns a function back, where the returned function will return the value when it's called.

function identity( value ) {
	return function() {
		return value;
	}
}

foo = identity( 3 );
bar = identity( 5 );

// 5. Write an `addn(..)` that can take an array of 2 or more functions, and using only `add2(..)`, adds them together. Try it with a loop. Try it without a loop (recursion). Try it with built-in array functional helpers (map/reduce).

function addnLoop( fns ) {
	const length = fns.length;
	let result = 0;

	for ( let i = 0; i < length; i ++ ) {
		result = add2( identity( result ), fns[ i ] );
	}

	return result;
}

console.log( addnLoop( [ foo, bar, identity( 7 ) ] ) ); // 15

function addnRecursion( [ result, fn, ...fns ] ) {
	result = add2( result, fn );
	if ( fns.length === 0 ) {
		return result;
	}

	return addnRecursion( [ identity( result ), ...fns ] );
}

console.log( addnRecursion( [ foo, bar, identity( 7 ) ] ) ); // 15

function addnReduce( fns ) {
	return fns.reduce( function( fn0, fn1 ) {
		return identity( add2( fn0, fn1 ) );
	} )();
}

console.log( addnReduce( [ foo, bar, identity( 7 ) ] ) ); // 15

// 6. Start with an array of odd and even numbers (with some duplicates), and trim it down to only have unique values.

const input = [ 2, 3, 5, 7, 12, 18, 2, 12, 2 ];

function addUniqueValue( result, value ) {
	if ( result.includes( value ) ) {
		return result;
	}
	return result.concat( [ value ] );
}

console.log(
	input.reduce( addUniqueValue, [] )
); // [ 2, 3, 5, 7, 12, 18 ]

// 7. Filter your array to only have even numbers in it.

function isEven( value ) {
	return value % 2 === 0;
}

console.log(
	input.reduce( addUniqueValue, [] )
		.filter( isEven )
); // [ 2, 12, 18 ]

// 8. Map your values to functions, using (4), and pass the new list of functions to the `addn(..)` from (5).

console.log(
	addnReduce(
		input.reduce( addUniqueValue, [] )
			.filter( isEven )
			.map( identity )
	)
); // 32
