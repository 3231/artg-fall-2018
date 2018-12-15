console.log('Assignment 4');
console.log(d3);

//Append a <svg> element to .chart, and set its width and height attribute to be the same as .chart
//Hint: first, you have to find the width and height of .chart. See example for width below
const width = d3.select('.chart')
const height = 0; /* YOUR CODE HERE */


d3.selectAll('.chart')
.style('height', 600)
.style('width', 900)
.style('border', '3px solid black')



//In #container-4, draw a chromatic scale
    //this function takes one element from the selection at a time, and do something with


    
    //this function takes one element from the selection at a time, and do something with

//Then append the following elements under <svg

const plot = d3.selectAll('.chart')

     .append('svg')
     .attr('width', 600)
     .attr('height',600)

     plot.append('circle')
        .attr('cx',60)
        .attr('cy',60)
        .attr('r',50)
        .style('fill','orange')

     plot.append('circle')
         .attr('r',80)
         .style('fill', 'white')

     plot.append('rect')
         .attr('x', 500)
         .attr('y', 200)
         .attr('width', 50)
         .attr('height', 70)
         .style('fill', 'rgb(50,50,50)')
    


for(let x=0; x<width; x+=30){
    plot.append('line')
        .attr('x1', x)
        .attr('y1', 0)
        .attr('y2', x)
        .attr('y2', height)
        .style('stroke-width', 2)
        .style('fill','rgb(50,50,50)')
}

for(let y=0; y<height; y +=30){
    plot.append('line')
        .attr('x1', 0)
        .attr('y1', y)
        .attr('y2', y)
        .attr('x2', width)
        .style('stroke-width', 2)
        .style('fill', 'rgb(50,50,50)')
}
    
         
    console.log('svg')
    console.log('circle')
    console.log('chart')
    console.log('line')

    d3.selectAll('circle')
    .transition()
    .duration(5000)
    .attr('r', 500)

//Hint: use a loop to do this
     
//Circle, radius 50px, center located at (50,50)

//Another circle, radius 75px, center located at (300,200)
//Do this without setting the "cx" and "cy" attributes


//A rectangle, offset from the left edge by 400px and anchored to the bottom
//with a width of 50px and a height of 70px

//Label the centers of the two circles with their respective coordinates

//Give the <rect> element a fill of rgb(50,50,50), and no stroke
//Do this without using CSS

//Give the two <circle> elements no fill, and a 2px blue outline
//Do this by giving them a class name and applying the correct CSS

//Uncomment the following block of code, and see what happens. Can you make sense of it?
/*d3.selectAll('circle')
	.transition()
	.duration(3000)
	.attr('r', 200);*/