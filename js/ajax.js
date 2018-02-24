function DB() {
    this.xml = new XMLHttpRequest();
    this.getData = function(url) {
      return new Promise((resolve, reject) => {
        this.xml.open("GET", url);
        this.xml.onreadystatechange = () => {
          if (this.xml.readyState == 4 && this.xml.status == 200) {
            resolve(JSON.parse(this.xml.responseText));
          }
        }
        this.xml.send();
      })
    }
}

let data = new DB();
