console.log('4-1');
console.log(d3);
//Selection exercise

d3.selectAll('.container')
.style('height', '500px')
.style('border', '1px solid black')
.style('margin', '20px');

const blocks = d3.selectAll('.container')
.select('.block'); 

blocks
.style('width', '400px')
.style('height', '400px')
.style('background', 'yellow')
//.attr('class', 'block-yellow block')
//.classed('block', true)

//Appending elements
const newSelection = blocks//selection
.append('div')//return a new selection
.classed('block-child', true)
.style('width', '50%')
.style('height','50%')
.style('background', 'red')


//In #container-4, draw a chromatic scale
d3.selectAll('container')//5
  .each(function(){
  	//this function takes one element from the selection at a time, and do something with
  	d3.select(this).style('background', 'red')
  })
  const NUM_OF_INCREMENT = 200
  for(let index = 0; index< NUM_OF_INCREMENT; index+=1){
  	d3.select('#container-4')
  		.append('div');
  }
  d3.select('#container-4')
    .selectAll('div')
    .each(function(d,index){
    	const R = 255;
    	const G = index/NUM_OF_INCREMENT*255;
    	const B = index/NUM_OF_INCREMENT*255;


    d3.select(this)
    .style('height', '100%')
    .style('width', 100/NUM_OF_INCREMENT + '%')
    .style('background','rgb('+ R +',' + G + ',' + B + ')')
})





//In #container-5, experiment with drawing <svg> elements
//circle, rect, line, text, <g>
const plot = d3.select ('#container-5')

     .append('svg')
     .attr('width', 500)
     .attr('height', 500)

     plot.append('circle')
        .attr('cx',300)
        .attr('cy',300)
        .attr('r',150)
        .style('fill','orange')

     plot.append('line')
         .attr('x1', 0)
         .attr('y1',0)
         .attr('x2',500)
         .attr('y2',700)
         .style('stroke-width','2px')
         .style('stroke', 'black')

         console.log('svg')

     
     //.attr9'transform', 'translate'(50,400)rotate(45)






