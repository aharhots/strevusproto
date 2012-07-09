Ext.define("Strevusproto.model.charts.Topic", {
    extend: "Ext.data.Model",
    config: {
        fields: [
            {name: "id", type: "string"},
            {name: "value", type: "string"},
            {name: "sourceNote", type: "string"}
        ]
    }
});