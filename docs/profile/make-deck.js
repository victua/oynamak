const pptxgen = require('pptxgenjs');
const { applyTheme } = require('/Users/anneamoit/Library/Application Support/Claude/local-agent-mode-sessions/skills-plugin/1c22d555-fa2b-4391-b458-0f56afae43ce/8c3ee8dd-5bc3-4415-a96c-25d0b032dfd6/skills/pptx/scripts/apply_theme.js');
const path = require('path');
const I = (f) => path.resolve(__dirname, f);
const BG = (n) => ({ path: I('bg/' + n + '.png') });
const NAVY='0B2D61', RED='D93846', PALE='EBF1FA', INK='14233F', F='Montserrat';
const THEME={name:'Oynamak',headFontFace:F,bodyFontFace:F,colors:{dk1:INK,lt1:'FFFFFF',dk2:NAVY,lt2:PALE,accent1:NAVY,accent2:RED,accent3:'3A5A94',accent4:'7F95BD',accent5:'B7C6E0',accent6:'F2B5BA',hlink:RED,folHlink:NAVY}};
const pres=new pptxgen(); pres.layout='LAYOUT_WIDE'; pres.theme={headFontFace:F,bodyFontFace:F};
pres.title='Oynamak Sports Group | Company Profile';
const C=pres.SchemeColor;
const W=13.33,H=7.5,M=0.6;
const foot=(s,n,dark)=>{s.addImage({path:I(dark?'../../public/images/logo-white.png':'img/logo.png'),x:M,y:6.7,w:0.62*2.48,h:0.62,objectName:'Logo'});
 s.addText(String(n),{x:W-M-1,y:6.8,w:1,h:0.3,align:'right',fontSize:10,color:dark?'B7C6E0':'7F95BD',isTextBox:true,margin:0});};
const title=(s,eyebrow,a,b,dark)=>{
 s.addText(eyebrow.toUpperCase(),{x:M,y:0.55,w:8,h:0.3,fontSize:11,bold:true,charSpacing:4,color:C.accent2,isTextBox:true,margin:0});
 s.addText([{text:a+' ',options:{color:dark?'FFFFFF':NAVY}},{text:b,options:{color:C.accent2}}],{x:M,y:0.9,w:W-2*M,h:0.9,fontSize:38,bold:true,isTextBox:true,margin:0,valign:'top'});};
const card=(s,x,y,w,h,fill)=>s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x,y,w,h,fill:{color:fill},line:{color:fill},rectRadius:0.18});

// 1 cover
let s=pres.addSlide(); s.background=BG('navy');
s.addImage({path:I('img/hero.jpg'),x:6.2,y:0,w:7.13,h:7.5,sizing:{type:'cover',w:7.13,h:7.5},objectName:'Cover photo'});
s.addImage({path:I('../../public/images/logo-white.png'),x:M,y:0.6,w:2.2,h:0.886,objectName:'Logo'});
s.addText('COMPANY PROFILE 2026',{x:M,y:2.3,w:5,h:0.3,fontSize:11,bold:true,charSpacing:4,color:'B7C6E0',isTextBox:true,margin:0});
s.addText([{text:'BUILT FOR GREATNESS.',options:{color:'FFFFFF',breakLine:true}},{text:'MADE TO WIN.',options:{color:RED}}],{x:M,y:2.7,w:5.5,h:2.0,fontSize:30,bold:true,isTextBox:true,margin:0,valign:'top'});
s.addText('Helping clubs, academies, federations and brands get the kit, the training and the chances they need to win, in Kenya and beyond.',{x:M,y:4.9,w:5.2,h:1,fontSize:14,color:'DCE5F4',isTextBox:true,margin:0,valign:'top'});
s.addText('Nairobi, Kenya  ·  hi@oynamak.co.ke',{x:M,y:6.8,w:5.5,h:0.3,fontSize:11,color:'B7C6E0',isTextBox:true,margin:0});

// 2 who we are
s=pres.addSlide({}); s.background=BG('white');
title(s,'Who we are','A sports company','built in Kenya');
s.addText([{text:'Oynamak turns raw talent into real chances by bringing together the gear, the coaching, the trips and the technology that sport needs.',options:{breakLine:true,paraSpaceAfter:14}},{text:'Whether you run a school team, a club, a federation or a brand, we help you do more with sport. We know the pitches, the people and the talent, and we know how to get things done here.'}],{x:M,y:2.2,w:6.3,h:3.6,fontSize:16,color:INK,isTextBox:true,margin:0,valign:'top'});
s.addImage({path:I('img/about.jpg'),x:7.8,y:0.55,w:4.93,h:6.1,sizing:{type:'cover',w:4.93,h:6.1},rounding:false,objectName:'About photo'});
foot(s,2);

// 3 mission vision values
s=pres.addSlide(); s.background=BG('pale');
title(s,'What drives us','Mission, vision','and values');
card(s,M,2.1,5.9,2.2,NAVY); card(s,6.83,2.1,5.9,2.2,'FFFFFF');
s.addText([{text:'Our mission',options:{bold:true,fontSize:20,color:'FFFFFF',breakLine:true,paraSpaceAfter:6}},{text:'To help sport in Kenya and Africa grow by finding talent, equipping teams and opening doors at home and abroad.',options:{fontSize:14,color:'DCE5F4'}}],{x:M+0.35,y:2.3,w:5.2,h:1.8,isTextBox:true,margin:0,valign:'top'});
s.addText([{text:'Our vision',options:{bold:true,fontSize:20,color:NAVY,breakLine:true,paraSpaceAfter:6}},{text:'A Kenya where every talented young athlete has a clear path from the community pitch to the world stage.',options:{fontSize:14,color:INK}}],{x:6.83+0.35,y:2.3,w:5.2,h:1.8,isTextBox:true,margin:0,valign:'top'});
[['Straight talk','Clear plans, clear prices and no jargon.'],['We show up','On time, on the ground and on your side of the touchline.'],['Players first','Every decision starts with what is best for the athlete.'],['Built to last','Results that are still there next season.']].forEach((v,i)=>{
 const x=M+i*3.06; card(s,x,4.6,2.9,1.85,'FFFFFF');
 s.addText(v[0],{x:x+0.25,y:4.78,w:2.4,h:0.4,fontSize:16,bold:true,color:RED,isTextBox:true,margin:0});
 s.addText(v[1],{x:x+0.25,y:5.2,w:2.4,h:1.1,fontSize:12,color:INK,isTextBox:true,margin:0,valign:'top'});});
foot(s,3);

// 4 services
s=pres.addSlide(); s.background=BG('white');
title(s,'What we do','Six services.','One goal');
const sv=[['01','Talent Scouting & Academies','sol-talent-development'],['02','Sports Kit & Equipment','sol-products-equipment'],['03','Partnerships & Growth','sol-strategic-partnerships'],['04','Exchange & Training Programmes','sol-international-exchange'],['05','Sports Tourism & Hosting','sol-sports-tourism'],['06','Sports Tech & Data','sol-sports-innovation']];
sv.forEach((v,i)=>{const x=M+(i%3)*4.1,y=1.95+Math.floor(i/3)*2.4,w=3.93,h=2.25;
 s.addImage({path:I('img/'+v[2]+'.jpg'),x,y,w,h,sizing:{type:'cover',w,h},objectName:'Service '+v[0]});
 s.addShape(pres.shapes.RECTANGLE,{x,y:y+h-0.95,w,h:0.95,fill:{color:NAVY,transparency:15},line:{color:NAVY,transparency:100}});
 s.addImage({path:I('img/logo-mark-white.png'),x:x+w-0.75,y:y+0.12,w:0.55*0.945,h:0.55,objectName:'Logo mark'});
 s.addText(v[0],{x:x+0.2,y:y+0.15,w:0.6,h:0.32,fontSize:11,bold:true,color:'FFFFFF',fill:{color:RED},align:'center',isTextBox:true,margin:0});
 s.addText(v[1],{x:x+0.2,y:y+h-0.9,w:w-0.4,h:0.85,fontSize:15,bold:true,color:'FFFFFF',valign:'middle',isTextBox:true,margin:0});});
foot(s,4);

// 5-6 detail slides (3 services each)
const det=[['We find young talent, build strong academies and give players a clear path up.','Match balls, team kits and training gear that meet world standards, delivered to your club or school.','We connect clubs, academies, federations, schools and brands so sport grows for everyone.'],['Trips, camps and courses that let athletes, coaches and officials learn from the best.','We host teams, camps and tournaments in Kenya, from high-altitude training to match days and safaris.','Video, performance data and club software that help you find talent and train smarter.']];
det.forEach((d,k)=>{ s=pres.addSlide(); s.background=BG('pale');
 title(s,'What we do',k?'Learn. Host.':'Find. Equip.',k?'Level up':'Connect');
 d.forEach((t,i)=>{const j=k*3+i,x=M+i*4.1,w=3.93; card(s,x,2.0,w,4.5,'FFFFFF');
  s.addImage({path:I('img/'+sv[j][2]+'.jpg'),x:x+0.2,y:2.2,w:w-0.4,h:1.9,sizing:{type:'cover',w:w-0.4,h:1.9},objectName:'Photo '+sv[j][0]});
  s.addImage({path:I('img/logo-mark-white.png'),x:x+w-0.2-0.5,y:2.3,w:0.5*0.945,h:0.5,objectName:'Logo mark'});
  s.addText(sv[j][0],{x:x+0.2,y:4.3,w:0.6,h:0.3,fontSize:11,bold:true,color:'FFFFFF',fill:{color:RED},align:'center',isTextBox:true,margin:0});
  s.addText(sv[j][1],{x:x+0.2,y:4.7,w:w-0.4,h:0.7,fontSize:16,bold:true,color:NAVY,isTextBox:true,margin:0,valign:'top'});
  s.addText(t,{x:x+0.2,y:5.4,w:w-0.4,h:1.0,fontSize:12,color:INK,isTextBox:true,margin:0,valign:'top'});});
 foot(s,5+k);});

// 7 sports
s=pres.addSlide(); s.background=BG('white');
title(s,'Sports we back','Every game','counts');
const sp=[['Football','Academies, clubs, kit and tournaments.'],['Rugby','Sevens and fifteens, from schools to clubs.'],['Athletics','Track, field and road, home of Kenyan greats.'],['Basketball','Leagues, camps and youth development.'],['Volleyball & Netball','Kit, coaching and competitions.'],['Cricket','Gear, coaching and exchange tours.'],['Swimming','Coaching, galas and training camps.'],['Tennis','Coaching, courts and junior programmes.']];
sp.forEach((v,i)=>{const x=M+(i%4)*3.06,y=2.1+Math.floor(i/4)*2.2; card(s,x,y,2.9,2.0,C.background2);
 s.addText(v[0],{x:x+0.25,y:y+0.25,w:2.4,h:0.6,fontSize:17,bold:true,color:NAVY,isTextBox:true,margin:0,valign:'top'});
 s.addText(v[1],{x:x+0.25,y:y+0.95,w:2.4,h:0.9,fontSize:12,color:INK,isTextBox:true,margin:0,valign:'top'});});
foot(s,7);

// 8 pathway
s=pres.addSlide(); s.background=BG('navy');
title(s,'Our pathway','From the pitch','to the podium',true);
s.addText('Every athlete needs a path. This is ours.',{x:M,y:1.85,w:8,h:0.4,fontSize:16,color:'DCE5F4',isTextBox:true,margin:0});
[['01','Spot','We find talent at schools, academies and community pitches.'],['02','Train','Coaching, fitness and data to sharpen every player.'],['03','Equip','Proper kit and gear so players can perform.'],['04','Travel','Camps, trials and exchange trips at home and abroad.'],['05','Compete','Tournaments and clubs where talent gets noticed.']].forEach((v,i)=>{const x=M+i*2.46;
 s.addShape(pres.shapes.OVAL,{x,y:2.9,w:0.7,h:0.7,fill:{color:RED},line:{color:RED}});
 s.addText(v[0],{x,y:2.9,w:0.7,h:0.7,fontSize:14,bold:true,color:'FFFFFF',align:'center',valign:'middle',isTextBox:true,margin:0});
 s.addText(v[1],{x,y:3.85,w:2.2,h:0.5,fontSize:22,bold:true,color:'FFFFFF',isTextBox:true,margin:0});
 s.addText(v[2],{x,y:4.4,w:2.2,h:1.6,fontSize:13,color:'DCE5F4',isTextBox:true,margin:0,valign:'top'});});
foot(s,8,true);

// 9 who we work with + CTA
s=pres.addSlide(); s.background=BG('white');
title(s,'Who we work with','Built for','every team');
[['Clubs & academies','Kit, training, scouting tools and trips abroad.'],['Federations','Partnerships, courses and skills for your officials.'],['Athletes & coaches','Courses, camps and a clear path to the next level.'],['Brands & sponsors','Sponsorship that reaches real fans and real communities.']].forEach((v,i)=>{const x=M+i*3.06; card(s,x,2.0,2.9,1.9,C.background2);
 s.addText(v[0],{x:x+0.25,y:2.15,w:2.4,h:0.55,fontSize:16,bold:true,color:NAVY,isTextBox:true,margin:0,valign:'top'});
 s.addText(v[1],{x:x+0.25,y:2.75,w:2.4,h:1.0,fontSize:12,color:INK,isTextBox:true,margin:0,valign:'top'});});
card(s,M,4.25,W-2*M,2.4,NAVY);
s.addText([{text:'Ready to take your game ',options:{color:'FFFFFF'}},{text:'further?',options:{color:RED}}],{x:M+0.5,y:4.5,w:6.5,h:1.7,fontSize:30,bold:true,isTextBox:true,margin:0,valign:'middle'});
s.addText([{text:"Let's work together",options:{bold:true,fontSize:16,color:'FFFFFF',breakLine:true,paraSpaceAfter:6}},{text:'Nairobi, Kenya',options:{breakLine:true}},{text:'hi@oynamak.co.ke',options:{breakLine:true}},{text:'Mon - Fri, 8:00 - 17:00'}],{x:8.1,y:4.5,w:4.2,h:1.7,fontSize:13,color:'DCE5F4',align:'right',isTextBox:true,margin:0,valign:'middle'});

(async()=>{await pres.writeFile({fileName:'Oynamak-Company-Profile.pptx'});await applyTheme('Oynamak-Company-Profile.pptx',THEME);console.log('ok')})();
