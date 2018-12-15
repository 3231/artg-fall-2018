console.log('Assignment 3');

/*
 * Question 1: no code necessary, 
 * but feel free to use this space as a Javascript sandbox to check your answers
 */

/*
 * Question 2: control structures 
 */

	//2.1 
	/* YOUR CODE HERE*/
for (var i = 0; i<10; i++){
	console.log(10-i);
}

	//2.2
	/* YOUR CODE HERE*/
	for(let i=0; i<500; i++){
		console.log(500-i);
	}


	//2.3
	
	//Log out the content of this array using a for loop
	/* YOUR CODE HERE*/
const arr = [89, 23, 88, 54, 90, 0, 10];
for (let i=0; i<arr.length; i++){
	console.log(arr[i]);
}


/*
 * Question 3: no code necessary
 */

/*
 * Question 4: objects and arrays
 */

{
	//4.1
	 /* YOUR CODE HERE */
	const instructor = {
		name : ' Ashley',
		department : 'computer science',
		Tenure: 10

	};
	//get
	console.log(instructor.name);

	const instructor1 = {
		name : 'Ben',
		department : 'design',
		Tenure : 2
	};

	const instructor2= {
		name = 'Carol'
		department : 'design',
		Tenure : 3
	};
console.log(' ' + 'name' );
	//4.2 
	/* COMPLETE THE FUNCTION */
	function computeAvgTenure(list){
		let totalTenure=0;
		let avg=0;
		for (let i=0; i<list.length; i++){
			totalTenure += list[i].tenure;
	}
	avg= totalTenure/list.lenght
		return avg;
	}

	//4.3
	/* YOUR CODE HERE */
	instructors.push {
		name;'Dan',
		department: 'humanities',
		Tenure : 5

    }

}

