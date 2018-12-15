const W = d3.select('.plot').node().clientWidth;
const H = d3.select('.plot').node().clientHeight;
const margin = {t:50, r:50, b:50, l:50};
const w = W - margin.l - margin.r;
const h = H - margin.t - margin.b;



//Data import and parse
const data = d3.csv('../../data/nyc_permits.csv', parse);
data.then(function(rows){

	
console.log(rows.length);

//discover data(find costpersqft/ boroughs)
const perSqftMin = d3.min(rows, function(d){return d.cost_per_sqft});
const perSqftMax = d3.max(rows, function(d){return d.cost_per_sqft});
console.log(perSqftMin, perSqftMax);


const boroughs = d3.nest()
		.key(function(d){ return d.borough })
		.entries(rows)
		.map(function(d){ return d.key });
console.log(boroughs);



	//domain
const scaleX = d3.scaleLog()
		.domain([0,boroughs])
		.range([0, w]);
		

const scaleY = d3.scaleLog()
		.domain([perSqftMin, perSqftMax])
		.range([h, 0]);

//scale
const scalePerSqft = d3.scaleLog().range([h, 0]);
const scaleBoroughs = d3.scaleOrdinal().range(d3.range(boroughs.length).map(function(d){
	 return(w-100)/(boroughs.length-1)*d+50;

}));





 //append svg/g
 const plot = d3.select('.plot')
	.append('svg')
	.attr('width', w +margin.l + margin.r)
	.attr('height', h + margin.t + margin.b)
	.append('g')
	.attr('transform', `translate(${margin.l}, ${margin.t})`);

	//g
plot.append('g')
	.attr('class', 'axis-y');
plot.append('g')
	.attr('class', 'axis-x')
	.attr('transform', `translate(0, ${h})`);

	//xyaxis
const axisY = d3.axisLeft()
		.scale(scalePerSqft)
		.tickSize(-w);

const axisX = d3.axisBottom()
		.scale(scaleBoroughs);

	plot.select('.axis-y')
		.transition()
		.call(axisY)
		.selectAll('line')
		.style('stroke-opacity', 0.2);


	plot.select('.axis-x')
		.transition()
		.call(axisX);
		
draw(plot, rows, scaleX, scaleY);


	
});
//draw
function draw(selection, data, sX, sY){

	selection.selectAll('circle')
		.data(data)
		.enter()
		.append('circle')
		.attr('cx', function(d){ return sX(d.boroughs) })
		.attr('cy', function(d){ return sY(d.cost_per_sqft) })
		.attr('r', 5)
		.style('fill-opacity', 0.2);

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
		square_footage:+d.square_footage,
		cost_per_sqft: +d.cost_estimate / +d.square_footage
	}
}
