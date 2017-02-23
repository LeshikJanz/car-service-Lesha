import { Component, OnInit } from '@angular/core';
import { Observable }   from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { UserNameEmailService } from './usersNameEmail.service';
import { user } from './user';

    @Component({
      selector: 'user-search',
      templateUrl: 'user-search.component.html',
      providers: [UserNameEmailService],
      styleUrls: ['./styles/login.css']
    })

    export class UserSearchComponent implements OnInit {
      users: Observable<any[]>;
      private terms = new Subject<string>();

      constructor(
        private userNameEmailService: UserNameEmailService) {

        }

      search(term: string): void {
        this.terms.next(term);
      }

      ngOnInit(): void {
        this.users = this.terms
          .debounceTime(600)
          .distinctUntilChanged()
          .switchMap(t => t ?
            this.userNameEmailService.searchUser(t) :
            Observable.of<user[]>([]))
          .catch(error => {
            console.log(error);
            return Observable.of<user[]>([]);
          });

          var s ="F";
      }

      get() :void {
        this.userNameEmailService.searchUser("r")
        .subscribe(u => {
          var c  = u;
        });
        var a =2;
      }
    }