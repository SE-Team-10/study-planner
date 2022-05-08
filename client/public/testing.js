function img(data) {


	// create a data tree
	var treeData = anychart.data.tree(data, "as-tree");

	// create a chart
	var chart = anychart.ganttProject();

	// set the data
	chart.data(treeData);
	// configure the scale
	chart.getTimeline().scale().maximum(Date.UTC(2022, 6, 30));
	// set the container id
	chart.container("container");
	// initiate drawing the chart
	chart.draw();
	// fit elements to the width of the timeline
	chart.fitAll();

	return data;
}
