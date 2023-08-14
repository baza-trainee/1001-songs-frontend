import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-expeditions',
    templateUrl: './expeditions.component.html',
    styleUrls: ['./expeditions.component.scss'],
    standalone: true,
    imports: [CommonModule, TranslateModule]
})
export class ExpeditionsComponent {
    gallery: number[] = [...Array(10)]
    imgUrl: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-bargjHS0bbEvbcmCkoUHD649_T1AfqU6tQ&usqp=CAU'
    categories: string [] = ['Усі','Розвідка','Стаціонарні','Міждисциплінарна',  'Тематична','Відеозапис обряду','Цифровий запис']
    date = new Date();

}
