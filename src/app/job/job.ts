import { Consultant } from '../consultant/consultant';

export class Job {
    $key: string;
    jobTitle:string;
    jobLocation:string;
    jobDesc:string;
    jobType:string;
    jobTechnologies:string;
    interviewMode:string;
    jobQualification:string;
    responsibility:string;
    skillsExperience:string;
    preferredSkills:string;
    jobContactDetails:string;    
    jobDuration:string;
    jobTravel:string;
    contactEmail:string;
    createdBy:string;
    active:boolean=true;
    consultants : Array<string> = new Array(); 
    createdAt = (new Date()).toString(); 
}
