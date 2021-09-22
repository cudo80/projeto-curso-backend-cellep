let url_atual=window.location.pathname

if(url_atual == '/'){
    document.querySelector("#menuHome").className='nac-link text-white active'
}else if(url_atual == '/noticias'){
    document.querySelector("#menuNoticias").className='nac-link text-white active'
}else if(url_atual == '/admin'){
    document.querySelector("#menuAdmin").className='nac-link text-white active'
}