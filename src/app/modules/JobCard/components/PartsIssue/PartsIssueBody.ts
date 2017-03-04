import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import { DETAIL_TYPES } from "../../constants/index";

@Component({
  selector: 'parts-issue-body',
  templateUrl: '../../templates/PartsIssueBody.html',
  styleUrls: [
    '../../styles/issue-body.css',
    '../../styles/item.css'
  ]
})

export class PartsIssueBody {
  mainTabs$ = [
    {
      label: "CC Code - Customer Concern Description 1",
      internalTabs: [
        {
          label: "Package Description",
          details: [
          {
            type: DETAIL_TYPES.PartActive,  //Parts, Labor, Sublets, Oils
            label: "PartCode - Part Description",
            quantity: "12",
            issued: "3",
            qtyToIssue: ""
          },
            {
              type: DETAIL_TYPES.LaborActive,  //Parts, Labor, Sublets, Oils
              label: "LaborCode - Labor Description",
              quantity: "12",
              issued: "3",
              qtyToIssue: ""
            }
          ]
        },
        {
          label: "Additional",
          details: [
            {
              type: DETAIL_TYPES.LaborInactive,  //Parts, Labor, Sublets, Oils
              label: "LaborCode - Labor Description",
              quantity: "2",
              issued: "3",
              qtyToIssue: ""
            }
          ]
        }
      ]
    },
    {
      label: "CC39833 - Paint Job",
      internalTabs: [
        {
          label: "Package Description",
          details: [
            {
              type: DETAIL_TYPES.OilActive,  //Parts, Labor, Sublets, Oils
              label: "OilCode - Oil Description",
              quantity: "12",
              issued: "9",
              qtyToIssue: ""
            }
          ]
        },
        {
          label: "Additional",
          details: [
            {
              type: DETAIL_TYPES.OilInactive,  //Parts, Labor, Sublets, Oils
              label: "OilCode - Oil Description",
              quantity: "5",
              issued: "8",
              qtyToIssue: ""
            }
          ]
        }
      ]
    }];
}
