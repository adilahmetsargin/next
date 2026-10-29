export const skillPatterns = {
 React:/\breact(?:\.js|js)?\b/i, TypeScript:/\btypescript\b/i, 'Next.js':/\bnext\.?js\b/i,
 JavaScript:/\bjavascript\b|\bES6\b/i, CSS:/\bcss\b|tailwind/i, Redux:/\bredux\b/i,
 Zustand:/\bzustand\b/i, 'TanStack Query':/tanstack|react query/i, Storybook:/storybook/i,
 Docker:/\bdocker\b/i, 'REST APIs':/\brest(?:ful)?\b|\bAPI integration/i,
 'Node.js':/\bnode\.?js\b/i, Python:/\bpython\b/i, AWS:/\bAWS\b|amazon web services/i, PostgreSQL:/postgres(?:ql)?/i, 'AI integration':/\bLLM\b|\bRAG\b|AI integration|AI models/i,
 Testing:/playwright|jest|vitest|testing library|unit test|end.to.end test/i,
 Accessibility:/accessibility|\ba11y\b|\bwcag\b/i, GraphQL:/graphql/i,
};
export const safeUrl=(value)=>{try{const u=new URL(value);return ['https:','http:'].includes(u.protocol)?u.href:'';}catch{return '';}};
export function textOnly(html='') {
 return String(html).replace(/&amp;lt;/g,'&lt;').replace(/&amp;gt;/g,'&gt;').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,'')
 .replace(/<li\b[^>]*>/gi,'\n• ').replace(/<\/(p|div|h[1-6]|ul|ol)>|<br\s*\/?\s*>/gi,'\n\n').replace(/<[^>]+>/g,'')
 .replace(/&nbsp;|&#160;/g,' ').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;|&apos;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>')
 .replace(/&#(\d+);/g,(_,n)=>Number(n)<0x110000?String.fromCodePoint(Number(n)):'').replace(/[ \t]+/g,' ').replace(/\n[ \t]+/g,'\n').replace(/\n{3,}/g,'\n\n').trim();
}
export function relevant(job){
 const title=job.title||'';
 if(/sales|recruiter|account executive|assistant|architect|internship|\bintern\b/i.test(title))return false;
 const direct=/front[ -]?end|web developer|\bui\s+(?:software\s+)?engineer/i.test(title)&&(!/\bSAP\b|\bABAP\b|Fiori|Sitecore|Laravel|WordPress|Drupal/i.test(title)||/\breact\b|next\.?js/i.test(job.description||''));
 const related=/full[ -]?stack|software (?:engineer|developer)|product engineer/i.test(title)&&/\breact\b|next\.?js/i.test(job.description||'');
 return direct||related;
}
export function analyze(job,profile){
 const text=job.title+' '+job.description; const skills=Object.keys(skillPatterns).filter(k=>skillPatterns[k].test(text));
 const profileSkills=(profile.skills||'').toLowerCase();
 const matched=skills.filter(k=>profileSkills.includes(k.toLowerCase()));
 const missing=skills.filter(k=>!matched.includes(k));
 const senior=/\bsenior\b|\bsr\.?\b|\bstaff\b|\bprincipal\b|\blead\b|\bmanager\b/i.test(job.title);
 const years=[...text.matchAll(/\b(\d{1,2})\s*(?:\+|[-–]\s*\d{1,2})?\s+years?\s+(?:of\s+)?(?:relevant\s+|professional\s+|commercial\s+|hands.on\s+)?(?:experience|frontend|front.end|development|engineering|working)/gi)].map(m=>+m[1]);
 const expPrefix=[...text.matchAll(/experience\s*[:–-]\s*(\d{1,2})\s*\+?\s*years?/gi)].map(m=>+m[1]);years.push(...expPrefix);
 const minYears=years.length?Math.max(...years):null;
 const location=job.location||''; const global=/worldwide|anywhere|global|all countries/i.test(location);
 const us=/united states|\busa\b|\bu\.?s\.?\b|north america|\bmichigan\b|\bdetroit\b|\brochester hills\b/i.test(location);
 const uncertain=!location||/not specified|belirtilmedi/i.test(location)||/^(remote|hybrid)$/i.test(location.trim());
 const eligible=global||us||uncertain;
 let score=20+45*(matched.length/Math.max(skills.length,1))+(matched.includes('React')?12:0)+(matched.includes('Next.js')?8:0)+(/front[ -]?end/i.test(job.title)?12:0)+(eligible?8:-40)-(!matched.includes('React')&&!matched.includes('Next.js')?25:0)-(/full[ -]?stack/i.test(job.title)?15:0)-(senior?20:0)-(minYears&&minYears>profile.years?(minYears-profile.years)*6:0);
 score=Math.min(98,Math.max(0,Math.round(score)));
 const reasons=[];if(matched.length)reasons.push(matched.slice(0,3).join(' + ')+' deneyiminle örtüşüyor.');if(us)reasons.push('Kaynak konumunda ABD/Michigan geçiyor.');if(global)reasons.push('Kaynak dünya geneli başvuru belirtiyor.');
 const warnings=[];if(/full[ -]?stack/i.test(job.title))warnings.push('Full-stack rolü: backend beklentileri frontend deneyiminin ötesinde olabilir.');if(senior)warnings.push('Unvan senior/lead düzeyinde.');if(minYears&&minYears>profile.years)warnings.push(`${minYears}+ yıl deneyim ifadesi var; senin deneyimin ${profile.years} yıl.`);
 if(!eligible)warnings.push('Kaynak konumu ABD dışında görünüyor.');if(uncertain)warnings.push('Konum uygunluğunu ilandan doğrula.');
 if(/citizen(?:ship)?|security clearance|clearance required/i.test(text))warnings.push('Vatandaşlık veya clearance koşulunu kontrol et; Green Card her koşulu karşılamaz.');
 if(us||global)warnings.push('Eyalet, saat dilimi ve çalışma izni koşullarını ilanın içinde doğrula.');
 return {score,matched,missing,senior,minYears,eligible,uncertain,reasons,warnings};
}
export function dedupe(jobs){const seen=new Set();return jobs.filter(j=>{const key=(j.company+'|'+j.title+'|'+j.location).toLowerCase().replace(/[^a-z0-9|]/g,'');if(seen.has(key))return false;seen.add(key);return true;});}
export function rankResume(resume,job){
 const wanted=Object.keys(skillPatterns).filter(k=>skillPatterns[k].test(job.title+' '+job.description));
 // Only reorder existing bullets within a section. Dates, headings and claims remain unchanged.
 const lines=resume.split('\n');let i=0;
 while(i<lines.length){if(!/^[-•] /.test(lines[i])){i++;continue;}let end=i;while(end<lines.length&&/^[-•] /.test(lines[end]))end++;
 const ranked=lines.slice(i,end).map((line,index)=>({line,index,score:wanted.filter(k=>skillPatterns[k].test(line)).length})).sort((a,b)=>b.score-a.score||a.index-b.index);
 lines.splice(i,end-i,...ranked.map(x=>x.line));i=end;}
 return lines.join('\n');
}
export function draftLetter(profile,job){
 const a=analyze(job,profile); const common=a.matched.filter(x=>!['CSS','Testing','Accessibility'].includes(x));
 const selected=profile.resume.split('\n').filter(x=>/^[-•] /.test(x)).map(line=>({line:line.replace(/^[-•] /,''),score:common.filter(k=>skillPatterns[k].test(line)).length})).sort((a,b)=>b.score-a.score).slice(0,2);
 return `Dear ${job.company} Hiring Team,\n\nI am applying for the ${job.title} position. My background includes ${profile.years} years of full-time frontend engineering experience and two freelance engagements. ${common.length?`The role's focus on ${common.slice(0,3).join(', ')} aligns with my experience.`:'I would welcome the opportunity to discuss how my frontend experience relates to your team’s needs.'}\n\n${selected.map(x=>x.line).join(' ')}\n\nI am based in ${profile.location}${profile.workAuthorization?` and ${profile.workAuthorization.replace(/\.$/,'')}`:''}. Thank you for considering my application. I would welcome the opportunity to discuss the role.\n\nBest regards,\n${profile.name}`;
}
