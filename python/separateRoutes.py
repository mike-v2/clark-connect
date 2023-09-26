import json
import csv

coords_file = 'public/json/cTranRoutesConverted.json'
metadata_file = 'public/json/routes.txt'
output_coords_file = 'public/json/cTranRoutes.json'

with open(coords_file, 'r') as geojson_file:
    geojson_data = json.load(geojson_file)

metadata_dict = {}
with open(metadata_file, 'r') as metadata_file:
    csv_reader = csv.reader(metadata_file)
    next(csv_reader)  # skip the header
    for i, row in enumerate(csv_reader):
        metadata_dict[i] = {
            'route_long_name': row[0],
            'route_color': row[3]
        }

for i, feature in enumerate(geojson_data['features']):
    feature['properties'] = {
        'route_long_name': metadata_dict[i]['route_long_name'],
        'route_color': metadata_dict[i]['route_color']
    }

with open(output_coords_file, 'w') as updated_geojson_file:
    json.dump(geojson_data, updated_geojson_file, indent=4)

print("GeoJSON updated successfully!")
