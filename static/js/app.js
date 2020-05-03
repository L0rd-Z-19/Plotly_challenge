fetch("http://l0rd-z-19.github.io/jsonStorage/samples.json")
    .then(function(resp){
        return resp.json();
    })
    .then(function(json){
        samples = json["samples"];
        console.log(samples[0]);
        console.log("OTU {i}".replace("{i}",samples[0].otu_ids.slice(0,10)));
        var top = samples[0].otu_ids.slice(0,10);
        var labels = [];
        for(i = 0; i < 10; i++){
            labels.push("OTU {i}".replace("{i}",top[i]));
        }



        var barDrp = {
            x: samples[0].sample_values,
            transforms: [{
                type: 'sort',
                target: 'x',
                order: 'ascending'}],
            y: labels,
            type: "bar",
            orientation:"h"
        };
        var data = [barDrp];
        Plotly.newPlot("plot", data);
          



























}); 

