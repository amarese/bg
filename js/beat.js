function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
}
function go(name, phonenumber, passwd, d, t, f) {
    if (document.getElementById('cate_3') != null) {
        document.getElementById('cate_3').click(); 
        let storeID = '던전101'; 
        let themaID = '화생설화 : Blooming'; 
        if (f == false) { 
            storeID = '강남 던전'; themaID = '강남목욕탕'; 
        } 
        sleep(1000).then(() => document.getElementById(storeID).click()); 
        sleep(1500).then(() => document.getElementsByClassName('input_date')[0].value = d); 
        sleep(2000).then(() => document.getElementById(themaID).click()); 
        sleep(2500).then(() => document.getElementById(t).click()); 
        sleep(3000).then(() => submitNext()); 
        return
    } 
    if (document.getElementById('login_auto_login') != null) { 
        document.getElementById('agree').checked = true; 
        sleep(500).then(() => guest_submit(document.flogin)); 
        return 
    } 
    document.getElementById('rena').value = name; 
    document.getElementById('reph').value = phonenumber; 
    document.getElementById('remd').value = phonenumber+'@naver.com'; 
    document.getElementsByName('te_pass')[0].type = ''; 
    document.getElementsByName('te_pass')[0].value = passwd; 
    document.getElementById('od_settle_card').checked = true; 
    document.getElementById('terms1').checked = true; 
    document.getElementById('terms2').checked = true; 
    console.log(document.getElementsByName('pp_oid')[0].value); 
    console.log(document.getElementsByName('rel_order_time')[0].value)
} 
go('이상화','01020698564','123456','20220605', '11:40', true)