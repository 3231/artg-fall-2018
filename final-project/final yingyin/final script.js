const W = d3.select('.plot').node().clientWidth;
const H = d3.select('.plot').node().clientHeight;
const margin = {t:80, r:80, b:80, l:80};
const w = W - margin.l - margin.r;
const h = H - margin.t - margin.b;

const plot = d3.select('.plot')
    .append('svg')
    .attr('width',W)
    .attr('height',H)
    .append('g')
    .attr('transform', `translate(${margin.l}, ${margin.t})`);

const dataPromise = d3.csv('../data/data-aggregated.csv', parseData)
.then(function(rows){ 
    return rows.reduce(function(acc,val){return acc.concat(val)}, []); 
});
const metadataPromise = d3.csv('../data/countries-metadata.csv', parseMetadata);
const geojsonPromise = d3.json('../data/countries.geojson');

Promise.all([dataPromise, metadataPromise, geojsonPromise])
    .then(function([data, metadata, geojson]){

// hierarchy
const dataByYearByCountry = d3.nest()
    .key(function(d){ return d.year })
    .key(function(d){ return d.countryCode })
    .entries(data);
//Pick one year
const dataByCountry2000 = dataByYearByCountry
    .filter(function(d){ return d.key === "2000" })[0]
    .values;


const nodesData = dataByCountry2000.map(function(country){

const key = country.key; 
const indicators = country.values; //array 47

const output = {};
    output.key = key;
    indicators.forEach(function(indicator){
    output[indicator.series] = indicator.value;
});

    return output;
});
console.log(nodesData);
drawChart(nodesData, plot)
lineChart(nodesData, chart)
});


d3.select('#Year2000').on('click', function(){
d3.event.preventDefault();
console.log('Show Year2000')
}); 

function drawChart(data, Selection){

const POP_INDICATOR_NAME = 'Population, total';
const RUR_POP_INDICATOR_NAME = 'Rural population';
const GDP_PER_CAP_INDICATOR_NAME = 'GDP per capita (constant 2010 US$)';

//Draw Selection, based on dataPromise
const popExtent = d3.extent(data, function(d){ return d[POP_INDICATOR_NAME]});
const gdpPerCapExtent = d3.extent(data, function(d){ return d[GDP_PER_CAP_INDICATOR_NAME]});
const rurPopExtent = d3.extent(data, function(d){ return d[RUR_POP_INDICATOR_NAME]});

//Scale
const scaleX = d3.scaleLog().domain(gdpPerCapExtent ).range([0,w]);
const scaleY = d3.scaleLinear().domain(rurPopExtent).range([h,0]);
const scaleSize = d3.scaleSqrt().domain(popExtent).range([5,60]);


//enter exit update
const nodes = plot.selectAll('.country-node')
    .data(data, function(d){ return d.key });

const nodesEnter = nodes.enter()
    .append('g').attr('class','country-node');
    nodesEnter.append('circle');
    nodesEnter.append('text');

    //UPDATE + ENTER
    nodes.merge(nodesEnter)
        .attr('transform', function(d){
            const x = scaleX(d[GDP_PER_CAP_INDICATOR_NAME]);
            const y = scaleY(d[RUR_POP_INDICATOR_NAME]);
            return `translate(${x}, ${y})`;
        })
        .select('circle')
        .attr('r', function(d){ return scaleSize(d[POP_INDICATOR_NAME]) })
        .style('fill-opacity', .2)
        .style('stroke', '#333')
        .style('stroke-width', '2px')
        .style('fill','lightblue');
    nodes.merge(nodesEnter)
        .select('text')
        .text(function(d){ return d.key })
        .attr('text-anchor','middle')
        .style('font-size', '10px');

//axes
const axisX = d3.axisTop()
    .scale(scaleX)
const axisY = d3.axisLeft()
    .scale(scaleY)
const axisXNode = plot.append('g')
    .attr('class', 'axis axis-x')
    .attr('transform', `translate(0, ${h})`)
    .call(axisX);

const axisYNode = plot.append('g')
    .attr('class', 'axis axis-y')
    .call(axisY);
}





const W = d3.select('.chart').node().clientWidth;
const H = d3.select('.chart').node().clientHeight;
const margin = {t:80, r:80, b:80, l:80};
const w = W - margin.l - margin.r;
const h = H - margin.t - margin.b;

const plot = d3.select('.chart')
    .append('svg')
    .attr('width',W)
    .attr('height',H)
    .append('g')
    .attr('transform', `translate(${margin.l}, ${margin.t})`);


function drawLineChart(data, selection){

const POP_INDICATOR_NAME = 'Population, total';

const popExtent = d3.extent(data, function(d){ return d[POP_INDICATOR_NAME]});

const scaleX = d3.scaleLinear().domain([2000, 2011]).range([0,w]);
const scaleY = d3.scaleLinear().domain([popExtent]).range([h,0]);

//line
const line = d3.line()
    .x(function(d){ return scaleX(d.year) })
    .y(function(d){ return scaleY(d.value) });

//enter, exit, update
const paths = plot.selectAll('.country-line')
    .data(data, function(d){ return d.key });

const pathsEnter = paths.enter()
    .append('path').attr('class', 'country-line')

    paths.merge(pathsEnter)
        .transition()
        .attr('d', function(d){
            return line(d.values);
        })
        .style('fill', 'none')
        .style('stroke-width','3px')
        .style('stroke', '#333')
        .style('fill','lightgreen')
        .style('stroke-opacity', .3);

//axes
const axisX = d3.axisBottom()
        .scale(scaleX)
        .tickSize(-h);
const axisY = d3.axisLeft()
        .scale(scaleY)
        .tickSize(-w);
    axisXNode.attr('transform',`translate(0, ${h})`)
        .transition()
        .call(axisX);
    axisYNode
        .transition()
        .call(axisY);

}



function parseData(d){

    const country = d['Country Name'];
    const countryCode = d['Country Code'];
    const series = d['Series Name'];
    const seriesCode = d['Series Code'];

    delete d['Country Name'];
    delete d['Country Code'];
    delete d['Series Name'];
    delete d['Series Code'];

    const records = [];

    for(key in d){
        records.push({
            country:country,
            countryCode:countryCode,
            series:series,
            seriesCode:seriesCode,
            year:+key.split(' ')[0],
            value:d[key]==='..'?null:+d[key]
        })
    }

    return records;

}

function parseMetadata(d){

    //Minimal parsing required; return data as is
    return d;

}
git add.
git commit -m "https://github.com/3231/yingyin-demostation.git"
git push origin master</pre>





