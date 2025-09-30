import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  private apiUrl = 'http://localhost:3000/skills';
  constructor(private http:HttpClient){}

  getAll():Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl);
  }

  create(skill:any):Observable<any>{
    return this.http.post<any>(this.apiUrl,skill);
  }

  update(id:string,skill:any):Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/${id}`, skill);
  }

  delete(id:string):Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
