export function downloadText(name:string,text:string,type='text/plain'){const u=URL.createObjectURL(new Blob([text],{type}));const a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);}
export async function exportPdf(text:string,name:string){
 const { jsPDF } = await import('jspdf');
 const pdf=new jsPDF({unit:'pt',format:'letter'});let y=44;const margin=42;const width=528;
 const clean=text.replace(/[–—]/g,'-').replace(/[’‘]/g,"'").replace(/[“”]/g,'"').replace(/•/g,'-').replace(/ı/g,'i').replace(/İ/g,'I').replace(/ğ/g,'g').replace(/Ğ/g,'G').replace(/ş/g,'s').replace(/Ş/g,'S');
 const lines=clean.split('\n');
 for(let index=0;index<lines.length;index++){const line=lines[index];if(!line.trim()){y+=7;continue;}
 const heading=line===line.toUpperCase()&&/[A-Z]/.test(line)&&line.length<65;
 pdf.setFont('helvetica',heading?'bold':'normal');pdf.setFontSize(index===0&&heading?16:heading?10:9.5);
 const wrapped=pdf.splitTextToSize(line,width);for(const row of wrapped){if(y>745){pdf.addPage();y=44;}pdf.text(row,margin,y);y+=index===0&&heading?20:12;}
 if(heading)y+=4;
 }pdf.setProperties({title:name,author:'Next Role'});pdf.save(name+'.pdf');
}
