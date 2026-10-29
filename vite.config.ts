import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { handler as jobs } from './netlify/functions/jobs.mjs';
import { handler as generate } from './netlify/functions/generate.mjs';
import { handler as config } from './netlify/functions/config.mjs';
export default defineConfig(({ mode }) => {
 Object.assign(process.env, loadEnv(mode, process.cwd(), ''));
 return {plugins:[react(),{name:'local-functions',configureServer(server){
 server.middlewares.use('/api',async(req,res,next)=>{
 const route=req.url?.split('?')[0]; const fn=route==='/jobs'?jobs:route==='/generate'?generate:route==='/config'?config:null;
 if(!fn)return next();
 try {let body='';for await(const chunk of req){body+=chunk;if(body.length>150000){res.statusCode=413;res.end('Too large');return;}}
 const out=await fn({httpMethod:req.method,body,headers:req.headers});res.statusCode=out.statusCode;
 for(const [k,v]of Object.entries(out.headers||{}))res.setHeader(k,String(v));res.end(out.body);
 }catch{res.statusCode=500;res.end(JSON.stringify({error:'Local server error.'}));}
 });}}]};
});
