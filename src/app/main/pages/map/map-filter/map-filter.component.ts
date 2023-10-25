import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from "@ngx-translate/core";
// import {Store} from "@ngxs/store";
import {Subject, Subscription, takeUntil} from "rxjs";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

import {Marker, SelectedMarkerFilter} from "../../../../shared/interfaces/map-marker";
import {MultiselectComponent} from "./multiselect/multiselect.component";
import {mapFilter} from "../../../../shared/enums/mapFilter";
import {FilterMapService} from "../../../../shared/services/filter-map/filter-map.service";


@Component({
    selector: 'app-map-filter',
    standalone: true,
    imports: [CommonModule, TranslateModule, MultiselectComponent, ReactiveFormsModule],
    templateUrl: './map-filter.component.html',
    styleUrls: ['./map-filter.component.scss']
})

export class MapFilterComponent implements OnChanges, OnInit, OnDestroy {
    @Input() markers!: Marker[];
    @Output() selectedOptionsChange = new EventEmitter<SelectedMarkerFilter>();

    filterCategory = mapFilter;
    options: SelectedMarkerFilter = new SelectedMarkerFilter();
    allOptions: SelectedMarkerFilter = new SelectedMarkerFilter();
    isShowFilter = false;
    private destroy$ = new Subject<void>();

    form = new FormGroup({
        country: new FormControl<string[]>([]),
        region: new FormControl<string[]>([]),
        settlement: new FormControl<string[]>([]),
        genre: new FormControl<string[]>([]),
        title: new FormControl<string[]>([]),
        found: new FormControl<string[]>([])
    });

    constructor(
        // private translate: TranslateService,
        // private store: Store,
        private filterMapService: FilterMapService
    ) {
    }

    ngOnInit() {
        this.form.controls.country.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
            this.options = this.filterMapService.filterByProperty(this.markers, value, this.options.country, 'country',
                marker => !!value?.includes(marker.location.country));
        })
        this.form.controls.region.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
            this.options = this.filterMapService.filterByProperty(this.markers, value, this.options.region, 'region',
                marker => !!value?.includes(marker.location.region));
        })
        this.form.controls.settlement.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
            this.options = this.filterMapService.filterByProperty(this.markers, value, this.options.settlement, 'settlement',
                marker => !!value?.includes(marker.location.district_center));
        })
        this.form.controls.genre.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
            this.options = this.filterMapService.filterByProperty(this.markers, value, this.options.genre, 'genre',
                marker => !!value?.includes(marker.genre_cycle));
        })
        this.form.controls.title.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
            this.options = this.filterMapService.filterByProperty(this.markers, value, this.options.title, 'title',
                marker => !!value?.includes(marker.title));
        })
        this.form.controls.found.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
            this.options = this.filterMapService.filterByProperty(this.markers, value, this.options.found, 'found',
                marker => !!value?.includes(marker.found));
        })
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['markers'] && changes['markers'].currentValue !== changes['markers'].previousValue) {
            this.options = this.filterMapService.createFilterByMarker(this.markers);
            this.allOptions = this.filterMapService.createFilterByMarker(this.markers);
        }
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    sendSelectedOptions() {
        this.selectedOptionsChange.emit(this.options);
    }

    filerClear() {
        this.form.reset();
        this.options = this.filterMapService.createFilterByMarker(this.markers);
        this.sendSelectedOptions();
    }

    onSubmit() {
    }
}
