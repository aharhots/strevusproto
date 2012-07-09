Ext.define("Strevusproto.model.charts.Country", {
    extend: "Ext.data.Model",
    config: {
        fields: [
            {name: "id", type: "string"},
            {name: "iso2Code", type: "string"},
            {name: "name", type: "string"},
            {name: "capitalCity", type: "string"},
            {name: "longitude", type: "string"},
            {name: "latitude", type: "string"},
            {name: "incomeLevel", type: "string", convert: function (value) {
                return value.value;
            }},
            {name: "lendingType", type: "string", convert: function (value) {
                return value.value;
            }}
        ]
    }
});