This project utilizes the D3 library to dynamically read in data from `samples.json` via a provided URL, focusing on the visualization of microbial species (OTUs) found in individual samples. It features a horizontal bar chart that integrates a dropdown menu to showcase the top 10 OTUs present in selected individuals. For this bar chart, `sample_values` represent the bar lengths, otu_ids serve as the bar labels, and `otu_labels` provide detailed hovertext. Complementarily, a bubble chart is constructed to display each sample more comprehensively: `otu_ids` are plotted along the x-axis, `sample_values` determine both the y-axis positioning and marker size, with the same `otu_ids` coloring the markers, and `otu_labels` offering explanatory text for each data point. 










