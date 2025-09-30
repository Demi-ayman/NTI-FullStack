import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AboutService {
  private apiUrl = 'http://localhost:3000/about';
  constructor(private http:HttpClient){}
  getAll():Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl);
  }
  update(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }
  create(data:any):Observable<any>{
    return this.http.post<any>(this.apiUrl,data);
  }

  uploadImage(file:File):Observable<any>{
    const formData = new FormData();
    formData.append('image',file);
    return this.http.post<any>(`${this.apiUrl}/upload`, formData);

  }
}
