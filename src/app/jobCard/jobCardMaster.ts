import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core'
import { JobCard } from './jobCard';
import { JobCardService } from './jobCard.service';
import { picService } from './picService';

@Component({
    selector: 'jobCard-master',
    templateUrl: 'jobCardMaster.html'
})

export class JobCardMasterComponent implements OnChanges {
    @Input() jobItems: JobCard[];
    @Input() selected: JobCard;
    @Input() HasNext: boolean;
    @Input() HasPrev: boolean;

    @Output() selectedUpdate = new EventEmitter<JobCard>();
    @Output() GoNext = new EventEmitter<string>();
    @Output() GoPrev = new EventEmitter<string>();

    @Output() FilterOpt = new EventEmitter<string>();
    @Output() searchTerm = new EventEmitter<string>();

    // HasPrevStr: string;
    // HasNextStr: string;
    respo: any;
    searchVal: string;

    filterOptions: string[];
    selecterFilter: string;
    constructor(private _jobCardService: JobCardService,
        private picService: picService) {
        this.filterOptions = ['All', 'Open', 'Close'];
        this.pickFilter('Open');
    }

    ngOnChanges(): void {
        this.sleep(300);
        if(this.jobItems.length > 0){
            this.pick(this.jobItems[0]);
            let element = document.querySelector('#Anc');
            element.scrollIntoView(element);
        }
        else{
            let temp = new JobCard();
            temp.DocNum = "No Items Found";
            this.jobItems.push(temp);
            this.selectedUpdate.emit(null);
        }
        // this.HasNextStr = (this.HasNext ? 'true' : 'false');
        // this.HasPrevStr = (this.HasPrev ? 'true' : 'false');
    }

    pick(item: JobCard): void {
        if(!item || item.DocNum == "No Items Found"){
            this.selectedUpdate.emit(null);
            return;
        }

        this.updateSelected(this.selected);

        this.selected = item;
        this.selectedUpdate.emit(item);
        var master = document.querySelector('#master');
        master.classList.add("hidden-xs");
        master.classList.remove("col-xs-12");
        var detail = document.querySelector('#detail');
        detail.classList.remove("hidden-xs");
        detail.classList.add("col-xs-12");
    }

    prev(): void {
        if (!this.HasPrev) {
            return;
        }
        this.updateSelected(this.selected);
        this.GoPrev.emit("Prev");
    }

    next(): void {
        if (!this.HasNext) {
            return;
        }
        this.updateSelected(this.selected);
        this.GoNext.emit("Next");
    }

    updateSelected(item: JobCard) {
        if (this.selected) {
            this.selected.XIS_JOBS9Collection.forEach(element => {
                if (element.job9Dirty) {
                    element.job9Dirty = false;
                    if (element.pic != null) {
                        element.U_Attach = element.DocEntry +
                            "_" + element.LineId;
                    }
                    this._jobCardService.postjob9(element)
                        .subscribe(res => this.respo = res);
                    if (element.pic != null) {
                        var path = "JobCard_" + element.DocEntry +
                            "_CheckList_" + element.LineId;
                        var arr = new Array<File>();
                        arr.push(element.pic);
                        this.picService.makeFileRequest(path, arr);
                    }
                }
            });
            this.selected.XIS_JOBS11Collection.forEach(element => {
                if (element.newLine) {
                    element.newLine = false;
                    this._jobCardService.postjob11(element)
                        .subscribe(res => this.respo = res);
                }
            });
        }
    }

    pickFilter(opt: string): void {
        this.selecterFilter = opt;
        this.FilterOpt.emit(opt);
    }

    preformSearch(): void {
        // if(this.searchVal != ""){
        //     this.searchTerm.emit(this.searchVal);
        //     this.searchVal = "";
        // }
        if (!this.searchVal) {
            this.searchVal = "";
        }
        this.searchTerm.emit(this.searchVal);
        this.searchVal = "";
    }

    refreshList(): void {
        this.preformSearch();
    }

    sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}