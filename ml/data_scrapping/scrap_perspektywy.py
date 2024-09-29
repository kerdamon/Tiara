from selenium import webdriver
from selenium.webdriver.common.by import By
import json



techniczne = ["Automatyka i robotyka", "Architektura", "Biotechnologia", "Budownictwo", "Elektronika i telekomunikacja", "Elektrotechnika", "Energetyka", "Fizyka techniczna", "Geodezja i kartografia", "Górnictwo i geologia", "Mechanika i budowa maszyn", "Informatyka", "Inżynieria biomedyczna", "Inżynieria chemiczna", "Inżynieria materiałowa", "Inżynieria środowiska", "Logistyka", "Mechatronika", "Technologia chemiczna", "Transport", "Lotnictwo i kosmonautyka", "Zarzadzanie i inżynieria produkcji"]
spoleczne = ['Administracja', 'Kierunki o bezpieczeństwie', 'Dziennikarstwo i komunikacja', 'Gospodarka przestrzenna', 'Pedagogika', 'Pedagogika specjalna', 'Politologia', 'Psychologia', 'Socjologia', 'Stosunki międzynarodowe', 'Prawo']
humanistyczne = ['Archeologia', 'Filologia angielska', 'Filologia polska', 'Filologie obce', 'Filozofia', 'Historia', 'Kulturoznawstwo']
ekonomiczne = ['Ekonomia', 'Finanse i rachunkowość', 'Zarządzanie' 'Informatyka i ekonometria']
scisle = ['Astronomia', 'Chemia', 'Fizyka', 'Informatyka', 'Matematyka']
przyrodnicze = ['Biologia', 'Biotechnologia', 'Geografia', 'Geologia', 'Ochrona środowiska']
medyczne = ['Analityka medyczna', 'Farmacja', 'Fizjoterapia', 'Kierunek lekarski', 'Kierunek lekarsko dentystyczny', 'Kosmetologia', 'Pielęgniarstwo', 'Położnictwo', 'Ratownictwo medyczne', 'Turystyka i rekreacja', 'Wychowanie fizyczne', 'Zdrowie publiczne']



url_techniczne = "https://2024.ranking.perspektywy.pl/ranking/ranking-studiow-inzynierskich/"
url_spoleczne = 'https://2024.ranking.perspektywy.pl/ranking/ranking-kierunkow-studiow/kierunki-spoleczne/'
url_humanistyczne = 'https://2024.ranking.perspektywy.pl/ranking/ranking-kierunkow-studiow/kierunki-humanistyczne/'
url_ekonomiczne = 'https://2024.ranking.perspektywy.pl/ranking/ranking-kierunkow-studiow/kierunki-ekonomiczne/'
url_scisle = 'https://2024.ranking.perspektywy.pl/ranking/ranking-kierunkow-studiow/kierunki-scisle/'
url_przyrodnicze = 'https://2024.ranking.perspektywy.pl/ranking/ranking-kierunkow-studiow/kierunki-przyrodnicze/'
url_medyczne = 'https://2024.ranking.perspektywy.pl/ranking/ranking-kierunkow-studiow/kierunki-medyczne-i-o-zdrowiu/'

fields = {'techniczne' : {'url': url_techniczne, 'fields': techniczne}, 'spoleczne' : {'url': url_spoleczne, 'fields': spoleczne}, 'humanistyczne' : {'url': url_humanistyczne, 'fields': humanistyczne}, 'ekonomiczne' : {'url': url_ekonomiczne, 'fields': ekonomiczne}, 'scisle' : {'url': url_scisle, 'fields': scisle}, 'przyrodnicze' : {'url': url_przyrodnicze, 'fields': przyrodnicze}, 'medyczne' : {'url': url_medyczne, 'fields': medyczne}}


output_dict = {}

target_json = '/home/ppjotrek/Python/hackyeah24/ml/data/input/perspektywy.json'

for category in fields:
    
    url = fields[category]['url']
    
    for field in fields[category]['fields']:
        
        print(field)
        current_url = url + field.lower().replace(" ", "-").replace("ł", "l").replace("ó", "o").replace("ę", "e").replace("ą", "a").replace("ś", "s").replace("ć", "c").replace("ż", "z").replace("ź", "z").replace("ń", "n")
        print(current_url)
        
        driver = webdriver.Chrome()
        
        driver.get(current_url)
        
        try:

            field_ranking = {}

            table = driver.find_element(By.CLASS_NAME, "table")
            table_str = table.text.split("\n")
            table_str = table_str[1:]
            for i in range(0, len(table_str), 3):
                table_str[i] = table_str[i].split("=")[0]
                table_str[i] = table_str[i].split("*")[0]
                field_ranking[table_str[i+1]] = table_str[i]
            
            output_dict[field] = field_ranking
        except:
            print(f"Error loading {field}")
    
with open(target_json, 'a', encoding='utf8') as f:
    f.write(json.dumps(output_dict, ensure_ascii=False, indent=2) + ',\n')  