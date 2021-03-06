// 1. Turn `mult(..)` into a recursive function that can work on as many arguments (2 or more) as necessary.

function mult( result, number, ...numbers ) {
	result *= number;
	if ( numbers.length === 0 ) {
		return result;
	}

	return mult( result, ...numbers );
}

console.log( mult( 3, 4, 5 ) );	// 60

console.log( mult( 3, 4, 5, 6 ) );	// 360
