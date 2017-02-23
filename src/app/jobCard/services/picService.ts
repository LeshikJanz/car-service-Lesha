import { Injectable } from '@angular/core';
//import { Observable } from 'rxjs/Rx';

@Injectable()
export class picService {
    
    private URL = 'http://localhost:57939/api/Upload/PostFile';

    public makeFileRequest(path: string, files: File[]) {    
        let formData: FormData = new FormData(),
            xhr: XMLHttpRequest = new XMLHttpRequest();

        for (let i = 0; i < files.length; i++) {
            formData.append(path, files[i], files[i].name);
        }

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {

                } else {

                }
            }
        };

        xhr.upload.onprogress = (event) => {
        };

        xhr.open('POST', this.URL + "(" + path + ")", true);
        xhr.send(formData);
    }

    public loadPic(path: string): File{
        return null;
    }
}