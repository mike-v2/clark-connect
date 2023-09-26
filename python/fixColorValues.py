import json

input_file = 'public/json/cTranRoutes.json'
output_file = 'public/json/cTranRoutesHexColors.json'

with open(input_file, 'r') as f:
    data = json.load(f)

for feature in data['features']:
    orig_color = feature['properties']['route_color']
    feature['properties']['route_color'] = '#' + orig_color

with open(output_file, 'w') as f:
    json.dump(data, f, indent=4)

print("GeoJSON updated successfully!")
