import json
from pyproj import Transformer

def reproject_geojson(input_file, output_file):
    with open(input_file, 'r') as f:
        data = json.load(f)

    # Identify the source CRS and target CRS
    # might need to adjust the 'epsg' codes based on the actual source and target
    transformer = Transformer.from_crs("EPSG:2927", "EPSG:4326")  # 2927 is for Washington North, might need adjustment

    for feature in data['features']:
        coords = feature['geometry']['coordinates']
        for segment in coords:
            for i, (x, y) in enumerate(segment):
                lon, lat = transformer.transform(x, y)
                segment[i] = [lat, lon]

    with open(output_file, 'w') as f:
        json.dump(data, f)

reproject_geojson('public/json/cTranRoutes.json', 'public/json/cTranRoutesConverted.json')
