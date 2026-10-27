// صناديق يوحنا — شيت واحد، خدمة واحدة، 5 صناديق، لكل صندوق كلمة سر
const FUNDS=['schools','brides','projects','sick','general'];
const H=['id','date','type','cat','amount','who','phone','rcpt','note','ts'];
function doGet(){
  return HtmlService.createHtmlOutputFromFile('Index').setTitle('صناديق يوحنا')
    .addMetaTag('viewport','width=device-width, initial-scale=1');
}
function sh_(f){
  const ss=SpreadsheetApp.getActiveSpreadsheet();let s=ss.getSheetByName(f);
  if(!s){s=ss.insertSheet(f);s.appendRow(H);}return s;
}
function api(str){
  let r;try{r=JSON.parse(str)}catch(x){return{ok:false,err:'bad'}}
  if(FUNDS.indexOf(r.fund)<0)return{ok:false,err:'bad'};
  const p=PropertiesService.getScriptProperties().getProperty('PW_'+r.fund);
  if(!p||r.pw!==p){Utilities.sleep(1000);return{ok:false,err:'auth'}}
  const L=LockService.getScriptLock();L.waitLock(20000);
  try{
    const s=sh_(r.fund);
    if(r.op==='list'){
      const v=s.getDataRange().getValues().slice(1).map(a=>{const o={};H.forEach((k,i)=>{let x=a[i];
        if(x instanceof Date)x=Utilities.formatDate(x,'Africa/Cairo',k==='ts'?'yyyy-MM-dd HH:mm':'yyyy-MM-dd');o[k]=x});return o});
      return{ok:true,rows:v};
    }
    if(r.op==='add'){
      const d=r.row,a=Number(d.amount);
      if(!(a>0)||['in','out'].indexOf(d.type)<0)return{ok:false,err:'bad'};
      s.appendRow([Utilities.getUuid(),"'"+d.date,d.type,d.cat,a,d.who||'',"'"+(d.phone||''),d.rcpt||'',d.note||'',new Date()]);
      return{ok:true};
    }
    if(r.op==='del'){
      const ids=s.getRange(1,1,s.getLastRow(),1).getValues();
      for(let i=1;i<ids.length;i++)if(ids[i][0]===r.id){s.deleteRow(i+1);break}
      return{ok:true};
    }
    return{ok:false,err:'bad'};
  }finally{L.releaseLock()}
}
