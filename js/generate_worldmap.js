function generateMap(){
    var width = 1200,
        height = 1600;
    
    var projection = d3.geo.equirectangular();

        var path = d3.geo.path()
            .projection(projection);
    
    var svg = d3.select("#map").append("svg")
        .attr("width", width)
        .attr("height", height);

    d3.json("data/topoworld.json", function(error, topology) {
        
        svg.selectAll(".topoworld")
            .data(topojson.feature(topology, topology.objects.topoworld).features)
            .enter().append("path")
            .attr("class", "country")
            .attr("d", path);
            
        });
}

generateMap();
