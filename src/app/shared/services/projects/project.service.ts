import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";

import {API_URL, StatEndpoints} from "../../config/endpoints/stat-endpoints";
import {Slide} from "../../interfaces/slide.interface";
import {Project, ProjectData} from "../../interfaces/project.interface";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

    convertToSlide(obj: ProjectData): Slide {
        return {
            id: obj.id,
            img: obj.preview_photo,
            date: '', // Укажите поле, содержащее дату
            title: obj.title,
            description: obj.short_description,
            location: '', // Укажите поле, содержащее местоположение
        };
    }

    fetchProjectById(id: number): Observable<Project> {
        return this.http.get<Project>(`${API_URL}${StatEndpoints.projects}/` + id).pipe(
            catchError(error => {
                console.error(error);
                return of({} as Project);
            })
        );
    }
  fetchProjects(): Observable<ProjectData[]> {
    return this.http.get<ProjectData[]>(`${API_URL}${StatEndpoints.projects}`).pipe(
        catchError(error => {
          console.error(error);
          return of([]);
        })
    );
  }
}
