import { Component } from '@angular/core';

@Component({
  template: `
    <div class="container-fluid jobCard col-sm-12 jobCard-Container">
      <div class="col-md-3 col-sm-4 hidden-xs col-sm-height JobCardHeight master">
        <div class="panel panel-default">
          <div class="panel-heading">
            <job-card-navigation></job-card-navigation>
            <job-card-search></job-card-search>
          </div>
        </div>
        <job-card-list></job-card-list>      
      </div>
      <div class="col-md-9 col-sm-8 col-xs-12 col-sm-height JobCardHeight JobCardItem" Id="detail">
        <job-card-item></job-card-item>
      </div>
    </div>
  `,
  styleUrls: ['../../styles/layout.css']
})

export class JobCardLayout {}
