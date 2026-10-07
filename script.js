const defaultTrees=[
 {name:"Neem",scientific:"Azadirachta indica",location:"Near Library",type:"Native",space:"Campus Garden",height:8,x:20,y:35},
 {name:"Mango",scientific:"Mangifera indica",location:"Main Block",type:"Native",space:"Central Lawn",height:7,x:72,y:30},
 {name:"Gulmohar",scientific:"Delonix regia",location:"Garden Road",type:"Non-native",space:"Garden",height:6,x:48,y:70},
 {name:"Peepal",scientific:"Ficus religiosa",location:"Entrance",type:"Native",space:"Green Belt",height:10,x:82,y:72},
 {name:"Ashoka",scientific:"Polyalthia longifolia",location:"North Side",type:"Native",space:"Campus Garden",height:5,x:30,y:20}
];
let trees=JSON.parse(localStorage.getItem("greenmapTrees")||"null")||defaultTrees;

function render(){
 const map=document.getElementById("campusMap"), list=document.getElementById("treeList");
 document.querySelectorAll(".marker").forEach(e=>e.remove());
 list.innerHTML="";
 trees.forEach((t,i)=>{
   const m=document.createElement("div");m.className="marker";m.textContent="🌳";
   m.style.left=t.x+"%";m.style.top=t.y+"%";m.title=t.name;
   m.onclick=()=>alert(`${t.name}\nScientific: ${t.scientific||"Not added"}\nLocation: ${t.location}\nType: ${t.type}\nGreen Space: ${t.space}\nHeight: ${t.height||"—"} m`);
   map.appendChild(m);
   const item=document.createElement("div");item.className="tree-item";
   item.innerHTML=`<b>🌳 ${t.name}</b><small>${t.location} • ${t.type}<br>${t.space}</small>`;
   item.onclick=()=>m.click();list.appendChild(item);
 });
 document.getElementById("treeCount").textContent=trees.length;
 document.getElementById("speciesCount").textContent=new Set(trees.map(t=>t.name.toLowerCase())).size;
 document.getElementById("greenCount").textContent=new Set(trees.map(t=>t.space)).size;
 document.getElementById("nativeCount").textContent=trees.filter(t=>t.type==="Native").length;
}
document.getElementById("treeForm").addEventListener("submit",e=>{
 e.preventDefault();
 const t={name:name.value.trim(),scientific:scientific.value.trim(),location:location.value.trim(),type:type.value,space:space.value.trim(),height:height.value,x:15+Math.random()*70,y:15+Math.random()*70};
 trees.push(t);localStorage.setItem("greenmapTrees",JSON.stringify(trees));e.target.reset();render();document.getElementById("map").scrollIntoView({behavior:"smooth"});
});
render();
