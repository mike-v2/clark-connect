import json

input_file_path = '../public/json/CtranRts.json'
output_file_path = '../public/json/cTranRoutes.json'

with open(input_file_path, 'r') as f:
    jsonData = json.load(f)
    
if jsonData['type'] == 'GeometryCollection':
    new_data = {
        'type': 'FeatureCollection',
        'features': []
    }

    for geometry in jsonData['geometries']:
        new_data['features'].append({
            'type': 'Feature',
            'geometry': geometry,
        })

    with open(output_file_path, 'w') as f:
        json.dump(new_data, f)

    print("Conversion successful!")
else:
    print("Provided GeoJSON is not of type GeometryCollection.")
        