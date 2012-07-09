Ext.define("Strevusproto.model.charts.Indicator", {
    extend: "Ext.data.Model",
    config: {
        fields: [
            {name: "id", type: "string"},
            {name: "name", type: "string"},
            {name: "source", type: "string"},
            {name: "sourceNote", type: "string"},
            {name: "sourceOrganization", type: "string"}
        ]
    }
});
