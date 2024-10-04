# Tiara

<p align="center">
  <img src="./docs/tiara_logo.png" />
</p>

Tiara is application that enables smart search and comparison of fields of study in semantic way using filters and prompts.

The application contains a standardised list of the fields of study available at Polish public universities, enriched with information such as average earnings after graduation or position in [the Perspektywy ranking](https://2024.ranking.perspektywy.pl/ranking/ranking-kierunkow-studiow). In addition, each field of study has a special record in the database, where all information about it found during the research phase is encoded. This record is interpreted by a language model, which is able to select a list of majors based on the prompt, allowing searches or comparisons to be made through a verbal description of the field of study.

It was originally developed on HackYeah 2024 hackathon by:

- Paulina Kowalska - design
- [Konrad Walas](https://github.com/kerdamon) - app development
- [Paweł Zaręba](https://github.com/pzareba22) - app development
- [Konrad Krzemiński](https://github.com/Darnok00) - app development
- [Mateusz Górczany](https://github.com/mateuszGorczany) - machine learning
- [Piotr Pichór](https://github.com/ppjotrek) - machine learning

## Features

- Search and filter fields of study by range of predefined values
- Search fields of study by natural language
- Recommend best fields of study based on qualifications and preferences
- Compare fields of study

## Tech stack

Application is written in `React Native`. The application communicates with an REST API written in `Express` `(node.js)`, that handles the connection to the `PostgreSQL` database and a separate service that is an interface for communicating with the AI model. The service is written using the `FastAPI` and `Pytorch` was used for machine learning.

## Project structure

Folder `ml` contains code responsible for machine learning as well as FastAPI microservice. Folder app contains three subfolders:

1. `backend` - code for backend service
2. `TiaraMobileApp` - code for mobile app
3. `common` - shared code (like interfaces and types)

## Development environment setup

Add dependencies can be managed through [devbox](https://www.jetify.com/docs/devbox/installing_devbox/). Development environment can be automatically loaded upon entering directory with [direnv](https://direnv.net/). Server components are dockerized and can be started using `docker compose up` in root of project.

For local development there are additional steps needed to develop application listed below.

### Mobile app

1. Copy file `app/TiaraMobileApp/.env.example` and name it `app/TiaraMobileApp/.env`. Change values if needed.

### Backend

1. Copy `app/backend/.env.example` as `app/backend/.env`. Change values as needed.
2. Run cd to `app/backend` and run `node generateKeyPair.js`.
