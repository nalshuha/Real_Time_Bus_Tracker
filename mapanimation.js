    L.mapbox.accessToken = 'pk.eyJ1IjoibmFsc2h1aGEiLCJhIjoiY2t5OW95eXgyMDhobDJ3cGRhejR5ZGc3aSJ9.0lZX6X7nIYQTzpTSscc9sQ';
        const map = L.mapbox.map('map').setView([42.365554, -71.104081], 12).addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));

        const markers = new L.MarkerClusterGroup();
        const title = "MIT";
        const marker = L.marker(
            new L.LatLng(42.357575,-71.092761),
            {icon:L.mapbox.marker.icon({
                    'marker-symbol':'school',
                    'marker-color': '0044FF'}),
                    title: title
                }
        );
        marker.bindPopup(title);
        markers.addLayer(marker);
        map.addLayer(markers);
        


    async function run(){
        const locations = await getBusLocations();
        const length = locations.length;
        map.removeLayer(markers);
        markers.clearLayers();
        for(let i=0;i<length;i++){
            const attribute=locations[i].attributes
             const title = attribute.label;
             const marker = L.marker(
                new L.LatLng(attribute.latitude,attribute.longitude),
                {icon:L.mapbox.marker.icon({
                    'marker-symbol':'bus',
                    'marker-color': '0044FF'}),
                    title: title
                });
                marker.bindPopup(title);
                markers.addLayer(marker);
        }
        map.addLayer(markers);
        console.log(new Date());
        console.log(locations);


        setTimeout(run, 15000);
    }

async function getBusLocations(){
    const url ="https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip";
    const response = await fetch(url);
    const json = await response.json();
    return json.data;
}

run();