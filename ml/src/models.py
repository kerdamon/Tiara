from pydantic import BaseModel
from typing import List

class University(BaseModel):
    id: int
    name: str
    degrees: List['Major']

class Major(BaseModel):
    id: int
    majorName: str = 'not specified'
    studyField: str = 'not specified'
    studyLevel: str = 'not specified'
    voivodeship: str = 'not specified'
    studyForm: str = 'not specified'
    studyProfile: str = 'not specified'
    semesters: str = 'not specified'
    faculty: str = 'not specified'
    numberOfGraduates: int = -1
    employmentSalary: float = -1.0
    timeOfLookingForJob: float = -1.0
    universityId: int = -1
    description: str = 'not specified'
    ranking: int = -1

    def __str__(self):
        return (
            f"Major Name: {self.majorName}.\n"
            f"Study Field: {self.studyField}.\n"
            f"Study Level: {self.studyLevel}.\n"
            f"Voivodeship: {self.voivodeship}.\n"
            f"Study Form: {self.studyForm}.\n"
            f"Study Profile: {self.studyProfile}.\n"
            f"Semesters: {self.semesters}.\n"
            f"Faculty: {self.faculty}.\n"
            f"Number of Graduates: {self.numberOfGraduates}.\n"
            f"Employment Salary: {self.employmentSalary}.\n"
            f"Time of Looking for Job: {self.timeOfLookingForJob}.\n"
            f"University ID: {self.universityId}.\n"
            f"Description: {self.description}.\n"
            f"Ranking: {self.ranking}."
        )

class User(BaseModel):
    id: int
    email: str
    passwordHash: str
    salt: str

# To resolve the forward reference
University.update_forward_refs()