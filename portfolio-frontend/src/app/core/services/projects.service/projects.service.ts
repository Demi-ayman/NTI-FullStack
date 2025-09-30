import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private apiUrl = 'http://localhost:3000/projects';
  constructor(private http:HttpClient){}
  getAll():Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl);
  }

  getById(id:string):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getByName(name:string):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/name/${name}`);
  }

  getByCategory(category:string):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/category/${category}`);
  }

  create(project:any):Observable<any>{
    return this.http.post<any>(this.apiUrl,project);
  }
  update(id:string,project:any):Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/${id}`, project);
  }

  delete(id:string):Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
