import json
import requests
import os

def get_page_data(offset):
    page_template = 'https://ela.nauka.gov.pl/sla-server/v6.0/major/filterList?experience=ALL&graduationYear=2022&major=&institution=&studyVoivodeship=&studyForm=&studyLevel=&limit=10&offset=' + str(offset) + '&lang=pl'
    return requests.get(page_template)


def get_ela_data():
    
    start_offset = 0
    end_offset = 10
    
    target_json = '/home/ppjotrek/Python/hackyeah24/ml/data/input/ela_data.json'
    # with open(target_json, 'a') as f:
    #             f.write('{\n')
    
    output_dict = {}
    for offset in range(start_offset, end_offset, 10):
        response = get_page_data(offset)
        data = json.loads(response.text)
        for data_item in data['data']:
            row_id = data_item['major']['majorExternalCode']
            output_dict[row_id] = {
                'majorExternalCode': data_item['major']['majorExternalCode'],
                'majorName': data_item['major']['name'],
                'institutionName': data_item['institution'],
                'studyField': data_item['major']['studyField'],
                'studyLevel': data_item['major']['studyLevel'],
                'voivodeship': data_item['major']['voivodeship'],
                'studyForm': data_item['major']['studyFrom'],
                'studyProfile': data_item['major']['studyProfile'],
                'semesters': data_item['major']['semesters'],
                'faculty': data_item['major']['faculty'],
                'numberOfGraduates': data_item['major']['majorData']['graduatesNumber'],
                'employmentData': {
                    'salary': data_item['major']['majorData']['totalSalary'],
                    'timeOfLookingForJob': data_item['major']['majorData']['timeOfLookingForJob'],
                }
            }
                
    # with open(target_json, 'a') as f:
    #             f.write('}')
    with open(target_json, 'a', encoding='utf8') as f:
        f.write(json.dumps(output_dict, ensure_ascii=False, indent=4) + ',\n')  
            
if __name__ == '__main__':
    get_ela_data()