import requests
from selenium import webdriver
from selenium.webdriver.common.by import By
import json

#AGH - wyciągnąć ze strony https://rekrutacja.agh.edu.pl/kierunki-studiow/ i na tej bazie budować link do konkretnego kierunku

fields_of_study_agh = ["Automatyka i Robotyka", "Automatyka Przemysłowa i Robotyka", "Budownictwo", "Ceramika", "Chemia Budowlana", "Chemia w Kryminalistyce", "Computer Physics", "Computer Science", "Cyberbezpieczeństwo", "Digital Production for Sustainable Manufacturing", "Edukacja Techniczno-Informatyczna", "Ekologiczne Źródła Energii", "Ekoprojektowanie i Cyfryzacja Technologii Materiałowych", "Ekotechnologie Cieplne", "Electronics and Tele­communications", "Elektronika", "Elektronika i Telekomunikacja", "Elektrotechnika", "Energetyka", "Energetyka Jądrowa", "Energetyka Odnawialna i Zarządzanie Energią", "Energetyka Wodorowa", "Energy and Environmental Engineering", "Fizyka Medyczna", "Fizyka Techniczna", "Geodezja i Kartografia", "Geofizyka", "Geoinformatyka", "Geoinżynieria i Górnictwo Otworowe", "Geologia Stosowana", "Geośrodowisko Miasta", "Geotermia – Technika i Technologia", "Geoturystyka", "Informatyka - Uczenie Maszynowe i Sztuczna Inteligencja", "Informatyka – Data Science", "Informatyka", "Informatyka Geoprzestrzenna", "Informatyka i Ekonometria", "Informatyka i Systemy Inteligentne", "Informatyka Medyczna", "Informatyka Społeczna", "Informatyka Stosowana", "Informatyka Techniczna", "International Management", "Inżynieria Akustyczna", "Inżynieria Bezpieczeństwa", "Inżynieria Biomedyczna", "Inżynieria Górnicza", "Inżynieria i Analiza Danych", "Inżynieria i Monitoring Środowiska", "Inżynieria i Ochrona Środowiska", "Inżynieria i Zarządzanie Procesami Przemysłowymi", "Inżynieria Kształtowania Środowiska", "Inżynieria Materiałowa", "Inżynieria Mechaniczna i Materiałowa", "Inżynieria Mechatroniczna", "Inżynieria Metali", "Inżynieria Metali Nieżelaznych", "Inżynieria Naftowa i Gazownicza", "Inżynieria Obliczeniowa", "Inżynieria Procesów Odlewniczych", "Inżynieria Procesów Przemysłowych", "Inżynieria Produkcji i Jakości", "Komputerowe Wspomaganie Procesów Inżynierskich", "Komputerowo Wspomagana Inżynieria Materiałów Budowlanych", "Kulturo­znawstwo", "Matematyka", "Materiały i Technologie dla Energetyki i Lotnictwa", "Materiały i Technologie Metali Nieżelaznych", "Mechanical Engineering", "Mechanika i Budowa Maszyn", "Mechatronic engineering with English as instruction language", "Metalcasting Engineering", "Metallurgical Engineering", "Metalurgia", "Mikro- i Nanotechnologie w Biofizyce", "Mikro­elektronika w Technice i Medycynie", "Modern Materials Design And Application", "Nanoinżynieria Materiałów", "Nowoczesne Technologie Paliwowe", "Nowoczesne Technologie w Kryminalistyce", "Odlewnictwo", "Raw Materials Value Chain", "Recykling i Metalurgia", "Remote Sensing and Geo Informatics", "Rewitalizacja Terenów Zdegrado­wanych", "Socjologia", "Technologia Chemiczna", "Technologie Przemysłu 4.0", "Teleinformatyka", "Transport w Przemyśle 4.0", "Tworzywa i Technologie Motoryzacyjne", "Zarządzanie", "Zarządzanie i Inżynieria Produkcji", "Zmiany Klimatu - Przeciwdziałanie i Adaptacja"]

def get_agh_link(field_of_study):
    field_of_study = field_of_study.replace(" ", "-")
    field_of_study = field_of_study.replace("ł", "l")
    field_of_study = field_of_study.replace("ó", "o")
    field_of_study = field_of_study.replace("ę", "e")
    field_of_study = field_of_study.replace("ą", "a")
    field_of_study = field_of_study.replace("ś", "s")
    field_of_study = field_of_study.replace("ć", "c")
    field_of_study = field_of_study.replace("ż", "z")
    field_of_study = field_of_study.replace("ź", "z")
    field_of_study = field_of_study.replace("ń", "n")
    return f"https://rekrutacja.agh.edu.pl/kierunki-studiow/{field_of_study.lower()}"



if __name__ == "__main__":
    
    target_file = '/home/ppjotrek/Python/hackyeah24/ml/data/input/agh.json'
    
    agh_dict = {}

    
    for field in fields_of_study_agh:
        link = get_agh_link(field)
        driver = webdriver.Chrome()
        driver.get(link)   
        content = driver.find_element(By.CLASS_NAME, "site")
        agh_dict[field] = content.text
        print(field)
            
        driver.quit()

            
    with open(target_file, 'a', encoding='utf8') as f:
        f.write(json.dumps(agh_dict, ensure_ascii=False, indent=2) + '\n')  
        
        