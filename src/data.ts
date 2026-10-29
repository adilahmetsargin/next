export type Job={id:string;title:string;company:string;location:string;mode:string;salary:string;description:string;tags:string[];url:string;sourceUrl:string;source:string;published:string|null;updated:string|null;expires:string|null;employment:string};
export type Profile={name:string;email:string;phone:string;location:string;workAuthorization:string;skills:string;years:number;resume:string;includeSenior:boolean;includeOtherLocations:boolean;goal:number};
export type RecordEntry={status:string;note:string;updatedAt:string;job:Job};
export type Doc={text:string;notes:string[];mode:string;updatedAt:string};
export type Store={profile:Profile;records:Record<string,RecordEntry>;docs:Record<string,Doc>;customJobs:Job[];daily:Record<string,boolean>};
export const baseResume=`ADIL AHMET SARGIN
Frontend Engineer | React, Next.js, TypeScript
Rochester Hills, MI | U.S. Permanent Resident | No Sponsorship Required
[Email] | [Phone] | linkedin.com/in/adilahmetsargin | github.com/adilahmetsargin

PROFESSIONAL SUMMARY
Frontend Engineer with 3.5 years of full-time experience building React, Next.js, and TypeScript applications for civic platforms and enterprise dashboards. Contributed to 10+ mini-apps within the Istanbul Senin ecosystem and delivered two freelance engagements alongside full-time employment.

TECHNICAL SKILLS
React, Next.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Material UI, Ant Design, Redux / Redux Toolkit, MobX, Zustand, TanStack Query, REST APIs, React Hook Form, Zod, Git, Storybook, Docker deployment workflows, automated deployment workflows, responsive UI

RELEVANT ENGINEERING EXPERIENCE
Frontend Developer | Westerops | Mar 2021 - Aug 2024
Istanbul office; remote from Rochester Hills, MI from Mar 2024
- Developed React, Next.js, and TypeScript interfaces for 10+ PWA-style mini-apps within the Istanbul Senin ecosystem, a civic super-app platform serving 1M+ users.
- Built features for Kobil's enterprise super-app dashboard across app and user management, reporting, analytics, configuration, and public-sector workflows.
- Created reusable TypeScript components, Storybook UI patterns, and shared templates; developed customer, seller, and admin interfaces for Yemegim.com.
- Resolved UI interaction and rendering issues across React/PWA interfaces, correcting event handling and component behavior; collaborated with backend, product, and QA teams through implementation and release.
- Deployed the Kobil frontend using existing Docker scripts and worked within established Git-triggered automated deployment workflows.

Freelance Frontend Developer | Jan 2022 - Jun 2023
Independent client engagements alongside full-time employment | Istanbul, Turkey
- Agrotek (Jan - Jun 2023): Developed manufacturing workflows for accounting, inventory, and production using React class components and MobX. Integrated APIs and built reusable tables, search, and filters; worked directly with the client and a full-stack developer to clarify requirements and shape features.
- KATU (Jan - Dec 2022): Served as the sole frontend developer on an existing security operations dashboard used by Securitas personnel. Built API-connected interfaces, tables, search, and filters with React and Redux; coordinated delivery with backend and mobile developers and the project manager.

SELECTED PERSONAL PROJECTS
Northstar Support Ops | React, TypeScript, Zustand, React Hook Form, Zod
- Built a responsive ticketing dashboard with search, filters, SLA risk states, ticket updates, replies, internal notes, and validated ticket creation. aas-northstar-support.netlify.app
Flagship Commerce | Next.js, TypeScript, TanStack Query, Zustand
- Built catalog, cart, simulated checkout, and admin workflows with search, filters, and form validation. aas-flagship.netlify.app

ADDITIONAL EXPERIENCE
Operations Specialist | United Wholesale Mortgage (UWM) | Sep 2024 - Oct 2026
Pontiac, MI | Supported high-volume mortgage operations and coordinated with internal teams.

EDUCATION
Associate Degree in Computer Programming | Ataturk University | 2020
Bachelor of Business Administration | Uludag University | 2016`;
export const defaultProfile:Profile={name:'Adil Ahmet Sargin',email:'',phone:'',location:'Rochester Hills, MI',workAuthorization:'authorized to work in the U.S. without sponsorship',skills:'React, Next.js, TypeScript, JavaScript, CSS, Tailwind CSS, Redux, MobX, Zustand, TanStack Query, REST APIs, React Hook Form, Zod, Git, Storybook, Docker',years:3.5,resume:baseResume,includeSenior:false,includeOtherLocations:false,goal:5};
export const initialStore:Store={profile:defaultProfile,records:{},docs:{},customJobs:[],daily:{}};
export function loadStore():Store{try{const v=JSON.parse(localStorage.getItem('next-role-v1')||'null');if(v&&typeof v.profile?.resume==='string')return {...initialStore,...v,profile:{...defaultProfile,...v.profile}};}catch{}return initialStore;}
export const statusLabels:Record<string,string>={saved:'Kaydedildi',applied:'Başvuruldu',interview:'Görüşme',rejected:'Olumsuz',hidden:'Gizlendi'};
export function localDay(d=new Date()){return d.toLocaleDateString('en-CA');}
