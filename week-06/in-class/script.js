const W = d3.select('.plot').node().clientWidth;
const H = d3.select('.plot').node().clientHeight;
const margin = {t:50, r:50, b:50, l:50};
const w = W - margin.l - margin.r;
const h = H - margin.t - margin.b;

//Data import and parse
const data = d3.csv('../../data/nyc_permits.csv', parse);

data.then(function(rows){

	//Data discovery
	console.log(rows.length);
	//Boroughs
	const permitsByBorough = d3.nest()
		.key(function(d){ return d.borough })
		.entries(rows);
	permitsByBorough.forEach(function(x){
		console.log(x);
	});
	//Address
	const permitsByAddress = d3.nest()
		.key(function(d){ return d.address })
		.entries(rows);
	console.log(permitsByAddress);

    	//cost
	const costMin = d3.min(rows, function(d){ return d.cost_estimate });
	const costMax = d3.max(rows, function(d){ return d.cost_estimate });
	const costAvg = d3.mean(rows, function(d){ return d.cost_estimate });
	const costMedian = d3.median(rows, function(d){ return d.cost_estimate });
	console.group('Cost');
	console.log(costMin)
	console.log(costMax)
	console.log(costAvg)
	console.log(costMedian)
	console.groupEnd();
	//Square footage
	const sqftAccessor = function(d){ return d.square_footage };
	const sqftMin = d3.min(rows, sqftAccessor);
	const sqftMax = d3.max(rows, sqftAccessor);
	const sqftAvg = d3.mean(rows, sqftAccessor);
	const sqftMedian = d3.median(rows, sqftAccessor);
	const zeroSqft = rows.filter(function(d){return d.square_footage === 0})
	console.group('Sqft')
	console.log(sqftMin, sqftMax)
	console.log(sqftAvg)
	console.log(sqftMedian)
	console.log(zeroSqft.length)
	console.groupEnd()

	//sqft
	const scaleX = d3.scaleLog()
		.domain([1,sqftMax])
		.range([0, w]);

	//cost
	const scaleY = d3.scaleLog()
		.domain([1, costMax])
		.range([h, 0]);

	//Append DOM
	const plot1 = d3.select('#plot-1')
		.append('svg')
		.attr('width', W)
		.attr('height', H)
		.append('g')
		.attr('transform', `translate(${margin.l}, ${margin.t})`);

	const plot2 = d3.select('#plot-2')
		.append('svg')
		.attr('width', W)
		.attr('height', H)
		.append('g')
		.attr('transform', `translate(${margin.l}, ${margin.t})`);

	draw(plot1, rows, scaleX, scaleY);
	draw(plot2, rows, scaleX, scaleY);
	


	// rows.forEach(function(d){
	// 	const x = scaleX(d.square_footage);
	// 	const y = scaleY(d.cost_estimate);

	// 	plot1.append('circle')
	// 		.attr('cx', x)
	// 		.attr('cy', y)
	// 		.attr('r', 3)
	// 		.style('fill-opacity', 0.2);
	// });
	
});

function draw(selection, data, sX, sY){

	//draw function will take data and draw scatterplot under selection
	// data.forEach(function(d){
	// 	const x = sX(d.square_footage);
	// 	const y = sY(d.cost_estimate);

	// 	selection.append('circle')
	// 		.attr('cx', x)
	// 		.attr('cy', y)
	// 		.attr('r', 3)
	// 		.style('fill-opacity', 0.2);
	// });

	selection.selectAll('circle')
		.data(data)
		.enter()
		.append('circle')
		.attr('cx', function(d){ return sX(d.square_footage) })
		.attr('cy', function(d){ return sY(d.cost_estimate) })
		.attr('r', 1)
		.style('fill-opacity', 0.7);


}





function parse(d){
	return {
		applicant_business_name:d.applicant_business_name,
		borough:d.borough,
		community_board:d.community_board,
		cost_estimate:+d.cost_estimate, //convert string to number
		enlargement:d.enlargement_flag_yes_no === "true"?true:false, //convert string to boolean
		address: `${d.job_location_house_number} ${d.job_location_street_name}`,
		job_number:+d.job_number,
		job_type:d.job_type,
		job_type2:d.job_type2,
		permit_type:d.permit_type,
		permit_issuance_date:new Date(d.permit_issuance_date),
		square_footage:+d.square_footage
	}
}
	
