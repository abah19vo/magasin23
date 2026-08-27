(function(){
  const KEY='magasin23-cart';
  const get=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch{return[]}};
  const save=x=>{localStorage.setItem(KEY,JSON.stringify(x));update()};
  const update=()=>{const n=get().reduce((s,x)=>s+(x.qty||1),0);document.querySelectorAll('#count,#cart,.cart-count').forEach(e=>e.textContent=n)};
  window.M23={
    items:get,
    add(item){const a=get(),found=a.find(x=>x.name===item.name&&x.variant===item.variant);found?found.qty+=(item.qty||1):a.push({...item,qty:item.qty||1});save(a);document.querySelectorAll('#toast,.toast').forEach(t=>{t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1600)})},
    setQty(i,q){const a=get();q<1?a.splice(i,1):a[i].qty=q;save(a)},
    remove(i){const a=get();a.splice(i,1);save(a)},
    clear(){save([])},update
  };
  document.addEventListener('DOMContentLoaded',()=>{update();document.querySelectorAll('.add[data-name]').forEach(b=>b.addEventListener('click',()=>M23.add({name:b.dataset.name,price:+b.dataset.price,image:b.dataset.image,variant:b.dataset.variant||'Standard'})))});
})();
