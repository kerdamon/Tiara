from pydantic import BaseModel
from typing import List

class University(BaseModel):
    id: int
    name: str
    degrees: List['Major']

class Major(BaseModel):
    id: int
    majorName: str
    studyField: str
    studyLevel: str
    voivodeship: str
    studyForm: str
    studyProfile: str
    semesters: str
    faculty: str
    numberOfGraduates: int
    employmentSalary: float
    timeOfLookingForJob: float
    universityId: int #czemu int, przecież ci dałem stringa institutionName

    def __str__(self):
        return (
            f"Major Name: {self.majorName}\n"
            f"Study Field: {self.studyField}\n"
            f"Study Level: {self.studyLevel}\n"
            f"Voivodeship: {self.voivodeship}\n"
            f"Study Form: {self.studyForm}\n"
            f"Study Profile: {self.studyProfile}\n"
            f"Semesters: {self.semesters}\n"
            f"Faculty: {self.faculty}\n"
            f"Number of Graduates: {self.numberOfGraduates}\n"
            f"Employment Salary: {self.employmentSalary}\n"
            f"Time of Looking for Job: {self.timeOfLookingForJob}\n"
            f"University ID: {self.universityId}"
        )

class User(BaseModel):
    id: int
    email: str
    passwordHash: str
    salt: str

# To resolve the forward reference
University.update_forward_refs()