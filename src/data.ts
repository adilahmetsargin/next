export type Job={id:string;title:string;company:string;location:string;mode:string;salary:string;description:string;tags:string[];url:string;sourceUrl:string;source:string;published:string|null;updated:string|null;expires:string|null;employment:string};
export type Profile={name:string;email:string;phone:string;location:string;workAuthorization:string;skills:string;years:number;resume:string;includeSenior:boolean;includeOtherLocations:boolean;goal:number};
export type RecordEntry={status:string;note:string;updatedAt:string;job:Job};
export type Doc={text:string;notes:string[];mode:string;updatedAt:string};
export type Store={profile:Profile;records:Record<string,RecordEntry>;docs:Record<string,Doc>;customJobs:Job[];daily:Record<string,boolean>};
// Personal resumes belong in browser storage or an ignored private JSON export.
// Keep this committed template free of candidate-specific information.
export const baseResume=`[FULL NAME]
Frontend Engineer | React, Next.js, TypeScript
[Location] | [Work authorization]
[Email] | [Phone] | [LinkedIn URL] | [GitHub URL]

PROFESSIONAL SUMMARY
[Describe your verified frontend experience and the roles you are targeting.]

TECHNICAL SKILLS
[List only skills you can explain and demonstrate.]

PROFESSIONAL EXPERIENCE
[Job title] | [Company] | [Start date - End date]
- [Describe a feature you delivered, your contribution, and a verified result.]
- [Describe a technical problem you solved without inventing metrics.]

SELECTED PROJECTS
[Project name] | [Technologies]
- [Describe what you built and include a working project link.]

EDUCATION
[Degree] | [Institution] | [Year]`;
export const defaultProfile:Profile={name:'',email:'',phone:'',location:'United States',workAuthorization:'',skills:'React, Next.js, TypeScript, JavaScript, CSS',years:0,resume:baseResume,includeSenior:false,includeOtherLocations:false,goal:5};
export const initialStore:Store={profile:defaultProfile,records:{},docs:{},customJobs:[],daily:{}};
export function loadStore():Store{try{const v=JSON.parse(localStorage.getItem('next-role-v1')||'null');if(v&&typeof v.profile?.resume==='string')return {...initialStore,...v,profile:{...defaultProfile,...v.profile}};}catch{}return initialStore;}
export const statusLabels:Record<string,string>={saved:'Saved',applied:'Applied',interview:'Interview',rejected:'Rejected',hidden:'Hidden'};
export function localDay(d=new Date()){return d.toLocaleDateString('en-CA');}
