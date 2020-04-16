import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
// import { ResizedEvent } from '/Users/sruthimahalaxmi/SruthiProjects/branches/search-edit/thc-ui/node_modules/angular-resize-event';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  useAnimation
} from '@angular/animations';
import { pulse } from 'ng-animate';

@Component({
  selector: 'app-menu-comp',
  templateUrl: './menu-comp.component.html',
  styleUrls: ['./menu-comp.component.css'],
  animations: [
    trigger('toggled', [
      // ...
      state('true', style({
        position: 'absolute',
        top: '45px',
        left: '-70px',
        width: '224px',
        height: '650px'
      })),
      state('false', style({
        position: 'absolute',
        top: '45px',
        left: '-70px',
        width: '85px',
        height: '650px'
      })),
      transition('true => false', [
        animate('0.2s')
      ]),
      transition('false => true', [
        animate('0.3s')
      ]),
    ]),
      trigger('hamburguerX', [
        state('hamburguer', style({})),
        state('topX', style({
          transform: 'rotate(45deg)',
          transformOrigin: '10% 10%',
          marginLeft: '7px',
          marginTop: '12px',
          width: '15px'
        })),
        state('hide', style({
          opacity: 0
        })),
        state('bottomX', style({
          transform: 'rotate(-45deg)',
          transformOrigin: '10% 90%',
          marginLeft: '7px',
          marginTop: '-2px',
          width: '15px'
        })),
        transition('* => *', [
          animate('0.1s')
        ]),
      ])
    // trigger('pulse', [transition('* => *', useAnimation(pulse , {
    //   // Set the duration to 5seconds and delay to 2seconds
    //   params: { timing: 5, delay: 2 }
    // }))])
  ]
})
export class MenuCompComponent implements OnInit, AfterViewInit {

   @ViewChild('pageContentWrapper', {static: false}) pageContentWrapper: ElementRef;
   @ViewChild('sidebarWrapper', {static: false}) sidebarWrapper: ElementRef;
   @ViewChild('toggleMenuIcon', {static: false}) toggleMenuIcon: ElementRef;
  @ViewChild('closeMenuIcon', { static: false}) closeMenuIcon: ElementRef;
  public toggled = false;
 // pulse: any;

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
   // this.toggled = true;
    // this.toggleMenuIcon.nativeElement.style.display = 'block';
    // this.closeMenuIcon.nativeElement.style.display = 'none';
    this.sidebarWrapper.nativeElement.style.width = '85px';
    this.pageContentWrapper.nativeElement.style.marginLeft = '0';
    this.pageContentWrapper.nativeElement.style.width = '108%';
  }
  onToggle() {
    this.toggled = !this.toggled;
    if (this.toggled === true) {
      // this.toggleMenuIcon.nativeElement.style.display = 'none';
      // this.closeMenuIcon.nativeElement.style.display = 'block';
      this.sidebarWrapper.nativeElement.style.width = '224px';
      this.pageContentWrapper.nativeElement.style.marginLeft = '136px';
      this.pageContentWrapper.nativeElement.style.width = '96.65%';
    } else {
      // this.toggleMenuIcon.nativeElement.style.display = 'block';
      // this.closeMenuIcon.nativeElement.style.display = 'none';
      this.sidebarWrapper.nativeElement.style.width = '85px';
      this.pageContentWrapper.nativeElement.style.marginLeft = '0';
      this.pageContentWrapper.nativeElement.style.width = '108%';
    }
  }
  }

