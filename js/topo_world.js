function generateMap(){
    var width = 1800,
        height = 2200;
    
    var projection = d3.geo.equirectangular()
        .scale(175),
        color = d3.scale.category20();

        var path = d3.geo.path()
            .projection(projection);
    
    var svg = d3.select("#map").append("svg")
        .attr("width", width)
        .attr("height", height);

    d3.json("data/world_countries_topo.json", function(error, topology) {
        var countries = topojson.feature(topology, topology.objects.countries).features,
            neighbors = topojson.neighbors(topology.objects.countries.geometries);
        
        svg.selectAll(".countries")
            .data(countries)
            .enter().append("path")
            .attr("class", "country")
            .attr("d", path)
            .style("fill", function(d, i) { 
                return color(d.color = d3.max(neighbors[i], function(n) { 
                    return countries[n].color;
                }) + 1 | 0);
            })
            
            .append("title")
            .text(function(d) { return d.properties.name; });
            
            
            
         
            
            /*svg.selectAll(".country-label")
            .data(topojson.feature(topology, topology.objects.countries).features)
            .enter().append("text")
            .attr("class", "country-label")
            .attr("transform", function(d) { return "translate(" + projection(d.geometry.coordinates) + ")"; })
            .attr("dy", ".35em")
            .text(function(d) { return d.properties.name; })
            .attr("x", function(d) { return d.geometry.coordinates[0] > -1 ? 6 : -6; })
            .style("text-anchor", function(d) { return d.geometry.coordinates[0] > -1 ? "start" : "end"; });*/
    });
    
};

generateMap();
