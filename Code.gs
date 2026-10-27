// الصق هذا الكود في Apps Script الخاص بشيت الصندوق (نسخة منفصلة لكل صندوق)
const H=['id','date','type','cat','amount','who','phone','rcpt','note','ts'];
function sh_(){const ss=SpreadsheetApp.getActiveSpreadsheet();let s=ss.getSheetByName('Data');if(!s){s=ss.insertSheet('Data');s.appendRow(H);}return s}
function out_(o){return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON)}
function doGet(){return out_({ok:true})}
function doPost(e){
  let r;try{r=JSON.parse(e.postData.contents)}catch(x){return out_({ok:false,err:'bad'})}
  if(r.pw!==PropertiesService.getScriptProperties().getProperty('PASSWORD'))return out_({ok:false,err:'auth'});
  const L=LockService.getScriptLock();L.waitLock(20000);
  try{
    const s=sh_();
    if(r.op==='list'){
      const v=s.getDataRange().getValues().slice(1).map(a=>{const o={};H.forEach((k,i)=>{let x=a[i];if(x instanceof Date)x=Utilities.formatDate(x,'Africa/Cairo',k==='ts'?"yyyy-MM-dd HH:mm":'yyyy-MM-dd');o[k]=x});return o});
      return out_({ok:true,rows:v});
    }
    if(r.op==='add'){
      const d=r.row,a=Number(d.amount);if(!(a>0)||['in','out'].indexOf(d.type)<0)return out_({ok:false,err:'bad'});
      s.appendRow([Utilities.getUuid(),"'"+d.date,d.type,d.cat,a,d.who||'',"'"+(d.phone||''),d.rcpt||'',d.note||'',new Date()]);
      return out_({ok:true});
    }
    if(r.op==='del'){
      const ids=s.getRange(1,1,s.getLastRow(),1).getValues();
      for(let i=1;i<ids.length;i++)if(ids[i][0]===r.id){s.deleteRow(i+1);break}
      return out_({ok:true});
    }
    return out_({ok:false,err:'bad'});
  }finally{L.releaseLock()}
}
