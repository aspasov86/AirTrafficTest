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
    this.getUpdates = function (url, lastDv) {
      return new Promise((resolve, reject) => {
        this.xml.open("POST", url);
        this.xml.onreadystatechange = () => {
          if (this.xml.readyState == 4 && this.xml.status == 200) {
            resolve(JSON.parse(this.xml.responseText));
          }
        }
        this.xml.send(lastDv);
      })

      //???
      //resolve the lastDv issue
      //maybe icaos
    }
}

let data = new DB();
