// sSetting everything up when the webpage loads:

// Function to initialize the data visualization
function init() {
    var selector = d3.select("#selDataset");  //This selects the HTML element with the ID selDataset

    // Retrieving the JSON data ( This line loads data from a JSON file located at the given URL)
    d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
        var sampleNames = data.names;

        //This is the JS loop that goes through each sample name and adds it as an option in the dropdown menu (selector).
        sampleNames.forEach((sample) => {
            selector
                .append("option")
                .text(sample)
                .property("value", sample);
        });

        // Using the first sample from the list to build the initial plots and metadata... the line below selects the first sample from the list and uses it to build initial charts and display metadata.
        const firstSample = sampleNames[0];
        buildCharts(firstSample);
        buildMetadata(firstSample);
    });
}

// Function to build the charts
function buildCharts(sample) {
    d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
        var samples = data.samples;
        var resultArray = samples.filter(sampleObj => sampleObj.id === sample); // This code filters the data to find the one that matches the selected sample ID
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var sample_values = result.sample_values;
        var otu_labels = result.otu_labels;

        // Building a Bar Chart
        var barData = [{
            y: otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
            x: sample_values.slice(0, 10).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            type: 'bar',
            orientation: 'h',
        }];

        var barLayout = {
            title: 'Top 10 OTUs Found in Individual',
            margin: { t: 30, l: 150 }
        };

        Plotly.newPlot('bar', barData, barLayout);

        // Building the Bubble Chart
        var bubbleData = [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: 'Earth'
            }
        }];

        var bubbleLayout = {
            title: 'Bacteria Cultures Per Sample',
            hovermode: 'closest',
            xaxis: { title: 'OTU ID' },
            margin: { t: 30 }
        };

        Plotly.newPlot('bubble', bubbleData, bubbleLayout);
    });
}

// Function to build the metadata based on the selected sample
function buildMetadata(sample) {
    d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
        var metadataArray = data.metadata;
        var result = metadataArray.filter(sampleObj => sampleObj.id == sample)[0];

        var PANEL = d3.select("#sample-metadata");

        // Clearing existing metadata
        PANEL.html("");

        // Addng each key-value pair to the panel
        Object.entries(result).forEach(([key, value]) => {
            PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });
    });
}

// Function to handle the change event when a new sample is selected
//his  is used whenever a new sample is selected from the dropdown
function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
}

// Initialize the dashboard
init();
