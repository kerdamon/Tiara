import json


main_data = '/home/ppjotrek/Python/hackyeah24/ml/data/input/ela_full.json'
agh_descriptions = '/home/ppjotrek/Python/hackyeah24/ml/data/input/agh.json'
perspektywy_rankings = '/home/ppjotrek/Python/hackyeah24/ml/data/input/perspektywy.json'

target = '/home/ppjotrek/Python/hackyeah24/ml/data/input/ela_full_merged.json'

with open(main_data, 'r') as f:
    main_data = json.load(f)
    
with open(agh_descriptions, 'r') as f:
    agh_descriptions = json.load(f)
    
with open(perspektywy_rankings, 'r') as f:
    perspektywy_rankings = json.load(f)
    
for field in main_data:
    if main_data[field]['institutionName'] == 'Akademia Górniczo-Hutnicza im. Stanisława Staszica w Krakowie':
        try:
            main_data[field]['description'] = agh_descriptions[main_data[field]['majorName']]
            #print(main_data[field]['description'])
        except KeyError:
            main_data[field]['description'] = "Tu powinien być opis ze strony uczelni"
            
        try:
            main_data[field]['ranking'] = int(perspektywy_rankings[main_data[field]['majorName']]['Akademia Górniczo-Hutnicza im. Stanisława Staszica w Krakowie'])
            #print(main_data[field]['ranking']['Akademia Górniczo-Hutnicza im. Stanisława Staszica w Krakowie'])
        except KeyError:
            main_data[field]['ranking'] = -1
            
    else:
        main_data[field]['description'] = "Tu powinien być opis ze strony uczelni"
        main_data[field]['ranking'] = -1
            
with open(target, 'w', encoding='utf8') as f:
    f.write(json.dumps(main_data, ensure_ascii=False, indent=2) + '\n')
        