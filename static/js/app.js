fetch("http://l0rd-z-19.github.io/jsonStorage/samples.json")
    .then(function(resp){
        return resp.json();
    })
    .then(function(json){
        var metadata = json["metadata"];  
        var samples = json["samples"];
        var bellyBtn = 0;
        //create a blank value as a starter for dropdown
        selData = document.getElementById("selDataset");
        opt = document.createElement("option");
        opt.text = " ";
        selData.add(opt);
        //fill the dropdown values
        for(i=0; i < 152;i++){
            opt = document.createElement("option");
            opt.text = metadata[i]["id"];
            selData.add(opt);
        }
        //if the dropdown changes, update the page
        selData.addEventListener("change",function(){
            bellyBtn = selData.value - 940; 
            
            //left side bar chart
            var top = samples[bellyBtn].otu_ids.slice(0,10);
            var labels = [];
            for(i = 0; i < 10; i++){
                labels.push("OTU {i}".replace("{i}",top[i]));
            }
            var barDrp = {
                x: samples[bellyBtn].sample_values,
                transforms: [{
                    type: 'sort',
                    target: 'x',
                    order: 'ascending'}],
                y: labels,
                text: samples[bellyBtn].otu_labels,
                type: "bar",
                orientation:"h"
            };
            var layout = {
                width: 500
            }
            var data = [barDrp];
            Plotly.newPlot("left_bar", data,layout);
            
            //Bubble chart
            var bub = {
                x: samples[bellyBtn].otu_ids,
                y: samples[bellyBtn].sample_values,
                text: samples[bellyBtn].otu_labels,
                mode:'markers',
                marker:{size:samples[bellyBtn].sample_values, color:samples[bellyBtn].otu_ids}
            };
            var bubData = [bub];
            Plotly.newPlot("bubbles", bubData);

            //metadata and demographic information
            var pan = d3.select("#sample-metadata");
            keys = ["id","ethnicity","gender","age","location","Beaufort/NC","bbtype","wfreq"];
            for(i=0; i < 8;i++){
                row = pan.append('h5');
                var tex = "{key}: {value}".replace("{key}", keys[i])
                var texf = tex.replace("{value}", metadata[bellyBtn][keys[i]])
                row.text(texf);
            }
        });
}); 

