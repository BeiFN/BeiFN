class utils {
    static ajax(url , data , type) {
        return new Promise(function(resolve , reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(type , url);
            xhr.send();
            xhr.onreadystatechange = function() {
                if(xhr.readyState === 4 && xhr.status === 200) {
                    resolve(xhr.responseText);
                }
            }
        }) 
        
    }
}