import { textOnly, safeUrl, relevant, dedupe } from '../../src/lib.js';
let cache;
const SIX_HOURS=21600000;
const iso=(v)=>{if(!v)return null;const d=new Date(typeof v==='number'?v*1000:v);return isNaN(+d)?null:d.toISOString();};
async function json(url,headers={}){const r=await fetch(url,{headers,signal:AbortSignal.timeout(14000)});if(!r.ok)throw new Error(`HTTP ${r.status}`);return r.json();}
async function himalayas(query){
 const data=await json(`https://himalayas.app/jobs/api/search?q=${encodeURIComponent(query)}&country=US&sort=recent&page=1`,process.env.HIMALAYAS_API_KEY?{Authorization:`Bearer ${process.env.HIMALAYAS_API_KEY}`}:{ });
 if(!Array.isArray(data.jobs))throw new Error('Unexpected response');
 return data.jobs.map(j=>({id:'h-'+j.guid,title:j.title,company:j.companyName,location:(j.locationRestrictions||[]).join(', ')||'Worldwide',mode:'Remote',salary:j.minSalary||j.maxSalary?`${j.currency||'USD'} ${j.minSalary?Number(j.minSalary).toLocaleString('en-US'):'?'} – ${j.maxSalary?Number(j.maxSalary).toLocaleString('en-US'):'?'} / ${j.salaryPeriod||'annual'}`:'',description:textOnly(j.description||j.excerpt),tags:j.categories||[],url:safeUrl(j.applicationLink),sourceUrl:safeUrl(j.guid),source:'Himalayas',published:iso(j.pubDate),updated:null,expires:iso(j.expiryDate),employment:j.employmentType||''}));
}
async function remotive(){const data=await json('https://remotive.com/api/remote-jobs?category=software-dev');if(!Array.isArray(data.jobs))throw new Error('Unexpected response');return data.jobs.map(j=>({id:'r-'+j.id,title:j.title,company:j.company_name,location:j.candidate_required_location||'Belirtilmedi',mode:'Remote',salary:j.salary||'',description:textOnly(j.description),tags:j.tags||[],url:safeUrl(j.url),sourceUrl:safeUrl(j.url),source:'Remotive',published:iso(j.publication_date),updated:null,expires:null,employment:j.job_type||''}));}
async function greenhouse(board){const data=await json(`https://boards-api.greenhouse.io/v1/boards/${board}/jobs?content=true`);if(!Array.isArray(data.jobs))throw new Error('Unexpected response');return data.jobs.map(j=>({id:'g-'+j.id,title:j.title,company:board==='onetrust'?'OneTrust':board==='lumimeds'?'LumiMeds':board,location:j.location?.name||'Belirtilmedi',mode:/remote/i.test(j.location?.name||'')?'Remote':/hybrid/i.test(j.location?.name||'')?'Hybrid':'Belirtilmedi',salary:'',description:textOnly(j.content),tags:[],url:safeUrl(j.absolute_url),sourceUrl:safeUrl(j.absolute_url),source:'Greenhouse',published:null,updated:iso(j.updated_at),expires:null,employment:''}));}
export async function handler(event){
 if(event.httpMethod!=='GET')return {statusCode:405,body:'Method not allowed'};
 if(cache&&Date.now()-cache.time<SIX_HOURS)return response(cache.data);
 const tasks=[['Himalayas · frontend',()=>himalayas('frontend')],['Himalayas · React',()=>himalayas('react')],['Himalayas · Next.js',()=>himalayas('next.js')],['Remotive',remotive],...(process.env.GREENHOUSE_BOARDS??'lumimeds,onetrust').split(',').map(x=>x.trim()).filter(x=>/^[a-z0-9-]+$/.test(x)).slice(0,5).map(board=>['Greenhouse · '+board,()=>greenhouse(board)])];
 const settled=await Promise.allSettled(tasks.map(async([name,fn])=>({name,jobs:await fn()})));
 let jobs=[];const sources=settled.map((r,i)=>{if(r.status==='fulfilled'){jobs.push(...r.value.jobs);return {name:tasks[i][0],ok:true,count:r.value.jobs.length};}return {name:tasks[i][0],ok:false,count:0};});
 if(sources.every(s=>!s.ok)){if(cache)return response({...cache.data,stale:true,sources});return response({jobs:[],sources,error:'İlan kaynaklarına şu anda ulaşılamıyor. Daha sonra tekrar dene.',fetchedAt:new Date().toISOString()},502);}
 jobs=dedupe(jobs.filter(j=>j.url&&j.title&&relevant(j)&&(!j.expires||new Date(j.expires)>new Date()))).slice(0,350);
 const data={jobs,sources,fetchedAt:new Date().toISOString(),stale:false};cache={time:Date.now(),data};return response(data);
}
function response(data,statusCode=200){return {statusCode,headers:{'Content-Type':'application/json','Cache-Control':'public, max-age=300','Netlify-CDN-Cache-Control':'public, s-maxage=21600, stale-while-revalidate=3600'},body:JSON.stringify(data)};}
