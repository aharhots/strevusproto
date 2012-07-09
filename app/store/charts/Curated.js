Ext.define("Strevusproto.store.charts.Curated", {
    extend: "Ext.data.Store",
    alias: 'store.curated',
    config: {
        model: "Strevusproto.model.charts.CountryIndicator",
        data: [
            {alias: "US Energy Usage", countryId: "USA", indicatorId: "EG.USE.COMM.KT.OE", unit: "Kt of oil equivalent"},
            {alias: "Korean Tech Exports", countryId: "KOR", indicatorId: "TX.VAL.TECH.CD", unit: "Current US$"},
            {alias: "Chinese Rail Usage", countryId: "CHN", indicatorId: "IS.RRS.PASG.KM", unit: "Million-passenger-km"},
            {alias: "Greek National Balance", countryId: "GRC", indicatorId: "BN.CAB.XOKA.GD.ZS", unit: "% of GDP"},
            {alias: "Indian Urban Population", countryId: "IND", indicatorId: "SP.URB.TOTL.IN.ZS", unit: "% of total population"},
            {alias: "Ukrainian Tractor Population", countryId: "UKR", indicatorId: "AG.AGR.TRAC.NO", unit: "Tractors"}
        ]}
});